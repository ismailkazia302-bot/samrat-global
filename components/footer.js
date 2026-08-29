/**
 * GALICON GLOBAL — Master Unified Footer Component
 * Supports 4 Active Core Divisions + Future Expansion Architecture
 */
(function() {
  document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;
    const isSubdir = path.includes('/services/') || path.includes('/blog/') || 
                     path.includes('/start/') || path.includes('/grow/') || 
                     path.includes('/technology/') || path.includes('/events/') ||
                     path.includes('/business/') || path.includes('/growth/') || 
                     path.includes('/experiences/');
    const prefix = isSubdir ? '../' : '';

    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (!footerPlaceholder) return;

    const footerHTML = `
  <footer style="background:#050505; border-top:1px solid rgba(255,255,255,0.08); padding:50px 0 30px; font-family:'Poppins',sans-serif; color:#FFFFFF;">
    <div class="container-fluid px-lg-5">
      <div class="row g-4">
        <div class="col-lg-4 col-md-6">
          <div style="display:flex; align-items:center; gap:12px; margin-bottom:14px;">
            <img src="${prefix}galicon_logo.png" alt="GALICON GLOBAL" style="height:50px; width:auto; object-fit:contain;">
            <span style="font-weight:900; font-size:1.2rem; letter-spacing:2px; color:#FFFFFF; line-height:1;">
              GALICON <span style="color:#EAB308;">GLOBAL</span>
            </span>
          </div>
          <p style="color:#94a3b8; font-size:0.85rem; line-height:1.7; max-width:360px;">
            Global business growth group delivering outcome-driven consulting, measurable growth engines, intelligent technology systems, and executive experiences.
          </p>
          <div style="font-size:0.8rem; color:#cbd5e1; margin-top:12px;">
            <div>🇮🇳 <strong>India HQ:</strong> Bangalore & Pan-India</div>
            <div>🌍 <strong>Global Markets:</strong> USA • UK • UAE/GCC • Europe</div>
          </div>
        </div>
        <div class="col-lg-2 col-md-6 col-6">
          <div style="font-weight:800; font-size:0.85rem; color:#EAB308; text-transform:uppercase; letter-spacing:1px; margin-bottom:12px;">Core Divisions</div>
          <ul style="list-style:none; padding:0; font-size:0.82rem; line-height:2.2;">
            <li><a href="${prefix}business/index.html" style="color:#aaa; text-decoration:none;">🚀 GALICON BUSINESS</a></li>
            <li><a href="${prefix}growth/index.html" style="color:#aaa; text-decoration:none;">📈 GALICON GROWTH</a></li>
            <li><a href="${prefix}technology/index.html" style="color:#aaa; text-decoration:none;">🖥️ GALICON TECHNOLOGY</a></li>
            <li><a href="${prefix}experiences/index.html" style="color:#aaa; text-decoration:none;">🎪 GALICON EXPERIENCES</a></li>
          </ul>
        </div>
        <div class="col-lg-3 col-md-6 col-6">
          <div style="font-weight:800; font-size:0.85rem; color:#EAB308; text-transform:uppercase; letter-spacing:1px; margin-bottom:12px;">Tools & Portals</div>
          <ul style="list-style:none; padding:0; font-size:0.82rem; line-height:2.2;">
            <li><a href="${prefix}calculator.html" style="color:#aaa; text-decoration:none;">🧮 Project Scope & Retainer Estimator</a></li>
            <li><a href="${prefix}meet.html" style="color:#aaa; text-decoration:none;">📅 Gated Strategy Discovery Scheduler</a></li>
            <li><a href="${prefix}products.html" style="color:#aaa; text-decoration:none;">🛍️ Solutions & Template Store</a></li>
            <li><a href="${prefix}proposal_template.html" style="color:#aaa; text-decoration:none;">📑 Corporate Staging Lookbook</a></li>
            <li><a href="${prefix}card.html" style="color:#aaa; text-decoration:none;">💳 Ismail Kazia Executive Card</a></li>
          </ul>
        </div>
        <div class="col-lg-3 col-md-6">
          <div style="font-weight:800; font-size:0.85rem; color:#818CF8; text-transform:uppercase; letter-spacing:1px; margin-bottom:12px;">Sales & Executive Contact</div>
          <div style="font-size:0.82rem; color:#94a3b8; line-height:1.8;">
            <div style="margin-bottom:8px; padding-bottom:8px; border-bottom:1px solid rgba(255,255,255,0.06);">
              <div style="color:#FFFFFF; font-weight:700;"><i class="fas fa-headset text-info me-1"></i> Sales Executive Officer:</div>
              <div style="color:#38BDF8; font-weight:800; font-size:0.95rem;">Mr. Ayaan</div>
              <div>Direct Phone / Sales: <a href="tel:+917015844885" style="color:#FFFFFF; text-decoration:none; font-weight:700;">+91 70158 44885</a></div>
            </div>
            <div>Founder & CEO: <strong>Ismail Kazia</strong></div>
            <div>Direct Desk: <span style="color:#fff;">+91 63639 62640 / +966 54 890 5688</span></div>
            <div>Corporate Email: <a href="mailto:Galicon@yahoo.com" style="color:#38bdf8; font-weight:700; text-decoration:none;">Galicon@yahoo.com</a></div>
            <div style="font-size:0.75rem; color:#64748b;">Direct Founder Desk: <a href="mailto:ismailkazia302@gmail.com" style="color:#94a3b8; text-decoration:none;">ismailkazia302@gmail.com</a></div>
          </div>
        </div>
      </div>
      <hr style="border-color:rgba(255,255,255,0.08); margin:30px 0 20px;">
      <div class="d-flex justify-content-between align-items-center flex-wrap gap-2">
        <p class="m-0" style="font-size:0.82rem; color:#94a3b8;">&copy; 2026 GALICON GLOBAL GROUP. All rights reserved. • Founded by Ismail Kazia</p>
        <p class="m-0" style="font-size:0.75rem; color:#64748b;">Outcomes over Hours • 8-Stage Business Lifecycle Architecture</p>
      </div>
    </div>
  </footer>
    `;
    footerPlaceholder.innerHTML = footerHTML;
  });
})();
