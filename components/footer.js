/**
 * GALICON GLOBAL — Master Unified Footer Component (Stripe Design System)
 * Supports 4 Active Core Divisions + Senior Sales Desk + Real-time System Status
 */
(function() {
  document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;
    const isSubdir = path.includes('/services/') || path.includes('/blog/') || 
                     path.includes('/start/') || path.includes('/grow/') || 
                     path.includes('/technology/') || path.includes('/events/') ||
                     path.includes('/business/') || path.includes('/growth/') || 
                     path.includes('/experiences/') || path.includes('/audit/');
    const prefix = isSubdir ? '../' : '';

    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (!footerPlaceholder) return;

    const footerHTML = `
  <footer style="background:#03060F; border-top:1px solid rgba(255,255,255,0.08); padding:65px 0 35px; font-family:'Plus Jakarta Sans',sans-serif; color:#FFFFFF;">
    <div class="container-fluid px-3 px-lg-5">
      <div class="row g-4 mb-4">
        
        <!-- Brand & Global Presence -->
        <div class="col-lg-4 col-md-6">
          <div style="display:flex; align-items:center; gap:12px; margin-bottom:16px;">
            <img src="${prefix}galicon_logo.png" alt="GALICON GLOBAL" style="height:48px; width:auto; object-fit:contain; filter:drop-shadow(0 0 10px rgba(99,91,255,0.3));">
            <span style="font-weight:900; font-size:1.25rem; letter-spacing:1.5px; color:#FFFFFF; line-height:1;">
              GALICON <span style="background:linear-gradient(90deg, #635BFF, #00D4FF); -webkit-background-clip:text; -webkit-text-fill-color:transparent;">GLOBAL</span>
            </span>
          </div>
          <p style="color:#94A3B8; font-size:0.88rem; line-height:1.7; max-width:360px; margin-bottom:18px;">
            Global business growth conglomerate engineering outcome-driven management consulting, performance acquisition engines, intelligent technology systems, and 4K executive summits.
          </p>
          <div style="display:flex; align-items:center; gap:8px; font-size:0.8rem; color:#10B981; margin-bottom:14px;">
            <span style="width:8px; height:8px; border-radius:50%; background:#10B981; display:inline-block; box-shadow:0 0 10px #10B981;"></span>
            <span>All Enterprise Systems Operational &bull; 24/7 Global SLA</span>
          </div>
          <div style="font-size:0.82rem; color:#CBD5E1;">
            <div>🇮🇳 <strong>India Center:</strong> Bangalore, Karnataka &bull; Pan-India</div>
            <div>🌍 <strong>Global Desks:</strong> USA &bull; UK &bull; UAE / GCC &bull; Saudi Arabia</div>
          </div>
        </div>

        <!-- Core Divisions -->
        <div class="col-lg-2 col-md-6 col-6">
          <div style="font-weight:800; font-size:0.85rem; color:#00D4FF; text-transform:uppercase; letter-spacing:1.2px; margin-bottom:14px;">Core Divisions</div>
          <ul style="list-style:none; padding:0; font-size:0.84rem; line-height:2.3;">
            <li><a href="${prefix}business/index.html" style="color:#94A3B8; text-decoration:none; transition:color 0.2s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='#94A3B8'">🚀 GALICON BUSINESS</a></li>
            <li><a href="${prefix}growth/index.html" style="color:#94A3B8; text-decoration:none; transition:color 0.2s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='#94A3B8'">📈 GALICON GROWTH</a></li>
            <li><a href="${prefix}technology/index.html" style="color:#94A3B8; text-decoration:none; transition:color 0.2s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='#94A3B8'">🖥️ GALICON TECHNOLOGY</a></li>
            <li><a href="${prefix}experiences/index.html" style="color:#94A3B8; text-decoration:none; transition:color 0.2s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='#94A3B8'">🎪 GALICON EXPERIENCES</a></li>
          </ul>
        </div>

        <!-- Portals & Tools -->
        <div class="col-lg-3 col-md-6 col-6">
          <div style="font-weight:800; font-size:0.85rem; color:#635BFF; text-transform:uppercase; letter-spacing:1.2px; margin-bottom:14px;">Portals & Tools</div>
          <ul style="list-style:none; padding:0; font-size:0.84rem; line-height:2.3;">
            <li><a href="${prefix}audit/index.html" style="color:#94A3B8; text-decoration:none; transition:color 0.2s;" onmouseover="this.style.color='#00D4FF'" onmouseout="this.style.color='#94A3B8'">⚡ 60-Sec Growth Audit</a></li>
            <li><a href="${prefix}calculator.html" style="color:#94A3B8; text-decoration:none; transition:color 0.2s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='#94A3B8'">🧮 Project Scope Estimator</a></li>
            <li><a href="${prefix}meet.html" style="color:#94A3B8; text-decoration:none; transition:color 0.2s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='#94A3B8'">📅 Strategy Session Scheduler</a></li>
            <li><a href="${prefix}products.html" style="color:#94A3B8; text-decoration:none; transition:color 0.2s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='#94A3B8'">🛍️ AI Solutions & Store</a></li>
            <li><a href="${prefix}card.html" style="color:#94A3B8; text-decoration:none; transition:color 0.2s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='#94A3B8'">💳 Digital Executive Card</a></li>
          </ul>
        </div>

        <!-- Sales Desk & Governance -->
        <div class="col-lg-3 col-md-6">
          <div style="font-weight:800; font-size:0.85rem; color:#FF6B9E; text-transform:uppercase; letter-spacing:1.2px; margin-bottom:14px;">Senior Sales Desk</div>
          <div style="font-size:0.84rem; color:#94A3B8; line-height:1.9;">
            <div style="margin-bottom:10px; padding-bottom:10px; border-bottom:1px solid rgba(255,255,255,0.06);">
              <div style="color:#FFFFFF; font-weight:700;"><i class="fas fa-headset text-info me-1"></i> Sales Executive Officer:</div>
              <div style="color:#CBD5E1; font-weight:600;">Mr. Ayaan</div>
              <div><a href="tel:+917015844885" style="color:#38BDF8; text-decoration:none; font-weight:700;">📞 +91 70158 44885</a></div>
            </div>
            <div>
              <div style="color:#FFFFFF; font-weight:700;"><i class="fas fa-envelope text-warning me-1"></i> Corporate Communications:</div>
              <div><a href="mailto:Galicon@yahoo.com" style="color:#CBD5E1; text-decoration:none;">Galicon@yahoo.com</a></div>
              <div><a href="mailto:ismailkazia302@gmail.com" style="color:#94A3B8; text-decoration:none; font-size:0.78rem;">ismailkazia302@gmail.com</a></div>
            </div>
          </div>
        </div>

      </div>

      <!-- Bottom Bar -->
      <div class="d-flex justify-content-between align-items-center flex-wrap pt-4" style="border-top:1px solid rgba(255,255,255,0.08); font-size:0.8rem; color:#64748B;">
        <div>&copy; 2026 <strong>GALICON GLOBAL GROUP</strong>. All rights reserved. Enterprise Governance Led by Founder Ismail Kazia.</div>
        <div class="d-flex gap-3 mt-2 mt-sm-0">
          <span>Bangalore &bull; Dubai &bull; Riyadh</span>
          <span>100% SLA Guarantee</span>
        </div>
      </div>
    </div>
  </footer>
    `;
    footerPlaceholder.innerHTML = footerHTML;
  });
})();
