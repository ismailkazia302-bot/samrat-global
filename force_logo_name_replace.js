const fs = require('fs');
const path = require('path');

const files = [
  'meet.html',
  'products.html',
  'calculator.html',
  'card.html',
  'proposal_template.html',
  'services/corporate-event-management-whitefield-bangalore.html',
  'services/dubai-luxury-real-estate-buyer-acquisition-agency.html',
  'services/saudi-arabia-corporate-summit-production-riyadh.html',
  'blog/bangalore-corporate-event-management-guide-2026.html',
  'blog/corporate-event-management-riyadh-vip-staging-guide-2026.html',
  'blog/corporate-event-production-checklist-bangalore-2026.html',
  'blog/dubai-corporate-gala-event-production-guide-2026.html',
  'blog/dubai-luxury-real-estate-performance-marketing.html',
  'blog/saudi-arabia-vision-2030-business-events.html'
];

let updated = 0;

files.forEach(f => {
  const fp = path.join(__dirname, f);
  if (!fs.existsSync(fp)) return;
  let content = fs.readFileSync(fp, 'utf8');
  let orig = content;

  const isSubdir = f.includes('/');
  const prefix = isSubdir ? '../' : '';

  // Look for any anchor containing galicon_logo.png and replace it entirely with the custom styled image + text logo
  const logoAnchorRegex = /<a\s+href="[^"]+"\s+style="[^"]*"\s*>\s*<img\s+src="[^"]*galicon_logo\.png"[^>]*>\s*<\/a>/gi;
  
  const newSubLogo = `<a href="${prefix}index.html" style="text-decoration:none; display:flex; align-items:center; gap:10px;">\n        <img src="${prefix}galicon_logo.png" alt="GALICON GLOBAL" style="height:55px; width:auto; object-fit:contain;">\n        <span style="font-family:\'Poppins\', sans-serif; font-weight:900; font-size:1.2rem; letter-spacing:2px; color:#FFFFFF; line-height:1; display:flex; flex-direction:column; text-transform:uppercase;">\n          GALICON\n          <span style="font-size:0.8rem; letter-spacing:3px; font-weight:800; color:#EAB308; margin-top:2px;">GLOBAL</span>\n        </span>\n      </a>`;

  content = content.replace(logoAnchorRegex, newSubLogo);

  // Fallback for simple matches
  const target1 = `<a href="../index.html" style="font-weight:900; font-size:1.2rem; color:#fff; text-decoration:none;"><img src="../galicon_logo.png" alt="GALICON GLOBAL" style="height:75px; width:auto; object-fit:contain;"></a>`;
  content = content.split(target1).join(newSubLogo);
  
  const target2 = `<a href="../index.html" style="font-weight:900; font-size:1.2rem; color:#fff; text-decoration:none;"><img src="../galicon_logo.png" alt="GALICON GLOBAL" style="height:55px; width:auto; object-fit:contain;"></a>`;
  content = content.split(target2).join(newSubLogo);

  const target3 = `<a href="../index.html" style="font-weight:900; font-size:1.2rem; color:#fff; text-decoration:none;"><img src="../galicon_logo.png" alt="GALICON GLOBAL" style="height:75px; width:auto; object-fit:contain;">\n      </a>`;
  content = content.split(target3).join(newSubLogo);

  if (content !== orig) {
    fs.writeFileSync(fp, content, 'utf8');
    console.log('✅ Forced updated:', f);
    updated++;
  }
});

console.log('Done! Updated ' + updated + ' pages with GALICON brand name + image logo.');
