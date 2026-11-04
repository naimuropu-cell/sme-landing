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
  },
  roi: {
    invoices: 150,
    outlets: 2
  }
};
window.STATE = STATE;

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
  const toggleBtn = document.getElementById('langToggleBtn');
  if (labelSpan) {
    labelSpan.textContent = lang === 'en' ? 'বাংলা' : 'English';
  }
  if (toggleBtn) {
    toggleBtn.setAttribute('title', lang === 'en' ? 'বাংলায় দেখুন' : 'View in English');
    toggleBtn.setAttribute('aria-label', lang === 'en' ? 'Switch to Bengali' : 'Switch to English');
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
  if (typeof updateStoryboardLanguage === 'function') updateStoryboardLanguage(lang);
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
/* ==========================================================================
   4. CONCEPT D: INTERACTIVE SAVINGS & ROI CONFIGURATOR
   Real-Time Range Sliders, Reclaimed Hours, Stock Leakage & Plan Matcher
   ========================================================================== */

function toBanglaDigits(num) {
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(num).replace(/\d/g, d => bnDigits[d]);
}

function formatTaka(num, isBn) {
  const formatted = Number(num).toLocaleString('en-IN');
  return isBn ? toBanglaDigits(formatted) : formatted;
}

function initAdvisor() {
  const rangeInvoices = document.getElementById('roiRangeInvoices');
  const rangeOutlets = document.getElementById('roiRangeOutlets');
  const invoicesPresets = document.getElementById('roiInvoicesPresets');
  const outletsPresets = document.getElementById('roiOutletsPresets');

  // Track state
  if (!window.STATE.roi) {
    window.STATE.roi = {
      invoices: 150,
      outlets: 2
    };
  }

  function updateSliderFill(rangeEl, fillId, min, max, val) {
    const fillEl = document.getElementById(fillId);
    if (!fillEl) return;
    const pct = ((val - min) / (max - min)) * 100;
    fillEl.style.width = Math.max(0, Math.min(100, pct)) + '%';
  }

  function syncRoiCalculator() {
    const isBn = window.STATE.currentLang === 'bn';
    const invoices = window.STATE.roi.invoices;
    const outlets = window.STATE.roi.outlets;

    // Update Pill Readouts
    const invoicesNumEl = document.getElementById('roiInvoicesNum');
    const outletsNumEl = document.getElementById('roiOutletsNum');
    if (invoicesNumEl) {
      invoicesNumEl.textContent = isBn ? toBanglaDigits(invoices) : invoices;
    }
    if (outletsNumEl) {
      outletsNumEl.textContent = isBn ? toBanglaDigits(outlets) : outlets;
    }

    // Update Slider Positions & Fills
    if (rangeInvoices) {
      rangeInvoices.value = invoices;
      updateSliderFill(rangeInvoices, 'roiInvoicesTrackFill', 10, 600, invoices);
    }
    if (rangeOutlets) {
      rangeOutlets.value = outlets;
      updateSliderFill(rangeOutlets, 'roiOutletsTrackFill', 1, 10, outlets);
    }

    // Update Active Preset Buttons
    if (invoicesPresets) {
      invoicesPresets.querySelectorAll('.roi-preset-btn').forEach(btn => {
        const val = parseInt(btn.getAttribute('data-val'), 10);
        btn.classList.toggle('active', val === invoices);
      });
    }
    if (outletsPresets) {
      outletsPresets.querySelectorAll('.roi-preset-btn').forEach(btn => {
        const val = parseInt(btn.getAttribute('data-val'), 10);
        btn.classList.toggle('active', val === outlets);
      });
    }

    // Calculate Dynamic Metrics (User Prompt Formulas)
    // 1. Hours Saved per Month
    // Base: 150 invoices + 2 outlets = 48 Hours
    const hoursSaved = Math.round((invoices * 0.25) + (outlets * 5));
    const hoursEl = document.getElementById('roiHoursSavedVal');
    if (hoursEl) {
      hoursEl.textContent = isBn ? toBanglaDigits(hoursSaved) : hoursSaved;
    }

    // 2. Stock Leakage Prevented (৳ / Month)
    // Base: 150 invoices + 2 outlets = ৳35,000 / month
    const leakagePrevented = Math.round(((invoices * 180) + (outlets * 4000)) / 1000) * 1000;
    const leakageEl = document.getElementById('roiLeakageVal');
    if (leakageEl) {
      leakageEl.textContent = formatTaka(leakagePrevented, isBn);
    }

    // Determine Recommended Plan
    let planId = 'medium';
    let planName = '';
    let priceHtml = '';
    let periodText = isBn ? '/ মাস' : '/ month';
    let setupText = '';
    let descText = '';
    let popularFlag = '';

    if (outlets >= 10) {
      planId = 'custom';
      planName = isBn ? 'কাস্টম এন্টারপ্রাইজ' : 'Custom Enterprise';
      priceHtml = isBn ? 'আলোচনা সাপেক্ষে' : 'Custom Quote';
      periodText = '';
      setupText = isBn ? 'অন-ডিমান্ড ডেডিকেটেড ক্লাউড' : 'Dedicated Private Infrastructure';
      descText = isBn
        ? '১০+ আউটলেট ও বিশাল রিটেল চেইনের জন্য সম্পূর্ণ ডেডিকেটেড প্রাইভেট ক্লাউড ও কাস্টম ইআরপি এপিআই।'
        : 'Engineered for 10+ retail outlets with dedicated private cloud infrastructure, custom ERP APIs, and SLA.';
      popularFlag = isBn ? 'ভিআইপি স্কেল' : 'VIP Scale';
    } else if (outlets >= 5) {
      planId = 'high';
      planName = isBn ? 'হাই প্যাকেজ' : 'High Plan';
      priceHtml = isBn ? '<span class="currency-taka">&#2547;</span>৩,০০০' : '<span class="currency-taka">&#2547;</span>3,000';
      setupText = isBn ? 'এককালীন সেটআপ ফি: ৳১৫,০০০' : 'One-time setup fee: ৳15,000';
      descText = isBn
        ? '৫টি ব্রাঞ্চ, কেন্দ্রীয় ওয়্যারহাউজ ও স্বয়ংক্রিয় বাকি খাতার সম্পূর্ণ এন্টারপ্রাইজ অটোমেশন।'
        : 'Ideal for 5 outlets with centralized multi-warehouse stock management, FIFO batch expiry hub, and automated customer ledger.';
      popularFlag = isBn ? 'এন্টারপ্রাইজ চেইন' : 'Enterprise Chain';
    } else if (outlets >= 2) {
      planId = 'medium';
      planName = isBn ? 'মিডিয়াম প্যাকেজ' : 'Medium Plan';
      priceHtml = isBn ? '<span class="currency-taka">&#2547;</span>২,০০০' : '<span class="currency-taka">&#2547;</span>2,000';
      setupText = isBn ? 'এককালীন সেটআপ ফি: ৳১০,০০০' : 'One-time setup fee: ৳10,000';
      descText = isBn
        ? '২টি শোরুম ও অনলাইন বিজনেসের জন্য সেরা! ডেডিকেটেড মোবাইল অ্যাপস এবং পাঠাও ও স্টিডফাস্ট ১-ক্লিক ইন্টিগ্রেশন।'
        : 'Perfect for retail businesses with 2–4 branches wanting centralized stock management, iOS & Android apps, and 1-click courier booking.';
      popularFlag = isBn ? '⭐ সর্বাধিক জনপ্রিয়' : '⭐ Most Popular';
    } else if (invoices > 60) {
      planId = 'basic';
      planName = isBn ? 'বেসিক প্যাকেজ' : 'Basic Plan';
      priceHtml = isBn ? '<span class="currency-taka">&#2547;</span>১,০০০' : '<span class="currency-taka">&#2547;</span>1,000';
      setupText = isBn ? 'এককালীন সেটআপ ফি: ৳৫,০০০' : 'One-time setup fee: ৳5,000';
      descText = isBn
        ? 'ব্যস্ত ১টি দোকানের জন্য ১০০% অফলাইন পিওএস, বারকোড এবং ফ্রি ই-কমার্স অনলাইন স্টোর।'
        : 'Ideal for busy single retail stores needing 100% offline POS billing, barcode printing, and a free e-commerce web store.';
      popularFlag = isBn ? 'সেরা ভ্যালু' : 'Best Value';
    } else {
      planId = 'starter';
      planName = isBn ? 'স্টার্টার প্যাকেজ' : 'Starter Plan';
      priceHtml = isBn ? '<span class="currency-taka">&#2547;</span>৫০০' : '<span class="currency-taka">&#2547;</span>500';
      setupText = isBn ? 'এককালীন সেটআপ ফি: ৳৩,০০০' : 'One-time setup fee: ৳3,000';
      descText = isBn
        ? 'ছোট রিটেল দোকান বা নতুন ব্যবসার জন্য সহজ পিওএস বিলিং ও ডিজিটাল বাকি খাতা।'
        : 'Great for small corner shops, boutiques, and single cashier counters starting their cloud journey.';
      popularFlag = isBn ? 'শুরু করার জন্য' : 'Starter Pick';
    }

    // Update Output Card Elements
    const nameEl = document.getElementById('advisorPlanName');
    const priceEl = document.getElementById('advisorPlanPrice');
    const periodEl = document.getElementById('advisorPricePeriod');
    const setupEl = document.getElementById('advisorSetupFee');
    const descEl = document.getElementById('advisorPlanDesc');
    const popularTag = document.getElementById('advisorPopularTag');
    const selectBtn = document.getElementById('advisorSelectBtn');
    const btnTextEl = document.getElementById('advisorBtnText');

    if (nameEl) nameEl.textContent = planName;
    if (priceEl) priceEl.innerHTML = priceHtml;
    if (periodEl) periodEl.textContent = periodText;
    if (setupEl) setupEl.textContent = setupText;
    if (descEl) descEl.textContent = descText;
    if (popularTag) popularTag.textContent = popularFlag;
    if (selectBtn) {
      selectBtn.setAttribute('data-plan-id', planId);
    }
    if (btnTextEl) {
      btnTextEl.textContent = isBn
        ? `${planName}-এ ১৪ দিনের ফ্রি ট্রায়াল শুরু করুন`
        : `Start 14-Day Free Trial on ${planName}`;
    }
  }

  // Range Slider Listeners
  if (rangeInvoices) {
    rangeInvoices.addEventListener('input', (e) => {
      window.STATE.roi.invoices = parseInt(e.target.value, 10);
      syncRoiCalculator();
    });
  }

  if (rangeOutlets) {
    rangeOutlets.addEventListener('input', (e) => {
      window.STATE.roi.outlets = parseInt(e.target.value, 10);
      syncRoiCalculator();
    });
  }

  // Presets Listeners
  if (invoicesPresets) {
    invoicesPresets.querySelectorAll('.roi-preset-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        window.STATE.roi.invoices = parseInt(btn.getAttribute('data-val'), 10);
        syncRoiCalculator();
      });
    });
  }

  if (outletsPresets) {
    outletsPresets.querySelectorAll('.roi-preset-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        window.STATE.roi.outlets = parseInt(btn.getAttribute('data-val'), 10);
        syncRoiCalculator();
      });
    });
  }

  // Attach global updater for language switcher
  window.updateAdvisorResult = syncRoiCalculator;

  // Run initial calculation
  syncRoiCalculator();
}

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
      "দৈনিক খরচ ট্র্যাকিং ও কাস্টমার বাকি খাতা হিসাব"
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
  badge: "কাস্টম এন্টারপ্রাইজ আর্কিটেকচার",
  name: "লার্জ স্কেল রিটেল ও ডিস্ট্রিবিউশন হাব",
  tagline: "আনলিমিটেড আউটলেট, ডেডিকেটেড এডব্লিউএস ক্লাউড ক্লাস্টার এবং কাস্টমাইজড ইআরপি আর্কিটেকচার প্রয়োজন এমন ব্র্যান্ডের জন্য।",
  priceDisplay: "কাস্টম প্রাইসিং",
  setupFeeDisplay: "আউটলেট ও কাস্টমাইজেশন অনুযায়ী আলোচনা সাপেক্ষে",
  ctaText: "এন্টারপ্রাইজ সেলসের সাথে কথা বলুন",
  bentoTiles: [
    {
      icon: "☁️",
      title: "ডেডিকেটেড ক্লাউড ইনস্ট্যান্স",
      desc: "নিজস্ব সুরক্ষিত AWS ক্লাস্টার ও জিরো শেয়ার্ড ল্যাগ"
    },
    {
      icon: "📒",
      title: "ডিজিটাল কাস্টমার বাকি খাতা",
      desc: "বকেয়া তাগাদা এসএমএস ও অটোমেটিক লেনদেন লেজার"
    },
    {
      icon: "👔",
      title: "অন-সাইট হ্যান্ডস-অন ট্রেইনিং",
      desc: "নিকুঞ্জ-২ এর এক্সপার্ট ইঞ্জিনিয়ারদের সরাসরি অনবোর্ডিং"
    },
    {
      icon: "🛡️",
      title: "১০০% ফ্রি ডাটা মাইগ্রেশন",
      desc: "ট্যালি/এক্সেল থেকে সম্পূর্ণ ফ্রিতে নিরাপদ ডাটা ট্রান্সফার"
    }
  ],
  checklist: [
    "আনলিমিটেড আউটলেট ও সেন্ট্রাল ওয়্যারহাউজ হাব",
    "কাস্টম এপিআই ইন্টিগ্রেশন (ইআরপি ও সাপ্লাই চেইন)",
    "ডেডিকেটেড কী-অ্যাকাউন্ট এক্সিকিউটিভ ও ২৪/৭ এসএলএ"
  ],
  hotline: "ভিআইপি হটলাইন: ০১৯৫৫-৩৪৫৩৩১"
};

const EN_ENTERPRISE_META = {
  badge: "Custom Enterprise Architecture",
  name: "Large Scale Retail & Distribution Hub",
  tagline: "For brands requiring unlimited branches, dedicated AWS private clusters, and custom ERP integration workflows.",
  priceDisplay: "Custom Pricing",
  setupFeeDisplay: "Scope-based deployment & migration",
  ctaText: "Speak with Enterprise Sales",
  bentoTiles: [
    {
      icon: "☁️",
      title: "Dedicated Cloud Instance",
      desc: "Isolated private AWS cluster with zero shared latency"
    },
    {
      icon: "📒",
      title: "Digital Customer Due Ledger",
      desc: "Automated SMS payment reminders & customer credit ledger"
    },
    {
      icon: "👔",
      title: "On-Site Hands-On Training",
      desc: "Direct in-person staff onboarding from our Dhaka engineers"
    },
    {
      icon: "🛡️",
      title: "100% Free Data Migration",
      desc: "Seamless, zero data-loss transfer from legacy Tally or Excel"
    }
  ],
  checklist: [
    "Unlimited Outlets & Central Warehouse Hub",
    "Tailored Custom APIs & Legacy ERP Sync",
    "Dedicated Key Account Manager & 24/7 SLA"
  ],
  hotline: "Direct VIP Desk: +880 1955-345331"
};



// 3D Magnified Pricing Coverflow State (Defaults to Medium = index 2)
let currentPricingActiveIndex = 2;

