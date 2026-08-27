const fs = require('fs');
const path = require('path');

const leads = JSON.parse(fs.readFileSync(path.join(__dirname, 'leads_database.json'), 'utf8'));

// Regional Breakdown
const countryCounts = {};
leads.forEach(l => {
  countryCounts[l.country] = (countryCounts[l.country] || 0) + 1;
});

// Calculate Estimated Deal Values
let totalPipelineINR = 0;
let totalPipelineUSD = 0;
let totalPipelineSAR = 0;

const enrichedLeads = leads.map(l => {
  let estDealINR = 0;
  let estDealUSD = 0;
  let estDealSAR = 0;

  if (l.targetService.includes('Event Management') || l.city === 'Bangalore') {
    // Average Event Deal: ₹15,00,000 (~$18,000 / 67,500 SAR)
    estDealINR = 1500000;
    estDealUSD = 18000;
    estDealSAR = 67500;
  } else if (l.country === 'Saudi Arabia') {
    // Saudi Conclave / Retainer: SAR 55,000 (~₹12,20,000 / $14,600)
    estDealSAR = 55000;
    estDealINR = 1220000;
    estDealUSD = 14600;
  } else if (l.country === 'UAE' || l.city === 'Dubai') {
    // Dubai Performance Retainer / Gala: AED 45,000 (~₹10,20,000 / $12,250)
    estDealUSD = 12250;
    estDealINR = 1020000;
    estDealSAR = 46000;
  } else {
    // Global / UK / USA Retainers: $3,500/mo (~₹2,90,000 / 13,100 SAR)
    estDealUSD = 3500;
    estDealINR = 290000;
    estDealSAR = 13100;
  }

  totalPipelineINR += estDealINR;
  totalPipelineUSD += estDealUSD;
  totalPipelineSAR += estDealSAR;

  return {
    id: l.id,
    businessName: l.businessName,
    city: l.city,
    country: l.country,
    service: l.targetService,
    score: l.leadScore,
    estDealINR: estDealINR,
    estDealUSD: estDealUSD,
    estDealSAR: estDealSAR
  };
});

// Top 20 Leads
enrichedLeads.sort((a, b) => b.score - a.score);
const top20 = enrichedLeads.slice(0, 20);

const forecastData = {
  timestamp: new Date().toISOString(),
  totalLeads: leads.length,
  countryBreakdown: countryCounts,
  pipelineValuation: {
    totalINR: `₹${(totalPipelineINR / 10000000).toFixed(2)} Crore (₹${totalPipelineINR.toLocaleString('en-IN')})`,
    totalUSD: `$${(totalPipelineUSD / 1000000).toFixed(2)} Million ($${totalPipelineUSD.toLocaleString('en-US')})`,
    totalSAR: `${(totalPipelineSAR / 1000000).toFixed(2)} Million SAR (${totalPipelineSAR.toLocaleString('en-US')} SAR)`
  },
  top20VIPLeads: top20
};

fs.writeFileSync(path.join(__dirname, 'crm_revenue_forecast.json'), JSON.stringify(forecastData, null, 2), 'utf8');

const txtSummary = `=============================================================
👑 GELICON WORLDWIDE — STRATEGIC CRM REVENUE FORECAST
Founder & CEO: Ismail Kazia
Date: ${new Date().toLocaleDateString()}
=============================================================

📊 PIPELINE SCALE:
• Total Verified B2B Enterprise Leads: ${leads.length} Companies
• Geographic Footprint:
  🇮🇳 India (Bangalore / Mumbai): ${countryCounts['India'] || 0}
  🇦🇪 UAE (Dubai / Abu Dhabi): ${countryCounts['UAE'] || 0}
  🇸🇦 Saudi Arabia (Riyadh / Jeddah): ${countryCounts['Saudi Arabia'] || 0}
  🇬🇧 United Kingdom (London): ${countryCounts['UK'] || 0}
  🇺🇸 United States (New York / SF): ${countryCounts['USA'] || 0}
  🇸🇬 Singapore: ${countryCounts['Singapore'] || 0}

💰 TOTAL ESTIMATED PIPELINE VALUE:
• Indian Rupee: ₹${(totalPipelineINR / 10000000).toFixed(2)} Crore
• US Dollar: $${(totalPipelineUSD / 1000000).toFixed(2)} Million
• Saudi Riyal: ${(totalPipelineSAR / 1000000).toFixed(2)} Million SAR

🎯 TARGET REVENUE CLOSING CONVERSIONS:
• If 5% Close Rate: ₹${((totalPipelineINR * 0.05) / 100000).toFixed(1)} Lakhs ($${Math.round(totalPipelineUSD * 0.05).toLocaleString()})
• If 10% Close Rate: ₹${((totalPipelineINR * 0.10) / 100000).toFixed(1)} Lakhs ($${Math.round(totalPipelineUSD * 0.10).toLocaleString()})
=============================================================
`;

fs.writeFileSync(path.join(__dirname, 'crm_revenue_forecast.txt'), txtSummary, 'utf8');
console.log('✅ Generated crm_revenue_forecast.json and crm_revenue_forecast.txt!');
