import json
import random
import string
from datetime import datetime
try:
    from backend.database import get_db_connection
except ImportError:
    from database import get_db_connection

def generate_quote_id():
    return "QT-" + "".join(random.choices(string.ascii_uppercase + string.digits, k=6))

def search_product_catalog(query: str = ""):
    conn = get_db_connection()
    cursor = conn.cursor()
    if query:
        cursor.execute('''
            SELECT id, name, category, price, currency, description, features, target_audience, discounts_available
            FROM products
            WHERE name LIKE ? OR category LIKE ? OR description LIKE ?
        ''', (f"%{query}%", f"%{query}%", f"%{query}%"))
    else:
        cursor.execute('SELECT * FROM products')
    
    rows = cursor.fetchall()
    conn.close()
    
    products = []
    for r in rows:
        products.append({
            "id": r["id"],
            "name": r["name"],
            "category": r["category"],
            "price": r["price"],
            "currency": r["currency"],
            "description": r["description"],
            "features": json.loads(r["features"]) if r["features"] else [],
            "target_audience": r["target_audience"],
            "discounts": json.loads(r["discounts_available"]) if r["discounts_available"] else {}
        })
    return products

def capture_or_update_lead(
    name: str = None,
    email: str = None,
    phone: str = None,
    company: str = None,
    stage: str = None,
    budget: str = None,
    authority: str = None,
    need: str = None,
    timeline: str = None,
    interested_product: str = None,
    notes: str = None
):
    conn = get_db_connection()
    cursor = conn.cursor()
    
    lead_id = None
    existing = None
    
    if email:
        cursor.execute("SELECT * FROM leads WHERE email = ?", (email,))
        existing = cursor.fetchone()
    elif phone:
        cursor.execute("SELECT * FROM leads WHERE phone = ?", (phone,))
        existing = cursor.fetchone()
        
    score_delta = 0
    if budget: score_delta += 20
    if authority: score_delta += 15
    if need: score_delta += 25
    if timeline: score_delta += 20
    if email or phone: score_delta += 15

    if existing:
        lead_id = existing["id"]
        current_score = min(100, existing["lead_score"] + score_delta)
        cursor.execute('''
            UPDATE leads
            SET name = COALESCE(?, name),
                email = COALESCE(?, email),
                phone = COALESCE(?, phone),
                company = COALESCE(?, company),
                stage = COALESCE(?, stage),
                lead_score = MAX(lead_score, ?),
                budget = COALESCE(?, budget),
                authority = COALESCE(?, authority),
                need = COALESCE(?, need),
                timeline = COALESCE(?, timeline),
                interested_product = COALESCE(?, interested_product),
                notes = CASE WHEN ? IS NOT NULL THEN COALESCE(notes, '') || ' | ' || ? ELSE notes END,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
        ''', (name, email, phone, company, stage, current_score, budget, authority, need, timeline, interested_product, notes, notes, lead_id))
    else:
        score = max(25, min(100, score_delta))
        init_stage = stage or ("Qualified" if score >= 60 else "New Lead")
        cursor.execute('''
            INSERT INTO leads (name, email, phone, company, stage, lead_score, budget, authority, need, timeline, interested_product, notes)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (name, email, phone, company, init_stage, score, budget, authority, need, timeline, interested_product, notes))
        lead_id = cursor.lastrowid

    conn.commit()
    conn.close()
    return {"status": "success", "lead_id": lead_id, "message": "Lead updated/captured successfully in CRM"}

def schedule_meeting(lead_name: str, lead_email: str, date_time: str, topic: str = "Product Demo & Consultation"):
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Link to lead if exists
    cursor.execute("SELECT id FROM leads WHERE email = ?", (lead_email,))
    lead = cursor.fetchone()
    lead_id = lead["id"] if lead else None
    
    cursor.execute('''
        INSERT INTO bookings (lead_id, lead_name, lead_email, date_time, topic, status)
        VALUES (?, ?, ?, ?, ?, 'Confirmed')
    ''', (lead_id, lead_name, lead_email, date_time, topic))
    booking_id = cursor.lastrowid
    
    if lead_id:
        cursor.execute('''
            UPDATE leads
            SET stage = 'Demo Booked', lead_score = 95, updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
        ''', (lead_id,))
        
    conn.commit()
    conn.close()
    
    return {
        "status": "success",
        "booking_id": booking_id,
        "details": {
            "lead_name": lead_name,
            "lead_email": lead_email,
            "date_time": date_time,
            "topic": topic,
            "confirmation": f"Demo meeting successfully booked for {date_time} with {lead_name}."
        }
    }

def generate_quotation(product_name: str, lead_email: str = None, discount_code: str = None, custom_discount_pct: float = 0):
    conn = get_db_connection()
    cursor = conn.cursor()
    
    cursor.execute("SELECT * FROM products WHERE name LIKE ?", (f"%{product_name}%",))
    prod = cursor.fetchone()
    
    if not prod:
        conn.close()
        return {"status": "error", "message": f"Product '{product_name}' not found."}
        
    base_price = prod["price"]
    currency = prod["currency"]
    discount_pct = custom_discount_pct
    
    if discount_code:
        discounts = json.loads(prod["discounts_available"] or "{}")
        if discount_code in discounts:
            discount_pct = max(discount_pct, discounts[discount_code])
            
    discount_pct = min(25.0, discount_pct) # Safety ceiling
    final_price = round(base_price * (1 - (discount_pct / 100)), 2)
    savings = round(base_price - final_price, 2)
    quote_id = generate_quote_id()
    
    lead_id = None
    if lead_email:
        cursor.execute("SELECT id FROM leads WHERE email = ?", (lead_email,))
        lead = cursor.fetchone()
        if lead:
            lead_id = lead["id"]
            cursor.execute("UPDATE leads SET stage = 'Proposal Sent', lead_score = 90 WHERE id = ?", (lead_id,))
            
    terms = "Valid for 7 days. Includes 30-day money-back guarantee, full deployment support, and 24/7 dedicated account manager."
    cursor.execute('''
        INSERT INTO quotations (quote_number, lead_id, product_name, original_price, discount_percent, final_price, terms, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, 'Sent')
    ''', (quote_id, lead_id, prod["name"], base_price, discount_pct, final_price, terms))
    
    conn.commit()
    conn.close()
    
    return {
        "status": "success",
        "quote_number": quote_id,
        "product": prod["name"],
        "original_price": f"{currency} {base_price}",
        "discount_percent": f"{discount_pct}%",
        "savings": f"{currency} {savings}",
        "final_price": f"{currency} {final_price}",
        "terms": terms
    }

OBJECTION_GUIDELINES = {
    "price_too_high": {
        "pattern": ["expensive", "mehnga", "price zyada", "cost high", "too much", "budget kam", "sasta"],
        "strategy": "Acknowledge value & ROI. Compare cost of inaction vs massive revenue gain. Offer an exclusive instant 10-15% fast-action closing discount or flexible milestone plan.",
        "example_pitch": "I completely understand that budget is top of mind. But let's look at the ROI: our clients usually recover this entire investment within the first 14 days because the AI operates 24/7 and doesn't miss a single high-ticket lead. If we finalize today, I can authorize a special 15% fast-action discount (Code: CLOSENOW). Would you like me to lock this in for you?"
    },
    "competitor_comparison": {
        "pattern": ["xyz", "competitor", "doosri company", "sasti mil rahi", "other agency", "market rate"],
        "strategy": "Highlight 3 key differentiators: Autonomous BANT qualification, multi-channel voice/chat sync, and zero-hallucination guardrails + 30 days guarantee.",
        "example_pitch": "Great question! While standard tools in the market only offer basic scripted chatbots that frustrate customers, our solution is a true Autonomous Sales Closer. It understands nuanced intent in Urdu/Hinglish/English, handles customer objections proactively, and books meetings right into your CRM. Plus, we back it with a 30-day money-back guarantee."
    },
    "need_time_to_think": {
        "pattern": ["soch kar", "later", "baad me", "next month", "think about it", "not right now", "busy"],
        "strategy": "Gentle urgency + low friction next step (Free 15-min live demo or walkthrough with zero commitment).",
        "example_pitch": "Totally fair! No rush at all. How about we schedule a quick 15-minute interactive walkthrough so you can see exactly how it works on your live leads? No commitment required. What day this week works best for a quick demo?"
    },
    "trust_or_guarantee": {
        "pattern": ["guarantee", "sample", "result milega", "proof", "portfolio", "case study", "trust"],
        "strategy": "Reassure with 100% Risk-Free Guarantee, case studies, and live demo trial.",
        "example_pitch": "We stand 100% behind our performance. We provide a 30-day satisfaction guarantee, live pilot onboarding, and our clients have seen an average 3.4x boost in lead conversion within the first 30 days. Let me set up a live trial for your specific use case."
    }
}