function initPricingCards() {
  const container = document.getElementById('pricingCardsTrack') || document.getElementById('pricingCardsGrid');
  if (!container || !window.PRICING_DATA) return;

  const isBn = STATE.currentLang === 'bn';
  const isAnnual = currentBillingCycle === 'annual';

  // Update Quick Plan Switcher Pill Bar labels for current language
  const pillBar = document.getElementById('pricingTierPillBar');
  if (pillBar) {
    const pills = pillBar.querySelectorAll('.pricing-tier-pill');
    if (pills.length >= 4) {
      pills[0].innerHTML = `<span>${isBn ? 'স্টার্টার' : 'Starter'}</span>`;
      pills[1].innerHTML = `<span>${isBn ? 'বেসিক' : 'Basic'}</span>`;
      pills[2].innerHTML = `<span class="pill-star">★</span><span>${isBn ? 'মিডিয়াম (পপুলার)' : 'Medium (Popular)'}</span>`;
      pills[3].innerHTML = `<span>${isBn ? 'হাই' : 'High'}</span>`;
    }
  }

  const catTags = isBn ? {
    starter: 'বুটিক ও একক দোকান',
    basic: 'একক রিটেল কাউন্টার',
    medium: 'মাল্টি-ব্রাঞ্চ ও লজিস্টিকস',
    high: 'এন্টারপ্রাইজ রিটেল চেইন'
  } : {
    starter: 'Boutique & Single Shop',
    basic: 'Single Retail Counter',
    medium: 'Multi-Branch & Logistics',
    high: 'Enterprise Retail Chain'
  };

  const html = PRICING_DATA.packages.map((pkg, index) => {
    const isPopular = pkg.isPopular;
    const ribbonHtml = isPopular 
      ? `<div class="popular-badge-ribbon"><span class="pulse-dot"></span><span>⭐</span> ${isBn ? 'সেরা পছন্দ · ৭৮% রিটেইলার চয়েস' : 'Most Popular · 78% Choice'}</div>` 
      : '';

    const bnPkg = isBn && BN_PACKAGE_META[pkg.id] ? BN_PACKAGE_META[pkg.id] : null;
    const displayName = bnPkg ? bnPkg.name : pkg.name;
    const displayTagline = bnPkg ? bnPkg.tagline : pkg.tagline;
    const displayCta = bnPkg ? bnPkg.ctaText : (pkg.ctaText || 'Get Started');
    const rawHighlights = bnPkg ? bnPkg.highlights : pkg.highlights;
    // Top 5 core highlights for compact 1-display scannability
    const highlights = rawHighlights.slice(0, 5);
    const planCatPill = catTags[pkg.id] || (isBn ? 'স্ট্যান্ডার্ড প্যাকেজ' : 'Standard Plan');

    // 2x2 Bento Capacity Specs
    const bentoSpecs = [];
    const prodVal = bnPkg && bnPkg.limits.products ? bnPkg.limits.products : pkg.limits.products;
    if (prodVal) {
      bentoSpecs.push(`
        <div class="bento-spec-item">
          <span class="bento-spec-label">${ICONS.box} ${isBn ? 'প্রোডাক্ট' : 'Products'}</span>
          <span class="bento-spec-val">${prodVal}</span>
        </div>
      `);
    }

    const branchVal = bnPkg && bnPkg.limits.branches ? bnPkg.limits.branches : pkg.limits.branches;
    const storeVal = bnPkg && bnPkg.limits.store ? bnPkg.limits.store : pkg.limits.store;
    if (branchVal) {
      bentoSpecs.push(`
        <div class="bento-spec-item">
          <span class="bento-spec-label">${ICONS.branch} ${isBn ? 'ব্রাঞ্চ' : 'Branches'}</span>
          <span class="bento-spec-val">${branchVal}</span>
        </div>
      `);
    } else if (storeVal) {
      bentoSpecs.push(`
        <div class="bento-spec-item">
          <span class="bento-spec-label">${ICONS.branch} ${isBn ? 'স্টোর' : 'Store'}</span>
          <span class="bento-spec-val">${storeVal}</span>
        </div>
      `);
    }

    const hostVal = bnPkg && bnPkg.limits.hosting ? bnPkg.limits.hosting : pkg.limits.hosting;
    if (hostVal) {
      bentoSpecs.push(`
        <div class="bento-spec-item">
          <span class="bento-spec-label">${ICONS.cloud} ${isBn ? 'হোস্টিং' : 'Hosting'}</span>
          <span class="bento-spec-val">${hostVal}</span>
        </div>
      `);
    }

    const userVal = bnPkg && bnPkg.limits.users ? bnPkg.limits.users : pkg.limits.users;
    if (userVal) {
      bentoSpecs.push(`
        <div class="bento-spec-item">
          <span class="bento-spec-label">${ICONS.users} ${isBn ? 'অ্যাডমিন ইউজার' : 'Admin Users'}</span>
          <span class="bento-spec-val">${userVal}</span>
        </div>
      `);
    }

    // Highlights list with Bento Emerald Checkmarks
    const highlightsHtml = highlights.map(item => `
      <li>
        <span class="bento-check">✓</span>
        <span>${item}</span>
      </li>
    `).join('');

    // Clear Price Calculation: Show FULL YEAR PAYMENT when Annual is selected
    const monthlyRate = Number(pkg.monthlyPrice);
    const yearlyRate = pkg.yearlyPrice || (monthlyRate * 10);
    
    const displayAmount = isAnnual ? yearlyRate : monthlyRate;
    const formattedDisplayPrice = isBn
      ? toBanglaDigits(displayAmount.toLocaleString('en-IN'))
      : displayAmount.toLocaleString('en-US');
    const formattedSetup = isBn
      ? toBanglaDigits(Number(pkg.setupFee).toLocaleString('en-IN'))
      : Number(pkg.setupFee).toLocaleString('en-US');
    
    const periodLabel = isAnnual 
      ? (isBn ? '/বছর' : '/year') 
      : (isBn ? '/মাস' : '/mo');

    const savingsAmount = (monthlyRate * 12) - yearlyRate;
    const formattedSavings = isBn
      ? toBanglaDigits(savingsAmount.toLocaleString('en-IN'))
      : savingsAmount.toLocaleString('en-US');

    const billingNoteHtml = isAnnual
      ? `<div class="plan-annual-savings-note">
           <span>🎁</span> ${isBn ? `এককালীন বিলিং · সাশ্রয় <span class="currency-taka">&#2547;</span>${formattedSavings} (২ মাস ফ্রি!)` : `Annual Full · Save <span class="currency-taka">&#2547;</span>${formattedSavings} (2 Mos Free!)`}
         </div>`
      : `<div class="plan-billing-mode-note">
           <span>✓</span> ${isBn ? 'নমনীয় মাসিক বিলিং · যেকোনো সময় পরিবর্তনযোগ্য' : 'Flexible monthly billing · Cancel anytime'}
         </div>`;

    return `
      <div class="pricing-slide-card ${isPopular ? 'is-popular' : ''}" id="card-${pkg.id}" data-plan-index="${index}" role="group" aria-label="${displayName}">
        ${ribbonHtml}

        <div class="plan-header">
          <div class="plan-name-wrap">
            <h3 class="plan-name">${displayName}</h3>
            <span class="plan-category-pill">${planCatPill}</span>
          </div>
          <p class="plan-tagline">${displayTagline}</p>
        </div>

        <div class="plan-price-wrap">
          <div class="plan-monthly-price">
            <span class="price-currency"><span class="currency-taka">&#2547;</span></span><span class="price-val animate-num-flip">${formattedDisplayPrice}</span>
            <span class="price-period">${periodLabel}</span>
          </div>
          <div class="plan-setup-fee">
            <span>⚡</span> ${isBn ? 'এককালীন সেটআপ ফি' : 'One-time setup fee'}: <span class="currency-taka">&#2547;</span>${formattedSetup}
          </div>
          ${billingNoteHtml}
        </div>

        <div class="plan-capacity-bento">
          ${bentoSpecs.join('')}
        </div>

        <ul class="plan-features-list">
          ${highlightsHtml}
        </ul>

        <button type="button" class="btn-bento-cta ${isPopular ? 'btn-primary-bento' : 'btn-secondary-bento'} open-plan-modal" data-plan-id="${pkg.id}">
          <span>${displayCta}</span>
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" width="15" height="15">
            <path d="M3.33 8h9.34m-4-4l4 4-4 4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    `;
  }).join('');

  container.innerHTML = html;

  // Initialize and bind Single-Display Slider Deck Engine
  setupPricingSliderDeck();

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

/**
 * Mobile-First Single-Display Slider Deck Engine
 * - Smooth hardware-accelerated 2D glide (scale 1.0 active, scale 0.88 left/right peeking)
 * - Multi-input: Touch swipe, top pill bar, flanking card tap, chevron buttons, dots, keyboard
 * - Zero 3D distortion, 100% crisp typography, fits in 1 screen height
 */
/**
 * Global Deck Position Controller (Always Queries Live DOM Elements)
 * Guarantees zero stale closure references across language switches and re-renders
 */
function updateDeckPositions(targetIdx) {
  const container = document.getElementById('pricingCardsTrack');
  if (!container) return;

  const currentCards = Array.from(container.querySelectorAll('.pricing-slide-card'));
  const totalCards = currentCards.length;
  if (totalCards === 0) return;

  currentPricingActiveIndex = Math.max(0, Math.min(totalCards - 1, targetIdx));

  currentCards.forEach((card, idx) => {
    // Clear inline drag transforms
    card.style.transform = '';
    card.style.transition = '';

    const offset = idx - currentPricingActiveIndex;

    card.classList.remove('card-active', 'card-left-1', 'card-right-1', 'card-left-2', 'card-right-2', 'card-hidden');

    if (offset === 0) {
      card.classList.add('card-active');
      card.setAttribute('aria-hidden', 'false');
      card.tabIndex = 0;
    } else if (offset === -1) {
      card.classList.add('card-left-1');
      card.setAttribute('aria-hidden', 'true');
      card.tabIndex = -1;
    } else if (offset === 1) {
      card.classList.add('card-right-1');
      card.setAttribute('aria-hidden', 'true');
      card.tabIndex = -1;
    } else if (offset === -2) {
      card.classList.add('card-left-2');
      card.setAttribute('aria-hidden', 'true');
      card.tabIndex = -1;
    } else if (offset === 2) {
      card.classList.add('card-right-2');
      card.setAttribute('aria-hidden', 'true');
      card.tabIndex = -1;
    } else {
      card.classList.add('card-hidden');
      card.setAttribute('aria-hidden', 'true');
      card.tabIndex = -1;
    }
  });

  // Update Quick Plan Switcher Pills
  const pillBar = document.getElementById('pricingTierPillBar');
  if (pillBar) {
    const pills = Array.from(pillBar.querySelectorAll('.pricing-tier-pill'));
    pills.forEach((pill, idx) => {
      const isActive = idx === currentPricingActiveIndex;
      pill.classList.toggle('active', isActive);
      pill.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
  }

  // Update Pagination Dots
  const dotsContainer = document.getElementById('pricingCoverflowDots');
  if (dotsContainer) {
    const dots = Array.from(dotsContainer.querySelectorAll('.pricing-dot'));
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentPricingActiveIndex);
    });
  }

  // Update Chevrons disabled states
  const prevBtn = document.getElementById('pricingPrevBtn');
  const nextBtn = document.getElementById('pricingNextBtn');
  if (prevBtn) {
    const isFirst = currentPricingActiveIndex === 0;
    prevBtn.disabled = isFirst;
    prevBtn.classList.toggle('is-disabled', isFirst);
  }
  if (nextBtn) {
    const isLast = currentPricingActiveIndex === totalCards - 1;
    nextBtn.disabled = isLast;
    nextBtn.classList.toggle('is-disabled', isLast);
  }
}

/**
 * Mobile-First Single-Display Slider Deck Engine
 * Re-binds newly generated card click handlers on every render.
 * Attaches kinetic touch/pointer swipe listener once to stage/wrapper.
 */
