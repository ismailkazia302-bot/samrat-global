const axios = require('axios');
require('dotenv').config();

async function testBrevo() {
  const apiKey = process.env.BREVO_API_KEY;
  const email = process.env.BREVO_SENDER_EMAIL;
  const name = process.env.BREVO_SENDER_NAME;

  console.log(`📡 Connecting to Brevo API with sender: ${email}...`);

  try {
    const res = await axios.post('https://api.brevo.com/v3/smtp/email', {
      sender: { name: name, email: email },
      to: [{ email: email, name: 'Ismail Kazia (Founder)' }],
      subject: '👑 GELICON GLOBAL — AI Outreach Engine Connected Successfully!',
      htmlContent: `
        <div style="font-family: Arial, sans-serif; background: #000; color: #fff; padding: 30px; border-radius: 12px; max-width: 600px;">
          <h2 style="color: #EAB308; margin-bottom: 10px;">👑 GELICON GLOBAL</h2>
          <p style="font-size: 1.1rem; color: #fff;">Mubarak ho Ismail bhai! 🎉</p>
          <p style="color: #ccc; line-height: 1.6;">
            Aapka Brevo Email Engine ab <strong>GELICON Autonomous AI System</strong> ke saath 100% connect ho chuka hai.
          </p>
          <div style="background: #111; border: 1px solid #333; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #10B981; font-weight: bold;">✓ Brevo API Key: Verified & Active</p>
            <p style="margin: 5px 0 0; color: #aaa;">✓ Daily Limit: 300 Free B2B Outreach Emails / Day</p>
            <p style="margin: 5px 0 0; color: #aaa;">✓ Reply-To: ismailkazia302@gmail.com (All client responses will land here)</p>
          </div>
          <p style="color: #888; font-size: 0.85rem;">
            Ab se har subah 8:30 AM par Bangalore, Saudi Arabia, Dubai aur UK ke clients ko high-ticket pitches dispatch honge.
          </p>
          <hr style="border: 0; border-top: 1px solid #222; margin: 20px 0;">
          <p style="color: #666; font-size: 0.8rem; margin: 0;">GELICON GLOBAL • Bangalore & Saudi Arabia</p>
        </div>
      `
    }, {
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json'
      }
    });

    console.log(`✅ SUCCESS! Test Email Dispatched via Brevo!`);
    console.log(`📨 Message ID:`, res.data.messageId);
    console.log(`👉 Please check your inbox: ${email}`);
  } catch (err) {
    if (err.response && err.response.data) {
      console.error(`❌ Brevo API Error:`, JSON.stringify(err.response.data, null, 2));
    } else {
      console.error(`❌ Error:`, err.message);
    }
  }
}

testBrevo();
