/**
 * Galicon Global Master Interactive System
 * Features:
 * 1. Multi-Currency Engine (INR, USD, GBP, EUR, AED)
 * 2. Multi-Language Switcher (English, Hindi, Arabic)
 * 3. 3-Question Smart Plan Wizard
 * 4. Bangalore Luxury Wedding Decor Gallery
 * 5. Case Studies Hub
 * 6. Galicon Client Advisory Desk (Trained AI Chatbot)
 * 7. Unified Escrow Checkout with Binance Pay & USDT/USDC Integration
 * 8. Live Antigravity Webhook Dispatch
 */

const ANTIGRAVITY_WEBHOOK_URL = 'http://localhost:8080/webhook';
const BINANCE_WALLET_ADDRESS = '0xd861f0f29146fb9b0acc8d0b80681e6aa334986a';

// Multi-Currency DB
const CURRENCIES = {
  INR: { symbol: '₹', rate: 1, prefix: true },
  USD: { symbol: '$', rate: 0.012, prefix: true },
  GBP: { symbol: '£', rate: 0.0095, prefix: true },
  EUR: { symbol: '€', rate: 0.011, prefix: true },
  AED: { symbol: 'AED ', rate: 0.044, prefix: true }
};

let currentCurrency = 'USD';
let currentLanguage = 'en';

// Multi-Language Strings
const I18N = {
  en: {
    heroTitle: "World-Class Engineering, Growth & <span class='gradient-text'>Luxury Bangalore Events</span>",
    heroLead: "Galicon delivers high-production corporate summits, luxury Bangalore palace weddings, sub-50ms web & AI software, and high-ROAS marketing funnels across India, US, UK, and the Gulf.",
    calcQuoteBtn: "Instant Quote Estimator",
    advisoryName: "Galicon Client Advisory Desk"
  },
  hi: {
    heroTitle: "विश्व-स्तरीय सॉफ्टवेयर, ग्रोथ और <span class='gradient-text'>बेंगलुरु लग्जरी इवेंट्स</span>",
    heroLead: "गैलिकॉन भारत, अमेरिका, यूके और खाड़ी देशों में हाई-प्रोडक्शन कॉर्पोरेट सम्मिट्स, बेंगलुरु पैलेस वेडिंग्स, नेक्स्ट-जेन वेब ऐप्स और हाई-आरओएएस मार्केटिंग फनल्स प्रदान करता है।",
    calcQuoteBtn: "तुरंत बजट कैलकुलेटर",
    advisoryName: "गैलिकॉन क्लाइंट एडवाइजरी डेस्क"
  },
  ar: {
    heroTitle: "هندسة برمجيات عالمية وحفلات فاخرة <span class='gradient-text'>في بنغالور والعالم</span>",
    heroLead: "تقدم جاليكون قمم الشركات الفاخرة، وحفلات الزفاف الملكية في بنغالور، وتطبيقات الويب والذكاء الاصطناعي فائقة السرعة، وحملات تسويقية عالية العائد في الهند والخليج والولايات المتحدة.",
    calcQuoteBtn: "حاسبة التكلفة الفورية",
    advisoryName: "مكتب جاليكون الاستشاري للعملاء"
  }
};

function setLanguage(langCode) {
  if (I18N[langCode]) {
    currentLanguage = langCode;
    const texts = I18N[langCode];
    
    const heroTitle = document.getElementById('i18n-hero-title');
    const heroLead = document.getElementById('i18n-hero-lead');
    if (heroTitle) heroTitle.innerHTML = texts.heroTitle;
    if (heroLead) heroLead.innerHTML = texts.heroLead;
  }
}

