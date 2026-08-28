/**
 * GALICON GLOBAL - Interactive Estimator & Multi-Currency Engine
 * Version: 2026.3 (India-First Calibrated)
 * Currencies supported: INR (₹), SAR (ر.س), USD ($), AED (د.إ)
 */

const GALICON_PRICING_CONFIG = {
  // Base Exchange Rates (Pegged & Target Normalized)
  currencies: {
    INR: { symbol: "₹", label: "INR (India)", rate: 1, formatDecimals: 0 },
    USD: { symbol: "$", label: "USD (Global / US)", rate: 0.012, formatDecimals: 0 },
    SAR: { symbol: "SAR ", label: "SAR (Saudi Arabia)", rate: 0.045, formatDecimals: 0 },
    AED: { symbol: "AED ", label: "AED (UAE)", rate: 0.044, formatDecimals: 0 }
  },

  // 4 Core Divisions Base Rates (Defined in INR Baseline - Optimized for Pan-India Conversion)
  divisions: {
    technology: {
      name: "Technology & AI",
      tiers: {
        bugFixing: { name: "Bug Fixing & Emergency Debug Sprint (₹2,999)", basePriceINR: 2999, type: "one-time" },
        pythonAutomation: { name: "Python Automation & Web Scraping Script (₹7,999)", basePriceINR: 7999, type: "one-time" },
        website: { name: "Business Website / Portfolio (5 Pages) (₹14,999)", basePriceINR: 14999, type: "one-time" },
        aiIntegration: { name: "WhatsApp AI Bot / ChatGPT Integration (₹19,999)", basePriceINR: 19999, type: "one-time" },
        ecommerce: { name: "Custom E-Commerce Storefront + Checkout (₹35,000)", basePriceINR: 35000, type: "one-time" },
        mobileApp: { name: "Cross-Platform Mobile App MVP (Android/iOS) (₹65,000)", basePriceINR: 65000, type: "one-time" },
        customSaaS: { name: "Full-Stack Custom Web Portal / SaaS (₹1.5L)", basePriceINR: 150000, type: "one-time" }
      }
    },
    marketing: {
      name: "Marketing & Growth",
      tiers: {
        funnel: { name: "High-Converting Funnel & Tracking Setup (₹14,999)", basePriceINR: 14999, type: "one-time" },
        performance: { name: "Starter Growth Engine (Meta/Google Ads) (₹18,000/mo)", basePriceINR: 18000, type: "monthly" },
        scaleEngine: { name: "Scale Acquisition Partner (₹35,000/mo)", basePriceINR: 35000, type: "monthly" },
        fullFunnel: { name: "Full-Funnel Growth Retainer (₹75,000/mo)", basePriceINR: 75000, type: "monthly" }
      }
    },
    consulting: {
      name: "Business & Consulting",
      tiers: {
        diagnostic: { name: "360° Business Diagnostic Audit (₹4,999)", basePriceINR: 4999, type: "one-time" },
        blueprint: { name: "Complete Business Blueprint & GTM Roadmap (₹24,999)", basePriceINR: 24999, type: "one-time" },
        advisory: { name: "Fractional Strategic Advisory Retainer (₹24,999/mo)", basePriceINR: 24999, type: "monthly" }
      }
    },
    events: {
      name: "Experiences & Productions",
      tiers: {
        workshop: { name: "Corporate Workshop / Meetup AV Setup (₹45,000)", basePriceINR: 45000, type: "project" },
        bangalore: { name: "Bangalore Executive Summit Staging (₹75,000)", basePriceINR: 75000, type: "project" },
        summit: { name: "Turnkey Tech Summit (LED + Sound + 4K) (₹1,80,000)", basePriceINR: 180000, type: "project" },
        vipGala: { name: "VVIP Mega Conclave Staging (₹4,50,000)", basePriceINR: 450000, type: "project" }
      }
    }
  },

  // Add-on Capabilities
  addOns: {
    seoBoost: { name: "100/100 Technical SEO & Schema (+₹5k)", basePriceINR: 5000 },
    userAuth: { name: "User Auth & Permissions (+₹10k)", basePriceINR: 10000 },
    paymentGateway: { name: "Razorpay / UPI Payment Gateway (+₹8k)", basePriceINR: 8000 },
    zatcaKit: { name: "GST & E-Invoicing Automated Setup (+₹10k)", basePriceINR: 10000 },
    crmSync: { name: "Autonomous Lead Scorer Daemon & CRM Sync (+₹15k)", basePriceINR: 15000 },
    videoProduction: { name: "4K Cinematic Aftermovie & Drone (+₹25k)", basePriceINR: 25000 }
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
      
    const targetNumber = "916363962640"; // Direct India Founder Line

    const message = 
      `*GALICON GLOBAL - Project Scope Inquiry*%0A` +
      `--------------------------------%0A` +
      `*Division:* ${total.divisionName}%0A` +
      `*Deliverable:* ${total.tierName} (${total.type})%0A` +
      `*Add-ons:* ${addOnNames}%0A` +
      `*Estimated Price:* ${total.formatted}%0A` +
      `--------------------------------%0A` +
      `Hello Ismail, I would like to lock this scope for our business project. Please share next onboarding steps.`;

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
        billingTypeDisplay.innerText = "Turnkey Execution";
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
