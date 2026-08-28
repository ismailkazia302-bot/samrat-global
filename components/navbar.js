/**
 * GALICON GLOBAL — Master Unified Navbar Component
 * Automatically resolves path depths for root, subdirectories, services, and blogs.
 * Active Divisions: BUSINESS, GROWTH, TECHNOLOGY, EXPERIENCES, AUDIT
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

    const navPlaceholder = document.getElementById('navbar-placeholder');
    if (!navPlaceholder) return;

    const navHTML = `
  <nav class="navbar navbar-expand-lg navbar-dark nav-alsayegh" style="background:#020617; border-bottom:1px solid rgba(255,255,255,0.08); padding:14px 0;">
    <div class="container-fluid px-lg-5">
      <a href="${prefix}index.html" style="text-decoration:none; display:flex; align-items:center; gap:12px;">
        <img src="${prefix}galicon_logo.png" alt="GALICON GLOBAL" style="height:52px; width:auto; object-fit:contain;">
        <span style="font-family:'Plus Jakarta Sans', sans-serif; font-weight:900; font-size:1.35rem; letter-spacing:1.5px; color:#FFFFFF; line-height:1; display:flex; flex-direction:column; text-transform:uppercase;">
          GALICON
          <span style="font-size:0.75rem; letter-spacing:3px; font-weight:800; color:#818CF8; margin-top:2px;">GLOBAL GROUP</span>
        </span>
      </a>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto align-items-center" style="font-family:'Plus Jakarta Sans', sans-serif; font-size:0.82rem; font-weight:700; letter-spacing:0.8px;">
          <li class="nav-item"><a class="nav-link" href="${prefix}index.html">HOME</a></li>
          <li class="nav-item"><a class="nav-link" href="${prefix}business/index.html">BUSINESS</a></li>
          <li class="nav-item"><a class="nav-link" href="${prefix}growth/index.html">GROWTH</a></li>
          <li class="nav-item"><a class="nav-link" href="${prefix}technology/index.html">TECHNOLOGY</a></li>
          <li class="nav-item"><a class="nav-link" href="${prefix}experiences/index.html">EXPERIENCES</a></li>
          <li class="nav-item"><a class="nav-link" href="${prefix}audit/index.html" style="color:#38BDF8 !important;"><i class="fas fa-bolt me-1" style="color:#38BDF8;"></i>FREE AUDIT</a></li>
          <li class="nav-item"><a class="nav-link" href="${prefix}calculator.html"><i class="fas fa-calculator me-1" style="color:#818CF8;"></i>ESTIMATOR</a></li>
          <li class="nav-item"><a class="nav-link" href="${prefix}products.html" style="color:#A5B4FC !important;"><i class="fas fa-shopping-bag me-1"></i>STORE</a></li>
          <li class="nav-item ms-lg-2">
            <a class="btn btn-sm fw-bold px-3 py-2 text-white" href="${prefix}meet.html" style="background:linear-gradient(135deg, #818CF8 0%, #3B82F6 50%, #06B6D4 100%); border-radius:6px; letter-spacing:0.5px; box-shadow:0 4px 15px rgba(99,102,241,0.35); border:none;">
              <i class="fas fa-calendar-check me-1"></i>FIND MY SOLUTION
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
    `;
    navPlaceholder.innerHTML = navHTML;
  });
})();
