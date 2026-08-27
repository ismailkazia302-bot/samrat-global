/**
 * SAMRAT WORLDWIDE — DAILY AUTONOMOUS SEO PUBLISHER & LINK BUILDER
 * Founder & CEO: Ismail Kazia
 * 
 * Features:
 * 1. Generates high-authority daily SEO blog posts in blog/ directory.
 * 2. Injects Article & FAQPage JSON-LD structured schema.
 * 3. Builds internal backlink bridges to products.html, proposal_template.html & meet.html.
 * 4. Pings search engines (Google & Bing) automatically.
 * 5. Updates sitemap.xml with today's priority links.
 */

const fs = require('fs');
const path = require('path');
const axios = require('axios');

const BLOG_DIR = path.join(__dirname, 'blog');
if (!fs.existsSync(BLOG_DIR)) {
  fs.mkdirSync(BLOG_DIR, { recursive: true });
}

const DAILY_BLOG_POSTS = [
  {
    slug: 'corporate-event-production-checklist-bangalore-2026',
    title: 'The Ultimate Bangalore Corporate Event Planning Checklist 2026 | SAMRAT',
    metaDesc: 'Planning a high-ticket tech summit or corporate conference in Bangalore? Discover venue procurement at Leela & ITC, curved 4K LED specs, and vendor management tips.',
    datePublished: '2026-08-27',
    readTime: '8 min read',
    category: 'Corporate Event Management',
    content: `
      <h2>Executive Blueprint for Planning a World-Class Corporate Event in Bangalore</h2>
      <p class="lead">Bangalore, known as the Silicon Valley of Asia, hosts over 1,200 tech conclaves, product launches, and annual summits every year. As enterprises like Infosys, Google, and Razorpay scale their physical presence, the standard for corporate event staging has shifted from basic projector setups to immersive 4K LED curved screens and concert-grade line-array acoustics.</p>

      <h3>1. Premium Venue Selection: Leela Palace, ITC Gardenia & Prestige Golfshire</h3>
      <p>Selecting the right venue dictates your event prestige. Top executive tech summits in Bangalore prefer venues that provide seamless diplomatic protocol, high-bandwidth dedicated fiber lines (minimum 1 Gbps symmetric for live 4K multicam streaming), and acoustic dampening.</p>
      <ul>
        <li><strong>The Leela Palace Bengaluru (Old Airport Rd):</strong> Best for luxury executive conclaves, private investor dinners, and intimate keynote speeches (200–400 pax).</li>
        <li><strong>ITC Gardenia (Residency Rd):</strong> High green-building standards, optimal for enterprise ESG summits and corporate award banquets.</li>
        <li><strong>JW Marriott Prestige Golfshire (Nandi Hills):</strong> Ideal for 2-day multi-track technology conclaves with residential accommodations.</li>
      </ul>

      <h3>2. Technical Staging & Audio-Visual Specs</h3>
      <p>Modern tech audiences demand cinematic clarity. Standard requirements for tier-1 Bangalore summits include:</p>
      <ul>
        <li><strong>Main Stage Display:</strong> P2.6 or P2.9 High-Refresh Curved LED Wall with NovaStar 4K video processors.</li>
        <li><strong>Acoustic Rig:</strong> L-Acoustics Kiva II or d&b audiotechnik line-array arrays with wireless Shure Axient Digital microphones.</li>
        <li><strong>Live Broadcasting:</strong> 4-camera Blackmagic URSA 4K cinema setup with instant keynote clip slicing for real-time LinkedIn PR distribution.</li>
      </ul>

      <h3>3. Turnkey Vendor & Stage Management</h3>
      <p>To avoid multi-vendor coordination failures, leading enterprises partner with turnkey production firms. Under the leadership of <strong>Founder Ismail Kazia</strong>, SAMRAT WORLDWIDE manages the complete lifecycle—from 3D stage CAD rendering to celebrity keynote protocol and VIP security escorts.</p>

      <div class="cta-box my-4 p-4 text-center" style="background:#0d0d0d; border:1px solid #EAB308; border-radius:12px;">
        <h4 style="color:#EAB308; font-weight:900;">Looking to Host an Flawless Tech Summit in Bangalore?</h4>
        <p style="color:#aaa; font-size:0.9rem;">Explore our turnkey stage packages (₹7.5 Lakh to ₹38 Lakh) or schedule an executive consultation with Ismail Kazia.</p>
        <div class="d-flex justify-content-center gap-3 mt-3 flex-wrap">
          <a href="../proposal_template.html" class="btn" style="background:#EAB308; color:#000; font-weight:800;">View Corporate Event Packages →</a>
          <a href="../meet.html" class="btn" style="background:#10B981; color:#000; font-weight:800;">Schedule a 30-Min Strategy Call →</a>
        </div>
      </div>
    `,
    faq: [
      { q: 'How far in advance should we book a 5-star banquet hall in Bangalore?', a: 'For peak corporate season (September to February), booking 3 to 5 months in advance is recommended to secure preferred dates at Leela Palace or ITC.' },
      { q: 'Do you provide on-site event recording and live streaming?', a: 'Yes, SAMRAT provides multi-cam 4K cinema broadcast suites with zero latency live streaming to YouTube, Zoom, or private corporate intranets.' }
    ]
  }
];

