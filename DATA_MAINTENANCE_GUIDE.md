# YES SME Landing Page — Long-Term Data Maintenance & Editing Guide

This guide explains how to easily edit, add, or update data (Pricing, Client Testimonials, Features, FAQs, Contact Info) on the **YES SME Landing Page** for long-term production use.

---

## 📁 1. Architecture Overview (Where Data Lives)

The application is architected with clear separation of concerns:

| File / Folder | What It Controls | When to Edit |
| :--- | :--- | :--- |
| **`js/pricing-data.js`** | Pricing numbers, package limits, 72 comparison features, FAQs dataset, contact config | When changing prices, adding FAQs, modifying plan comparison rows |
| **`js/translations.js`** | All bilingual text strings (`en` and `bn` dictionaries) | When changing copy, client review texts, headlines, slogans, button labels |
| **`index.html`** | Structure, section layouts, and `data-i18n="key"` bindings | When adding new HTML elements, changing image paths, or updating links |
| **`assets/clients/`** | Client portrait photos (`client_tanvir.jpg`, etc.) | When updating client testimonial avatars |
| **`assets/mobile-pos/`** | Mobile POS app screenshots and mockups | When updating product screenshots |

---

## 💰 2. How to Edit Pricing & Packages

Open **`js/pricing-data.js`**:

```javascript
// Located around line 20 in js/pricing-data.js
packages: [
  {
    id: "starter",
    name: "Starter",
    badge: null,
    tagline: "For small shops & startups beginning their digital journey.",
    monthlyPrice: 500,        // Change monthly price here (in BDT)
    yearlyPrice: 5000,        // Change yearly price here (in BDT)
    setupFee: 3000,           // Change one-time setup fee here
    limits: {
      products: "200 Products",
      outlets: "1 Outlet / Counter",
      users: "1 User"
    },
    features: [
      "200 Active Products",
      "Offline POS & Barcode Billing",
      "Sales & Stock Reports"
    ]
  },
  ...
]
```

### Tips for Pricing:
- Changing `monthlyPrice`, `yearlyPrice`, or `setupFee` automatically updates the live pricing toggle on the landing page!
- If you change package names or limits, update both the English and Bengali texts in `js/pricing-data.js` and `js/translations.js`.

---

## ⭐ 3. How to Edit or Add Client Testimonials

Client testimonials are managed in two places:

### A. Updating the Review Text & Client Details:
Open **`js/translations.js`** and locate the test keys (e.g. `test1`, `test2`, `test3`...):

```javascript
// In TRANSLATIONS.en:
"test1.name": "Tanvir Ahmed",
"test1.role": "Managing Director, Artisan Fashion BD",
"test1.location": "Banani Road 11, Dhaka",
"test1.quote": "Before YES SME, tracking unsold sizes across branches was a nightmare...",
"test1.stat": "99.4% Stock Accuracy Across 4 Branches",

// In TRANSLATIONS.bn:
"test1.name": "তানভীর আহমেদ",
"test1.role": "ব্যবস্থাপনা পরিচালক, আর্টিসান ফ্যাশন বিডি",
"test1.location": "বনানী রোড ১১, ঢাকা",
"test1.quote": "YES SME ব্যবহারের আগে একাধিক শাখার অবিক্রিত সাইজ ট্র্যাক করা ছিল দুঃস্বপ্ন...",
"test1.stat": "৪টি শোরুমে ৯৯.৪% স্টক নির্ভুলতা",
```

### B. Updating Client Photos:
1. Place the new avatar photo into `assets/clients/` (e.g. `client_new_name.jpg`).
2. Open `index.html`, locate the card (e.g. `id="story-1"`), and update the `<img>` tag:
   ```html
   <img src="assets/clients/client_new_name.jpg" alt="Tanvir Ahmed" class="author-photo-img" loading="lazy">
   ```

---

## 📊 4. How to Edit or Add Features in the Comparison Matrix

The 72 features across 12 modules are defined in **`js/pricing-data.js`** under `comparisonCategories`:

```javascript
// Around line 130 in js/pricing-data.js
{
  id: "pos_sales",
  title: "POS & Sales Operations",
  features: [
    {
      name: "Smart POS Billing System",                   // English feature name
      nameBn: "স্মার্ট পিওএস ক্যাশ কাউন্টার বিলিং",       // Bengali feature name
      tooltip: "Barcode billing with instant thermal receipt printing.",
      starter: false,                                    // true, false, or custom string like 'Basic'
      basic: true,
      medium: true,
      high: true
    }
  ]
}
```

