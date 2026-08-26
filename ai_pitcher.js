/**
 * APEX DYNAMICS — AI SMART PITCH & OUTREACH GENERATOR
 * 
 * Features:
 * 1. Reads leads from `leads_database.json`
 * 2. Generates tailored High-Converting AI WhatsApp Pitches & Cold Emails for:
 *    - Bangalore Events (Corporate Summits, Tech Hackathons, Venue AV)
 *    - Dubai Real Estate (Investor Acquisition Funnels)
 *    - London Clinics (Cosmetic Patient Lead Generation)
 *    - Global Agencies & E-commerce Brands
 * 3. Generates 1-Click WhatsApp Direct Links (`wa.me/<clean_phone>?text=<encoded_msg>`)
 * 4. Exports to `outreach_ready.csv` and `leads_with_pitches.json`
 */

const fs = require('fs');
const path = require('path');

// Clean Phone Number for wa.me link
function cleanPhoneForWhatsApp(phone, country) {
  let cleaned = phone.replace(/[^0-9]/g, '');
  if (!cleaned) return '';
  
  // Auto-add country prefix if missing
  if (country === 'India' && cleaned.length === 10) {
    cleaned = '91' + cleaned;
  }
  return cleaned;
}

/**
 * Generate Tailored AI Pitches based on Category and City
 */
function generatePitchesForLead(lead) {
  const isBangaloreEvent = lead.city === 'Bangalore';
  let whatsappPitch = '';
  let emailSubject = '';
  let emailBody = '';

  if (isBangaloreEvent) {
    if (lead.category.includes('Tech') || lead.category.includes('Startup')) {
      whatsappPitch = `Hi ${lead.businessName} Team! 👋 I am Ismail Kazia from SAMRAT. We specialize in end-to-end event production for Tech Summits, Hackathons & Product Launches across Bangalore & Pan-India (LED stage, sound, 4K multi-cam & VIP coordination). Are you planning any corporate gatherings or team summits this quarter? Would love to share our lookbook.`;
      emailSubject = `Exclusive Corporate Event & Tech Summit Production for ${lead.businessName} (Bangalore & Pan-India)`;
      emailBody = `Hi ${lead.businessName} Leadership Team,\n\nI am Ismail Kazia, Founder of SAMRAT. We produce high-impact tech summits, hackathons, and corporate launch events across Bangalore and Pan-India.\n\nFrom prime venue sourcing to custom 3D stage design, immersive LED walls, sound engineering, and VIP hospitality, we take complete end-to-end ownership.\n\nWould you be open for a quick 5-minute portfolio preview this week?\n\nWarm regards,\nIsmail Kazia\nFounder, SAMRAT Global Enterprises\nWhatsApp: +91 63639 62640 | Web: samratglobal.com`;
    } else if (lead.category.includes('Hotel') || lead.category.includes('Venue')) {
      whatsappPitch = `Hello ${lead.businessName} Banquets & Events Team! 👋 We are an elite corporate event management agency in Bangalore. We frequently produce corporate conferences and luxury galas and would love to explore venue partnership and banquet collaboration with your prime property. Who is the best person to connect with regarding MICE partnerships?`;
      emailSubject = `MICE & Corporate Event Partnership with ${lead.businessName} Bangalore`;
      emailBody = `Dear Banquets & Events Team at ${lead.businessName},\n\nWe manage high-ticket corporate conferences, tech launches, and luxury galas across Bangalore.\n\nWe are looking to expand our preferred luxury venue roster for upcoming corporate summits and private executive dinners in 2026.\n\nCould we connect with your banquet sales head to discuss corporate client routing?\n\nBest regards,\nApex Dynamics Event Production\nBangalore, India`;
    } else {
      whatsappPitch = `Hi ${lead.businessName} Community Team! 👋 We produce high-energy tech meetups, hackathons & founder summits across Bangalore coworking hubs. We'd love to collaborate on organizing or sponsoring upcoming events at your space. Let's connect!`;
      emailSubject = `Community & Tech Summit Event Collaboration with ${lead.businessName}`;
      emailBody = `Hi ${lead.businessName} Team,\n\nWe love what you have built for founders in Bangalore. We are scheduling several startup summits and tech networking mixers and would love to explore hosting partnerships.\n\nLet us know a good time to connect this week.\n\nCheers,\nApex Dynamics`;
    }
  } else {
    // Global Marketing & Business Clients
    if (lead.category.includes('Real Estate')) {
      whatsappPitch = `Hi ${lead.businessName} Sales Team! 👋 We help luxury real estate developers in ${lead.city} generate high-net-worth investor leads via hyper-targeted Meta & Google performance ad funnels. We recently scaled client ROAS to 4.8x. Are you looking to acquire qualified buyers for your current property inventory?`;
      emailSubject = `High-Net-Worth Buyer Lead Funnel for ${lead.businessName} (${lead.city})`;
      emailBody = `Hi ${lead.businessName} Growth Team,\n\nI am Ismail Kazia, Founder of SAMRAT Global. We specialize in high-converting buyer acquisition for luxury real estate developers in ${lead.city}.\n\nOur performance funnels deliver pre-qualified investor leads with verified budgets directly into your WhatsApp & CRM.\n\nAre you looking to accelerate property bookings for your flagship developments this month?\n\nBest regards,\nIsmail Kazia\nFounder, SAMRAT Global Enterprises\nWhatsApp: +91 63639 62640 / +966 54 890 5688`;
    } else if (lead.category.includes('Clinic') || lead.category.includes('Dental')) {
      whatsappPitch = `Hello ${lead.businessName} Team! 👋 We help private aesthetic & cosmetic clinics in ${lead.city} add 20-30 high-ticket patient consultations every month through automated Google search & social appointment booking funnels. Would you be open to seeing a 2-minute breakdown of how we do this?`;
      emailSubject = `Predictable Cosmetic Patient Booking Funnel for ${lead.businessName}`;
      emailBody = `Dear Practice Manager at ${lead.businessName},\n\nWe build automated patient acquisition systems for premier cosmetic and dental clinics across the UK and worldwide.\n\nOur system attracts high-ticket treatment seekers and automatically books them into your consultation calendar with zero manual follow-up required.\n\nCould we share a 2-minute case study with your marketing team?\n\nWarm regards,\nApex Dynamics Health & Growth`;
    } else {
      whatsappPitch = `Hi ${lead.businessName} Marketing Team! 👋 We noticed your strong brand presence in ${lead.city}. We help ambitious brands scale customer acquisition with high-converting landing pages, paid ads & retention automation. Are you planning any major marketing pushes this quarter?`;
      emailSubject = `Customer Acquisition Scaling & Performance Funnel for ${lead.businessName}`;
      emailBody = `Hi ${lead.businessName} Leadership,\n\nWe build high-converting growth funnels and performance marketing campaigns that predictably drive revenue for top brands in ${lead.city}.\n\nWould you be open to a complimentary 10-minute growth audit of your current acquisition channels?\n\nBest,\nApex Dynamics`;
    }
  }

  // Create Direct 1-Click WhatsApp Link
  const cleanPhone = cleanPhoneForWhatsApp(lead.phone, lead.country);
  const waLink = cleanPhone ? `https://wa.me/${cleanPhone}?text=${encodeURIComponent(whatsappPitch)}` : `https://wa.me/?text=${encodeURIComponent(whatsappPitch)}`;

  return {
    whatsappPitch,
    whatsappLink: waLink,
    emailSubject,
    emailBody
  };
}

