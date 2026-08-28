/**
 * GALICON GLOBAL — Universal Attribution & Conversion Tracker
 * Captures First-Touch and Last-Touch UTM parameters, referrer, and user journey.
 * Logs high-intent conversion actions into localStorage & backend CRM payload.
 */
(function() {
  const STORAGE_KEY = 'galicon_attribution';

  function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const utmData = {};
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid'].forEach(key => {
      if (params.get(key)) utmData[key] = params.get(key);
    });
    return utmData;
  }

  function initAttribution() {
    const currentUtms = getUrlParams();
    let stored = {};
    try {
      stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    } catch(e) {}

    // First Touch (Permanent until converted)
    if (!stored.first_touch && Object.keys(currentUtms).length > 0) {
      stored.first_touch = {
        ...currentUtms,
        landing_page: window.location.pathname,
        referrer: document.referrer || 'direct',
        timestamp: new Date().toISOString()
      };
    } else if (!stored.first_touch) {
      stored.first_touch = {
        utm_source: 'organic_or_direct',
        landing_page: window.location.pathname,
        referrer: document.referrer || 'direct',
        timestamp: new Date().toISOString()
      };
    }

    // Last Touch (Updated on each campaign click)
    if (Object.keys(currentUtms).length > 0) {
      stored.last_touch = {
        ...currentUtms,
        landing_page: window.location.pathname,
        timestamp: new Date().toISOString()
      };
    }

    stored.visit_count = (stored.visit_count || 0) + 1;
    stored.last_page = window.location.pathname;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
    } catch(e) {}
  }

  // Global helper for form submissions
  window.getGaliconAttribution = function() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    } catch(e) {
      return {};
    }
  };

  // Lead Scoring Algorithm
  window.calculateGaliconLeadScore = function(lead) {
    let score = 50; // Base score
    const budget = String(lead.budget || lead.packageSelected || '').toLowerCase();
    const phone = String(lead.phone || '').trim();

    if (budget.includes('5,000+') || budget.includes('2,50,000') || budget.includes('enterprise') || budget.includes('vip')) {
      score += 35;
    } else if (budget.includes('1,500') || budget.includes('1,00,000') || budget.includes('scale')) {
      score += 20;
    }

    if (phone.length >= 10) score += 15;
    if (lead.email && !lead.email.includes('gmail.com') && !lead.email.includes('yahoo.com')) {
      score += 15; // Corporate email domain bonus
    }

    if (score >= 80) return { score, tier: 'HOT' };
    if (score >= 60) return { score, tier: 'WARM' };
    return { score, tier: 'COLD' };
  };

  document.addEventListener('DOMContentLoaded', initAttribution);
})();
