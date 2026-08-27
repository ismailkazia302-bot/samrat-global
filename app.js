/**
 * GELICON GLOBAL — CLIENT INTERACTIVE LOGIC
 * Founder: Ismail Kazia
 * Features: Currency Switching, Dynamic ROI/Price Estimator, WhatsApp Lead Formatting, Lead Form Handling
 */

// Global State
const state = {
  currency: 'INR', // 'INR' or 'USD'
  fxRate: 85, // 1 USD ~ 85 INR
  service: 'events', // 'events', 'marketing', 'business'
  tier: 'standard', // 'standard' or 'premium'
  scaleValue: 250,
  targetWhatsAppNumber: '916363962640' // Founder Ismail Kazia WhatsApp
};

// Estimator Configurations
const configs = {
  events: {
    label: '2. Expected Event Attendees (Bangalore & Pan-India)',
    unit: 'Attendees',
    min: 50,
    max: 2000,
    step: 50,
    defaultVal: 250,
    baseCostINR: { standard: 150000, premium: 350000 },
    costPerUnitINR: { standard: 350, premium: 700 },
    timeline: { standard: '⏱ Estimated Setup: 1-2 Weeks', premium: '⏱ Estimated Setup: 2-3 Weeks' },
    deliverables: {
      standard: [
        'Prime Bangalore & Pan-India Venue Sourcing & Coordination',
        'Professional Stage, LED Wall & Sound/Lighting Setup',
        'Event Registration & On-Ground Coordination Team',
        'HD Photography & Highlight Video Production'
      ],
      premium: [
        '5-Star Luxury Venue Management & Exclusive Sourcing',
        'Custom 3D Stage Design, Immersive Lighting & 4K Multi-cam',
        'VIP Hospitality, Celebrity/Speaker Management & Security Protocol',
        'Full End-to-End Event Production & Live Stream Broadcast'
      ]
    }
  },
  marketing: {
    label: '2. Monthly Target Growth / Ad Spend Budget',
    unit: 'Budget Unit',
    min: 100,
    max: 1000,
    step: 50,
    defaultVal: 200,
    baseCostINR: { standard: 40000, premium: 95000 },
    costPerUnitINR: { standard: 120, premium: 250 },
    timeline: { standard: '⏱ Campaign Launch: 3-5 Days', premium: '⏱ Campaign Launch: 5-7 Days' },
    deliverables: {
      standard: [
        'Targeted Meta (FB/Insta) & Google Ads Setup',
        'High-Converting Landing Page & Funnel Design',
        'Weekly A/B Creative Testing & Optimization',
        'Lead Tracking & Real-Time Performance Dashboard'
      ],
      premium: [
        'Omnichannel Performance Scaling (Meta, Google, YouTube, LinkedIn)',
        'Full Funnel Video Ads, Copywriting & Dynamic Creatives',
        'Automated WhatsApp & Email Lead Nurture Sequences',
        'Dedicated Growth Manager & 24/7 Priority Optimization'
      ]
    }
  },
  business: {
    label: '2. Business Scale & Scope of Advisory',
    unit: 'Scope Units',
    min: 10,
    max: 100,
    step: 10,
    defaultVal: 30,
    baseCostINR: { standard: 50000, premium: 120000 },
    costPerUnitINR: { standard: 1000, premium: 2200 },
    timeline: { standard: '⏱ Delivery Timeline: 1-2 Weeks', premium: '⏱ Delivery Timeline: 2-4 Weeks' },
    deliverables: {
      standard: [
        'Brand Identity, Logo & Professional Pitch Deck',
        'Automated CRM & Lead Pipeline Integration',
        'Standard Commercial SOPs & Operational Framework',
        'B2B Market Research & Positioning Report'
      ],
      premium: [
        'Complete Corporate Rebranding & Investor Pitch Suite',
        'End-to-End AI-Powered Sales Automation & Outreach System',
        'Full Operational & Legal Structure Advisory',
        'Dedicated Strategic Consulting & Monthly Growth Reviews'
      ]
    }
  }
};

// Initialize App on DOM Load
document.addEventListener('DOMContentLoaded', () => {
  calculateEstimate();
  lucide.createIcons();
});

// Set Currency (INR / USD)
function setCurrency(curr) {
  state.currency = curr;
  document.getElementById('curr-inr').classList.toggle('active', curr === 'INR');
  document.getElementById('curr-usd').classList.toggle('active', curr === 'USD');
  calculateEstimate();
}

// Select Estimator Service Pill
function selectEstimatorService(service) {
  state.service = service;
  
  // Update Active Pill
  const pills = document.querySelectorAll('#service-pills .pill-btn');
  pills.forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-service') === service);
  });

  // Update Slider Parameters
  const conf = configs[service];
  const slider = document.getElementById('scale-slider');
  slider.min = conf.min;
  slider.max = conf.max;
  slider.step = conf.step;
  slider.value = conf.defaultVal;
  state.scaleValue = conf.defaultVal;

  document.getElementById('slider-label').innerText = conf.label;
  
  calculateEstimate();
}

// Select Package Tier
function selectTier(tier) {
  state.tier = tier;
  const cards = document.querySelectorAll('.tier-card');
  cards.forEach(card => {
    card.classList.toggle('active', card.getAttribute('data-tier') === tier);
  });
  calculateEstimate();
}

// Format Currency
function formatMoney(amountINR) {
  if (state.currency === 'INR') {
    return '₹' + amountINR.toLocaleString('en-IN');
  } else {
    const usd = Math.round(amountINR / state.fxRate);
    return '$' + usd.toLocaleString('en-US');
  }
}

