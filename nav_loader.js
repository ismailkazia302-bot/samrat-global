/**
 * GALICON GLOBAL — Unified Navbar & Footer Injector Component
 * Resolves path depths dynamically for Root, /services/, and /blog/ pages.
 */
(function() {
  document.addEventListener('DOMContentLoaded', () => {
    // 1. Detect Path Depth
    const path = window.location.pathname;
    const isSubdir = path.includes('/services/') || path.includes('/blog/');
    const prefix = isSubdir ? '../' : '';

    // 2. Locate Placeholders or Inject Directly
    const navPlaceholder = document.getElementById('navbar-placeholder');
    const footerPlaceholder = document.getElementById('footer-placeholder');

    // 3. Navbar HTML Definition
    const navHTML = `
  <nav class="navbar navbar-expand-lg navbar-dark nav-alsayegh">
    <div class="container-fluid px-lg-5">
      <a href="${prefix}index.html" style="text-decoration:none; display:flex; align-items:center; gap:12px;">
        <img src="${prefix}galicon_logo.png" alt="GALICON GLOBAL" style="height:65px; width:auto; object-fit:contain;">
        <span style="font-family:'Poppins', sans-serif; font-weight:900; font-size:1.45rem; letter-spacing:2px; color:#FFFFFF; line-height:1; display:flex; flex-direction:column; text-transform:uppercase;">
          GALICON
          <span style="font-size:0.9rem; letter-spacing:3px; font-weight:800; color:#EAB308; margin-top:2px;">GLOBAL</span>
        </span>
      </a>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto align-items-center">
          <li class="nav-item"><a class="nav-link" href="${prefix}index.html#home">HOME</a></li>
          <li class="nav-item"><a class="nav-link" href="${prefix}index.html#services">SERVICES</a></li>
          <li class="nav-item"><a class="nav-link" href="${prefix}index.html#projects">WORK</a></li>
          <li class="nav-item"><a class="nav-link" href="${prefix}index.html#estimator">CALCULATOR</a></li>
          <li class="nav-item"><a class="nav-link" href="${prefix}products.html" style="color:#FFF200 !important;"><i class="fas fa-shopping-bag me-1"></i>STORE</a></li>
          <li class="nav-item"><a class="nav-link" href="${prefix}meet.html" style="color:#10B981 !important;"><i class="fas fa-video me-1"></i>BOOK A CALL</a></li>
          <li class="nav-item"><a class="nav-link" href="${prefix}index.html#contact">CONTACT</a></li>
          <li class="nav-item ms-lg-3">
            <a href="https://wa.me/916363962640?text=Hello%20Ismail%20Kazia%20%7C%20GALICON!%20I%20would%20like%20to%20discuss%20a%20priority%20project." target="_blank" style="background:#25D366; color:#000; font-weight:800; font-size:0.8rem; padding:8px 16px; border-radius:4px; text-decoration:none; text-transform:uppercase;">
              WhatsApp Chat
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
    `;

    // 4. Footer HTML Definition
    const footerHTML = `
  <footer class="footer-bar py-5" style="background:#030303; border-top:1px solid rgba(255,255,255,0.08);">
    <div class="container text-center">
      <div class="row text-start mb-4 g-4">
        <div class="col-md-4">
          <div style="font-weight:900; font-size:1.2rem; color:#fff; margin-bottom:12px;">👑 GALICON <span style="color:#EAB308;">GLOBAL</span></div>
          <p style="font-size:0.85rem; color:#888; line-height:1.6;">
            Founded by Ismail Kazia. Premier end-to-end corporate event production in Bangalore & Pan-India. High-conversion digital growth acquisition across UAE and Saudi Arabia.
          </p>
        </div>
        <div class="col-md-4">
          <div style="font-weight:800; font-size:0.9rem; color:#EAB308; text-transform:uppercase; letter-spacing:1px; margin-bottom:12px;">Executive Guides & SEO</div>
          <ul style="list-style:none; padding:0; font-size:0.85rem; line-height:2;">
            <li><a href="${prefix}blog/bangalore-corporate-event-management-guide-2026.html" style="color:#aaa; text-decoration:none;">🇮🇳 Bangalore Corporate Events Guide 2026</a></li>
            <li><a href="${prefix}blog/dubai-luxury-real-estate-performance-marketing.html" style="color:#aaa; text-decoration:none;">🇦🇪 Dubai Luxury Real Estate Marketing</a></li>
            <li><a href="${prefix}blog/saudi-arabia-vision-2030-business-events.html" style="color:#aaa; text-decoration:none;">🇸🇦 Saudi Vision 2030 Summit Production</a></li>
          </ul>
        </div>
        <div class="col-md-4">
          <div style="font-weight:800; font-size:0.9rem; color:#EAB308; text-transform:uppercase; letter-spacing:1px; margin-bottom:12px;">Direct Portals</div>
          <ul style="list-style:none; padding:0; font-size:0.85rem; line-height:2;">
            <li><a href="${prefix}products.html" style="color:#aaa; text-decoration:none;">🛍️ Digital Products & Templates Store</a></li>
            <li><a href="${prefix}card.html" style="color:#aaa; text-decoration:none;">💳 Ismail Kazia Digital Business Card</a></li>
            <li><a href="${prefix}proposal_template.html" style="color:#aaa; text-decoration:none;">📑 Corporate Proposal Lookbook</a></li>
            <li><a href="${prefix}calculator.html" style="color:#aaa; text-decoration:none;">🧮 Interactive Event Budget Calculator</a></li>
            <li><a href="${prefix}meet.html" style="color:#aaa; text-decoration:none;">🎥 Schedule Strategy Meeting</a></li>
          </ul>
        </div>
      </div>
      <hr style="border-color:rgba(255,255,255,0.06); margin:20px 0;">
      <p class="m-0" style="font-size:0.85rem; color:#666;">&copy; 2026 GALICON GLOBAL. All rights reserved. • Founded by Ismail Kazia</p>
    </div>
  </footer>
    `;

    // 5. Inject Navbar
    if (navPlaceholder) {
      navPlaceholder.innerHTML = navHTML;
    }

    // 6. Inject Footer
    if (footerPlaceholder) {
      footerPlaceholder.innerHTML = footerHTML;
    }
  });
})();
