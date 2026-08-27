/**
 * SAMRAT WORLDWIDE — SALES & CUSTOMER SERVICE CONCIERGE CHATBOT
 * Founder & CEO: Ismail Kazia
 * 
 * Focus: High-Ticket B2B Sales, Event Booking, Retainers & Instant WhatsApp Support.
 */

(function() {
  // Inject CSS if not already present
  if (!document.getElementById('samrat-chat-css')) {
    const link = document.createElement('link');
    link.id = 'samrat-chat-css';
    link.rel = 'stylesheet';
    // Use relative path or absolute path based on location
    link.href = (window.location.pathname.includes('/services/') || window.location.pathname.includes('/blog/')) ? '../chatbot.css' : 'chatbot.css';
    document.head.appendChild(link);
  }

  // Create Chat Launcher & Window
  const chatContainer = document.createElement('div');
  chatContainer.innerHTML = `
    <!-- Floating Launcher -->
    <div id="samrat-chat-launcher" onclick="toggleSamratChat()">
      <div class="chat-launcher-avatar">
        👑
        <div class="chat-online-dot"></div>
      </div>
      <div class="d-none d-sm-block">
        <div class="chat-launcher-text">SAMRAT Concierge</div>
        <div style="font-size:0.68rem; color:#10B981; font-weight:700;">● Online • Quick Sales & Support</div>
      </div>
      <span class="chat-launcher-badge">VIP</span>
    </div>

    <!-- Chat Window -->
    <div id="samrat-chat-window">
      <div class="chat-header">
        <div class="chat-header-info">
          <div class="chat-launcher-avatar" style="width:34px;height:34px;font-size:1rem;">👑</div>
          <div>
            <div class="chat-header-name">SAMRAT Executive Concierge</div>
            <div class="chat-header-sub">Direct Line to Founder Ismail Kazia</div>
          </div>
        </div>
        <button class="chat-close-btn" onclick="toggleSamratChat()">&times;</button>
      </div>

      <div class="chat-body" id="samratChatBody">
        <div class="chat-msg bot">
          <strong>Marhaba & Welcome to SAMRAT WORLDWIDE! 👑</strong><br>
          I am your executive sales concierge. How can we assist your enterprise or brand today?
        </div>

        <div class="chat-chips" id="samratInitialChips">
          <div class="chat-chip" onclick="handleChip('events')">🎪 Book Bangalore Corporate Event (₹8.5L - ₹38L)</div>
          <div class="chat-chip" onclick="handleChip('saudi')">🇸🇦 Saudi Vision 2030 Conclave / Riyadh Staging</div>
          <div class="chat-chip" onclick="handleChip('retainer')">📈 Dubai / GCC Growth Retainer ($1,450 - $2,950/mo)</div>
          <div class="chat-chip" onclick="handleChip('zatca')">🛍️ Buy Saudi ZATCA Phase 2 Kit ($97)</div>
          <div class="chat-chip" onclick="handleChip('bank')">🏦 Saudi ANB Bank Transfer & IBAN Details</div>
          <div class="chat-chip" onclick="handleChip('call')">📅 Schedule 30-Min Call with Ismail Kazia</div>
          <div class="chat-chip" onclick="handleChip('wa')" style="border-color:#10B981; color:#10B981;">💬 Direct WhatsApp with Founder Ismail Kazia →</div>
        </div>
      </div>

      <div class="chat-footer">
        <input type="text" id="samratChatInput" class="chat-input" placeholder="Type your inquiry or phone..." onkeypress="handleKeyPress(event)">
        <button class="chat-send-btn" onclick="sendMessage()">Send</button>
      </div>
    </div>
  `;
  document.body.appendChild(chatContainer);
})();

function toggleSamratChat() {
  const win = document.getElementById('samrat-chat-window');
  win.classList.toggle('open');
  if (win.classList.contains('open')) {
    setTimeout(() => {
      document.getElementById('samratChatInput').focus();
    }, 300);
  }
}

function handleKeyPress(e) {
  if (e.key === 'Enter') {
    sendMessage();
  }
}

function appendMessage(text, sender) {
  const body = document.getElementById('samratChatBody');
  const msg = document.createElement('div');
  msg.className = `chat-msg ${sender}`;
  msg.innerHTML = text;
  body.appendChild(msg);
  body.scrollTop = body.scrollHeight;
}