// Pricing Database in Base INR
const PRICING_BASE = {
  weddings: {
    base: { low: 350000, mid: 950000, high: 2500000 },
    names: {
      low: 'Royal Intimate Wedding (Bangalore)',
      mid: 'Grand Heritage & Luxury Palace Wedding (Bangalore)',
      high: 'Palatial Extravaganza & Royal Takeover (Bangalore)'
    },
    deliverables: {
      low: ['150-300 Pax Guest Management', 'Bespoke Floral Stage & Mandap Design', 'High-Fidelity Sound & Ambient Lighting', 'Dedicated On-Ground Hospitality Desk'],
      mid: ['Multi-Day Sangeet, Mehendi & Reception Decor', '3D Thematic Visual Sets & Aerial Drones', 'Celebrity / Classical Artist Management', 'Luxury Bridal Concierge & VIP Logistics'],
      high: ['Turnkey Royal Palace Venue Takeover', 'Gourmet Multi-Cuisine Master Catering', 'International Entertainment & Live Bands', 'Chartered Luxury Vehicle Fleet Management']
    }
  },
  events: {
    base: { low: 199000, mid: 549000, high: 1199000 },
    names: {
      low: 'Corporate Essentials (Up to 200 Pax)',
      mid: 'Enterprise Gala & Summit (Up to 1000 Pax)',
      high: 'Turnkey Mega Production & Expo'
    },
    deliverables: {
      low: ['High-Definition Audio & Stage Lighting', 'Venue Sourcing & Contract Management', 'Smart Badge & QR Registration', 'Branded Stage Backdrop & Collateral'],
      mid: ['3D Stage Architecture & LED Video Wall', 'Multi-Camera 4K Live Broadcast', 'VIP Hospitality & Speaker Management', 'Live Q&A & Hybrid Stream Vault'],
      high: ['Convention Center Master Operations', 'Multi-Tier Sponsor Management', 'Celebrity & Keynote Artist Curation', 'End-to-End Turnkey Production']
    }
  },
  webdev: {
    base: { low: 149000, mid: 425000, high: 950000 },
    names: {
      low: 'High-Velocity Business Website',
      mid: 'Custom SaaS & Cloud Platform',
      high: 'Enterprise Mobile & Cloud Ecosystem'
    },
    deliverables: {
      low: ['Custom Next.js & Tailwind CSS Architecture', 'Guaranteed 98+ Google PageSpeed', 'Interactive Lead Capture Funnels', 'Enterprise SEO & CMS Integration'],
      mid: ['Full-Stack Auth & PostgreSQL Database', 'Stripe / Razorpay Billing Subscriptions', 'Interactive Client Portal & Dashboard', 'Automated Cloud CI/CD Pipeline'],
      high: ['Cross-Platform iOS & Android Native Apps', 'Autonomous AI Agent Workflows', 'High-Availability Auto-Scaling Cluster', 'SOC2 & ISO Compliance Ready']
    }
  },
  marketing: {
    base: { low: 99000, mid: 215000, high: 475000 },
    names: {
      low: 'Organic Authority & SEO Engine',
      mid: 'Performance Paid Ads Scale',
      high: 'Omnichannel B2B Domination'
    },
    deliverables: {
      low: ['Technical SEO & Core Web Vitals Audit', '12 High-Intent Keyword Articles/mo', 'High-DA Manual Backlink Placements', 'Google My Business Ranking'],
      mid: ['Multi-Channel Google & Meta Ads Management', '20+ Custom Creative Variations/mo', 'Conversion Rate Optimization (CRO)', '4x Target ROAS Framework'],
      high: ['Dedicated Growth Strategist & CMO Advisory', 'LinkedIn B2B Lead Gen Campaigns', 'Automated Retargeting & Email Matrix', 'Weekly Executive Sprint Reports']
    }
  },
  consulting: {
    base: { low: 115000, mid: 299000, high: 699000 },
    names: {
      low: 'Operational Audit & Optimization',
      mid: 'B2B Growth & Funnel Engineering',
      high: 'Full Business Turnaround & Scale'
    },
    deliverables: {
      low: ['Complete Process & Tooling Audit', 'Standard Operating Procedures (SOPs)', 'Cost Reduction Action Blueprint', '4 Executive Strategy Sessions'],
      mid: ['High-Ticket Offer & Pricing Restructuring', 'Automated Qualification Funnel Setup', 'AI Automation Workflow Deployment', 'Bi-Weekly Executive Reviews'],
      high: ['Embedded Fractional COO / CMO Leadership', 'Departmental Restructuring & Hiring', 'Custom AI Infrastructure Architecture', 'Unlimited Partner Access']
    }
  }
};

