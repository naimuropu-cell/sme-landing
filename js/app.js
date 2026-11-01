/**
 * YES SME - Enterprise Cloud ERP & POS Landing Page Controller
 * Handles Bilingual Translation Engine, Interactive Dashboard Mockup,
 * Plan Recommender, Pricing Cards, Comparison Table, FAQ Accordion, and Modals.
 */

// Global State
const STATE = {
  currentLang: localStorage.getItem('yes_sme_lang') || 'en',
  advisor: {
    bizType: 'single',
    outlets: '1'
  }
};

/**
 * ============================================================================
 * EMAIL & LEAD NOTIFICATION CONFIGURATION
 * Configure where demo requests and customer inquiries are sent.
 * ============================================================================
 */
const EMAIL_CONFIG = {
  // Option 1: Web3Forms (Recommended - 100% Free, Zero Backend, Instant Email)
  // Step 1: Go to https://web3forms.com and type info@yesbangladesh.net
  // Step 2: Paste the Access Key you receive here:
  web3formsAccessKey: '', 

  // Option 2: Custom Server Endpoint (e.g. 'send-lead.php' or '/api/send-lead')
  customEndpoint: '',

  // Company Notification Recipient
  recipientEmail: 'info@yesbangladesh.net'
};

/**
 * Dispatch lead data via Web3Forms API, custom backend endpoint, or local simulation
 */
async function dispatchLeadNotification(leadData) {
  // 1. Web3Forms Live Integration
  if (EMAIL_CONFIG.web3formsAccessKey && EMAIL_CONFIG.web3formsAccessKey.length > 5) {
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          access_key: EMAIL_CONFIG.web3formsAccessKey,
          from_name: 'YES SME Landing Page',
          subject: `⚡ New Lead: ${leadData.fullName || leadData.type || 'Demo Request'} (${leadData.phone || ''})`,
          ...leadData
        })
      });
      const result = await response.json();
      return result.success;
    } catch (err) {
      console.warn('Web3Forms dispatch error:', err);
    }
  }

  // 2. Custom Endpoint Integration (PHP / Node / Vercel API)
  if (EMAIL_CONFIG.customEndpoint) {
    try {
      const res = await fetch(EMAIL_CONFIG.customEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadData)
      });
      return res.ok;
    } catch (err) {
      console.warn('Custom endpoint error:', err);
    }
  }

  // 3. Fallback: Log to console in development
  console.log('📬 [YES SME Lead Captured]:', leadData);
  return true;
}

/**
 * 1. BILINGUAL TRANSLATION ENGINE
 */
function initTranslations() {
  const toggleBtn = document.getElementById('langToggleBtn');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const newLang = STATE.currentLang === 'en' ? 'bn' : 'en';
      setLanguage(newLang);
    });
  }

  const mobileToggleBtn = document.getElementById('mobileLangToggleBtn');
  if (mobileToggleBtn) {
    mobileToggleBtn.addEventListener('click', () => {
      const newLang = STATE.currentLang === 'en' ? 'bn' : 'en';
      setLanguage(newLang);
    });
  }

  setLanguage(STATE.currentLang);
}

function setLanguage(lang) {
  STATE.currentLang = lang;
  localStorage.setItem('yes_sme_lang', lang);

  // Set body language class safely without wiping other classes (like mobile-menu-active)
  document.body.classList.remove('lang-en', 'lang-bn');
  document.body.classList.add(`lang-${lang}`);

  // Update button labels
  const labelSpan = document.getElementById('langToggleLabel');
  if (labelSpan) {
    labelSpan.textContent = lang === 'en' ? 'বাংলায় দেখুন' : 'View in English';
  }

  const mobileLabelSpan = document.getElementById('mobileLangToggleLabel');
  if (mobileLabelSpan) {
    mobileLabelSpan.textContent = lang === 'en' ? 'বাংলায় দেখুন' : 'View in English';
  }

  // Update all data-i18n elements
  const dict = window.TRANSLATIONS ? window.TRANSLATIONS[lang] : null;
  if (!dict) return;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = dict[key];
      } else {
        el.innerHTML = dict[key];
      }
    }
  });

  // Re-calculate plan advisor text and dynamic cards
  if (typeof updateAdvisorResult === 'function') updateAdvisorResult();
  if (typeof initPricingCards === 'function') initPricingCards();
  if (typeof initEnterpriseCard === 'function') initEnterpriseCard();
  if (typeof initComparisonTable === 'function') initComparisonTable();
  if (typeof updateComparisonDrawerLanguage === 'function') updateComparisonDrawerLanguage(lang);
  if (typeof updateHeroChatbotLanguage === 'function') updateHeroChatbotLanguage(lang);
  if (typeof updateTestimonialsLanguage === 'function') updateTestimonialsLanguage(lang);
  if (typeof updateFaqLanguage === 'function') updateFaqLanguage(lang);
  if (typeof updateMposAnimationLanguage === 'function') updateMposAnimationLanguage(lang);
}

/**
 * 2. INTERACTIVE DASHBOARD TABS CONTROLLER
 */
function initDashboardTabs() {
  const tabButtons = document.querySelectorAll('.mockup-tab-btn');
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab-target');
      switchDashboardTab(targetId);
    });
  });

  // Quick module shortcuts that switch tabs
  document.querySelectorAll('[data-tab-switch]').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab-switch');
      switchDashboardTab(targetId);
    });
  });
}

function switchDashboardTab(targetId) {
  document.querySelectorAll('.mockup-tab-btn').forEach(btn => {
    const isActive = btn.getAttribute('data-tab-target') === targetId;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
  });

  document.querySelectorAll('.mockup-view-panel').forEach(panel => {
    panel.classList.toggle('active', panel.id === targetId);
  });
}

/**
 * 3. NAVBAR SCROLL ELEVATION
 */
function initNavbarScroll() {
  const nav = document.getElementById('siteHeader');
  if (!nav) return;

  const onScroll = () => {
    if (window.scrollY > 20) {
      nav.classList.add('is-scrolled');
    } else {
      nav.classList.remove('is-scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/**
 * 4. PLAN ADVISOR CONTROLLER (Monthly Packages & Setup Fees)
 */
function initAdvisor() {
  const bizGroup = document.getElementById('advisorBizTypeGroup');
  const outletGroup = document.getElementById('advisorOutletsGroup');

  if (bizGroup) {
    bizGroup.querySelectorAll('.advisor-option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        bizGroup.querySelectorAll('.advisor-option-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        STATE.advisor.bizType = btn.getAttribute('data-biz-type');
        updateAdvisorResult();
      });
    });
  }

  if (outletGroup) {
    outletGroup.querySelectorAll('.advisor-counter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        outletGroup.querySelectorAll('.advisor-counter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        STATE.advisor.outlets = btn.getAttribute('data-outlets');
        updateAdvisorResult();
      });
    });
  }

  updateAdvisorResult();
}

function updateAdvisorResult() {
  const nameEl = document.getElementById('advisorPlanName');
  const priceEl = document.getElementById('advisorPlanPrice');
  const periodEl = document.getElementById('advisorPricePeriod') || document.querySelector('.rec-price-period');
  const setupEl = document.getElementById('advisorSetupFee');
  const descEl = document.getElementById('advisorPlanDesc');
  const featuresListEl = document.getElementById('advisorFeaturesList');
  const popularTag = document.getElementById('advisorPopularTag');
  const selectBtn = document.getElementById('advisorSelectBtn');

  if (!nameEl || !priceEl || !descEl || !selectBtn) return;

  const isBn = STATE.currentLang === 'bn';
  const { bizType, outlets } = STATE.advisor;

  let planId = 'basic';
  let planName = '';
  let priceHtml = '';
  let setupText = '';
  let descText = '';
  let isPopular = false;
  let showPeriod = true;
  let features = [];

  if (bizType === 'enterprise' || outlets === '10') {
    planId = 'custom';
    planName = isBn ? 'কাস্টম এন্টারপ্রাইজ' : 'Custom Enterprise';
    priceHtml = isBn ? 'আলোচনা সাপেক্ষে' : 'Custom Quote';
    showPeriod = false;
    setupText = isBn ? 'অন-ডিমান্ড প্রাইভেট ডেডিকেটেড ক্লাউড' : 'Dedicated Private Cloud Infrastructure';
    descText = isBn
      ? 'বড় রিটেল চেইন, একাধিক ওয়্যারহাউজ এবং নিজস্ব সার্ভার সিকিউরিটির জন্য সম্পূর্ণ কাস্টমাইজড ইআরপি।'
      : 'Tailored for large multi-branch chains, dedicated private cloud infrastructure & custom ERP integrations.';
    features = isBn ? [
      'আনলিমিটেড প্রোডাক্ট ও আনলিমিটেড ব্রাঞ্চ',
      'প্রাইভেট ক্লাউড ডেডিকেটেড ভিপিএস হোস্টিং',
      'কাস্টম এপিআই ও ইআরপি ইন্টিগ্রেশন সাপোর্ট',
      '২৪/৭ ডেডিকেটেড কী অ্যাকাউন্ট ম্যানেজার',
      'অন-সাইট স্টাফ ট্রেনিং ও ডেডিকেটেড এসএলএ'
    ] : [
      'Unlimited Products & Unlimited Branches',
      'Dedicated High-Performance Cloud VPS',
      'Custom API & Enterprise ERP Integrations',
      '24/7 Dedicated Key Account Manager',
      'On-site Staff Training & Enterprise SLA'
    ];
  } else if (bizType === 'chain' || outlets === '5') {
    planId = 'high';
    planName = isBn ? 'হাই প্যাকেজ' : 'High Plan';
    priceHtml = isBn ? '<span class="currency-taka">&#2547;</span>৩,০০০' : '<span class="currency-taka">&#2547;</span>3,000';
    setupText = isBn ? 'এককালীন সেটআপ ফি: <span class="currency-taka">&#2547;</span>১৫,০০০' : 'One-time setup fee: <span class="currency-taka">&#2547;</span>15,000';
    descText = isBn
      ? '৫টি ব্রাঞ্চ পর্যন্ত সেন্ট্রাল ম্যানেজমেন্ট, আনলিমিটেড প্রোডাক্ট ও এআই বিজনেস অ্যানালিটিক্স।'
      : 'Includes up to 5 branch live sync, 500 products, branded mobile apps, and AI business intelligence.';
    features = isBn ? [
      '৫০০ প্রোডাক্ট ও ৫টি আউটলেট সেন্ট্রাল কন্ট্রোল',
      'কাস্টম অ্যান্ড্রয়েড ও আইওএস মোবাইল অ্যাপ',
      'সকল কুরিয়ার অটো বুকিং ও পেমেন্ট রিকনসিলিয়েশন',
      'অ্যাডভান্সড ডাবল-এন্ট্রি একাউন্টিং ও লাভ-ক্ষতি খাতা',
      'স্বয়ংক্রিয় ক্লাউড ব্যাকআপ ও প্রায়োরিটি সাপোর্ট'
    ] : [
      '500 Products & 5 Outlets Central Control',
      'Custom Branded Android & iOS Mobile Apps',
      'All Courier Integrations & COD Reconciliation',
      'Advanced Double-Entry Accounting & P&L',
      'Automated Cloud Backup & VIP Priority Support'
    ];
  } else if (bizType === 'ecommerce' || outlets === '2') {
    planId = 'medium';
    planName = isBn ? 'মিডিয়াম প্যাকেজ' : 'Medium Plan';
    isPopular = true;
    priceHtml = isBn ? '<span class="currency-taka">&#2547;</span>২,০০০' : '<span class="currency-taka">&#2547;</span>2,000';
    setupText = isBn ? 'এককালীন সেটআপ ফি: <span class="currency-taka">&#2547;</span>৮,০০০' : 'One-time setup fee: <span class="currency-taka">&#2547;</span>8,000';
    descText = isBn
      ? '২টি ব্রাঞ্চ, নিজস্ব ই-কমার্স ওয়েবসাইট, কাস্টম অ্যান্ড্রয়েড ও আইওএস মোবাইল অ্যাপ এবং সকল কুরিয়ার সাপোর্ট।'
      : 'Includes 2 branches, dedicated e-commerce storefront, custom branded iOS/Android apps, and multi-courier dispatch.';
    features = isBn ? [
      '৩৫০ প্রোডাক্ট ও ২টি ব্রাঞ্চ লাইভ সিঙ্ক',
      'ফ্রি ডেডিকেটেড ই-কমার্স ওয়েবসাইট',
      'ডেডিকেটেড মোবাইল অ্যাপস (Android & iOS)',
      'বিকাশ, নগদ ও এসএসএল পেমেন্ট গেটওয়ে',
      'পাঠাও, স্টিডফাস্ট ও রেডএক্স কুরিয়ার ১-ক্লিকে বুকিং'
    ] : [
      '350 Products & 2 Branches Live Sync',
      'Free Dedicated E-Commerce Web Storefront',
      'Dedicated Mobile Apps (Android & iOS)',
      'bKash, Nagad & SSL Payment Gateway',
      'Pathao, Steadfast & REDX 1-Click Dispatch'
    ];
  } else {
    // Single outlet
    planId = 'basic';
    planName = isBn ? 'বেসিক প্যাকেজ' : 'Basic Plan';
    priceHtml = isBn ? '<span class="currency-taka">&#2547;</span>১,০০০' : '<span class="currency-taka">&#2547;</span>1,000';
    setupText = isBn ? 'এককালীন সেটআপ ফি: <span class="currency-taka">&#2547;</span>৫,০০০' : 'One-time setup fee: <span class="currency-taka">&#2547;</span>5,000';
    descText = isBn
      ? 'স্মার্ট অফলাইন পিওএস, স্বয়ংক্রিয় বারকোড প্রিন্টিং, ক্যাশবুক ও সিঙ্গেল কুরিয়ার ইন্টিগ্রেশন।'
      : 'Smart offline POS billing, automatic barcode generation, cashbook accounting, and courier integration.';
    features = isBn ? [
      '২৫০ প্রোডাক্ট ও ১টি স্টোর ফুল কন্ট্রোল',
      'স্মার্ট পিওএস ও অফলাইন সিঙ্ক (নেট ছাড়াই বিলিং)',
      'ফ্রি ওয়েবসাইট অন্তর্ভুক্ত',
      '১টি কুরিয়ার ইন্টিগ্রেশন (পাঠাও অথবা স্টিডফাস্ট)',
      'ক্যাশ বুক, ব্যাংক বুক ও এনবিআর মূসক ৬.৩ হিসাব'
    ] : [
      '250 Products & 1 Store Full Control',
      'Smart POS & Offline Sync (Billing without net)',
      'Free Website Included',
      '1 Courier Integration (Pathao or Steadfast)',
      'Cash Book, Bank Book & NBR Mushak 6.3 Tax'
    ];
  }

  nameEl.textContent = planName;
  priceEl.innerHTML = priceHtml;
  setupEl.innerHTML = setupText;
  descEl.textContent = descText;

  if (periodEl) {
    if (showPeriod) {
      periodEl.style.display = '';
      periodEl.textContent = isBn ? '/ মাস' : '/ month';
    } else {
      periodEl.style.display = 'none';
    }
  }

  if (popularTag) {
    popularTag.style.display = isPopular ? 'inline-block' : 'none';
  }

  if (featuresListEl) {
    featuresListEl.innerHTML = features.map(f => `
      <li class="advisor-feat-item">
        <span class="feat-check">✔</span>
        <span>${f}</span>
      </li>
    `).join('');
  }

  selectBtn.setAttribute('data-plan-id', planId);
}