function handleChip(type) {
  if (type === 'events') {
    appendMessage("I would like to explore Bangalore Corporate Event packages.", "user");
    setTimeout(() => {
      appendMessage(`
        <strong>🎪 Bangalore Tech Summit & Event Packages:</strong><br>
        • <strong>Executive Launchpad:</strong> ₹ 8.5 Lakh ($10,500) • 250 pax<br>
        • <strong>Flagship Tech Summit:</strong> ₹ 18.5 Lakh ($22,000) • P2.6 Curved LED + 4K Broadcast<br>
        • <strong>Imperial Conclave:</strong> ₹ 38 Lakh ($45,000) • 1,000+ pax arena staging<br><br>
        Would you like to review our <a href="proposal_template.html" target="_blank" style="color:#EAB308; font-weight:bold;">Proposal Lookbook</a> or connect directly with Founder Ismail Kazia?
        <div class="mt-2">
          <a href="https://wa.me/916363962640?text=Hi%20Ismail!%20Inquiring%20about%20Bangalore%20Corporate%20Event%20Packages." target="_blank" class="btn btn-sm text-dark fw-bold" style="background:#25D366; font-size:0.75rem;">Chat on WhatsApp India →</a>
        </div>
      `, "bot");
    }, 400);
  } else if (type === 'saudi') {
    appendMessage("Inquiring about Saudi Vision 2030 Conclaves & Riyadh events.", "user");
    setTimeout(() => {
      appendMessage(`
        <strong>🇸🇦 Saudi Arabia Turnkey Staging & Conclaves:</strong><br>
        We produce high-level summits in <strong>Riyadh & Jeddah</strong> for Vision 2030 initiatives, giga-projects, and private enterprise congregrations.<br>
        • Bilingual Arabic/English interpretation suites<br>
        • VIP protocol & diplomatic staging<br>
        • Direct local Saudi bank wire (ANB Bank)<br><br>
        <a href="https://wa.me/966548905688?text=Marhaba%20Ismail!%20We%20need%20event%20staging%20in%20Riyadh/Jeddah." target="_blank" class="btn btn-sm text-dark fw-bold" style="background:#10B981; font-size:0.75rem;">Connect on Saudi WhatsApp (+966 54 890 5688) →</a>
      `, "bot");
    }, 400);
  } else if (type === 'retainer') {
    appendMessage("Tell me about Dubai & GCC Growth Marketing Retainers.", "user");
    setTimeout(() => {
      appendMessage(`
        <strong>📈 GCC High-Net-Worth Performance Retainers:</strong><br>
        • <strong>Growth Sprint:</strong> $1,450 / month (5,450 SAR • AED 5,300)<br>
        • <strong>Executive Performance:</strong> $2,950 / month (11,000 SAR • AED 10,800) • 300 Leads + WhatsApp CRM<br>
        • <strong>Imperial Authority:</strong> $5,500 / month (20,600 SAR)<br><br>
        Average ROAS on recent Dubai real estate campaigns: <strong>4.8x</strong>.<br>
        <a href="meet.html" class="btn btn-sm text-dark fw-bold mt-2" style="background:#EAB308; font-size:0.75rem;">Book 30-Min Strategy Call →</a>
      `, "bot");
    }, 400);
  } else if (type === 'zatca') {
    appendMessage("I want to buy the Saudi ZATCA Phase 2 Kit ($97).", "user");
    setTimeout(() => {
      appendMessage(`
        <strong>⚡ Saudi ZATCA Phase 2 Compliance Kit 2026:</strong><br>
        Complete cryptographic API blueprints, XML UBL 2.1 templates, and fine-protection protocols.<br>
        • <strong>Price:</strong> $97 (365 SAR • ₹7,999)<br>
        • <strong>Payment:</strong> Instant Saudi Mada / STC Pay / ANB Bank Transfer.<br><br>
        <a href="products.html" class="btn btn-sm text-dark fw-bold" style="background:#EAB308; font-size:0.75rem;">Instant Checkout on Store →</a>
      `, "bot");
    }, 400);
  } else if (type === 'bank') {
    appendMessage("What are your Saudi Bank Transfer / IBAN details?", "user");
    setTimeout(() => {
      appendMessage(`
        <strong>🏦 Official Saudi Arab National Bank (ANB):</strong><br>
        • <strong>Beneficiary:</strong> Ismail Kazia<br>
        • <strong>Bank:</strong> Arab National Bank (ANB)<br>
        • <strong>Account:</strong> <code>0108039658540010</code><br>
        • <strong>IBAN:</strong> <code style="color:#10B981;">SA1730400108039658540010</code><br><br>
        After transferring, send screenshot to WhatsApp: <a href="https://wa.me/966548905688" target="_blank" style="color:#10B981; font-weight:bold;">+966 54 890 5688</a>.
      `, "bot");
    }, 400);
  } else if (type === 'call') {
    appendMessage("I want to schedule a 30-min call with Ismail Kazia.", "user");
    setTimeout(() => {
      appendMessage(`
        <strong>📅 1-on-1 Strategy Session with Founder Ismail Kazia:</strong><br>
        You can book a live 30-minute Google Meet slot directly on our calendar:<br><br>
        <a href="meet.html" class="btn btn-sm text-dark fw-bold" style="background:#10B981; font-size:0.75rem;">Open Booking Page (meet.html) →</a>
      `, "bot");
    }, 400);
  } else if (type === 'wa') {
    window.open("https://wa.me/966548905688?text=Hello%20Founder%20Ismail%20Kazia!%20Connecting%20from%20SAMRAT%20website.", "_blank");
  }
}