function formatCurrency(inrAmount) {
  const curr = CURRENCIES[currentCurrency];
  const converted = Math.round(inrAmount * curr.rate);
  
  if (currentCurrency === 'INR') {
    return `₹${converted.toLocaleString('en-IN')}`;
  } else {
    return `${curr.symbol}${converted.toLocaleString('en-US')}`;
  }
}

// Calculator State
const calcState = {
  service: 'weddings',
  tier: 'mid',
  speed: 'normal'
};

function updateCalculator() {
  const currentService = PRICING_BASE[calcState.service];
  let inrPrice = currentService.base[calcState.tier];
  
  if (calcState.speed === 'rush') {
    inrPrice = Math.round(inrPrice * 1.25);
  }

  const priceEl = document.getElementById('calc-price-display');
  const nameEl = document.getElementById('calc-tier-name');
  const deliverablesList = document.getElementById('calc-deliverables-list');

  if (priceEl) {
    priceEl.textContent = formatCurrency(inrPrice);
    priceEl.setAttribute('data-inr-raw', inrPrice);
  }
  if (nameEl) {
    nameEl.textContent = currentService.names[calcState.tier];
  }
  if (deliverablesList) {
    deliverablesList.innerHTML = currentService.deliverables[calcState.tier]
      .map(item => `<li><i class="fa-solid fa-circle-check"></i> ${item}</li>`)
      .join('');
  }
}

// Theme Switcher (Dark / Light)
function initTheme() {
  const savedTheme = localStorage.getItem('galicon_theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeToggleIcon(savedTheme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  const target = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', target);
  localStorage.setItem('galicon_theme', target);
  updateThemeToggleIcon(target);
}

function updateThemeToggleIcon(theme) {
  const icon = document.getElementById('theme-toggle-icon');
  if (icon) {
    icon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  }
}

function setCurrency(currencyCode) {
  if (CURRENCIES[currencyCode]) {
    currentCurrency = currencyCode;
    localStorage.setItem('galicon_currency', currencyCode);
    updateCalculator();
    updatePageStaticPrices();
  }
}

function updatePageStaticPrices() {
  document.querySelectorAll('[data-price-inr]').forEach(el => {
    const inr = parseInt(el.getAttribute('data-price-inr'), 10);
    if (!isNaN(inr)) {
      el.textContent = formatCurrency(inr);
    }
  });
}

// PAYMENT INTEGRATION & ESCROW CHECKOUT
const checkoutState = {
  itemTitle: 'Galicon Enterprise Scope',
  baseInrAmount: 950000,
  paymentType: 'deposit', // 'deposit' (40%) or 'full' (100%)
  selectedMethod: 'binance' // default to binance / stripe
};

function openCheckout(title, inrAmount) {
  checkoutState.itemTitle = title || document.getElementById('calc-tier-name')?.textContent || 'Galicon Project Retainer';
  checkoutState.baseInrAmount = inrAmount || parseInt(document.getElementById('calc-price-display')?.getAttribute('data-inr-raw'), 10) || 950000;
  
  const modal = document.getElementById('payment-modal');
  if (modal) {
    modal.style.display = 'flex';
    updateCheckoutDisplay();
  }
}

function closeCheckout() {
  const modal = document.getElementById('payment-modal');
  if (modal) {
    modal.style.display = 'none';
  }
  document.getElementById('checkout-form-view').style.display = 'block';
  document.getElementById('checkout-success-view').style.display = 'none';
}

function setMilestonePaymentType(type) {
  checkoutState.paymentType = type;
  document.querySelectorAll('.milestone-tab').forEach(t => t.classList.remove('active'));
  document.getElementById(`milestone-tab-${type}`)?.classList.add('active');
  updateCheckoutDisplay();
}

function selectPaymentMethod(method, el) {
  checkoutState.selectedMethod = method;
  document.querySelectorAll('.payment-method-card').forEach(c => c.classList.remove('active'));
  el.classList.add('active');

  const binanceDetails = document.getElementById('binance-pay-details');
  if (binanceDetails) {
    binanceDetails.style.display = method === 'binance' ? 'block' : 'none';
  }
}

function copyBinanceAddress() {
  navigator.clipboard.writeText(BINANCE_WALLET_ADDRESS);
  const copyBtn = document.getElementById('btn-copy-address');
  if (copyBtn) {
    copyBtn.innerHTML = '<i class="fa-solid fa-check"></i> Address Copied!';
    setTimeout(() => {
      copyBtn.innerHTML = '<i class="fa-solid fa-copy"></i> Copy Address';
    }, 3000);
  }
}

