/**
 * GELICON GLOBAL — DAILY 8:30 AM OUTREACH & 3-MONTH FOLLOW-UP ENGINE
 * Founder & CEO: Ismail Kazia
 * 
 * Capabilities:
 * 1. Automatic 3-Month Follow-up Cycle (Day 0, Day 3, Day 7, Day 14, Day 30, Day 60, Day 90).
 * 2. Processes 300 free emails per day (Brevo / Nodemailer SMTP compliant).
 * 3. Tailored email templates per city (Bangalore Tech, Riyadh/Jeddah KSA, Dubai Real Estate, London Clinics).
 * 4. Updates `crm_status.csv` automatically with timestamps, responses, and next dates.
 * 5. Generates daily executive reports saved in `daily_reports/`.
 */

const fs = require('fs');
const path = require('path');
const axios = require('axios');
const nodemailer = require('nodemailer');
require('dotenv').config();

const LEADS_FILE = path.join(__dirname, 'leads_database.json');
const CRM_FILE = path.join(__dirname, 'crm_status.csv');
const REPORTS_DIR = path.join(__dirname, 'daily_reports');

if (!fs.existsSync(REPORTS_DIR)) {
  fs.mkdirSync(REPORTS_DIR, { recursive: true });
}

/**
 * Brevo REST API Dispatcher (300 free emails/day)
 */
async function sendEmailViaBrevo({ toEmail, toName, subject, textBody, replyToEmail }) {
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;
  const senderName = process.env.BREVO_SENDER_NAME || 'Ismail Kazia | GELICON GLOBAL';
  const replyTo = replyToEmail || process.env.REPLY_TO_EMAIL || senderEmail;

  if (!apiKey || apiKey.includes('your_api_key_here')) {
    // Staging / Simulation mode (creates real logs and reports)
    return { status: 'staged', messageId: 'simulated-' + Date.now() };
  }

  try {
    const response = await axios.post('https://api.brevo.com/v3/smtp/email', {
      sender: { name: senderName, email: senderEmail },
      to: [{ email: toEmail, name: toName || toEmail }],
      replyTo: { email: replyTo, name: senderName },
      subject: subject,
      htmlContent: textBody.replace(/\n/g, '<br>')
    }, {
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json'
      }
    });

    return { status: 'sent', messageId: response.data.messageId };
  } catch (err) {
    const errMsg = err.response && err.response.data ? JSON.stringify(err.response.data) : err.message;
    console.error(`⚠️ Brevo dispatch error for ${toEmail}:`, errMsg);
    return { status: 'failed', error: errMsg };
  }
}

// 3-Month Followup Cadence Rules (in days)
const FOLLOWUP_CADENCE = [
  { step: 0, delayDays: 0, label: 'Day 0: Initial VIP Pitch' },
  { step: 1, delayDays: 3, label: 'Day 3: Value Bump' },
  { step: 2, delayDays: 7, label: 'Day 7: Case Study & Proof' },
  { step: 3, delayDays: 14, label: 'Day 14: Alternative Angle' },
  { step: 4, delayDays: 30, label: 'Day 30: Monthly Market Report' },
  { step: 5, delayDays: 60, label: 'Day 60: Executive Planning Check' },
  { step: 6, delayDays: 90, label: 'Day 90: Final Breakup / Closing Note' },
];

/**
 * Generate Subject & Email Body based on Lead & Cadence Step
 */