### Rules:
- If a feature is included: use `true` (displays as green **✓**).
- If not included: use `false` (displays as dash **—**).
- If it has custom limits: use a string (e.g., `'Up to 5 Users'`). In Bengali mode, `app.js` will automatically translate common limits.

---

## ❓ 5. How to Edit or Add FAQs

Open **`js/pricing-data.js`** and scroll to `PRICING_DATA.faqs`:

```javascript
{
  id: 1,
  category: "general", // 'general', 'billing', 'pos_hardware', 'data_security'
  popular: true,
  questionEn: "Can I use YES SME without an internet connection?",
  questionBn: "ইন্টারনেট না থাকলেও কি YES SME ব্যবহার করা যাবে?",
  answerEn: "Yes! Our Smart POS module is engineered with 100% offline-first technology...",
  answerBn: "হ্যাঁ! আমাদের স্মার্ট পিওএস ১০০% অফলাইন টেকনোলজিতে কাজ করে..."
}
```

To add a new question, simply copy and paste an object into the array with an incremented `id`. It will automatically appear in the interactive FAQ accordion in both English and Bengali!

---

## 📞 6. How to Update Office Address, Hotline & Email

To update contact details universally:

1. **In `js/pricing-data.js` (lines 12–19)**:
   ```javascript
   contact: {
     hotline: "01955345331",
     hotlineFormatted: "+880 1955-345331",
     email: "info@yesbangladesh.net",
     website: "www.yesbangladesh.net",
     address: "House 43, Road 9, Nikunja 2, Khilkhet, Dhaka-1229, Bangladesh"
   }
   ```
2. **In `js/translations.js`**:
   - Update `topbar.hotline`, `topbar.location`
   - Update `footer.hotline`, `footer.office`, `footer.email`
   - Both under `en` and `bn`.
3. **In `index.html`**:
   - Update the `href="tel:..."` or `href="mailto:..."` links if phone/email change.

---

## ⚙️ 7. Best Practices & Quality Checks

Before publishing updates, run these simple terminal commands to ensure zero errors:

1. **Verify JavaScript Syntax**:
   ```powershell
   node -c js/pricing-data.js
   node -c js/translations.js
   node -c js/app.js
   ```
   *(No output means 100% valid syntax!)*

2. **Verify HTML Tag Balance**:
   ```powershell
   node scratch/validate_tags.js
   ```
   *(Must show `Diff: 0` for divs and sections!)*

---

## 📧 8. Setting Up the Email System for Demo Bookings

When clients book a demo or submit their phone number, the landing page collects their lead data and can email your sales team directly at **`info@yesbangladesh.net`**.

The code is pre-wired in **`js/app.js`** under `EMAIL_CONFIG`:

```javascript
const EMAIL_CONFIG = {
  // Option 1: Web3Forms (Recommended - 100% Free, Zero Backend)
  web3formsAccessKey: 'PASTE_YOUR_ACCESS_KEY_HERE', 

  // Option 2: Custom Server Endpoint (e.g. 'send-lead.php')
  customEndpoint: '',

  recipientEmail: 'info@yesbangladesh.net'
};
```

### Choose your setup method:

#### Method A: Web3Forms (Recommended — 2-minute setup, Zero server coding)
1. Go to **[https://web3forms.com](https://web3forms.com)**.
2. Enter **`info@yesbangladesh.net`** (or your sales email) and click *"Create Access Key"*.
3. Check your inbox for the Access Key (e.g., `a1b2c3d4-e5f6-7890-abcd-1234567890ab`).
4. Paste the Access Key into `EMAIL_CONFIG.web3formsAccessKey` in **`js/app.js`**.
5. **Done!** Every lead submitted on the modal or mobile POS phone input will arrive instantly in your inbox!

#### Method B: cPanel / PHP Server (If hosted on Apache/cPanel)
If you deploy to standard cPanel web hosting:
1. Upload **`send-lead.php`** (included in the root directory) to your server.
2. In `js/app.js`, set:
   ```javascript
   customEndpoint: 'send-lead.php'
   ```
3. Any lead submitted will send an HTML-formatted email via your server's mail system directly to `info@yesbangladesh.net`.

---
*Created for YES SME Enterprise by YES Bangladesh.*
