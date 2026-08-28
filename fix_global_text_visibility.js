/**
 * GALICON GLOBAL — Master Global Font & Text Visibility Normalizer
 * Enforces crisp, ultra-legible high-contrast text across all 29 HTML files.
 */
const fs = require('fs');
const path = require('path');

function getAllHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== 'private_data') {
        results = results.concat(getAllHtmlFiles(filePath));
      }
    } else if (file.endsWith('.html')) {
      results.push(filePath);
    }
  });
  return results;
}

const HIGH_CONTRAST_CSS_SNIPPET = `
    /* UNIVERSAL HIGH-CONTRAST FONT VISIBILITY (GALICON 2026) */
    body { color: #F8FAFC !important; }
    p, li, .lead, .problem-pill, .audit-choice { color: #CBD5E1 !important; }
    .text-muted, .text-secondary { color: #CBD5E1 !important; }
    .card-dark, .div-card, .calc-card, .audit-card, .widescreen-booking-card { color: #F8FAFC !important; }
    .card-dark p, .card-dark li, .card-dark ul,
    .div-card p, .div-card li, .div-card ul,
    .calc-card p, .calc-card li, .calc-card ul,
    .audit-card p, .audit-card li, .audit-card ul,
    .widescreen-booking-card p, .widescreen-booking-card li { color: #E2E8F0 !important; }
    .price-box .text-muted, .div-price-chip .text-muted { color: #94A3B8 !important; }
`;

const htmlFiles = getAllHtmlFiles(__dirname);
let updatedCount = 0;

htmlFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  if (content.includes('</style>')) {
    if (!content.includes('UNIVERSAL HIGH-CONTRAST FONT VISIBILITY')) {
      content = content.replace('</style>', `${HIGH_CONTRAST_CSS_SNIPPET}  </style>`);
    }
  }

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    updatedCount++;
    console.log(`✅ Contrast Fixed: ${path.relative(__dirname, file)}`);
  }
});

console.log(`\n🎉 Processed ${htmlFiles.length} HTML files. Injected high-contrast visibility rules into ${updatedCount} files.`);
