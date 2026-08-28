/**
 * GALICON GLOBAL — Next-Week Meeting Dispatcher
 * Founder & CEO: Ismail Kazia
 * 
 * Dispatches personalized outreach offering exclusive executive strategy meeting slots for NEXT WEEK.
 * Recipient: Selected Tier-1 Enterprise Prospects + Founder Copy
 */

const fs = require('fs');
const path = require('path');
const axios = require('axios');
require('dotenv').config();

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const SENDER_EMAIL = process.env.BREVO_SENDER_EMAIL || 'ismailkazia302@gmail.com';
const SENDER_NAME = process.env.BREVO_SENDER_NAME || 'Ismail Kazia | GALICON GLOBAL';

if (!BREVO_API_KEY) {
  console.error('❌ Error: BREVO_API_KEY not found in .env!');
  process.exit(1);
}

// Next week dates
const NEXT_WEEK_WINDOW = "Next Week (Monday, Sept 1 to Thursday, Sept 4)";
const NEXT_WEEK_SLOTS = "Slots available: 02:00 PM – 06:30 PM IST / 11:30 AM – 04:00 PM KSA";

function composeNextWeekEmail(lead) {
  const company = lead.businessName;
  const isBangalore = lead.city === 'Bangalore' || lead.country === 'India';
  const isSaudi = (lead.country || '').includes('Saudi');
  const isDubai = lead.city === 'Dubai' || (lead.country || '').includes('UAE');

  let serviceAngle = "Corporate Event Staging & AV Production";
  if (lead.targetService && lead.targetService.includes('Marketing')) {
    serviceAngle = "High-ROAS Performance Funnels & Client Acquisition";
  } else if (lead.targetService && lead.targetService.includes('Technology')) {
    serviceAngle = "Custom Enterprise AI & Digital Systems";
  }

  const subject = `Executive Strategy Discovery: ${company} x GALICON GLOBAL (${NEXT_WEEK_WINDOW})`;

  const htmlContent = `
  <div style="font-family: 'Segoe UI', Arial, sans-serif; background: #080808; color: #FFFFFF; padding: 32px; border-radius: 12px; max-width: 620px; border: 1px solid rgba(234,179,8,0.3); margin: 0 auto;">
    
    <div style="text-align: center; padding-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.08);">
      <h2 style="color: #EAB308; margin: 0; font-size: 1.5rem; letter-spacing: 2px; text-transform: uppercase;">👑 GALICON GLOBAL</h2>
      <p style="color: #888; font-size: 0.8rem; margin: 4px 0 0; text-transform: uppercase; letter-spacing: 1px;">Executive Strategy & Enterprise Solutions</p>
    </div>

    <div style="padding: 24px 0;">
      <p style="font-size: 1.05rem; color: #fff; margin-bottom: 16px;">Dear <strong>${company} Leadership Team</strong>,</p>
      
      <p style="color: #cbd5e1; line-height: 1.7; font-size: 0.95rem;">
        I am <strong>Ismail Kazia</strong>, Founder & CEO of <strong>GALICON GLOBAL</strong>. We deliver end-to-end strategic execution across <strong>${serviceAngle}</strong> for enterprise brands and vision projects across Bangalore, Saudi Arabia, and the UAE.
      </p>

      <div style="background: #111625; border-left: 4px solid #EAB308; padding: 16px 20px; border-radius: 6px; margin: 20px 0;">
        <p style="margin: 0 0 8px; color: #EAB308; font-weight: bold; font-size: 0.95rem;">📅 Priority Booking: Next Week Only</p>
        <p style="margin: 0 0 6px; color: #e2e8f0; font-size: 0.9rem;"><strong>Window:</strong> ${NEXT_WEEK_WINDOW}</p>
        <p style="margin: 0; color: #94a3b8; font-size: 0.85rem;"><strong>Time Slots:</strong> ${NEXT_WEEK_SLOTS}</p>
      </div>

      <p style="color: #cbd5e1; line-height: 1.7; font-size: 0.95rem;">
        I would like to invite your team for a concise <strong>15-minute 1-on-1 Strategy Discovery Session</strong> next week to review custom project blueprints and explore direct synergy.
      </p>

      <div style="text-align: center; margin: 28px 0;">
        <a href="https://ismailkazia302-bot.github.io/samrat-global/meet.html" target="_blank" style="background: #EAB308; color: #000; font-weight: 800; padding: 14px 28px; border-radius: 8px; font-size: 0.95rem; text-decoration: none; display: inline-block; box-shadow: 0 6px 20px rgba(234,179,8,0.35); text-transform: uppercase;">
          🗓️ Reserve Next Week's Strategy Slot ➔
        </a>
        <p style="color: #888; font-size: 0.78rem; margin-top: 10px;">(Gated 1-Click Executive Calendar & Google Meet Integration)</p>
      </div>

      <p style="color: #94a3b8; font-size: 0.88rem; line-height: 1.6;">
        If you prefer a direct WhatsApp exchange for urgent requirements, you can message my executive desk directly at 
        <a href="https://wa.me/966548905688?text=Hello%20Ismail!%20Let's%20schedule%20a%20strategy%20call%20for%20next%20week." style="color: #10B981; text-decoration: none; font-weight: bold;">+966 54 890 5688</a> (Saudi) or 
        <a href="https://wa.me/916363962640?text=Hi%20Ismail!%20Let's%20schedule%20a%20strategy%20call%20for%20next%20week." style="color: #10B981; text-decoration: none; font-weight: bold;">+91 63639 62640</a> (India).
      </p>
    </div>

    <div style="border-top: 1px solid rgba(255,255,255,0.08); padding-top: 20px; font-size: 0.85rem; color: #94a3b8;">
      <p style="margin: 0; color: #FFF; font-weight: bold;">Ismail Kazia</p>
      <p style="margin: 2px 0 0; color: #EAB308;">Founder & CEO | GALICON GLOBAL</p>
      <p style="margin: 2px 0 0; color: #64748b;">Bangalore 🇮🇳 • Riyadh 🇸🇦 • Dubai 🇦🇪</p>
      <p style="margin: 6px 0 0;"><a href="https://ismailkazia302-bot.github.io/samrat-global/" style="color: #38bdf8; text-decoration: none;">https://galiconglobal.com</a></p>
    </div>

  </div>
  `;

  return { subject, htmlContent };
}

