import os
import json
import sqlite3
from typing import Optional, List
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel

try:
    from backend.database import get_db_connection, init_db
    from backend.sales_agent import sales_agent_instance
    from backend.tools import search_product_catalog, capture_or_update_lead, schedule_meeting, generate_quotation
except ImportError:
    from database import get_db_connection, init_db
    from sales_agent import sales_agent_instance
    from tools import search_product_catalog, capture_or_update_lead, schedule_meeting, generate_quotation

# Initialize Database
init_db()

app = FastAPI(title="AI Business Salesman Agent API", version="2.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

FRONTEND_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "frontend")

# Models
class ChatRequest(BaseModel):
    session_id: str
    message: str
    lead_name: Optional[str] = None
    lead_email: Optional[str] = None
    lead_phone: Optional[str] = None

class LeadCreate(BaseModel):
    name: str
    email: Optional[str] = None
    phone: Optional[str] = None
    company: Optional[str] = None
    stage: Optional[str] = "New Lead"
    lead_score: Optional[int] = 30
    budget: Optional[str] = None
    authority: Optional[str] = None
    need: Optional[str] = None
    timeline: Optional[str] = None
    interested_product: Optional[str] = None
    notes: Optional[str] = None

class LeadUpdateStage(BaseModel):
    stage: str

class ProductCreate(BaseModel):
    name: str
    category: str
    price: float
    currency: str = "USD"
    description: str
    features: List[str] = []
    target_audience: str = ""
    discounts_available: dict = {}

class SettingsUpdate(BaseModel):
    settings: dict

# Chat Endpoint
@app.post("/api/chat")
def chat_with_agent(req: ChatRequest):
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Save User message
    cursor.execute('''
        INSERT INTO conversations (session_id, role, content)
        VALUES (?, 'user', ?)
    ''', (req.session_id, req.message))
    
    # Fetch conversation history for session
    cursor.execute('''
        SELECT role, content FROM conversations
        WHERE session_id = ?
        ORDER BY id ASC
        LIMIT 20
    ''', (req.session_id,))
    history = [{"role": r["role"], "content": r["content"]} for r in cursor.fetchall()]
    conn.commit()
    conn.close()
    
    # Run through Sales Agent Engine
    agent_output = sales_agent_instance.autonomous_sales_reply(
        user_text=req.message,
        history=history,
        session_id=req.session_id
    )
    
    reply_text = agent_output.get("reply", "")
    
    # Save Assistant message
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO conversations (session_id, role, content)
        VALUES (?, 'assistant', ?)
    ''', (req.session_id, reply_text))
    conn.commit()
    conn.close()
    
    return {
        "status": "success",
        "reply": reply_text,
        "tool_action": agent_output.get("tool_action"),
        "tool_data": agent_output.get("tool_data"),
        "lead_detected": agent_output.get("lead_detected")
    }

# Leads / CRM Endpoints
@app.get("/api/leads")
def get_leads(stage: Optional[str] = None):
    conn = get_db_connection()
    cursor = conn.cursor()
    if stage:
        cursor.execute("SELECT * FROM leads WHERE stage = ? ORDER BY updated_at DESC", (stage,))
    else:
        cursor.execute("SELECT * FROM leads ORDER BY updated_at DESC")
    rows = cursor.fetchall()
    conn.close()
    return [dict(r) for r in rows]

@app.post("/api/leads")
def create_lead(lead: LeadCreate):
    res = capture_or_update_lead(
        name=lead.name,
        email=lead.email,
        phone=lead.phone,
        company=lead.company,
        stage=lead.stage,
        budget=lead.budget,
        authority=lead.authority,
        need=lead.need,
        timeline=lead.timeline,
        interested_product=lead.interested_product,
        notes=lead.notes
    )
    return res

@app.put("/api/leads/{lead_id}/stage")
def update_lead_stage(lead_id: int, payload: LeadUpdateStage):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("UPDATE leads SET stage = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?", (payload.stage, lead_id))
    conn.commit()
    conn.close()
    return {"status": "success", "message": f"Lead {lead_id} stage updated to {payload.stage}"}

@app.delete("/api/leads/{lead_id}")
def delete_lead(lead_id: int):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM leads WHERE id = ?", (lead_id,))
    conn.commit()
    conn.close()
    return {"status": "success", "message": f"Lead {lead_id} removed"}

# Products Catalog Endpoints
@app.get("/api/products")
def get_products():
    return search_product_catalog()

@app.post("/api/products")
def add_product(prod: ProductCreate):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO products (name, category, price, currency, description, features, target_audience, discounts_available)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ''', (prod.name, prod.category, prod.price, prod.currency, prod.description, json.dumps(prod.features), prod.target_audience, json.dumps(prod.discounts_available)))
    conn.commit()
    prod_id = cursor.lastrowid
    conn.close()
    return {"status": "success", "product_id": prod_id}

