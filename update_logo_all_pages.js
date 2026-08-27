const fs = require('fs');
const path = require('path');

const pages = [
  ['meet.html', ''],
  ['products.html', ''],
  ['calculator.html', ''],
  ['card.html', ''],
  ['proposal_template.html', ''],
  ['services/corporate-event-management-whitefield-bangalore.html', '../'],
  ['services/dubai-luxury-real-estate-buyer-acquisition-agency.html', '../'],
  ['services/saudi-arabia-corporate-summit-production-riyadh.html', '../'],
  ['blog/bangalore-corporate-event-management-guide-2026.html', '../'],
  ['blog/corporate-event-management-riyadh-vip-staging-guide-2026.html', '../'],
  ['blog/corporate-event-production-checklist-bangalore-2026.html', '../'],
  ['blog/dubai-corporate-gala-event-production-guide-2026.html', '../'],
  ['blog/dubai-luxury-real-estate-performance-marketing.html', '../'],
  ['blog/saudi-arabia-vision-2030-business-events.html', '../']
];

let updated = 0;

pages.forEach(([p, prefix]) => {
  const fp = path.join(__dirname, p);
  if (!fs.existsSync(fp)) return;

  let content = fs.readFileSync(fp, 'utf8');
  let orig = content;
  const imgTag = `<img src="${prefix}galicon_logo.png" alt="GALICON GLOBAL" style="height:44px; width:auto; object-fit:contain;">`;

  // Pattern 1: with crown emoji
  content = content.split('👑 GALICON <span style="color:#EAB308;">GLOBAL</span>').join(imgTag);
  content = content.split('👑 GALICON <span style="color:#EAB308;">GLOBAL</span>').join(imgTag);

  // Pattern 2: without crown
  content = content.split('GALICON <span style="color:#EAB308;">GLOBAL</span>').join(imgTag);

  if (content !== orig) {
    fs.writeFileSync(fp, content, 'utf8');
    console.log('Updated logo: ' + p);
    updated++;
  }
});

console.log('Done! Updated ' + updated + ' pages with GALICON image logo.');
