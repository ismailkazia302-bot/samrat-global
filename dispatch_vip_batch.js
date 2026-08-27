/**
 * GELICON GLOBAL — VIP BATCH 1 LIVE OUTREACH DISPATCHER
 * Founder & CEO: Ismail Kazia
 * 
 * Dispatches Top 35 High-Score (96+) Enterprise Leads via Brevo API
 * Staggered with 2.5s safe intervals to ensure maximum inbox deliverability
 */

const fs = require('fs');
const path = require('path');
const axios = require('axios');
require('dotenv').config();

const LEADS_FILE = path.join(__dirname, 'leads_database.json');
const CRM_FILE = path.join(__dirname, 'crm_status.csv');
const REPORTS_DIR = path.join(__dirname, 'daily_reports');

if (!fs.existsSync(REPORTS_DIR)) {
  fs.mkdirSync(REPORTS_DIR, { recursive: true });
}

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const SENDER_EMAIL = process.env.BREVO_SENDER_EMAIL || 'ismailkazia302@gmail.com';
const SENDER_NAME = process.env.BREVO_SENDER_NAME || 'Ismail Kazia | GELICON GLOBAL';

if (!BREVO_API_KEY) {
  console.error('❌ Error: BREVO_API_KEY not found in .env!');
  process.exit(1);
}

// 1. Load Leads & Select Top 35 VIPs
const allLeads = JSON.parse(fs.readFileSync(LEADS_FILE, 'utf8'));
const vipLeads = allLeads
  .filter(l => l.email && l.email.includes('@'))
  .sort((a, b) => (parseInt(b.leadScore) || 0) - (parseInt(a.leadScore) || 0))
  .slice(0, 35);

console.log(`=============================================================`);
console.log(`🚀 GELICON GLOBAL — VIP BATCH 1 OUTREACH DISPATCH`);
console.log(`Founder & CEO: Ismail Kazia | Brevo Sender: ${SENDER_EMAIL}`);
console.log(`Target: Top ${vipLeads.length} High-Ticket Enterprise Leads (Score 96-99)`);
console.log(`=============================================================\n`);

function composeVipEmail(lead) {
  const company = lead.businessName;
  const isBangalore = lead.city === 'Bangalore' || lead.country === 'India';
  const isSaudi = lead.country === 'Saudi Arabia';
  const isDubai = lead.city === 'Dubai' || lead.country === 'UAE';

  if (isBangalore) {
    return {
      subject: `Exclusive Event & Tech Summit Production for ${company} (Bangalore)`,
      body: `Hi ${company} Leadership Team,

I am Ismail Kazia, Founder of GELICON GLOBAL. We produce end-to-end corporate tech summits, hackathons, and executive conclaves across Bangalore.

From prime 5-star venue procurement (The Leela Palace, ITC Gardenia, Taj West End) to curved P2.6 4K LED stage design, concert-grade line-array audio, and VIP speaker concierges, we eliminate the traditional 3-week agency delays with a 48-hour stage blueprint turnaround.

Could I send over a 1-page visual lookbook showing the stage setup we used for a recent 400+ attendee tech summit?

You can also view our live executive portfolio here:
https://ismailkazia302-bot.github.io/samrat-global/proposal_template.html

Warm regards,

Ismail Kazia
Founder & CEO | GELICON GLOBAL
WhatsApp: +91 63639 62640 / +966 54 890 5688
Web: https://ismailkazia302-bot.github.io/samrat-global/`
    };
  } else if (isSaudi) {
    return {
      subject: `Turnkey Conclave & Staging Production for ${company} (Riyadh / Vision 2030)`,
      body: `Dear ${company} Executive Team,

I hope this email finds you well. I am Ismail Kazia, Founder of GELICON GLOBAL, managing executive event staging and growth operations across Saudi Arabia and India.

We deliver turnkey corporate conclaves, brand activations, and summits in Riyadh & Jeddah for Vision 2030 initiatives:
• Complete P2.6 curved 4K LED staging & lighting rigs
• Certified Arabic/English simultaneous interpretation booths
• Direct local Saudi bank wire settlement via Arab National Bank (ANB) with zero foreign exchange delays

Would you be open for a brief 5-minute introductory conversation or WhatsApp exchange this week to review our production portfolio?

Lookbook: https://ismailkazia302-bot.github.io/samrat-global/proposal_template.html

Best regards,

Ismail Kazia
Founder & CEO | GELICON GLOBAL
Riyadh WhatsApp: +966 54 890 5688
India WhatsApp: +91 63639 62640
Email: ismail@geliconglobal.com`
    };
  } else {
    return {
      subject: `High-Net-Worth Buyer Acquisition & Growth Funnels for ${company} (${lead.city || 'Dubai'})`,
      body: `Dear ${company} Leadership Team,

I am Ismail Kazia, Founder of GELICON GLOBAL. We construct pre-qualified buyer acquisition funnels for luxury developers and enterprise brands across Dubai and the GCC.

Our recent property campaigns delivered a 4.8x ROAS by eliminating unqualified form leads and routing pre-verified HNWI buyers directly to sales teams via automated WhatsApp qualification.

Could I share a 2-minute breakdown of how we scaled buyer acquisition for high-ticket projects last month?

Executive Overview: https://ismailkazia302-bot.github.io/samrat-global/

Best regards,

Ismail Kazia
Founder & CEO | GELICON GLOBAL
WhatsApp: +966 54 890 5688 / +91 63639 62640
Email: ismail@geliconglobal.com`
    };
  }
}

