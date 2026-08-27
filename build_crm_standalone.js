const fs = require('fs');
const path = require('path');

const leads = JSON.parse(fs.readFileSync(path.join(__dirname, 'leads_database.json'), 'utf8'));

const template = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>GELICON WORLDWIDE — B2B CRM Pipeline</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" rel="stylesheet">
  <script>
    (function() {
      const pin = sessionStorage.getItem('samrat_crm_auth');
      if (pin !== '2030') {
        const entered = prompt('🔒 GELICON EXECUTIVE CRM — Enter Founder Security PIN:');
        if (entered === '2030') {
          sessionStorage.setItem('samrat_crm_auth', '2030');
        } else {
          alert('⛔ Access Denied: Authorized Founder Access Only.');
          window.location.href = 'index.html';
        }
      }
    })();
  </script>
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body { font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif; background:#050505; color:#ffffff; min-height:100vh; }
    .crm-header { padding:18px 28px; background:#0a0a0a; border-bottom:1px solid rgba(255,255,255,0.08); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px; position:sticky; top:0; z-index:100; }
    .brand-title { font-size:1.3rem; font-weight:900; letter-spacing:2px; color:#fff; text-decoration:none; display:flex; align-items:center; gap:8px; }
    .brand-title span { color:#EAB308; }
    .nav-bar-links { display:flex; gap:18px; }
    .nav-bar-links a { color:#888; text-decoration:none; font-size:0.85rem; font-weight:700; transition:color 0.2s; }
    .nav-bar-links a:hover { color:#fff; }
    .search-input { background:#141414; border:1px solid rgba(255,255,255,0.15); border-radius:8px; padding:8px 16px; color:#fff; font-size:0.9rem; width:320px; outline:none; }
    .search-input:focus { border-color:#EAB308; }
    .stats-section { display:flex; gap:14px; padding:20px 28px; flex-wrap:wrap; }
    .stat-box { background:#0d0d0d; border:1px solid rgba(255,255,255,0.08); border-radius:12px; padding:16px 20px; flex:1; min-width:140px; text-align:center; }
    .stat-number { font-size:2rem; font-weight:900; }
    .stat-label { font-size:0.75rem; color:#888; text-transform:uppercase; font-weight:700; letter-spacing:1px; margin-top:4px; }
    .filter-wrapper { padding:10px 28px; display:flex; flex-direction:column; gap:10px; }
    .filter-group { display:flex; gap:8px; flex-wrap:wrap; }
    .filter-chip { background:#111; border:1px solid rgba(255,255,255,0.15); color:#999; padding:6px 16px; border-radius:20px; font-size:0.8rem; font-weight:700; cursor:pointer; transition:all 0.2s; }
    .filter-chip:hover, .filter-chip.active { background:#EAB308; color:#000; border-color:#EAB308; }
    .filter-chip-region.active { background:#3B82F6; color:#fff; border-color:#3B82F6; }
    .cards-container { padding:14px 28px 60px; display:grid; grid-template-columns:repeat(auto-fill,minmax(330px,1fr)); gap:16px; }
    .crm-card { background:#0d0d0d; border:1px solid rgba(255,255,255,0.08); border-radius:14px; padding:20px; display:flex; flex-direction:column; justify-content:space-between; transition:border-color 0.2s, transform 0.2s; }
    .crm-card:hover { border-color:rgba(234,179,8,0.5); transform:translateY(-3px); }
    .card-title { font-size:1.05rem; font-weight:800; color:#fff; margin-bottom:4px; }
    .card-subtitle { font-size:0.82rem; color:#888; margin-bottom:12px; }
    .score-badge { display:inline-block; padding:3px 10px; border-radius:12px; font-size:0.75rem; font-weight:800; }
    .score-high { background:rgba(16,185,129,0.15); color:#10B981; }
    .score-mid { background:rgba(234,179,8,0.15); color:#EAB308; }
    .status-tag { display:inline-block; padding:3px 10px; border-radius:12px; font-size:0.72rem; font-weight:800; margin-left:6px; background:rgba(59,130,246,0.2); color:#60A5FA; }
    .card-buttons { display:flex; gap:8px; margin-top:14px; flex-wrap:wrap; }
    .btn-action { padding:8px 14px; border:none; border-radius:8px; font-size:0.8rem; font-weight:700; cursor:pointer; text-decoration:none; display:inline-flex; align-items:center; gap:6px; transition:transform 0.2s; }
    .btn-action:hover { transform:translateY(-1px); color:#fff; }
    .btn-wa { background:#25D366; color:#000; }
    .btn-wa:hover { background:#22c55e; color:#000; }
    .btn-alt { background:#1a1a1a; color:#fff; border:1px solid rgba(255,255,255,0.15); }
    .no-results { grid-column:1/-1; text-align:center; padding:60px 20px; color:#666; }
    @media(max-width:768px) { .crm-header { padding:14px 20px; } .stats-section, .filter-wrapper, .cards-container { padding-left:16px; padding-right:16px; } .search-input { width:100%; } }
  </style>
</head>
<body>

  <!-- Top Navbar -->
  <header class="crm-header">
    <div class="d-flex align-items-center gap-3">
      <a href="index.html" class="brand-title">👑 GELICON <span>CRM</span></a>
      <div class="nav-bar-links d-none d-md-flex">
        <a href="index.html">Main Portal</a>
        <a href="products.html">Digital Store</a>
        <a href="outreach.html">Outreach Hub</a>
        <a href="card.html">Founder Card</a>
      </div>
    </div>
    <input type="text" class="search-input" placeholder="🔍 Search 116 leads by name, city, service..." id="searchBox" oninput="onSearchChange()">
  </header>

  <!-- Metric Statistics -->
  <section class="stats-section">
    <div class="stat-box"><div class="stat-number" id="totalCount">116</div><div class="stat-label">Total B2B Leads</div></div>
    <div class="stat-box"><div class="stat-number text-primary" id="activeCount">116</div><div class="stat-label">Contacted / Active</div></div>
    <div class="stat-box"><div class="stat-number text-warning" id="vipCount">58</div><div class="stat-label">VIP Leads (95+ Score)</div></div>
    <div class="stat-box"><div class="stat-number text-success" id="marketCount">6</div><div class="stat-label">Global Markets</div></div>
    <div class="stat-box"><div class="stat-number text-warning">₹ 4.8 Cr</div><div class="stat-label">Est. Pipeline Value</div></div>
  </section>

  <!-- Filter Bar -->
  <div class="filter-wrapper">
    <!-- Regional Filter Chips -->
    <div class="filter-group" id="regionGroup">
      <button class="filter-chip filter-chip-region active" onclick="selectRegion('All', this)">🌍 All Markets (<span id="cnt-all">116</span>)</button>
      <button class="filter-chip filter-chip-region" onclick="selectRegion('Saudi Arabia', this)">🇸🇦 Saudi Arabia (<span id="cnt-sa">20</span>)</button>
      <button class="filter-chip filter-chip-region" onclick="selectRegion('Bangalore', this)">🇮🇳 Bangalore (<span id="cnt-blr">36</span>)</button>
      <button class="filter-chip filter-chip-region" onclick="selectRegion('UAE', this)">🇦🇪 Dubai & UAE (<span id="cnt-uae">22</span>)</button>
      <button class="filter-chip filter-chip-region" onclick="selectRegion('UK', this)">🇬🇧 UK / London (<span id="cnt-uk">15</span>)</button>
      <button class="filter-chip filter-chip-region" onclick="selectRegion('Mumbai', this)">🇮🇳 Mumbai (<span id="cnt-mum">12</span>)</button>
      <button class="filter-chip filter-chip-region" onclick="selectRegion('Global', this)">🇺🇸 US & Singapore (<span id="cnt-glb">11</span>)</button>
    </div>

    <!-- Status Filter Chips -->
    <div class="filter-group" id="statusGroup">
      <button class="filter-chip active" onclick="selectStatus('All', this)">All Status</button>
      <button class="filter-chip" onclick="selectStatus('Contacted', this)">Contacted / 3-Mo Cycle</button>
      <button class="filter-chip" onclick="selectStatus('VIP', this)">VIP High Score (95+)</button>
    </div>
  </div>

  <!-- Cards Grid -->
  <main class="cards-container" id="cardsGrid">
    <!-- Rendered dynamically -->
  </main>

  <script>
    // PRE-EMBEDDED 116 VERIFIED B2B LEADS (Zero-network dependency, instantaneous render)
    const LEADS_STORE = ${JSON.stringify(leads)};

    let activeRegion = 'All';
    let activeStatus = 'All';
    let searchKeyword = '';

    function getBadgeClass(score) {
      return (score >= 95) ? 'score-high' : 'score-mid';
    }

    function renderCards(list) {
      const grid = document.getElementById('cardsGrid');
      if (!list || list.length === 0) {
        grid.innerHTML = '<div class="no-results"><h3>No matching leads found</h3><p>Try clearing your search keyword or selecting All Markets.</p></div>';
        return;
      }

      grid.innerHTML = list.map(l => {
        const cleanPhone = (l.phone || '').replace(/[^0-9]/g, '');
        const pitchText = encodeURIComponent('Hi ' + l.name + ' Team! 👋 I am Ismail Kazia, Founder of GELICON WORLDWIDE. Reaching out regarding corporate event production & digital growth funnels in ' + l.city + '.');

        return \`
          <div class="crm-card">
            <div>
              <div class="d-flex justify-content-between align-items-start mb-2">
                <div>
                  <div class="card-title">\${l.flag} \${l.name}</div>
                  <div class="card-subtitle">\${l.city}, \${l.country} • \${l.category}</div>
                </div>
                <div class="text-end">
                  <span class="score-badge \${getBadgeClass(l.score)}">\${l.score}/100</span>
                  <span class="status-tag">\${l.status}</span>
                </div>
              </div>
              <div style="font-size:0.8rem; color:#aaa; margin-bottom:8px;">
                <i class="fas fa-bullseye text-warning me-1"></i> \${l.service}
              </div>
            </div>

            <div class="card-buttons">
              <a href="https://wa.me/\${cleanPhone}?text=\${pitchText}" target="_blank" class="btn-action btn-wa">
                <i class="fab fa-whatsapp"></i> WhatsApp
              </a>
              <a href="tel:\${l.phone}" class="btn-action btn-alt">
                <i class="fas fa-phone"></i> Call
              </a>
              <a href="mailto:\${l.email}" class="btn-action btn-alt">
                <i class="fas fa-envelope"></i> Email
              </a>
            </div>
          </div>
        \`;
      }).join('');
    }

    function updateCounts() {
      document.getElementById('totalCount').textContent = LEADS_STORE.length;
      document.getElementById('activeCount').textContent = LEADS_STORE.length;
      document.getElementById('vipCount').textContent = LEADS_STORE.filter(l => l.score >= 95).length;
      
      document.getElementById('cnt-all').textContent = LEADS_STORE.length;
      document.getElementById('cnt-sa').textContent = LEADS_STORE.filter(l => l.country === 'Saudi Arabia').length;
      document.getElementById('cnt-blr').textContent = LEADS_STORE.filter(l => l.city === 'Bangalore').length;
      document.getElementById('cnt-uae').textContent = LEADS_STORE.filter(l => l.country === 'UAE').length;
      document.getElementById('cnt-uk').textContent = LEADS_STORE.filter(l => l.country === 'UK').length;
      document.getElementById('cnt-mum').textContent = LEADS_STORE.filter(l => l.city === 'Mumbai').length;
      document.getElementById('cnt-glb').textContent = LEADS_STORE.filter(l => l.country === 'USA' || l.country === 'Singapore').length;
    }

    function executeFilter() {
      let result = LEADS_STORE;

      // Region Filter
      if (activeRegion === 'Saudi Arabia') {
        result = result.filter(l => l.country === 'Saudi Arabia');
      } else if (activeRegion === 'Bangalore') {
        result = result.filter(l => l.city === 'Bangalore');
      } else if (activeRegion === 'UAE') {
        result = result.filter(l => l.country === 'UAE');
      } else if (activeRegion === 'UK') {
        result = result.filter(l => l.country === 'UK');
      } else if (activeRegion === 'Mumbai') {
        result = result.filter(l => l.city === 'Mumbai');
      } else if (activeRegion === 'Global') {
        result = result.filter(l => l.country === 'USA' || l.country === 'Singapore');
      }

      // Status Filter
      if (activeStatus === 'VIP') {
        result = result.filter(l => l.score >= 95);
      }

      // Search Filter
      if (searchKeyword) {
        result = result.filter(l => 
          (l.name && l.name.toLowerCase().includes(searchKeyword)) ||
          (l.city && l.city.toLowerCase().includes(searchKeyword)) ||
          (l.country && l.country.toLowerCase().includes(searchKeyword)) ||
          (l.service && l.service.toLowerCase().includes(searchKeyword)) ||
          (l.category && l.category.toLowerCase().includes(searchKeyword))
        );
      }

      renderCards(result);
    }

    function selectRegion(region, btn) {
      activeRegion = region;
      document.querySelectorAll('#regionGroup .filter-chip-region').forEach(b => b.classList.remove('active'));
      if (btn) btn.classList.add('active');
      executeFilter();
    }

    function selectStatus(st, btn) {
      activeStatus = st;
      document.querySelectorAll('#statusGroup .filter-chip').forEach(b => b.classList.remove('active'));
      if (btn) btn.classList.add('active');
      executeFilter();
    }

    function onSearchChange() {
      searchKeyword = document.getElementById('searchBox').value.toLowerCase().trim();
      executeFilter();
    }

    // Immediate Synchronous Initial Render (Zero Delay)
    updateCounts();
    executeFilter();
  </script>
</body>
</html>`;

fs.writeFileSync(path.join(__dirname, 'crm_dashboard.html'), template);
console.log('✅ Wrote 100% self-contained crm_dashboard.html with', leads.length, 'leads');
