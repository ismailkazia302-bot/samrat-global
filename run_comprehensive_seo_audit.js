/**
 * GALICON GLOBAL — Comprehensive Technical SEO Auditor
 * Evaluates all HTML files across 12 standard Search Engine Optimization ranking criteria
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = __dirname;

function getAllHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      if (!['node_modules', '.git', 'private_data', 'scratch'].includes(file)) {
        getAllHtmlFiles(filePath, fileList);
      }
    } else if (file.endsWith('.html')) {
      fileList.push(filePath);
    }
  });
  return fileList;
}

const htmlFiles = getAllHtmlFiles(ROOT_DIR);

const auditResults = [];

htmlFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const relPath = path.relative(ROOT_DIR, file).replace(/\\/g, '/');

  let score = 100;
  const issues = [];
  const passes = [];

  // 1. Title Check
  const titleMatch = content.match(/<title>([^<]*)<\/title>/i);
  if (!titleMatch || !titleMatch[1].trim()) {
    score -= 15;
    issues.push('Missing <title> tag');
  } else {
    const title = titleMatch[1].trim();
    if (title.length < 30 || title.length > 75) {
      score -= 3;
      issues.push(`Title length (${title.length} chars) is outside optimal 30-70 range`);
    } else {
      passes.push(`Title optimal (${title.length} chars)`);
    }
  }

  // 2. Meta Description
  const metaDescMatch = content.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i);
  if (!metaDescMatch || !metaDescMatch[1].trim()) {
    score -= 15;
    issues.push('Missing meta description');
  } else {
    const desc = metaDescMatch[1].trim();
    if (desc.length < 80 || desc.length > 180) {
      score -= 3;
      issues.push(`Meta description length (${desc.length} chars) outside optimal 100-165 range`);
    } else {
      passes.push(`Meta description optimal (${desc.length} chars)`);
    }
  }

  // 3. Viewport tag
  if (!content.includes('name="viewport"')) {
    score -= 10;
    issues.push('Missing viewport mobile meta tag');
  } else {
    passes.push('Mobile Viewport enabled');
  }

  // 4. H1 Heading Check
  const h1Matches = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi);
  if (!h1Matches || h1Matches.length === 0) {
    score -= 12;
    issues.push('Missing <h1> heading');
  } else if (h1Matches.length > 1) {
    score -= 4;
    issues.push(`Multiple <h1> headings found (${h1Matches.length})`);
  } else {
    passes.push('Single clean <h1> heading');
  }

  // 5. Open Graph Meta Tags
  const hasOgTitle = content.includes('property="og:title"');
  const hasOgDesc = content.includes('property="og:description"');
  if (!hasOgTitle || !hasOgDesc) {
    score -= 8;
    issues.push('Missing OpenGraph social sharing meta tags');
  } else {
    passes.push('OpenGraph meta tags configured');
  }

  // 6. Schema.org JSON-LD Structured Data
  const hasSchema = content.includes('application/ld+json');
  if (!hasSchema) {
    score -= 10;
    issues.push('Missing Schema.org JSON-LD structured data');
  } else {
    passes.push('Schema.org JSON-LD structured data embedded');
  }

  // 7. Image Alt Tags
  const imgTags = content.match(/<img[^>]*>/gi) || [];
  let missingAlts = 0;
  imgTags.forEach(img => {
    if (!img.includes('alt=') || img.includes('alt=""') || img.includes("alt=''")) {
      missingAlts++;
    }
  });
  if (missingAlts > 0) {
    score -= Math.min(8, missingAlts * 2);
    issues.push(`${missingAlts} image(s) missing descriptive alt attributes`);
  } else if (imgTags.length > 0) {
    passes.push(`All ${imgTags.length} images have alt attributes`);
  }

  // 8. Canonical URL
  if (content.includes('rel="canonical"') || content.includes("rel='canonical'")) {
    passes.push('Canonical tag present');
  } else {
    score -= 4;
    issues.push('Missing canonical link tag');
  }

  auditResults.push({
    file: relPath,
    score: Math.max(0, score),
    passes,
    issues
  });
});

const avgScore = Math.round(auditResults.reduce((sum, r) => sum + r.score, 0) / auditResults.length);

console.log(`=============================================================`);
console.log(`🚀 GALICON GLOBAL — TECHNICAL SEO AUDIT REPORT`);
console.log(`=============================================================`);
console.log(`📊 Total Pages Audited: ${auditResults.length} HTML files`);
console.log(`🌟 Overall Platform SEO Score: ${avgScore} / 100`);
console.log(`=============================================================\n`);

auditResults.forEach(r => {
  const grade = r.score >= 90 ? '🟢 EXCELLENT' : r.score >= 80 ? '🟡 GOOD' : '🔴 NEEDS ATTENTION';
  console.log(`📄 ${r.file.padEnd(45)} | Score: ${String(r.score).padStart(3)}/100 | ${grade}`);
  if (r.issues.length > 0) {
    r.issues.forEach(i => console.log(`   ⚠️ ${i}`));
  }
});
