// Session management
let currentSessionId = "sess_" + Math.random().toString(36).substring(2, 9);

document.addEventListener("DOMContentLoaded", () => {
    if (window.lucide) {
        lucide.createIcons();
    }
    loadAnalytics();
    loadLeads();
    loadProducts();
    loadSettings();
    initChatWelcome();
});

function switchTab(tabId) {
    document.querySelectorAll(".tab-view").forEach(el => el.classList.add("hidden"));
    document.querySelectorAll(".tab-btn").forEach(btn => {
        btn.classList.remove("bg-blue-600", "text-white", "shadow");
        btn.classList.add("text-gray-400");
    });

    const activeView = document.getElementById(`view-${tabId}`);
    const activeBtn = document.getElementById(`tab-${tabId}`);
    if (activeView) activeView.classList.remove("hidden");
    if (activeBtn) {
        activeBtn.classList.add("bg-blue-600", "text-white", "shadow");
        activeBtn.classList.remove("text-gray-400");
    }

    if (tabId === "crm") loadLeads();
    if (tabId === "products") loadProducts();
    if (window.lucide) lucide.createIcons();
}

// Fetch Analytics
async function loadAnalytics() {
    try {
        const res = await fetch("/api/analytics");
        if (!res.ok) return;
        const data = await res.json();
        document.getElementById("stat-total-leads").innerText = data.total_leads || 0;
        document.getElementById("stat-deals-won").innerText = data.deals_won || 0;
        document.getElementById("stat-bookings").innerText = data.total_bookings || 0;
        document.getElementById("stat-quotes").innerText = data.total_quotations || 0;
        document.getElementById("stat-conversion").innerText = data.conversion_rate || "0%";
        document.getElementById("stat-pipeline").innerText = data.pipeline_value || "$0";
    } catch (e) {
        console.error("Analytics fetch error:", e);
    }
}

// Format message text with markdown bold, links, lists
function formatMarkdown(text) {
    let formatted = text
        .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
        .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" class="text-blue-400 underline font-medium hover:text-blue-300">$1</a>')
        .replace(/\n\n/g, '<br><br>')
        .replace(/\n/g, '<br>');
    return formatted;
}

// Chat functions
function initChatWelcome() {
    const container = document.getElementById("chat-messages");
    container.innerHTML = `
        <div class="flex items-start space-x-3">
            <div class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">AX</div>
            <div class="bg-gray-900 border border-gray-800 rounded-2xl rounded-tl-none p-4 text-xs text-gray-200 leading-relaxed shadow-lg max-w-[85%]">
                Salam & Welcome! Main <strong class="text-blue-400">Alex</strong> hoon — Apex AI Solutions ka Senior AI Sales Partner. 🚀<br><br>
                Hum businesses ki sales aur lead generation ko 24/7 automate karte hain. Aapka business kis industry mein hai aur is waqt lead generation ya sales closing mein sabse bada challenge kya aa raha hai?
            </div>
        </div>
    `;
}

function resetChat() {
    currentSessionId = "sess_" + Math.random().toString(36).substring(2, 9);
    initChatWelcome();
    document.getElementById("live-lead-contact").innerText = "Detecting in chat...";
    document.getElementById("live-lead-score").innerText = "Score: 20/100";
    document.getElementById("live-tools-log").innerHTML = `
        <div class="p-2.5 rounded-lg bg-gray-900/80 border border-gray-800 flex items-start space-x-2">
            <i data-lucide="check-circle" class="w-4 h-4 text-emerald-400 mt-0.5"></i>
            <div>
                <span class="font-semibold text-white">Session Reset</span>
                <p class="text-gray-400">New customer session initialized.</p>
            </div>
        </div>
    `;
    if (window.lucide) lucide.createIcons();
}

function sendQuickMessage(text) {
    document.getElementById("chat-input").value = text;
    handleChatSubmit(new Event("submit"));
}