// Main Calculate Estimate Logic
function calculateEstimate() {
  const conf = configs[state.service];
  const slider = document.getElementById('scale-slider');
  state.scaleValue = parseInt(slider.value, 10);

  // Update Slider Label Display
  let displayUnit = conf.unit;
  if (state.service === 'events') {
    displayUnit = `${state.scaleValue} Attendees`;
  } else if (state.service === 'marketing') {
    displayUnit = `Scale Factor: ${state.scaleValue}`;
  } else {
    displayUnit = `Scope Level: ${state.scaleValue}`;
  }
  document.getElementById('slider-val-display').innerText = displayUnit;

  // Calculate Base + Variable Cost in INR
  const base = conf.baseCostINR[state.tier];
  const variable = (state.scaleValue - conf.min) * conf.costPerUnitINR[state.tier];
  const totalINR = base + Math.max(0, variable);

  // Render Price & Timeline
  document.getElementById('result-price-display').innerText = formatMoney(totalINR);
  document.getElementById('result-timeline-display').innerText = conf.timeline[state.tier];

  // Render Deliverables
  const deliverables = conf.deliverables[state.tier];
  const deliverablesContainer = document.getElementById('result-deliverables-list');
  deliverablesContainer.innerHTML = deliverables.map(item => `
    <div class="del-item">
      <i data-lucide="check-circle-2"></i>
      <span>${item}</span>
    </div>
  `).join('');

  lucide.createIcons();
}

// Open Service Inquiry in Form
function openServiceInquiry(serviceName) {
  const serviceSelect = document.getElementById('lead-service');
  if (serviceSelect) {
    serviceSelect.value = serviceName;
  }
  const contactSection = document.getElementById('contact');
  contactSection.scrollIntoView({ behavior: 'smooth' });
}

// Send Calculated Estimate via WhatsApp to Ismail Kazia
function sendEstimateViaWhatsApp() {
  const conf = configs[state.service];
  const currentPrice = document.getElementById('result-price-display').innerText;
  const serviceTitle = state.service === 'events' ? 'GELICON Event Production (Bangalore & India)' : (state.service === 'marketing' ? 'GELICON Digital Growth' : 'GELICON Corporate Advisory');
  const tierTitle = state.tier === 'standard' ? 'Growth / Imperial' : 'VIP Sovereign';

  const message = `Hello Ismail Kazia | GELICON Team! 👑%0A%0AI customized an instant quote on your portal and would like to lock this custom package:%0A%0A📌 *Division:* ${encodeURIComponent(serviceTitle)}%0A🎯 *Tier:* ${encodeURIComponent(tierTitle)}%0A📊 *Scale/Scope:* ${encodeURIComponent(state.scaleValue)} ${encodeURIComponent(conf.unit)}%0A💰 *Estimated Quote:* ${encodeURIComponent(currentPrice)}%0A%0APlease share the next steps and consultation schedule!`;

  window.open(`https://wa.me/916363962640?text=${message}`, '_blank');
}

// Handle Form Submission
function handleLeadSubmit(event) {
  event.preventDefault();
  
  const name = document.getElementById('lead-name').value.trim();
  const email = document.getElementById('lead-email').value.trim();
  const phone = document.getElementById('lead-phone').value.trim();
  const service = document.getElementById('lead-service').value;
  const location = document.getElementById('lead-location').value.trim();
  const details = document.getElementById('lead-details').value.trim();
  const feedback = document.getElementById('form-feedback');

  if (!name || !email || !phone || !location) {
    alert('Please fill out all required fields.');
    return;
  }

  // Optional: Connect your free Google Apps Script Webhook URL here
  const GOOGLE_SHEET_WEBHOOK_URL = '';

  // Create lead payload for local/CRM storage
  const lead = {
    name,
    email,
    phone,
    service,
    location,
    details,
    timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
  };

  // 1. Save to browser localStorage (CRM backup)
  try {
    const existingLeads = JSON.parse(localStorage.getItem('samrat_leads') || '[]');
    existingLeads.push(lead);
    localStorage.setItem('samrat_leads', JSON.stringify(existingLeads));
  } catch (e) {
    console.warn('Storage warning', e);
  }

  // 2. Send to Google Sheets Webhook asynchronously if configured
  if (GOOGLE_SHEET_WEBHOOK_URL) {
    fetch(GOOGLE_SHEET_WEBHOOK_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lead)
    }).catch(err => console.error('Sheet Sync Error:', err));
  }

  // Show Success Message
  feedback.className = 'form-feedback success';
  feedback.innerText = '✓ Inquiry received! Redirecting to WhatsApp to connect directly with Founder Ismail Kazia...';
  feedback.style.display = 'block';

  // Format WhatsApp Message for immediate direct connection to Ismail Kazia
  const waMsg = `Hello Ismail Kazia | GELICON! 👑%0A%0A*New Royal Consultation Request:*%0A👤 *Client Name:* ${encodeURIComponent(name)}%0A📧 *Email:* ${encodeURIComponent(email)}%0A📱 *Phone:* ${encodeURIComponent(phone)}%0A📍 *Location:* ${encodeURIComponent(location)}%0A💼 *Division:* ${encodeURIComponent(service)}%0A📝 *Project Brief:* ${encodeURIComponent(details || 'N/A')}`;

  setTimeout(() => {
    window.open(`https://wa.me/916363962640?text=${waMsg}`, '_blank');
    document.getElementById('lead-form').reset();
  }, 1200);
}
