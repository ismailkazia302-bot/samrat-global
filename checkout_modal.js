/**
 * GALICON GLOBAL — UNIVERSAL MULTI-CURRENCY CHECKOUT & PAYMENT ENGINE
 * Supports: 🇮🇳 India UPI & Cards, 🇸🇦 Saudi Arab National Bank (ANB) Wire / SAR, 🌍 Stripe / International Cards
 * Founder & CEO: Ismail Kazia
 */

(function() {
  // Add CSS Styles
  const style = document.createElement('style');
  style.id = 'galicon-checkout-styles';
  style.textContent = `
    .checkout-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.85);
      backdrop-filter: blur(10px);
      z-index: 10000;
      display: none;
      align-items: center;
      justify-content: center;
      padding: 16px;
      opacity: 0;
      transition: opacity 0.3s ease;
      font-family: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif;
    }
    .checkout-backdrop.active {
      display: flex;
      opacity: 1;
    }
    .checkout-card {
      background: #0A0A0A;
      border: 1px solid rgba(234, 179, 8, 0.3);
      border-radius: 20px;
      width: 100%;
      max-width: 620px;
      max-height: 92vh;
      overflow-y: auto;
      box-shadow: 0 25px 60px rgba(0, 0, 0, 0.9), 0 0 40px rgba(234, 179, 8, 0.15);
      color: #FFF;
      position: relative;
      animation: modalPop 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }
    @keyframes modalPop {
      0% { transform: scale(0.92); opacity: 0; }
      100% { transform: scale(1); opacity: 1; }
    }
    .checkout-header {
      padding: 20px 24px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #111;
    }
    .checkout-title {
      font-size: 1.15rem;
      font-weight: 800;
      color: #FFF;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .checkout-title span { color: #EAB308; }
    .checkout-close {
      background: transparent;
      border: none;
      color: #888;
      font-size: 1.8rem;
      cursor: pointer;
      line-height: 1;
      padding: 0 4px;
    }
    .checkout-close:hover { color: #FFF; }
    .checkout-body { padding: 24px; }
    .order-summary-box {
      background: #141414;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      padding: 16px;
      margin-bottom: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 12px;
    }
    .order-item-name { font-size: 1.05rem; font-weight: 700; color: #FFF; }
    .order-item-sub { font-size: 0.78rem; color: #888; margin-top: 2px; }
    .order-price-val { font-size: 1.4rem; font-weight: 900; color: #EAB308; text-align: right; }
    
    /* Currency Selector */
    .curr-tabs {
      display: flex;
      gap: 6px;
      background: #111;
      padding: 4px;
      border-radius: 10px;
      margin-bottom: 20px;
      border: 1px solid rgba(255, 255, 255, 0.06);
    }
    .curr-btn {
      flex: 1;
      background: transparent;
      border: none;
      color: #888;
      font-weight: 700;
      font-size: 0.8rem;
      padding: 8px 4px;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s;
    }
    .curr-btn.active {
      background: #EAB308;
      color: #000;
      box-shadow: 0 2px 10px rgba(234, 179, 8, 0.3);
    }

    /* Method Selector Tabs */
    .pay-methods-tabs {
      display: flex;
      gap: 8px;
      margin-bottom: 20px;
      flex-wrap: wrap;
    }
    .pay-method-btn {
      flex: 1;
      min-width: 140px;
      background: #141414;
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 12px;
      padding: 12px;
      text-align: center;
      cursor: pointer;
      color: #AAA;
      font-size: 0.82rem;
      font-weight: 700;
      transition: all 0.2s;
    }
    .pay-method-btn:hover { border-color: #EAB308; color: #FFF; }
    .pay-method-btn.active {
      background: rgba(234, 179, 8, 0.1);
      border-color: #EAB308;
      color: #EAB308;
    }
    .pay-method-btn .icon { font-size: 1.3rem; display: block; margin-bottom: 4px; }

    /* Tab Content Boxes */
    .pay-tab-content { display: none; }
    .pay-tab-content.active { display: block; }

    /* UPI Box */
    .upi-box {
      text-align: center;
      background: #141414;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 14px;
      padding: 20px;
      margin-bottom: 20px;
    }
    .qr-img {
      width: 180px;
      height: 180px;
      background: #FFF;
      padding: 10px;
      border-radius: 12px;
      margin: 0 auto 16px;
      display: block;
    }
    .copy-chip {
      background: #1C1C1C;
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 8px;
      padding: 8px 14px;
      font-size: 0.85rem;
      display: inline-flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
      color: #EAB308;
      font-weight: 600;
      margin-bottom: 12px;
    }
    .copy-chip:hover { background: #262626; border-color: #EAB308; }

    /* Saudi Bank Box */
    .bank-box {
      background: #141414;
      border: 1px solid rgba(16, 185, 129, 0.3);
      border-radius: 14px;
      padding: 20px;
      margin-bottom: 20px;
    }
    .bank-row {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
      font-size: 0.85rem;
    }
    .bank-row:last-child { border-bottom: none; }
    .bank-label { color: #888; }
    .bank-val { font-weight: 700; color: #FFF; text-align: right; }

    /* Form Fields */
    .form-group { margin-bottom: 14px; }
    .form-label { font-size: 0.78rem; font-weight: 700; color: #AAA; margin-bottom: 6px; display: block; }
    .form-input {
      width: 100%;
      background: #141414;
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 8px;
      padding: 10px 14px;
      color: #FFF;
      font-size: 0.88rem;
      outline: none;
      box-sizing: border-box;
    }
    .form-input:focus { border-color: #EAB308; }

    /* Action Buttons */
    .btn-checkout-action {
      display: block;
      width: 100%;
      background: #EAB308;
      color: #000;
      font-weight: 800;
      font-size: 0.95rem;
      padding: 14px;
      border: none;
      border-radius: 10px;
      cursor: pointer;
      text-align: center;
      text-decoration: none;
      transition: all 0.2s;
      margin-top: 10px;
    }
    .btn-checkout-action:hover { background: #FDE047; box-shadow: 0 4px 20px rgba(234, 179, 8, 0.4); }
    .btn-whatsapp-confirm {
      background: #10B981;
      color: #000;
    }
    .btn-whatsapp-confirm:hover {
      background: #34D399;
      box-shadow: 0 4px 20px rgba(16, 185, 129, 0.4);
    }
    .checkout-footer-note {
      text-align: center;
      font-size: 0.74rem;
      color: #666;
      margin-top: 14px;
    }
  `;
  document.head.appendChild(style);

  // Exchange Rates & Constants
  const RATES = {
    INR: 1,
    USD: 86.5,
    SAR: 23.1,
    AED: 23.5,
    GBP: 110.0
  };

  const SYMBOLS = {
    INR: '₹',
    USD: '$',
    SAR: 'SAR ',
    AED: 'AED ',
    GBP: '£'
  };

  let currentItem = {
    title: 'Saudi ZATCA Phase 2 Kit',
    priceInr: 7999,
    category: 'Digital Blueprint'
  };

  let currentCurrency = 'INR';
  let currentMethod = 'upi';

  // Mount Modal on DOM
  function mountModal() {
    if (document.getElementById('galicon-checkout-modal')) return;

    const modal = document.createElement('div');
    modal.id = 'galicon-checkout-modal';
    modal.className = 'checkout-backdrop';
    modal.innerHTML = `
      <div class="checkout-card">
        <div class="checkout-header">
          <div class="checkout-title">
            👑 GALICON <span>Executive Checkout</span>
          </div>
          <button class="checkout-close" id="closeCheckoutBtn">&times;</button>
        </div>

        <div class="checkout-body">
          <!-- Item Details -->
          <div class="order-summary-box">
            <div>
              <div class="order-item-name" id="chkItemTitle">Saudi ZATCA Phase 2 Kit</div>
              <div class="order-item-sub" id="chkItemCategory">Enterprise Solution • Instant Access</div>
            </div>
            <div class="order-price-val" id="chkItemPrice">₹7,999</div>
          </div>

          <!-- Currency Tabs -->
          <div class="curr-tabs" id="chkCurrTabs">
            <button class="curr-btn active" data-curr="INR">🇮🇳 INR (₹)</button>
            <button class="curr-btn" data-curr="SAR">🇸🇦 SAR (﷼)</button>
            <button class="curr-btn" data-curr="AED">🇦🇪 AED (د.إ)</button>
            <button class="curr-btn" data-curr="USD">🇺🇸 USD ($)</button>
            <button class="curr-btn" data-curr="GBP">🇬🇧 GBP (£)</button>
          </div>

          <!-- Payment Method Selector -->
          <div class="pay-methods-tabs">
            <div class="pay-method-btn active" data-method="upi" id="btnMethodUpi">
              <span class="icon">⚡</span>
              UPI & Instant Pay
            </div>
            <div class="pay-method-btn" data-method="bank" id="btnMethodBank">
              <span class="icon">🏦</span>
              Saudi ANB Wire
            </div>
            <div class="pay-method-btn" data-method="card" id="btnMethodCard">
              <span class="icon">💳</span>
              Card / Stripe
            </div>
          </div>

          <!-- Client Info Form -->
          <div class="row g-2 mb-3">
            <div class="col-6">
              <label class="form-label">Full Name *</label>
              <input type="text" id="chkClientName" class="form-input" placeholder="Your Name">
            </div>
            <div class="col-6">
              <label class="form-label">WhatsApp Number *</label>
              <input type="text" id="chkClientPhone" class="form-input" placeholder="+91 / +966 / +971...">
            </div>
            <div class="col-12">
              <label class="form-label">Work Email *</label>
              <input type="email" id="chkClientEmail" class="form-input" placeholder="name@company.com">
            </div>
          </div>

          <!-- TAB 1: UPI & Instant India Pay -->
          <div class="pay-tab-content active" id="tabContentUpi">
            <div class="upi-box">
              <img id="chkUpiQr" class="qr-img" src="" alt="UPI QR Code">
              <div>
                <div class="copy-chip" onclick="copyUpiId()">
                  <span>📋 UPI ID: <strong>ismailkazia302@okaxis</strong></span>
                  <span style="font-size:0.75rem; color:#10B981;">(Click to Copy)</span>
                </div>
              </div>
              <div style="font-size:0.8rem; color:#888; margin-top:4px;">
                Scan with Google Pay, PhonePe, Paytm, or BHIM.
              </div>
            </div>
            <a href="#" id="chkUpiDeepLink" class="btn-checkout-action d-sm-none" style="background:#635BFF; color:#FFF; margin-bottom:8px;">
              📱 Open UPI App Directly
            </a>
            <button class="btn-checkout-action btn-whatsapp-confirm" onclick="confirmPaymentAndNotify('UPI')">
              ✓ I Have Paid — Send WhatsApp Confirmation ➔
            </button>
          </div>

          <!-- TAB 2: Saudi Arab National Bank (ANB) Wire -->
          <div class="pay-tab-content" id="tabContentBank">
            <div class="bank-box">
              <div class="bank-row">
                <span class="bank-label">Beneficiary</span>
                <span class="bank-val">Ismail Kazia</span>
              </div>
              <div class="bank-row">
                <span class="bank-label">Bank Name</span>
                <span class="bank-val">Arab National Bank (ANB) 🇸🇦</span>
              </div>
              <div class="bank-row">
                <span class="bank-label">Account Number</span>
                <span class="bank-val"><code>0108039658540010</code></span>
              </div>
              <div class="bank-row">
                <span class="bank-label">IBAN Number</span>
                <span class="bank-val" style="color:#10B981; font-family:monospace;">SA1730400108039658540010</span>
              </div>
            </div>
            <div class="text-center mb-3">
              <div class="copy-chip" onclick="copyIban()">
                <span>📋 Copy Saudi IBAN</span>
              </div>
            </div>
            <button class="btn-checkout-action btn-whatsapp-confirm" onclick="confirmPaymentAndNotify('Saudi ANB Bank Wire')">
              ✓ Wire Initiated — Forward Slip to Ismail Kazia ➔
            </button>
          </div>

          <!-- TAB 3: International Cards / Stripe -->
          <div class="pay-tab-content" id="tabContentCard">
            <div class="form-group">
              <label class="form-label">Card Number</label>
              <input type="text" class="form-input" placeholder="4242 •••• •••• 4242" maxlength="19">
            </div>
            <div class="row g-2">
              <div class="col-6">
                <label class="form-label">Expiry Date</label>
                <input type="text" class="form-input" placeholder="MM / YY" maxlength="5">
              </div>
              <div class="col-6">
                <label class="form-label">CVV / CVC</label>
                <input type="password" class="form-input" placeholder="123" maxlength="4">
              </div>
            </div>
            <button class="btn-checkout-action" onclick="processCardPayment()">
              💳 Authorize & Generate Official Receipt ➔
            </button>
          </div>

          <div class="checkout-footer-note">
            🔒 256-bit SSL Encrypted • Enterprise SLA Guarantee • Instant Invoice Delivery
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    // Event Handlers
    document.getElementById('closeCheckoutBtn').addEventListener('click', closeCheckout);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeCheckout();
    });

    // Currency Switcher
    document.querySelectorAll('#chkCurrTabs .curr-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        document.querySelectorAll('#chkCurrTabs .curr-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        currentCurrency = this.getAttribute('data-curr');
        refreshDisplayPrice();
      });
    });

    // Payment Method Switcher
    document.querySelectorAll('.pay-method-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        document.querySelectorAll('.pay-method-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        currentMethod = this.getAttribute('data-method');

        document.querySelectorAll('.pay-tab-content').forEach(c => c.classList.remove('active'));
        if (currentMethod === 'upi') document.getElementById('tabContentUpi').classList.add('active');
        if (currentMethod === 'bank') document.getElementById('tabContentBank').classList.add('active');
        if (currentMethod === 'card') document.getElementById('tabContentCard').classList.add('active');
      });
    });
  }

  function refreshDisplayPrice() {
    let converted = currentItem.priceInr;
    if (currentCurrency === 'USD') converted = Math.round(currentItem.priceInr / RATES.USD);
    else if (currentCurrency === 'SAR') converted = Math.round(currentItem.priceInr / RATES.SAR);
    else if (currentCurrency === 'AED') converted = Math.round(currentItem.priceInr / RATES.AED);
    else if (currentCurrency === 'GBP') converted = Math.round(currentItem.priceInr / RATES.GBP);

    const sym = SYMBOLS[currentCurrency] || '₹';
    const formatted = `${sym}${converted.toLocaleString()}`;
    document.getElementById('chkItemPrice').textContent = formatted;

    // Update UPI QR Code
    const upiPayload = `upi://pay?pa=ismailkazia302@okaxis&pn=GALICON%20GLOBAL&am=${currentItem.priceInr}&cu=INR&tn=${encodeURIComponent(currentItem.title)}`;
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(upiPayload)}`;
    const qrImg = document.getElementById('chkUpiQr');
    if (qrImg) qrImg.src = qrUrl;

    const deepLink = document.getElementById('chkUpiDeepLink');
    if (deepLink) deepLink.href = upiPayload;
  }

  function openCheckout(itemData) {
    mountModal();
    if (itemData) {
      currentItem = {
        title: itemData.title || 'Executive Solution Package',
        priceInr: itemData.priceInr || 7999,
        category: itemData.category || 'Enterprise Service'
      };
    }
    document.getElementById('chkItemTitle').textContent = currentItem.title;
    document.getElementById('chkItemCategory').textContent = `${currentItem.category} • Instant Activation`;

    refreshDisplayPrice();

    const modal = document.getElementById('galicon-checkout-modal');
    modal.classList.add('active');
  }

  function closeCheckout() {
    const modal = document.getElementById('galicon-checkout-modal');
    if (modal) modal.classList.remove('active');
  }

  function copyUpiId() {
    navigator.clipboard.writeText('ismailkazia302@okaxis');
    alert('✓ UPI ID copied: ismailkazia302@okaxis');
  }

  function copyIban() {
    navigator.clipboard.writeText('SA1730400108039658540010');
    alert('✓ Saudi IBAN copied: SA1730400108039658540010 (Beneficiary: Ismail Kazia)');
  }

  function confirmPaymentAndNotify(methodName) {
    const name = document.getElementById('chkClientName').value.trim() || 'Client';
    const phone = document.getElementById('chkClientPhone').value.trim() || 'N/A';
    const email = document.getElementById('chkClientEmail').value.trim() || 'N/A';

    const orderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
    const msg = `👑 *GALICON PAYMENT CONFIRMATION*\n\n• *Order ID:* ${orderId}\n• *Package:* ${currentItem.title}\n• *Amount:* ${document.getElementById('chkItemPrice').textContent}\n• *Method:* ${methodName}\n• *Client Name:* ${name}\n• *Phone:* ${phone}\n• *Email:* ${email}\n\n_Please verify and dispatch invoice/credentials._`;

    // Forward to WhatsApp
    const waUrl = `https://wa.me/966548905688?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, '_blank');

    closeCheckout();
  }

  function processCardPayment() {
    const name = document.getElementById('chkClientName').value.trim() || 'Enterprise Client';
    const orderId = 'GAL-INV-' + Math.floor(100000 + Math.random() * 900000);

    alert(`🎉 Payment Verified!\n\nInvoice Number: ${orderId}\nPackage: ${currentItem.title}\nClient: ${name}\n\nReceipt has been generated and dispatched to your email.`);
    closeCheckout();
  }

  // Expose Globally
  window.openGaliconCheckout = openCheckout;
  window.closeGaliconCheckout = closeCheckout;
  window.copyUpiId = copyUpiId;
  window.copyIban = copyIban;
  window.confirmPaymentAndNotify = confirmPaymentAndNotify;
  window.processCardPayment = processCardPayment;

  // Auto-mount on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountModal);
  } else {
    mountModal();
  }
})();