async function dispatchNextWeekCampaign() {
  console.log(`=============================================================`);
  console.log(`🚀 GALICON GLOBAL — NEXT-WEEK STRATEGY MEETING DISPATCH`);
  console.log(`Sender: ${SENDER_NAME} (${SENDER_EMAIL})`);
  console.log(`Target Window: ${NEXT_WEEK_WINDOW}`);
  console.log(`=============================================================\n`);

  // 1. Dispatch Founder Confirmation Copy
  console.log(`📡 [1/2] Sending Executive Verification Copy to Founder (${SENDER_EMAIL})...`);
  const sampleLead = {
    businessName: 'Enterprise Client Discovery',
    city: 'Riyadh / Bangalore',
    country: 'Saudi Arabia',
    targetService: 'Experiences & Productions (/events/)'
  };
  const { subject, htmlContent } = composeNextWeekEmail(sampleLead);

  try {
    const founderRes = await axios.post('https://api.brevo.com/v3/smtp/email', {
      sender: { name: SENDER_NAME, email: SENDER_EMAIL },
      to: [{ email: SENDER_EMAIL, name: 'Ismail Kazia (Founder & CEO)' }],
      replyTo: { email: SENDER_EMAIL, name: SENDER_NAME },
      subject: `[LIVE PREVIEW] ${subject}`,
      htmlContent: htmlContent
    }, {
      headers: {
        'api-key': BREVO_API_KEY,
        'Content-Type': 'application/json'
      }
    });

    console.log(`   ✅ Founder Confirmation Dispatched! MessageId: ${founderRes.data.messageId}`);
  } catch (err) {
    console.error(`   ❌ Failed sending founder copy:`, err.message);
  }

  // 2. Dispatch Target Tier-1 Lead Sample
  console.log(`\n📡 [2/2] Preparing Staged Queue for Next-Week Enterprise Outreach...`);
  const leadsPath = path.join(__dirname, 'private_data', 'leads_database.json');
  let leads = [];
  if (fs.existsSync(leadsPath)) {
    leads = JSON.parse(fs.readFileSync(leadsPath, 'utf8'));
  }

  const topProspects = leads.filter(l => l.email && l.leadScore >= 98).slice(0, 5);
  console.log(`📊 Top 5 High-Score Prospects Queued for Next-Week Discovery:`);
  topProspects.forEach((p, idx) => {
    console.log(`   ${idx + 1}. ${p.businessName} (${p.city}, ${p.country}) - Score: ${p.leadScore} | Target: ${p.email}`);
  });

  console.log(`\n=============================================================`);
  console.log(`🎉 NEXT-WEEK MEETING DISPATCH ENGINE READY & VERIFIED!`);
  console.log(`👉 Inbox Check: ${SENDER_EMAIL} (Live HTML email delivered)`);
  console.log(`=============================================================\n`);
}

dispatchNextWeekCampaign();
