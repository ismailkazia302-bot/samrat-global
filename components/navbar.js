/**
 * GALICON GLOBAL — Master Unified Navbar Component
 * Automatically resolves path depths for root, subdirectories, services, and blogs.
 * Active Divisions: BUSINESS, GROWTH, TECHNOLOGY, EXPERIENCES, AUDIT
 * Includes Pure Vanilla JS Mobile Toggler (100% Reliable on all mobile devices)
 */
(function() {
  function initNavbar() {
    const path = window.location.pathname;
    const isSubdir = path.includes('/services/') || path.includes('/blog/') || 
                     path.includes('/start/') || path.includes('/grow/') || 
                     path.includes('/technology/') || path.includes('/events/') ||
                     path.includes('/business/') || path.includes('/growth/') || 
                     path.includes('/experiences/') || path.includes('/audit/');
    const prefix = isSubdir ? '../' : '';

    const navPlaceholder = document.getElementById('navbar-placeholder');
    if (!navPlaceholder) return;

    // Inject Responsive Navbar CSS
    if (!document.getElementById('galicon-nav-style')) {
      const style = document.createElement('style');
      style.id = 'galicon-nav-style';
      style.textContent = `
        .nav-alsayegh {
          background: #020617 !important;
          border-bottom: 1px solid rgba(255,255,255,0.08) !important;
          padding: 12px 0 !important;
          position: sticky !important;
          top: 0 !important;
          z-index: 1050 !important;
        }
        .navbar-toggler {
          border: 1px solid rgba(99,102,241,0.5) !important;
          padding: 6px 12px !important;
          border-radius: 8px !important;
          background: rgba(99,102,241,0.12) !important;
          cursor: pointer !important;
          outline: none !important;
        }
        .navbar-toggler:focus {
          box-shadow: 0 0 12px rgba(99,102,241,0.6) !important;
        }
        .navbar-toggler-icon {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(255, 255, 255, 0.95)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2.2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e") !important;
          width: 24px !important;
          height: 24px !important;
        }
        @media (max-width: 991px) {
          #navbarNav {
            display: none;
            background: #0B1120;
            border: 1px solid rgba(99,102,241,0.3);
            border-radius: 14px;
            padding: 18px 20px;
            margin-top: 14px;
            box-shadow: 0 20px 50px rgba(0,0,0,0.95), 0 0 20px rgba(99,102,241,0.15);
          }
          #navbarNav.show, #navbarNav.open {
            display: block !important;
            animation: fadeInNav 0.2s ease-out;
          }
          #navbarNav .navbar-nav {
            gap: 4px !important;
          }
          #navbarNav .nav-item {
            width: 100% !important;
            padding: 8px 0 !important;
            border-bottom: 1px solid rgba(255,255,255,0.06) !important;
          }
          #navbarNav .nav-item:last-child {
            border-bottom: none !important;
            padding-top: 14px !important;
          }
          #navbarNav .nav-link {
            font-size: 0.95rem !important;
            padding: 4px 0 !important;
            display: block !important;
            color: #E2E8F0 !important;
          }
          #navbarNav .nav-link:hover {
            color: #38BDF8 !important;
          }
          #navbarNav .btn {
            width: 100% !important;
            text-align: center !important;
            display: block !important;
            padding: 10px !important;
          }
        }
        @keyframes fadeInNav {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `;
      document.head.appendChild(style);
    }

    const navHTML = `
  <nav class="navbar navbar-expand-lg navbar-dark nav-alsayegh">
    <div class="container-fluid px-lg-5">
      <a href="${prefix}index.html" style="text-decoration:none; display:flex; align-items:center; gap:10px;">
        <img src="${prefix}galicon_logo.png" alt="GALICON GLOBAL" style="height:48px; width:auto; object-fit:contain;">
        <span style="font-family:'Plus Jakarta Sans', sans-serif; font-weight:900; font-size:1.3rem; letter-spacing:1.5px; color:#FFFFFF; line-height:1; display:flex; flex-direction:column; text-transform:uppercase;">
          GALICON
          <span style="font-size:0.72rem; letter-spacing:3px; font-weight:800; color:#818CF8; margin-top:2px;">GLOBAL GROUP</span>
        </span>
      </a>

      <button class="navbar-toggler" type="button" id="galiconNavToggler" aria-label="Toggle navigation" aria-expanded="false">
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

    // Pure Vanilla JS Mobile Toggle Handler (100% Reliable without external Bootstrap JS)
    const toggler = document.getElementById('galiconNavToggler');
    const menu = document.getElementById('navbarNav');

    if (toggler && menu) {
      toggler.addEventListener('click', function(e) {
        e.stopPropagation();
        const isOpen = menu.classList.contains('show') || menu.classList.contains('open');
        if (isOpen) {
          menu.classList.remove('show', 'open');
          toggler.setAttribute('aria-expanded', 'false');
        } else {
          menu.classList.add('show', 'open');
          toggler.setAttribute('aria-expanded', 'true');
        }
      });

      // Close menu when clicking outside
      document.addEventListener('click', function(e) {
        if (!navPlaceholder.contains(e.target)) {
          menu.classList.remove('show', 'open');
          toggler.setAttribute('aria-expanded', 'false');
        }
      });

      // Close menu when clicking any nav-link on mobile
      menu.querySelectorAll('.nav-link, .btn').forEach(link => {
        link.addEventListener('click', function() {
          if (window.innerWidth < 992) {
            menu.classList.remove('show', 'open');
            toggler.setAttribute('aria-expanded', 'false');
          }
        });
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavbar);
  } else {
    initNavbar();
  }
})();