document.addEventListener('DOMContentLoaded', () => {
  initTranslations();
  initDashboardTabs();
  initAdvisor();
  initPricingCards();
  initEnterpriseCard();
  initComparisonTable();
  initComparisonDrawer();
  initFaqAccordion();
  initContactModal();
  initOfficeVisitModal();
  initMobileNav();
  initRampInteractiveStage();
  initTableSearch();
  initNavbarScroll();
  initModulesFilter();
  initPosInteractiveSandbox();
  initIndustryTabs();
  initSpotlightConsole();
  initHeroChatbot();
  initTestimonialsSlider();
  initMobilePosBanner();
  initMposAnimation();

  // Floating & Footer Back To Top Buttons
  const footerBackToTopBtn = document.getElementById('footerBackToTopBtn');
  if (footerBackToTopBtn) {
    footerBackToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  const floatingBackToTop = document.getElementById('floatingBackToTopBtn');
  if (floatingBackToTop) {
    function toggleFloatingBackToTop() {
      if (window.scrollY > 280) {
        floatingBackToTop.classList.add('visible');
      } else {
        floatingBackToTop.classList.remove('visible');
      }
    }
    window.addEventListener('scroll', toggleFloatingBackToTop, { passive: true });
    toggleFloatingBackToTop();

    floatingBackToTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

});

// SVG Icons helper
const ICONS = {
  checkCircle: `<span class="check-icon" aria-hidden="true"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor"><path d="M5 10.5L8.5 14L15 6" stroke-linecap="round" stroke-linejoin="round"/></svg></span>`,
  tableCheck: `<span class="val-check" title="Included" aria-label="Included"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor"><path d="M5 10.5L8.5 14L15 6" stroke-linecap="round" stroke-linejoin="round"/></svg></span>`,
  tableCross: `<span class="val-cross" title="Not Included" aria-label="Not Included">—</span>`,
  infoCircle: `<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" width="14" height="14"><circle cx="10" cy="10" r="8" stroke-width="1.8"/><path d="M10 9v5m0-8h.01" stroke-width="2" stroke-linecap="round"/></svg>`,
  chevronDown: `<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" width="16" height="16"><path d="M5 7.5L10 12.5L15 7.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  server: `<svg viewBox="0 0 20 20" fill="none" stroke="currentColor"><rect x="3" y="4" width="14" height="4" rx="1.5" stroke-width="1.7"/><rect x="3" y="12" width="14" height="4" rx="1.5" stroke-width="1.7"/><path d="M6 6h.01M6 14h.01" stroke-width="2" stroke-linecap="round"/></svg>`,
  box: `<svg viewBox="0 0 20 20" fill="none" stroke="currentColor"><path d="M10 2.5L17 6.5v7l-7 4-7-4v-7l7-4z" stroke-width="1.6"/><path d="M3 6.5l7 4 7-4M10 10.5v7" stroke-width="1.6"/></svg>`,
  users: `<svg viewBox="0 0 20 20" fill="none" stroke="currentColor"><circle cx="7.5" cy="6.5" r="3" stroke-width="1.7"/><path d="M2.5 16.5a5 5 0 0110 0" stroke-width="1.7"/><path d="M14 4.5a3 3 0 010 6m-1 6a4.5 4.5 0 004.5-4.5" stroke-width="1.7"/></svg>`,
  activity: `<svg viewBox="0 0 20 20" fill="none" stroke="currentColor"><path d="M3 10h3.5l2.5-6 3 12 2.5-6H17" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  branch: `<svg viewBox="0 0 20 20" fill="none" stroke="currentColor"><path d="M3 7l7-4 7 4v9a1 1 0 01-1 1H4a1 1 0 01-1-1V7z" stroke-width="1.6"/><path d="M7 17v-6h6v6" stroke-width="1.6"/></svg>`,
  cloud: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  globe: `<svg viewBox="0 0 20 20" fill="none" stroke="currentColor"><circle cx="10" cy="10" r="7.5" stroke-width="1.7"/><path d="M2.5 10h15M10 2.5a12.5 12.5 0 010 15 12.5 12.5 0 010-15" stroke-width="1.6"/></svg>`
};

/**
 * 1. Render Pricing Cards (4-column layout)
 */

// Current billing state: 'monthly' or 'annual'
let currentBillingCycle = 'monthly';

// Bilingual translations for Pricing Packages
const BN_PACKAGE_META = {
  starter: {
    name: "স্টার্টার",
    tagline: "ক্ষুদ্র দোকান ও স্টার্টআপদের ডিজিটাইজেশনের প্রাথমিক সমাধান।",
    ctaText: "স্টার্টার বেছে নিন",
    limits: {
      products: "২০০ প্রোডাক্ট",
      hosting: "শেয়ার্ড ক্লাউড",
      storage: "১ জিবি স্টোরেজ",
      store: "১টি স্টোর",
      users: "২ জন অ্যাডমিন"
    },
    highlights: [
      "সাপ্লায়ার ও পারচেজ ইনভেন্টরি ম্যানেজমেন্ট",
      "ব্যাংক ও মোবাইল ব্যাংকিং (বিকাশ/নগদ) হিসাব",
      "বেসিক স্টক ও ডেইলি সেলস সামারি",
      "সহজ স্টক অ্যাডজাস্টমেন্ট ও ওপেনিং স্টক",
      "স্বয়ংক্রিয় এআই সেলস রিপোর্টিং",
      "গ্রাহকের বাকি আদায়ে অটো এসএমএস অ্যালার্ট",
      "স্মার্টফোন ও পিসি রেসপনসিভ অ্যাডমিন প্যানেল"
    ]
  },
  basic: {
    name: "বেসিক",
    tagline: "দ্রুত বর্ধনশীল একক রিটেল শপের অফলাইন পিওএস ও একাউন্টিং সমাধান।",
    ctaText: "বেসিক বেছে নিন",
    limits: {
      products: "২৫০ প্রোডাক্ট",
      hosting: "ভিপিএস ক্লাউড",
      storage: "২ জিবি স্টোরেজ",
      store: "১টি স্টোর",
      users: "৫ জন অ্যাডমিন",
      website: "ফ্রি ওয়েবসাইট"
    },
    highlights: [
      "স্টার্টার প্যাকেজের সকল সুবিধা অন্তর্ভুক্ত",
      "স্মার্ট পিওএস ও অফলাইন সিঙ্ক (নেট ছাড়াই বিলিং)",
      "১টি কুরিয়ার ইন্টিগ্রেশন (পাঠাও অথবা স্টিডফাস্ট)",
      "সেলস রিটার্ন ও এক্সচেঞ্জ প্রসেসিং",
      "স্বয়ংক্রিয় বারকোড ও থার্মাল লেবেল প্রিন্টিং",
      "ক্যাশ বুক, ব্যাংক বুক ও পেটি ক্যাশ খাতা",
      "দৈনিক খরচ ট্র্যাকিং ও এনবিআর মূসক ৬.৩ হিসাব"
    ]
  },
  medium: {
    name: "মিডিয়াম",
    tagline: "মাল্টি-ব্রাঞ্চ শোরুম, স্বয়ংক্রিয় একাউন্টিং ও কুরিয়ার লজিস্টিকসের সেরা প্যাকেজ।",
    ctaText: "মিডিয়াম বেছে নিন",
    limits: {
      products: "৩৫০ প্রোডাক্ট",
      hosting: "AWS এন্টারপ্রাইজ",
      storage: "৪ জিবি স্টোরেজ",
      branches: "২টি ব্রাঞ্চ",
      users: "১০ জন অ্যাডমিন",
      website: "ফ্রি ওয়েবসাইট"
    },
    highlights: [
      "বেসিক প্যাকেজের সকল সুবিধা অন্তর্ভুক্ত",
      "ফ্রি ডেডিকেটেড ই-কমার্স ওয়েবসাইট",
      "ডেডিকেটেড মোবাইল অ্যাপস (অ্যান্ড্রয়েড ও আইওএস)",
      "অনলাইন পেমেন্ট গেটওয়ে (বিকাশ, নগদ, এসএসএল)",
      "পাঠাও, স্টিডফাস্ট ও রেডএক্স কুরিয়ার ১-ক্লিকে বুকিং",
      "অ্যাডভান্সড ডাবল-এন্ট্রি একাউন্টিং ও লাভ-ক্ষতি খাতা",
      "মাল্টি-ওয়্যারহাউজ স্টক ও ইন্টার-ব্রাঞ্চ চালান",
      "সিআরএম, সেলস টিম ও কাস্টমার লয়ালটি পয়েন্টস"
    ]
  },
  high: {
    name: "হাই",
    tagline: "বৃহৎ রিটেল চেইন, একাধিক আউটলেট ও সম্পূর্ণ স্বয়ংক্রিয় এন্টারপ্রাইজ অপারেশন।",
    ctaText: "হাই বেছে নিন",
    limits: {
      products: "আনলিমিটেড প্রোডাক্ট",
      hosting: "AWS ডেডিকেটেড",
      storage: "১০ জিবি স্টোরেজ",
      branches: "৫টি ব্রাঞ্চ",
      users: "আনলিমিটেড ইউজার",
      website: "ফ্রি ওয়েবসাইট"
    },
    highlights: [
      "মিডিয়াম প্যাকেজের সকল সুবিধা অন্তর্ভুক্ত",
      "ডেডিকেটেড মোবাইল অ্যাপস (অ্যান্ড্রয়েড ও আইওএস)",
      "আনলিমিটেড প্রোডাক্ট ও ক্যাটালগ ধারণক্ষমতা",
      "৫টি পর্যন্ত ব্রাঞ্চ ও সেন্ট্রাল গোডাউন কন্ট্রোল",
      "এআই বিজনেস ইন্টেলিজেন্স (সেলস, স্টক ও একাউন্টস)",
      "ই-কমার্সে এআই শপিং অ্যাসিস্ট্যান্ট ও বট",
      "ফেসবুক ও ইনস্টাগ্রাম মার্কেটিং অটোমেশন",
      "অ্যাডভান্সড রোল-বেসড পারমিশন ও কমপ্লায়েন্স অডিট"
    ]
  }
};

const BN_ENTERPRISE_META = {
  badge: "কাস্টম এন্টারপ্রাইজ",
  name: "লার্জ স্কেল রিটেল ও ডিস্ট্রিবিউশন হাব",
  tagline: "আনলিমিটেড আউটলেট, ডেডিকেটেড এডব্লিউএস ক্লাউড ক্লাস্টার এবং কাস্টমাইজড ইআরপি আর্কিটেকচার প্রয়োজন এমন ব্র্যান্ডের জন্য।",
  priceDisplay: "কাস্টম প্রাইসিং",
  setupFeeDisplay: "প্রয়োজন ও আউটলেট অনুযায়ী আলোচনা সাপেক্ষে",
  ctaText: "এন্টারপ্রাইজ সেলসের সাথে কথা বলুন",
  highlights: [
    "আনলিমিটেড ব্রাঞ্চ ও সেন্ট্রাল ওয়্যারহাউজ হাব",
    "ডেডিকেটেড ক্লাউড ইনস্ট্যান্স (AWS / DigitalOcean)",
    "এনবিআর মূসক ৬.৩ এর সকল কাস্টম ভ্যাট শিডিউল",
    "কাস্টম এপিআই ইন্টিগ্রেশন (সাপ্লাই চেইন ও ইআরপি)",
    "ডেডিকেটেড অ্যাকাউন্ট ম্যানেজার ও অন-সাইট ট্রেইনিং",
    "২৪/৭ প্রায়োরিটি ফোন সাপোর্ট ও ৯৯.৯৯% এসএলএ গ্যারান্টি"
  ]
};

function initPricingCards() {
  const container = document.getElementById('pricingCardsGrid');
  if (!container || !window.PRICING_DATA) return;

  const isBn = STATE.currentLang === 'bn';
  const isAnnual = currentBillingCycle === 'annual';

  const html = PRICING_DATA.packages.map(pkg => {
    const isPopular = pkg.isPopular;
    const ribbonHtml = isPopular 
      ? `<div class="popular-badge-ribbon"><span>⭐</span> ${isBn ? 'সেরা পছন্দ (মোস্ট পপুলার)' : 'Most Popular Choice'}</div>` 
      : '';

    const bnPkg = isBn && BN_PACKAGE_META[pkg.id] ? BN_PACKAGE_META[pkg.id] : null;
    const displayName = bnPkg ? bnPkg.name : pkg.name;
    const displayTagline = bnPkg ? bnPkg.tagline : pkg.tagline;
    const displayCta = bnPkg ? bnPkg.ctaText : (pkg.ctaText || 'Get Started');
    const highlights = bnPkg ? bnPkg.highlights : pkg.highlights;

    // Capacity items
    const capacityItems = [];
    const prodVal = bnPkg && bnPkg.limits.products ? bnPkg.limits.products : pkg.limits.products;
    if (prodVal) {
      capacityItems.push(`
        <div class="capacity-line">
          ${ICONS.box}
          <span>${isBn ? 'প্রোডাক্ট লিমিট' : 'Products'}: <strong>${prodVal}</strong></span>
        </div>
      `);
    }

    const hostVal = bnPkg && bnPkg.limits.hosting ? bnPkg.limits.hosting : pkg.limits.hosting;
    if (hostVal) {
      capacityItems.push(`
        <div class="capacity-line">
          ${ICONS.cloud}
          <span>${isBn ? 'ক্লাউড হোস্টিং' : 'Hosting'}: <strong>${hostVal}</strong></span>
        </div>
      `);
    }

    const branchVal = bnPkg && bnPkg.limits.branches ? bnPkg.limits.branches : pkg.limits.branches;
    const storeVal = bnPkg && bnPkg.limits.store ? bnPkg.limits.store : pkg.limits.store;
    if (branchVal) {
      capacityItems.push(`
        <div class="capacity-line">
          ${ICONS.branch}
          <span>${isBn ? 'আউটলেট / ব্রাঞ্চ' : 'Branches'}: <strong>${branchVal}</strong></span>
        </div>
      `);
    } else if (storeVal) {
      capacityItems.push(`
        <div class="capacity-line">
          ${ICONS.branch}
          <span>${isBn ? 'স্টোর' : 'Store'}: <strong>${storeVal}</strong></span>
        </div>
      `);
    }

    const storageVal = bnPkg && bnPkg.limits.storage ? bnPkg.limits.storage : pkg.limits.storage;
    if (storageVal) {
      capacityItems.push(`
        <div class="capacity-line">
          ${ICONS.server}
          <span>${isBn ? 'স্টোরেজ' : 'Storage'}: <strong>${storageVal}</strong></span>
        </div>
      `);
    }

    const userVal = bnPkg && bnPkg.limits.users ? bnPkg.limits.users : pkg.limits.users;
    if (userVal) {
      capacityItems.push(`
        <div class="capacity-line">
          ${ICONS.users}
          <span>${isBn ? 'অ্যাডমিন ইউজার' : 'Admin Users'}: <strong>${userVal}</strong></span>
        </div>
      `);
    }

    // Highlights list
    const highlightsHtml = highlights.map(item => `
      <li>
        <span class="check-icon">${ICONS.checkCircle}</span>
        <span>${item}</span>
      </li>
    `).join('');

    // Clear Price Calculation: Show FULL YEAR PAYMENT when Annual is selected
    // (Never show divided monthly amounts like 400, 800, 1600 to prevent client misconception)
    const monthlyRate = Number(pkg.monthlyPrice);
    const yearlyRate = pkg.yearlyPrice || (monthlyRate * 10);
    
    const displayAmount = isAnnual ? yearlyRate : monthlyRate;
    const formattedDisplayPrice = displayAmount.toLocaleString('en-US');
    const formattedSetup = Number(pkg.setupFee).toLocaleString('en-US');
    
    const periodLabel = isAnnual 
      ? (isBn ? '/বছর' : '/year') 
      : (isBn ? '/মাস' : '/mo');

    const savingsAmount = (monthlyRate * 12) - yearlyRate;
    const formattedSavings = savingsAmount.toLocaleString('en-US');

    const billingNoteHtml = isAnnual
      ? `<div class="plan-annual-savings-note">
           <span>🎁</span> ${isBn ? `এককালীন ১ বছরের সম্পূর্ণ বিলিং · সাশ্রয় <span class="currency-taka">&#2547;</span>${formattedSavings} (২ মাস ফ্রি!)` : `Full 1-Year Upfront · Save <span class="currency-taka">&#2547;</span>${formattedSavings} (2 Mos Free!)`}
         </div>`
      : `<div class="plan-billing-mode-note">
           <span>✓</span> ${isBn ? 'নমনীয় মাসিক সাবস্ক্রিপশন · যেকোনো সময় পরিবর্তনযোগ্য' : 'Flexible monthly billing · Cancel anytime'}
         </div>`;

    return `
      <div class="pricing-card ${isPopular ? 'is-popular' : ''}" id="card-${pkg.id}">
        ${ribbonHtml}

        <div class="plan-header">
          <h3 class="plan-name">${displayName}</h3>
          <p class="plan-tagline">${displayTagline}</p>
        </div>

        <div class="plan-price-wrap">
          <div class="plan-monthly-price">
            <span class="price-currency"><span class="currency-taka">&#2547;</span></span><span class="price-val animate-num-flip">${formattedDisplayPrice}</span>
            <span class="price-period">${periodLabel}</span>
          </div>
          <div class="plan-setup-fee">
            ${isBn ? 'এককালীন সেটআপ ফি' : 'One-time setup fee'}: <span class="currency-taka">&#2547;</span>${formattedSetup}
          </div>
          ${billingNoteHtml}
        </div>

        <div class="plan-capacity-box">
          ${capacityItems.join('')}
        </div>

        <ul class="plan-features-list">
          ${highlightsHtml}
        </ul>

        <button type="button" class="btn btn-md ${isPopular ? 'btn-primary' : 'btn-secondary'} btn-block open-plan-modal" data-plan-id="${pkg.id}">
          <span>${displayCta}</span>
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" width="14" height="14">
            <path d="M3.33 8h9.34m-4-4l4 4-4 4" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    `;
  }).join('');

  container.innerHTML = html;

  // Bind monthly / annual switcher buttons
  const btnMonthly = document.getElementById('btnBillingMonthly');
  const btnAnnual = document.getElementById('btnBillingAnnual');

  if (btnMonthly && btnAnnual) {
    btnMonthly.onclick = () => {
      if (currentBillingCycle !== 'monthly') {
        currentBillingCycle = 'monthly';
        btnMonthly.classList.add('active');
        btnAnnual.classList.remove('active');
        initPricingCards();
      }
    };
    btnAnnual.onclick = () => {
      if (currentBillingCycle !== 'annual') {
        currentBillingCycle = 'annual';
        btnAnnual.classList.add('active');
        btnMonthly.classList.remove('active');
        initPricingCards();
      }
    };
  }
}

function initEnterpriseCard() {
  const container = document.getElementById('enterpriseShowcase');
  if (!container || !window.PRICING_DATA) return;

  const ent = PRICING_DATA.customEnterprise;
  const isBn = STATE.currentLang === 'bn';
  const bnEnt = isBn ? BN_ENTERPRISE_META : null;

  const badgeText = bnEnt ? bnEnt.badge : ent.badge;
  const nameText = bnEnt ? bnEnt.name : ent.name;
  const taglineText = bnEnt ? bnEnt.tagline : ent.tagline;
  const priceTitle = bnEnt ? bnEnt.priceDisplay : ent.priceDisplay;
  const priceSub = bnEnt ? bnEnt.setupFeeDisplay : ent.setupFeeDisplay;
  const ctaText = bnEnt ? bnEnt.ctaText : 'Schedule Enterprise Consultation';
  const highlights = bnEnt ? bnEnt.highlights : ent.highlights;

  const highlightsHtml = highlights.map(h => `
    <li>
      <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
      </svg>
      <span>${h}</span>
    </li>
  `).join('');

  container.innerHTML = `
    <div class="enterprise-showcase-box">
      <div class="enterprise-left">
        <div class="enterprise-badge-pill">
          ${badgeText}
        </div>
        <h3>${nameText}</h3>
        <p>${taglineText}</p>
        <ul class="enterprise-features-grid">
          ${highlightsHtml}
        </ul>
      </div>

      <div class="enterprise-right">
        <div class="enterprise-price-title">${priceTitle}</div>
        <div class="enterprise-price-sub">${priceSub}</div>
        <button type="button" class="btn btn-lg btn-white btn-block open-plan-modal" data-plan-id="custom">
          <span>${ctaText}</span>
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" width="14" height="14">
            <path d="M3.33 8h9.34m-4-4l4 4-4 4" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  `;
}

/**
 * 6. COMPARISON MATRIX TABLE (12 Modules · 71 Features)
 */
const BN_CAT_TITLES = {
  product_ecommerce: "১. প্রোডাক্ট ও ই-কমার্স প্ল্যাটফর্ম",
  pos_sales: "২. স্মার্ট পিওএস কাউন্টার ও অফলাইন সেলস",
  inventory_warehousing: "৩. ইনভেন্টরি ও মাল্টি-ওয়্যারহাউজ ম্যানেজমেন্ট",
  purchasing_suppliers: "৪. সাপ্লায়ার ও পারচেজ অপারেশনস",
  accounting_finance: "৫. ডাবল-এন্ট্রি একাউন্টিং ও ফাইন্যান্স",
  courier_logistics: "৬. কুরিয়ার লজিস্টিকস ও অটো-সিওডি (পাঠাও, স্টিডফাস্ট, রেডএক্স)",
  crm_loyalty: "৭. সিআরএম ও কাস্টমার লয়ালটি",
  mobile_applications: "৮. ডেডিকেটেড মোবাইল অ্যাপস (Android ও iOS)",
  hr_payroll: "৯. এইচআর, কর্মকর্তা ও পেরোল",
  ai_automation: "১০. এআই বিজনেস ইন্টেলিজেন্স ও অটোমেশন",
  multi_branch: "১১. মাল্টি-ব্রাঞ্চ সেন্ট্রালাইজড ম্যানেজমেন্ট",
  security_reporting: "১২. সিকিউরিটি, রোলস ও অ্যাডভান্সড রিপোর্টিং"
};

function initComparisonTable() {
  const tbody = document.getElementById('comparisonTableBody');
  if (!tbody || !window.PRICING_DATA) return;

  const isBn = STATE.currentLang === 'bn';
  const plans = ['starter', 'basic', 'medium', 'high'];
  let rowsHtml = '';

  PRICING_DATA.comparisonCategories.forEach((cat, catIdx) => {
    const rawTitle = cat.title || cat.name || `Module ${catIdx + 1}`;
    const displayCatTitle = isBn && BN_CAT_TITLES[cat.id] ? BN_CAT_TITLES[cat.id] : rawTitle;

    // Category Header Row (Collapsible Accordion)
    rowsHtml += `
      <tr class="category-header-row" data-cat-idx="${catIdx}">
        <td colspan="5">
          <div class="cat-toggle-wrap">
            <span>${displayCatTitle} (${cat.features.length})</span>
            <svg class="cat-chevron" viewBox="0 0 20 20" fill="none" stroke="currentColor" width="18" height="18">
              <path d="M5 7.5L10 12.5L15 7.5" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </td>
      </tr>
    `;

    // Feature Rows
    cat.features.forEach((feat) => {
      const planCells = plans.map(p => {
        const val = feat[p];
        const isPopularCol = p === 'medium';
        if (val === true) {
          return `<td class="td-plan-val ${isPopularCol ? 'td-plan-popular' : ''}"><span class="val-check-circle">✓</span></td>`;
        } else if (val === false || val === undefined) {
          return `<td class="td-plan-val ${isPopularCol ? 'td-plan-popular' : ''}"><span class="val-cross-dash">—</span></td>`;
        } else {
          let displayVal = val;
          if (isBn && typeof val === 'string') {
            displayVal = val
              .replace(/Unlimited Users/g, 'আনলিমিটেড ইউজার')
              .replace(/Unlimited/g, 'আনলিমিটেড')
              .replace(/Products/g, 'প্রোডাক্ট')
              .replace(/Branches/g, 'আউটলেট')
              .replace(/1 store/g, '১টি শোরুম')
              .replace(/Shared/g, 'শেয়ার্ড হোস্টিং')
              .replace(/Up to 5 Users/g, 'সর্বোচ্চ ৫ ইউজার')
              .replace(/Up to 10 Users/g, 'সর্বোচ্চ ১০ ইউজার')
              .replace(/Up to 5,000 visits/g, 'সর্বোচ্চ ৫,০০০ ভিজিট')
              .replace(/Up to 10,000 visits/g, 'সর্বোচ্চ ১০,০০০ ভিজিট')
              .replace(/To Be Confirmed/g, 'আলোচনা সাপেক্ষে')
              .replace(/Basic Cash\/Due/g, 'নগদ ও বাকি')
              .replace(/Basic Notes/g, 'সাধারণ খসড়া')
              .replace(/Standard Summary/g, 'স্ট্যান্ডার্ড সামারি')
              .replace(/Simple VAT %/g, 'সাধারণ ভ্যাট %')
              .replace(/PDF Only/g, 'শুধুমাত্র PDF')
              .replace(/1 Courier \(Pathao\/Steadfast\)/g, '১টি কুরিয়ার (পাঠাও/স্টিডফাস্ট)')
              .replace(/\b0\b/g, '০').replace(/\b1\b/g, '১').replace(/\b2\b/g, '২').replace(/\b3\b/g, '৩')
              .replace(/\b4\b/g, '৪').replace(/\b5\b/g, '৫');
          }
          return `<td class="td-plan-val ${isPopularCol ? 'td-plan-popular' : ''}"><span class="val-text-pill">${displayVal}</span></td>`;
        }
      }).join('');

      const featureTitle = isBn && feat.nameBn ? feat.nameBn : feat.name;
      const searchKeywords = `${feat.name.toLowerCase()} ${feat.nameBn ? feat.nameBn.toLowerCase() : ''}`;

      rowsHtml += `
        <tr class="feature-row" data-cat-idx="${catIdx}" data-feature-name="${searchKeywords}">
          <td class="col-feature-title">${featureTitle}</td>
          ${planCells}
        </tr>
      `;
    });
  });

  tbody.innerHTML = rowsHtml;

  // Category collapse / expand toggles
  if (typeof tbody.querySelectorAll === 'function') {
    tbody.querySelectorAll('.category-header-row').forEach(headerRow => {
      headerRow.addEventListener('click', () => {
        const catIdx = headerRow.getAttribute('data-cat-idx');
        const isCollapsed = headerRow.classList.toggle('is-collapsed');
        tbody.querySelectorAll(`.feature-row[data-cat-idx="${catIdx}"]`).forEach(row => {
          row.classList.toggle('is-hidden', isCollapsed);
        });
      });
    });
  }

  // Toggle All Categories button
  const toggleAllBtn = document.getElementById('toggleAllCategoriesBtn');
  if (toggleAllBtn) {
    let allExpanded = true;
    toggleAllBtn.onclick = () => {
      allExpanded = !allExpanded;
      const isCurrentBn = STATE.currentLang === 'bn';
      toggleAllBtn.textContent = allExpanded 
        ? (isCurrentBn ? 'সবগুলো বন্ধ করুন' : 'Collapse All') 
        : (isCurrentBn ? 'সবগুলো ক্যাটাগরি খুলুন' : 'Expand All');

      if (typeof tbody.querySelectorAll === 'function') {
        tbody.querySelectorAll('.category-header-row').forEach(h => {
          h.classList.toggle('is-collapsed', !allExpanded);
        });
        tbody.querySelectorAll('.feature-row').forEach(r => {
          r.classList.toggle('is-hidden', !allExpanded);
        });
      }
    };
  }
}

/**
 * 7. COMPARISON DRAWER (Option A: Compact -> Expand Full Matrix)
 */
function updateComparisonDrawerLanguage(lang) {
  const toggleBtn = document.getElementById('btnToggleFullComparison');
  const drawer = document.getElementById('comparisonFullDrawer');
  if (!toggleBtn || !drawer || !drawer.classList || typeof drawer.classList.contains !== 'function') return;

  const isCurrentOpen = drawer.classList.contains('is-open');
  const labelSpan = toggleBtn.querySelector('.btn-toggle-text');
  if (labelSpan) {
    if (lang === 'bn') {
      labelSpan.textContent = isCurrentOpen 
        ? 'তুলনামূলক তালিকা সংক্ষেপ করুন ▴' 
        : 'সম্পূর্ণ ১২টি মডিউলের বিস্তারিত তুলনা দেখুন (৭১টি ফিচার)';
    } else {
      labelSpan.textContent = isCurrentOpen 
        ? 'Collapse Comparison List ▴' 
        : 'Click to View Full 12-Module Comparison (71 Features)';
    }
  }
}

function initComparisonDrawer() {
  const toggleBtn = document.getElementById('btnToggleFullComparison');
  const drawer = document.getElementById('comparisonFullDrawer');
  const bottomCollapseBtn = document.getElementById('btnCollapseComparisonBottom');

  if (!toggleBtn || !drawer) return;

  function setDrawerOpen(open) {
    const isBn = STATE.currentLang === 'bn';
    drawer.classList.toggle('is-open', open);
    toggleBtn.classList.toggle('is-open', open);
    toggleBtn.setAttribute('aria-expanded', open ? 'true' : 'false');

    const labelSpan = toggleBtn.querySelector('.btn-toggle-text');
    if (labelSpan) {
      if (isBn) {
        labelSpan.textContent = open 
          ? 'তুলনামূলক তালিকা সংক্ষেপ করুন ▴' 
          : 'সম্পূর্ণ ১২টি মডিউলের বিস্তারিত তুলনা দেখুন (৭১টি ফিচার)';
      } else {
        labelSpan.textContent = open 
          ? 'Collapse Comparison List ▴' 
          : 'Click to View Full 12-Module Comparison (71 Features)';
      }
    }
  }

  toggleBtn.addEventListener('click', () => {
    const isOpen = drawer.classList.contains('is-open');
    setDrawerOpen(!isOpen);
    if (!isOpen) {
      initComparisonTable();
    }
  });

  if (bottomCollapseBtn) {
    bottomCollapseBtn.addEventListener('click', () => {
      setDrawerOpen(false);
      const compSection = document.getElementById('comparison');
      if (compSection) {
        compSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }
}

/**
 * 8. COMPARISON TABLE INSTANT SEARCH
 */
function initTableSearch() {
  const input = document.getElementById('tableSearchInput');
  const countSpan = document.getElementById('searchResultCount');
  if (!input) return;

  input.addEventListener('input', (e) => {
    const term = e.target.value.trim().toLowerCase();
    const rows = document.querySelectorAll('.feature-row');
    const catHeaders = document.querySelectorAll('.category-header-row');
    const isBn = STATE.currentLang === 'bn';

    if (!term) {
      rows.forEach(r => r.classList.remove('is-hidden'));
      catHeaders.forEach(h => {
        h.classList.remove('is-hidden');
        h.classList.remove('is-collapsed');
      });
      if (countSpan) countSpan.style.display = 'none';
      return;
    }

    let matchCount = 0;
    const matchingCategories = new Set();

    rows.forEach(r => {
      const name = r.getAttribute('data-feature-name') || '';
      if (name.includes(term)) {
        r.classList.remove('is-hidden');
        matchingCategories.add(r.getAttribute('data-cat-idx'));
        matchCount++;
      } else {
        r.classList.add('is-hidden');
      }
    });

    catHeaders.forEach(h => {
      const catIdx = h.getAttribute('data-cat-idx');
      if (matchingCategories.has(catIdx)) {
        h.classList.remove('is-hidden');
        h.classList.remove('is-collapsed');
      } else {
        h.classList.add('is-hidden');
      }
    });

    if (countSpan) {
      countSpan.style.display = 'inline';
      countSpan.textContent = isBn 
        ? `${matchCount}টি ফিচার পাওয়া গেছে` 
        : `${matchCount} features found`;
    }
  });
}

/**
 * 8. FAQ ACCORDION CONTROLLER (Category-Filtered, Live Search & Bilingual Accordion)
 */
let FAQ_STATE = {
  activeCategory: 'all',
  searchQuery: '',
  openFaqId: 'faq-1'
};

function renderFaqs() {
  const container = document.getElementById('faqContainer');
  const emptyState = document.getElementById('faqEmptyState');
  if (!container || !window.PRICING_DATA || !window.PRICING_DATA.faqs) return;

  const currentLang = (typeof STATE !== 'undefined' && STATE.currentLang === 'bn') ? 'bn' : 'en';
  const query = FAQ_STATE.searchQuery.trim().toLowerCase();
  const category = FAQ_STATE.activeCategory;

  // Filter items
  const filtered = window.PRICING_DATA.faqs.filter(faq => {
    if (category !== 'all' && faq.category !== category) return false;
    if (query) {
      const qText = (faq[currentLang]?.q || '').toLowerCase();
      const aText = (faq[currentLang]?.a || '').toLowerCase();
      const catText = (faq.categoryLabel?.[currentLang] || '').toLowerCase();
      return qText.includes(query) || aText.includes(query) || catText.includes(query);
    }
    return true;
  });

  if (filtered.length === 0) {
    container.innerHTML = '';
    if (emptyState) emptyState.style.display = 'block';
    return;
  }

  if (emptyState) emptyState.style.display = 'none';

  const highlightText = (text, q) => {
    if (!q) return text;
    const escaped = q.replace(/[-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    const regex = new RegExp('(' + escaped + ')', 'gi');
    return text.replace(regex, '<mark class="faq-highlight">$1</mark>');
  };

  const html = filtered.map(faq => {
    const isOpen = FAQ_STATE.openFaqId === faq.id;
    const itemData = faq[currentLang] || faq.en;
    const categoryName = faq.categoryLabel?.[currentLang] || faq.categoryLabel?.en || 'General';
    const highlightedQ = highlightText(itemData.q, query);

    return `
      <div class="faq-card ${isOpen ? 'is-open' : ''}" data-id="${faq.id}">
        <button type="button" class="faq-question-btn" aria-expanded="${isOpen ? 'true' : 'false'}">
          <div class="faq-q-text-wrap">
            <span class="faq-cat-tag">${categoryName}</span>
            <span class="faq-q-title">${highlightedQ}</span>
          </div>
          <span class="faq-chevron-icon" aria-hidden="true">
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" width="16" height="16">
              <path d="M5 7.5L10 12.5L15 7.5" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
        </button>
        <div class="faq-answer-body">
          <div class="faq-answer-content">
            <p>${itemData.a}</p>
          </div>
        </div>
      </div>
    `;
  }).join('');

  container.innerHTML = html;

  // Bind accordion click handlers
  container.querySelectorAll('.faq-question-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.faq-card');
      const faqId = card.getAttribute('data-id');
      const isOpen = card.classList.contains('is-open');

      container.querySelectorAll('.faq-card').forEach(c => {
        c.classList.remove('is-open');
        const qBtn = c.querySelector('.faq-question-btn');
        if (qBtn) qBtn.setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        card.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
        FAQ_STATE.openFaqId = faqId;
      } else {
        FAQ_STATE.openFaqId = null;
      }
    });
  });
}

function updateFaqLanguage(lang) {
  renderFaqs();
}

function initFaqAccordion() {
  const container = document.getElementById('faqContainer');
  if (!container || !window.PRICING_DATA) return;

  renderFaqs();

  const filterBtns = document.querySelectorAll('.faq-filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      FAQ_STATE.activeCategory = btn.getAttribute('data-filter') || 'all';
      renderFaqs();
    });
  });

  const searchInput = document.getElementById('faqSearchInput');
  const clearBtn = document.getElementById('faqSearchClearBtn');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      FAQ_STATE.searchQuery = e.target.value;
      if (clearBtn) {
        clearBtn.style.display = FAQ_STATE.searchQuery.length > 0 ? 'inline-flex' : 'none';
      }
      renderFaqs();
    });
  }

  if (clearBtn && searchInput) {
    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      FAQ_STATE.searchQuery = '';
      clearBtn.style.display = 'none';
      renderFaqs();
      searchInput.focus();
    });
  }
}


/**
 * 6B. OFFICE VISIT APPOINTMENT MODAL CONTROLLER
 */
function initOfficeVisitModal() {
  const modal = document.getElementById('officeVisitModal');
  const openBtn = document.getElementById('openOfficeVisitBtn');
  const closeBtn = document.getElementById('officeVisitCloseBtn');
  const form = document.getElementById('officeVisitForm');
  const feedback = document.getElementById('officeVisitFeedback');
  const dateInput = document.getElementById('visitDate');

  if (!modal) return;

  // Set minimum date to today
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
    if (!dateInput.value) {
      dateInput.value = today;
    }
  }

  // Open modal
  const openModal = () => {
    modal.classList.add('is-active');
    document.body.style.overflow = 'hidden';
    if (feedback) feedback.style.display = 'none';
  };

  if (openBtn) {
    openBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  }

  // Close modal
  const closeModal = () => {
    modal.classList.remove('is-active');
    document.body.style.overflow = '';
    if (feedback) feedback.style.display = 'none';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-active')) {
      closeModal();
    }
  });

  // Handle Form Submission
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      const isBn = STATE.currentLang === 'bn';

      submitBtn.textContent = isBn ? 'অ্যাপয়েন্টমেন্ট বুকিং হচ্ছে...' : 'Booking Appointment...';
      submitBtn.disabled = true;

      const fullName = (document.getElementById('visitFullName') || {}).value || '';
      const phoneRaw = (document.getElementById('visitPhone') || {}).value || '';
      const phone = phoneRaw ? `+880${phoneRaw}` : '';
      const businessName = (document.getElementById('visitBusinessName') || {}).value || '';
      const visitDate = (document.getElementById('visitDate') || {}).value || '';
      const timeSlotSelect = document.getElementById('visitTimeSlot');
      const timeSlot = timeSlotSelect ? timeSlotSelect.options[timeSlotSelect.selectedIndex].text : '';
      const attendeesSelect = document.getElementById('visitAttendees');
      const attendees = attendeesSelect ? attendeesSelect.options[attendeesSelect.selectedIndex].text : '';
      const purposeSelect = document.getElementById('visitPurpose');
      const purpose = purposeSelect ? purposeSelect.options[purposeSelect.selectedIndex].text : '';
      const notes = (document.getElementById('visitNotes') || {}).value || '';

      const appointmentPayload = {
        type: 'In-Person Office Visit Appointment',
        fullName,
        phone,
        businessName,
        visitDate,
        timeSlot,
        attendees,
        purpose,
        notes,
        language: isBn ? 'bn' : 'en',
        submittedAt: new Date().toLocaleString('en-US', { timeZone: 'Asia/Dhaka' }) + ' (Dhaka Time)'
      };

      // Dispatch to email system
      await dispatchLeadNotification(appointmentPayload);

      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      form.reset();

      if (feedback) {
        feedback.style.display = 'block';
        feedback.innerHTML = isBn
          ? `<strong>🏢 অফিস অ্যাপয়েন্টমেন্ট সফলভাবে নিশ্চিত হয়েছে!</strong><br><span style="font-size:0.88rem; font-weight:normal; margin-top:0.4rem; display:block;">আমাদের অফিস কোঅর্ডিনেটর দ্রুত <strong>${phone}</strong> নম্বরে যোগাযোগ করে আপনার আগমনের চূড়ান্ত সময় কনফার্ম করবেন।<br><br>📍 <strong>অফিসের ঠিকানা:</strong> বাড়ি ৪৩, রোড ৯, নিকুঞ্জ ২, খিলক্ষেত, ঢাকা-১২২৯।</span>`
          : `<strong>🏢 Office Visit Appointment Confirmed!</strong><br><span style="font-size:0.88rem; font-weight:normal; margin-top:0.4rem; display:block;">Our executive coordinator will call you at <strong>${phone}</strong> shortly to confirm your meeting. Please arrive at your selected slot.<br><br>📍 <strong>Office Location:</strong> House 43, Road 9, Nikunja 2, Khilkhet, Dhaka-1229.</span>`;
      }
    });
  }
}

/**
 * 6. Contact / Get Started Modal
 */
function initContactModal() {
  const modal = document.getElementById('contactModal');
  const closeBtn = document.getElementById('modalCloseBtn');
  const planSelect = document.getElementById('modalPlanSelect');
  const form = document.getElementById('contactLeadForm');
  const feedback = document.getElementById('modalFeedback');

  if (!modal) return;

  // Populate plan select dropdown
  if (planSelect) {
    let options = `<option value="">Select a package</option>`;
    PRICING_DATA.packages.forEach(p => {
      options += `<option value="${p.id}">${p.name} (৳${p.yearlyPrice.toLocaleString()}/year)</option>`;
    });
    options += `<option value="custom">Custom / Enterprise (Tailored)</option>`;
    planSelect.innerHTML = options;
  }

  // Open modal triggers
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('.open-plan-modal');
    if (!trigger) return;

    const planId = trigger.getAttribute('data-plan-id');
    if (planSelect && planId) {
      planSelect.value = planId;
    }

    modal.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  });

  // Close modal
  const closeModal = () => {
    modal.classList.remove('is-active');
    document.body.style.overflow = '';
    if (feedback) feedback.style.display = 'none';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-active')) {
      closeModal();
    }
  });

  // Handle Form Submission
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      const isBn = STATE.currentLang === 'bn';
      
      submitBtn.textContent = isBn ? 'অনুরোধ পাঠানো হচ্ছে...' : 'Submitting Request...';
      submitBtn.disabled = true;

      // Extract form values
      const fullName = (document.getElementById('modalFullName') || {}).value || '';
      const phoneRaw = (document.getElementById('modalPhone') || {}).value || '';
      const phone = phoneRaw ? `+880${phoneRaw}` : '';
      const businessName = (document.getElementById('modalBusinessName') || {}).value || '';
      const plan = (document.getElementById('modalPlanSelect') || {}).value || '';
      const message = (document.getElementById('modalMessage') || {}).value || '';

      const leadPayload = {
        type: 'Consultation & Demo Booking Modal',
        fullName,
        phone,
        businessName,
        plan,
        message,
        language: isBn ? 'bn' : 'en',
        submittedAt: new Date().toLocaleString('en-US', { timeZone: 'Asia/Dhaka' }) + ' (Dhaka Time)'
      };

      // Dispatch to email system
      await dispatchLeadNotification(leadPayload);

      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      form.reset();

      if (feedback) {
        feedback.style.display = 'block';
        feedback.innerHTML = isBn 
          ? '<strong>ধন্যবাদ!</strong> আপনার অনুরোধটি সফলভাবে গৃহীত হয়েছে। আমাদের সিনিয়র সফটওয়্যার কনসালটেন্ট আগামী ২ ঘণ্টার মধ্যে আপনার নম্বরে যোগাযোগ করবেন।'
          : '<strong>Thank you!</strong> Your request has been recorded. Our enterprise specialist will call you at the provided number within 2 business hours.';
      }
    });
  }
}

/**
 * 7. Mobile Navigation Toggle
 */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobileNavToggle');
  const navLinks = document.getElementById('siteNavLinks');

  if (!toggleBtn || !navLinks) return;

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = navLinks.classList.toggle('is-open');
    navLinks.classList.toggle('is-mobile-open', isOpen);
    toggleBtn.classList.toggle('is-active', isOpen);
    toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    document.body.classList.toggle('mobile-menu-active', isOpen);
  });

  // Close mobile nav when clicking any link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-open', 'is-mobile-open');
      toggleBtn.classList.remove('is-active');
      toggleBtn.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('mobile-menu-active');
    });
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!toggleBtn.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('is-open', 'is-mobile-open');
      toggleBtn.classList.remove('is-active');
      toggleBtn.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('mobile-menu-active');
    }
  });
}

/**
 * 8. ScrollSpy & Sticky Nav Elevation
 */
function initScrollSpy() {
  const header = document.getElementById('siteHeader');
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = [];

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      const target = document.querySelector(href);
      if (target) {
        sections.push({ id: href, el: target, link });
      }
    }
  });

  const updateNav = () => {
    const scrollY = window.scrollY;

    // Header shadow & border elevation
    if (header) {
      if (scrollY > 15) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    }

    // ScrollSpy active link tracking
    const triggerOffset = scrollY + 140;
    let current = null;

    sections.forEach(item => {
      const top = item.el.offsetTop;
      const height = item.el.offsetHeight;
      if (triggerOffset >= top && triggerOffset < top + height) {
        current = item;
      }
    });

    sections.forEach(item => {
      if (current && item.id === current.id) {
        item.link.classList.add('is-active');
      } else {
        item.link.classList.remove('is-active');
      }
    });
  };

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();
}


/**
 * 12. HERO LIVING CHATBOT SIMULATOR (Realistic Typing & Sending)
 * Realistically types the question character-by-character into the input box,
 * triggers the send button, displays the user bubble, shows bot thinking dots,
 * and reveals the rich data card with interactive action buttons.
 */

let currentHeroScenarioIndex = 0;
let isHeroTypingActive = false;
let isHeroPaused = false;
let heroTypingTimeout = null;
let heroCycleTimer = null;
let heroProgressInterval = null;
let heroProgressPercent = 0;
const HERO_READ_DURATION = 6500; // Time user views the card before next question

const HERO_CHAT_DATA = {
  stock: {
    topicEn: "📦 Today's Stock",
    topicBn: "📦 আজকের স্টক",
    en: {
      question: "Check today's stock level for fast-moving items.",
      lead: "Stock alert: 2 high-velocity items reached minimum reorder threshold:",
      cardHtml: `
        <div class="bot-list-items">
          <div class="bot-item-row">
            <span class="bot-item-name">👔 Slim Cotton Shirt (Navy, L)</span>
            <span class="bot-tag-critical">Only 6 pcs left · Banani</span>
          </div>
          <div class="bot-item-row">
            <span class="bot-item-name">🖨️ Thermal Receipt Printer 80mm</span>
            <span class="bot-tag-critical">Only 2 units left · Uttara Hub</span>
          </div>
        </div>
        <div class="bot-action-box">
          <div class="bot-action-info">
            <span class="bot-action-kicker">⚡ Auto-Draft Purchase Requisition</span>
            <span class="bot-action-title">Draft PO #904 (50 pcs) for Bismillah Fabrics</span>
          </div>
          <button type="button" class="bot-action-btn" id="heroActionBtn">
            <span>Confirm Order</span>
          </button>
        </div>
      `,
      confirmedText: "✓ PO #904 Auto-Sent to Supplier!"
    },
    bn: {
      question: "আজকের ফাস্ট-সেলিং পণ্যের স্টক কতটুকু আছে?",
      lead: "স্টক সতর্কতা: ২টি দ্রুত বিক্রিত পণ্যের স্টক সর্বনিম্ন সীমায় পৌঁছেছে:",
      cardHtml: `
        <div class="bot-list-items">
          <div class="bot-item-row">
            <span class="bot-item-name">👔 স্লিম কটন শার্ট (নেভি ব্লু, L)</span>
            <span class="bot-tag-critical">মাত্র ৬ পিস অবশিষ্ট · বনানী</span>
          </div>
          <div class="bot-item-row">
            <span class="bot-item-name">🖨️ থার্মাল রিসিপ্ট প্রিন্টার ৮০ মিমি</span>
            <span class="bot-tag-critical">মাত্র ২ ইউনিট অবশিষ্ট · উত্তরা</span>
          </div>
        </div>
        <div class="bot-action-box">
          <div class="bot-action-info">
            <span class="bot-action-kicker">⚡ অটো-পারচেজ রিকুইজিশন</span>
            <span class="bot-action-title">বিসমিল্লাহ ফ্যাব্রিকসকে ৫০ পিসের PO #904 ড্রাফট</span>
          </div>
          <button type="button" class="bot-action-btn" id="heroActionBtn">
            <span>অর্ডার কনফার্ম করুন</span>
          </button>
        </div>
      `,
      confirmedText: "✓ সাপ্লায়ারকে অর্ডার পাঠানো হয়েছে!"
    }
  },

  orders: {
    topicEn: "🛒 Today's Orders",
    topicBn: "🛒 আজকের অর্ডার",
    en: {
      question: "What are today's total orders and sales so far?",
      lead: "Live multi-channel sales snapshot across outlets & e-commerce:",
      cardHtml: `
        <div class="bot-card-grid-2">
          <div class="bot-card-stat">
            <span class="bot-stat-label">POS Counter Sales</span>
            <span class="bot-stat-val"><span class="currency-taka">&#2547;</span>1,48,200</span>
            <span class="bot-stat-sub">64 Invoices · Zero Queues</span>
          </div>
          <div class="bot-card-stat">
            <span class="bot-stat-label">Online Storefront</span>
            <span class="bot-stat-val"><span class="currency-taka">&#2547;</span>86,500</span>
            <span class="bot-stat-sub">28 Orders (bKash & COD)</span>
          </div>
        </div>
        <div class="bot-item-row" style="margin-bottom: 0.75rem;">
          <span class="bot-item-name">🚚 Courier Auto-Dispatched</span>
          <span class="bot-tag-success">24 Parcels Booked (Pathao & Steadfast)</span>
        </div>
        <div class="bot-action-box">
          <div class="bot-action-info">
            <span class="bot-action-kicker">📊 Today's Total Gross Sales</span>
            <span class="bot-action-title"><span class="currency-taka">&#2547;</span>2,34,700 (+22.4% vs last week)</span>
          </div>
          <button type="button" class="bot-action-btn" id="heroActionBtn">
            <span>Download Day End PDF</span>
          </button>
        </div>
      `,
      confirmedText: "✓ Day End PDF Ready!"
    },
    bn: {
      question: "আজকে সব চ্যানেল মিলিয়ে মোট অর্ডার ও বিক্রি কত?",
      lead: "সকল আউটলেট ও অনলাইনের আজকের লাইভ সেলস সামারি:",
      cardHtml: `
        <div class="bot-card-grid-2">
          <div class="bot-card-stat">
            <span class="bot-stat-label">পিওএস কাউন্টার সেলস</span>
            <span class="bot-stat-val"><span class="currency-taka">&#2547;</span>১,৪৮,২০০</span>
            <span class="bot-stat-sub">৬৪টি ইনভয়েস · শূন্য ভুল</span>
          </div>
          <div class="bot-card-stat">
            <span class="bot-stat-label">অনলাইন ওয়েবসাইট</span>
            <span class="bot-stat-val"><span class="currency-taka">&#2547;</span>৮৬,৫০০</span>
            <span class="bot-stat-sub">২৮টি অর্ডার (বিকাশ ও সিওডি)</span>
          </div>
        </div>
        <div class="bot-item-row" style="margin-bottom: 0.75rem;">
          <span class="bot-item-name">🚚 কুরিয়ার অটো-পার্সেল বুকিং</span>
          <span class="bot-tag-success">২৪টি পার্সেল পিকড (পাঠাও ও স্টিডফাস্ট)</span>
        </div>
        <div class="bot-action-box">
          <div class="bot-action-info">
            <span class="bot-action-kicker">📊 আজকের মোট সর্বমোট বিক্রি</span>
            <span class="bot-action-title"><span class="currency-taka">&#2547;</span>২,৩৪,৭০০ (+২২.৪% প্রবৃদ্ধি)</span>
          </div>
          <button type="button" class="bot-action-btn" id="heroActionBtn">
            <span>ডে-এন্ড রিপোর্ট দেখুন</span>
          </button>
        </div>
      `,
      confirmedText: "✓ রিপোর্ট প্রস্তুত!"
    }
  },

  purchase: {
    topicEn: "📄 Purchases & Bills",
    topicBn: "📄 পারচেজ ও বিল",
    en: {
      question: "Show today's purchase bills and supplier payables.",
      lead: "2 supplier challans logged today with automated double-entry ledger:",
      cardHtml: `
        <div class="bot-list-items">
          <div class="bot-item-row">
            <span class="bot-item-name">📦 PO #892: Bismillah Fabrics</span>
            <span class="bot-tag-success"><span class="currency-taka">&#2547;</span>75,000 (Paid via bKash)</span>
          </div>
          <div class="bot-item-row">
            <span class="bot-item-name">📦 PO #893: Apex Trims & Labels</span>
            <span class="bot-tag-critical"><span class="currency-taka">&#2547;</span>42,500 (Due: Nov 5)</span>
          </div>
        </div>
        <div class="bot-action-box">
          <div class="bot-action-info">
            <span class="bot-action-kicker">💳 Double-Entry Accounts Reconciled</span>
            <span class="bot-action-title">+<span class="currency-taka">&#2547;</span>1,17,500 Inventory asset updated in Balance Sheet</span>
          </div>
          <button type="button" class="bot-action-btn" id="heroActionBtn">
            <span>Set Due SMS Reminder</span>
          </button>
        </div>
      `,
      confirmedText: "✓ SMS Reminder Scheduled!"
    },
    bn: {
      question: "আজকের সাপ্লায়ার পারচেজ বিল ও বকেয়া হিসাব দেখাও।",
      lead: "আজকে ২টি সাপ্লায়ার চালান এন্ট্রি হয়েছে এবং লেজারে অটো-হিসাব সমন্বিত হয়েছে:",
      cardHtml: `
        <div class="bot-list-items">
          <div class="bot-item-row">
            <span class="bot-item-name">📦 PO #892: বিসমিল্লাহ ফেব্রিক্স</span>
            <span class="bot-tag-success"><span class="currency-taka">&#2547;</span>৭৫,০০০ (বিকাশে পরিশোধিত)</span>
          </div>
          <div class="bot-item-row">
            <span class="bot-item-name">📦 PO #893: এপেক্স ট্রিমস অ্যান্ড লেবেলস</span>
            <span class="bot-tag-critical"><span class="currency-taka">&#2547;</span>৪২,৫০০ (বকেয়া: ৫ই নভেম্বর)</span>
          </div>
        </div>
        <div class="bot-action-box">
          <div class="bot-action-info">
            <span class="bot-action-kicker">💳 স্বয়ংক্রিয় ব্যালেন্স শিট আপডেট</span>
            <span class="bot-action-title">+<span class="currency-taka">&#2547;</span>১,১৭,৫০০ টাকার ইনভেন্টরি এসেট যুক্ত হয়েছে</span>
          </div>
          <button type="button" class="bot-action-btn" id="heroActionBtn">
            <span>বকেয়া SMS শিডিউল করুন</span>
          </button>
        </div>
      `,
      confirmedText: "✓ SMS রিমাইন্ডার শিডিউলড!"
    }
  },

  meta: {
    topicEn: "📈 Meta Ads & Spend",
    topicBn: "📈 মেটা অ্যাড ও খরচ",
    en: {
      question: "How is our Meta ad campaign performing today? What is the ad spend?",
      lead: "Live Meta (Facebook & Instagram) ads spend & ROAS metrics:",
      cardHtml: `
        <div class="bot-card-grid-2">
          <div class="bot-card-stat">
            <span class="bot-stat-label">Ad Spend Today</span>
            <span class="bot-stat-val">$45.00 <small style="font-size:0.75rem; color:#059669;">(~<span class="currency-taka">&#2547;</span>5,490)</small></span>
            <span class="bot-stat-sub">24,500 Impressions · 18.2K Reach</span>
          </div>
          <div class="bot-card-stat">
            <span class="bot-stat-label">Purchases & ROAS</span>
            <span class="bot-stat-val">26 Orders <small style="color:#059669;">(5.2x)</small></span>
            <span class="bot-stat-sub">Cost Per Order: $1.73 (~<span class="currency-taka">&#2547;</span>211)</span>
          </div>
        </div>
        <div class="bot-action-box">
          <div class="bot-action-info">
            <span class="bot-action-kicker">🚀 AI Budget Optimization</span>
            <span class="bot-action-title">Peak hours ahead. Scale ad spend by +$15 for ~9 more sales?</span>
          </div>
          <button type="button" class="bot-action-btn" id="heroActionBtn">
            <span>Scale Budget Now</span>
          </button>
        </div>
      `,
      confirmedText: "✓ Budget Scaled to $60!"
    },
    bn: {
      question: "আজকের মেটা ফেসবুক ও ইনস্টাগ্রাম অ্যাড ক্যাম্পেইন কেমন চলছে? কত খরচ হলো?",
      lead: "লাইভ মেটা (ফেসবুক ও ইনস্টাগ্রাম) অ্যাড স্পেন্ড ও আরওএএস পারফরম্যান্স:",
      cardHtml: `
        <div class="bot-card-grid-2">
          <div class="bot-card-stat">
            <span class="bot-stat-label">আজকের অ্যাড খরচ</span>
            <span class="bot-stat-val">$৪৫.০০ <small style="font-size:0.75rem; color:#059669;">(~<span class="currency-taka">&#2547;</span>৫,৪৯০)</small></span>
            <span class="bot-stat-sub">২৪,৫০০ ইম্প্রেশন · ১৮.২K রিচ</span>
          </div>
          <div class="bot-card-stat">
            <span class="bot-stat-label">অর্ডার ও আরওএএস (ROAS)</span>
            <span class="bot-stat-val">২৬টি অর্ডার <small style="color:#059669;">(৫.২ গুণ রিটার্ন)</small></span>
            <span class="bot-stat-sub">প্রতি অর্ডারে খরচ: $১.৭৩ (~<span class="currency-taka">&#2547;</span>২১১)</span>
          </div>
        </div>
        <div class="bot-action-box">
          <div class="bot-action-info">
            <span class="bot-action-kicker">🚀 এআই বাজেট অপ্টিমাইজেশন</span>
            <span class="bot-action-title">সন্ধ্যায় পিক আওয়ার। বাজেট +$১৫ বাড়ালে সম্ভাব্য আরও ৯টি অর্ডার আসবে</span>
          </div>
          <button type="button" class="bot-action-btn" id="heroActionBtn">
            <span>বাজেট বাড়িয়ে দিন</span>
          </button>
        </div>
      `,
      confirmedText: "✓ বাজেট $৬০ এ বৃদ্ধি করা হয়েছে!"
    }
  }
};

const SCENARIO_ORDER = ['stock', 'orders', 'purchase', 'meta'];

function initHeroChatbot() {
  const container = document.getElementById('heroChatbotApp');
  if (!container) return;

  const sendBtn = document.getElementById('chatSendPromptBtn');
  const fakeInput = document.getElementById('chatFakeInput');

  if (sendBtn) {
    sendBtn.addEventListener('click', () => {
      advanceHeroToNextTopic();
    });
  }
  if (fakeInput) {
    fakeInput.addEventListener('click', () => {
      advanceHeroToNextTopic();
    });
  }

  // Hover pauses reading timer so user can inspect details
  container.addEventListener('mouseenter', () => {
    isHeroPaused = true;
  });
  container.addEventListener('mouseleave', () => {
    isHeroPaused = false;
  });

  // Start the very first realistic typing simulation
  runRealisticTypingScenario(SCENARIO_ORDER[currentHeroScenarioIndex]);
}

function advanceHeroToNextTopic() {
  clearTimeout(heroTypingTimeout);
  clearInterval(heroProgressInterval);
  clearTimeout(heroCycleTimer);
  currentHeroScenarioIndex = (currentHeroScenarioIndex + 1) % SCENARIO_ORDER.length;
  runRealisticTypingScenario(SCENARIO_ORDER[currentHeroScenarioIndex]);
}

function runRealisticTypingScenario(scenarioKey) {
  const lang = STATE.currentLang === 'bn' ? 'bn' : 'en';
  const data = HERO_CHAT_DATA[scenarioKey];
  if (!data) return;
  const content = data[lang];

  const fakeInput = document.getElementById('chatFakeInput');
  const inputPlaceholder = document.getElementById('chatInputPlaceholder');
  const typingInputText = document.getElementById('chatTypingInputText');
  const inputCursor = document.getElementById('chatInputCursor');
  const sendBtn = document.getElementById('chatSendPromptBtn');
  const topicBadge = document.getElementById('chatActiveTopicBadge');
  const progressBar = document.getElementById('chatProgressBar');

  const userRow = document.getElementById('chatUserRow');
  const userQuestion = document.getElementById('chatUserQuestion');
  const typingRow = document.getElementById('chatTypingRow');
  const botRow = document.getElementById('chatBotResponse');
  const replyLead = document.getElementById('chatReplyLead');
  const dynamicCard = document.getElementById('chatDynamicCard');

  if (!fakeInput || !typingInputText || !userRow || !botRow) return;

  // 1. Initial Reset: smoothly fade out previous turn
  userRow.classList.remove('visible');
  botRow.classList.remove('visible');
  typingRow.classList.remove('visible');
  typingRow.style.display = 'none';
  if (progressBar) progressBar.style.width = '0%';

  // Update Topic Badge in header
  if (topicBadge) {
    topicBadge.textContent = lang === 'bn' ? data.topicBn : data.topicEn;
  }

  // Reset Input state
  typingInputText.textContent = '';
  if (inputPlaceholder) inputPlaceholder.classList.remove('hidden');
  if (inputCursor) inputCursor.classList.remove('active');
  fakeInput.classList.remove('is-typing');
  if (sendBtn) {
    sendBtn.classList.remove('is-active', 'sending');
  }

  // 2. Start Typing Animation after a tiny natural pause (350ms)
  heroTypingTimeout = setTimeout(() => {
    if (inputPlaceholder) inputPlaceholder.classList.add('hidden');
    if (inputCursor) inputCursor.classList.add('active');
    fakeInput.classList.add('is-typing');

    const fullText = content.question;
    let charIndex = 0;

    function typeNextChar() {
      if (charIndex < fullText.length) {
        typingInputText.textContent += fullText.charAt(charIndex);
        charIndex++;

        // Random realistic typing interval between 24ms and 42ms
        const typingSpeed = Math.floor(Math.random() * 18) + 24;
        heroTypingTimeout = setTimeout(typeNextChar, typingSpeed);
      } else {
        // Typing finished! Highlight send button
        if (sendBtn) sendBtn.classList.add('is-active');

        // Pause 320ms, then simulate hitting Send
        heroTypingTimeout = setTimeout(() => {
          if (sendBtn) {
            sendBtn.classList.add('sending');
            setTimeout(() => sendBtn.classList.remove('sending'), 160);
          }

          // Clear text box & remove cursor
          typingInputText.textContent = '';
          if (inputCursor) inputCursor.classList.remove('active');
          if (inputPlaceholder) inputPlaceholder.classList.remove('hidden');
          fakeInput.classList.remove('is-typing');
          if (sendBtn) sendBtn.classList.remove('is-active');

          // Send message into conversation!
          userQuestion.textContent = fullText;
          userRow.classList.add('visible');

          // 3. Show Bot Thinking Dots
          setTimeout(() => {
            botRow.style.display = 'none';
            typingRow.style.display = 'flex';
            requestAnimationFrame(() => typingRow.classList.add('visible'));

            // 4. Reveal Bot Response after 500ms thinking
            setTimeout(() => {
              typingRow.classList.remove('visible');
              typingRow.style.display = 'none';
              replyLead.textContent = content.lead;
              dynamicCard.innerHTML = content.cardHtml;
              botRow.style.display = 'flex';
              requestAnimationFrame(() => {
                botRow.classList.add('visible');
                attachActionBtnHandler(content);

                // 5. Start Reading Timer & Progress Bar
                startReadingCycle();
              });
            }, 500);
          }, 200);
        }, 320);
      }
    }

    typeNextChar();
  }, 350);
}

function startReadingCycle() {
  heroProgressPercent = 0;
  const progressBar = document.getElementById('chatProgressBar');

  clearInterval(heroProgressInterval);
  heroProgressInterval = setInterval(() => {
    if (!isHeroPaused) {
      heroProgressPercent += (100 / (HERO_READ_DURATION / 100));
      if (progressBar) {
        progressBar.style.width = `${Math.min(heroProgressPercent, 100)}%`;
      }

      if (heroProgressPercent >= 100) {
        clearInterval(heroProgressInterval);
        currentHeroScenarioIndex = (currentHeroScenarioIndex + 1) % SCENARIO_ORDER.length;
        runRealisticTypingScenario(SCENARIO_ORDER[currentHeroScenarioIndex]);
      }
    }
  }, 100);
}

function attachActionBtnHandler(content) {
  const actionBtn = document.getElementById('heroActionBtn');
  if (!actionBtn) return;

  actionBtn.addEventListener('click', () => {
    if (actionBtn.classList.contains('confirmed')) return;
    actionBtn.classList.add('confirmed');
    actionBtn.innerHTML = `<span>${content.confirmedText}</span>`;
  });
}

function updateHeroChatbotLanguage(lang) {
  clearTimeout(heroTypingTimeout);
  clearInterval(heroProgressInterval);
  runRealisticTypingScenario(SCENARIO_ORDER[currentHeroScenarioIndex]);
}


/**
 * SECTION 4: 12 CORE MODULES TAB FILTERING
 */
function initModulesFilter() {
  const tabBtns = document.querySelectorAll('.modules-tab-btn');
  const cards = document.querySelectorAll('.module-matrix-card');

  if (!tabBtns.length || !cards.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const selectedTab = btn.getAttribute('data-tab');

      // Update active button state
      tabBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      // Filter cards with smooth fade/scale
      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (selectedTab === 'all' || category === selectedTab) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          card.style.transform = 'scale(0.96)';
          requestAnimationFrame(() => {
            card.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          });
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}


/**
 * SECTION 5: INTERACTIVE LIVE POS SANDBOX & THERMAL RECEIPT MODAL
 */
function initPosInteractiveSandbox() {
  const cartBody = document.getElementById('posCartBody');
  const subtotalEl = document.getElementById('posSubtotalDisplay');
  const discountEl = document.getElementById('posDiscountDisplay');
  const vatEl = document.getElementById('posVatDisplay');
  const grandTotalEl = document.getElementById('posGrandTotalDisplay');
  const cashTenderedEl = document.getElementById('posCashTendered');
  const bkashTenderedEl = document.getElementById('posBkashTendered');
  const receiptModal = document.getElementById('posReceiptModal');
  const toastEl = document.getElementById('posLiveToast');

  if (!cartBody) return;

  // Active state data for the 3 items
  const items = [
    { id: 'shirt', name: 'Premium Oxford Formal Shirt', sku: 'SHT-BLU-42', barcode: '8941100234', price: 1850, qty: 1 },
    { id: 'denim', name: 'Slim Fit Raw Denim', sku: 'DNM-IND-32', barcode: '8941100882', price: 1950, qty: 1 },
    { id: 'polo',  name: 'Pique Cotton Polo Tee', sku: 'POL-BLK-L', barcode: '8941100911', price: 950, qty: 1 }
  ];

  let currentPayMode = 'split'; // 'split', 'cash', 'bkash'

  function formatTaka(amount) {
    return amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function recalculateCart() {
    let subtotal = 0;

    items.forEach(item => {
      const row = cartBody.querySelector(`.pos-item-row[data-id="${item.id}"]`);
      if (row) {
        const qtyVal = row.querySelector('.pos-qty-val');
        const rowTotal = row.querySelector('.item-row-total');
        if (qtyVal) qtyVal.textContent = item.qty;
        if (rowTotal) {
          const itemTotal = item.qty * item.price;
          rowTotal.innerHTML = `<strong><span class="currency-taka">&#2547;</span>${itemTotal.toLocaleString('en-US')}</strong>`;
        }
      }
      subtotal += item.qty * item.price;
    });

    const discount = subtotal * 0.10; // 10% invoice discount
    const taxable = subtotal - discount;
    const vat = taxable * 0.05; // 5% Mushak 6.3 VAT
    const grandTotal = taxable + vat;

    // Update summary in POS view
    if (subtotalEl) subtotalEl.innerHTML = `<span class="currency-taka">&#2547;</span>${formatTaka(subtotal)}`;
    if (discountEl) discountEl.innerHTML = `-<span class="currency-taka">&#2547;</span>${formatTaka(discount)}`;
    if (vatEl) vatEl.innerHTML = `<span class="currency-taka">&#2547;</span>${formatTaka(vat)}`;
    if (grandTotalEl) grandTotalEl.innerHTML = `<span class="currency-taka">&#2547;</span>${formatTaka(grandTotal)}`;

    // Update payment settlement amounts
    if (currentPayMode === 'split') {
      const cashPart = 2000;
      const bkashPart = Math.max(0, grandTotal - cashPart);
      if (cashTenderedEl) cashTenderedEl.innerHTML = `<span class="currency-taka">&#2547;</span>${formatTaka(cashPart)}`;
      if (bkashTenderedEl) bkashTenderedEl.innerHTML = `<span class="currency-taka">&#2547;</span>${formatTaka(bkashPart)}`;
    } else if (currentPayMode === 'cash') {
      if (cashTenderedEl) cashTenderedEl.innerHTML = `<span class="currency-taka">&#2547;</span>${formatTaka(grandTotal)}`;
      if (bkashTenderedEl) bkashTenderedEl.innerHTML = `<span class="currency-taka">&#2547;</span>0.00`;
    } else if (currentPayMode === 'bkash') {
      if (cashTenderedEl) cashTenderedEl.innerHTML = `<span class="currency-taka">&#2547;</span>0.00`;
      if (bkashTenderedEl) bkashTenderedEl.innerHTML = `<span class="currency-taka">&#2547;</span>${formatTaka(grandTotal)}`;
    }

    return { subtotal, discount, vat, grandTotal };
  }

  // Handle + and - buttons
  cartBody.addEventListener('click', (e) => {
    const minusBtn = e.target.closest('.pos-minus');
    const plusBtn = e.target.closest('.pos-plus');
    if (!minusBtn && !plusBtn) return;

    const row = e.target.closest('.pos-item-row');
    if (!row) return;

    const id = row.getAttribute('data-id');
    const item = items.find(i => i.id === id);
    if (!item) return;

    if (plusBtn) {
      item.qty += 1;
    } else if (minusBtn) {
      if (item.qty > 1) {
        item.qty -= 1;
      } else {
        showToast('⚠️ Minimum item quantity is 1');
        return;
      }
    }

    recalculateCart();
  });

  // Handle payment method toggle pills
  document.querySelectorAll('.pos-pay-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.pos-pay-pill').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentPayMode = btn.getAttribute('data-pay-mode') || 'split';
      recalculateCart();
    });
  });

  // Handle Complete Sale & Print Thermal Receipt
  const printBtn = document.getElementById('posCompletePrintBtn');
  if (printBtn && receiptModal) {
    printBtn.addEventListener('click', () => {
      const calc = recalculateCart();

      // Populate thermal receipt
      const receiptList = document.getElementById('receiptItemsList');
      if (receiptList) {
        receiptList.innerHTML = items.map(item => `
          <div class="receipt-item-row">
            <div class="receipt-item-title-row">
              <span>${item.name}</span>
              <span><span class="currency-taka">&#2547;</span>${(item.qty * item.price).toLocaleString('en-US')}</span>
            </div>
            <div class="receipt-item-sub-row">
              ${item.qty} pcs x <span class="currency-taka">&#2547;</span>${item.price.toLocaleString('en-US')} [SKU: ${item.sku}]
            </div>
          </div>
        `).join('');
      }

      const now = new Date();
      const dateStr = now.toISOString().slice(0, 10) + ' ' + now.toTimeString().slice(0, 5);
      const dtEl = document.getElementById('receiptDateTime');
      if (dtEl) dtEl.textContent = dateStr;

      const subEl = document.getElementById('receiptSubtotal');
      const discEl = document.getElementById('receiptDiscount');
      const vatR = document.getElementById('receiptVat');
      const grandR = document.getElementById('receiptGrandTotal');
      const modeEl = document.getElementById('receiptPayMode');
      const rCash = document.getElementById('receiptCashTendered');
      const rBkash = document.getElementById('receiptBkashTendered');

      if (subEl) subEl.innerHTML = `<span class="currency-taka">&#2547;</span>${formatTaka(calc.subtotal)}`;
      if (discEl) discEl.innerHTML = `-<span class="currency-taka">&#2547;</span>${formatTaka(calc.discount)}`;
      if (vatR) vatR.innerHTML = `<span class="currency-taka">&#2547;</span>${formatTaka(calc.vat)}`;
      if (grandR) grandR.innerHTML = `<span class="currency-taka">&#2547;</span>${formatTaka(calc.grandTotal)}`;

      if (modeEl) {
        modeEl.textContent = currentPayMode === 'split' ? 'Split (Cash + bKash)' : (currentPayMode === 'cash' ? 'Cash Tendered' : 'bKash Merchant Pay');
      }
      if (rCash) rCash.innerHTML = currentPayMode === 'bkash' ? '<span class="currency-taka">&#2547;</span>0.00' : (currentPayMode === 'cash' ? `<span class="currency-taka">&#2547;</span>${formatTaka(calc.grandTotal)}` : '<span class="currency-taka">&#2547;</span>2,000.00');
      if (rBkash) rBkash.innerHTML = currentPayMode === 'cash' ? '<span class="currency-taka">&#2547;</span>0.00' : (currentPayMode === 'bkash' ? `<span class="currency-taka">&#2547;</span>${formatTaka(calc.grandTotal)}` : `<span class="currency-taka">&#2547;</span>${formatTaka(Math.max(0, calc.grandTotal - 2000))}`);

      receiptModal.classList.add('is-active');
      receiptModal.setAttribute('aria-hidden', 'false');
    });
  }

  // Close receipt modal
  const closeBtn1 = document.getElementById('closeReceiptBtn');
  const closeBtn2 = document.getElementById('closeReceiptBtn2');
  const backdrop = document.getElementById('posReceiptBackdrop');

  [closeBtn1, closeBtn2, backdrop].forEach(el => {
    if (el) {
      el.addEventListener('click', () => {
        if (receiptModal) {
          receiptModal.classList.remove('is-active');
          receiptModal.setAttribute('aria-hidden', 'true');
        }
      });
    }
  });

  // SMS e-Memo action
  const smsBtn = document.getElementById('posSmsBtn');
  if (smsBtn) {
    smsBtn.addEventListener('click', () => {
      showToast('📱 SMS Memo sent to customer: +8801711-XXXXXX');
    });
  }

  // Stock transfer challan action
  const challanBtn = document.getElementById('stockTransferChallanBtn');
  if (challanBtn) {
    challanBtn.addEventListener('click', () => {
      showToast('📦 Transfer Challan #TR-8821 created: 10 pcs dispatched to Banani Outlet');
    });
  }

  // Accounts PDF P&L action
  const pdfBtn = document.getElementById('accountsDownloadPdfBtn');
  if (pdfBtn) {
    pdfBtn.addEventListener('click', () => {
      showToast('📄 Generated P&L Financial Report (PDF Ready)');
    });
  }

  function showToast(message) {
    if (!toastEl) return;
    toastEl.innerHTML = message;
    toastEl.classList.add('show');
    clearTimeout(toastEl._timer);
    toastEl._timer = setTimeout(() => {
      toastEl.classList.remove('show');
    }, 3200);
  }
}