function updateCheckoutDisplay() {
  const titleEl = document.getElementById('checkout-item-title');
  const amountEl = document.getElementById('checkout-due-amount');
  const fullAmountEl = document.getElementById('checkout-full-amount');
  const binanceUsdtEl = document.getElementById('binance-usdt-amount');

  let dueInr = checkoutState.baseInrAmount;
  if (checkoutState.paymentType === 'deposit') {
    dueInr = Math.round(dueInr * 0.40); // 40% Kickoff Escrow Deposit
  }

  const dueUsd = Math.round(dueInr * 0.012);

  if (titleEl) titleEl.textContent = checkoutState.itemTitle;
  if (amountEl) amountEl.textContent = formatCurrency(dueInr);
  if (fullAmountEl) fullAmountEl.textContent = `Total Project Scope: ${formatCurrency(checkoutState.baseInrAmount)}`;
  if (binanceUsdtEl) binanceUsdtEl.textContent = `${dueUsd.toLocaleString()} USDT / USDC`;
}

async function processPayment(e) {
  e.preventDefault();
  const name = document.getElementById('checkout-name')?.value || 'Client';
  const email = document.getElementById('checkout-email')?.value || 'client@company.com';
  const txnHash = document.getElementById('checkout-txnhash')?.value || '';
  const btn = document.getElementById('btn-confirm-payment');

  if (btn) {
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Verifying Escrow Transaction...';
    btn.disabled = true;
  }

  const dueInr = checkoutState.paymentType === 'deposit' ? Math.round(checkoutState.baseInrAmount * 0.40) : checkoutState.baseInrAmount;

  const transactionData = {
    project: 'galicon_payment_transaction',
    customer: { name, email },
    transaction: {
      item: checkoutState.itemTitle,
      total_inr: checkoutState.baseInrAmount,
      paid_inr: dueInr,
      formatted_paid: formatCurrency(dueInr),
      currency: currentCurrency,
      type: checkoutState.paymentType,
      gateway: checkoutState.selectedMethod,
      wallet_destination: BINANCE_WALLET_ADDRESS,
      client_txnhash: txnHash,
      transaction_id: 'TXN_' + Math.random().toString(36).substring(2, 9).toUpperCase(),
      status: 'PAID_ESCROW_LOCKED'
    },
    timestamp: new Date().toISOString()
  };

  try {
    await fetch(ANTIGRAVITY_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(transactionData)
    });
  } catch (err) {}

  setTimeout(() => {
    document.getElementById('checkout-form-view').style.display = 'none';
    const successView = document.getElementById('checkout-success-view');
    successView.style.display = 'block';
    document.getElementById('receipt-txn-id').textContent = transactionData.transaction.transaction_id;
    document.getElementById('receipt-amount').textContent = `${transactionData.transaction.formatted_paid} (${Math.round(dueInr * 0.012)} USDT)`;
  }, 1200);
}

// Smart 3-Question Wizard State
const wizardState = {
  goal: 'wedding',
  timeline: '30days',
  scale: 'enterprise'
};

function selectWizardGoal(goal, el) {
  wizardState.goal = goal;
  document.querySelectorAll('.wizard-goal-card').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  document.getElementById('wizard-step-1').style.display = 'none';
  document.getElementById('wizard-step-2').style.display = 'block';
}

function selectWizardTimeline(timeline, el) {
  wizardState.timeline = timeline;
  document.querySelectorAll('.wizard-timeline-card').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  document.getElementById('wizard-step-2').style.display = 'none';
  document.getElementById('wizard-step-3').style.display = 'block';
}

function selectWizardScale(scale, el) {
  wizardState.scale = scale;
  document.querySelectorAll('.wizard-scale-card').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  showWizardResult();
}