function setupPricingSliderDeck() {
  const container = document.getElementById('pricingCardsTrack');
  if (!container) return;

  const currentCards = Array.from(container.querySelectorAll('.pricing-slide-card'));
  const totalCards = currentCards.length;
  if (totalCards === 0) return;

  // 1. Re-bind click on newly rendered cards (flanking card tap glides it to center)
  currentCards.forEach((card, idx) => {
    card.onclick = (e) => {
      if (idx !== currentPricingActiveIndex) {
        e.preventDefault();
        e.stopPropagation();
        updateDeckPositions(idx);
      }
    };
  });

  // 2. Bind static controls once
  const stage = document.getElementById('pricingSliderStage');
  const wrapper = document.getElementById('pricingDeckWrapper');
  const pillBar = document.getElementById('pricingTierPillBar');
  const dotsContainer = document.getElementById('pricingCoverflowDots');
  const prevBtn = document.getElementById('pricingPrevBtn');
  const nextBtn = document.getElementById('pricingNextBtn');

  if (pillBar && !pillBar._hasPillClicks) {
    pillBar._hasPillClicks = true;
    const pills = Array.from(pillBar.querySelectorAll('.pricing-tier-pill'));
    pills.forEach((pill, idx) => {
      pill.onclick = (e) => {
        e.preventDefault();
        updateDeckPositions(idx);
      };
    });
  }

  if (dotsContainer && !dotsContainer._hasDotClicks) {
    dotsContainer._hasDotClicks = true;
    const dots = Array.from(dotsContainer.querySelectorAll('.pricing-dot'));
    dots.forEach((dot, idx) => {
      dot.onclick = (e) => {
        e.preventDefault();
        updateDeckPositions(idx);
      };
    });
  }

  if (prevBtn && !prevBtn._hasPrevClick) {
    prevBtn._hasPrevClick = true;
    prevBtn.onclick = (e) => {
      e.preventDefault();
      updateDeckPositions(currentPricingActiveIndex - 1);
    };
  }

  if (nextBtn && !nextBtn._hasNextClick) {
    nextBtn._hasNextClick = true;
    nextBtn.onclick = (e) => {
      e.preventDefault();
      updateDeckPositions(currentPricingActiveIndex + 1);
    };
  }

  // Keyboard navigation
  if (stage && !stage._hasKeyNav) {
    stage._hasKeyNav = true;
    stage.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        updateDeckPositions(currentPricingActiveIndex - 1);
      } else if (e.key === 'ArrowRight') {
        updateDeckPositions(currentPricingActiveIndex + 1);
      }
    });
  }

  // 3. Kinetic Touch & Finger Drag Engine (Native Mobile Feel with Real-time Card Tracking)
  const swipeTarget = stage || wrapper;
  if (swipeTarget && !swipeTarget._hasKineticSwipeEngine) {
    swipeTarget._hasKineticSwipeEngine = true;

    let startX = 0;
    let startY = 0;
    let currentX = 0;
    let isTouching = false;
    let isHorizontalSwipe = null;
    let startTime = 0;

    function getPoint(e) {
      if (e.touches && e.touches.length > 0) {
        return { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
      if (e.changedTouches && e.changedTouches.length > 0) {
        return { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
      }
      return { x: e.clientX, y: e.clientY };
    }

    function onTouchStart(e) {
      if (e.target.closest('.open-plan-modal') || e.target.closest('button.btn-bento-cta')) {
        return;
      }

      const p = getPoint(e);
      startX = p.x;
      startY = p.y;
      currentX = startX;
      isTouching = true;
      isHorizontalSwipe = null;
      startTime = Date.now();
    }

    function onTouchMove(e) {
      if (!isTouching) return;
      const p = getPoint(e);
      currentX = p.x;
      const diffX = currentX - startX;
      const diffY = p.y - startY;

      // Lock direction after 6px
      if (isHorizontalSwipe === null && (Math.abs(diffX) > 6 || Math.abs(diffY) > 6)) {
        isHorizontalSwipe = Math.abs(diffX) > Math.abs(diffY);
      }

      if (isHorizontalSwipe) {
        // Prevent vertical page scroll so finger can freely slide cards
        if (e.cancelable) {
          e.preventDefault();
        }

        const liveTrack = document.getElementById('pricingCardsTrack');
        if (!liveTrack) return;
        const liveCards = Array.from(liveTrack.querySelectorAll('.pricing-slide-card'));
        const total = liveCards.length;

        // Live visual drag tracking with elastic resistance at boundaries
        let dragOffset = diffX;
        if ((currentPricingActiveIndex === 0 && diffX > 0) || 
            (currentPricingActiveIndex === total - 1 && diffX < 0)) {
          dragOffset = diffX * 0.32; // elastic bounce
        } else {
          dragOffset = diffX * 0.85; // smooth 1:1 finger tracking
        }

        const activeCard = liveCards[currentPricingActiveIndex];
        const leftCard = liveCards[currentPricingActiveIndex - 1];
        const rightCard = liveCards[currentPricingActiveIndex + 1];

        if (activeCard) {
          activeCard.style.transition = 'none';
          activeCard.style.transform = `translate(calc(-50% + ${dragOffset}px), -50%) scale(1.0)`;
        }
        if (leftCard) {
          leftCard.style.transition = 'none';
          leftCard.style.transform = `translate(calc(-50% - var(--deck-offset) + ${dragOffset}px), -50%) scale(0.88)`;
        }
        if (rightCard) {
          rightCard.style.transition = 'none';
          rightCard.style.transform = `translate(calc(-50% + var(--deck-offset) + ${dragOffset}px), -50%) scale(0.88)`;
        }
      }
    }

    function onTouchEnd(e) {
      if (!isTouching) return;
      isTouching = false;

      const diffX = currentX - startX;
      const elapsed = Date.now() - startTime;

      const liveTrack = document.getElementById('pricingCardsTrack');
      if (liveTrack) {
        const liveCards = liveTrack.querySelectorAll('.pricing-slide-card');
        liveCards.forEach(c => {
          c.style.transition = '';
          c.style.transform = '';
        });
      }

      if (isHorizontalSwipe) {
        const isFlick = Math.abs(diffX) > 18 && elapsed < 260;
        const isDragThreshold = Math.abs(diffX) > 35;

        if (isDragThreshold || isFlick) {
          if (diffX < 0) {
            // Dragged finger left -> slide next plan into center
            updateDeckPositions(currentPricingActiveIndex + 1);
          } else {
            // Dragged finger right -> slide prev plan into center
            updateDeckPositions(currentPricingActiveIndex - 1);
          }
        } else {
          // Snap back smoothly if drag wasn't past threshold
          updateDeckPositions(currentPricingActiveIndex);
        }
      }

      isHorizontalSwipe = null;
    }

    // Touch listeners (passive: false on touchmove is essential for preventDefault)
    swipeTarget.addEventListener('touchstart', onTouchStart, { passive: true });
    swipeTarget.addEventListener('touchmove', onTouchMove, { passive: false });
    swipeTarget.addEventListener('touchend', onTouchEnd, { passive: true });
    swipeTarget.addEventListener('touchcancel', onTouchEnd, { passive: true });

    // Pointer events for pointer laptops and mouse drag
    swipeTarget.addEventListener('pointerdown', onTouchStart);
    swipeTarget.addEventListener('pointermove', onTouchMove);
    swipeTarget.addEventListener('pointerup', onTouchEnd);
    swipeTarget.addEventListener('pointercancel', onTouchEnd);
  }

  // Initial render positioning
  updateDeckPositions(currentPricingActiveIndex);
}

function initEnterpriseCard() {
  const container = document.getElementById('enterpriseShowcase');
  if (!container) return;

  const isBn = STATE.currentLang === 'bn';
  const meta = isBn ? BN_ENTERPRISE_META : EN_ENTERPRISE_META;

  const bentoTilesHtml = meta.bentoTiles.map(t => `
    <div class="ent-bento-card">
      <div class="ent-bento-icon-wrap">${t.icon}</div>
      <div class="ent-bento-content">
        <h4 class="ent-bento-title">${t.title}</h4>
        <p class="ent-bento-desc">${t.desc}</p>
      </div>
    </div>
  `).join('');

  const checklistHtml = meta.checklist.map(item => `
    <li><span class="chk-emerald">✓</span> <span>${item}</span></li>
  `).join('');

  container.innerHTML = `
    <div class="enterprise-showcase-box">
      <div class="enterprise-cyber-grid" aria-hidden="true"></div>

      <div class="enterprise-left">
        <div class="enterprise-badge-pill">
          <span class="enterprise-pulse-dot"></span>
          <span>${meta.badge}</span>
        </div>
        <h3>${meta.name}</h3>
        <p class="enterprise-tagline">${meta.tagline}</p>
        <div class="enterprise-bento-grid">
          ${bentoTilesHtml}
        </div>
      </div>

      <div class="enterprise-right">
        <div class="enterprise-price-title">${meta.priceDisplay}</div>
        <div class="enterprise-price-sub">${meta.setupFeeDisplay}</div>
        <ul class="enterprise-quick-checklist">
          ${checklistHtml}
        </ul>
        <button type="button" class="btn-enterprise-cta open-plan-modal" data-plan-id="custom">
          <span>${meta.ctaText}</span>
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" width="16" height="16">
            <path d="M3.33 8h9.34m-4-4l4 4-4 4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <div class="enterprise-direct-line">
          <a href="tel:01955345331" class="enterprise-phone-link">
            <span class="phone-pulse-icon">📞</span>
            <span>${meta.hotline}</span>
          </a>
        </div>
      </div>
    </div>
  `;
}

/**
 * 6. COMPARISON MATRIX TABLE (6 Pillars · 32 Decisive Features)
 */
const BN_CAT_TITLES = {
  core_limits: "১. মূল ক্যাপাসিটি ও কোটা",
  pos_billing: "২. পিওএস ও কাউন্টার সেলস",
  inventory_branch: "৩. ইনভেন্টরি ও মাল্টি-ব্রাঞ্চ",
  ecommerce_courier: "৪. কুরিয়ার ও অনলাইন শপ",
  accounts_tax: "৫. বাকি খাতা, লাভ-ক্ষতি ও লেজার",
  mobile_ai_support: "৬. মোবাইল অ্যাপস, এআই ও সাপোর্ট"
};

function initComparisonTable() {
  const tbody = document.getElementById('comparisonTableBody');
  if (!tbody || !window.PRICING_DATA) return;

  const isBn = STATE.currentLang === 'bn';
  const plans = ['starter', 'basic', 'medium', 'high'];
  let rowsHtml = '';
  let globalRowIdx = 0;

  PRICING_DATA.comparisonCategories.forEach((cat, catIdx) => {
    const rawTitle = cat.title || cat.name || `Module ${catIdx + 1}`;
    const displayCatTitle = isBn && BN_CAT_TITLES[cat.id] ? BN_CAT_TITLES[cat.id] : rawTitle;

    // Category Header Row
    const isCollapsibleCat = catIdx > 0;
    rowsHtml += `
      <tr class="category-header-row ${isCollapsibleCat ? 'cat-header-collapsible' : ''}" data-cat-idx="${catIdx}">
        <td colspan="5">
          <div class="cat-toggle-wrap">
            <span class="cat-title-text">${displayCatTitle} (${cat.features.length})</span>
            <svg class="cat-chevron" viewBox="0 0 20 20" fill="none" stroke="currentColor" width="18" height="18" aria-hidden="true">
              <path d="M5 7.5L10 12.5L15 7.5" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </td>
      </tr>
    `;

    // Feature Rows
    cat.features.forEach((feat) => {
      globalRowIdx++;
      const isHeroRow = globalRowIdx <= 7;
      const rowCollapsibleClass = isHeroRow ? 'feature-row-hero' : 'feature-row-collapsible';

      const planCells = plans.map(p => {
        const val = feat[p];
        const isPopularCol = p === 'medium';
        if (val === true) {
          return `<td class="td-plan-val ${isPopularCol ? 'td-plan-popular' : ''}"><span class="val-check-circle" title="Included">✓</span></td>`;
        } else if (val === false || val === undefined) {
          return `<td class="td-plan-val ${isPopularCol ? 'td-plan-popular' : ''}"><span class="val-cross-dash" title="Not Included">—</span></td>`;
        } else {
          let displayVal = val;
          if (isBn && typeof val === 'string') {
            displayVal = val
              .replace(/Unlimited Users/g, 'আনলিমিটেড ইউজার')
              .replace(/Unlimited Products/g, 'আনলিমিটেড প্রোডাক্ট')
              .replace(/Unlimited/g, 'আনলিমিটেড')
              .replace(/1 Outlet/g, '১টি আউটলেট')
              .replace(/2 Outlets/g, '২টি আউটলেট')
              .replace(/3 Outlets/g, '৩টি আউটলেট')
              .replace(/5 Outlets/g, '৫টি আউটলেট')
              .replace(/1 User/g, '১ জন ইউজার')
              .replace(/2 Users/g, '২ জন ইউজার')
              .replace(/3 Users/g, '৩ জন ইউজার')
              .replace(/5 Users/g, '৫ জন ইউজার')
              .replace(/10 Users/g, '১০ জন ইউজার')
              .replace(/1 Courier/g, '১টি কুরিয়ার')
              .replace(/2 Couriers/g, '২টি কুরিয়ার')
              .replace(/3 Couriers/g, '৩টি কুরিয়ার')
              .replace(/All Couriers/g, 'সকল কুরিয়ার')
              .replace(/200 Products/g, '২০০টি প্রোডাক্ট')
              .replace(/250 Products/g, '২৫০টি প্রোডাক্ট')
              .replace(/350 Products/g, '৩৫০টি প্রোডাক্ট')
              .replace(/2,000 Products/g, '২,০০০টি প্রোডাক্ট')
              .replace(/5,000 Products/g, '৫,০০০টি প্রোডাক্ট')
              .replace(/Products/g, 'প্রোডাক্ট')
              .replace(/Branches/g, 'আউটলেট')
              .replace(/Outlets/g, 'আউটলেট')
              .replace(/Outlet/g, 'আউটলেট')
              .replace(/Users/g, 'ইউজার')
              .replace(/User/g, 'ইউজার')
              .replace(/Shared Cloud/g, 'শেয়ার্ড ক্লাউড')
              .replace(/High-Speed SSD/g, 'হাই-স্পিড SSD')
              .replace(/AWS Cloud/g, 'AWS ক্লাউড')
              .replace(/AWS Dedicated Enterprise/g, 'ডেডিকেটেড ক্লাউড')
              .replace(/Basic Cash\/Due/g, 'নগদ ও বাকি')
              .replace(/Standard/g, 'স্ট্যান্ডার্ড')
              .replace(/Advanced Real-Time/g, 'অ্যাডভান্সড রিয়েল-টাইম')
              .replace(/Full Enterprise ERP/g, 'ফুল এন্টারপ্রাইজ ERP')
              .replace(/Simple VAT %/g, 'কাস্টমার লেজার')
              .replace(/Mobile Web/g, 'মোবাইল ওয়েব')
              .replace(/Android Only/g, 'অ্যান্ড্রয়েড অ্যাপ')
              .replace(/Android & iOS/g, 'Android ও iOS অ্যাপ')
              .replace(/Android, iOS & iPad POS/g, 'Android, iOS ও iPad POS')
              .replace(/Granular Roles/g, 'বিস্তারিত রোল এক্সেস')
              .replace(/Enterprise Complete/g, 'সম্পূর্ণ এন্টারপ্রাইজ')
              .replace(/Weekly/g, 'সাপ্তাহিক')
              .replace(/Daily/g, 'দৈনিক ক্লাউড')
              .replace(/Hourly Real-Time/g, 'প্রতি ঘণ্টার রিয়েল-টাইম')
              .replace(/Continuous Multi-Region/g, 'মাল্টি-রিজিয়ন অবিচ্ছিন্ন')
              .replace(/Office Hours/g, 'অফিস সময়')
              .replace(/Priority 24\/7/g, '২৪/৭ প্রায়োরিটি')
              .replace(/Dedicated Key Account Manager/g, 'ডেডিকেটেড একাউন্ট ম্যানেজার')
              .replace(/Standard Slip/g, 'স্ট্যান্ডার্ড মেমো')
              .replace(/\b0\b/g, '০').replace(/\b1\b/g, '১').replace(/\b2\b/g, '২').replace(/\b3\b/g, '৩')
              .replace(/\b4\b/g, '৪').replace(/\b5\b/g, '৫').replace(/\b7\b/g, '৭').replace(/\b10\b/g, '১০')
              .replace(/\b200\b/g, '২০০').replace(/\b2,000\b/g, '২,০০০').replace(/\b5,000\b/g, '৫,০০০');
          }
          return `<td class="td-plan-val ${isPopularCol ? 'td-plan-popular' : ''}"><span class="val-text-pill">${displayVal}</span></td>`;
        }
      }).join('');

      const featureTitle = isBn && feat.nameBn ? feat.nameBn : feat.name;
      const searchKeywords = `${feat.name.toLowerCase()} ${feat.nameBn ? feat.nameBn.toLowerCase() : ''}`;

      rowsHtml += `
        <tr class="feature-row ${rowCollapsibleClass}" data-cat-idx="${catIdx}" data-row-num="${globalRowIdx}" data-feature-name="${searchKeywords}">
          <td class="col-feature-title">
            <span class="feat-title-text">${featureTitle}</span>
            ${isHeroRow ? `<span class="hero-feat-tag" title="${isBn ? 'মূল ডিসিশন ফিচার' : 'Decisive factor'}">${isBn ? 'মূল' : 'Core'}</span>` : ''}
          </td>
          ${planCells}
        </tr>
      `;
    });
  });

  tbody.innerHTML = rowsHtml;

  // Category collapse / expand toggles when full table is viewed
  if (typeof tbody.querySelectorAll === 'function') {
    tbody.querySelectorAll('.category-header-row').forEach(headerRow => {
      headerRow.addEventListener('click', () => {
        const catIdx = headerRow.getAttribute('data-cat-idx');
        const isCollapsed = headerRow.classList.toggle('is-collapsed');
        tbody.querySelectorAll(`.feature-row[data-cat-idx="${catIdx}"]`).forEach(row => {
          row.classList.toggle('is-category-collapsed', isCollapsed);
        });
      });
    });
  }
}

/**
 * 7. PROGRESSIVE COMPARISON CONTROLLER (First 7 Rows Visible -> See More 32 Features)
 */
function updateComparisonDrawerLanguage(lang) {
  const progressiveWrap = document.getElementById('comparisonProgressiveWrap');
  const seeMoreBtn = document.getElementById('btnSeeMoreComparison');
  if (!seeMoreBtn) return;

  const isExpanded = progressiveWrap && !progressiveWrap.classList.contains('is-clamped');
  const labelSpan = seeMoreBtn.querySelector('.see-more-text');
  if (labelSpan) {
    if (lang === 'bn') {
      labelSpan.textContent = isExpanded 
        ? '▲ সংক্ষেপ করুন (শীর্ষ ৭টি ফিচার)' 
        : 'সম্পূর্ণ ৩২টি ফিচারের তালিকা দেখুন (আরও ২৫টি ফিচার) ▾';
    } else {
      labelSpan.textContent = isExpanded 
        ? '▲ Show Less (Top 7 Core Features)' 
        : 'View All 32 Features (25+ More Features) ▾';
    }
  }
}

function initComparisonDrawer() {
  const progressiveWrap = document.getElementById('comparisonProgressiveWrap');
  const seeMoreBtn = document.getElementById('btnSeeMoreComparison');
  if (!seeMoreBtn || !progressiveWrap) return;

  function setExpanded(expanded, smoothScroll = false) {
    const isBn = STATE.currentLang === 'bn';
    progressiveWrap.classList.toggle('is-clamped', !expanded);
    seeMoreBtn.classList.toggle('is-expanded', expanded);
    seeMoreBtn.setAttribute('aria-expanded', expanded ? 'true' : 'false');

    const labelSpan = seeMoreBtn.querySelector('.see-more-text');
    if (labelSpan) {
      if (isBn) {
        labelSpan.textContent = expanded 
          ? '▲ সংক্ষেপ করুন (শীর্ষ ৭টি ফিচার)' 
          : 'সম্পূর্ণ ৩২টি ফিচারের তালিকা দেখুন (আরও ২৫টি ফিচার) ▾';
      } else {
        labelSpan.textContent = expanded 
          ? '▲ Show Less (Top 7 Core Features)' 
          : 'View All 32 Features (25+ More Features) ▾';
      }
    }

    if (!expanded && smoothScroll) {
      const targetHeader = document.getElementById('comparisonSubHeader') || progressiveWrap;
      targetHeader.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  seeMoreBtn.addEventListener('click', () => {
    const isCurrentlyClamped = progressiveWrap.classList.contains('is-clamped');
    setExpanded(isCurrentlyClamped, !isCurrentlyClamped);
  });
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
    const progressiveWrap = document.getElementById('comparisonProgressiveWrap');
    const seeMoreBtn = document.getElementById('btnSeeMoreComparison');

    if (!term) {
      rows.forEach(r => {
        r.classList.remove('is-search-hidden');
      });
      catHeaders.forEach(h => {
        h.classList.remove('is-search-hidden');
        h.classList.remove('is-collapsed');
      });
      if (countSpan) countSpan.style.display = 'none';
      return;
    }

    // Auto-expand table when user searches so matches in all categories are visible
    if (progressiveWrap && progressiveWrap.classList.contains('is-clamped')) {
      progressiveWrap.classList.remove('is-clamped');
      if (seeMoreBtn) {
        seeMoreBtn.classList.add('is-expanded');
        seeMoreBtn.setAttribute('aria-expanded', 'true');
        const labelSpan = seeMoreBtn.querySelector('.see-more-text');
        if (labelSpan) {
          labelSpan.textContent = isBn 
            ? '▲ সংক্ষেপ করুন (শীর্ষ ৭টি ফিচার)' 
            : '▲ Show Less (Top 7 Core Features)';
        }
      }
    }

    let matchCount = 0;
    const matchingCategories = new Set();

    rows.forEach(r => {
      const name = r.getAttribute('data-feature-name') || '';
      if (name.includes(term)) {
        r.classList.remove('is-search-hidden');
        matchingCategories.add(r.getAttribute('data-cat-idx'));
        matchCount++;
      } else {
        r.classList.add('is-search-hidden');
      }
    });

    catHeaders.forEach(h => {
      const catIdx = h.getAttribute('data-cat-idx');
      if (matchingCategories.has(catIdx)) {
        h.classList.remove('is-search-hidden');
        h.classList.remove('is-collapsed');
      } else {
        h.classList.add('is-search-hidden');
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
 * 8. FAQ ACCORDION CONTROLLER (Split-Screen Tabbed Hub with Live Search & Bilingual Accordion)
 */
const FAQ_CATEGORIES_META = {
  all: {
    en: { title: "All Questions", badge: "Overview" },
    bn: { title: "সকল প্রশ্নোত্তর", badge: "সারসংক্ষেপ" }
  },
  pricing: {
    en: { title: "Pricing & Plans", badge: "Transparent Licensing" },
    bn: { title: "মূল্য ও লাইসেন্স", badge: "স্বচ্ছ সাবস্ক্রিপশন" }
  },
  hardware: {
    en: { title: "Offline POS & Hardware", badge: "Hardware & Devices" },
    bn: { title: "অফলাইন POS ও হার্ডওয়্যার", badge: "ডিভাইস ও টেক" }
  },
  security: {
    en: { title: "Security & Cloud Backup", badge: "Enterprise Protection" },
    bn: { title: "নিরাপত্তা ও ক্লাউড ব্যাকআপ", badge: "ব্যাংক-মানের সুরক্ষা" }
  },
  setup: {
    en: { title: "Setup & Staff Training", badge: "Dedicated Onboarding" },
    bn: { title: "সেটআপ ও স্টাফ ট্রেনিং", badge: "নিকুঞ্জ-২ অনবোর্ডিং" }
  }
};

let FAQ_STATE = {
  activeCategory: 'all',
  searchQuery: '',
  openFaqId: 'faq-1'
};

function formatFaqNumberLang(num, isBn) {
  if (!isBn) return String(num);
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(num).replace(/[0-9]/g, d => bnDigits[d]);
}

function updateFaqCategoryCounters() {
  if (!window.PRICING_DATA || !window.PRICING_DATA.faqs) return;
  const isBn = typeof STATE !== 'undefined' && STATE.currentLang === 'bn';
  const counts = { all: window.PRICING_DATA.faqs.length, pricing: 0, hardware: 0, security: 0, setup: 0 };
  
  window.PRICING_DATA.faqs.forEach(f => {
    if (counts[f.category] !== undefined) counts[f.category]++;
  });

  const countAll = document.getElementById('faqCountAll');
  const countPricing = document.getElementById('faqCountPricing');
  const countHardware = document.getElementById('faqCountHardware');
  const countSecurity = document.getElementById('faqCountSecurity');
  const countSetup = document.getElementById('faqCountSetup');

  if (countAll) countAll.textContent = formatFaqNumberLang(counts.all, isBn);
  if (countPricing) countPricing.textContent = formatFaqNumberLang(counts.pricing, isBn);
  if (countHardware) countHardware.textContent = formatFaqNumberLang(counts.hardware, isBn);
  if (countSecurity) countSecurity.textContent = formatFaqNumberLang(counts.security, isBn);
  if (countSetup) countSetup.textContent = formatFaqNumberLang(counts.setup, isBn);
}

function renderFaqs() {
  const container = document.getElementById('faqContainer');
  const emptyState = document.getElementById('faqEmptyState');
  if (!container || !window.PRICING_DATA || !window.PRICING_DATA.faqs) return;

  const isBn = (typeof STATE !== 'undefined' && STATE.currentLang === 'bn');
  const currentLang = isBn ? 'bn' : 'en';
  const query = FAQ_STATE.searchQuery.trim().toLowerCase();
  const category = FAQ_STATE.activeCategory;

  // Update dynamic count numbers on category tabs
  updateFaqCategoryCounters();

  // Update active state on tab buttons
  document.querySelectorAll('.faq-cat-nav-btn').forEach(btn => {
    const filter = btn.getAttribute('data-filter');
    const isActive = filter === category;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
  });

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

  // Update Right Area Header (Category Title & Count)
  const titleEl = document.getElementById('faqActiveCatTitle');
  const badgeEl = document.getElementById('faqActiveCatBadge');
  const countEl = document.getElementById('faqActiveCatCount');

  if (titleEl && badgeEl && countEl) {
    if (query) {
      badgeEl.textContent = isBn ? 'অনুসন্ধানের ফলাফল' : 'Search Results';
      titleEl.textContent = isBn ? `"${FAQ_STATE.searchQuery}" সম্পর্কিত প্রশ্ন` : `Questions matching "${FAQ_STATE.searchQuery}"`;
      countEl.textContent = isBn 
        ? `${formatFaqNumberLang(filtered.length, true)}টি ফলাফল`
        : `${filtered.length} found`;
    } else {
      const meta = FAQ_CATEGORIES_META[category] || FAQ_CATEGORIES_META.all;
      const langMeta = meta[currentLang] || meta.en;
      badgeEl.textContent = langMeta.badge;
      titleEl.textContent = langMeta.title;
      countEl.textContent = isBn 
        ? `${formatFaqNumberLang(filtered.length, true)}টি প্রশ্ন` 
        : `${filtered.length} questions`;
    }
  }

  if (filtered.length === 0) {
    container.innerHTML = '';
    if (emptyState) emptyState.style.display = 'block';
    return;
  }

  if (emptyState) emptyState.style.display = 'none';

  // Ensure an open FAQ ID exists in filtered results, or default to first
  if (!FAQ_STATE.openFaqId || !filtered.some(f => f.id === FAQ_STATE.openFaqId)) {
    FAQ_STATE.openFaqId = filtered[0].id;
  }

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

  // Category navigation tabs
  const catNavBtns = document.querySelectorAll('.faq-cat-nav-btn');
  catNavBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetFilter = btn.getAttribute('data-filter') || 'all';
      if (FAQ_STATE.activeCategory === targetFilter && !FAQ_STATE.searchQuery) return;
      
      FAQ_STATE.activeCategory = targetFilter;
      
      const searchInput = document.getElementById('faqSearchInput');
      const clearBtn = document.getElementById('faqSearchClearBtn');
      if (searchInput && FAQ_STATE.searchQuery) {
        searchInput.value = '';
        FAQ_STATE.searchQuery = '';
        if (clearBtn) clearBtn.style.display = 'none';
      }

      // Default open the first question of this category
      const catFiltered = window.PRICING_DATA.faqs.filter(f => targetFilter === 'all' || f.category === targetFilter);
      if (catFiltered.length > 0) {
        FAQ_STATE.openFaqId = catFiltered[0].id;
      }

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

  // Handle links inside mobile nav
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', (e) => {
      // If it's a dropdown toggle trigger on mobile, toggle accordion instead of closing drawer
      if (link.classList.contains('nav-link-trigger') && window.innerWidth <= 992) {
        e.preventDefault();
        const parentItem = link.closest('.nav-item');
        if (parentItem) {
          parentItem.classList.toggle('is-dropdown-expanded');
        }
        return;
      }

      // Leaf links and navigation anchors close the mobile drawer
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
 * SECTION 4: ANZAAR-INSPIRED 3D INTERACTIVE STORYBOARD SHOWCASE
 * Compact, luxury 3D card deck replacing 12 static cards with touch-inertia swipe,
 * live telemetry micro-simulations, and two-way dynamic storyboard index.
 */

let sbCurrentIndex = 0;
let sbIsAnimating = false;
const SB_AUTOPLAY_DURATION = 10000; // 10 seconds per workflow story card
let sbAutoPlayTimer = null;
let sbIsUserInteracting = false;
let sbActiveFilter = 'all';

function getNextFilteredIndex(direction = 'next') {
  const total = STORYBOARD_MODULES.length;
  for (let step = 1; step <= total; step++) {
    const candidate = direction === 'next'
      ? (sbCurrentIndex + step) % total
      : (sbCurrentIndex - step + total) % total;
    const mod = STORYBOARD_MODULES[candidate];
    if (sbActiveFilter === 'all' || mod.category === sbActiveFilter) {
      return candidate;
    }
  }
  return (sbCurrentIndex + 1) % total;
}

function startStoryboardAutoPlay() {
  stopStoryboardAutoPlay();
  if (sbIsUserInteracting) return;

  const timerBar = document.getElementById('sbTimerProgress');
  if (timerBar) {
    timerBar.style.transition = 'none';
    timerBar.style.width = '0%';
    void timerBar.offsetWidth; // Force CSS reflow
    timerBar.style.transition = 'width ' + SB_AUTOPLAY_DURATION + 'ms linear';
    timerBar.style.width = '100%';
  }

  sbAutoPlayTimer = setTimeout(() => {
    const nextIdx = getNextFilteredIndex('next');
    switchStoryboardModule(nextIdx, 'next', false); // false = auto-triggered
  }, SB_AUTOPLAY_DURATION);
}

function stopStoryboardAutoPlay() {
  if (sbAutoPlayTimer) {
    clearTimeout(sbAutoPlayTimer);
    sbAutoPlayTimer = null;
  }
  const timerBar = document.getElementById('sbTimerProgress');
  if (timerBar) {
    timerBar.style.transition = 'none';
    timerBar.style.width = '0%';
  }
}

function pauseStoryboardAutoPlay() {
  if (sbAutoPlayTimer) {
    clearTimeout(sbAutoPlayTimer);
    sbAutoPlayTimer = null;
  }
  const timerBar = document.getElementById('sbTimerProgress');
  if (timerBar) {
    const computedWidth = window.getComputedStyle(timerBar).width;
    timerBar.style.transition = 'none';
    timerBar.style.width = computedWidth;
  }
}

function resumeStoryboardAutoPlay() {
  startStoryboardAutoPlay();
}

const STORYBOARD_MODULES = [
  {
    index: 0,
    number: '01',
    category: 'pos-inventory',
    catLabelEn: 'POS & INVENTORY',
    catLabelBn: 'পয়েন্ট অফ সেলস ও ইনভেন্টরি',
    tagKey: 'matrix.m1Tag',
    tagFallback: '⚡ 0.3s Checkout',
    planKey: 'matrix.m1Plan',
    planFallback: '✓ Basic+ (৳1,000/mo)',
    titleKey: 'matrix.m1Title',
    titleFallback: 'Smart POS & Rapid Barcode',
    descKey: 'matrix.m1Desc',
    descFallback: 'Sub-second barcode scanning, quick receipt printing, offline cache, and dual cashier shifts.',
    bullets: [
      { key: 'matrix.m1B1', text: 'Instant 80mm thermal receipt printing' },
      { key: 'matrix.m1B2', text: 'Dual cashier shift reconciliation' },
      { key: 'matrix.m1B3', text: 'Offline local cache resilience' },
      { key: 'matrix.m1B4', text: 'Mobile POS (mPOS) with camera scanner (No PC needed)', highlight: true }
    ],
    renderMockup: () => `
      <div style="display:flex; flex-direction:column; justify-content:space-between; height:100%; font-family:monospace;">
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:6px;">
          <span style="color:#10b981; font-weight:800; font-size:0.8rem; display:flex; align-items:center; gap:6px;">
            <span style="display:inline-block; width:8px; height:8px; background:#10b981; border-radius:50%; box-shadow:0 0 8px #10b981;"></span>
            SCANNER ONLINE (0.3s)
          </span>
          <span style="color:#94a3b8; font-size:0.75rem;">SHIFT #2 - CASHIER 1</span>
        </div>
        <div style="display:flex; align-items:center; justify-content:space-between; background:rgba(255,255,255,0.05); padding:8px 12px; border-radius:8px; border:1px solid rgba(255,255,255,0.08);">
          <div>
            <div style="color:#f8fafc; font-weight:700; font-size:0.88rem;">Panjabi Premium Silk (Navy)</div>
            <div style="color:#64748b; font-size:0.75rem;">EAN: 894110023419 • Qty: 1</div>
          </div>
          <div style="text-align:right;">
            <div style="color:#34d399; font-weight:800; font-size:1.05rem;">৳2,450</div>
            <div style="color:#94a3b8; font-size:0.7rem;">VAT 7.5% Incl.</div>
          </div>
        </div>
        <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.75rem; color:#94a3b8; border-top:1px dashed rgba(255,255,255,0.15); padding-top:6px;">
          <span>THERMAL PRINT: #INV-9821</span>
          <span style="color:#10b981; font-weight:700;">PAID: bKash QR (Instant) ✓</span>
        </div>
      </div>
    `
  },
  {
    index: 1,
    number: '02',
    category: 'pos-inventory',
    catLabelEn: 'POS & INVENTORY',
    catLabelBn: 'পয়েন্ট অফ সেলস ও ইনভেন্টরি',
    tagKey: 'matrix.m2Tag',
    tagFallback: '📦 Real-Time Sync',
    planKey: 'matrix.m2Plan',
    planFallback: '✓ Medium+ (৳1,800/mo)',
    titleKey: 'matrix.m2Title',
    titleFallback: 'Multi-Warehouse Inventory',
    descKey: 'matrix.m2Desc',
    descFallback: 'Batch tracking, expiry warnings, automated low-stock alerts, and inter-branch transfers.',
    bullets: [
      { key: 'matrix.m2B1', text: 'Batch & expiry tracking with auto alerts' },
      { key: 'matrix.m2B2', text: 'Inter-warehouse transfer challans' },
      { key: 'matrix.m2B3', text: 'Minimum reorder level SMS triggers' },
      { key: 'matrix.m2B4', text: 'Stock valuation: FIFO & Weighted Average' }
    ],
    renderMockup: () => `
      <div style="display:flex; flex-direction:column; justify-content:space-between; height:100%; font-family:inherit;">
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:6px;">
          <span style="color:#38bdf8; font-weight:800; font-size:0.8rem;">CENTRAL WAREHOUSE TELEMETRY</span>
          <span style="color:#34d399; font-size:0.75rem; font-weight:700;">AUTO-RECONCILED ✓</span>
        </div>
        <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:8px;">
          <div style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); padding:8px; border-radius:8px;">
            <div style="font-size:0.7rem; color:#94a3b8;">Banani Outlet</div>
            <div style="font-size:1.05rem; font-weight:800; color:#ffffff;">84 pcs</div>
            <div style="font-size:0.65rem; color:#10b981; font-weight:700;">● In Stock</div>
          </div>
          <div style="background:rgba(239,68,68,0.1); border:1px solid rgba(239,68,68,0.3); padding:8px; border-radius:8px;">
            <div style="font-size:0.7rem; color:#fca5a5;">Dhanmondi</div>
            <div style="font-size:1.05rem; font-weight:800; color:#ef4444;">12 pcs</div>
            <div style="font-size:0.65rem; color:#ef4444; font-weight:700;">⚠️ Low Stock</div>
          </div>
          <div style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); padding:8px; border-radius:8px;">
            <div style="font-size:0.7rem; color:#94a3b8;">Chittagong</div>
            <div style="font-size:1.05rem; font-weight:800; color:#ffffff;">240 pcs</div>
            <div style="font-size:0.65rem; color:#38bdf8; font-weight:700;">⇄ Ready</div>
          </div>
        </div>
        <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.75rem; color:#cbd5e1;">
          <span>Challan #CH-409: Dhanmondi Transfer</span>
          <span style="color:#38bdf8; font-weight:700;">Dispatched 🚚</span>
        </div>
      </div>
    `
  },
  {
    index: 2,
    number: '03',
    category: 'pos-inventory',
    catLabelEn: 'POS & INVENTORY',
    catLabelBn: 'পয়েন্ট অফ সেলস ও ইনভেন্টরি',
    tagKey: 'matrix.m3Tag',
    tagFallback: '🏷️ Custom Thermal Labels',
    planKey: 'matrix.m3Plan',
    planFallback: '✓ Basic+ (৳1,000/mo)',
    titleKey: 'matrix.m3Title',
    titleFallback: 'Barcode Designer & Print',
    descKey: 'matrix.m3Desc',
    descFallback: 'Generate Code-128, EAN-13, and 2D QR stickers formatted for all standard thermal printers.',
    bullets: [
      { key: 'matrix.m3B1', text: 'Single & bulk sticker generation' },
      { key: 'matrix.m3B2', text: 'Custom brand logo & price on labels' },
      { key: 'matrix.m3B3', text: '50x30mm, 38x25mm thermal paper presets' },
      { key: 'matrix.m3B4', text: 'Dynamic QR code embedding' }
    ],
    renderMockup: () => `
      <div style="display:flex; align-items:center; justify-content:center; height:100%; gap:18px;">
        <div style="background:#ffffff; color:#0f172a; padding:10px 14px; border-radius:8px; width:180px; box-shadow:0 8px 20px rgba(0,0,0,0.4); text-align:center; font-family:sans-serif;">
          <div style="font-size:0.7rem; font-weight:900; letter-spacing:0.05em; color:#059669;">YES FASHION BD</div>
          <div style="font-size:0.75rem; font-weight:800; margin:2px 0;">Men's Slim Chino</div>
          <div style="font-family:monospace; letter-spacing:3px; font-size:0.85rem; font-weight:900; margin:4px 0; background:#f1f5f9; padding:2px; border-radius:4px;">
            |||| || ||||| | ||
          </div>
          <div style="font-size:0.65rem; color:#64748b; font-family:monospace;">89411200192</div>
          <div style="font-size:0.88rem; font-weight:900; color:#0f172a; margin-top:2px;">MRP: ৳1,850</div>
        </div>
        <div style="font-size:0.78rem; color:#94a3b8; display:flex; flex-direction:column; gap:6px;">
          <div style="color:#10b981; font-weight:700;">✓ 50x30mm Preset</div>
          <div>• ESC/POS & TSPL Ready</div>
          <div>• High-Speed Thermal</div>
          <div style="color:#e2e8f0; font-weight:600;">120 Labels / Min</div>
        </div>
      </div>
    `
  },
  {
    index: 3,
    number: '04',
    category: 'pos-inventory',
    catLabelEn: 'POS & INVENTORY',
    catLabelBn: 'পয়েন্ট অফ সেলস ও ইনভেন্টরি',
    tagKey: 'matrix.m4Tag',
    tagFallback: '🏢 Head Office Hub',
    planKey: 'matrix.m4Plan',
    planFallback: '✓ Medium+ (৳1,800/mo)',
    titleKey: 'matrix.m4Title',
    titleFallback: 'Multi-Branch Management',
    descKey: 'matrix.m4Desc',
    descFallback: 'Manage multiple retail outlets, centralize master product catalogs, and benchmark sales.',
    bullets: [
      { key: 'matrix.m4B1', text: 'Central catalog push to all branches' },
      { key: 'matrix.m4B2', text: 'Branch-wise live sales leaderboards' },
      { key: 'matrix.m4B3', text: 'Role-based outlet staff access' },
      { key: 'matrix.m4B4', text: 'Consolidated owner dashboard' }
    ],
    renderMockup: () => `
      <div style="display:flex; flex-direction:column; justify-content:space-between; height:100%;">
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:6px;">
          <span style="color:#a855f7; font-weight:800; font-size:0.8rem;">MULTI-OUTLET LIVE LEADERBOARD</span>
          <span style="color:#f8fafc; font-weight:800; font-size:0.85rem;">TOTAL: ৳304,700</span>
        </div>
        <div style="display:flex; flex-direction:column; gap:7px;">
          <div>
            <div style="display:flex; justify-content:space-between; font-size:0.75rem; margin-bottom:2px;">
              <span style="color:#ffffff; font-weight:700;">1. Gulshan Flagship (100% Target)</span>
              <span style="color:#34d399; font-weight:800;">৳142,500</span>
            </div>
            <div style="width:100%; height:6px; background:rgba(255,255,255,0.1); border-radius:3px; overflow:hidden;">
              <div style="width:100%; height:100%; background:linear-gradient(90deg,#10b981,#34d399);"></div>
            </div>
          </div>
          <div>
            <div style="display:flex; justify-content:space-between; font-size:0.75rem; margin-bottom:2px;">
              <span style="color:#ffffff; font-weight:700;">2. Uttara Outlet (85% Target)</span>
              <span style="color:#fbbf24; font-weight:800;">৳98,200</span>
            </div>
            <div style="width:100%; height:6px; background:rgba(255,255,255,0.1); border-radius:3px; overflow:hidden;">
              <div style="width:85%; height:100%; background:linear-gradient(90deg,#f59e0b,#fbbf24);"></div>
            </div>
          </div>
          <div>
            <div style="display:flex; justify-content:space-between; font-size:0.75rem; margin-bottom:2px;">
              <span style="color:#ffffff; font-weight:700;">3. Sylhet Express (70% Target)</span>
              <span style="color:#38bdf8; font-weight:800;">৳64,000</span>
            </div>
            <div style="width:100%; height:6px; background:rgba(255,255,255,0.1); border-radius:3px; overflow:hidden;">
              <div style="width:70%; height:100%; background:linear-gradient(90deg,#0284c7,#38bdf8);"></div>
            </div>
          </div>
        </div>
        <div style="font-size:0.72rem; color:#94a3b8; text-align:right;">Auto-synced across 3 outlets 12s ago</div>
      </div>
    `
  },
  {
    index: 4,
    number: '05',
    category: 'accounts-tax',
    catLabelEn: 'ACCOUNTS & DUE LEDGER',
    catLabelBn: 'হিসাব ও বাকি খাতা',
    tagKey: 'matrix.m5Tag',
    tagFallback: '📊 Audit-Ready Ledgers',
    planKey: 'matrix.m5Plan',
    planFallback: '✓ Starter+ (৳600/mo)',
    titleKey: 'matrix.m5Title',
    titleFallback: 'Double-Entry Accounting',
    descKey: 'matrix.m5Desc',
    descFallback: 'Automated journal entries on every POS sale. Real-time Balance Sheet and Profit & Loss.',
    bullets: [
      { key: 'matrix.m5B1', text: 'Automatic debit/credit on checkout' },
      { key: 'matrix.m5B2', text: 'Live Balance Sheet & Profit & Loss' },
      { key: 'matrix.m5B3', text: 'Multi-bank & MFS ledger reconciliation' },
      { key: 'matrix.m5B4', text: 'Chart of Accounts tailored for BD SMEs' }
    ],
    renderMockup: () => `
      <div style="display:flex; flex-direction:column; justify-content:space-between; height:100%; font-family:monospace;">
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:6px;">
          <span style="color:#34d399; font-weight:800; font-size:0.8rem;">AUTO JOURNAL ENTRY #JV-7712</span>
          <span style="color:#a7f3d0; font-size:0.75rem;">BALANCED ✓</span>
        </div>
        <div style="background:rgba(255,255,255,0.04); border-radius:8px; padding:8px 10px; font-size:0.78rem;">
          <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
            <span style="color:#f8fafc;">DR. Cash/bKash Collection</span>
            <span style="color:#34d399; font-weight:800;">+৳12,400.00</span>
          </div>
          <div style="display:flex; justify-content:space-between; margin-bottom:4px; padding-left:14px; color:#cbd5e1;">
            <span>CR. Sales Revenue A/C</span>
            <span>৳11,534.88</span>
          </div>
          <div style="display:flex; justify-content:space-between; padding-left:14px; color:#cbd5e1;">
            <span>CR. VAT Output (7.5%)</span>
            <span>৳865.12</span>
          </div>
        </div>
        <div style="display:flex; justify-content:space-between; font-size:0.72rem; color:#94a3b8;">
          <span>Chart of Accounts: BD GAAP Compliant</span>
          <span style="color:#6ee7b7;">Net Margin: 24.8%</span>
        </div>
      </div>
    `
  },
  {
    index: 5,
    number: '06',
    category: 'accounts-tax',
    catLabelEn: 'ACCOUNTS & DUE LEDGER',
    catLabelBn: 'হিসাব ও বাকি খাতা',
    tagKey: 'matrix.m6Tag',
    tagFallback: '🤝 Payables & Dues',
    planKey: 'matrix.m6Plan',
    planFallback: '✓ Starter+ (৳600/mo)',
    titleKey: 'matrix.m6Title',
    titleFallback: 'Purchases & Supplier Dues',
    descKey: 'matrix.m6Desc',
    descFallback: 'Procurement orders, vendor bills, supplier credit ledgers, and automated payment reminders.',
    bullets: [
      { key: 'matrix.m6B1', text: 'Purchase orders to GRN automated flow' },
      { key: 'matrix.m6B2', text: 'Supplier due aging reports & reminders' },
      { key: 'matrix.m6B3', text: 'Partial payment & advance tracking' },
      { key: 'matrix.m6B4', text: 'Vendor price history comparison' }
    ],
    renderMockup: () => `
      <div style="display:flex; flex-direction:column; justify-content:space-between; height:100%;">
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:6px;">
          <span style="color:#fbbf24; font-weight:800; font-size:0.8rem;">PURCHASE VOUCHER #PO-441</span>
          <span style="color:#f59e0b; font-size:0.72rem; background:rgba(245,158,11,0.15); padding:2px 8px; border-radius:9999px;">Due in 5 Days</span>
        </div>
        <div style="background:rgba(255,255,255,0.04); border-radius:8px; padding:10px; border:1px solid rgba(255,255,255,0.08);">
          <div style="font-weight:700; color:#ffffff; font-size:0.88rem; margin-bottom:4px;">Meghna Textile Mills Ltd.</div>
          <div style="display:flex; justify-content:space-between; font-size:0.75rem; color:#cbd5e1; margin-bottom:4px;">
            <span>Bill Total: ৳85,000</span>
            <span style="color:#10b981;">Advance: ৳50,000</span>
          </div>
          <div style="display:flex; justify-content:space-between; font-size:0.82rem; font-weight:800;">
            <span style="color:#f87171;">Remaining Payable:</span>
            <span style="color:#f87171;">৳35,000</span>
          </div>
        </div>
        <div style="display:flex; justify-content:space-between; font-size:0.75rem; color:#94a3b8;">
          <span>GRN Status: Received at Banani</span>
          <span style="color:#fbbf24; font-weight:700;">1-Click Pay via Bank →</span>
        </div>
      </div>
    `
  },
  {
    index: 6,
    number: '07',
    category: 'accounts-tax',
    catLabelEn: 'ACCOUNTS & DUE LEDGER',
    catLabelBn: 'হিসাব ও বাকি খাতা',
    tagKey: 'matrix.m7Tag',
    tagFallback: '📒 Auto Due Reminder',
    planKey: 'matrix.m7Plan',
    planFallback: '✓ Basic+ (৳1,000/mo)',
    titleKey: 'matrix.m7Title',
    titleFallback: 'Digital Due & Customer Ledger',
    descKey: 'matrix.m7Desc',
    descFallback: 'Track customer credit balances, payment history, and auto-dispatch SMS payment reminders with 1-click ledger statements.',
    bullets: [
      { key: 'matrix.m7B1', text: '1-Click customer ledger statement (PDF/Print)' },
      { key: 'matrix.m7B2', text: 'Automated SMS due reminders with bKash pay link' },
      { key: 'matrix.m7B3', text: 'Customer credit limits & overdue risk alerts' },
      { key: 'matrix.m7B4', text: 'Cash, bKash & Bank repayment history reconciliation' }
    ],
    renderMockup: () => `
      <div style="display:flex; flex-direction:column; justify-content:space-between; height:100%; border:1px solid rgba(16,185,129,0.3); border-radius:10px; padding:10px; background:rgba(6,78,59,0.15);">
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:5px;">
          <div>
            <div style="font-size:0.68rem; color:#a7f3d0; font-weight:700;">গ্রাহক খতিয়ান ও বাকি হিসাব</div>
            <div style="font-size:0.88rem; font-weight:900; color:#ffffff;">হাজী মো: রফিকুল ইসলাম</div>
          </div>
          <div style="text-align:right;">
            <span style="display:inline-block; font-size:0.65rem; background:rgba(239,68,68,0.2); color:#fca5a5; border:1px solid rgba(239,68,68,0.4); padding:2px 6px; border-radius:4px; font-weight:700;">বকেয়া পাওনা</span>
          </div>
        </div>
        <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.75rem; color:#cbd5e1; margin:4px 0;">
          <div>
            <div>মোবাইল: <strong>০১৭১১-৮৮৯৯০০</strong></div>
            <div>ক্রেডিট লিমিট: <strong>৳১৫,০০০</strong></div>
          </div>
          <div style="text-align:right;">
            <div style="color:#f87171; font-weight:900; font-size:1.05rem;">৳৮,৫০০</div>
            <div style="color:#6ee7b7; font-size:0.65rem;">সর্বশেষ পরিশোধ: ৩ দিন আগে</div>
          </div>
        </div>
        <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.72rem; color:#a7f3d0; border-top:1px dashed rgba(255,255,255,0.15); padding-top:4px;">
          <span style="display:inline-flex; align-items:center; gap:4px; color:#34d399; font-weight:700;">📩 এসএমএস তাগাদা পাঠানো হয়েছে</span>
          <span style="background:#059669; color:#fff; font-size:0.65rem; font-weight:700; padding:2px 7px; border-radius:4px;">লেজার ডাউনলোড ↓</span>
        </div>
      </div>
    `
  },
  {
    index: 7,
    number: '08',
    category: 'accounts-tax',
    catLabelEn: 'ACCOUNTS & DUE LEDGER',
    catLabelBn: 'হিসাব ও বাকি খাতা',
    tagKey: 'matrix.m8Tag',
    tagFallback: '👥 Staff & Commissions',
    planKey: 'matrix.m8Plan',
    planFallback: '✓ Medium+ (৳1,800/mo)',
    titleKey: 'matrix.m8Title',
    titleFallback: 'HR, Attendance & Payroll',
    descKey: 'matrix.m8Desc',
    descFallback: 'Cashier attendance, monthly salary generation, sales commission tracking, and pay slips.',
    bullets: [
      { key: 'matrix.m8B1', text: 'Biometric & mobile selfie attendance' },
      { key: 'matrix.m8B2', text: 'Sales target commission calculator' },
      { key: 'matrix.m8B3', text: 'Monthly salary slip generation (PDF)' },
      { key: 'matrix.m8B4', text: 'Staff advance & deduction management' }
    ],
    renderMockup: () => `
      <div style="display:flex; flex-direction:column; justify-content:space-between; height:100%;">
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:6px;">
          <span style="color:#a855f7; font-weight:800; font-size:0.8rem;">STAFF PAYROLL & ATTENDANCE</span>
          <span style="color:#10b981; font-size:0.72rem; font-weight:700;">SHIFT ACTIVE 🟢</span>
        </div>
        <div style="display:flex; align-items:center; gap:12px; background:rgba(255,255,255,0.04); padding:10px; border-radius:8px;">
          <div style="width:38px; height:38px; border-radius:50%; background:#8b5cf6; display:flex; align-items:center; justify-content:center; font-weight:900; color:#fff;">RA</div>
          <div style="flex:1;">
            <div style="font-weight:700; color:#ffffff; font-size:0.85rem;">Rahim Ahmed (Senior Cashier)</div>
            <div style="font-size:0.72rem; color:#94a3b8;">Check-in: 09:54 AM • Target: 112%</div>
          </div>
          <div style="text-align:right;">
            <div style="font-size:0.85rem; font-weight:800; color:#34d399;">+৳3,450</div>
            <div style="font-size:0.65rem; color:#cbd5e1;">Commission</div>
          </div>
        </div>
        <div style="display:flex; justify-content:space-between; font-size:0.72rem; color:#94a3b8;">
          <span>Monthly Pay Slip: Auto-Generated (PDF)</span>
          <span style="color:#c084fc;">bKash Bulk Disburse Ready</span>
        </div>
      </div>
    `
  },
  {
    index: 8,
    number: '09',
    category: 'omnichannel-ai',
    catLabelEn: 'LOGISTICS & AI',
    catLabelBn: 'লজিস্টিকস ও এআই',
    tagKey: 'matrix.m9Tag',
    tagFallback: '🚚 Steadfast & Pathao',
    planKey: 'matrix.m9Plan',
    planFallback: '✓ Basic+ (৳1,000/mo)',
    titleKey: 'matrix.m9Title',
    titleFallback: 'Courier Automation',
    descKey: 'matrix.m9Desc',
    descFallback: '1-Click parcel booking with Steadfast, Pathao & RedX. Automated consignment tracking & cash collection.',
    bullets: [
      { key: 'matrix.m9B1', text: '1-Click bulk courier consignment creation' },
      { key: 'matrix.m9B2', text: 'Real-time parcel tracking via webhooks' },
      { key: 'matrix.m9B3', text: 'COD cash collection reconciliation' },
      { key: 'matrix.m9B4', text: 'Auto-update order status on delivery' }
    ],
    renderMockup: () => `
      <div style="display:flex; flex-direction:column; justify-content:space-between; height:100%;">
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:6px;">
          <span style="color:#f97316; font-weight:800; font-size:0.8rem;">STEADFAST & PATHAO DISPATCH RADAR</span>
          <span style="color:#fdba74; font-size:0.72rem;">API INTEGRATED ⚡</span>
        </div>
        <div style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); padding:8px 12px; border-radius:8px;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span style="color:#ffffff; font-weight:800; font-size:0.85rem;">CID: #SF-88319</span>
            <span style="background:rgba(249,115,22,0.2); color:#fb923c; font-weight:700; font-size:0.7rem; padding:2px 8px; border-radius:9999px;">Out for Delivery 🚀</span>
          </div>
          <div style="font-size:0.75rem; color:#94a3b8; margin:4px 0;">Customer: Tanvir Hasan (Mirpur DOHS, Dhaka)</div>
          <div style="display:flex; justify-content:space-between; font-size:0.78rem; font-weight:700;">
            <span style="color:#cbd5e1;">COD to Collect:</span>
            <span style="color:#34d399;">৳1,950</span>
          </div>
        </div>
        <div style="display:flex; justify-content:space-between; font-size:0.72rem; color:#94a3b8;">
          <span>1-Click Bulk Label Print</span>
          <span style="color:#34d399;">Auto-Reconcile COD Cash</span>
        </div>
      </div>
    `
  },
  {
    index: 9,
    number: '10',
    category: 'omnichannel-ai',
    catLabelEn: 'LOGISTICS & AI',
    catLabelBn: 'লজিস্টিকস ও এআই',
    tagKey: 'matrix.m10Tag',
    tagFallback: '💬 Repeat Sales Engine',
    planKey: 'matrix.m10Plan',
    planFallback: '✓ Medium+ (৳1,800/mo)',
    titleKey: 'matrix.m10Title',
    titleFallback: 'CRM & SMS Marketing',
    descKey: 'matrix.m10Desc',
    descFallback: 'Customer lifetime value, reward loyalty points, and automated Bengali SMS for promotions.',
    bullets: [
      { key: 'matrix.m10B1', text: 'Tiered customer loyalty points' },
      { key: 'matrix.m10B2', text: 'Branded sender ID SMS gateway (BD)' },
      { key: 'matrix.m10B3', text: 'Automated birthday & anniversary offers' },
      { key: 'matrix.m10B4', text: 'Due reminder SMS with payment link' }
    ],
    renderMockup: () => `
      <div style="display:flex; flex-direction:column; justify-content:space-between; height:100%;">
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:6px;">
          <span style="color:#ec4899; font-weight:800; font-size:0.8rem;">BRANDED BD SMS GATEWAY</span>
          <span style="color:#f472b6; font-size:0.72rem;">SENDER: YES_SME</span>
        </div>
        <div style="background:rgba(236,72,153,0.1); border:1px solid rgba(236,72,153,0.3); border-radius:10px; padding:10px;">
          <div style="font-size:0.72rem; color:#f472b6; font-weight:700; margin-bottom:3px;">💬 Bengali Loyalty SMS:</div>
          <div style="font-size:0.8rem; color:#ffffff; line-height:1.4;">
            "প্রিয় শফিক ভাই, YES FASHION-এ আপনার ৫২০ লয়্যালটি পয়েন্ট আছে। এই সপ্তাহে কেনাকাটায় পান ১০% ছাড়!"
          </div>
        </div>
        <div style="display:flex; justify-content:space-between; font-size:0.72rem; color:#94a3b8;">
          <span>Target Group: 1,420 Repeat Customers</span>
          <span style="color:#34d399; font-weight:700;">Delivered 99.8%</span>
        </div>
      </div>
    `
  },
  {
    index: 10,
    number: '11',
    category: 'omnichannel-ai',
    catLabelEn: 'LOGISTICS & AI',
    catLabelBn: 'লজিস্টিকস ও এআই',
    tagKey: 'matrix.m11Tag',
    tagFallback: '🌐 Multi-Channel Selling',
    planKey: 'matrix.m11Plan',
    planFallback: '✓ Medium+ (৳1,800/mo)',
    titleKey: 'matrix.m11Title',
    titleFallback: 'E-Commerce & Social Shop',
    descKey: 'matrix.m11Desc',
    descFallback: 'Sync your store inventory with your online shop, Facebook Catalog, and Instagram Shop in real time.',
    bullets: [
      { key: 'matrix.m11B1', text: 'Unified product catalog for POS & Web' },
      { key: 'matrix.m11B2', text: 'Facebook & Instagram Shop product feed' },
      { key: 'matrix.m11B3', text: 'Real-time online order alerts on POS' },
      { key: 'matrix.m11B4', text: 'bKash / Nagad / Card payment gateway' }
    ],
    renderMockup: () => `
      <div style="display:flex; flex-direction:column; justify-content:space-between; height:100%;">
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:6px;">
          <span style="color:#06b6d4; font-weight:800; font-size:0.8rem;">OMNICHANNEL SYNC STREAM</span>
          <span style="color:#67e8f9; font-size:0.72rem;">FB + WEB + POS</span>
        </div>
        <div style="background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); padding:8px 12px; border-radius:8px;">
          <div style="display:flex; justify-content:space-between; font-size:0.78rem;">
            <span style="color:#38bdf8; font-weight:700;">Online Order #WEB-4109</span>
            <span style="color:#10b981; font-weight:800;">Paid: ৳3,200 (bKash)</span>
          </div>
          <div style="font-size:0.74rem; color:#e2e8f0; margin-top:3px;">
            Item: Royal Kurti Set (M)
          </div>
          <div style="font-size:0.68rem; color:#94a3b8; margin-top:2px;">
            Store Stock Deducted Instantly: 10 ➔ 9 pcs
          </div>
        </div>
        <div style="display:flex; justify-content:space-between; font-size:0.72rem; color:#94a3b8;">
          <span>Zero Overselling Guarantee</span>
          <span style="color:#06b6d4; font-weight:700;">Meta Catalog Sync: Active</span>
        </div>
      </div>
    `
  },
  {
    index: 11,
    number: '12',
    category: 'omnichannel-ai',
    catLabelEn: 'LOGISTICS & AI',
    catLabelBn: 'লজিস্টিকস ও এআই',
    tagKey: 'matrix.m12Tag',
    tagFallback: '🤖 Bangla Voice & Chat AI',
    planKey: 'matrix.m12Plan',
    planFallback: '✓ High (৳3,500/mo)',
    titleKey: 'matrix.m12Title',
    titleFallback: 'Bengali AI Copilot',
    descKey: 'matrix.m12Desc',
    descFallback: 'Ask business questions in natural Bengali: \'আজকে কোন আইটেম বেশি বিক্রি হইছে?\' Get instant visual charts.',
    bullets: [
      { key: 'matrix.m12B1', text: 'Natural Bengali voice & text queries' },
      { key: 'matrix.m12B2', text: 'Predictive stock demand forecasts' },
      { key: 'matrix.m12B3', text: 'Fraud & unusual cash discrepancy detection' },
      { key: 'matrix.m12B4', text: 'Daily executive audio briefing' }
    ],
    renderMockup: () => `
      <div style="display:flex; flex-direction:column; justify-content:space-between; height:100%;">
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:6px;">
          <span style="color:#10b981; font-weight:800; font-size:0.8rem;">BENGALI SME AI ADVISOR</span>
          <span style="color:#6ee7b7; font-size:0.72rem;">VOICE & CHAT 🎙️</span>
        </div>
        <div style="display:flex; flex-direction:column; gap:6px;">
          <div style="align-self:flex-end; background:#1e293b; color:#f1f5f9; padding:5px 10px; border-radius:12px 12px 2px 12px; font-size:0.76rem; max-width:85%;">
            "আজকে ধানমন্ডি ব্রাঞ্চে মোট কত বিক্রি হইছে?"
          </div>
          <div style="align-self:flex-start; background:rgba(16,185,129,0.15); border:1px solid rgba(16,185,129,0.3); color:#ffffff; padding:6px 10px; border-radius:12px 12px 12px 2px; font-size:0.76rem; max-width:90%;">
            "মোট <strong>৳৪৭,৩০০</strong> বিক্রি হয়েছে। গত রবিবারের চেয়ে ১৮% বেশি!"
          </div>
        </div>
        <div style="display:flex; justify-content:space-between; font-size:0.72rem; color:#94a3b8;">
          <span>Executive Audio Briefing Available</span>
          <span style="color:#10b981; font-weight:700;">Instant Answers 24/7</span>
        </div>
      </div>
    `
  }
];

function renderActiveStoryboardCard(index) {
  const mod = STORYBOARD_MODULES[index];
  if (!mod) return;
  const lang = window.STATE ? window.STATE.currentLang : 'en';
  const dict = window.TRANSLATIONS ? window.TRANSLATIONS[lang] : null;

  // Counter
  const counterText = document.getElementById('sbCurrentIndexText');
  if (counterText) counterText.textContent = mod.number;

  // Tag & Category & Plan
  const tagEl = document.getElementById('sbCardTag');
  if (tagEl) {
    tagEl.setAttribute('data-i18n', mod.tagKey);
    tagEl.textContent = (dict && dict[mod.tagKey]) || mod.tagFallback;
  }

  const catEl = document.getElementById('sbCardCat');
  if (catEl) {
    catEl.textContent = lang === 'bn' ? mod.catLabelBn : mod.catLabelEn;
  }

  const planEl = document.getElementById('sbCardPlan');
  if (planEl) {
    planEl.setAttribute('data-i18n', mod.planKey);
    planEl.textContent = (dict && dict[mod.planKey]) || mod.planFallback;
  }

  // Story Number (/ 01, / 02 ...)
  const storyNumEl = document.getElementById('sbStoryNum');
  if (storyNumEl) {
    storyNumEl.textContent = '/ ' + mod.number;
  }

  // Prominent Feature Title in Top Section of Story Card
  const titleEl = document.getElementById('sbCardTitle');
  if (titleEl) {
    titleEl.setAttribute('data-i18n', mod.titleKey);
    titleEl.textContent = (dict && dict[mod.titleKey]) || mod.titleFallback;
  }

  const descEl = document.getElementById('sbCardDesc');
  if (descEl) {
    descEl.setAttribute('data-i18n', mod.descKey);
    descEl.textContent = (dict && dict[mod.descKey]) || mod.descFallback;
  }

  // Preview Mockup
  const previewContent = document.getElementById('sbPreviewContent');
  if (previewContent && typeof mod.renderMockup === 'function') {
    previewContent.innerHTML = mod.renderMockup();
  }

  // Bullets
  const bulletsEl = document.getElementById('sbCardBullets');
  if (bulletsEl) {
    bulletsEl.innerHTML = mod.bullets.map(b => {
      const text = (dict && dict[b.key]) || b.text;
      const highlight = b.highlight ? 'class="mpos-bullet-highlight"' : '';
      const color = b.highlight ? '#059669' : '#10B981';
      const textStyle = b.highlight ? 'style="color:#059669; font-weight:800;"' : '';
      return `<li ${highlight}>
        <svg viewBox="0 0 16 16" width="14" height="14" fill="${color}">
          <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
        </svg>
        <span data-i18n="${b.key}" ${textStyle}>${text}</span>
      </li>`;
    }).join('');
  }

  // Update Left Peeking Card ("side diye ektu ber kore diba")
  const prevIdx = getNextFilteredIndex('prev');
  const prevMod = STORYBOARD_MODULES[prevIdx];
  if (prevMod) {
    const prevNumEl = document.getElementById('sbPeekPrevNum');
    const prevCatEl = document.getElementById('sbPeekPrevCat');
    const prevTitleEl = document.getElementById('sbPeekPrevTitle');
    if (prevNumEl) prevNumEl.textContent = '/ ' + prevMod.number;
    if (prevCatEl) prevCatEl.textContent = lang === 'bn' ? prevMod.catLabelBn : prevMod.catLabelEn;
    if (prevTitleEl) prevTitleEl.textContent = (dict && dict[prevMod.titleKey]) || prevMod.titleFallback;
  }

  // Update Right Peeking Card ("side diye ektu ber kore diba")
  const nextIdx = getNextFilteredIndex('next');
  const nextMod = STORYBOARD_MODULES[nextIdx];
  if (nextMod) {
    const nextNumEl = document.getElementById('sbPeekNextNum');
    const nextCatEl = document.getElementById('sbPeekNextCat');
    const nextTitleEl = document.getElementById('sbPeekNextTitle');
    if (nextNumEl) nextNumEl.textContent = '/ ' + nextMod.number;
    if (nextCatEl) nextCatEl.textContent = lang === 'bn' ? nextMod.catLabelBn : nextMod.catLabelEn;
    if (nextTitleEl) nextTitleEl.textContent = (dict && dict[nextMod.titleKey]) || nextMod.titleFallback;
  }

  // Navigation Dots
  const dots = document.querySelectorAll('.sb-nav-dot');
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

function switchStoryboardModule(newIndex, direction = 'next', isManual = true) {
  if (sbIsAnimating || newIndex === sbCurrentIndex) return;
  if (newIndex < 0) newIndex = STORYBOARD_MODULES.length - 1;
  if (newIndex >= STORYBOARD_MODULES.length) newIndex = 0;

  sbIsAnimating = true;
  const card = document.getElementById('sbActiveCard');

  if (card) {
    if (direction === 'next') {
      card.classList.add('anim-slide-left');
      setTimeout(() => {
        sbCurrentIndex = newIndex;
        renderActiveStoryboardCard(sbCurrentIndex);
        card.classList.remove('anim-slide-left');
        card.classList.add('anim-enter-right');

        setTimeout(() => {
          card.classList.remove('anim-enter-right');
          sbIsAnimating = false;
          startStoryboardAutoPlay();
        }, 380);
      }, 220);
    } else {
      card.classList.add('anim-slide-right');
      setTimeout(() => {
        sbCurrentIndex = newIndex;
        renderActiveStoryboardCard(sbCurrentIndex);
        card.classList.remove('anim-slide-right');
        card.classList.add('anim-enter-left');

        setTimeout(() => {
          card.classList.remove('anim-enter-left');
          sbIsAnimating = false;
          startStoryboardAutoPlay();
        }, 380);
      }, 220);
    }
  } else {
    sbCurrentIndex = newIndex;
    renderActiveStoryboardCard(sbCurrentIndex);
    sbIsAnimating = false;
    startStoryboardAutoPlay();
  }
}

function updateStoryboardLanguage(lang) {
  renderActiveStoryboardCard(sbCurrentIndex);
}

function initStoryboardShowcase() {
  const container = document.getElementById('modulesStoryboardShowcase');
  if (!container) return;

  const card = document.getElementById('sbActiveCard');
  const stage = document.getElementById('sbPeekingStage');
  const prevBtn = document.getElementById('sbPrevBtn');
  const nextBtn = document.getElementById('sbNextBtn');
  const dotsTrack = document.getElementById('sbDotsTrack');
  const filterBtns = document.querySelectorAll('.sb-filter-btn');
  const peekPrev = document.getElementById('sbPeekPrevCard');
  const peekNext = document.getElementById('sbPeekNextCard');

  // 1. Generate Navigation Dots
  if (dotsTrack) {
    dotsTrack.innerHTML = '';
    STORYBOARD_MODULES.forEach((mod, idx) => {
      const dot = document.createElement('span');
      dot.className = 'sb-nav-dot' + (idx === 0 ? ' active' : '');
      dot.setAttribute('data-index', idx);
      dot.setAttribute('aria-label', 'Go to module ' + mod.number);
      dot.addEventListener('click', () => {
        const dir = idx > sbCurrentIndex ? 'next' : 'prev';
        switchStoryboardModule(idx, dir);
      });
      dotsTrack.appendChild(dot);
    });
  }

  // 2. Initial Render
  renderActiveStoryboardCard(0);

  // 3. Arrow Buttons
  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      switchStoryboardModule(getNextFilteredIndex('prev'), 'prev');
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      switchStoryboardModule(getNextFilteredIndex('next'), 'next');
    });
  }

  // 4. Peeking Cards Click Handlers
  if (peekPrev) {
    peekPrev.addEventListener('click', (e) => {
      e.preventDefault();
      switchStoryboardModule(getNextFilteredIndex('prev'), 'prev');
    });
  }

  if (peekNext) {
    peekNext.addEventListener('click', (e) => {
      e.preventDefault();
      switchStoryboardModule(getNextFilteredIndex('next'), 'next');
    });
  }

  // 5. Category Filter Buttons with Distinct Color Switch
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter') || 'all';
      sbActiveFilter = filter;
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Find first module in this category
      let firstMatch = -1;
      STORYBOARD_MODULES.forEach((m, i) => {
        if ((filter === 'all' || m.category === filter) && firstMatch === -1) {
          firstMatch = i;
        }
      });

      const curMod = STORYBOARD_MODULES[sbCurrentIndex];
      if (filter !== 'all' && curMod && curMod.category !== filter && firstMatch !== -1) {
        switchStoryboardModule(firstMatch, 'next');
      } else {
        renderActiveStoryboardCard(sbCurrentIndex);
        startStoryboardAutoPlay();
      }
    });
  });

  // 6. Kinetic Touch & Mouse Drag Mechanics (Finger swipe on mobile, mouse drag on PC)
  const swipeTarget = card || stage;
  if (swipeTarget) {
    let startX = 0;
    let startY = 0;
    let currentX = 0;
    let isDragging = false;
    let hasMoved = false;

    const onStart = (e) => {
      if (sbIsAnimating) return;
      if (e.target.closest('button, a, input, select')) return;

      isDragging = true;
      hasMoved = false;
      sbIsUserInteracting = true;
      stopStoryboardAutoPlay();

      const point = e.touches ? e.touches[0] : e;
      startX = point.clientX;
      startY = point.clientY;
      currentX = startX;
    };

    const onMove = (e) => {
      if (!isDragging) return;
      const point = e.touches ? e.touches[0] : e;
      currentX = point.clientX;
      const diffX = currentX - startX;
      const diffY = point.clientY - startY;

      // Check if horizontal intent
      if (!hasMoved) {
        if (Math.abs(diffX) > 8 && Math.abs(diffX) > Math.abs(diffY)) {
          hasMoved = true;
          if (card) card.classList.add('is-swiping');
        } else if (Math.abs(diffY) > 12) {
          // Vertical scrolling allowed
          isDragging = false;
          return;
        }
      }

      if (hasMoved && card) {
        if (e.cancelable) e.preventDefault();
        const rot = diffX * 0.025;
        card.style.transform = `translate3d(${diffX}px, 0, 0) rotate(${rot}deg)`;
      }
    };

    const onEnd = (e) => {
      if (!isDragging) return;
      isDragging = false;
      sbIsUserInteracting = false;

      if (card) {
        card.classList.remove('is-swiping');
        card.style.transform = '';
      }

      if (hasMoved) {
        const diffX = currentX - startX;
        if (diffX < -45) {
          // Swiped Left -> Next Module
          switchStoryboardModule(getNextFilteredIndex('next'), 'next');
        } else if (diffX > 45) {
          // Swiped Right -> Prev Module
          switchStoryboardModule(getNextFilteredIndex('prev'), 'prev');
        } else {
          startStoryboardAutoPlay();
        }
      } else {
        startStoryboardAutoPlay();
      }
      hasMoved = false;
    };

    // Pointer & Touch Listeners
    swipeTarget.addEventListener('pointerdown', onStart, { passive: true });
    window.addEventListener('pointermove', onMove, { passive: false });
    window.addEventListener('pointerup', onEnd, { passive: true });
    window.addEventListener('pointercancel', onEnd, { passive: true });

    // Touch fallback
    swipeTarget.addEventListener('touchstart', onStart, { passive: true });
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('touchend', onEnd, { passive: true });
  }

  // 7. Hover Pause & Resume for Desktop Reading Comfort
  if (stage) {
    stage.addEventListener('mouseenter', () => {
      pauseStoryboardAutoPlay();
    });
    stage.addEventListener('mouseleave', () => {
      if (!sbIsUserInteracting) {
        resumeStoryboardAutoPlay();
      }
    });
  }

  // 8. Intersection Observer (Runs 10s auto-play when section is visible)
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          startStoryboardAutoPlay();
        } else {
          stopStoryboardAutoPlay();
        }
      });
    }, { threshold: 0.1 });

    observer.observe(container);
  } else {
    startStoryboardAutoPlay();
  }

  // 9. Keyboard Arrow Navigation Support
  window.addEventListener('keydown', (e) => {
    const rect = container.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;
    if (!inView) return;

    if (e.key === 'ArrowLeft') {
      switchStoryboardModule(getNextFilteredIndex('prev'), 'prev');
    } else if (e.key === 'ArrowRight') {
      switchStoryboardModule(getNextFilteredIndex('next'), 'next');
    }
  });

  // 10. Direct Navigation Module Jumps (Header dropdown & Footer links)
  document.querySelectorAll('[data-module-jump]').forEach(link => {
    link.addEventListener('click', () => {
      const targetIdx = parseInt(link.getAttribute('data-module-jump'), 10);
      if (!isNaN(targetIdx) && targetIdx >= 0 && targetIdx < STORYBOARD_MODULES.length) {
        const allFilterBtn = container.querySelector('.sb-filter-btn[data-filter="all"]');
        if (allFilterBtn && !allFilterBtn.classList.contains('active')) {
          allFilterBtn.click();
        }
        const dir = targetIdx > sbCurrentIndex ? 'next' : 'prev';
        switchStoryboardModule(targetIdx, dir);
      }
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
    const vat = 0; // 0% tax / direct settlement
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

  // Stage 3: Customer Due Ledger Download
  const btnDueLedger = document.getElementById('btnSimLedger');
  if (btnDueLedger) {
    btnDueLedger.addEventListener('click', (e) => {
      e.stopPropagation();
      btnDueLedger.textContent = '✓ Due Statement PDF Generated!';
      setTimeout(() => {
        btnDueLedger.innerHTML = '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> Download Customer Ledger';
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


/* ==========================================================================
   CONCEPT B: THE "OLD WAY VS YES SME" INTERACTIVE TRANSFORMATION SLIDER
   Interactive Dual-World Drag Handle & Pill Switcher
   ========================================================================== */
function initTransformationSlider() {

  // Odometer Counter Animation for KPI Stat Cards (Bilingual Support)
  function initTransformKpiCounters() {
    const kpiElements = document.querySelectorAll('.glass-kpi-card .kpi-value[data-counter-target]');
    if (!kpiElements.length) return;

    let hasRun = false;

    function toBn(numStr) {
      const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
      return String(numStr).replace(/[0-9]/g, d => bnDigits[d]);
    }

    function animateValue(el) {
      const target = parseInt(el.getAttribute('data-counter-target'), 10);
      const isBn = (document.documentElement.lang === 'bn') || (typeof currentLanguage !== 'undefined' && currentLanguage === 'bn');
      if (isNaN(target)) return;

      const duration = 1600; // ms
      const startTime = performance.now();

      function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(ease * target);

        // Formatted number
        let formatted = target >= 1000 ? current.toLocaleString('en-US') : String(current);
        if (isBn) formatted = toBn(formatted);

        // Suffix & Prefix depending on language
        let displaySuffix = '';
        let displayPrefix = '';

        if (target === 18) {
          displaySuffix = isBn ? '+ ঘণ্টা' : '+ Hours';
        } else if (target === 24500) {
          displayPrefix = '৳';
          displaySuffix = '+';
        } else if (target === 7) {
          displaySuffix = isBn ? ' গুণ দ্রুত' : 'x Faster';
        } else if (target === 100) {
          displaySuffix = isBn ? '% অটো' : '% Auto';
        }

        el.textContent = displayPrefix + formatted + displaySuffix;

        if (progress < 1) {
          requestAnimationFrame(update);
        }
      }
      requestAnimationFrame(update);
    }

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !hasRun) {
            hasRun = true;
            kpiElements.forEach(animateValue);
          }
        });
      }, { threshold: 0.2 });

      const kpiBar = document.querySelector('.luxury-glass-kpis');
      if (kpiBar) observer.observe(kpiBar);
    }

    // Connect pill button clicks for instant smooth transitions
    const btnOld = document.getElementById('btnModeOld');
    const btnSplit = document.getElementById('btnModeSplit');
    const btnNew = document.getElementById('btnModeNew');

    if (btnOld) btnOld.addEventListener('click', () => setSplit(0, true));
    if (btnSplit) btnSplit.addEventListener('click', () => setSplit(50, true));
    if (btnNew) btnNew.addEventListener('click', () => setSplit(100, true));
  }

  initTransformKpiCounters();

  const stage = document.getElementById('transformStage');
  const handle = document.getElementById('transformSplitHandle');
  const layerCloud = document.getElementById('layerCloud');
  const btnOld = document.getElementById('btnModeOld');
  const btnSplit = document.getElementById('btnModeSplit');
  const btnNew = document.getElementById('btnModeNew');

  if (!stage || !handle || !layerCloud) return;

  let currentPos = 50;
  let isDragging = false;
  let animTimer = null;

  function updateActivePill(pos) {
    [btnOld, btnSplit, btnNew].forEach(b => b && b.classList.remove('active'));
    if (pos <= 18) {
      if (btnOld) btnOld.classList.add('active');
    } else if (pos >= 82) {
      if (btnNew) btnNew.classList.add('active');
    } else {
      if (btnSplit) btnSplit.classList.add('active');
    }
  }

  function setSplit(pos, isAnimated = false) {
    currentPos = Math.max(3, Math.min(97, pos));
    
    if (isAnimated) {
      layerCloud.classList.add('is-animating');
      clearTimeout(animTimer);
      animTimer = setTimeout(() => {
        layerCloud.classList.remove('is-animating');
      }, 500);
    } else {
      layerCloud.classList.remove('is-animating');
    }

    stage.style.setProperty('--split-pos', currentPos + '%');
    handle.setAttribute('aria-valuenow', Math.round(currentPos));
    updateActivePill(currentPos);
  }

  // Pointer / Mouse / Touch Dragging
  function onPointerMove(e) {
    if (!isDragging) return;
    const rect = stage.getBoundingClientRect();
    if (rect.width <= 0) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const newPos = ((clientX - rect.left) / rect.width) * 100;
    setSplit(newPos, false);
  }

  function stopDrag() {
    if (isDragging) {
      isDragging = false;
      document.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerup', stopDrag);
      document.removeEventListener('touchmove', onPointerMove);
      document.removeEventListener('touchend', stopDrag);
    }
  }

  function startDrag(e) {
    isDragging = true;
    document.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('pointerup', stopDrag);
    document.addEventListener('touchmove', onPointerMove, { passive: true });
    document.addEventListener('touchend', stopDrag);
    onPointerMove(e);
  }

  handle.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    startDrag(e);
  });

  handle.addEventListener('touchstart', (e) => {
    startDrag(e);
  }, { passive: true });

  // Clicking anywhere on stage sets position smoothly
  stage.addEventListener('click', (e) => {
    if (e.target.closest('#transformSplitHandle') || e.target.closest('button') || e.target.closest('a')) {
      return;
    }
    const rect = stage.getBoundingClientRect();
    if (rect.width <= 0) return;
    const clickPos = ((e.clientX - rect.left) / rect.width) * 100;
    setSplit(clickPos, true);
  });

  // Keyboard navigation on handle
  handle.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setSplit(currentPos - 5, true);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setSplit(currentPos + 5, true);
    } else if (e.key === 'Home') {
      e.preventDefault();
      setSplit(5, true);
    } else if (e.key === 'End') {
      e.preventDefault();
      setSplit(95, true);
    }
  });

  // Pill Mode Buttons
  if (btnOld) {
    btnOld.addEventListener('click', () => setSplit(4, true));
  }
  if (btnSplit) {
    btnSplit.addEventListener('click', () => setSplit(50, true));
  }
  if (btnNew) {
    btnNew.addEventListener('click', () => setSplit(96, true));
  }

  // Initial setup at 50%
  setSplit(50, false);
}

