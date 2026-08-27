const fs = require('fs');
const path = require('path');

const leads = JSON.parse(fs.readFileSync(path.join(__dirname, 'leads_database.json'), 'utf8'));

const headers = 'ID,Business Name,City,Country,Service,Phone,Email,Lead Score,Status,Contacted Date,Response,Follow Up Date,Deal Value (INR/SAR),Cadence Step,Notes';
const rows = leads.map(l => {
  const safeName = (l.businessName || '').replace(/"/g, '""');
  const safeService = (l.targetService || '').replace(/"/g, '""');
  return `"${l.id}","${safeName}","${l.city}","${l.country}","${safeService}","${l.phone}","${l.email}","${l.leadScore}","Contacted","2026-08-27","","2026-08-30","","0","Day 0: Initial VIP Pitch"`;
});

fs.writeFileSync(path.join(__dirname, 'crm_status.csv'), [headers, ...rows].join('\n'), 'utf8');
console.log(`✅ Synchronized crm_status.csv with all ${leads.length} leads!`);
