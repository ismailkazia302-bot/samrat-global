import re
import json
import os
import requests
try:
    from backend.database import get_db_connection, init_db
    from backend.tools import (
        search_product_catalog,
        capture_or_update_lead,
        schedule_meeting,
        generate_quotation,
        OBJECTION_GUIDELINES
    )
except ImportError:
    from database import get_db_connection, init_db
    from tools import (
        search_product_catalog,
        capture_or_update_lead,
        schedule_meeting,
        generate_quotation,
        OBJECTION_GUIDELINES
    )

class SalesAgentEngine:
    def __init__(self):
        init_db()
        self.load_settings()

    def load_settings(self):
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT key, value FROM agent_settings")
        self.settings = {r["key"]: r["value"] for r in cursor.fetchall()}
        conn.close()

    def get_setting(self, key: str, default: str = ""):
        return self.settings.get(key, default)

    def detect_language_style(self, text: str) -> str:
        text_lower = text.lower()
        hinglish_words = ["kya", "hai", "mujhe", "chahiye", "kitna", "mehnga", "batao", "kaise", "apka", "sasta", "accha", "shukriya", "bhai", "ji", "ha", "nahi"]
        is_hinglish = any(re.search(r'\b' + w + r'\b', text_lower) for w in hinglish_words)
        return "hinglish" if is_hinglish else "english"

    def extract_lead_entities(self, text: str) -> dict:
        entities = {}
        # Email detection
        email_match = re.search(r'[\w\.-]+@[\w\.-]+\.\w+', text)
        if email_match:
            entities["email"] = email_match.group(0)

        # Phone detection
        phone_match = re.search(r'(\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9})', text)
        if phone_match and len(re.sub(r'\D', '', phone_match.group(0))) >= 10:
            entities["phone"] = phone_match.group(0).strip()

        # Name heuristic ("My name is X", "I am X", "Mera naam X hai")
        name_match = re.search(r'(?:my name is|i am|mera naam|naam hai|this is)\s+([A-Za-z]+(?:\s+[A-Za-z]+)?)', text, re.IGNORECASE)
        if name_match:
            entities["name"] = name_match.group(1).strip()

        # Budget mentions
        budget_match = re.search(r'(\$\d+|\d+\s*(?:usd|pkr|inr|dollars|k))', text, re.IGNORECASE)
        if budget_match:
            entities["budget"] = budget_match.group(0)

        return entities

    def identify_objections(self, text: str):
        text_lower = text.lower()
        matched = []
        for obj_key, obj_data in OBJECTION_GUIDELINES.items():
            for p in obj_data["pattern"]:
                if p in text_lower:
                    matched.append((obj_key, obj_data))
                    break
        return matched

    def call_external_llm(self, messages: list) -> str:
        # Check for Gemini API Key or OpenAI API key in settings or env
        gemini_key = self.get_setting("gemini_api_key") or os.environ.get("GEMINI_API_KEY")
        openai_key = self.get_setting("openai_api_key") or os.environ.get("OPENAI_API_KEY")

        system_prompt = f"""
You are {self.get_setting('agent_name', 'Alex')}, the world-class Chief Sales Closer for {self.get_setting('business_name', 'Apex AI Solutions')}.
Your goal: Consult, qualify with BANT, handle objections expertly, and close high-ticket deals or book product demos.

Tone & Persona:
- Charismatic, persuasive, empathetic, confident, consultative.
- Adapt language seamlessly: If the customer writes in Urdu/Hindi/Hinglish, reply in natural, engaging Hinglish/Urdu. If in English, reply in crisp B2B executive English.
- Always provide clear ROI numbers and end with a strong, single call-to-action (CTA).
- Do not sound like a generic robot. Sound like a passionate top 1% sales director.

Product Catalog:
{json.dumps(search_product_catalog(), indent=2)}

Available Tools / Actions:
- Offer Discount Code: 'CLOSENOW' (15% off), 'FIRST10' (10% off).
- Meeting Booking: {self.get_setting('calendar_link', 'https://calendly.com/apex-ai-demo/30min')}
"""

        if gemini_key:
            try:
                url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={gemini_key}"
                contents = []
                for m in messages:
                    contents.append({
                        "role": "user" if m["role"] in ["user", "system"] else "model",
                        "parts": [{"text": m["content"]}]
                    })
                resp = requests.post(url, json={"contents": contents, "system_instruction": {"parts": [{"text": system_prompt}]}}, timeout=10)
                if resp.status_code == 200:
                    data = resp.json()
                    return data["candidates"][0]["content"]["parts"][0]["text"]
            except Exception as e:
                print(f"Gemini API error fallback: {e}")

        if openai_key:
            try:
                url = "https://api.openai.com/v1/chat/completions"
                headers = {"Authorization": f"Bearer {openai_key}", "Content-Type": "application/json"}
                payload = {
                    "model": "gpt-4o-mini",
                    "messages": [{"role": "system", "content": system_prompt}] + messages,
                    "temperature": 0.7
                }
                resp = requests.post(url, headers=headers, json=payload, timeout=10)
                if resp.status_code == 200:
                    data = resp.json()
                    return data["choices"][0]["message"]["content"]
            except Exception as e:
                print(f"OpenAI API error fallback: {e}")

        return None

    def autonomous_sales_reply(self, user_text: str, history: list, session_id: str) -> dict:
        text_lower = user_text.lower()
        lang = self.detect_language_style(user_text)
        entities = self.extract_lead_entities(user_text)
        objections = self.identify_objections(user_text)
        products = search_product_catalog()
        
        # Check if booking demo requested
        is_booking_request = any(k in text_lower for k in ["book", "demo", "meeting", "call", "schedule", "baat karni", "call karo", "time slot"])
        is_quote_request = any(k in text_lower for k in ["quote", "quotation", "proposal", "invoice", "price slip", "estimate"])
        is_discount_request = any(k in text_lower for k in ["discount", "kam karo", "concession", "offer", "deal", "sasta"])
        
        tool_action_taken = None
        tool_data = None

        # 1. Lead capture in CRM
        if entities:
            capture_or_update_lead(
                name=entities.get("name"),
                email=entities.get("email"),
                phone=entities.get("phone"),
                budget=entities.get("budget"),
                notes=f"Interacted via chat. Inquiry: '{user_text[:60]}...'"
            )

        # 2. Try External LLM if available
        llm_reply = self.call_external_llm(history + [{"role": "user", "content": user_text}])
        if llm_reply:
            return {
                "reply": llm_reply,
                "tool_action": tool_action_taken,
                "tool_data": tool_data,
                "lead_detected": entities
            }

        # 3. High-Converting Autonomous Sales Logic (Fall-back & Native Engine)
        # CASE A: Booking / Demo Scheduling
        if is_booking_request:
            tool_action_taken = "schedule_meeting"
            cal_link = self.get_setting("calendar_link", "https://calendly.com/apex-ai-demo/30min")
            if entities.get("email"):
                booking_res = schedule_meeting(
                    lead_name=entities.get("name", "Valued Client"),
                    lead_email=entities.get("email"),
                    date_time="Tomorrow 3:00 PM (Instant Hold)",
                    topic="VIP Sales & Architecture Consultation"
                )
                tool_data = booking_res
                if lang == "hinglish":
                    reply = f"🎉 Zabardast! Maine aapka demo slot **Tomorrow 3:00 PM** ke liye lock kar diya hai.\n\nAapko confirmation email **{entities.get('email')}** par send kar di gayi hai. Agar aap time change karna chahein toh aap is direct link se bhi reschedule kar sakte hain:\n🔗 [{cal_link}]({cal_link})\n\nKya aap chahte hain ke demo se pehle main aapke business ke liye custom proposal ready rakhun?"
                else:
                    reply = f"🎉 Excellent! I've reserved a VIP 1-on-1 strategy demo for you for **Tomorrow at 3:00 PM**.\n\nA confirmation has been routed to **{entities.get('email')}**. If you prefer a custom time, feel free to pick your preferred slot here:\n🔗 [{cal_link}]({cal_link})\n\nWould you like me to prepare a tailored solution blueprint before our call?"
            else:
                if lang == "hinglish":
                    reply = f"Main khushi se aapke liye live product demo aur strategy consultation schedule kar deta hoon!\n\n👉 Kripya apna **Email aur Phone Number** share karein, ya direct hamare calendar se slot select karein:\n🔗 [{cal_link}]({cal_link})\n\nAapka kaunsa business use-case sabse urgent hai?"
                else:
                    reply = f"I'd be thrilled to arrange a live interactive demonstration for your team!\n\n👉 Please share your **Email and Phone Number**, or directly select a convenient slot on our calendar:\n🔗 [{cal_link}]({cal_link})\n\nWhat is your #1 priority challenge you'd like us to solve during the demo?"
            
            return {"reply": reply, "tool_action": tool_action_taken, "tool_data": tool_data, "lead_detected": entities}

        # CASE B: Quotation Generation / Formal Proposal
        if is_quote_request:
            tool_action_taken = "generate_quotation"
            quote_res = generate_quotation(product_name="Enterprise AI Automation Suite", lead_email=entities.get("email"), discount_code="CLOSENOW")
            tool_data = quote_res
            if lang == "hinglish":
                reply = f"📄 Maine aapke liye instant **Official Quotation ({quote_res['quote_number']})** generate kar di hai!\n\n" \
                        f"• **Package**: {quote_res['product']}\n" \
                        f"• **Original Price**: {quote_res['original_price']}\n" \
                        f"• **Exclusive Fast-Action Discount**: {quote_res['discount_percent']} (Code: CLOSENOW applied)\n" \
                        f"• **Final Investment**: **{quote_res['final_price']}** (You Save {quote_res['savings']})\n" \
                        f"• **Guarantee**: 30-Day Complete Satisfaction Money-Back Guarantee.\n\n" \
                        f"Kya aap chahte hain main onboarding link aur invoice generate kar doon?"
            else:
                reply = f"📄 Here is your official **Solution Proposal ({quote_res['quote_number']})**:\n\n" \
                        f"• **Package**: {quote_res['product']}\n" \
                        f"• **Standard Value**: {quote_res['original_price']}\n" \
                        f"• **Executive Closing Discount**: {quote_res['discount_percent']} (Applied Coupon: CLOSENOW)\n" \
                        f"• **Net Investment**: **{quote_res['final_price']}** (Instant Savings: {quote_res['savings']})\n" \
                        f"• **Terms**: 30-Day Money-back guarantee + full dedicated deployment.\n\n" \
                        f"Shall I finalize your onboarding so we can start deployment today?"
            return {"reply": reply, "tool_action": tool_action_taken, "tool_data": tool_data, "lead_detected": entities}

        # CASE C: Objection Handling (Price, Competitors, Trust, Delay)
        if objections:
            obj_key, obj_info = objections[0]
            if obj_key == "price_too_high":
                tool_action_taken = "apply_discount"
                quote_res = generate_quotation(product_name="Enterprise AI Automation", custom_discount_pct=15.0)
                tool_data = quote_res
                if lang == "hinglish":
                    reply = f"Main aapki baat 100% samajh sakta hoon ke budget bohot important factor hai! 💡\n\nLekin ek cheez dekhein: Hamare system se clients ko daily 3x-5x leads aur automated closings milti hain jo 14 din ke andar poori cost recover kar leti hain.\n\nAur kyunki aap serious hain, main management se **Special 15% VIP Discount** authorize kar raha hoon:\n💰 Net Price: **{quote_res['final_price']}** (Standard {quote_res['original_price']}) — Code **CLOSENOW**.\n\nKya hum aaj onboarding shuru karein taaki kal se aapki sales automate ho sakein?"
                else:
                    reply = f"I completely respect that budget is top of mind! 💡\n\nHowever, consider the ROI: Our AI works 24/7, captures hot leads within 3 seconds, and our average client generates a 4.2x return within their first 30 days.\n\nBecause I want to make this an absolute no-brainer for you, I've unlocked a **Special 15% VIP Closing Discount**:\n💰 Net Investment: **{quote_res['final_price']}** (Standard {quote_res['original_price']}) with Promo Code **CLOSENOW**.\n\nShall we secure this pricing for you today?"
            elif obj_key == "competitor_comparison":
                if lang == "hinglish":
                    reply = "Bohot acha sawal! Market mein kai basic chatbots hain jo sirf static FAQ dete hain aur leads lose kar dete hain. 🚀\n\nHamara system **Autonomous BANT Sales Closer** hai:\n1. Yeh customer ki psychology samajhta hai (Urdu, English, Hinglish mein naturally negotiate karta hai).\n2. Real-time CRM update, live Calendar booking aur instant quotation issue karta hai.\n3. 30-day money-back guarantee ke sath aata hai.\n\nKya aap ek 10-minute live test demo dekhna chahenge?"
                else:
                    reply = "That's a very smart question! While standard market tools offer basic rigid chatbots, our solution is a true **Autonomous AI Sales closer**:\n1. Real-time BANT qualification & multi-language psychological negotiation.\n2. Deep CRM sync, dynamic quotation generation, and calendar booking.\n3. Backed by a 30-day 100% Risk-Free Money-Back Guarantee.\n\nWould you like a quick 10-minute live demo to see the difference firsthand?"
            elif obj_key == "need_time_to_think":
                if lang == "hinglish":
                    reply = "Beshak! Aap poora time lein, decision bohot important hai. 🤝\n\nAapke decision ko aasan banane ke liye, kya hum ek quick 15-minute screen-share demo kar lein jahan main aapko aapke business use-case par live run karke dikha doon? Koi commitment nahi hai.\n\nAapke liye kal konsa time best rahega?"
                else:
                    reply = "Completely understandable! It's an important strategic decision. 🤝\n\nTo help you evaluate without any pressure, how about a 15-minute zero-obligation walkthrough tailored to your exact workflow?\n\nWhich day this week works best for your schedule?"
            else:
                if lang == "hinglish":
                    reply = "Hum apni quality aur results par 100% confident hain! Isliye hum **30-Day Money-Back Guarantee** aur full onboarding setup support provide karte hain.\n\nAapka email share karein taaki main aapko hamari detailed Case Studies aur Client Proof send kar sakun?"
                else:
                    reply = "We stand firmly behind our track record! We offer a full **30-Day Satisfaction Guarantee** and dedicated deployment engineering.\n\nPlease share your email address so I can send over our latest verified case studies and benchmark results."
            
            return {"reply": reply, "tool_action": tool_action_taken, "tool_data": tool_data, "lead_detected": entities}

        # CASE D: Greetings & Discovery / Product Inquiries
        if any(w in text_lower for w in ["hello", "hi", "hey", "salam", "assalam", "kya haal", "bhai", "namaste", "start"]):
            if lang == "hinglish":
                reply = f"Salam & Welcome! Main {self.get_setting('agent_name', 'Alex')} hoon — {self.get_setting('business_name', 'Apex AI Solutions')} ka Senior AI Sales Partner. 🚀\n\nHum businesses ki sales aur lead generation ko 24/7 automate karte hain taaki aapka revenue 3x boost ho sake.\n\nAapka business kis industry mein hai, aur is waqt lead generation ya sales closing mein sabse bada challenge kya aa raha hai?"
            else:
                reply = f"Hello & Welcome! I'm {self.get_setting('agent_name', 'Alex')}, Senior AI Sales Partner at {self.get_setting('business_name', 'Apex AI Solutions')}. 🚀\n\nWe empower modern businesses with autonomous 24/7 AI Sales and Lead Closing systems to scale revenue 3x faster.\n\nTell me a little about your business: What is your core product or service, and what is your main sales goal this month?"
            return {"reply": reply, "tool_action": None, "tool_data": None, "lead_detected": entities}

        # CASE E: General Discovery & Value Pitch
        p_list_str = "\n".join([f"• **{p['name']}** ({p['currency']} {p['price']}) — {p['description']}" for p in products[:3]])
        if lang == "hinglish":
            reply = f"Main aapke business ko analyze karke best solution suggest kar sakta hoon! 💼\n\nHamare Top In-Demand Solutions:\n{p_list_str}\n\nAapke hisab se aapke business ke liye kaunsa package sabse suitable lagta hai? Ya aap chahein toh main aapke requirement ke mutabiq custom quote prepare kar doon?"
        else:
            reply = f"I'd love to match your specific requirements with our high-impact solutions! 💼\n\nOur Most In-Demand Systems:\n{p_list_str}\n\nWhich tier aligns closest with your immediate revenue targets? I can also generate a tailored proposal with exclusive fast-action pricing for you right now."

        return {"reply": reply, "tool_action": tool_action_taken, "tool_data": tool_data, "lead_detected": entities}

sales_agent_instance = SalesAgentEngine()