function composeEmail(lead, step) {
  const isBangalore = lead.city === 'Bangalore';
  const isSaudi = lead.country === 'Saudi Arabia';
  const isDubai = lead.city === 'Dubai';
  const company = lead.businessName;

  if (step === 0) {
    if (isBangalore) {
      return {
        subject: `Exclusive Event & Tech Summit Production for ${company} (Bangalore)`,
        body: `Hi ${company} Leadership Team,

I am Ismail Kazia, Founder of GELICON GLOBAL. We produce end-to-end corporate tech summits, hackathons, and product launches across Bangalore.

From prime 5-star venue negotiation (The Leela Palace, ITC Gardenia, Taj West End) to curved 4K LED stage design, line-array audio engineering, and VIP hospitality, we take 100% direct founder ownership.

Could I send over a 1-page visual lookbook showing the stage setup we used for a 400+ attendee summit last month?

Warm regards,

Ismail Kazia
Founder & CEO | GELICON GLOBAL
WhatsApp: +91 63639 62640 / +966 54 890 5688
Web: https://ismailkazia302-bot.github.io/samrat-global/`
      };
    } else if (isSaudi) {
      return {
        subject: `Strategic Growth & Digital Performance Acquisition for ${company} (${lead.city})`,
        body: `Dear ${company} Executive Team,

I hope this email finds you well. I am Ismail Kazia, Founder of GELICON GLOBAL, operating across Saudi Arabia and India.

We partner with leading real estate developers and enterprise brands in ${lead.city} to construct hyper-targeted buyer acquisition funnels and digital brand authority systems.

Our recent campaigns achieved 4.8x ROAS with pre-qualified investor leads delivered directly to executive sales teams.

Would you be open for a brief 5-minute conversation or WhatsApp introduction this week?

Best regards,

Ismail Kazia
Founder & CEO | GELICON GLOBAL
Riyadh WhatsApp: +966 54 890 5688
India WhatsApp: +91 63639 62640`
      };
    } else {
      return {
        subject: `High-Net-Worth Client Acquisition Funnel for ${company} (${lead.city})`,
        body: `Hi ${company} Growth Team,

I am Ismail Kazia, Founder of GELICON GLOBAL. We specialize in high-converting buyer and patient acquisition funnels for premier businesses in ${lead.city}.

Our performance systems deliver pre-qualified inquiries with verified budgets directly into your WhatsApp and CRM.

Would you be open to a 2-minute breakdown of how we filter inquiries for maximum sales conversion?

Warm regards,

Ismail Kazia
Founder, GELICON GLOBAL
WhatsApp: +966 54 890 5688 / +91 63639 62640`
      };
    }
  } else if (step === 1) {
    return {
      subject: `Re: Quick follow up for ${company}`,
      body: `Hi ${company} Team,

Just floating this back to the top of your inbox. I know executive schedules in ${lead.city} get very busy.

Did you have a moment to review my note regarding our ${isBangalore ? 'tech event production lookbook' : 'performance acquisition model'}?

Warm regards,
Ismail Kazia | GELICON GLOBAL`
    };
  } else if (step === 2) {
    return {
      subject: `Case Study: 4.8x ROAS and 400+ attendee execution (${company})`,
      body: `Hi ${company} Leadership,

Following up with proof of work:

Last month, we delivered:
1. 400+ corporate summit attendees with zero audio-visual lag in Bangalore.
2. 4.8x verified return on ad spend for high-net-worth real estate buyers in the Middle East.

We would welcome the chance to deliver the exact same standard of excellence for ${company}.

Best,
Ismail Kazia | GELICON GLOBAL
WhatsApp: +966 54 890 5688 / +91 63639 62640`
    };
  } else if (step === 3) {
    return {
      subject: `Quick priority check for ${company}`,
      body: `Hi ${company} Team,

Quick question: Between now and next quarter, is your biggest priority:
A) Finding prime venues and AV staging without vendor headaches?
B) Generating high-ticket qualified client leads on autopilot?

Let me know with a 1-letter reply (A or B) and I will send the exact relevant framework.

Warm regards,
Ismail Kazia`
    };
  } else if (step === 4) {
    return {
      subject: `Monthly Q-Benchmark & Pricing Trends (${lead.city})`,
      body: `Hi ${company} Team,

Sharing our monthly regional industry snapshot for ${lead.city}:
- Average production lead times are tightening by 3 weeks across corporate venues.
- Performance advertising CAC has shifted favorable for brands utilizing direct WhatsApp routing.

If you are planning any corporate initiatives in the next 60 days, our calendar has 2 open production slots.

Best,
Ismail Kazia | GELICON GLOBAL`
    };
  } else if (step === 5) {
    return {
      subject: `Executive check-in before budget allocation (${company})`,
      body: `Hi ${company} Leadership,

Checking in as teams finalize their upcoming budget allocations.

Are corporate events, summits, or digital acquisition on your agenda for the upcoming quarter?

Warm regards,
Ismail Kazia`
    };
  } else {
    return {
      subject: `Closing your file / Permission to stay in touch (${company})`,
      body: `Hi ${company} Team,

I assume corporate production or digital growth is not an immediate priority for ${company} right now, which is completely understandable.

I am closing your file for now so I don't clutter your inbox. Feel free to save my direct WhatsApp number whenever a priority project arises in the future:

Ismail Kazia (Founder & CEO): +966 54 890 5688 / +91 63639 62640
Direct card: https://ismailkazia302-bot.github.io/samrat-global/card.html

Wishing ${company} continued success!

Best regards,
Ismail Kazia`
    };
  }
}