/**
 * Main Pitch Generator Runner
 */
function runPitchGenerator() {
  console.log('\n=============================================================');
  console.log('🤖 APEX DYNAMICS — AI SMART PITCH & OUTREACH GENERATOR');
  console.log('=============================================================\n');

  const jsonPath = path.join(__dirname, 'leads_database.json');
  if (!fs.existsSync(jsonPath)) {
    console.error('❌ Error: leads_database.json not found. Run scraper.js first.');
    return;
  }

  const leads = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
  console.log(`⏳ Processing ${leads.length} leads with tailored AI conversion hooks...`);

  const enrichedLeads = leads.map(lead => {
    const pitches = generatePitchesForLead(lead);
    return {
      ...lead,
      ...pitches
    };
  });

  // 1. Export to leads_with_pitches.json
  const enrichedJsonPath = path.join(__dirname, 'leads_with_pitches.json');
  fs.writeFileSync(enrichedJsonPath, JSON.stringify(enrichedLeads, null, 2), 'utf-8');

  // 2. Export to outreach_ready.csv
  const csvPath = path.join(__dirname, 'outreach_ready.csv');
  const headers = [
    'ID',
    'Target Service',
    'Category',
    'Business Name',
    'City',
    'Country',
    'Phone',
    'Email',
    '1-Click WhatsApp Link',
    'AI WhatsApp Pitch',
    'Email Subject Line'
  ];

  const rows = [headers.join(',')];
  enrichedLeads.forEach(l => {
    rows.push([
      `"${l.id}"`,
      `"${l.targetService}"`,
      `"${l.category}"`,
      `"${l.businessName.replace(/"/g, '""')}"`,
      `"${l.city}"`,
      `"${l.country}"`,
      `"${l.phone}"`,
      `"${l.email}"`,
      `"${l.whatsappLink}"`,
      `"${l.whatsappPitch.replace(/"/g, '""')}"`,
      `"${l.emailSubject.replace(/"/g, '""')}"`
    ].join(','));
  });

  fs.writeFileSync(csvPath, rows.join('\n'), 'utf-8');

  console.log('\n=============================================================');
  console.log(`🎉 SUCCESS: Generated Personalized Pitches for ${enrichedLeads.length} Leads!`);
  console.log(`📁 JSON with Pitches: ${enrichedJsonPath}`);
  console.log(`📁 CSV Ready to Send: ${csvPath}`);
  console.log('=============================================================\n');

  return enrichedLeads;
}

if (require.main === module) {
  runPitchGenerator();
}

module.exports = { runPitchGenerator };