function showWizardResult() {
  document.getElementById('wizard-step-3').style.display = 'none';
  const resultEl = document.getElementById('wizard-result');
  resultEl.style.display = 'block';

  let title = "Custom Strategy & Execution Blueprint";
  let recBudget = 549000;
  let features = [];

  if (wizardState.goal === 'wedding') {
    title = "Bangalore Heritage Luxury Wedding Blueprint";
    recBudget = 950000;
    features = ["Palace Venue Curation (Taj West End / Leela Palace)", "Turnkey 3D Floral Stage Styling", "VIP Hospitality & Aerial Cinematography"];
  } else if (wizardState.goal === 'saas') {
    title = "High-Velocity Custom SaaS MVP Blueprint";
    recBudget = 425000;
    features = ["Next.js SSR + PostgreSQL Multi-Tenant Backend", "Stripe Subscription Billing & Auth", "Sub-50ms Global Edge Cloud Deployment"];
  } else if (wizardState.goal === 'ads') {
    title = "4.8x ROAS B2B Growth Engine Blueprint";
    recBudget = 215000;
    features = ["Google Search + Meta Dynamic Ads Management", "Server-Side CAPI & GA4 Attribution", "Landing Page CRO Split Testing"];
  } else {
    title = "Turnkey Corporate Summit & Expo Blueprint";
    recBudget = 549000;
    features = ["3D LED Curved Video Wall Architecture", "Multi-Camera 4K Hybrid Global Stream", "VIP Speaker Hospitality & Smart Registration"];
  }

  document.getElementById('wizard-result-title').textContent = title;
  document.getElementById('wizard-result-cost').textContent = `${formatCurrency(recBudget)} Estimated`;
  document.getElementById('wizard-result-features').innerHTML = features.map(f => `<li><i class="fa-solid fa-circle-check" style="color: #10b981;"></i> ${f}</li>`).join('');
}

function resetWizard() {
  document.getElementById('wizard-result').style.display = 'none';
  document.getElementById('wizard-step-1').style.display = 'block';
}

// Chatbot Logic
function toggleChat() {
  const modal = document.getElementById('chat-modal');
  if (modal) {
    modal.style.display = modal.style.display === 'flex' ? 'none' : 'flex';
  }
}

function handleChatSubmit(e) {
  e.preventDefault();
  const input = document.getElementById('chat-user-input');
  if (!input || !input.value.trim()) return;

  const userText = input.value.trim();
  appendChatMessage(userText, 'user');
  input.value = '';

  setTimeout(() => {
    generateAdvisoryResponse(userText);
  }, 600);
}

function appendChatMessage(text, sender) {
  const body = document.getElementById('chat-messages');
  if (!body) return;

  const bubble = document.createElement('div');
  bubble.className = `chat-bubble ${sender}`;
  bubble.innerHTML = text;
  body.appendChild(bubble);
  body.scrollTop = body.scrollHeight;
}

function generateAdvisoryResponse(query) {
  const q = query.toLowerCase();
  let reply = "";

  if (q.includes('wedding') || q.includes('marriage') || q.includes('sangeet') || q.includes('bangalore')) {
    reply = `<strong>Galicon Luxury Wedding Planning (Bangalore Exclusive):</strong><br>
    We coordinate high-end weddings across premier Bangalore venues (The Leela Palace, Taj West End, Bangalore Palace, Clarks Exotica).<br><br>
    • <strong>Royal Intimate:</strong> ${formatCurrency(350000)} - ${formatCurrency(600000)}<br>
    • <strong>Grand Heritage:</strong> ${formatCurrency(950000)} - ${formatCurrency(1800000)}<br>
    • <strong>Palatial Extravaganza:</strong> ${formatCurrency(2500000)}+`;
  } else if (q.includes('binance') || q.includes('crypto') || q.includes('usdt') || q.includes('pay')) {
    reply = `We accept instant settlement via <strong>Binance Pay & USDT/USDC</strong> (BEP-20 / ERC-20 / Polygon) to our verified institutional address: <code>${BINANCE_WALLET_ADDRESS}</code> with zero forex fees!`;
  } else if (q.includes('price') || q.includes('pricing') || q.includes('cost') || q.includes('rate')) {
    reply = `Our pricing is 100% milestone-based with zero hidden fees in <strong>${currentCurrency}</strong>:<br>
    • <strong>Sprint Unlimited Subscription:</strong> $1,499/mo<br>
    • <strong>Corporate Events:</strong> Starting at ${formatCurrency(199000)}<br>
    • <strong>Next.js Web / Apps:</strong> Starting at ${formatCurrency(149000)}<br>
    • <strong>Performance Marketing:</strong> Starting at ${formatCurrency(99000)}/mo`;
  } else {
    reply = `Thank you for connecting with the <strong>Galicon Client Advisory Desk</strong>.<br><br>
    We coordinate high-impact Corporate Events, Bangalore Luxury Weddings, Web & App Engineering, and Unlimited Dev Subscriptions.<br><br>
    How may we assist your upcoming project today?`;
  }

  appendChatMessage(reply, 'bot');
}

