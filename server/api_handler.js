const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
app.use(cors({ origin: [
  'https://galiconglobal.com',
  'https://ismailkazia302-bot.github.io',
  'http://localhost:3000',
  'http://localhost:8000',
  'http://localhost:8080',
  'http://127.0.0.1:5500'
] }));

// Environment Variables (Store in .env file)
const ADMIN_SECRET_KEY = process.env.JWT_SECRET || "galicon_secure_jwt_secret_2026";
const ADMIN_PASSWORD = process.env.ADMIN_PASS || "GaliconExecutive#2026";
const DB_PATH = path.join(__dirname, '..', 'private_data', 'leads_database.json');

// Helper to append leads securely
function saveLead(leadData) {
  let leads = [];
  if (fs.existsSync(DB_PATH)) {
    try {
      leads = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
    } catch (e) {
      leads = [];
    }
  }
  
  // Calculate automated lead score
  let score = 50;
  const budgetStr = String(leadData.budget || leadData.packageSelected || '').toLowerCase();
  if (budgetStr.includes('5,000+') || budgetStr.includes('2,50,000') || budgetStr.includes('enterprise') || budgetStr.includes('vip')) {
    score += 35;
  } else if (budgetStr.includes('1,500') || budgetStr.includes('1,00,000') || budgetStr.includes('scale')) {
    score += 20;
  }
  if (leadData.phone && String(leadData.phone).length >= 10) score += 15;

  const scoredLead = {
    ...leadData,
    leadScore: score,
    leadTier: score >= 80 ? 'HOT' : score >= 60 ? 'WARM' : 'COLD',
    status: 'NEW',
    timestamp: new Date().toISOString()
  };

  leads.push(scoredLead);
  
  // Ensure the private_data parent directory exists
  const dir = path.dirname(DB_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(DB_PATH, JSON.stringify(leads, null, 2));
}

// 0. HEALTH CHECK ENDPOINT
app.get('/api/health', (req, res) => {
  return res.status(200).json({
    status: 'ONLINE',
    service: 'GALICON Security & Lead Ingestion Server',
    port: process.env.PORT || 4000,
    timestamp: new Date().toISOString()
  });
});

// 1. PUBLIC ENDPOINT: Secure Lead Capture from Website
app.post('/api/leads/submit', (req, res) => {
  const { name, email, phone, division, packageSelected, budget, country, message, notes, meetingDate, meetingTime, attribution } = req.body;

  if (!name || !email) {
    return res.status(400).json({ success: false, message: "Name and Email are required." });
  }

  const newLead = { name, email, phone, division, packageSelected, budget, country, message, notes, meetingDate, meetingTime, attribution };
  saveLead(newLead);

  console.log(`[LEAD CAPTURED] ${name} | ${email} | ${division} | Score Tier: ${newLead.leadTier || 'HOT'}`);

  return res.status(200).json({ success: true, message: "Inquiry received securely." });
});

// 2. SECURE ADMIN LOGIN: Issue JWT Token
app.post('/api/admin/login', (req, res) => {
  const { password } = req.body;

  if (password === ADMIN_PASSWORD) {
    const token = jwt.sign({ role: 'executive_admin' }, ADMIN_SECRET_KEY, { expiresIn: '8h' });
    return res.status(200).json({ success: true, token });
  }

  return res.status(401).json({ success: false, message: "Invalid credentials." });
});

// 3. PROTECTED ENDPOINT: Fetch Leads for CRM Dashboard
app.get('/api/admin/leads', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: "Unauthorized access." });
  }

  const token = authHeader.split(' ')[1];
  try {
    jwt.verify(token, ADMIN_SECRET_KEY);
    
    if (fs.existsSync(DB_PATH)) {
      const leads = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
      return res.status(200).json({ success: true, leads });
    }
    return res.status(200).json({ success: true, leads: [] });
  } catch (err) {
    return res.status(403).json({ success: false, message: "Invalid or expired token." });
  }
});

let runStartupSeoCheck;
try {
  runStartupSeoCheck = require('../autonomous_seo_sentinel').runStartupSeoCheck;
} catch(e) {}

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`[GALICON SECURITY SERVER] Running securely on port ${PORT}`);
  if (typeof runStartupSeoCheck === 'function') {
    runStartupSeoCheck();
  }
});