/* ==========================================================================
   MASTER APPLICATION INITIALIZATION
   Runs all sub-systems, animations, timers, and interactive components.
   ========================================================================== */
function initApp() {
  const tasks = [
    { name: 'Translations', fn: initTranslations },
    { name: 'NavbarScroll', fn: initNavbarScroll },
    { name: 'ScrollSpy', fn: initScrollSpy },
    { name: 'MobileNav', fn: initMobileNav },
    { name: 'HeroChatbot', fn: initHeroChatbot },
    { name: 'RampInteractiveStage', fn: initRampInteractiveStage },
    { name: 'DashboardTabs', fn: initDashboardTabs },
    { name: 'PosInteractiveSandbox', fn: initPosInteractiveSandbox },
    { name: 'IndustryTabs', fn: initIndustryTabs },
    { name: 'AdvisorROI', fn: initAdvisor },
    { name: 'SpotlightConsole', fn: initSpotlightConsole },
    { name: 'MobilePosBanner', fn: initMobilePosBanner },
    { name: 'MposAnimation', fn: initMposAnimation },
    { name: 'TransformationSlider', fn: initTransformationSlider },
    { name: 'DayStoryShowcase', fn: initDayStoryShowcase },
    { name: 'PricingCards', fn: initPricingCards },
    { name: 'EnterpriseCard', fn: initEnterpriseCard },
    { name: 'ComparisonTable', fn: initComparisonTable },
    { name: 'ComparisonDrawer', fn: initComparisonDrawer },
    { name: 'TableSearch', fn: initTableSearch },
    { name: 'StoryboardShowcase', fn: initStoryboardShowcase },
    { name: 'TestimonialsSlider', fn: initTestimonialsSlider },
    { name: 'FaqAccordion', fn: initFaqAccordion },
    { name: 'ContactModal', fn: initContactModal },
    { name: 'OfficeVisitModal', fn: initOfficeVisitModal },
    { name: 'ScrollReveal', fn: initScrollReveal }
  ];

  tasks.forEach(t => {
    try {
      if (typeof t.fn === 'function') {
        t.fn();
      }
    } catch (err) {
      console.warn('[YES SME] Init warning in ' + t.name + ':', err);
    }
  });

  // Re-run scroll reveal after dynamic cards and templates mount
  setTimeout(() => {
    if (typeof initScrollReveal === 'function') {
      initScrollReveal();
    }
  }, 100);

  // Footer Back To Top Button
  const footerBackToTopBtn = document.getElementById('footerBackToTopBtn');
  if (footerBackToTopBtn) {
    footerBackToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Floating Back To Top Button
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
}

// Ensure execution whether script runs before or after DOM readiness
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}