async function handleChatSubmit(e) {
    if (e) e.preventDefault();
    const input = document.getElementById("chat-input");
    const userMsg = input.value.trim();
    if (!userMsg) return;

    input.value = "";
    const container = document.getElementById("chat-messages");

    // Add User Message
    container.innerHTML += `
        <div class="flex items-start justify-end space-x-3">
            <div class="bg-blue-600 rounded-2xl rounded-tr-none p-4 text-xs text-white leading-relaxed shadow-lg max-w-[80%]">
                ${userMsg}
            </div>
            <div class="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">YOU</div>
        </div>
    `;
    container.scrollTop = container.scrollHeight;

    // Add Typing Indicator
    const typingId = "typing-" + Date.now();
    container.innerHTML += `
        <div id="${typingId}" class="flex items-start space-x-3">
            <div class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">AX</div>
            <div class="bg-gray-900 border border-gray-800 rounded-2xl rounded-tl-none p-3 text-xs text-gray-400 flex items-center space-x-2">
                <span class="w-2 h-2 rounded-full bg-blue-400 animate-bounce"></span>
                <span class="w-2 h-2 rounded-full bg-blue-400 animate-bounce [animation-delay:0.2s]"></span>
                <span class="w-2 h-2 rounded-full bg-blue-400 animate-bounce [animation-delay:0.4s]"></span>
                <span class="text-[11px] text-gray-400 ml-1">Analyzing sales intent...</span>
            </div>
        </div>
    `;
    container.scrollTop = container.scrollHeight;

    try {
        const res = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                session_id: currentSessionId,
                message: userMsg
            })
        });

        const data = await res.json();
        const typingEl = document.getElementById(typingId);
        if (typingEl) typingEl.remove();

        // Add Assistant Message
        container.innerHTML += `
            <div class="flex items-start space-x-3">
                <div class="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">AX</div>
                <div class="bg-gray-900 border border-gray-800 rounded-2xl rounded-tl-none p-4 text-xs text-gray-200 leading-relaxed shadow-lg max-w-[85%]">
                    ${formatMarkdown(data.reply)}
                </div>
            </div>
        `;
        container.scrollTop = container.scrollHeight;

        // Update Lead Intel & Tool Logs
        updateLiveLeadIntel(data);
        loadAnalytics();
    } catch (err) {
        console.error("Chat error:", err);
        const typingEl = document.getElementById(typingId);
        if (typingEl) typingEl.remove();
    }
}

function updateLiveLeadIntel(data) {
    if (data.lead_detected) {
        const ent = data.lead_detected;
        if (ent.email || ent.phone || ent.name) {
            document.getElementById("live-lead-contact").innerText = `${ent.name || 'Client'} (${ent.email || ent.phone || 'Captured'})`;
            document.getElementById("live-lead-score").innerText = "Score: 75/100";
            document.getElementById("live-lead-score").className = "px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30";
        }
        if (ent.budget) {
            document.getElementById("live-lead-budget").innerText = ent.budget;
        }
    }

    if (data.tool_action) {
        const toolsLog = document.getElementById("live-tools-log");
        let actionTitle = data.tool_action;
        let actionDetail = JSON.stringify(data.tool_data || {});

        if (data.tool_action === "schedule_meeting") {
            actionTitle = "📅 Calendar Demo Scheduled";
            actionDetail = `Booked slot with confirmation for ${data.tool_data?.details?.lead_name || 'Client'}`;
        } else if (data.tool_action === "generate_quotation") {
            actionTitle = `📄 Proposal Quote Issued (${data.tool_data?.quote_number})`;
            actionDetail = `Package: ${data.tool_data?.product} — Final Price: ${data.tool_data?.final_price}`;
        } else if (data.tool_action === "apply_discount") {
            actionTitle = "💰 VIP Fast-Action Discount Applied";
            actionDetail = `Authorized 15% discount code CLOSENOW (Price: ${data.tool_data?.final_price})`;
        }

        toolsLog.innerHTML = `
            <div class="p-2.5 rounded-lg bg-blue-950/40 border border-blue-800/40 flex items-start space-x-2">
                <i data-lucide="zap" class="w-4 h-4 text-amber-400 mt-0.5"></i>
                <div>
                    <span class="font-semibold text-white">${actionTitle}</span>
                    <p class="text-gray-400">${actionDetail}</p>
                </div>
            </div>
        ` + toolsLog.innerHTML;
        if (window.lucide) lucide.createIcons();
    }
}

