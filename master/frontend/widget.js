(function () {
    // Check if widget already loaded
    if (window.ApexSalesWidgetLoaded) return;
    window.ApexSalesWidgetLoaded = true;

    const API_BASE = "http://localhost:8000";
    let widgetSessionId = "widget_sess_" + Math.random().toString(36).substring(2, 9);
    let isOpen = false;

    // Inject CSS
    const style = document.createElement("style");
    style.innerHTML = `
        .apex-widget-btn {
            position: fixed;
            bottom: 24px;
            right: 24px;
            width: 60px;
            height: 60px;
            border-radius: 30px;
            background: linear-gradient(135deg, #2563eb, #4f46e5);
            box-shadow: 0 10px 25px -5px rgba(37, 99, 235, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            z-index: 999999;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            color: white;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }
        .apex-widget-btn:hover {
            transform: scale(1.08);
            box-shadow: 0 15px 30px -5px rgba(37, 99, 235, 0.6);
        }
        .apex-widget-window {
            position: fixed;
            bottom: 96px;
            right: 24px;
            width: 380px;
            height: 540px;
            max-width: calc(100vw - 32px);
            background: #0f172a;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);
            display: none;
            flex-direction: column;
            overflow: hidden;
            z-index: 999999;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }
        .apex-widget-header {
            padding: 16px;
            background: #1e293b;
            border-bottom: 1px solid #334155;
            display: flex;
            align-items: center;
            justify-content: space-between;
            color: white;
        }
        .apex-widget-messages {
            flex: 1;
            padding: 16px;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 12px;
            font-size: 13px;
        }
        .apex-msg-agent {
            align-self: flex-start;
            background: #1e293b;
            color: #e2e8f0;
            padding: 10px 14px;
            border-radius: 16px 16px 16px 4px;
            max-width: 82%;
            line-height: 1.45;
            border: 1px solid #334155;
        }
        .apex-msg-user {
            align-self: flex-end;
            background: #2563eb;
            color: white;
            padding: 10px 14px;
            border-radius: 16px 16px 4px 16px;
            max-width: 82%;
            line-height: 1.45;
        }
        .apex-widget-input-bar {
            padding: 12px;
            background: #1e293b;
            border-top: 1px solid #334155;
            display: flex;
            gap: 8px;
        }
        .apex-widget-input {
            flex: 1;
            background: #0f172a;
            border: 1px solid #334155;
            border-radius: 12px;
            padding: 10px 14px;
            color: white;
            font-size: 13px;
            outline: none;
        }
        .apex-widget-send {
            background: #2563eb;
            color: white;
            border: none;
            border-radius: 12px;
            padding: 0 16px;
            font-weight: 600;
            cursor: pointer;
        }
    `;
    document.head.appendChild(style);

    // Create Widget DOM
    const btn = document.createElement("div");
    btn.className = "apex-widget-btn";
    btn.innerHTML = `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>`;

    const windowEl = document.createElement("div");
    windowEl.className = "apex-widget-window";
    windowEl.innerHTML = `
        <div class="apex-widget-header">
            <div style="display:flex;align-items:center;gap:10px;">
                <div style="width:10px;height:10px;border-radius:50%;background:#10b981;"></div>
                <div>
                    <div style="font-weight:bold;font-size:14px;">Apex Sales Closer</div>
                    <div style="font-size:11px;color:#94a3b8;">Online | Instant Quotation & Booking</div>
                </div>
            </div>
            <div id="apex-close-btn" style="cursor:pointer;font-size:18px;color:#94a3b8;">✕</div>
        </div>
        <div class="apex-widget-messages" id="apex-widget-msg-list">
            <div class="apex-msg-agent">
                👋 Hello! Looking to scale your sales or automate your leads? I can answer questions, give custom quotes, or schedule a direct demo!
            </div>
        </div>
        <div class="apex-widget-input-bar">
            <input type="text" class="apex-widget-input" id="apex-widget-input-field" placeholder="Ask anything or request a quote...">
            <button class="apex-widget-send" id="apex-widget-send-btn">Send</button>
        </div>
    `;

    document.body.appendChild(btn);
    document.body.appendChild(windowEl);

    // Toggle
    btn.onclick = () => {
        isOpen = !isOpen;
        windowEl.style.display = isOpen ? "flex" : "none";
    };

    windowEl.querySelector("#apex-close-btn").onclick = () => {
        isOpen = false;
        windowEl.style.display = "none";
    };

    const inputField = windowEl.querySelector("#apex-widget-input-field");
    const sendBtn = windowEl.querySelector("#apex-widget-send-btn");
    const msgList = windowEl.querySelector("#apex-widget-msg-list");

    async function sendMsg() {
        const text = inputField.value.trim();
        if (!text) return;
        inputField.value = "";

        msgList.innerHTML += `<div class="apex-msg-user">${text}</div>`;
        msgList.scrollTop = msgList.scrollHeight;

        try {
            const res = await fetch(`${API_BASE}/api/chat`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ session_id: widgetSessionId, message: text })
            });
            const data = await res.json();
            msgList.innerHTML += `<div class="apex-msg-agent">${data.reply.replace(/\n/g, '<br>')}</div>`;
            msgList.scrollTop = msgList.scrollHeight;
        } catch (e) {
            msgList.innerHTML += `<div class="apex-msg-agent" style="color:#ef4444;">Connecting to server...</div>`;
        }
    }

    sendBtn.onclick = sendMsg;
    inputField.onkeypress = (e) => { if (e.key === "Enter") sendMsg(); };
})();
