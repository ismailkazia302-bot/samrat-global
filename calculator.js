/**
 * GALICON GLOBAL - Interactive Estimator & Multi-Currency Engine
 * Version: 2026.2
 * Currencies supported: INR (₹), SAR (ر.س), USD ($), AED (د.إ)
 */

const GALICON_PRICING_CONFIG = {
  // Base Exchange Rates (Pegged & Target Normalized)
  currencies: {
    INR: { symbol: "₹", label: "INR (India)", rate: 1, formatDecimals: 0 },
    SAR: { symbol: "SAR ", label: "SAR (Saudi Arabia)", rate: 0.045, formatDecimals: 0 },
    USD: { symbol: "$", label: "USD (Global / US / UK)", rate: 0.012, formatDecimals: 0 },
    AED: { symbol: "AED ", label: "AED (UAE)", rate: 0.044, formatDecimals: 0 }
  },

  // 4 Core Divisions Base Rates (Defined in INR Baseline)
  divisions: {
    consulting: {
      name: "Business & Consulting",
      tiers: {
        diagnostic: { name: "Business Diagnostic (₹22k)", basePriceINR: 22000, type: "one-time" },
        blueprint: { name: "Business Blueprint & GTM (₹75k)", basePriceINR: 75000, type: "one-time" },
        advisory: { name: "Strategic Advisory Retainer (₹45k/mo)", basePriceINR: 45000, type: "monthly" }
      }
    },
    marketing: {
      name: "Marketing & Growth",
      tiers: {
        funnel: { name: "Funnel & Tracking Architecture (₹45k)", basePriceINR: 45000, type: "one-time" },
        performance: { name: "Performance Engine (₹50k/mo)", basePriceINR: 50000, type: "monthly" },
        fullFunnel: { name: "Full-Funnel Growth Partner (₹1.25L/mo)", basePriceINR: 125000, type: "monthly" }
      }
    },
    technology: {
      name: "Technology & AI",
      tiers: {
        website: { name: "Website Development (Business / E-comm / Portfolio) (₹45k)", basePriceINR: 45000, type: "one-time" },
        mobileApp: { name: "Mobile App Development (Android & iOS) (₹2.2L)", basePriceINR: 220000, type: "one-time" },
        pythonAutomation: { name: "Python Automation & Web Scraping Scripts (₹35k)", basePriceINR: 35000, type: "one-time" },
        bugFixing: { name: "Bug Fixing & Code Troubleshooting Sprint (₹20k)", basePriceINR: 20000, type: "one-time" },
        aiIntegration: { name: "AI Integrations & ChatGPT / LLM Tools (₹65k)", basePriceINR: 65000, type: "one-time" },
        customSaaS: { name: "Enterprise Custom Web Portal / SaaS (₹4.5L)", basePriceINR: 450000, type: "one-time" }
      }
    },
    events: {
      name: "Experiences & Productions",
      tiers: {
        bangalore: { name: "Bangalore Executive Staging (₹1.75L)", basePriceINR: 175000, type: "project" },
        dubai: { name: "Dubai Corporate Summit (₹5L)", basePriceINR: 500000, type: "project" },
        riyadh: { name: "Riyadh VIP Gala & Activation (₹10L)", basePriceINR: 1000000, type: "project" }
      }
    }
  },

  // Add-on Capabilities
  addOns: {
    seoBoost: { name: "100/100 Technical SEO & Schema Audit", basePriceINR: 20000 },
    zatcaKit: { name: "ZATCA Phase 2 E-Invoicing Kit", basePriceINR: 22000 },
    crmSync: { name: "Autonomous Lead Scorer Daemon & CRM Sync", basePriceINR: 35000 },
    translationBooths: { name: "Simultaneous Translation Booths (AV)", basePriceINR: 65000 },
    videoProduction: { name: "4K Cinematic Aftermovie & Drone", basePriceINR: 45000 }
  }
};

class GaliconEstimator {
  constructor() {
    this.selectedCurrency = "INR";
    this.selectedDivision = "technology";
    this.selectedTier = "website";
    this.selectedAddOns = new Set();
  }

  setCurrency(currencyCode) {
    if (GALICON_PRICING_CONFIG.currencies[currencyCode]) {
      this.selectedCurrency = currencyCode;
      this.render();
    }
  }

  setDivisionAndTier(divisionKey, tierKey) {
    this.selectedDivision = divisionKey;
    this.selectedTier = tierKey;
    this.render();
  }

  toggleAddOn(addOnKey) {
    if (this.selectedAddOns.has(addOnKey)) {
      this.selectedAddOns.delete(addOnKey);
    } else {
      this.selectedAddOns.add(addOnKey);
    }
    this.render();
  }

  calculateTotal() {
    const curr = GALICON_PRICING_CONFIG.currencies[this.selectedCurrency];
    const division = GALICON_PRICING_CONFIG.divisions[this.selectedDivision];
    const tier = division.tiers[this.selectedTier] || Object.values(division.tiers)[0];

    let totalINR = tier.basePriceINR;

    this.selectedAddOns.forEach(addOnKey => {
      if (GALICON_PRICING_CONFIG.addOns[addOnKey]) {
        totalINR += GALICON_PRICING_CONFIG.addOns[addOnKey].basePriceINR;
      }
    });

    const convertedPrice = Math.round(totalINR * curr.rate);
    return {
      formatted: `${curr.symbol}${convertedPrice.toLocaleString()}`,
      numeric: convertedPrice,
      type: tier.type,
      tierName: tier.name,
      divisionName: division.name
    };
  }

  generateWhatsAppUrl() {
    const total = this.calculateTotal();
    const addOnNames = Array.from(this.selectedAddOns)
      .map(k => GALICON_PRICING_CONFIG.addOns[k] ? GALICON_PRICING_CONFIG.addOns[k].name : k)
      .join(", ") || "None";
      
    // Route to India WhatsApp if INR selected, else KSA WhatsApp
    const targetNumber = this.selectedCurrency === "INR" ? "916363962640" : "966548905688";

    const message = 
      `*GALICON GLOBAL - Estimate Inquiry*%0A` +
      `--------------------------------%0A` +
      `*Division:* ${total.divisionName}%0A` +
      `*Package:* ${total.tierName} (${total.type})%0A` +
      `*Selected Add-ons:* ${addOnNames}%0A` +
      `*Estimated Price:* ${total.formatted}%0A` +
      `--------------------------------%0A` +
      `Hello Ismail, I would like to confirm project scope and schedule a strategy onboarding session.`;

    return `https://wa.me/${targetNumber}?text=${message}`;
  }

  render() {
    const total = this.calculateTotal();
    const priceDisplay = document.getElementById("estimated-price-display");
    const billingTypeDisplay = document.getElementById("billing-type-label");
    const waButton = document.getElementById("whatsapp-export-btn");

    if (priceDisplay) priceDisplay.innerText = total.formatted;
    if (billingTypeDisplay) {
      if (total.type === "monthly") {
        billingTypeDisplay.innerText = "Monthly Retainer + Setup";
      } else if (total.type === "project") {
        billingTypeDisplay.innerText = "Turnkey Project Execution";
      } else {
        billingTypeDisplay.innerText = "Fixed Sprint Execution";
      }
    }
    if (waButton) waButton.href = this.generateWhatsAppUrl();
  }
}

// Global exposure
window.galiconCalc = new GaliconEstimator();
document.addEventListener("DOMContentLoaded", () => {
  if (typeof updateTiersDropdown === 'function') {
    const divSelect = document.getElementById('divisionSelect');
    if (divSelect) updateTiersDropdown(divSelect.value);
  }
  window.galiconCalc.render();
});