/**
 * CONCEPT B: A DAY IN THE LIFE OF A SMART SME OWNER (STYLE 1: SUN-CYCLE)
 * Dynamic time-lapse scrubber, ambient phase shifts, auto-progress
 */
function initDayStoryShowcase() {
  const container = document.getElementById('dayStoryShowcase');
  if (!container) return;

  const stage = document.getElementById('dayStoryStage');
  const nodes = container.querySelectorAll('.sun-cycle-node');
  const cards = container.querySelectorAll('.day-chapter-card');
  const token = document.getElementById('sunScrubberToken');
  const tokenIcon = document.getElementById('sunTokenIcon');
  const btnPrev = document.getElementById('btnStoryPrev');
  const btnNext = document.getElementById('btnStoryNext');
  const btnAutoplay = document.getElementById('btnStoryAutoplay');
  const playIcon = document.getElementById('storyPlayIcon');

  const phases = [
    { key: 'morning', icon: '☀️', class: 'time-morning' },
    { key: 'noon', icon: '⚡', class: 'time-noon' },
    { key: 'sunset', icon: '🚚', class: 'time-sunset' },
    { key: 'night', icon: '🌙', class: 'time-night' }
  ];

  let currentIndex = 0;
  let lastIndex = 0;
  let autoplayTimer = null;
  let isPlaying = true;

  function updateScrubberToken(targetNode) {
    if (!token || !targetNode) return;
    const track = targetNode.parentElement;
    if (!track) return;
    const trackRect = track.getBoundingClientRect();
    const nodeRect = targetNode.getBoundingClientRect();
    token.style.left = `${Math.max(4, nodeRect.left - trackRect.left)}px`;
    token.style.width = `${nodeRect.width}px`;
  }

  function setPhase(index, userDirection) {
    if (index < 0) index = phases.length - 1;
    if (index >= phases.length) index = 0;
    
    // Determine swipe direction
    const direction = userDirection || (index >= lastIndex ? 'slide-left' : 'slide-right');
    lastIndex = index;
    currentIndex = index;

    const currentPhase = phases[currentIndex];

    // Update Stage Class
    if (stage) {
      stage.className = `day-story-stage ${currentPhase.class}`;
    }

    // Update Token Icon
    if (tokenIcon) {
      tokenIcon.textContent = currentPhase.icon;
    }

    // Update Nodes
    nodes.forEach((n, idx) => {
      const active = idx === currentIndex;
      n.classList.toggle('active', active);
      n.setAttribute('aria-selected', active ? 'true' : 'false');
      if (active) updateScrubberToken(n);
    });

    // Update Chapter Cards with horizontal swipe animation
    cards.forEach((c) => {
      const match = c.getAttribute('data-chapter') === currentPhase.key;
      c.classList.remove('slide-left', 'slide-right');
      if (match) {
        c.classList.add(direction);
        c.classList.add('active');
      } else {
        c.classList.remove('active');
      }
    });
  }

  const DAY_STORY_INTERVAL = 4800; // 4.8 seconds

  function resetAutoplayTimer() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
    if (isPlaying) {
      autoplayTimer = setInterval(() => {
        setPhase(currentIndex + 1, 'slide-left');
      }, DAY_STORY_INTERVAL);
    }
  }

  // Click on Nodes (Whichever time node is clicked, restart the countdown so it always swipes after the interval)
  nodes.forEach((node, idx) => {
    node.addEventListener('click', () => {
      const dir = idx >= currentIndex ? 'slide-left' : 'slide-right';
      setPhase(idx, dir);
      if (isPlaying) {
        resetAutoplayTimer();
      }
    });
  });

  // Prev / Next Buttons
  if (btnPrev) {
    btnPrev.addEventListener('click', () => {
      setPhase(currentIndex - 1, 'slide-right');
      if (isPlaying) {
        resetAutoplayTimer();
      }
    });
  }

  if (btnNext) {
    btnNext.addEventListener('click', () => {
      setPhase(currentIndex + 1, 'slide-left');
      if (isPlaying) {
        resetAutoplayTimer();
      }
    });
  }

  // Auto-play timer (automatic swipe morning -> noon -> sunset -> night)
  function startAutoplay() {
    isPlaying = true;
    if (playIcon) playIcon.textContent = '⏸️';
    resetAutoplayTimer();
  }

  function stopAutoplay() {
    isPlaying = false;
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
    if (playIcon) playIcon.textContent = '▶️';
  }

  if (btnAutoplay) {
    btnAutoplay.addEventListener('click', () => {
      if (isPlaying) {
        stopAutoplay();
      } else {
        startAutoplay();
      }
    });
  }

  // Viewport Observer: Pause when scrolled off screen, resume when in screen
  if ('IntersectionObserver' in window) {
    const storyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (isPlaying && !autoplayTimer) {
            resetAutoplayTimer();
          }
        } else {
          if (autoplayTimer) {
            clearInterval(autoplayTimer);
            autoplayTimer = null;
          }
        }
      });
    }, { threshold: 0.08 });
    storyObserver.observe(container);
  }

  // Mobile Touch Swipe Gesture
  const viewport = container.querySelector('.day-chapters-viewport');
  if (viewport) {
    let touchStartX = 0;
    let touchStartY = 0;
    viewport.addEventListener('touchstart', (e) => {
      if (e.touches && e.touches[0]) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    }, { passive: true });

    viewport.addEventListener('touchend', (e) => {
      if (!e.changedTouches || !e.changedTouches[0]) return;
      const diffX = e.changedTouches[0].clientX - touchStartX;
      const diffY = e.changedTouches[0].clientY - touchStartY;
      // Only trigger if horizontal movement is dominant and > 40px
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
        if (diffX < 0) {
          // Swipe left -> advance to next time
          setPhase(currentIndex + 1, 'slide-left');
        } else {
          // Swipe right -> go back to previous time
          setPhase(currentIndex - 1, 'slide-right');
        }
        if (isPlaying) {
          resetAutoplayTimer();
        }
      }
    }, { passive: true });
  }

  // Initial position after render
  setTimeout(() => {
    setPhase(0);
  }, 100);

  // Start auto-progress directly on initialization
  startAutoplay();

  // Resize handler for token position
  window.addEventListener('resize', () => {
    if (nodes[currentIndex]) {
      updateScrubberToken(nodes[currentIndex]);
    }
  });
}