/**
 * SECTION 6: TAILORED INDUSTRY SOLUTIONS TAB SWITCHER
 */
function initIndustryTabs() {
  const tabBtns = document.querySelectorAll('.industry-tab-btn');
  const panes = document.querySelectorAll('.industry-tab-pane');

  if (!tabBtns.length || !panes.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetIndustry = btn.getAttribute('data-industry-tab');

      // Update button active state
      tabBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      // Update pane active state
      panes.forEach(pane => {
        pane.classList.remove('active');
      });

      const activePane = document.getElementById(`ind-pane-${targetIndustry}`);
      if (activePane) {
        activePane.classList.add('active');
      }
    });
  });
}


/**
 * SECTION 8: COMPACT INTERACTIVE SPOTLIGHT CONSOLE (Auto-Cycle & Click)
 */
function initSpotlightConsole() {
  const stepBtns = document.querySelectorAll('.spotlight-step-btn');
  const panes = document.querySelectorAll('.spotlight-stage-pane');
  const consoleCard = document.querySelector('.spotlight-console-card');

  if (!stepBtns.length || !panes.length) return;

  let currentIndex = 0;
  let autoTimer = null;
  let isHovered = false;

  function switchSpotlight(index) {
    currentIndex = index;

    // Update buttons
    stepBtns.forEach((btn, i) => {
      const isActive = i === index;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    // Update panes: re-trigger the down-to-top entrance animation
    const targetId = stepBtns[index].getAttribute('data-spotlight-target');
    panes.forEach(pane => {
      const isTarget = pane.id === targetId;
      if (isTarget) {
        pane.classList.remove('active');
        // Force DOM reflow to re-trigger CSS keyframe animation on every click
        void pane.offsetWidth;
        pane.classList.add('active');
      } else {
        pane.classList.remove('active');
      }
    });
  }

  // Handle click on any stepper
  stepBtns.forEach((btn, i) => {
    btn.addEventListener('click', () => {
      switchSpotlight(i);
      resetAutoCycle();
    });
  });

  // Auto-cycle every 6 seconds unless hovered
  function startAutoCycle() {
    autoTimer = setInterval(() => {
      if (!isHovered) {
        let nextIndex = (currentIndex + 1) % stepBtns.length;
        switchSpotlight(nextIndex);
      }
    }, 6000);
  }

  function resetAutoCycle() {
    clearInterval(autoTimer);
    startAutoCycle();
  }

  if (consoleCard) {
    consoleCard.addEventListener('mouseenter', () => { isHovered = true; });
    consoleCard.addEventListener('mouseleave', () => { isHovered = false; });
  }

  startAutoCycle();
}

/**
 * 11. CLIENT SUCCESS STORIES SLIDER (MODERN 3-AT-A-TIME CAROUSEL)
 * Displays 3 testimonials at a time on desktop, 10 authentic Bangladeshi client stories,
 * smooth left-to-right swipe/drag physics, 3D depth transitions, active card highlights,
 * and dynamic bilingual status chip.
 */
function initTestimonialsSlider() {
  const track = document.getElementById('storiesTrack');
  const trackWrapper = track ? track.parentElement : null;
  const prevBtn = document.getElementById('storyPrevBtn');
  const nextBtn = document.getElementById('storyNextBtn');
  const dotsContainer = document.getElementById('storyPaginationDots');
  const statusChip = document.getElementById('storyStatusChip');
  const filterBtns = document.querySelectorAll('.story-filter-btn');
  const sliderContainer = document.getElementById('testimonialsSlider');

  if (!track || !prevBtn || !nextBtn) return;

  const cards = Array.from(track.querySelectorAll('.story-card'));
  let currentFilter = 'all';
  let currentIndex = 0;
  let autoPlayTimer = null;
  let isHovered = false;

  // Real-time Drag / Swipe Physics State
  let isDragging = false;
  let startX = 0;
  let currentX = 0;
  let deltaX = 0;
  let startTranslate = 0;

  function toBnNum(num) {
    const bnDigits = ['০','১','২','৩','৪','৫','৬','৭','৮','৯'];
    return String(num).replace(/[0-9]/g, d => bnDigits[d]);
  }

  function getVisibleCards() {
    return cards.filter(card => !card.classList.contains('is-filtered-out'));
  }

  function getCardsPerView() {
    if (typeof window === 'undefined') return 3;
    if (window.innerWidth > 1024) return 3;
    if (window.innerWidth > 720) return 2;
    return 1;
  }

  function getMaxIndex() {
    const visibleCount = getVisibleCards().length;
    const cardsPerView = getCardsPerView();
    return Math.max(0, visibleCount - cardsPerView);
  }

  function renderDots() {
    if (!dotsContainer) return;
    const maxIdx = getMaxIndex();
    const totalDots = maxIdx + 1;

    dotsContainer.innerHTML = '';
    if (totalDots <= 1) return;

    for (let i = 0; i < totalDots; i++) {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = `slider-dot ${i === currentIndex ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Slide ${i + 1}`);
      dot.addEventListener('click', () => {
        currentIndex = i;
        updateSlider(true);
        resetAutoPlay();
      });
      dotsContainer.appendChild(dot);
    }
  }

  function updateDots() {
    if (!dotsContainer) return;
    const dots = dotsContainer.querySelectorAll('.slider-dot');
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentIndex);
    });
  }

  function updateCardHighlightsAndChip() {
    const visibleCards = getVisibleCards();
    const cpv = getCardsPerView();

    visibleCards.forEach((card, idx) => {
      const inView = idx >= currentIndex && idx < currentIndex + cpv;
      card.classList.toggle('is-in-view', inView);
      card.classList.toggle('is-out-of-view', !inView);
    });

    if (statusChip) {
      const total = visibleCards.length;
      if (total === 0) {
        statusChip.textContent = '';
        return;
      }
      const start = currentIndex + 1;
      const end = Math.min(currentIndex + cpv, total);
      const isBn = (typeof STATE !== 'undefined' && STATE.currentLang === 'bn') ||
                   document.body.classList.contains('lang-bn');

      if (isBn) {
        statusChip.textContent = `নির্বাচিত গল্প ${toBnNum(start)}–${toBnNum(end)} · দেশব্যাপী ২০০+ সফল ক্লায়েন্ট`;
      } else {
        statusChip.textContent = `Featured Stories ${start}–${end} · Trusted by 200+ Businesses Nationwide`;
      }
    }
  }

  function getStepOffset() {
    const visibleCards = getVisibleCards();
    if (visibleCards.length === 0) return 0;
    const firstCard = visibleCards[0];
    const cardWidth = (firstCard && firstCard.offsetWidth) ? firstCard.offsetWidth : 380;
    const gap = 24; // 1.5rem gap
    return cardWidth + gap;
  }

  function updateSlider(animated = true) {
    const visibleCards = getVisibleCards();
    const maxIdx = getMaxIndex();

    if (currentIndex > maxIdx) {
      currentIndex = maxIdx;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    }

    if (!animated) {
      track.classList.add('no-transition');
    } else {
      track.classList.remove('no-transition');
    }

    if (visibleCards.length === 0) {
      track.style.transform = 'translate3d(0px, 0, 0)';
      updateDots();
      updateCardHighlightsAndChip();
      return;
    }

    const step = getStepOffset();
    const offset = currentIndex * step;

    track.style.transform = `translate3d(-${offset}px, 0, 0)`;
    updateDots();
    updateCardHighlightsAndChip();
  }

  // Slide left to right (swiped/animated from left to right - brings cards from left)
  function slideLeftToRight() {
    const maxIdx = getMaxIndex();
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = maxIdx;
    }
    updateSlider(true);
    resetAutoPlay();
  }

  // Slide right to left (advances to next cards)
  function slideRightToLeft() {
    const maxIdx = getMaxIndex();
    if (currentIndex < maxIdx) {
      currentIndex++;
    } else {
      currentIndex = 0;
    }
    updateSlider(true);
    resetAutoPlay();
  }

  // Navigation button listeners
  prevBtn.addEventListener('click', () => {
    slideLeftToRight();
  });

  nextBtn.addEventListener('click', () => {
    slideRightToLeft();
  });

  // Industry Filter Buttons
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter') || 'all';
      currentFilter = filter;

      filterBtns.forEach(b => b.classList.toggle('active', b === btn));

      cards.forEach(card => {
        const cat = card.getAttribute('data-category');
        const match = filter === 'all' || cat === filter;
        card.classList.toggle('is-filtered-out', !match);
      });

      currentIndex = 0;
      renderDots();
      updateSlider(true);
      resetAutoPlay();
    });
  });

  // Touch & Mouse Drag Physics (Enables swiping left-to-right with momentum)
  function handleDragStart(clientX) {
    const visibleCards = getVisibleCards();
    if (visibleCards.length <= getCardsPerView()) return;

    isDragging = true;
    startX = clientX;
    currentX = clientX;
    deltaX = 0;

    const step = getStepOffset();
    startTranslate = -(currentIndex * step);

    if (trackWrapper) trackWrapper.classList.add('is-dragging');
    track.classList.add('no-transition');
    clearInterval(autoPlayTimer);
  }

  function handleDragMove(clientX) {
    if (!isDragging) return;
    currentX = clientX;
    deltaX = currentX - startX;

    const maxIdx = getMaxIndex();
    // Elastic rubberband resistance at boundaries
    let dampDelta = deltaX;
    if ((currentIndex === 0 && deltaX > 0) || (currentIndex === maxIdx && deltaX < 0)) {
      dampDelta = deltaX * 0.35;
    }

    track.style.transform = `translate3d(${startTranslate + dampDelta}px, 0, 0)`;
  }

  function handleDragEnd() {
    if (!isDragging) return;
    isDragging = false;

    if (trackWrapper) trackWrapper.classList.remove('is-dragging');
    track.classList.remove('no-transition');

    // Threshold for swipe action
    if (deltaX > 45) {
      // Swiped from left to right!
      slideLeftToRight();
    } else if (deltaX < -45) {
      // Swiped from right to left!
      slideRightToLeft();
    } else {
      // Snapped back
      updateSlider(true);
    }

    resetAutoPlay();
  }

  // Touch swipe events
  track.addEventListener('touchstart', (e) => {
    if (e.touches && e.touches[0]) {
      handleDragStart(e.touches[0].clientX);
    }
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (isDragging && e.touches && e.touches[0]) {
      handleDragMove(e.touches[0].clientX);
    }
  }, { passive: true });

  window.addEventListener('touchend', () => {
    if (isDragging) handleDragEnd();
  }, { passive: true });

  window.addEventListener('touchcancel', () => {
    if (isDragging) handleDragEnd();
  }, { passive: true });

  // Mouse drag events (Desktop swipe support)
  if (trackWrapper) {
    trackWrapper.addEventListener('mousedown', (e) => {
      if (e.button !== 0) return;
      e.preventDefault();
      handleDragStart(e.clientX);
    });
  }

  window.addEventListener('mousemove', (e) => {
    if (isDragging) {
      e.preventDefault();
      handleDragMove(e.clientX);
    }
  });

  window.addEventListener('mouseup', () => {
    if (isDragging) handleDragEnd();
  });

  // Auto-play cycling across all 10 stories smoothly
  function startAutoPlay() {
    clearInterval(autoPlayTimer);
    autoPlayTimer = setInterval(() => {
      if (!isHovered && !isDragging) {
        const maxIdx = getMaxIndex();
        if (maxIdx > 0) {
          currentIndex = (currentIndex + 1) > maxIdx ? 0 : currentIndex + 1;
          updateSlider(true);
        }
      }
    }, 6000);
  }

  function resetAutoPlay() {
    clearInterval(autoPlayTimer);
    startAutoPlay();
  }

  if (sliderContainer) {
    sliderContainer.addEventListener('mouseenter', () => { isHovered = true; });
    sliderContainer.addEventListener('mouseleave', () => { isHovered = false; });
  }

  // Handle Window Resize
  let resizeTimer = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      renderDots();
      updateSlider(false);
    }, 120);
  });

  // Expose language updater to bilingual engine
  window.updateTestimonialsLanguage = function() {
    updateCardHighlightsAndChip();
  };

  // Initial render
  renderDots();
  updateSlider(false);
  startAutoPlay();
}