// CRM Kanban Board
async function loadLeads() {
    try {
        const res = await fetch("/api/leads");
        if (!res.ok) return;
        const leads = await res.json();

        const stages = ["New Lead", "Qualified", "Demo Booked", "Proposal Sent", "Won", "Lost"];
        const counts = { "New Lead": 0, "Qualified": 0, "Demo Booked": 0, "Proposal Sent": 0, "Won": 0, "Lost": 0 };

        // Clear columns
        document.querySelectorAll(".column-cards").forEach(col => col.innerHTML = "");

        leads.forEach(lead => {
            const stage = lead.stage || "New Lead";
            if (counts[stage] !== undefined) counts[stage]++;

            const col = document.querySelector(`.column-cards[data-stage="${stage}"]`);
            if (col) {
                const card = document.createElement("div");
                card.className = "p-3 rounded-xl bg-gray-950/80 border border-gray-800 hover:border-gray-700 transition shadow-sm space-y-2 text-xs";
                
                const scoreColor = lead.lead_score >= 80 ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" :
                                   lead.lead_score >= 50 ? "text-blue-400 bg-blue-500/10 border-blue-500/20" : "text-gray-400 bg-gray-800";

                card.innerHTML = `
                    <div class="flex items-center justify-between">
                        <span class="font-bold text-white text-sm">${lead.name || 'Anonymous Lead'}</span>
                        <span class="px-2 py-0.5 rounded-full text-[10px] font-bold border ${scoreColor}">Score: ${lead.lead_score}</span>
                    </div>
                    <div class="text-gray-400 text-[11px] space-y-0.5">
                        ${lead.company ? `<div class="text-gray-300 font-medium font-mono text-[10px]">🏢 ${lead.company}</div>` : ''}
                        ${lead.email ? `<div>✉️ ${lead.email}</div>` : ''}
                        ${lead.phone ? `<div>📞 ${lead.phone}</div>` : ''}
                        ${lead.budget ? `<div class="text-amber-400 font-semibold">💵 Budget: ${lead.budget}</div>` : ''}
                    </div>
                    ${lead.notes ? `<div class="text-gray-400 italic bg-gray-900 p-1.5 rounded border border-gray-800 text-[10px]">${lead.notes}</div>` : ''}
                    
                    <div class="pt-2 border-t border-gray-800 flex items-center justify-between">
                        <select onchange="updateLeadStage(${lead.id}, this.value)" class="bg-gray-900 border border-gray-700 text-gray-300 rounded px-2 py-1 text-[10px] focus:outline-none">
                            ${stages.map(s => `<option value="${s}" ${s === stage ? 'selected' : ''}>${s}</option>`).join('')}
                        </select>
                        <button onclick="deleteLead(${lead.id})" class="text-gray-500 hover:text-rose-400 transition text-[10px]">Delete</button>
                    </div>
                `;
                col.appendChild(card);
            }
        });

        // Update count badges
        stages.forEach(s => {
            const countEl = document.getElementById(`count-${s}`);
            if (countEl) countEl.innerText = counts[s];
        });
    } catch (e) {
        console.error("Load leads error:", e);
    }
}

async function updateLeadStage(leadId, newStage) {
    try {
        await fetch(`/api/leads/${leadId}/stage`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ stage: newStage })
        });
        loadLeads();
        loadAnalytics();
    } catch (e) {
        console.error("Update stage error:", e);
    }
}

async function deleteLead(leadId) {
    if (!confirm("Are you sure you want to delete this lead?")) return;
    try {
        await fetch(`/api/leads/${leadId}`, { method: "DELETE" });
        loadLeads();
        loadAnalytics();
    } catch (e) {
        console.error("Delete lead error:", e);
    }
}

