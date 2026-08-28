/**
 * GALICON GLOBAL — Unified Navbar Component
 * Automatically resolves path depths for root, subdirectories, services, and blogs.
 */
(function() {
  document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;
    const isSubdir = path.includes('/services/') || path.includes('/blog/') || path.includes('/start/') || path.includes('/grow/') || path.includes('/technology/') || path.includes('/events/');
    const prefix = isSubdir ? '../' : '';

    const navPlaceholder = document.getElementById('navbar-placeholder');
    if (!navPlaceholder) return;

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
          <li class="nav-item"><a class="nav-link" href="${prefix}index.html">HOME</a></li>
          <li class="nav-item"><a class="nav-link" href="${prefix}start/index.html">START</a></li>
          <li class="nav-item"><a class="nav-link" href="${prefix}grow/index.html">GROW</a></li>
          <li class="nav-item"><a class="nav-link" href="${prefix}technology/index.html">TECHNOLOGY</a></li>
          <li class="nav-item"><a class="nav-link" href="${prefix}events/index.html">EVENTS</a></li>
          <li class="nav-item"><a class="nav-link" href="${prefix}products.html" style="color:#FFF200 !important;"><i class="fas fa-shopping-bag me-1"></i>STORE</a></li>
          <li class="nav-item"><a class="nav-link" href="${prefix}calculator.html"><i class="fas fa-calculator me-1"></i>ESTIMATOR</a></li>
          <li class="nav-item"><a class="nav-link" href="${prefix}meet.html" style="color:#10B981 !important;"><i class="fas fa-video me-1"></i>BOOK A CALL</a></li>
          <li class="nav-item ms-lg-3">
            <a href="https://wa.me/966548905688?text=Hello%20Ismail%20Kazia%20%7C%20GALICON!%20I%20would%20like%20to%20discuss%20a%20priority%20project." target="_blank" style="background:#25D366; color:#000; font-weight:800; font-size:0.8rem; padding:8px 16px; border-radius:4px; text-decoration:none; text-transform:uppercase;">
              WhatsApp Chat
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
