const fs = require('fs');
const path = require('path');

const files = [
  'index.html',
  'meet.html',
  'calculator.html',
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

  // Determine prefix for image path
  const isSubdir = f.includes('/');
  const prefix = isSubdir ? '../' : '';

  // Navbar logo image replacement string for index.html (which had height:80px)
  const oldIndexLogo = `<a href="#" style="text-decoration:none; display:flex; align-items:center;">\n        <img src="galicon_logo.png" alt="GALICON GLOBAL" style="height:80px; width:auto; object-fit:contain;">\n      </a>`;
  
  const newIndexLogo = `<a href="#" style="text-decoration:none; display:flex; align-items:center; gap:12px;">\n        <img src="galicon_logo.png" alt="GALICON GLOBAL" style="height:65px; width:auto; object-fit:contain;">\n        <span style="font-family:\'Poppins\', sans-serif; font-weight:900; font-size:1.45rem; letter-spacing:2px; color:#FFFFFF; line-height:1; display:flex; flex-direction:column; text-transform:uppercase;">\n          GALICON\n          <span style="font-size:0.9rem; letter-spacing:3px; font-weight:800; color:#EAB308; margin-top:2px;">GLOBAL</span>\n        </span>\n      </a>`;

  content = content.replace(oldIndexLogo, newIndexLogo);

  // For other subpages (which had height:75px)
  const oldSubLogoPattern = `<a href="[^"]+" style="color:#fff; font-weight:900; text-decoration:none; font-size:1.2rem;">\\s*<img src="${prefix}galicon_logo\\.png" alt="GALICON GLOBAL" style="height:75px; width:auto; object-fit:contain;">\\s*</a>`;
  const oldSubLogoRegex = new RegExp(oldSubLogoPattern, 'g');
  
  const newSubLogo = `<a href="${prefix}index.html" style="text-decoration:none; display:flex; align-items:center; gap:10px;">\n        <img src="${prefix}galicon_logo.png" alt="GALICON GLOBAL" style="height:55px; width:auto; object-fit:contain;">\n        <span style="font-family:\'Poppins\', sans-serif; font-weight:900; font-size:1.2rem; letter-spacing:2px; color:#FFFFFF; line-height:1; display:flex; flex-direction:column; text-transform:uppercase;">\n          GALICON\n          <span style="font-size:0.8rem; letter-spacing:3px; font-weight:800; color:#EAB308; margin-top:2px;">GLOBAL</span>\n        </span>\n      </a>`;

  // Also match general subpage logo pattern
  content = content.replace(oldSubLogoRegex, newSubLogo);
  
  // Specific fallback replace for subpages
  const oldSubpageSpecific = `<a href="index.html" style="color:#fff; font-weight:900; text-decoration:none; font-size:1.2rem;">\n        <img src="galicon_logo.png" alt="GALICON GLOBAL" style="height:75px; width:auto; object-fit:contain;">\n      </a>`;
  content = content.replace(oldSubpageSpecific, newSubLogo.replace(/\.\.\//g, ''));
  
  const oldSubpageSpecific2 = `<a href="../index.html" style="color:#fff; font-weight:900; text-decoration:none; font-size:1.2rem;">\n        <img src="../galicon_logo.png" alt="GALICON GLOBAL" style="height:75px; width:auto; object-fit:contain;">\n      </a>`;
  content = content.replace(oldSubpageSpecific2, newSubLogo);

  // Footer image in index.html (had height:100px)
  const oldFooterLogo = `<a href="#" style="text-decoration:none; display:inline-flex; align-items:center;">\n            <img src="galicon_logo.png" alt="GALICON GLOBAL" style="height:100px; width:auto; object-fit:contain;">\n          </a>`;
  
  const newFooterLogo = `<a href="#" style="text-decoration:none; display:inline-flex; align-items:center; gap:12px; margin-bottom:15px;">\n            <img src="galicon_logo.png" alt="GALICON GLOBAL" style="height:80px; width:auto; object-fit:contain;">\n            <span style="font-family:\'Poppins\', sans-serif; font-weight:900; font-size:1.8rem; letter-spacing:2px; color:#FFFFFF; line-height:1; display:flex; flex-direction:column; text-transform:uppercase; text-align:left;">\n              GALICON\n              <span style="font-size:1rem; letter-spacing:3px; font-weight:800; color:#EAB308; margin-top:4px;">GLOBAL</span>\n            </span>\n          </a>`;
  
  content = content.replace(oldFooterLogo, newFooterLogo);

  if (content !== orig) {
    fs.writeFileSync(fp, content, 'utf8');
    console.log('✅ Added text next to logo in:', f);
    updated++;
  }
});

console.log(`🎉 Done! Logo + Name text added in ${updated} files.`);
