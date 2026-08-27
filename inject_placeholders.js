const fs = require('fs');
const path = require('path');

const files = [
  ['index.html', ''],
  ['meet.html', ''],
  ['products.html', ''],
  ['calculator.html', ''],
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

files.forEach(([f, prefix]) => {
  const fp = path.join(__dirname, f);
  if (!fs.existsSync(fp)) return;
  let content = fs.readFileSync(fp, 'utf8');
  let orig = content;

  // 1. Replace Navbar Block
  // Look for nav tags and replace with <div id="navbar-placeholder"></div>
  const navRegex = /<!--\s*Top\s*Navbar\s*.*?-->\s*<nav[^>]*>([\s\S]*?)<\/nav>|<!--\s*Navigation\s*-->\s*<nav[^>]*>([\s\S]*?)<\/nav>|<nav class="store-nav">([\s\S]*?)<\/nav>|<nav class="nav-bar">([\s\S]*?)<\/nav>|<nav class="post-nav">([\s\S]*?)<\/nav>/i;
  content = content.replace(navRegex, '<div id="navbar-placeholder"></div>');

  // 2. Replace Footer Block
  const footerRegex = /<!--\s*Footer\s*-->\s*<footer[^>]*>([\s\S]*?)<\/footer>|<footer class="footer-bar py-5"[^>]*>([\s\S]*?)<\/footer>|<footer class="footer-store"[^>]*>([\s\S]*?)<\/footer>|<footer class="text-center py-4 border-top border-dark mt-5 text-secondary"[^>]*>([\s\S]*?)<\/footer>/i;
  content = content.replace(footerRegex, '<div id="footer-placeholder"></div>');

  // 3. Inject nav_loader.js script reference before </body>
  const scriptTag = `<script src="${prefix}nav_loader.js"></script>`;
  if (!content.includes('nav_loader.js')) {
    content = content.replace('</body>', `  ${scriptTag}\n</body>`);
  }

  if (content !== orig) {
    fs.writeFileSync(fp, content, 'utf8');
    console.log(`✅ Injected placeholders in: ${f}`);
  }
});
console.log('🎉 Placeholder injection complete!');