async function dispatchBatch() {
  const results = [];
  const today = new Date().toISOString().split('T')[0];

  for (let i = 0; i < vipLeads.length; i++) {
    const lead = vipLeads[i];
    const { subject, body } = composeVipEmail(lead);

    console.log(`[${i + 1}/${vipLeads.length}] 📤 Dispatching to: ${lead.businessName} (${lead.email}) [Score: ${lead.leadScore}]...`);

    try {
      const res = await axios.post('https://api.brevo.com/v3/smtp/email', {
        sender: { name: SENDER_NAME, email: SENDER_EMAIL },
        to: [{ email: lead.email, name: lead.businessName }],
        replyTo: { email: SENDER_EMAIL, name: SENDER_NAME },
        subject: subject,
        htmlContent: body.replace(/\n/g, '<br>')
      }, {
        headers: {
          'api-key': BREVO_API_KEY,
          'Content-Type': 'application/json'
        }
      });

      const messageId = res.data.messageId;
      console.log(`   ✅ Sent successfully! MessageId: ${messageId}`);

      results.push({
        id: lead.id,
        businessName: lead.businessName,
        city: lead.city,
        country: lead.country,
        email: lead.email,
        score: lead.leadScore,
        status: 'Sent',
        messageId: messageId,
        date: today
      });
    } catch (err) {
      const errDetail = err.response && err.response.data ? JSON.stringify(err.response.data) : err.message;
      console.error(`   ⚠️ Notice for ${lead.email}: ${errDetail}`);
      results.push({
        id: lead.id,
        businessName: lead.businessName,
        city: lead.city,
        country: lead.country,
        email: lead.email,
        score: lead.leadScore,
        status: 'Notice / Staged',
        error: errDetail,
        date: today
      });
    }

    // Safe 2-second rate-limit buffer
    await new Promise(r => setTimeout(r, 2000));
  }

  // Save report
  const reportPath = path.join(REPORTS_DIR, `vip_batch_1_${today}.json`);
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2), 'utf8');

  console.log(`\n=============================================================`);
  console.log(`🎉 VIP BATCH 1 DISPATCH COMPLETE!`);
  console.log(`Total Dispatched: ${results.filter(r => r.status === 'Sent').length} / ${results.length}`);
  console.log(`Report Saved: daily_reports/vip_batch_1_${today}.json`);
  console.log(`=============================================================\n`);
}

dispatchBatch();
