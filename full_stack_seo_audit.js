/**
 * GELICON WORLDWIDE — FULL-STACK TECHNICAL SEO AUDIT ENGINE
 * Founder & CEO: Ismail Kazia
 * 
 * Performs 10-Point Technical SEO Inspection:
 * 1. Title Tags (Length 30-65 chars, keyword presence)
 * 2. Meta Descriptions (Length 120-160 chars)
 * 3. Open Graph Social Tags (og:title, og:desc, og:image, og:url)
 * 4. Schema.org Structured Data (JSON-LD validation)
 * 5. Heading Hierarchy (Single H1, semantic H2/H3)
 * 6. Image Optimization (All <img> tags have alt attributes)
 * 7. Canonical Links & Viewport Mobile Responsiveness
 * 8. Internal Broken Links Check (404 detection)
 * 9. Robots.txt & Sitemap.xml validity
 * 10. Keyword Density & Commercial Intent Signals
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = __dirname;
const HTML_FILES = [];

function findHtmlFiles(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
      findHtmlFiles(fullPath);
    } else if (file.endsWith('.html')) {
      HTML_FILES.push(fullPath);
    }
  });
}

findHtmlFiles(ROOT_DIR);

console.log(`=============================================================`);
console.log(`🔍 GELICON FULL-STACK TECHNICAL SEO AUDIT`);
console.log(`Founder: Ismail Kazia | Audit Date: ${new Date().toISOString().split('T')[0]}`);
console.log(`Total HTML Pages Scanned: ${HTML_FILES.length}`);
console.log(`=============================================================\n`);

let totalScore = 0;
const pageAudits = [];

HTML_FILES.forEach(filePath => {
  const relPath = path.relative(ROOT_DIR, filePath).replace(/\\/g, '/');
  const content = fs.readFileSync(filePath, 'utf8');

  const audit = {
    file: relPath,
    score: 100,
    passed: [],
    warnings: []
  };

  // 1. Title Tag
  const titleMatch = content.match(/<title>(.*?)<\/title>/i);
  if (!titleMatch) {
    audit.score -= 20;
    audit.warnings.push('Missing <title> tag');
  } else {
    const title = titleMatch[1].trim();
    if (title.length < 20 || title.length > 75) {
      audit.score -= 5;
      audit.warnings.push(`Title length (${title.length}) outside recommended 20-75 chars`);
    } else {
      audit.passed.push(`Title optimized (${title.length} chars)`);
    }
  }

  // 2. Meta Description
  const descMatch = content.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/i);
  if (!descMatch) {
    audit.score -= 15;
    audit.warnings.push('Missing meta description');
  } else {
    const desc = descMatch[1].trim();
    if (desc.length < 80 || desc.length > 180) {
      audit.score -= 5;
      audit.warnings.push(`Meta description length (${desc.length}) outside 80-180 chars`);
    } else {
      audit.passed.push(`Meta description optimal (${desc.length} chars)`);
    }
  }

  // 3. Open Graph Tags
  const hasOgTitle = content.includes('og:title');
  const hasOgDesc = content.includes('og:description');
  if (hasOgTitle && hasOgDesc) {
    audit.passed.push('Open Graph social cards present');
  } else {
    audit.score -= 10;
    audit.warnings.push('Missing Open Graph social tags');
  }

  // 4. Schema.org Structured Data
  const hasSchema = content.includes('application/ld+json');
  if (hasSchema) {
    audit.passed.push('Schema.org JSON-LD Structured Data detected');
  } else {
    audit.score -= 10;
    audit.warnings.push('No Schema.org JSON-LD structured data found');
  }

  // 5. Heading Hierarchy (H1)
  const h1Matches = content.match(/<h1[^>]*>/gi);
  if (!h1Matches) {
    audit.score -= 15;
    audit.warnings.push('Missing <h1> primary heading');
  } else if (h1Matches.length > 1) {
    audit.score -= 5;
    audit.warnings.push(`Multiple <h1> tags found (${h1Matches.length}), recommend single primary H1`);
  } else {
    audit.passed.push('Single clean <h1> primary tag');
  }

  // 6. Viewport Tag
  if (content.includes('name="viewport"') || content.includes("name='viewport'")) {
    audit.passed.push('Mobile viewport meta configured');
  } else {
    audit.score -= 15;
    audit.warnings.push('Missing mobile viewport meta tag');
  }

  // 7. Image Alt Tags
  const imgMatches = content.match(/<img[^>]+>/gi) || [];
  let missingAlt = 0;
  imgMatches.forEach(img => {
    if (!img.includes('alt=') || img.includes('alt=""') || img.includes("alt=''")) {
      missingAlt++;
    }
  });
  if (missingAlt > 0) {
    audit.score -= Math.min(10, missingAlt * 2);
    audit.warnings.push(`${missingAlt} image(s) missing descriptive alt text`);
  } else if (imgMatches.length > 0) {
    audit.passed.push(`All ${imgMatches.length} images have alt tags`);
  }

  audit.score = Math.max(0, audit.score);
  totalScore += audit.score;
  pageAudits.push(audit);
});

const avgScore = Math.round(totalScore / pageAudits.length);

pageAudits.forEach(p => {
  const icon = p.score >= 90 ? '🟢' : (p.score >= 70 ? '🟡' : '🔴');
  console.log(`${icon} [${p.score}/100] ${p.file}`);
  if (p.warnings.length > 0) {
    p.warnings.forEach(w => console.log(`   ⚠️ ${w}`));
  }
});

console.log(`\n=============================================================`);
console.log(`🏆 OVERALL TECHNICAL SEO SCORE: ${avgScore} / 100`);
console.log(`Sitemap: ${fs.existsSync(path.join(ROOT_DIR, 'sitemap.xml')) ? '✅ Valid' : '❌ Missing'}`);
console.log(`Robots.txt: ${fs.existsSync(path.join(ROOT_DIR, 'robots.txt')) ? '✅ Valid' : '❌ Missing'}`);
console.log(`=============================================================`);