/**
 * Load or initialize CRM state
 */
function loadCrmState(allLeads) {
  let crmMap = new Map();

  if (fs.existsSync(CRM_FILE)) {
    const raw = fs.readFileSync(CRM_FILE, 'utf8');
    const lines = raw.split('\n').filter(l => l.trim().length > 0);
    for (let i = 1; i < lines.length; i++) {
      const parts = lines[i].split(',').map(p => p.replace(/^"|"$/g, ''));
      if (parts.length >= 8) {
        crmMap.set(parts[0], {
          id: parts[0],
          name: parts[1],
          city: parts[2],
          country: parts[3],
          service: parts[4],
          phone: parts[5],
          email: parts[6],
          score: parts[7] || 90,
          status: parts[8] || 'Not Contacted',
          contactedDate: parts[9] || '',
          response: parts[10] || '',
          followUpDate: parts[11] || '',
          dealValue: parts[12] || '',
          step: parseInt(parts[13] || '0', 10),
          notes: parts[14] || ''
        });
      }
    }
  }

  // Ensure all leads from database exist in CRM map
  allLeads.forEach(l => {
    if (!crmMap.has(l.id)) {
      crmMap.set(l.id, {
        id: l.id,
        name: l.businessName,
        city: l.city,
        country: l.country,
        service: l.targetService,
        phone: l.phone,
        email: l.email,
        score: l.leadScore,
        status: 'Not Contacted',
        contactedDate: '',
        response: '',
        followUpDate: '',
        dealValue: '',
        step: 0,
        notes: `Extracted lead - Priority ${l.leadScore}`
      });
    }
  });

  return crmMap;
}

/**
 * Save updated CRM state to CSV
 */
function saveCrmState(crmMap) {
  const header = 'ID,Business Name,City,Country,Service,Phone,Email,Lead Score,Status,Contacted Date,Response,Follow Up Date,Deal Value (INR/SAR),Cadence Step,Notes';
  const rows = Array.from(crmMap.values()).map(r =>
    `"${r.id}","${r.name}","${r.city}","${r.country}","${r.service}","${r.phone}","${r.email}","${r.score}","${r.status}","${r.contactedDate}","${r.response}","${r.followUpDate}","${r.dealValue}","${r.step}","${r.notes}"`
  );
  fs.writeFileSync(CRM_FILE, [header, ...rows].join('\n'));
}

/**
 * Main Daily 8:30 AM Engine Runner
 */