/* ==========================================================================
   SCROLL REVEAL ENTRANCE ANIMATION CONTROLLER
   Smoothly reveals cards and headers from bottom to top as you scroll down
   ========================================================================== */
let globalScrollRevealObserver = null;

function initScrollReveal() {
  const revealSelectors = [
    '.section-header',
    '.integrations-header',
    '.benchmark-bento-card',
    '.storyboard-filter-bar',
    '.storyboard-stage-col',
    '.storyboard-index-col',
    '.pricing-billing-switcher-wrap',
    '.pricing-tier-pill-bar',
    '.pricing-slider-stage',
    '.pricing-trust-strip',
    '.enterprise-showcase-box',
    '.comparison-legend-wrap',
    '.comparison-table-wrapper',
    '.day-story-stage',
    '.testimonials-trust-bar',
    '.stories-filter-bar',
    '.testimonials-slider-container',
    '.story-card',
    '.why-stat-card',
    '.why-bento-card',
    '.faq-controls-wrap',
    '.faq-container-box',
    '.faq-bottom-help-strip',
    '.mobile-pos-banner'
  ];

  const elements = document.querySelectorAll(revealSelectors.join(', '));
  if (!elements.length) return;

  const windowHeight = window.innerHeight || document.documentElement.clientHeight;

  if (!globalScrollRevealObserver && ('IntersectionObserver' in window)) {
    globalScrollRevealObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          el.classList.add('is-revealed');
          obs.unobserve(el);
          setTimeout(() => {
            el.classList.remove('reveal-on-scroll');
            el.classList.add('reveal-completed');
          }, 950);
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -25px 0px',
      threshold: 0.05
    });
  }

  elements.forEach(el => {
    // If element has already completed its entrance animation or is marked revealed, keep it visible
    if (el.classList.contains('reveal-completed') || el.classList.contains('is-revealed')) {
      return;
    }

    const rect = el.getBoundingClientRect();
    // Elements already in or near viewport on initial page load: show immediately
    if (rect.top < windowHeight * 0.90 && rect.bottom > 0) {
      el.classList.add('reveal-completed');
    } else {
      // Elements below viewport: set up smooth upward transition
      el.classList.add('reveal-on-scroll');
      if (globalScrollRevealObserver) {
        globalScrollRevealObserver.observe(el);
      } else {
        el.classList.add('is-revealed');
      }
    }
  });
}