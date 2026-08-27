import sqlite3
import json
import os
from datetime import datetime

DB_PATH = os.path.join(os.path.dirname(__file__), "sales_agent.db")

def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Products & Services Table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            category TEXT,
            price REAL NOT NULL,
            currency TEXT DEFAULT 'USD',
            description TEXT,
            features TEXT,
            target_audience TEXT,
            discounts_available TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Leads / CRM Table (BANT Qualified)
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS leads (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT,
            phone TEXT,
            company TEXT,
            stage TEXT DEFAULT 'New Lead', -- New Lead, Contacted, Qualified, Demo Booked, Proposal Sent, Won, Lost
            lead_score INTEGER DEFAULT 20,
            budget TEXT,
            authority TEXT,
            need TEXT,
            timeline TEXT,
            interested_product TEXT,
            notes TEXT,
            source TEXT DEFAULT 'Website Widget',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Chat Conversations
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS conversations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            session_id TEXT NOT NULL,
            lead_id INTEGER,
            role TEXT NOT NULL, -- user, assistant, system, tool
            content TEXT NOT NULL,
            intent TEXT,
            sentiment TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (lead_id) REFERENCES leads(id)
        )
    ''')
    
    # Bookings / Demos
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS bookings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            lead_id INTEGER,
            lead_name TEXT,
            lead_email TEXT,
            date_time TEXT,
            topic TEXT,
            status TEXT DEFAULT 'Confirmed',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (lead_id) REFERENCES leads(id)
        )
    ''')
    
    # Quotations / Proposals
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS quotations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            quote_number TEXT UNIQUE,
            lead_id INTEGER,
            product_name TEXT,
            original_price REAL,
            discount_percent REAL DEFAULT 0,
            final_price REAL,
            terms TEXT,
            status TEXT DEFAULT 'Sent',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (lead_id) REFERENCES leads(id)
        )
    ''')
    
    # Settings & Agent Personality Config
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS agent_settings (
            key TEXT PRIMARY KEY,
            value TEXT
        )
    ''')

    # Seed default products if empty
    cursor.execute('SELECT COUNT(*) FROM products')
    if cursor.fetchone()[0] == 0:
        seed_products = [
            (
                "Enterprise AI Automation Suite",
                "Software & SaaS",
                1499.0,
                "USD",
                "Full-stack autonomous AI workforce for lead gen, customer service, and sales closing.",
                json.dumps(["24/7 AI Voice & Chat Support", "CRM Auto-Sync (HubSpot, Salesforce)", "Custom LLM Fine-Tuning", "Automated Meeting Booking", "Multi-Language Support (English, Hinglish, Arabic, Spanish)"]),
                "B2B Founders, Agencies, E-commerce, Real Estate firms",
                json.dumps({"FIRST10": 10, "CLOSENOW": 15, "ENTERPRISE20": 20})
            ),
            (
                "Growth Sales & Marketing Agent",
                "Software & SaaS",
                699.0,
                "USD",
                "Smart outbound cold email & LinkedIn AI agent that generates 50+ qualified B2B leads monthly.",
                json.dumps(["Automated Lead Scraping", "Hyper-personalized Cold Outreach", "Inbox Deliverability Optimizer", "BANT Lead Qualification", "Analytics Dashboard"]),
                "Small to Medium Businesses, Consultants, Startups",
                json.dumps({"GROWTH5": 5, "SAVE10": 10})
            ),
            (
                "Custom AI Chatbot Integration",
                "Services",
                349.0,
                "USD",
                "Tailored AI assistant integrated into your website, WhatsApp, and Telegram in under 48 hours.",
                json.dumps(["Custom Knowledge Base Training", "WhatsApp Business API Setup", "Instant Lead Notification", "Mobile-Ready Widget"]),
                "Local Businesses, Clinics, Real Estate Agents, Coaches",
                json.dumps({"LAUNCHNOW": 10})
            )
        ]
        
        cursor.executemany('''
            INSERT INTO products (name, category, price, currency, description, features, target_audience, discounts_available)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ''', seed_products)

    # Seed default agent settings
    cursor.execute('SELECT COUNT(*) FROM agent_settings')
    if cursor.fetchone()[0] == 0:
        default_settings = [
            ("agent_name", "Alex (Top AI Sales Closer)"),
            ("business_name", "Apex AI Solutions"),
            ("agent_tone", "Consultative, Charismatic, High-Converting, Empathetic"),
            ("language_mode", "Adaptive (English / Hinglish / Urdu / Hindi / Multi-language)"),
            ("qualification_framework", "BANT (Budget, Authority, Need, Timeline)"),
            ("max_discount_allowed", "20"),
            ("openai_api_key", ""),
            ("gemini_api_key", ""),
            ("calendar_link", "https://calendly.com/apex-ai-demo/30min")
        ]
        cursor.executemany('INSERT OR IGNORE INTO agent_settings (key, value) VALUES (?, ?)', default_settings)

    # Seed sample leads for CRM visualization
    cursor.execute('SELECT COUNT(*) FROM leads')
    if cursor.fetchone()[0] == 0:
        sample_leads = [
            ("Ali Khan", "ali.khan@techcorp.com", "+92 300 1234567", "TechCorp Global", "Qualified", 85, "$1500+", "Decision Maker (CEO)", "Needs automated 24/7 sales agent for web", "Immediate (Within 1 week)", "Enterprise AI Automation Suite", "Highly interested, asked for enterprise demo."),
            ("Sara Jenkins", "sara@growthdigital.io", "+1 415 890 1122", "GrowthDigital Agency", "Demo Booked", 95, "$700/mo", "Marketing Director", "Wants outbound lead gen for 15 clients", "This Month", "Growth Sales & Marketing Agent", "Scheduled demo for tomorrow 3 PM."),
            ("Rohan Sharma", "rohan@retailhub.in", "+91 98765 43210", "RetailHub India", "Proposal Sent", 90, "$1200", "Managing Partner", "WhatsApp AI bot with payment links", "Ready to sign", "Enterprise AI Automation Suite", "Sent quotation with 10% early discount."),
            ("Michael Brown", "mbrown@skyline.com", "+1 312 445 9988", "Skyline Logistics", "New Lead", 40, "Evaluating", "Operations Lead", "Wants support automation", "Next Quarter", "Custom AI Chatbot Integration", "Initial inquiry from website widget."),
            ("Hassan Tariq", "hassan@ecompro.pk", "+92 321 9876543", "EcomPro Stores", "Won", 100, "$1499 Paid", "Owner", "Automated checkout & order tracking", "Closed", "Enterprise AI Automation Suite", "Payment received, onboarding initiated.")
        ]
        cursor.executemany('''
            INSERT INTO leads (name, email, phone, company, stage, lead_score, budget, authority, need, timeline, interested_product, notes)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', sample_leads)

    conn.commit()
    conn.close()

if __name__ == "__main__":
    init_db()
    print("Database initialized successfully.")