/**
 * SECTION 14: MOBILE POS FLAGSHIP SHOWCASE BANNER (#contact)
 * Lead Capture Form with Bangladeshi Phone Validation & Interactive Feedback
 */
function initMobilePosBanner() {
  const form = document.getElementById('posLeadForm');
  const input = document.getElementById('posLeadPhoneInput');
  const btn = document.getElementById('posSubmitBtn');
  const alertEl = document.getElementById('posFormAlert');

  if (!form || !input) return;

  // Clear error alert when user types
  input.addEventListener('input', () => {
    if (alertEl && alertEl.classList.contains('is-error')) {
      alertEl.style.display = 'none';
      alertEl.classList.remove('is-error');
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const rawVal = input.value.trim().replace(/[\s-]/g, '');
    const cleanNumber = rawVal.replace(/^(?:\+88|88)/, '');

    // Bangladeshi mobile number format: 01 followed by 3-9 and 8 more digits (total 11 digits)
    const bdPhoneRegex = /^01[3-9]\d{8}$/;

    const lang = (window.STATE && window.STATE.currentLang === 'bn') ? 'bn' : 'en';
    const dict = (window.TRANSLATIONS && window.TRANSLATIONS[lang]) ? window.TRANSLATIONS[lang] : {};

    if (!bdPhoneRegex.test(cleanNumber)) {
      if (alertEl) {
        alertEl.className = 'pos-form-alert is-error';
        alertEl.style.display = 'block';
        alertEl.innerHTML = '⚠️ ' + (dict['mobilePos.invalidPhone'] || 'Please enter a valid 11-digit Bangladeshi mobile number (e.g. 01712345678).');
      }
      input.focus();
      return;
    }

    // Valid submission: simulate fast API response
    const origBtnHtml = btn ? btn.innerHTML : '';
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = '<span class="btn-spinner" aria-hidden="true"></span> <span>' + (lang === 'bn' ? 'অনুরোধ পাঠানো হচ্ছে...' : 'Submitting...') + '</span>';
    }

    // Dispatch Lead Notification to Email
    dispatchLeadNotification({
      type: 'Quick Mobile POS Demo Phone Lead',
      phone: cleanNumber,
      language: lang,
      submittedAt: new Date().toLocaleString('en-US', { timeZone: 'Asia/Dhaka' }) + ' (Dhaka Time)'
    });

    setTimeout(() => {
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = origBtnHtml;
      }
      input.value = '';

      if (alertEl) {
        alertEl.className = 'pos-form-alert is-success';
        alertEl.style.display = 'block';
        alertEl.innerHTML = '<div class="pos-alert-inner">' +
          '<span class="pos-alert-icon">✓</span>' +
          '<div class="pos-alert-text">' +
            '<strong>' + (lang === 'bn' ? 'সফলভাবে নিবন্ধিত!' : 'Request Received!') + '</strong>' +
            '<p>' + (dict['mobilePos.successMsg'] || 'Thank you! Our senior software consultant will call your number within 15 minutes.') + '</p>' +
          '</div>' +
        '</div>';

        // Auto dismiss after 8 seconds
        setTimeout(() => {
          if (alertEl.classList.contains('is-success')) {
            alertEl.style.display = 'none';
          }
        }, 8000);
      }
    }, 650);
  });
}

