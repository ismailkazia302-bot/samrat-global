/**
 * GALICON GLOBAL — Master Unified Navbar Component (Stripe.com Design System)
 * Automatically resolves path depths for root, subdirectories, services, and blogs.
 * Active Divisions: BUSINESS, GROWTH, TECHNOLOGY, EXPERIENCES, AUDIT
 * Powered by Pure Vanilla JS & Stripe Translucent Frosted Glass Architecture
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

    // Inject Master Stripe Design System CSS
    if (!document.getElementById('galicon-nav-style')) {
      const style = document.createElement('style');
      style.id = 'galicon-nav-style';
      style.textContent = `
        :root {
          --stripe-blurple: #635BFF;
          --stripe-cyan: #00D4FF;
          --stripe-pink: #FF6B9E;
          --stripe-emerald: #00D924;
          --stripe-amber: #FCD34D;
          --stripe-dark: #0A2540;
          --stripe-canvas: #060A14;
          --stripe-card: #0B132B;
          --stripe-border: rgba(255, 255, 255, 0.1);
          --stripe-gradient: linear-gradient(135deg, #635BFF 0%, #00D4FF 100%);
          --stripe-mesh: radial-gradient(at 0% 0%, rgba(99, 91, 255, 0.35) 0px, transparent 50%),
                         radial-gradient(at 100% 0%, rgba(0, 212, 255, 0.28) 0px, transparent 50%),
                         radial-gradient(at 50% 100%, rgba(255, 107, 158, 0.2) 0px, transparent 50%);
        }

        /* Universal Viewport & Stripe Element Safety */
        html, body {
          overflow-x: hidden !important;
          max-width: 100% !important;
          background-color: var(--stripe-canvas) !important;
        }
        *, *::before, *::after {
          box-sizing: border-box !important;
        }
        img, video, iframe {
          max-width: 100%;
          height: auto;
        }

        /* Floating Translucent Frosted Glass Navbar */
        .nav-alsayegh {
          background: rgba(6, 10, 20, 0.82) !important;
          backdrop-filter: blur(20px) saturate(180%) !important;
          -webkit-backdrop-filter: blur(20px) saturate(180%) !important;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
          padding: 14px 0 !important;
          position: sticky !important;
          top: 0 !important;
          z-index: 99999 !important;
          transition: all 0.3s ease;
        }
        .nav-brand-wrap {
          text-decoration: none !important;
          display: flex !important;
          align-items: center !important;
          gap: 12px !important;
        }
        .nav-brand-logo {
          height: 46px !important;
          width: auto !important;
          object-fit: contain !important;
          filter: drop-shadow(0 0 12px rgba(99, 91, 255, 0.4));
          transition: transform 0.25s ease;
        }
        .nav-brand-wrap:hover .nav-brand-logo {
          transform: scale(1.04);
        }
        .nav-brand-title {
          font-family: 'Plus Jakarta Sans', sans-serif !important;
          font-weight: 900 !important;
          font-size: 1.28rem !important;
          letter-spacing: 1.5px !important;
          color: #FFFFFF !important;
          line-height: 1 !important;
          display: flex !important;
          flex-direction: column !important;
          text-transform: uppercase !important;
        }
        .nav-brand-subtitle {
          font-size: 0.7rem !important;
          letter-spacing: 3px !important;
          font-weight: 800 !important;
          background: linear-gradient(90deg, #635BFF, #00D4FF);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-top: 2px !important;
        }
        
        .navbar-nav .nav-link {
          color: #94A3B8 !important;
          font-family: 'Plus Jakarta Sans', sans-serif !important;
          font-weight: 700 !important;
          font-size: 0.82rem !important;
          letter-spacing: 0.8px !important;
          padding: 6px 14px !important;
          transition: all 0.2s ease !important;
          position: relative;
        }
        .navbar-nav .nav-link:hover {
          color: #FFFFFF !important;
          transform: translateY(-1px);
        }

        .stripe-btn-cta {
          background: linear-gradient(135deg, #635BFF 0%, #00D4FF 100%) !important;
          color: #FFFFFF !important;
          font-family: 'Plus Jakarta Sans', sans-serif !important;
          font-weight: 800 !important;
          font-size: 0.82rem !important;
          letter-spacing: 0.6px !important;
          padding: 9px 20px !important;
          border-radius: 30px !important;
          border: none !important;
          box-shadow: 0 4px 20px rgba(99, 91, 255, 0.45) !important;
          transition: all 0.25s ease !important;
          text-decoration: none !important;
          display: inline-flex !important;
          align-items: center !important;
          gap: 6px !important;
        }
        .stripe-btn-cta:hover {
          transform: translateY(-2px) !important;
          box-shadow: 0 8px 30px rgba(0, 212, 255, 0.6) !important;
          color: #FFFFFF !important;
        }

        .navbar-toggler {
          border: 1px solid rgba(99, 91, 255, 0.5) !important;
          padding: 8px 12px !important;
          border-radius: 10px !important;
          background: rgba(99, 91, 255, 0.15) !important;
          cursor: pointer !important;
          outline: none !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
        }
        .navbar-toggler:focus, .navbar-toggler:active {
          box-shadow: 0 0 15px rgba(99, 91, 255, 0.8) !important;
          border-color: #00D4FF !important;
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
            background: #080D1A !important;
            border: 1px solid rgba(99, 91, 255, 0.35) !important;
            border-radius: 16px !important;
            padding: 22px 20px !important;
            margin-top: 14px !important;
            box-shadow: 0 25px 60px rgba(0,0,0,0.98), 0 0 30px rgba(99, 91, 255, 0.25) !important;
            position: relative !important;
            z-index: 999999 !important;
          }
          #navbarNav.show, #navbarNav.open {
            display: block !important;
            animation: fadeInNav 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          }
          #navbarNav .navbar-nav {
            gap: 4px !important;
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
            color: #00D4FF !important;
          }
          #navbarNav .stripe-btn-cta {
            width: 100% !important;
            text-align: center !important;
            justify-content: center !important;
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
          from { opacity: 0; transform: translateY(-10px); }
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
        <ul class="navbar-nav ms-auto align-items-center">
          <li class="nav-item"><a class="nav-link" href="${prefix}index.html" onclick="window.galiconCloseNav()">HOME</a></li>
          <li class="nav-item"><a class="nav-link" href="${prefix}business/index.html" onclick="window.galiconCloseNav()">BUSINESS</a></li>
          <li class="nav-item"><a class="nav-link" href="${prefix}growth/index.html" onclick="window.galiconCloseNav()">GROWTH</a></li>
          <li class="nav-item"><a class="nav-link" href="${prefix}technology/index.html" onclick="window.galiconCloseNav()">TECHNOLOGY</a></li>
          <li class="nav-item"><a class="nav-link" href="${prefix}experiences/index.html" onclick="window.galiconCloseNav()">EXPERIENCES</a></li>
          <li class="nav-item"><a class="nav-link" href="${prefix}audit/index.html" onclick="window.galiconCloseNav()" style="color:#00D4FF !important;"><i class="fas fa-bolt me-1" style="color:#00D4FF;"></i>FREE AUDIT</a></li>
          <li class="nav-item"><a class="nav-link" href="${prefix}calculator.html" onclick="window.galiconCloseNav()"><i class="fas fa-calculator me-1" style="color:#635BFF;"></i>ESTIMATOR</a></li>
          <li class="nav-item"><a class="nav-link" href="${prefix}products.html" onclick="window.galiconCloseNav()" style="color:#FF6B9E !important;"><i class="fas fa-shopping-bag me-1"></i>STORE</a></li>
          <li class="nav-item ms-lg-3">
            <a class="stripe-btn-cta" href="${prefix}meet.html" onclick="window.galiconCloseNav()">
              <i class="fas fa-calendar-check"></i> FIND MY SOLUTION ➔
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
