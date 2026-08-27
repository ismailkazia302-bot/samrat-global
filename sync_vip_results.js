const fs = require('fs');
const path = require('path');

const report = JSON.parse(fs.readFileSync(path.join(__dirname, 'daily_reports', 'vip_batch_1_2026-08-27.json'), 'utf8'));
const crmPath = path.join(__dirname, 'crm_status.csv');
const crmLines = fs.readFileSync(crmPath, 'utf8').split('\n');
const header = crmLines[0];

const sentMap = new Map();
report.forEach(r => sentMap.set(r.id, r));

const updatedLines = [header];
for (let i = 1; i < crmLines.length; i++) {
  const line = crmLines[i].trim();
  if (!line) continue;
  const parts = line.split('","').map(p => p.replace(/^"|"$/g, ''));
  const id = parts[0];
  if (sentMap.has(id)) {
    const r = sentMap.get(id);
    parts[8] = 'Contacted';
    parts[9] = '2026-08-27';
    parts[11] = '2026-08-30';
    parts[14] = `VIP Batch 1 Sent via Brevo (${r.messageId ? r.messageId.substring(0, 22) : 'sent'})`;
    updatedLines.push('"' + parts.join('","') + '"');
  } else {
    updatedLines.push(line);
  }
}

fs.writeFileSync(crmPath, updatedLines.join('\n'), 'utf8');
console.log('✅ Synchronized crm_status.csv with live Brevo dispatch IDs!');
