/**
 * GALICON GLOBAL - Interactive Estimator & Multi-Currency Engine
 * Version: 2026.1
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
        diagnostic: { name: "Business Diagnostic", basePriceINR: 22000, type: "one-time" },
        blueprint: { name: "Business Blueprint (GTM)", basePriceINR: 75000, type: "one-time" },
        advisory: { name: "Strategic Advisory Retainer", basePriceINR: 45000, type: "monthly" }
      }
    },
    marketing: {
      name: "Marketing & Growth",
      tiers: {
        funnel: { name: "Funnel & Tracking Setup", basePriceINR: 45000, type: "one-time" },
        performance: { name: "Performance Engine (Meta/Google)", basePriceINR: 50000, type: "monthly" },
        fullFunnel: { name: "Full-Funnel Growth Retainer", basePriceINR: 125000, type: "monthly" }
      }
    },
    technology: {
      name: "Technology & AI",
      tiers: {
        portal: { name: "Commercial Web Portal", basePriceINR: 85000, type: "one-time" },
        aiAutomation: { name: "Custom AI Chatbot & Automation", basePriceINR: 140000, type: "one-time" },
        devops: { name: "DevOps & Maintenance Retainer", basePriceINR: 35000, type: "monthly" }
      }
    },
    events: {
      name: "Experiences & Productions",
      tiers: {
        bangalore: { name: "Bangalore Executive Staging", basePriceINR: 175000, type: "project" },
        dubai: { name: "Dubai Corporate Summit", basePriceINR: 500000, type: "project" },
        riyadh: { name: "Riyadh VIP Gala & Activation", basePriceINR: 1000000, type: "project" }
      }
    }
  },

  // Add-on Capabilities
  addOns: {
    zatcaKit: { name: "ZATCA Phase 2 Kit", basePriceINR: 22000 },
    crmSync: { name: "Custom CRM & Lead Scorer Daemon", basePriceINR: 35000 },
    translationBooths: { name: "Simultaneous Translation Booths (AV)", basePriceINR: 65000 },
    videoProduction: { name: "4K Cinematic Aftermovie & Drone", basePriceINR: 45000 }
  }
};

class GaliconEstimator {
  constructor() {
    this.selectedCurrency = "INR";
    this.selectedDivision = "marketing";
    this.selectedTier = "performance";
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
    const tier = division.tiers[this.selectedTier];

    let totalINR = tier.basePriceINR;

    this.selectedAddOns.forEach(addOnKey => {
      totalINR += GALICON_PRICING_CONFIG.addOns[addOnKey].basePriceINR;
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
      .map(k => GALICON_PRICING_CONFIG.addOns[k].name)
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
    if (billingTypeDisplay) billingTypeDisplay.innerText = total.type === "monthly" ? "/ month" : "(Fixed Estimate)";
    if (waButton) waButton.href = this.generateWhatsAppUrl();
  }
}

// Window load initializer
document.addEventListener("DOMContentLoaded", () => {
  window.galiconCalc = new GaliconEstimator();
  window.galiconCalc.render();
});