// Product Catalog
async function loadProducts() {
    try {
        const res = await fetch("/api/products");
        if (!res.ok) return;
        const products = await res.json();
        const container = document.getElementById("products-list-container");
        container.innerHTML = "";

        products.forEach(p => {
            const card = document.createElement("div");
            card.className = "glass-card rounded-2xl p-6 border border-gray-800 flex flex-col justify-between space-y-4";
            
            const featuresList = (p.features || []).map(f => `<li class="flex items-center space-x-2 text-gray-300"><i data-lucide="check" class="w-3.5 h-3.5 text-emerald-400"></i><span>${f}</span></li>`).join('');
            
            card.innerHTML = `
                <div class="space-y-3">
                    <div class="flex items-center justify-between">
                        <span class="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">${p.category}</span>
                        <div class="text-xl font-bold text-white">${p.currency} $${p.price}</div>
                    </div>
                    <h3 class="text-lg font-bold text-white">${p.name}</h3>
                    <p class="text-xs text-gray-400">${p.description}</p>
                    <ul class="space-y-1.5 text-xs pt-2">${featuresList}</ul>
                </div>
                <div class="pt-4 border-t border-gray-800 flex items-center justify-between">
                    <span class="text-[11px] text-gray-500 font-mono">Target: ${p.target_audience || 'All B2B'}</span>
                    <button onclick="deleteProduct(${p.id})" class="text-xs text-rose-400 hover:text-rose-300">Remove</button>
                </div>
            `;
            container.appendChild(card);
        });
        if (window.lucide) lucide.createIcons();
    } catch (e) {
        console.error("Load products error:", e);
    }
}

async function deleteProduct(prodId) {
    if (!confirm("Remove this product from catalog?")) return;
    try {
        await fetch(`/api/products/${prodId}`, { method: "DELETE" });
        loadProducts();
    } catch (e) {
        console.error("Delete product error:", e);
    }
}

// Settings
async function loadSettings() {
    try {
        const res = await fetch("/api/settings");
        if (!res.ok) return;
        const settings = await res.json();
        if (settings.agent_name) {
            document.getElementById("setting_agent_name").value = settings.agent_name;
            document.getElementById("chat-agent-title").innerText = settings.agent_name;
        }
        if (settings.business_name) document.getElementById("setting_business_name").value = settings.business_name;
        if (settings.calendar_link) document.getElementById("setting_calendar_link").value = settings.calendar_link;
        if (settings.max_discount_allowed) document.getElementById("setting_max_discount_allowed").value = settings.max_discount_allowed;
        if (settings.gemini_api_key) document.getElementById("setting_gemini_api_key").value = settings.gemini_api_key;
        if (settings.openai_api_key) document.getElementById("setting_openai_api_key").value = settings.openai_api_key;
    } catch (e) {
        console.error("Load settings error:", e);
    }
}

async function saveSettingsForm(e) {
    e.preventDefault();
    const settings = {
        agent_name: document.getElementById("setting_agent_name").value,
        business_name: document.getElementById("setting_business_name").value,
        calendar_link: document.getElementById("setting_calendar_link").value,
        max_discount_allowed: document.getElementById("setting_max_discount_allowed").value,
        gemini_api_key: document.getElementById("setting_gemini_api_key").value,
        openai_api_key: document.getElementById("setting_openai_api_key").value,
    };

    try {
        const res = await fetch("/api/settings", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ settings })
        });
        if (res.ok) {
            alert("✅ Settings successfully updated!");
            loadSettings();
        }
    } catch (e) {
        console.error("Save settings error:", e);
    }
}

function copyEmbedCode() {
    const snippet = document.getElementById("embed-code-snippet").innerText;
    navigator.clipboard.writeText(snippet);
    const label = document.getElementById("copy-btn-label");
    label.innerText = "Copied!";
    setTimeout(() => { label.innerText = "Copy Code"; }, 2000);
}
