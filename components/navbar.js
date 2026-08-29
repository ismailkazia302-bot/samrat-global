/**
 * GALICON GLOBAL — Master Unified Navbar Component
 * Automatically resolves path depths for root, subdirectories, services, and blogs.
 * Active Divisions: BUSINESS, GROWTH, TECHNOLOGY, EXPERIENCES, AUDIT
 * Includes Direct Global Toggle Function with Inline Override & Fluid Logo Scaling for Mobile Devices
 */
(function() {
  // Global Toggle Function accessible everywhere
  window.galiconToggleNav = function(e) {
    if (e) {
      if (typeof e.preventDefault === 'function') e.preventDefault();
      if (typeof e.stopPropagation === 'function') e.stopPropagation();
    }
    const menu = document.getElementById('navbarNav');
    const toggler = document.getElementById('galiconNavToggler');
    if (!menu) return;

    const isCurrentlyVisible = window.getComputedStyle(menu).display !== 'none' && menu.classList.contains('show');

    if (isCurrentlyVisible) {
      menu.style.setProperty('display', 'none', 'important');
      menu.classList.remove('show', 'open');
      if (toggler) toggler.setAttribute('aria-expanded', 'false');
    } else {
      menu.style.setProperty('display', 'block', 'important');
      menu.classList.add('show', 'open');
      if (toggler) toggler.setAttribute('aria-expanded', 'true');
    }
  };

  window.galiconCloseNav = function() {
    const menu = document.getElementById('navbarNav');
    const toggler = document.getElementById('galiconNavToggler');
    if (!menu) return;
    if (window.innerWidth < 992) {
      menu.style.setProperty('display', 'none', 'important');
      menu.classList.remove('show', 'open');
      if (toggler) toggler.setAttribute('aria-expanded', 'false');
    }
  };

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
        /* Universal Viewport & Image Safety */
        html, body {
          overflow-x: hidden !important;
          max-width: 100% !important;
        }
        img, video, iframe {
          max-width: 100%;
        }

        .nav-alsayegh {
          background: #020617 !important;
          border-bottom: 1px solid rgba(255,255,255,0.08) !important;
          padding: 12px 0 !important;
          position: sticky !important;
          top: 0 !important;
          z-index: 99999 !important;
        }
        .nav-brand-wrap {
          text-decoration: none !important;
          display: flex !important;
          align-items: center !important;
          gap: 10px !important;
        }
        .nav-brand-logo {
          height: 48px !important;
          width: auto !important;
          object-fit: contain !important;
          flex-shrink: 0 !important;
        }
        .nav-brand-title {
          font-family: 'Plus Jakarta Sans', sans-serif !important;
          font-weight: 900 !important;
          font-size: 1.3rem !important;
          letter-spacing: 1.5px !important;
          color: #FFFFFF !important;
          line-height: 1 !important;
          display: flex !important;
          flex-direction: column !important;
          text-transform: uppercase !important;
        }
        .nav-brand-subtitle {
          font-size: 0.72rem !important;
          letter-spacing: 3px !important;
          font-weight: 800 !important;
          color: #818CF8 !important;
          margin-top: 2px !important;
        }
        .navbar-toggler {
          border: 2px solid #818CF8 !important;
          padding: 8px 12px !important;
          border-radius: 10px !important;
          background: rgba(99,102,241,0.2) !important;
          cursor: pointer !important;
          outline: none !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
        }
        .navbar-toggler:focus, .navbar-toggler:active {
          box-shadow: 0 0 15px rgba(99,102,241,0.8) !important;
          border-color: #38BDF8 !important;
        }
        .navbar-toggler-icon {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(255, 255, 255, 1)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2.6' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e") !important;
          width: 22px !important;
          height: 22px !important;
          display: inline-block !important;
        }
        @media (max-width: 991px) {
          #navbarNav {
            display: none;
            background: #0B1120 !important;
            border: 2px solid rgba(99,102,241,0.4) !important;
            border-radius: 14px !important;
            padding: 20px !important;
            margin-top: 14px !important;
            box-shadow: 0 25px 60px rgba(0,0,0,0.98), 0 0 25px rgba(99,102,241,0.25) !important;
            position: relative !important;
            z-index: 999999 !important;
          }
          #navbarNav.show, #navbarNav.open {
            display: block !important;
            animation: fadeInNav 0.2s ease-out;
          }
          #navbarNav .navbar-nav {
            gap: 2px !important;
            display: flex !important;
            flex-direction: column !important;
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
            font-size: 1rem !important;
            padding: 6px 0 !important;
            display: block !important;
            color: #F8FAFC !important;
            font-weight: 700 !important;
          }
          #navbarNav .nav-link:hover {
            color: #38BDF8 !important;
          }
          #navbarNav .btn {
            width: 100% !important;
            text-align: center !important;
            display: block !important;
            padding: 12px !important;
            font-size: 0.95rem !important;
          }
        }
        @media (max-width: 480px) {
          .nav-brand-logo {
            height: 38px !important;
          }
          .nav-brand-title {
            font-size: 1.05rem !important;
            letter-spacing: 1px !important;
          }
          .nav-brand-subtitle {
            font-size: 0.62rem !important;
            letter-spacing: 2px !important;
          }
          .navbar-toggler {
            padding: 6px 10px !important;
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
    <div class="container-fluid px-3 px-lg-5">
      <a href="${prefix}index.html" class="nav-brand-wrap">
        <img src="${prefix}galicon_logo.png" alt="GALICON GLOBAL" class="nav-brand-logo">
        <span class="nav-brand-title">
          GALICON
          <span class="nav-brand-subtitle">GLOBAL GROUP</span>
        </span>
      </a>

      <!-- Direct Inline Mobile Toggler Trigger -->
      <button class="navbar-toggler" type="button" id="galiconNavToggler" onclick="window.galiconToggleNav(event)" ontouchend="window.galiconToggleNav(event)" aria-label="Toggle navigation" aria-expanded="false">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto align-items-center" style="font-family:'Plus Jakarta Sans', sans-serif; font-size:0.82rem; font-weight:700; letter-spacing:0.8px;">
          <li class="nav-item"><a class="nav-link" href="${prefix}index.html" onclick="window.galiconCloseNav()">HOME</a></li>
          <li class="nav-item"><a class="nav-link" href="${prefix}business/index.html" onclick="window.galiconCloseNav()">BUSINESS</a></li>
          <li class="nav-item"><a class="nav-link" href="${prefix}growth/index.html" onclick="window.galiconCloseNav()">GROWTH</a></li>
          <li class="nav-item"><a class="nav-link" href="${prefix}technology/index.html" onclick="window.galiconCloseNav()">TECHNOLOGY</a></li>
          <li class="nav-item"><a class="nav-link" href="${prefix}experiences/index.html" onclick="window.galiconCloseNav()">EXPERIENCES</a></li>
          <li class="nav-item"><a class="nav-link" href="${prefix}audit/index.html" onclick="window.galiconCloseNav()" style="color:#38BDF8 !important;"><i class="fas fa-bolt me-1" style="color:#38BDF8;"></i>FREE AUDIT</a></li>
          <li class="nav-item"><a class="nav-link" href="${prefix}calculator.html" onclick="window.galiconCloseNav()"><i class="fas fa-calculator me-1" style="color:#818CF8;"></i>ESTIMATOR</a></li>
          <li class="nav-item"><a class="nav-link" href="${prefix}products.html" onclick="window.galiconCloseNav()" style="color:#A5B4FC !important;"><i class="fas fa-shopping-bag me-1"></i>STORE</a></li>
          <li class="nav-item ms-lg-2">
            <a class="btn btn-sm fw-bold px-3 py-2 text-white" href="${prefix}meet.html" onclick="window.galiconCloseNav()" style="background:linear-gradient(135deg, #818CF8 0%, #3B82F6 50%, #06B6D4 100%); border-radius:6px; letter-spacing:0.5px; box-shadow:0 4px 15px rgba(99,102,241,0.35); border:none;">
              <i class="fas fa-calendar-check me-1"></i>FIND MY SOLUTION
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
    `;
    navPlaceholder.innerHTML = navHTML;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavbar);
  } else {
    initNavbar();
  }
})();
