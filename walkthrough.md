# GALICON GLOBAL — Corporate Staging & Lifecycle Platform Walkthrough
**Founder: Ismail Kazia | Production Release 2.6**

---

## 🚀 What Was Built & Deployed Live (v2.6)

### 1. 🛍️ Dynamic B2B Solutions Portfolio (`products.html`)
Live URL: [https://ismailkazia302-bot.github.io/samrat-global/products.html](https://ismailkazia302-bot.github.io/samrat-global/products.html)

Integrated 4 premium interactive tab panels mapping to GALICON's core business verticals:
- 🚀 **Advisory & Setup:** Business Diagnostic (₹22k / SAR 1,200), Business Blueprint (₹75k / SAR 4,200), Strategic Advisory (₹45k/mo).
- 📈 **Performance Marketing:** Funnel Architecture (₹45k / SAR 2,500), Performance Engine (₹50k/mo), Full-Funnel Growth (₹1.25L/mo).
- 🖥️ **Technology & AI:** Commercial Portal (₹85k / SAR 4,500), AI Custom Automation (₹1.4L / SAR 7,500), Tech & DevOps Retainer (₹35k/mo).
- 🎪 **Experiences & Events:** Bangalore Executive Summit (₹1.75L base), Dubai Corporate Gala (AED 22,000 / Approx. ₹5L), Riyadh VIP Summit (SAR 45,000+ custom).

### 2. 🧩 Decoupled Navbar & Footer Components (`nav_loader.js`)
- Replaced duplicated hardcoded headers and footers across all **19 HTML pages** with clean placeholders (`#navbar-placeholder` and `#footer-placeholder`).
- Created a centralized injection module (`nav_loader.js`) that automatically resolves directory depths (root, `/services/`, and `/blog/`) and manages active link highlights.

### 💼 3. Unified Business Lifecycle Framework (`index.html`)
- Injected a visual **Lifecycle Platform** panel on the home page displaying the 6 phases of enterprise growth: **START → GROW → OPERATE → FINANCE → TECHNOLOGY → EXPAND**.
- Aligned GALICON's brand message with the core principle: "We solve business challenges across the complete lifecycle."

### ⚙️ 4. Unified Dropdown Estimator Widget (`calculator.html`)
- Refactored the interactive staging calculator into a compact card-based estimator form using dropdowns for Division and Package Tier selection.
- Linked the DOM elements directly to `galicon_pricing_engine.js` so it automatically tracks:
  - Selected currency transformations (**INR, SAR, USD, AED**).
  - Multi-add-on state selections (ZATCA Phase 2 Kit, CRM Sync Daemon, Translation Booths, Video Production).
  - WhatsApp pre-filled quotes routed directly to Founder Ismail Kazia.
