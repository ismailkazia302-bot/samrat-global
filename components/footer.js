/**
 * GALICON GLOBAL — Unified Footer Component
 * Automatically resolves path depths for root, subdirectories, services, and blogs.
 */
(function() {
  document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;
    const isSubdir = path.includes('/services/') || path.includes('/blog/') || path.includes('/start/') || path.includes('/grow/') || path.includes('/technology/') || path.includes('/events/');
    const prefix = isSubdir ? '../' : '';

    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (!footerPlaceholder) return;

    const footerHTML = `
  <footer class="footer-bar py-5" style="background:#030303; border-top:1px solid rgba(255,255,255,0.08);">
    <div class="container text-center">
      <div class="row text-start mb-4 g-4">
        <div class="col-md-4">
          <div style="font-weight:900; font-size:1.2rem; color:#fff; margin-bottom:12px;">👑 GALICON <span style="color:#EAB308;">GLOBAL</span></div>
          <p style="font-size:0.85rem; color:#888; line-height:1.6;">
            Founded by Ismail Kazia. A Global Business Group serving India, UAE, Saudi Arabia, and worldwide enterprise markets.
          </p>
        </div>
        <div class="col-md-4">
          <div style="font-weight:800; font-size:0.9rem; color:#EAB308; text-transform:uppercase; letter-spacing:1px; margin-bottom:12px;">Strategic Divisions</div>
          <ul style="list-style:none; padding:0; font-size:0.85rem; line-height:2;">
            <li><a href="${prefix}start/index.html" style="color:#aaa; text-decoration:none;">🚀 Business & Consulting (/start/)</a></li>
            <li><a href="${prefix}grow/index.html" style="color:#aaa; text-decoration:none;">📈 Marketing & Growth (/grow/)</a></li>
            <li><a href="${prefix}technology/index.html" style="color:#aaa; text-decoration:none;">🖥️ Technology & AI (/technology/)</a></li>
            <li><a href="${prefix}events/index.html" style="color:#aaa; text-decoration:none;">🎪 Experiences & Productions (/events/)</a></li>
          </ul>
        </div>
        <div class="col-md-4">
          <div style="font-weight:800; font-size:0.9rem; color:#EAB308; text-transform:uppercase; letter-spacing:1px; margin-bottom:12px;">Useful Links</div>
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
      <p class="m-0" style="font-size:0.85rem; color:#94a3b8;">&copy; 2026 GALICON GLOBAL. All rights reserved. • Founded by Ismail Kazia</p>
    </div>
  </footer>
    `;
    footerPlaceholder.innerHTML = footerHTML;
  });
})();