function sendMessage() {
  const input = document.getElementById('samratChatInput');
  const text = input.value.trim();
  if (!text) return;

  appendMessage(text, 'user');
  input.value = '';

  const lower = text.toLowerCase();

  setTimeout(() => {
    if (lower.includes('price') || lower.includes('cost') || lower.includes('package') || lower.includes('fees')) {
      appendMessage(`
        Our packages are tiered by production scale:<br>
        • <strong>Events:</strong> ₹8.5 Lakh to ₹38 Lakh ($10k - $45k)<br>
        • <strong>Marketing Retainers:</strong> $1,450 to $2,950 / month<br>
        • <strong>Digital Kits:</strong> $29 to $97<br><br>
        Would you like a custom proposal? <a href="https://wa.me/966548905688?text=Hi%20Ismail,%20please%20send%20me%20a%20custom%20pricing%20quote." target="_blank" style="color:#10B981; font-weight:bold;">Click here to message Founder Ismail directly</a>.
      `, 'bot');
    } else if (lower.includes('saudi') || lower.includes('riyadh') || lower.includes('jeddah') || lower.includes('ksa') || lower.includes('sar')) {
      appendMessage(`
        We operate directly in <strong>Riyadh and Jeddah</strong> with complete 4K staging, diplomatic protocol, and local ANB banking.<br>
        Connect with our Saudi desk: <a href="https://wa.me/966548905688" target="_blank" style="color:#10B981; font-weight:bold;">+966 54 890 5688</a>.
      `, 'bot');
    } else if (lower.includes('bangalore') || lower.includes('event') || lower.includes('stage') || lower.includes('led')) {
      appendMessage(`
        SAMRAT is Bangalore's premier technical staging partner (Leela Palace, ITC Gardenia, BIEC) with P2.6 Curved LED walls & concert-grade audio.<br>
        Connect with our Bangalore desk: <a href="https://wa.me/916363962640" target="_blank" style="color:#25D366; font-weight:bold;">+91 63639 62640</a>.
      `, 'bot');
    } else if (lower.includes('phone') || lower.includes('contact') || lower.includes('email') || lower.includes('whatsapp') || lower.includes('number')) {
      appendMessage(`
        <strong>Direct Contact to Founder Ismail Kazia:</strong><br>
        • 🇸🇦 Saudi WhatsApp/Call: <strong>+966 54 890 5688</strong><br>
        • 🇮🇳 India WhatsApp/Call: <strong>+91 63639 62640</strong><br>
        • 📧 Email: <strong>ismail@samratglobal.com</strong><br><br>
        <a href="https://wa.me/966548905688" target="_blank" class="btn btn-sm text-dark fw-bold" style="background:#10B981; font-size:0.75rem;">Open WhatsApp Chat Now →</a>
      `, 'bot');
    } else {
      appendMessage(`
        Thank you for your message! To get an immediate quote or confirmation from <strong>Founder Ismail Kazia</strong>, please click below to send this directly to his priority WhatsApp:
        <div class="mt-2">
          <a href="https://wa.me/966548905688?text=${encodeURIComponent('Hello Ismail! I visited the SAMRAT website: ' + text)}" target="_blank" class="btn btn-sm text-dark fw-bold" style="background:#10B981; font-size:0.75rem;">
            Forward to Ismail Kazia's WhatsApp →
          </a>
        </div>
      `, 'bot');
    }
  }, 500);
}