/**
 * SECTION 14: MOBILE POS REALTIME 3D SELL & SCAN SIMULATOR
 * Demonstrates: Camera Scan -> Recognize Barcode -> Add to Cart -> Sell & Pay Now -> Print Receipt
 */
let mposSimTimer = null;
let isMposPaused = false;

function initMposAnimation() {
  const viewport = document.getElementById('mposViewport');
  if (!viewport) return;

  const cursor = document.getElementById('mposTouchCursor');
  const cam = document.getElementById('mposCamOverlay');
  const flash = document.getElementById('camFlash');
  const camStatus = document.getElementById('camStatusText');
  const addedCard = document.getElementById('mposAddedCard');
  const receipt = document.getElementById('mposReceiptOverlay');
  const fill = document.getElementById('mposTimelineFill');

  // Mini scrub buttons inside phone (if present)
  const s0 = document.getElementById('stepBtn0');
  const s1 = document.getElementById('stepBtn1');
  const s2 = document.getElementById('stepBtn2');
  const miniStepBtns = [s0, s1, s2].filter(Boolean);

  // Prominent Interactive Step Controller Pills (Senior UX)
  const p0 = document.getElementById('mposPill0');
  const p1 = document.getElementById('mposPill1');
  const p2 = document.getElementById('mposPill2');
  const p3 = document.getElementById('mposPill3');
  const pillBtns = [p0, p1, p2, p3].filter(Boolean);

  const getLang = () => (window.STATE && window.STATE.currentLang === 'bn') ? 'bn' : 'en';

  let isPaused = false;
  let flowTimer = null;
  let progressTimer = null;
  let currentStep = 0; // 0: Scan, 1: Cart, 2: Pay, 3: Receipt
  let progress = 0;
  const TOTAL_CYCLE_MS = 11500;
  const TICK_MS = 50;

  function setActiveStep(idx) {
    currentStep = idx;
    pillBtns.forEach((p, i) => {
      if (p) {
        const isActive = i === idx;
        p.classList.toggle('active', isActive);
        p.setAttribute('aria-selected', isActive ? 'true' : 'false');
      }
    });

    miniStepBtns.forEach((b, i) => {
      if (b) {
        const miniIdx = idx === 3 ? 2 : (idx >= 1 ? 1 : 0);
        b.classList.toggle('active', i === miniIdx);
      }
    });
  }

  function resetAll() {
    clearTimeout(flowTimer);
    if (cam) cam.classList.remove('is-active');
    if (flash) flash.classList.remove('flash');
    if (addedCard) addedCard.classList.remove('is-active');
    if (receipt) receipt.classList.remove('is-active');
    if (cursor) cursor.classList.remove('is-visible', 'is-tapping');
    if (camStatus) {
      camStatus.textContent = getLang() === 'bn' ? 'পণ্যের বারকোড স্ক্যান হচ্ছে...' : 'Scanning product barcode...';
    }
  }

  // Senior UX Video Flow:
  // Step 0: Scan Barcode -> Step 1: Add to Cart -> Step 2: Tap & Pay -> Step 3: Print Slip
  function runFlow(startPhase = 0) {
    resetAll();
    setActiveStep(startPhase);

    if (startPhase === 0) {
      progress = 0;
      // Phase 1: Tap blue Camera Scan button on search bar (top: 19.8%, left: 85.5%)
      flowTimer = setTimeout(() => {
        if (isPaused) return;
        if (cursor) {
          cursor.style.top = '19.8%';
          cursor.style.left = '85.5%';
          cursor.classList.add('is-visible');
        }

        setTimeout(() => {
          if (cursor) cursor.classList.add('is-tapping');

          setTimeout(() => {
            if (cursor) cursor.classList.remove('is-visible', 'is-tapping');
            if (cam) cam.classList.add('is-active');

            // Barcode recognition after 1.5s
            flowTimer = setTimeout(() => {
              if (flash) {
                flash.classList.add('flash');
                setTimeout(() => flash.classList.remove('flash'), 160);
              }
              if (camStatus) {
                camStatus.textContent = getLang() === 'bn' ? '✓ স্ক্যান সফল: কটন ফর্মাল শার্ট (৳১,৪৫০)' : '✓ Scanned: Cotton Formal Shirt (৳1,450)';
              }

              // Auto advance to Step 1: Cart
              flowTimer = setTimeout(() => {
                runFlow(1);
              }, 1200);

            }, 1400);

          }, 320);

        }, 300);

      }, 500);

    } else if (startPhase === 1) {
      progress = 35;
      if (cam) cam.classList.remove('is-active');
      if (addedCard) addedCard.classList.add('is-active');

      // Auto advance to Step 2: Pay Now
      flowTimer = setTimeout(() => {
        runFlow(2);
      }, 1600);

    } else if (startPhase === 2) {
      progress = 60;
      if (addedCard) addedCard.classList.add('is-active');

      // Tap green "Pay Now" button at bottom (top: 94.2%, left: 68%)
      if (cursor) {
        cursor.style.top = '94.2%';
        cursor.style.left = '68%';
        cursor.classList.add('is-visible');
      }

      flowTimer = setTimeout(() => {
        if (cursor) cursor.classList.add('is-tapping');

        setTimeout(() => {
          if (cursor) cursor.classList.remove('is-visible', 'is-tapping');
          runFlow(3);
        }, 400);

      }, 700);

    } else if (startPhase === 3) {
      progress = 85;
      if (addedCard) addedCard.classList.remove('is-active');
      if (receipt) receipt.classList.add('is-active');

      // Loop after 3.8s
      flowTimer = setTimeout(() => {
        if (!isPaused) {
          runFlow(0);
        }
      }, 3800);
    }
  }

  // Smooth continuous timeline progress scrubber
  function startProgressScrubber() {
    clearInterval(progressTimer);
    progressTimer = setInterval(() => {
      if (isPaused) return;

      progress += (TICK_MS / TOTAL_CYCLE_MS) * 100;
      if (progress >= 100) {
        progress = 0;
      }

      if (fill) fill.style.width = progress + '%';
    }, TICK_MS);
  }

  // Interactive step controller pills (Click to jump to any state)
  if (p0) {
    p0.addEventListener('click', (e) => {
      e.stopPropagation();
      runFlow(0);
    });
  }
  if (p1) {
    p1.addEventListener('click', (e) => {
      e.stopPropagation();
      resetAll();
      setActiveStep(1);
      if (addedCard) addedCard.classList.add('is-active');
      progress = 35;
    });
  }
  if (p2) {
    p2.addEventListener('click', (e) => {
      e.stopPropagation();
      resetAll();
      setActiveStep(2);
      if (addedCard) addedCard.classList.add('is-active');
      if (cursor) {
        cursor.style.top = '94.2%';
        cursor.style.left = '68%';
        cursor.classList.add('is-visible');
        setTimeout(() => {
          cursor.classList.add('is-tapping');
          setTimeout(() => {
            cursor.classList.remove('is-visible', 'is-tapping');
            runFlow(3);
          }, 350);
        }, 300);
      }
      progress = 60;
    });
  }
  if (p3) {
    p3.addEventListener('click', (e) => {
      e.stopPropagation();
      resetAll();
      setActiveStep(3);
      if (receipt) receipt.classList.add('is-active');
      progress = 85;
    });
  }

  // Mini scrub buttons inside phone (backwards compatibility)
  if (s0) s0.addEventListener('click', () => runFlow(0));
  if (s1) s1.addEventListener('click', () => { resetAll(); setActiveStep(1); if (addedCard) addedCard.classList.add('is-active'); progress = 35; });
  if (s2) s2.addEventListener('click', () => { resetAll(); setActiveStep(3); if (receipt) receipt.classList.add('is-active'); progress = 85; });

  // Hover to pause
  viewport.addEventListener('mouseenter', () => { isPaused = true; });
  viewport.addEventListener('mouseleave', () => { isPaused = false; });

  const controller = document.getElementById('mposInteractiveController');
  if (controller) {
    controller.addEventListener('mouseenter', () => { isPaused = true; });
    controller.addEventListener('mouseleave', () => { isPaused = false; });
  }

  // Bilingual hook
  window.updateMposAnimationLanguage = function() {
    const dict = (window.TRANSLATIONS && window.TRANSLATIONS[getLang()]) ? window.TRANSLATIONS[getLang()] : {};
    if (camStatus) {
      if (camStatus.textContent.includes('✓')) {
        camStatus.textContent = getLang() === 'bn' ? '✓ স্ক্যান সফল: কটন ফর্মাল শার্ট (৳১,৪৫০)' : '✓ Scanned: Cotton Formal Shirt (৳1,450)';
      } else {
        camStatus.textContent = getLang() === 'bn' ? 'পণ্যের বারকোড স্ক্যান হচ্ছে...' : 'Scanning product barcode...';
      }
    }
  };

  // Launch initial animation flow & scrubber
  runFlow(0);
  startProgressScrubber();
}


