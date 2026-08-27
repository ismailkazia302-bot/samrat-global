/**
 * GELICON GLOBAL — LUXURY SALES & CUSTOMER SERVICE AI CONCIERGE CHATBOT
 * Founder & CEO: Ismail Kazia
 * Fully self-contained with embedded CSS and bilingual intelligence (English + Roman Urdu)
 */

(function() {
  // 1. Inject Embedded CSS to guarantee 100% styling on any page/domain
  const style = document.createElement('style');
  style.id = 'samrat-chat-injected-css';
  style.innerHTML = `
    #samrat-chat-launcher {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 999999;
      display: flex;
      align-items: center;
      gap: 10px;
      background: #0d0d0d;
      border: 1px solid #EAB308;
      padding: 10px 18px;
      border-radius: 50px;
      cursor: pointer;
      box-shadow: 0 10px 30px rgba(0,0,0,0.8), 0 0 20px rgba(234,179,8,0.25);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      font-family: 'Poppins', system-ui, sans-serif;
    }
    #samrat-chat-launcher:hover {
      transform: translateY(-4px) scale(1.02);
      box-shadow: 0 15px 35px rgba(234,179,8,0.45);
    }
    .chat-launcher-avatar {
      width: 38px;
      height: 38px;
      background: #EAB308;
      color: #000;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
      position: relative;
      font-weight: 900;
    }
    .chat-online-dot {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 10px;
      height: 10px;
      background: #10B981;
      border: 2px solid #000;
      border-radius: 50%;
      animation: pulse-green-glow 2s infinite;
    }
    @keyframes pulse-green-glow {
      0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16,185,129,0.7); }
      70% { transform: scale(1); box-shadow: 0 0 0 8px rgba(16,185,129,0); }
      100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16,185,129,0); }
    }
    .chat-launcher-text {
      font-size: 0.85rem;
      font-weight: 700;
      color: #FFFFFF;
      letter-spacing: 0.5px;
    }
    .chat-launcher-badge {
      background: #EAB308;
      color: #000;
      font-size: 0.65rem;
      font-weight: 900;
      padding: 2px 6px;
      border-radius: 10px;
      text-transform: uppercase;
    }
    #samrat-chat-window {
      position: fixed;
      bottom: 85px;
      right: 24px;
      width: 380px;
      max-width: calc(100vw - 32px);
      height: 540px;
      max-height: calc(100vh - 110px);
      background: #0A0A0A;
      border: 1px solid rgba(234,179,8,0.4);
      border-radius: 18px;
      box-shadow: 0 25px 60px rgba(0,0,0,0.95), 0 0 30px rgba(234,179,8,0.2);
      display: none;
      flex-direction: column;
      overflow: hidden;
      z-index: 999999;
      font-family: 'Poppins', system-ui, sans-serif;
    }
    #samrat-chat-window.open {
      display: flex;
      animation: chatFadeUp 0.3s ease;
    }
    @keyframes chatFadeUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .chat-header {
      background: linear-gradient(135deg, #1A1400, #0D0D0D);
      border-bottom: 1px solid rgba(234,179,8,0.25);
      padding: 14px 18px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .chat-header-info {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .chat-header-name {
      font-weight: 800;
      font-size: 0.92rem;
      color: #FFFFFF;
    }
    .chat-header-sub {
      font-size: 0.72rem;
      color: #10B981;
      font-weight: 600;
    }
    .chat-close-btn {
      background: none;
      border: none;
      color: #888;
      font-size: 1.4rem;
      cursor: pointer;
      padding: 4px 8px;
      line-height: 1;
    }
    .chat-close-btn:hover {
      color: #FFF;
    }
    .chat-body {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      background: #050505;
    }
    .chat-msg {
      max-width: 85%;
      padding: 10px 14px;
      border-radius: 12px;
      font-size: 0.84rem;
      line-height: 1.5;
    }
    .chat-msg.bot {
      background: #141414;
      border: 1px solid rgba(255,255,255,0.08);
      color: #DDD;
      align-self: flex-start;
      border-bottom-left-radius: 2px;
    }
    .chat-msg.bot strong {
      color: #EAB308;
    }
    .chat-msg.user {
      background: #EAB308;
      color: #000;
      font-weight: 600;
      align-self: flex-end;
      border-bottom-right-radius: 2px;
    }
    .chat-chips {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-top: 6px;
    }
    .chat-chip {
      background: #111;
      border: 1px solid rgba(234,179,8,0.3);
      color: #EEE;
      padding: 8px 12px;
      border-radius: 8px;
      font-size: 0.76rem;
      font-weight: 600;
      text-align: left;
      cursor: pointer;
      transition: all 0.2s;
    }
    .chat-chip:hover {
      background: #EAB308;
      color: #000;
      border-color: #EAB308;
      transform: translateX(4px);
    }
    .chat-footer {
      padding: 12px;
      background: #0D0D0D;
      border-top: 1px solid rgba(255,255,255,0.08);
      display: flex;
      gap: 8px;
    }
    .chat-input {
      flex: 1;
      background: #161616;
      border: 1px solid rgba(255,255,255,0.15);
      color: #FFF;
      padding: 10px 14px;
      border-radius: 8px;
      font-size: 0.85rem;
      outline: none;
      font-family: inherit;
    }
    .chat-input:focus {
      border-color: #EAB308;
    }
    .chat-send-btn {
      background: #EAB308;
      color: #000;
      border: none;
      padding: 0 16px;
      border-radius: 8px;
      font-weight: 800;
      cursor: pointer;
      transition: background 0.2s;
    }
    .chat-send-btn:hover {
      background: #FDE047;
    }
  `;
  document.head.appendChild(style);

  function mountChatUI() {
    if (document.getElementById('samrat-chat-launcher')) return;

    const chatContainer = document.createElement('div');
    chatContainer.id = 'samrat-chat-root';
    chatContainer.innerHTML = `
      <!-- Floating Launcher -->
      <div id="samrat-chat-launcher">
        <div class="chat-launcher-avatar">
          👑
          <div class="chat-online-dot"></div>
        </div>
        <div class="d-none d-sm-block">
          <div class="chat-launcher-text">GELICON Concierge</div>
          <div style="font-size:0.68rem; color:#10B981; font-weight:700;">● Online • Live Sales & Support</div>
        </div>
        <span class="chat-launcher-badge">VIP</span>
      </div>

      <!-- Chat Window -->
      <div id="samrat-chat-window">
        <div class="chat-header">
          <div class="chat-header-info">
            <div class="chat-launcher-avatar" style="width:34px;height:34px;font-size:1rem;">👑</div>
            <div>
              <div class="chat-header-name">GELICON Executive Concierge</div>
              <div class="chat-header-sub">Direct Line to Founder Ismail Kazia</div>
            </div>
          </div>
          <button class="chat-close-btn" id="samratChatCloseBtn">&times;</button>
        </div>

        <div class="chat-body" id="samratChatBody">
          <div class="chat-msg bot">
            <strong>Marhaba & Welcome to GELICON GLOBAL! 👑</strong><br>
            I am your executive sales concierge. Main aapki kya madad kar sakta hoon?
          </div>

          <div class="chat-chips" id="samratInitialChips">
            <div class="chat-chip" data-chip="events">🎪 Book Bangalore Corporate Event (₹8.5L - ₹38L)</div>
            <div class="chat-chip" data-chip="saudi">🇸🇦 Saudi Vision 2030 Conclave / Riyadh Staging</div>
            <div class="chat-chip" data-chip="retainer">📈 Dubai / GCC Growth Retainer ($1,450 - $2,950/mo)</div>
            <div class="chat-chip" data-chip="zatca">🛍️ Buy Saudi ZATCA Phase 2 Kit ($97)</div>
            <div class="chat-chip" data-chip="bank">🏦 Saudi ANB Bank Transfer & IBAN Details</div>
            <div class="chat-chip" data-chip="call">📅 Schedule 30-Min Call with Ismail Kazia</div>
            <div class="chat-chip" data-chip="wa" style="border-color:#10B981; color:#10B981;">💬 Direct WhatsApp with Founder Ismail Kazia →</div>
          </div>
        </div>

        <div class="chat-footer">
          <input type="text" id="samratChatInput" class="chat-input" placeholder="Type your message / Apka sawaal yahan likhein...">
          <button class="chat-send-btn" id="samratChatSendBtn">Send</button>
        </div>
      </div>
    `;
    document.body.appendChild(chatContainer);

    // Event Listeners
    document.getElementById('samrat-chat-launcher').addEventListener('click', toggleChat);
    document.getElementById('samratChatCloseBtn').addEventListener('click', toggleChat);
    document.getElementById('samratChatSendBtn').addEventListener('click', handleSend);
    document.getElementById('samratChatInput').addEventListener('keydown', function(e) {
      if (e.key === 'Enter') handleSend();
    });

    // Chip Listeners
    document.querySelectorAll('#samratInitialChips .chat-chip').forEach(chip => {
      chip.addEventListener('click', function() {
        processChip(this.getAttribute('data-chip'));
      });
    });
  }

  function toggleChat() {
    const win = document.getElementById('samrat-chat-window');
    win.classList.toggle('open');
    if (win.classList.contains('open')) {
      setTimeout(() => {
        const inp = document.getElementById('samratChatInput');
        if (inp) inp.focus();
      }, 300);
    }
  }

  function appendMsg(html, sender) {
    const body = document.getElementById('samratChatBody');
    const div = document.createElement('div');
    div.className = `chat-msg ${sender}`;
    div.innerHTML = html;
    body.appendChild(div);
    body.scrollTop = body.scrollHeight;
  }

  function processChip(type) {
    if (type === 'events') {
      appendMsg("Bangalore corporate event packages ki details chahiye.", "user");
      setTimeout(() => {
        appendMsg(`
          <strong>🎪 Bangalore Corporate Event & Tech Summit Packages:</strong><br>
          • <strong>Executive Launchpad:</strong> ₹8.5 Lakh ($10,500) • 250 pax, 5-Star Stage<br>
          • <strong>Flagship Tech Summit:</strong> ₹18.5 Lakh ($22,000) • P2.6 Curved LED + 4K Cinema Broadcast<br>
          • <strong>Imperial Mega Conclave:</strong> ₹38 Lakh ($45,000) • 1,000+ pax arena staging (Leela Palace / ITC)<br><br>
          👉 <a href="proposal_template.html" target="_blank" style="color:#EAB308; font-weight:bold;">Proposal Lookbook Kholein</a> ya seedha WhatsApp par baat karein:<br>
          <a href="https://wa.me/916363962640?text=Hi%20Ismail!%20Inquiring%20about%20Bangalore%20Corporate%20Event%20Packages." target="_blank" style="display:inline-block; margin-top:6px; background:#25D366; color:#000; font-weight:bold; padding:4px 10px; border-radius:6px; text-decoration:none;">WhatsApp India (+91 63639 62640) →</a>
        `, "bot");
      }, 400);
    } else if (type === 'saudi') {
      appendMsg("Saudi Vision 2030 Conclave & Riyadh staging details.", "user");
      setTimeout(() => {
        appendMsg(`
          <strong>🇸🇦 Saudi Arabia Turnkey Operations:</strong><br>
          Hum <strong>Riyadh & Jeddah</strong> me Vision 2030 summits, corporate galas aur government conclaves deliver karte hain:<br>
          • Bilingual Arabic/English simultaneous interpretation booths<br>
          • VIP protocol & diplomatic staging<br>
          • Direct Saudi Arab National Bank (ANB) transfer<br><br>
          <a href="https://wa.me/966548905688?text=Marhaba%20Ismail!%20Inquiring%20about%20Saudi%20Arabia%20event%20staging." target="_blank" style="display:inline-block; background:#10B981; color:#000; font-weight:bold; padding:4px 10px; border-radius:6px; text-decoration:none;">Connect Saudi WhatsApp (+966 54 890 5688) →</a>
        `, "bot");
      }, 400);
    } else if (type === 'retainer') {
      appendMsg("Dubai / GCC Growth Marketing Retainers ki details chahiye.", "user");
      setTimeout(() => {
        appendMsg(`
          <strong>📈 High-Net-Worth Performance Marketing (UAE & KSA):</strong><br>
          • <strong>Growth Sprint:</strong> $1,450 / month (5,450 SAR • AED 5,300)<br>
          • <strong>Executive Performance:</strong> $2,950 / month (11,000 SAR • AED 10,800) • 300 Qualified Leads + WhatsApp CRM<br>
          • <strong>Imperial Authority:</strong> $5,500 / month (20,600 SAR)<br><br>
          Recent Dubai Real Estate campaign ROAS: <strong>4.8x</strong>.<br>
          <a href="meet.html" target="_blank" style="color:#EAB308; font-weight:bold;">Ismail Kazia ke saath 30-Min Call Book Karein →</a>
        `, "bot");
      }, 400);
    } else if (type === 'zatca') {
      appendMsg("Saudi ZATCA Phase 2 Kit ($97) buy karna hai.", "user");
      setTimeout(() => {
        appendMsg(`
          <strong>⚡ Saudi ZATCA Phase 2 Master Kit 2026:</strong><br>
          Includes XML UBL 2.1 templates, cryptographic stamps, API payload blueprints.<br>
          • <strong>Price:</strong> $97 (365 SAR • ₹7,999)<br>
          • Instant download after payment via Mada, STC Pay ya ANB Bank!<br><br>
          👉 <a href="products.html" target="_blank" style="color:#EAB308; font-weight:bold;">Digital Store Par Buy Karein →</a>
        `, "bot");
      }, 400);
    } else if (type === 'bank') {
      appendMsg("Bank details aur IBAN chahiye.", "user");
      setTimeout(() => {
        appendMsg(`
          <strong>🏦 Official Saudi Arab National Bank (ANB):</strong><br>
          • <strong>Beneficiary:</strong> Ismail Kazia<br>
          • <strong>Bank Name:</strong> Arab National Bank (ANB)<br>
          • <strong>Account No:</strong> <code>0108039658540010</code><br>
          • <strong>IBAN:</strong> <code style="color:#10B981; font-weight:bold;">SA1730400108039658540010</code><br><br>
          Transfer ke baad receipt WhatsApp par share karein: <a href="https://wa.me/966548905688" target="_blank" style="color:#10B981; font-weight:bold;">+966 54 890 5688</a>.
        `, "bot");
      }, 400);
    } else if (type === 'call') {
      appendMsg("Founder Ismail Kazia ke saath meeting book karni hai.", "user");
      setTimeout(() => {
        appendMsg(`
          <strong>📅 30-Minute Executive Strategy Call:</strong><br>
          Aap direct Google Meet slot hamare interactive page se book kar sakte hain:<br><br>
          👉 <a href="meet.html" target="_blank" style="display:inline-block; background:#10B981; color:#000; font-weight:bold; padding:5px 12px; border-radius:6px; text-decoration:none;">Booking Page (meet.html) Kholein →</a>
        `, "bot");
      }, 400);
    } else if (type === 'wa') {
      window.open("https://wa.me/966548905688?text=Hello%20Founder%20Ismail%20Kazia!%20Connecting%20from%20GELICON%20website.", "_blank");
    }
  }

  function handleSend() {
    const input = document.getElementById('samratChatInput');
    const raw = input.value.trim();
    if (!raw) return;

    appendMsg(raw, 'user');
    input.value = '';

    const text = raw.toLowerCase();

    // Natural Language Conversational Response
    setTimeout(() => {
      if (text.match(/^(hi|hello|hey|salam|marhaba|assalam|kem cho|namaste)/)) {
        appendMsg(`
          <strong>Walekum Assalam / Hello! 👋</strong><br>
          Welcome to GELICON GLOBAL! Main Founder Ismail Kazia ka AI sales executive hoon. 
          Aapko Bangalore corporate event organize karna hai, ya Saudi/Dubai business expansion ke liye baat karni hai?
        `, 'bot');
      } else if (text.includes('event') || text.includes('conference') || text.includes('summit') || text.includes('stage') || text.includes('bangalore') || text.includes('wedding') || text.includes('conclave')) {
        appendMsg(`
          <strong>🎪 Corporate Events & Tech Summits:</strong><br>
          Hum Bangalore (The Leela Palace, ITC Gardenia, BIEC) aur Pan-India me end-to-end turnkey event management karte hain:<br>
          • <strong>Packages:</strong> ₹8.5 Lakh (Launchpad) | ₹18.5 Lakh (Flagship 4K LED) | ₹38 Lakh (Imperial)<br>
          • <strong>Specs:</strong> P2.6 Curved LED walls, line-array acoustics, multi-cam 4K broadcast.<br><br>
          Aapka event kab aur kitne logon ka plan ho raha hai?
        `, 'bot');
      } else if (text.includes('saudi') || text.includes('riyadh') || text.includes('jeddah') || text.includes('dubai') || text.includes('uae') || text.includes('marketing') || text.includes('real estate') || text.includes('lead')) {
        appendMsg(`
          <strong>🇸🇦 Saudi Arabia & UAE Operations:</strong><br>
          Hum Riyadh, Jeddah aur Dubai me:<br>
          1. <strong>Vision 2030 Mega Events & Staging</strong> deliver karte hain.<br>
          2. <strong>Luxury Real Estate Buyer Funnels</strong> manage karte hain ($1,450 - $2,950/mo retainers).<br>
          Local Saudi ANB Bank payment available hai!<br><br>
          Aapko WhatsApp par direct proposal chahiye?
        `, 'bot');
      } else if (text.includes('price') || text.includes('cost') || text.includes('kitna') || text.includes('rate') || text.includes('package') || text.includes('fees')) {
        appendMsg(`
          <strong>💰 GELICON Pricing Overview:</strong><br>
          • <strong>Corporate Events:</strong> ₹8.5 Lakh to ₹38 Lakh ($10,500 - $45,000)<br>
          • <strong>Growth Retainers (KSA/UAE):</strong> $1,450 to $2,950 / month (5,450 SAR - 11,000 SAR)<br>
          • <strong>Digital Products:</strong> $29 to $97 (ZATCA Kit)<br><br>
          Aapko kis specific service ka custom quote chahiye?
        `, 'bot');
      } else if (text.includes('call') || text.includes('phone') || text.includes('number') || text.includes('contact') || text.includes('whatsapp') || text.includes('ismail') || text.includes('founder') || text.includes('ceo')) {
        appendMsg(`
          <strong>Direct Contact to Founder & CEO Ismail Kazia:</strong><br>
          • 🇸🇦 Saudi WhatsApp/Call: <strong>+966 54 890 5688</strong><br>
          • 🇮🇳 India WhatsApp/Call: <strong>+91 63639 62640</strong><br>
          • 📧 Email: <strong>ismail@gelicon.com</strong><br><br>
          <a href="https://wa.me/966548905688" target="_blank" style="display:inline-block; background:#10B981; color:#000; font-weight:bold; padding:5px 12px; border-radius:6px; text-decoration:none;">WhatsApp Direct Kholein →</a>
        `, 'bot');
      } else if (text.includes('bank') || text.includes('iban') || text.includes('anb') || text.includes('pay') || text.includes('account')) {
        appendMsg(`
          <strong>🏦 Official Saudi Arab National Bank (ANB):</strong><br>
          • <strong>Beneficiary:</strong> Ismail Kazia<br>
          • <strong>Bank:</strong> Arab National Bank (ANB)<br>
          • <strong>Account:</strong> <code>0108039658540010</code><br>
          • <strong>IBAN:</strong> <code style="color:#10B981; font-weight:bold;">SA1730400108039658540010</code><br><br>
          Transfer confirmation WhatsApp: <a href="https://wa.me/966548905688" target="_blank" style="color:#10B981; font-weight:bold;">+966 54 890 5688</a>.
        `, 'bot');
      } else {
        appendMsg(`
          Shukriya! Maine aapka message note kar liya hai: <em>"${raw}"</em>.<br><br>
          Immediate quote aur discussion ke liye Founder Ismail Kazia ke WhatsApp par forward karein:<br>
          <a href="https://wa.me/966548905688?text=${encodeURIComponent('Hello Ismail! Connecting from GELICON website: ' + raw)}" target="_blank" style="display:inline-block; margin-top:6px; background:#10B981; color:#000; font-weight:bold; padding:6px 12px; border-radius:6px; text-decoration:none;">Forward to Ismail Kazia's WhatsApp →</a>
        `, 'bot');
      }
    }, 350);
  }

  // Mount on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountChatUI);
  } else {
    mountChatUI();
  }

  // Expose globally
  window.toggleGeliconChat = toggleChat;
})();