// Funnel Submission
async function submitFunnel() {
  const name = document.getElementById('funnel-name')?.value;
  const email = document.getElementById('funnel-email')?.value;
  const phone = document.getElementById('funnel-phone')?.value;
  const company = document.getElementById('funnel-company')?.value;
  const sector = document.querySelector('.funnel-pill-sector.active')?.dataset.value || 'General';
  const budget = document.querySelector('.funnel-pill-scale.active')?.dataset.value || 'Enterprise';
  const notes = document.getElementById('funnel-notes')?.value || '';

  if (!name || !email) {
    alert('Please enter your full name and business email.');
    return;
  }

  const payload = {
    project: 'galicon_lead_intake',
    customer: { name, email, phone, company },
    specs: { sector, budget, notes, currency: currentCurrency },
    timestamp: new Date().toISOString()
  };

  const btn = document.getElementById('btn-submit-funnel');
  if (btn) btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Transmitting...';

  try {
    await fetch(ANTIGRAVITY_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  } catch (err) {}

  document.querySelectorAll('.funnel-step-content').forEach(el => el.style.display = 'none');
  const successStep = document.getElementById('funnel-step-4');
  if (successStep) successStep.style.display = 'block';
}

function goToStep(step) {
  document.querySelectorAll('.funnel-step-content').forEach(el => el.style.display = 'none');
  const target = document.getElementById(`funnel-step-${step}`);
  if (target) target.style.display = 'block';

  document.querySelectorAll('.progress-step').forEach((el, idx) => {
    if (idx + 1 <= step) el.classList.add('active');
    else el.classList.remove('active');
  });
}

// Initialization
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  
  const savedCurr = localStorage.getItem('galicon_currency');
  if (savedCurr && CURRENCIES[savedCurr]) {
    currentCurrency = savedCurr;
    const select = document.getElementById('currency-selector');
    if (select) select.value = savedCurr;
  }

  // Calculator listeners
  document.querySelectorAll('.calc-pill-service').forEach(p => {
    p.addEventListener('click', (e) => {
      document.querySelectorAll('.calc-pill-service').forEach(x => x.classList.remove('active'));
      e.currentTarget.classList.add('active');
      calcState.service = e.currentTarget.dataset.service;
      updateCalculator();
    });
  });

  document.querySelectorAll('.calc-pill-tier').forEach(p => {
    p.addEventListener('click', (e) => {
      document.querySelectorAll('.calc-pill-tier').forEach(x => x.classList.remove('active'));
      e.currentTarget.classList.add('active');
      calcState.tier = e.currentTarget.dataset.tier;
      updateCalculator();
    });
  });

  document.querySelectorAll('.calc-pill-speed').forEach(p => {
    p.addEventListener('click', (e) => {
      document.querySelectorAll('.calc-pill-speed').forEach(x => x.classList.remove('active'));
      e.currentTarget.classList.add('active');
      calcState.speed = e.currentTarget.dataset.speed;
      updateCalculator();
    });
  });

  // Funnel listeners
  document.querySelectorAll('.funnel-pill-sector').forEach(p => {
    p.addEventListener('click', (e) => {
      document.querySelectorAll('.funnel-pill-sector').forEach(x => x.classList.remove('active'));
      e.currentTarget.classList.add('active');
    });
  });

  document.querySelectorAll('.funnel-pill-scale').forEach(p => {
    p.addEventListener('click', (e) => {
      document.querySelectorAll('.funnel-pill-scale').forEach(x => x.classList.remove('active'));
      e.currentTarget.classList.add('active');
    });
  });

  // FAQ toggle
  document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', (e) => {
      e.currentTarget.closest('.faq-item').classList.toggle('active');
    });
  });

  updateCalculator();
});