async function runDailyOutreachEngine(maxBatch = 300) {
  console.log(`\n======================================================`);
  console.log(`👑 GELICON GLOBAL — DAILY 8:30 AM OUTREACH ENGINE`);
  console.log(`Founder: Ismail Kazia | Cadence: 3-Month Automated Cycle`);
  console.log(`Timestamp: ${new Date().toLocaleString()}`);
  console.log(`======================================================`);

  if (!fs.existsSync(LEADS_FILE)) {
    console.error(`❌ leads_database.json not found!`);
    return;
  }

  const allLeads = JSON.parse(fs.readFileSync(LEADS_FILE, 'utf8'));
  const crmMap = loadCrmState(allLeads);

  const todayStr = new Date().toISOString().split('T')[0];
  const dueQueue = [];

  // Filter leads that are due for Day 0 or next scheduled followup
  for (let record of crmMap.values()) {
    if (record.status === 'Not Contacted') {
      dueQueue.push({ record, nextStep: 0 });
    } else if (record.status === 'Contacted' || record.status === 'Followup Scheduled') {
      if (record.followUpDate && record.followUpDate <= todayStr && record.step < 6) {
        dueQueue.push({ record, nextStep: record.step + 1 });
      }
    }
  }

  // Sort queue by lead score descending
  dueQueue.sort((a, b) => (parseInt(b.record.score) || 0) - (parseInt(a.record.score) || 0));

  // Cap at daily limit (300 free emails per day)
  const batch = dueQueue.slice(0, maxBatch);

  console.log(`🎯 Queue status: ${dueQueue.length} leads due | Processing today's batch: ${batch.length} leads (Limit: ${maxBatch}/day)`);

  const processedReports = [];

  for (let item of batch) {
    const { record, nextStep } = item;
    const content = composeEmail({
      businessName: record.name,
      city: record.city,
      country: record.country,
      targetService: record.service
    }, nextStep);

    // Send via Brevo (or Staging mode if API key not set)
    const sendResult = await sendEmailViaBrevo({
      toEmail: record.email,
      toName: record.name,
      subject: content.subject,
      textBody: content.body
    });

    // Calculate next followup date
    const cadenceRule = FOLLOWUP_CADENCE[nextStep] || FOLLOWUP_CADENCE[0];
    const nextCadenceRule = FOLLOWUP_CADENCE[nextStep + 1];

    let nextFollowupDateStr = '';
    if (nextCadenceRule) {
      const nextDate = new Date();
      nextDate.setDate(nextDate.getDate() + (nextCadenceRule.delayDays - cadenceRule.delayDays));
      nextFollowupDateStr = nextDate.toISOString().split('T')[0];
    }

    // Update CRM record
    record.status = nextStep === 6 ? 'Completed Cycle' : 'Contacted';
    record.contactedDate = record.contactedDate || todayStr;
    record.step = nextStep;
    record.followUpDate = nextFollowupDateStr;
    record.notes = `${cadenceRule.label} [${sendResult.status.toUpperCase()}] on ${todayStr}`;

    crmMap.set(record.id, record);

    processedReports.push({
      id: record.id,
      company: record.name,
      city: record.city,
      country: record.country,
      email: record.email,
      phone: record.phone,
      step: nextStep,
      stepLabel: cadenceRule.label,
      subject: content.subject,
      sendStatus: sendResult.status,
      messageId: sendResult.messageId || null,
      nextFollowup: nextFollowupDateStr
    });

    console.log(`[${processedReports.length}/${batch.length}] ${record.name} (${record.email}) -> ${sendResult.status}`);
    await new Promise(resolve => setTimeout(resolve, 600));
  }

  // Save updated CRM
  saveCrmState(crmMap);

  // Generate Daily Report File
  const reportFileName = `report_${todayStr}.json`;
  const reportTxtName = `report_${todayStr}.txt`;

  const summary = {
    date: todayStr,
    runTime: new Date().toISOString(),
    totalDatabaseLeads: allLeads.length,
    processedCount: processedReports.length,
    remainingDue: Math.max(0, dueQueue.length - batch.length),
    batch: processedReports
  };

  fs.writeFileSync(path.join(REPORTS_DIR, reportFileName), JSON.stringify(summary, null, 2));

  // Also write human-readable TXT report
  const txtLines = [
    `======================================================`,
    `GELICON GLOBAL — DAILY 8:30 AM OUTREACH REPORT`,
    `Founder: Ismail Kazia`,
    `Date: ${todayStr} | Generated At: ${new Date().toLocaleTimeString()}`,
    `Total Leads In Engine: ${allLeads.length}`,
    `Emails Processed Today: ${processedReports.length}`,
    `======================================================\n`,
    `TOP REACHED CLIENTS TODAY:`
  ];

  processedReports.forEach((r, idx) => {
    txtLines.push(`${idx + 1}. [${r.country} - ${r.city}] ${r.company}`);
    txtLines.push(`   Contact: ${r.email} | WhatsApp: ${r.phone}`);
    txtLines.push(`   Cadence: ${r.stepLabel}`);
    txtLines.push(`   Subject: "${r.subject}"`);
    txtLines.push(`   Next Follow-up Date: ${r.nextFollowup || 'None (Completed)'}\n`);
  });

  fs.writeFileSync(path.join(REPORTS_DIR, reportTxtName), txtLines.join('\n'));

  console.log(`\n✅ Daily Outreach Completed Successfully!`);
  console.log(`📄 Saved Daily JSON Report: daily_reports/${reportFileName}`);
  console.log(`📄 Saved Daily TXT Report: daily_reports/${reportTxtName}`);
  console.log(`📊 CRM Updated: crm_status.csv`);
  console.log(`======================================================\n`);

  return summary;
}

if (require.main === module) {
  runDailyOutreachEngine(300);
}

module.exports = { runDailyOutreachEngine, composeEmail };