@app.delete("/api/products/{prod_id}")
def delete_product(prod_id: int):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM products WHERE id = ?", (prod_id,))
    conn.commit()
    conn.close()
    return {"status": "success"}

# Settings Endpoints
@app.get("/api/settings")
def get_settings():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT key, value FROM agent_settings")
    rows = cursor.fetchall()
    conn.close()
    return {r["key"]: r["value"] for r in rows}

@app.post("/api/settings")
def save_settings(payload: SettingsUpdate):
    conn = get_db_connection()
    cursor = conn.cursor()
    for k, v in payload.settings.items():
        cursor.execute("INSERT OR REPLACE INTO agent_settings (key, value) VALUES (?, ?)", (k, str(v)))
    conn.commit()
    conn.close()
    sales_agent_instance.load_settings()
    return {"status": "success", "message": "Settings updated and reloaded"}

# Bookings & Quotations
@app.get("/api/bookings")
def get_bookings():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM bookings ORDER BY created_at DESC")
    rows = cursor.fetchall()
    conn.close()
    return [dict(r) for r in rows]

@app.get("/api/quotations")
def get_quotations():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM quotations ORDER BY created_at DESC")
    rows = cursor.fetchall()
    conn.close()
    return [dict(r) for r in rows]

# Analytics Dashboard Endpoint
@app.get("/api/analytics")
def get_analytics():
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute("SELECT COUNT(*) FROM leads")
    total_leads = cursor.fetchone()[0]
    
    cursor.execute("SELECT COUNT(*) FROM leads WHERE stage = 'Won'")
    deals_won = cursor.fetchone()[0]
    
    cursor.execute("SELECT COUNT(*) FROM bookings")
    total_bookings = cursor.fetchone()[0]
    
    cursor.execute("SELECT COUNT(*) FROM quotations")
    total_quotations = cursor.fetchone()[0]
    
    cursor.execute("SELECT stage, COUNT(*) as count FROM leads GROUP BY stage")
    stage_breakdown = {r["stage"]: r["count"] for r in cursor.fetchall()}
    
    # Calculate estimated pipeline value
    cursor.execute("SELECT SUM(price) FROM products")
    avg_val = cursor.fetchone()[0] or 1000
    pipeline_value = total_leads * (avg_val / 2)
    
    conversion_rate = round((deals_won / total_leads * 100), 1) if total_leads > 0 else 0
    
    conn.close()
    return {
        "total_leads": total_leads,
        "deals_won": deals_won,
        "total_bookings": total_bookings,
        "total_quotations": total_quotations,
        "conversion_rate": f"{conversion_rate}%",
        "pipeline_value": f"${round(pipeline_value, 2):,}",
        "stage_breakdown": stage_breakdown
    }

# Mount Frontend static files
if os.path.exists(FRONTEND_DIR):
    app.mount("/static", StaticFiles(directory=FRONTEND_DIR), name="static")

@app.get("/")
def serve_index():
    index_file = os.path.join(FRONTEND_DIR, "index.html")
    if os.path.exists(index_file):
        return FileResponse(index_file)
    return {"message": "AI Salesman Agent Backend is running. Frontend static directory not initialized."}

@app.get("/widget.js")
def serve_widget():
    widget_file = os.path.join(FRONTEND_DIR, "widget.js")
    if os.path.exists(widget_file):
        return FileResponse(widget_file, media_type="application/javascript")
    return {"message": "Widget JS not found"}
