/**
 * APEX DYNAMICS — INSTANT LEAD NOTIFICATION ENGINE
 * 
 * Capability:
 * 1. Dispatches instant real-time alerts to your phone via:
 *    - Free Telegram Bot (Instant push notification with 0 delay)
 *    - Gmail SMTP / Nodemailer (Beautiful HTML Lead Alert)
 * 2. Formats incoming lead metadata (Name, Phone, Service, Budget/Score, Location)
 */

require('dotenv').config();
const axios = require('axios');
const nodemailer = require('nodemailer');

/**
 * Send Instant Telegram Push Notification
 */
async function sendTelegramAlert(lead) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.log('ℹ️ Telegram Alerts: No TELEGRAM_BOT_TOKEN/CHAT_ID found in .env (Skipping Telegram).');
    return false;
  }

  const message = `🔥 *NEW HIGH-PRIORITY LEAD RECEIVED!*\n\n` +
    `👤 *Name:* ${lead.name || lead.businessName}\n` +
    `💼 *Service:* ${lead.service || lead.targetService}\n` +
    `📍 *Location:* ${lead.location || lead.city || 'Bangalore'}\n` +
    `📱 *Phone/WhatsApp:* ${lead.phone}\n` +
    `📧 *Email:* ${lead.email}\n` +
    `🎯 *Lead Score:* ${lead.leadScore || 95}/100\n` +
    `📝 *Details:* ${lead.details || 'Priority consultation request'}\n\n` +
    `⚡ *Action:* Open WhatsApp to respond immediately!`;

  try {
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    await axios.post(url, {
      chat_id: chatId,
      text: message,
      parse_mode: 'Markdown'
    });
    console.log('✅ Telegram Instant Alert Dispatched Successfully!');
    return true;
  } catch (error) {
    console.error('⚠️ Telegram Alert Error:', error.response?.data?.description || error.message);
    return false;
  }
}

/**
 * Send Instant Email Alert via Nodemailer (Gmail)
 */
async function sendEmailAlert(lead) {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_PASS;
  const recipient = process.env.MAIL_TO || user;

  if (!user || !pass) {
    console.log('ℹ️ Email Alerts: GMAIL_USER/GMAIL_PASS not set in .env (Skipping Email dispatch).');
    return false;
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass }
  });

  const htmlContent = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #0F172A; color: #F8FAFC; border-radius: 12px; overflow: hidden; border: 1px solid #334155;">
      <div style="background: linear-gradient(135deg, #6366F1, #06B6D4); padding: 24px; text-align: center;">
        <h1 style="margin: 0; font-size: 24px; color: #FFFFFF;">🚀 New Priority Lead Alert</h1>
        <p style="margin: 6px 0 0; color: #E2E8F0; font-size: 14px;">Apex Dynamics Inbound Engine</p>
      </div>

      <div style="padding: 28px;">
        <div style="background: #1E293B; border-radius: 8px; padding: 20px; margin-bottom: 20px; border: 1px solid #334155;">
          <h3 style="margin-top: 0; color: #38BDF8; font-size: 18px;">Lead Information</h3>
          <p style="margin: 8px 0;"><strong>👤 Client Name:</strong> ${lead.name || lead.businessName}</p>
          <p style="margin: 8px 0;"><strong>💼 Service:</strong> ${lead.service || lead.targetService}</p>
          <p style="margin: 8px 0;"><strong>📍 Location:</strong> ${lead.location || lead.city}</p>
          <p style="margin: 8px 0;"><strong>📱 Phone:</strong> <a href="tel:${lead.phone}" style="color: #22C55E;">${lead.phone}</a></p>
          <p style="margin: 8px 0;"><strong>📧 Email:</strong> <a href="mailto:${lead.email}" style="color: #38BDF8;">${lead.email}</a></p>
          <p style="margin: 8px 0;"><strong>📝 Notes:</strong> ${lead.details || 'Inquiry via Web Portal'}</p>
        </div>

        <div style="text-align: center; margin-top: 24px;">
          <a href="https://wa.me/${(lead.phone || '').replace(/[^0-9]/g, '')}" style="display: inline-block; background: #22C55E; color: #000000; font-weight: bold; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-size: 16px;">
            💬 Open WhatsApp Chat
          </a>
        </div>
      </div>
      <div style="background: #0B0F19; padding: 16px; text-align: center; font-size: 12px; color: #94A3B8;">
        Apex Dynamics Automated Lead Ingestion System • Bangalore & Worldwide
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"Apex Dynamics Lead Alert" <${user}>`,
      to: recipient,
      subject: `🚨 [HOT LEAD] ${lead.name || lead.businessName} — ${lead.service || lead.targetService}`,
      html: htmlContent
    });
    console.log(`✅ Email Alert Dispatched Successfully to ${recipient}!`);
    return true;
  } catch (error) {
    console.error('⚠️ Email Alert Error:', error.message);
    return false;
  }
}

/**
 * Dispatch All Active Alert Channels
 */
async function notifyLead(lead) {
  console.log(`\n🔔 Dispatching Inbound Lead Alerts for: "${lead.name || lead.businessName}"...`);
  await sendTelegramAlert(lead);
  await sendEmailAlert(lead);
}

// Self-test execution
if (require.main === module) {
  const sampleLead = {
    name: 'Siddharth Rao (Founder)',
    businessName: 'NextGen AI Technologies',
    service: 'Event Management (Bangalore)',
    location: 'Koramangala, Bangalore',
    phone: '+91 98765 43210',
    email: 'siddharth@nextgenai.tech',
    details: 'Planning a 500-attendee AI Startup Summit in Whitefield next month with full LED stage & live stream.'
  };

  notifyLead(sampleLead);
}

module.exports = { notifyLead, sendTelegramAlert, sendEmailAlert };