/**
 * CONCEPT A: RAMP-INSPIRED INTERACTIVE AUTOMATION STAGE
 */
function initRampInteractiveStage() {
  const container = document.getElementById('rampInteractiveStage');
  if (!container) return;

  const pillarCards = container.querySelectorAll('.ramp-pillar-card');
  const screens = container.querySelectorAll('.ramp-stage-screen');
  const progressBars = [
    document.getElementById('rampProgressBar1'),
    document.getElementById('rampProgressBar2'),
    document.getElementById('rampProgressBar3'),
    document.getElementById('rampProgressBar4')
  ];

  let currentStage = 1;
  const totalStages = 4;
  const stageDuration = 6500; // 6.5s per stage
  let stageStartTime = Date.now();
  let timerRaf = null;
  let isPaused = false;

  function activateStage(stageIndex) {
    currentStage = stageIndex;
    stageStartTime = Date.now();

    // Update pillar cards
    pillarCards.forEach((card, idx) => {
      const isCurrent = (idx + 1) === currentStage;
      card.classList.toggle('active', isCurrent);
      card.setAttribute('aria-selected', isCurrent ? 'true' : 'false');
      
      const bar = progressBars[idx];
      if (bar) {
        bar.style.width = (idx + 1 < currentStage) ? '100%' : '0%';
      }
    });

    // Update screens
    screens.forEach((screen, idx) => {
      const isCurrent = (idx + 1) === currentStage;
      screen.classList.toggle('active', isCurrent);
    });
  }

  function tickProgress() {
    if (!isPaused) {
      const elapsed = Date.now() - stageStartTime;
      const progress = Math.min(100, (elapsed / stageDuration) * 100);

      const activeBar = progressBars[currentStage - 1];
      if (activeBar) {
        activeBar.style.width = `${progress}%`;
      }

      if (elapsed >= stageDuration) {
        const nextStage = currentStage >= totalStages ? 1 : currentStage + 1;
        activateStage(nextStage);
      }
    }
    timerRaf = requestAnimationFrame(tickProgress);
  }

  // Click handler for pillar cards
  pillarCards.forEach(card => {
    card.addEventListener('click', () => {
      const stage = parseInt(card.getAttribute('data-stage'), 10);
      if (stage && stage !== currentStage) {
        activateStage(stage);
      }
    });
  });

  // Pause on hover
  container.addEventListener('mouseenter', () => {
    isPaused = true;
  });
  container.addEventListener('mouseleave', () => {
    isPaused = false;
    stageStartTime = Date.now(); // smooth resume
  });

  // Start loop
  activateStage(1);
  timerRaf = requestAnimationFrame(tickProgress);

  // Interactive Micro-features inside the 4 Stage Screens:
  
  // Stage 1: POS Buttons
  const btnPrint = document.getElementById('btnSimPrintReceipt');
  const sim1Toast = document.getElementById('sim1Toast');
  if (btnPrint && sim1Toast) {
    btnPrint.addEventListener('click', (e) => {
      e.stopPropagation();
      sim1Toast.classList.add('show');
      setTimeout(() => sim1Toast.classList.remove('show'), 3500);
    });
  }

  const btnQr = document.getElementById('btnSimBkashQr');
  if (btnQr && sim1Toast) {
    btnQr.addEventListener('click', (e) => {
      e.stopPropagation();
      sim1Toast.innerHTML = '<span style="color:#E2136E;">✓ bKash Dynamic QR Ready · Scan to Pay ৳ 3,412.50</span>';
      sim1Toast.classList.add('show');
      setTimeout(() => sim1Toast.classList.remove('show'), 3500);
    });
  }

  // Stage 2: Challan Transfer Simulation
  const btnChallan = document.getElementById('btnSimChallan');
  const uttaraMeter = document.getElementById('uttaraStockMeter');
  const uttaraUnits = document.getElementById('uttaraStockUnits');
  const sim2Toast = document.getElementById('sim2Toast');
  if (btnChallan && uttaraMeter && uttaraUnits && sim2Toast) {
    btnChallan.addEventListener('click', (e) => {
      e.stopPropagation();
      uttaraMeter.style.width = '68%';
      uttaraMeter.className = 'stock-bar-fill fill-green';
      uttaraUnits.textContent = '29 pcs (Restocked ✓)';
      uttaraUnits.className = 'stock-units text-green';
      sim2Toast.classList.add('show');
      setTimeout(() => sim2Toast.classList.remove('show'), 4000);
    });
  }

  // Stage 3: NBR Mushak Download
  const btnMushak = document.getElementById('btnSimMushak');
  if (btnMushak) {
    btnMushak.addEventListener('click', (e) => {
      e.stopPropagation();
      btnMushak.textContent = '✓ Mushak 6.3 PDF Generated!';
      setTimeout(() => {
        btnMushak.innerHTML = '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> Download Mushak 6.3 Invoice';
      }, 3000);
    });
  }

  // Stage 4: Pathao Dispatch & Bengali AI Chips
  const btnPathao = document.getElementById('btnSimPathao');
  const simPathaoLabel = document.getElementById('simPathaoLabel');
  if (btnPathao && simPathaoLabel) {
    btnPathao.addEventListener('click', (e) => {
      e.stopPropagation();
      simPathaoLabel.textContent = '✓ Tracking: PTH-99412 (Live)';
      btnPathao.style.background = '#10B981';
      setTimeout(() => {
        simPathaoLabel.textContent = '1-Click Pathao Courier Dispatch';
        btnPathao.style.background = '#E83232';
      }, 4000);
    });
  }

  // AI Prompt Chips
  const aiChips = container.querySelectorAll('.ai-chip-btn');
  const aiAnswer = document.getElementById('simAiAnswer');
  const userBubble = container.querySelector('.user-bubble p');

  const chipResponses = {
    'today-sales': {
      q: 'আজকের বিক্রয় কত?',
      a: 'আজকের মোট বিক্রয়: ৳ ৪২,৮৫০ (৩৩টি ইনভয়েস)। ধানমন্ডি আউটলেটে ৬০% সেলস সম্পন্ন হয়েছে।'
    },
    'top-profit': {
      q: 'কোন পণ্যে বেশি লাভ?',
      a: 'প্রিমিয়াম কটন পাঞ্জাবিতে সর্বোচ্চ ৪২% নেট মার্জিন অর্জিত হয়েছে। মোট বিক্রয় ৳ ১,৮২,০০০।'
    },
    'dues': {
      q: 'বাকি টাকার হিসাব দাও',
      a: 'কাস্টমারদের মোট বাকি: ৳ ২৮,৩০০। মহাজন/সাপ্লায়ার পাওনা: ৳ ৪২,০০০। আগামী সপ্তাহে প্রদেয় ৳ ১৫,০০০।'
    }
  };

  aiChips.forEach(chip => {
    chip.addEventListener('click', (e) => {
      e.stopPropagation();
      const queryType = chip.getAttribute('data-query');
      if (chipResponses[queryType] && aiAnswer && userBubble) {
        userBubble.textContent = chipResponses[queryType].q;
        aiAnswer.textContent = chipResponses[queryType].a;
        aiAnswer.style.opacity = '0';
        requestAnimationFrame(() => {
          aiAnswer.style.transition = 'opacity 0.25s ease';
          aiAnswer.style.opacity = '1';
        });
      }
    });
  });

  // 12 Modules Drawer Toggle
  const toggleBtn = document.getElementById('btnToggleMatrixDrawer');
  const matrixWrap = document.getElementById('fullModulesMatrixWrap');
  if (toggleBtn && matrixWrap) {
    toggleBtn.addEventListener('click', () => {
      const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
      toggleBtn.setAttribute('aria-expanded', isExpanded ? 'false' : 'true');
      toggleBtn.classList.toggle('is-open', !isExpanded);
      
      if (!isExpanded) {
        matrixWrap.style.display = 'block';
        matrixWrap.style.opacity = '0';
        requestAnimationFrame(() => {
          matrixWrap.style.transition = 'opacity 0.4s ease';
          matrixWrap.style.opacity = '1';
        });
      } else {
        matrixWrap.style.display = 'none';
      }
    });
  }
}
