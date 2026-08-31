/**
 * GALICON GLOBAL — LUXURY SALES & CUSTOMER SERVICE AI CONCIERGE CHATBOT
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
    .chat-msg.bot a {
      color: #635BFF;
      text-decoration: underline;
      font-weight: 700;
    }
    .chat-msg.bot .ai-cta-btn {
      display: inline-block;
      margin-top: 8px;
      background: #635BFF;
      color: #FFFFFF !important;
      font-weight: 700;
      padding: 6px 14px;
      border-radius: 20px;
      text-decoration: none !important;
      font-size: 0.8rem;
    }
    .chat-msg.bot .ai-cta-btn:hover {
      background: #0A2540;
    }
    .chat-msg.typing {
      display: flex;
      align-items: center;
      gap: 6px;
      font-style: italic;
      color: #888;
    }
    .typing-dots {
      display: flex;
      gap: 4px;
    }
    .typing-dots span {
      width: 6px;
      height: 6px;
      background: #EAB308;
      border-radius: 50%;
      animation: typingBounce 1.4s infinite ease-in-out both;
    }
    .typing-dots span:nth-child(1) { animation-delay: -0.32s; }
    .typing-dots span:nth-child(2) { animation-delay: -0.16s; }
    @keyframes typingBounce {
      0%, 80%, 100% { transform: scale(0); }
      40% { transform: scale(1); }
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

  // Gemini AI Configuration
  const _k0 = "QVEuQWI4Uk42SkpIc3cySmh6UV90dy1YMW9sNHIyY1V2TWpDVGx4SjNtSW5xc2NwRG12WEE=";
  const GEMINI_API_KEY = typeof atob === 'function' ? atob(_k0) : Buffer.from(_k0, 'base64').toString();
  const GEMINI_MODEL = "gemini-3.5-flash-lite";

  const SYSTEM_INSTRUCTION = `You are the Senior Executive AI Concierge & Sales Director for GALICON GLOBAL (Founder & CEO: Ismail Kazia).
You are extremely smart, professional, persuasive, bilingual (fluent in English, and in conversational Roman Urdu/Hindi if the user speaks Urdu/Hindi), and sales-oriented.

GALICON GLOBAL Divisions & Capabilities:
1. Corporate Event Management & Tech Summits (Bangalore & Pan-India):
   - Venues: The Leela Palace, ITC Gardenia, BIEC Bangalore, JW Marriott.
   - Specs: P2.6 Curved LED walls, line-array concert acoustics, 4K multi-cam broadcast, VIP protocol.
   - Pricing: ₹8.5 Lakh ($10,500) Executive Launchpad | ₹18.5 Lakh ($22,000) Flagship 4K LED | ₹38 Lakh ($45,000) Imperial Mega Conclave.
2. Growth & Performance Marketing (Dubai, Saudi Arabia, UK, USA):
   - HNW Real Estate & B2B Lead Funnels (4.8x verified ROAS).
   - Retainers: $1,450/mo (5,450 SAR) Growth Sprint | $2,950/mo (11,000 SAR) Executive (300 qualified leads) | $5,500/mo Imperial.
3. Custom Tech & AI Application Development:
   - High-speed modern web applications, AI chatbots, WhatsApp CRM closer agents, automations.
   - Pricing: ₹2,999 (Rapid Bug Sprint) | ₹14,999 (Landing Funnel) | ₹19,999 to ₹49,999+ (Full Custom Web/AI System).
4. Direct Executive Contacts:
   - Founder & CEO: Ismail Kazia (WhatsApp: +91 63639 62640 / +966 54 890 5688).
   - Senior Sales Desk Executive: Mr. Ayaan (+91 70158 44885).
   - Direct Meeting / Strategy Scheduler: meet.html

Rules:
- Keep answers crisp, warm, and highly structured with bullet points and bold highlights.
- Always recommend booking a strategy session at meet.html or calling Sales Executive Mr. Ayaan (+91 70158 44885).
- If the user asks about booking, give the link to meet.html.`;

  let conversationHistory = [];

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
          <div class="chat-launcher-text">GALICON Concierge</div>
          <div style="font-size:0.68rem; color:#10B981; font-weight:700;">● Online • Live AI Sales & Support</div>
        </div>
        <span class="chat-launcher-badge">AI 2.0</span>
      </div>

      <!-- Chat Window -->
      <div id="samrat-chat-window">
        <div class="chat-header">
          <div class="chat-header-info">
            <div class="chat-launcher-avatar" style="width:34px;height:34px;font-size:1rem;">👑</div>
            <div>
              <div class="chat-header-name">GALICON AI Concierge</div>
              <div class="chat-header-sub">Direct Line to Founder Ismail Kazia</div>
            </div>
          </div>
          <button class="chat-close-btn" id="samratChatCloseBtn">&times;</button>
        </div>

        <div class="chat-body" id="samratChatBody">
          <div class="chat-msg bot">
            <strong>Marhaba & Welcome to GALICON GLOBAL! 👑</strong><br>
            I am your Executive AI Sales Concierge. How can I assist with your corporate events, performance marketing, or custom AI development today?
          </div>

          <div class="chat-chips" id="samratInitialChips">
            <div class="chat-chip" data-chip="events">🎪 Bangalore Corporate Event (₹8.5L - ₹38L)</div>
            <div class="chat-chip" data-chip="saudi">🇸🇦 Saudi Vision 2030 Conclave / Riyadh Staging</div>
            <div class="chat-chip" data-chip="retainer">📈 Dubai / GCC Growth Retainer ($1,450 - $2,950/mo)</div>
            <div class="chat-chip" data-chip="zatca">🛍️ Buy Saudi ZATCA Phase 2 Kit ($97)</div>
            <div class="chat-chip" data-chip="bank">🏦 Saudi ANB Bank Transfer & IBAN Details</div>
            <div class="chat-chip" data-chip="call">📅 Schedule Strategy Session with Senior Specialist</div>
            <div class="chat-chip" data-chip="sales" style="border-color:#38BDF8; color:#38BDF8;">📞 Call Sales Desk: +91 70158 44885 →</div>
          </div>
        </div>

        <div class="chat-footer">
          <input type="text" id="samratChatInput" class="chat-input" placeholder="Ask anything / Sawaal puchiye..." style="box-sizing:border-box !important; max-width:100% !important;">
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
    return div;
  }

  function showTypingIndicator() {
    const body = document.getElementById('samratChatBody');
    const div = document.createElement('div');
    div.id = 'samratTypingIndicator';
    div.className = 'chat-msg bot typing';
    div.innerHTML = `
      <div class="typing-dots"><span></span><span></span><span></span></div>
      <span>GALICON AI is thinking...</span>
    `;
    body.appendChild(div);
    body.scrollTop = body.scrollHeight;
  }

  function removeTypingIndicator() {
    const el = document.getElementById('samratTypingIndicator');
    if (el) el.remove();
  }

  function formatMarkdown(text) {
    let html = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank">$1</a>')
      .replace(/^\s*[\*\-]\s+(.*)$/gm, '• $1<br>')
      .replace(/\n\n/g, '<br><br>')
      .replace(/\n/g, '<br>');

    // Enhance meet.html links into sleek CTA buttons
    if (html.includes('meet.html') && !html.includes('ai-cta-btn')) {
      html += `<br><a href="meet.html" target="_blank" class="ai-cta-btn">🗓️ Book Strategy Call (meet.html) ➔</a>`;
    }
    return html;
  }

  async function queryGeminiAI(userText) {
    conversationHistory.push({
      role: 'user',
      parts: [{ text: userText }]
    });

    // Keep last 6 conversation turns
    if (conversationHistory.length > 6) {
      conversationHistory = conversationHistory.slice(-6);
    }

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
          contents: conversationHistory
        })
      });

      const data = await response.json();
      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        const aiText = data.candidates[0].content.parts[0].text;
        conversationHistory.push({
          role: 'model',
          parts: [{ text: aiText }]
        });
        return formatMarkdown(aiText);
      }
      throw new Error('Invalid response structure');
    } catch(err) {
      console.warn('Gemini API Error, falling back to local reasoning engine:', err);
      return getFallbackResponse(userText);
    }
  }

  function getFallbackResponse(userText) {
    const text = userText.toLowerCase();
    if (text.includes('event') || text.includes('conference') || text.includes('summit') || text.includes('stage') || text.includes('bangalore')) {
      return `
        <strong>🎪 Bangalore Corporate Event & Tech Summits:</strong><br>
        • <strong>Executive Launchpad:</strong> ₹8.5 Lakh ($10,500)<br>
        • <strong>Flagship 4K LED Summit:</strong> ₹18.5 Lakh ($22,000)<br>
        • <strong>Imperial Arena Conclave:</strong> ₹38 Lakh ($45,000)<br><br>
        <a href="meet.html" target="_blank" class="ai-cta-btn">Schedule Strategy Call (meet.html) ➔</a>
      `;
    } else if (text.includes('price') || text.includes('cost') || text.includes('rate') || text.includes('kitna')) {
      return `
        <strong>💰 GALICON Pricing Overview:</strong><br>
        • <strong>Tech & AI Development:</strong> ₹2,999 to ₹49,999+<br>
        • <strong>Growth Retainers (UAE/KSA):</strong> $1,450 to $2,950 / month<br>
        • <strong>Corporate Events:</strong> ₹8.5L to ₹38L<br><br>
        <a href="calculator.html" target="_blank" class="ai-cta-btn">Open Custom Scope Estimator ➔</a>
      `;
    }
    return `
      Shukriya! Maine aapka query note kar liya hai: <em>"${userText}"</em>.<br><br>
      Aap direct hamare Senior Sales Desk Executive <strong>Mr. Ayaan (+91 70158 44885)</strong> se baat kar sakte hain ya calendar slot book karein:<br>
      <a href="meet.html" target="_blank" class="ai-cta-btn">Book 30-Min Strategy Call ➔</a>
    `;
  }

  function processChip(type) {
    if (type === 'events') {
      appendMsg("Bangalore corporate event packages ki details chahiye.", "user");
      showTypingIndicator();
      setTimeout(async () => {
        const resp = await queryGeminiAI("Give me complete details, venues, and pricing for Bangalore corporate event management & tech summit staging.");
        removeTypingIndicator();
        appendMsg(resp, "bot");
      }, 400);
    } else if (type === 'saudi') {
      appendMsg("Saudi Vision 2030 Conclave & Riyadh staging details.", "user");
      showTypingIndicator();
      setTimeout(async () => {
        const resp = await queryGeminiAI("Tell me about Saudi Vision 2030 conclaves, VIP staging in Riyadh, and local Saudi bank payment options.");
        removeTypingIndicator();
        appendMsg(resp, "bot");
      }, 400);
    } else if (type === 'retainer') {
      appendMsg("Dubai / GCC Growth Marketing Retainers ki details chahiye.", "user");
      showTypingIndicator();
      setTimeout(async () => {
        const resp = await queryGeminiAI("Explain Dubai / GCC Growth Marketing retainers ($1,450 to $2,950/mo) and verified 4.8x ROAS for real estate.");
        removeTypingIndicator();
        appendMsg(resp, "bot");
      }, 400);
    } else if (type === 'zatca') {
      appendMsg("Saudi ZATCA Phase 2 Kit ($97) buy karna hai.", "user");
      setTimeout(() => {
        appendMsg(`
          <strong>⚡ Saudi ZATCA Phase 2 Master Kit 2026:</strong><br>
          Includes XML UBL 2.1 templates, cryptographic stamps, API payload blueprints.<br>
          • <strong>Price:</strong> $97 (365 SAR • ₹7,999)<br>
          • Instant download after payment via Mada, STC Pay ya ANB Bank!<br><br>
          👉 <a href="products.html" target="_blank" class="ai-cta-btn">Buy from Digital Store ➔</a>
        `, "bot");
      }, 300);
    } else if (type === 'bank') {
      appendMsg("Bank details aur IBAN chahiye.", "user");
      setTimeout(() => {
        appendMsg(`
          <strong>🏦 Official Saudi Arab National Bank (ANB):</strong><br>
          • <strong>Beneficiary:</strong> Ismail Kazia<br>
          • <strong>Bank:</strong> Arab National Bank (ANB)<br>
          • <strong>Account:</strong> <code>0108039658540010</code><br>
          • <strong>IBAN:</strong> <code style="color:#10B981; font-weight:bold;">SA1730400108039658540010</code><br><br>
          Transfer confirmation WhatsApp: <a href="https://wa.me/966548905688" target="_blank" style="color:#10B981; font-weight:bold;">+966 54 890 5688</a>.
        `, "bot");
      }, 300);
    } else if (type === 'call') {
      appendMsg("Senior Sales Specialist ke saath meeting book karni hai.", "user");
      setTimeout(() => {
        appendMsg(`
          <strong>📅 30-Minute Strategic Consultation:</strong><br>
          Aap direct video meeting slot hamare booking page se reserve kar sakte hain:<br><br>
          <a href="meet.html" target="_blank" class="ai-cta-btn">Open Booking Page (meet.html) ➔</a>
        `, "bot");
      }, 300);
    } else if (type === 'sales') {
      appendMsg("Senior Sales Officer Mr. Ayaan ko call karna hai.", "user");
      setTimeout(() => {
        appendMsg(`
          <strong>📞 Direct Sales Desk Assistance:</strong><br>
          Aap hamare Sales Executive Officer <strong>Mr. Ayaan</strong> se directly baat kar sakte hain:<br><br>
          <a href="tel:+917015844885" style="display:inline-block; background:#10B981; color:#000; font-weight:bold; padding:8px 18px; border-radius:20px; text-decoration:none;">Call Mr. Ayaan (+91 70158 44885) ➔</a>
        `, "bot");
      }, 300);
    }
  }

  async function handleSend() {
    const input = document.getElementById('samratChatInput');
    const raw = input.value.trim();
    if (!raw) return;

    appendMsg(raw, 'user');
    input.value = '';

    showTypingIndicator();

    const aiResponseHtml = await queryGeminiAI(raw);
    removeTypingIndicator();
    appendMsg(aiResponseHtml, 'bot');
  }

  // Mount on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountChatUI);
  } else {
    mountChatUI();
  }

  // Expose globally
  window.toggleGaliconChat = toggleChat;
})();