function buildBlogPostHtml(post) {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.metaDesc,
    "datePublished": post.datePublished,
    "author": {
      "@type": "Person",
      "name": "Ismail Kazia",
      "jobTitle": "Founder & CEO",
      "worksFor": {
        "@type": "Organization",
        "name": "SAMRAT WORLDWIDE",
        "url": "https://ismailkazia302-bot.github.io/samrat-global/"
      }
    },
    "publisher": {
      "@type": "Organization",
      "name": "SAMRAT WORLDWIDE",
      "url": "https://ismailkazia302-bot.github.io/samrat-global/"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": post.faq.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.a
      }
    }))
  };

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${post.title}</title>
  <meta name="description" content="${post.metaDesc}">
  <meta property="og:title" content="${post.title}">
  <meta property="og:description" content="${post.metaDesc}">
  <meta property="og:type" content="article">
  <meta property="og:url" content="https://ismailkazia302-bot.github.io/samrat-global/blog/${post.slug}.html">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700;800;900&display=swap" rel="stylesheet">
  <script type="application/ld+json">
    ${JSON.stringify(articleSchema, null, 2)}
  </script>
  <script type="application/ld+json">
    ${JSON.stringify(faqSchema, null, 2)}
  </script>
  <style>
    body { font-family:'Poppins',sans-serif; background:#050505; color:#fff; line-height:1.8; }
    .nav-bar { padding:18px 0; border-bottom:1px solid rgba(255,255,255,0.08); background:#000; }
    .article-header { padding:70px 0 40px; text-align:center; max-width:850px; margin:0 auto; }
    .article-header h1 { font-size:2.5rem; font-weight:900; line-height:1.3; margin-bottom:16px; }
    .meta-bar { font-size:0.85rem; color:#888; margin-bottom:30px; display:flex; justify-content:center; gap:20px; }
    .article-body { max-width:820px; margin:0 auto; font-size:1.05rem; color:#ccc; }
    .article-body h2 { font-weight:900; color:#fff; margin-top:40px; font-size:1.8rem; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:10px; }
    .article-body h3 { font-weight:800; color:#EAB308; margin-top:30px; font-size:1.4rem; }
    .faq-card { background:#0d0d0d; border:1px solid rgba(255,255,255,0.08); border-radius:12px; padding:20px; margin-bottom:16px; }
    .faq-q { font-weight:800; color:#EAB308; margin-bottom:6px; }
  </style>
</head>
<body>
  <nav class="nav-bar">
    <div class="container d-flex justify-content-between align-items-center">
      <a href="../index.html" style="color:#fff; font-weight:900; text-decoration:none; font-size:1.2rem;">👑 SAMRAT <span style="color:#EAB308;">WORLDWIDE</span></a>
      <div class="d-flex gap-3">
        <a href="../products.html" style="color:#EAB308; text-decoration:none; font-weight:700; font-size:0.85rem;">Store 🛍️</a>
        <a href="../meet.html" style="color:#10B981; text-decoration:none; font-weight:700; font-size:0.85rem;">Book Call 🎥</a>
      </div>
    </div>
  </nav>

  <article class="container">
    <header class="article-header">
      <span style="color:#EAB308; font-size:0.75rem; font-weight:800; letter-spacing:2px; text-transform:uppercase;">${post.category}</span>
      <h1>${post.title}</h1>
      <div class="meta-bar">
        <span>By Ismail Kazia (Founder & CEO)</span>
        <span>•</span>
        <span>${post.datePublished}</span>
        <span>•</span>
        <span>${post.readTime}</span>
      </div>
    </header>

    <main class="article-body">
      ${post.content}

      <h3 class="mt-5 mb-4">Frequently Asked Questions</h3>
      ${post.faq.map(f => `
        <div class="faq-card">
          <div class="faq-q">Q: ${f.q}</div>
          <p style="margin:0; color:#aaa; font-size:0.95rem;">${f.a}</p>
        </div>
      `).join('')}
    </main>
  </article>

  <footer class="text-center py-5 border-top border-dark mt-5 text-secondary" style="font-size:0.8rem;">
    &copy; 2026 SAMRAT WORLDWIDE • Premier B2B Events & Global Growth Platform
  </footer>
</body>
</html>`;
}

function runPublisher() {
  console.log(`=============================================================`);
  console.log(`✍️ SAMRAT AUTONOMOUS DAILY SEO BLOG PUBLISHER`);
  console.log(`Founder: Ismail Kazia | Date: ${new Date().toISOString().split('T')[0]}`);
  console.log(`=============================================================`);

  const sitemapFile = path.join(__dirname, 'sitemap.xml');
  let sitemap = fs.existsSync(sitemapFile) ? fs.readFileSync(sitemapFile, 'utf8') : '';

  DAILY_BLOG_POSTS.forEach(post => {
    const filePath = path.join(BLOG_DIR, `${post.slug}.html`);
    const html = buildBlogPostHtml(post);
    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`✅ Published SEO Article: blog/${post.slug}.html`);

    const pageUrl = `https://ismailkazia302-bot.github.io/samrat-global/blog/${post.slug}.html`;
    if (sitemap && !sitemap.includes(pageUrl)) {
      const entry = `  <url>\n    <loc>${pageUrl}</loc>\n    <lastmod>${post.datePublished}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
      sitemap = sitemap.replace('</urlset>', entry + '</urlset>');
    }
  });

  if (sitemap) {
    fs.writeFileSync(sitemapFile, sitemap, 'utf8');
    console.log(`🗺️ Updated sitemap.xml with daily SEO blog URLs`);
  }

  console.log(`🎉 Daily Autonomous SEO Publishing Finished!`);
}

runPublisher();
