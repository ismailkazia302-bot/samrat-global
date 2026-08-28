/**
 * GALICON GLOBAL — 100 Enterprise B2B Email Batch Dispatcher
 * Founder & CEO: Ismail Kazia
 * Dispatches personalized Next-Week Strategy Discovery invitations via Brevo API.
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

const LEADS_FILE = path.join(__dirname, 'private_data', 'leads_database.json');
const LOG_FILE = path.join(__dirname, 'private_data', 'dispatched_100_log.json');
const CRM_FILE = path.join(__dirname, 'private_data', 'crm_status.csv');

if (!fs.existsSync(LEADS_FILE)) {
  console.error('❌ Error: leads_database.json not found!');
  process.exit(1);
}

const allLeads = JSON.parse(fs.readFileSync(LEADS_FILE, 'utf8'));

// Filter valid leads with emails
const validLeads = allLeads.filter(l => l.email && l.email.includes('@') && !l.email.includes('example.com'));

// Take top 100 leads
const targetBatch = validLeads.slice(0, 100);

console.log(`=============================================================`);
console.log(`🚀 GALICON GLOBAL — DISPATCHING 100 ENTERPRISE EMAILS`);
console.log(`=============================================================`);
console.log(`📊 Total Valid Leads in Batch: ${targetBatch.length}`);
console.log(`✉️ Sender: ${SENDER_NAME} <${SENDER_EMAIL}>`);
console.log(`=============================================================\n`);

function composeEmail(lead) {
  const company = lead.businessName;
  const isBangalore = lead.city === 'Bangalore' || lead.country === 'India';
  const isSaudi = (lead.country || '').includes('Saudi');
  const isDubai = lead.city === 'Dubai' || (lead.country || '').includes('UAE');

  let serviceAngle = "Corporate Event Staging & AV Production";
  if (lead.targetService && lead.targetService.includes('Marketing')) {
    serviceAngle = "High-ROAS Performance Funnels & Client Acquisition";
  } else if (lead.targetService && lead.targetService.includes('Technology')) {
    serviceAngle = "Custom Enterprise AI & Digital Infrastructure";
  }

  const subject = `Executive Strategy Discovery: ${company} x GALICON GLOBAL (Next Week)`;

  const htmlContent = `
  <div style="font-family: 'Segoe UI', Arial, sans-serif; background: #080808; color: #FFFFFF; padding: 32px; border-radius: 12px; max-width: 620px; border: 1px solid rgba(234,179,8,0.3); margin: 0 auto;">
    
    <div style="text-align: center; padding-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.08);">
      <h2 style="color: #EAB308; margin: 0; font-size: 1.5rem; letter-spacing: 2px; text-transform: uppercase;">👑 GALICON GLOBAL</h2>
      <p style="color: #888; font-size: 0.8rem; margin: 4px 0 0; text-transform: uppercase; letter-spacing: 1px;">Executive Strategy & Enterprise Solutions</p>
    </div>

    <div style="padding: 24px 0;">
      <p style="font-size: 1.05rem; color: #fff; margin-bottom: 16px;">Dear <strong>${company} Leadership Team</strong>,</p>
      
      <p style="color: #cbd5e1; line-height: 1.7; font-size: 0.95rem;">
        I am <strong>Ismail Kazia</strong>, Founder & CEO of <strong>GALICON GLOBAL</strong>. We engineer high-impact business solutions across <strong>${serviceAngle}</strong> for enterprise brands and scaling organizations.
      </p>

      <div style="background: #111625; border-left: 4px solid #EAB308; padding: 16px 20px; border-radius: 6px; margin: 20px 0;">
        <p style="margin: 0 0 8px; color: #EAB308; font-weight: bold; font-size: 0.95rem;">📅 Priority Booking: Next Week Window</p>
        <p style="margin: 0 0 6px; color: #e2e8f0; font-size: 0.9rem;"><strong>Dates:</strong> Monday to Friday (Next Week)</p>
        <p style="margin: 0; color: #94a3b8; font-size: 0.85rem;"><strong>Time Slots:</strong> 02:00 PM – 06:30 PM IST / 11:30 AM – 04:00 PM KSA</p>
      </div>

      <p style="color: #cbd5e1; line-height: 1.7; font-size: 0.95rem;">
        I would like to invite your executive team for a focused <strong>15-minute 1-on-1 Strategy Discovery Session</strong> next week to review custom project blueprints, explore potential collaboration, and outline a 48-hour delivery framework.
      </p>

      <div style="text-align: center; margin: 28px 0;">
        <a href="https://ismailkazia302-bot.github.io/samrat-global/meet.html" target="_blank" style="background: #EAB308; color: #000; font-weight: 800; padding: 14px 28px; border-radius: 8px; font-size: 0.95rem; text-decoration: none; display: inline-block; box-shadow: 0 6px 20px rgba(234,179,8,0.35); text-transform: uppercase;">
          🗓️ Reserve Next Week's Strategy Slot ➔
        </a>
      </div>

      <p style="color: #94a3b8; font-size: 0.85rem; line-height: 1.6; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 16px; margin-top: 24px;">
        Alternatively, you may connect with my executive desk directly via WhatsApp:<br>
        🇮🇳 <strong>India:</strong> <a href="https://wa.me/916363962640" style="color: #EAB308; text-decoration: none;">+91 63639 62640</a> | 
        🇸🇦 <strong>Saudi Arabia / GCC:</strong> <a href="https://wa.me/966548905688" style="color: #EAB308; text-decoration: none;">+966 54 890 5688</a>
      </p>
    </div>

    <div style="border-top: 1px solid rgba(255,255,255,0.08); padding-top: 18px; font-size: 0.82rem; color: #666; text-align: center;">
      <p style="margin: 0; color: #fff; font-weight: bold;">Ismail Kazia</p>
      <p style="margin: 2px 0 6px; color: #EAB308;">Founder & CEO | GALICON GLOBAL</p>
      <p style="margin: 0; font-size: 0.75rem;">Bangalore • Riyadh • Dubai • London</p>
    </div>
  </div>
  `;

  return { subject, htmlContent };
}

async function sendSingleEmail(lead, index) {
  const { subject, htmlContent } = composeEmail(lead);

  const payload = {
    sender: { name: SENDER_NAME, email: SENDER_EMAIL },
    to: [{ email: lead.email, name: lead.businessName }],
    replyTo: { email: SENDER_EMAIL, name: SENDER_NAME },
    subject: subject,
    htmlContent: htmlContent
  };

  try {
    const response = await axios.post('https://api.brevo.com/v3/smtp/email', payload, {
      headers: {
        'api-key': BREVO_API_KEY,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    console.log(`✅ [${index + 1}/100] Sent to: ${lead.businessName.padEnd(35)} | Email: ${lead.email} | MsgID: ${response.data.messageId || 'OK'}`);
    return { success: true, lead: lead.businessName, email: lead.email, messageId: response.data.messageId };
  } catch (error) {
    const errDetail = error.response && error.response.data ? JSON.stringify(error.response.data) : error.message;
    console.error(`❌ [${index + 1}/100] FAILED: ${lead.businessName} (${lead.email}) -> ${errDetail}`);
    return { success: false, lead: lead.businessName, email: lead.email, error: errDetail };
  }
}

async function dispatchAll() {
  const results = [];
  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < targetBatch.length; i++) {
    const res = await sendSingleEmail(targetBatch[i], i);
    results.push(res);
    if (res.success) successCount++;
    else failCount++;

    // 1.2 second delay between sends for safe rate limiting
    if (i < targetBatch.length - 1) {
      await new Promise(r => setTimeout(r, 1200));
    }
  }

  // Save dispatch report
  fs.writeFileSync(LOG_FILE, JSON.stringify({
    timestamp: new Date().toISOString(),
    totalAttempted: targetBatch.length,
    successCount,
    failCount,
    results
  }, null, 2));

  console.log(`\n=============================================================`);
  console.log(`🎉 100 EMAIL BATCH DISPATCH COMPLETE!`);
  console.log(`=============================================================`);
  console.log(`✅ Successful: ${successCount}`);
  console.log(`❌ Failed:     ${failCount}`);
  console.log(`📁 Log saved to: private_data/dispatched_100_log.json`);
  console.log(`=============================================================\n`);
}

dispatchAll();
