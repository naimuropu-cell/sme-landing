/**
 * YES SME - Comprehensive Pricing, Plan Comparison & FAQ Dataset
 * Full Bilingual (EN/BN) Data Structure
 */

const PRICING_DATA = {
  "currency": {
    "symbol": "৳",
    "code": "BDT",
    "label": "BDT (Bangladeshi Taka)"
  },
  "contact": {
    "hotline": "01955345331",
    "hotlineFormatted": "+880 1955-345331",
    "email": "info@yesbangladesh.net",
    "supportEmail": "info@yesbangladesh.net",
    "website": "www.yesbangladesh.net",
    "facebook": "https://www.facebook.com/share/1DnfFgoZxp/?mibextid=wwXIfr",
    "linkedin": "https://www.linkedin.com/company/yes-bangladesh1/",
    "address": "House 43, Road 9, Nikunja 2, Khilkhet, Dhaka-1229, Bangladesh"
  },
  "packages": [
    {
      "id": "starter",
      "name": "Starter",
      "badge": null,
      "tagline": "For small shops & startups beginning their digital journey.",
      "monthlyPrice": 500,
      "yearlyPrice": 5000,
      "setupFee": 3000,
      "limits": {
        "products": "200 Products",
        "hosting": "Shared",
        "storage": "1 GB Storage",
        "store": "1 store",
        "traffic": null,
        "users": null
      },
      "highlights": [
        "Supplier & Purchasing Management",
        "Bank Accounts & MFS (bKash/Nagad) Ledger",
        "Basic Inventory Management",
        "Simple Stock Adjustment & Opening Stock",
        "AI-Powered Sales Reporting",
        "Customer Due Reminder SMS",
        "Mobile-Responsive Admin Panel"
      ],
      "ctaText": "Get Started",
      "ctaType": "primary",
      "isPopular": false
    },
    {
      "id": "basic",
      "name": "Basic",
      "badge": null,
      "tagline": "For growing retail shops needing tighter daily control & offline resilience.",
      "monthlyPrice": 1000,
      "yearlyPrice": 10000,
      "setupFee": 5000,
      "limits": {
        "products": "250 Products",
        "hosting": "VPS",
        "website": "Free Website",
        "storage": "2 GB Storage",
        "store": "1 store",
        "traffic": "Up to 5,000 visits / mo",
        "users": "Up to 5 Admin Users"
      },
      "highlights": [
        "All Starter Features included",
        "Smart POS & Offline Sync (Sell without internet)",
        "Single Courier Integration (Pathao or Steadfast)",
        "Sales Return & Exchange Processing",
        "Automatic Barcode Generation & Label Printing",
        "Cash Book, Bank Book & Petty Cash",
        "Daily Expense Tracking & Reports"
      ],
      "ctaText": "Choose Basic",
      "ctaType": "primary",
      "isPopular": false
    },
    {
      "id": "medium",
      "name": "Medium",
      "badge": "Popular",
      "tagline": "For established retail & apparel brands selling both online and offline.",
      "monthlyPrice": 2000,
      "yearlyPrice": 20000,
      "setupFee": 8000,
      "limits": {
        "products": "350 Products",
        "hosting": "AWS",
        "website": "Free Website",
        "storage": "4 GB Storage",
        "branches": "2 Branches",
        "traffic": "Up to 10,000 visits / mo",
        "users": "Up to 10 Admin Users"
      },
      "highlights": [
        "All Basic Features included",
        "Dedicated E-commerce Website",
        "Dedicated Mobile Apps (Android & iOS)",
        "Online Payment Integration (bKash, Nagad, SSLCommerz)",
        "Pathao, Steadfast & REDX Courier Integration",
        "Advanced Accounting & Financial Reports",
        "Multi-Warehouse Inventory Management",
        "CRM, Sales Team & Loyalty Management"
      ],
      "ctaText": "Choose Medium",
      "ctaType": "accent",
      "isPopular": true
    },
    {
      "id": "high",
      "name": "High",
      "badge": null,
      "tagline": "For large retail chains, super shops & enterprises demanding total automation.",
      "monthlyPrice": 3000,
      "yearlyPrice": 30000,
      "setupFee": 15000,
      "limits": {
        "products": "Unlimited Products",
        "hosting": "AWS",
        "website": "Free Website",
        "storage": "10 GB Storage",
        "branches": "5 Branches",
        "traffic": "Unlimited (Subject to fair-use)",
        "users": "Unlimited Admin Users"
      },
      "highlights": [
        "All Medium Features included",
        "Dedicated Mobile Apps (Android & iOS)",
        "Unlimited Product Capacity",
        "Multi-Branch & Centralized Management",
        "AI-Powered Business Intelligence (Sales, Stock & Accounts)",
        "AI Shopping Assistant for E-commerce",
        "Facebook & Instagram Marketing Automation",
        "Advanced Security, Permissions & Audit Trails"
      ],
      "ctaText": "Upgrade to High",
      "ctaType": "primary",
      "isPopular": false
    }
  ],
  "customEnterprise": {
    "id": "custom",
    "name": "Custom / Enterprise",
    "badge": "Tailored Architecture",
    "tagline": "For businesses requiring specialized workflows, private infrastructure, or tailored ERP modules.",
    "priceDisplay": "Custom Pricing",
    "setupFeeDisplay": "Scope-based setup & migration",
    "highlights": [
      "Custom Modules & Workflows",
      "Tailored Integrations (Custom APIs & Systems)",
      "Flexible Business Requirements & Logic",
      "Custom Implementation, Cloud Architecture & Dedicated Support"
    ],
    "ctaText": "Contact Sales",
    "ctaType": "outline"
  },
  "comparisonCategories": [
    {
      "id": "core_limits",
      "title": "Core Capacity & Limits",
      "icon": "layers",
      "features": [
        {
          "name": "Branch & Outlet Limit",
          "nameBn": "শাখা ও আউটলেট সংখ্যা",
          "tooltip": "Number of separate store locations or billing counters supported.",
          "starter": "1 Outlet",
          "basic": "1 Outlet",
          "medium": "3 Outlets",
          "high": "Unlimited"
        },
        {
          "name": "Product SKU Capacity",
          "nameBn": "প্রোডাক্ট সংখ্যা ধারণক্ষমতা",
          "tooltip": "Total number of active products and variant items allowed in catalog.",
          "starter": "200 Products",
          "basic": "2,000 Products",
          "medium": "5,000 Products",
          "high": "Unlimited"
        },
        {
          "name": "Admin & Staff Accounts",
          "nameBn": "ইউজার লগইন ও স্টাফ এক্সেস",
          "tooltip": "Number of active user logins with role-based access control.",
          "starter": "1 User",
          "basic": "3 Users",
          "medium": "10 Users",
          "high": "Unlimited"
        },
        {
          "name": "Dedicated Cloud Infrastructure",
          "nameBn": "ক্লাউড হোস্টিং ও সিকিউরিটি",
          "tooltip": "High-performance enterprise cloud hosting with high-availability SSD.",
          "starter": "Shared Cloud",
          "basic": "High-Speed SSD",
          "medium": "AWS Cloud",
          "high": "AWS Dedicated Enterprise"
        }
      ]
    },
    {
      "id": "pos_billing",
      "title": "POS & Counter Operations",
      "icon": "shopping-cart",
      "features": [
        {
          "name": "100% Offline POS Billing & Auto-Sync",
          "nameBn": "১০০% অফলাইন বিলিং ও অটো ক্লাউড সিঙ্ক",
          "tooltip": "Continue fast billing without internet; syncs automatically once back online.",
          "starter": true,
          "basic": true,
          "medium": true,
          "high": true
        },
        {
          "name": "Barcode Scanner & Sticker Printing",
          "nameBn": "বারকোড স্ক্যানার ও রসিদ প্রিন্টিং",
          "tooltip": "Support for laser barcode scanners and thermal roll receipt printers.",
          "starter": false,
          "basic": true,
          "medium": true,
          "high": true
        },
        {
          "name": "Split Payment & Dynamic bKash/Nagad QR",
          "nameBn": "স্প্লিট পেমেন্ট ও বিকাশ/নগদ কিউআর",
          "tooltip": "Accept partial cash + digital MFS with dynamic QR code generation.",
          "starter": false,
          "basic": true,
          "medium": true,
          "high": true
        },
        {
          "name": "Hold Invoice & Multi-Customer Carts",
          "nameBn": "বিল হোল্ড ও একসাথে একাধিক কাস্টমার হ্যান্ডলিং",
          "tooltip": "Temporarily hold ongoing receipts to clear queue lines rapidly.",
          "starter": false,
          "basic": true,
          "medium": true,
          "high": true
        },
        {
          "name": "Exchange, Return & Credit Note System",
          "nameBn": "পণ্য ফেরত ও কাস্টমার ক্রেডিট নোট",
          "tooltip": "Process product returns, issue store credit notes, and auto-adjust inventory.",
          "starter": false,
          "basic": false,
          "medium": true,
          "high": true
        },
        {
          "name": "Cashier Shift Register & Closing Audit",
          "nameBn": "ক্যাশিয়ার শিফট ক্লোজিং ও ক্যাশ অডিট",
          "tooltip": "Track counter cash opening balance, shift handover, and prevent till discrepancies.",
          "starter": false,
          "basic": false,
          "medium": true,
          "high": true
        }
      ]
    },
    {
      "id": "inventory_branch",
      "title": "Inventory & Multi-Branch Management",
      "icon": "package",
      "features": [
        {
          "name": "Product Variants (Size, Color, Weight, Batch)",
          "nameBn": "প্রোডাক্ট ভ্যারিয়েন্ট (সাইজ, রঙ, ওজন)",
          "tooltip": "Manage multi-attribute SKU items with separate prices and barcodes.",
          "starter": true,
          "basic": true,
          "medium": true,
          "high": true
        },
        {
          "name": "Low Stock & Auto Reorder Alerts",
          "nameBn": "লো স্টক ও পুনরায় ক্রয়ের অ্যালার্ট",
          "tooltip": "Automated warning notifications when items reach critical stock minimums.",
          "starter": true,
          "basic": true,
          "medium": true,
          "high": true
        },
        {
          "name": "Inter-Branch Stock Transfer & Challan",
          "nameBn": "শাখা থেকে শাখায় পণ্য ট্রান্সফার ও চালান",
          "tooltip": "Generate digital transfer challans between warehouses and branch outlets.",
          "starter": false,
          "basic": false,
          "medium": true,
          "high": true
        },
        {
          "name": "Centralized Real-Time Stock View",
          "nameBn": "সকল শাখার লাইভ স্টক মনিটরিং",
          "tooltip": "View live inventory counts across all retail counters simultaneously.",
          "starter": false,
          "basic": false,
          "medium": true,
          "high": true
        },
        {
          "name": "Supplier Purchase & Weighted Average Costing",
          "nameBn": "সাপ্লায়ার ক্রয় ও গড় রেট হিসাব",
          "tooltip": "Manage supplier invoices, purchase orders, and dynamic cost calculation.",
          "starter": false,
          "basic": true,
          "medium": true,
          "high": true
        },
        {
          "name": "Damage, Loss & Stock Audit Log",
          "nameBn": "নষ্ট বা হারিয়ে যাওয়া পণ্যের অ্যাডজাস্টমেন্ট",
          "tooltip": "Track damaged goods, expiries, and inventory write-offs with audit logs.",
          "starter": false,
          "basic": true,
          "medium": true,
          "high": true
        }
      ]
    },
    {
      "id": "ecommerce_courier",
      "title": "Logistics & E-Commerce Integration",
      "icon": "truck",
      "features": [
        {
          "name": "Connected Free E-Commerce Web Storefront",
          "nameBn": "কানেক্টেড ফ্রি অনলাইন শপ ও ক্যাটালগ",
          "tooltip": "Instant online ordering website directly synced with your shop inventory.",
          "starter": false,
          "basic": true,
          "medium": true,
          "high": true
        },
        {
          "name": "1-Click Courier Integration (Pathao, Steadfast, RedX)",
          "nameBn": "১-ক্লিক পাঠাও ও স্টিডফাস্ট এপিআই",
          "tooltip": "Book parcels directly into couriers without manual address copy-pasting.",
          "starter": false,
          "basic": "1 Courier",
          "medium": "3 Couriers",
          "high": "All Couriers"
        },
        {
          "name": "Bulk Waybill & Sticker Label Printing",
          "nameBn": "একসাথে শত শত পার্সেল বুকিং ও লেবেল প্রিন্ট",
          "tooltip": "Print 100+ parcel stickers and consignment slips in 30 seconds.",
          "starter": false,
          "basic": false,
          "medium": true,
          "high": true
        },
        {
          "name": "Automated Customer Tracking SMS",
          "nameBn": "কাস্টমার অটোমেটিক এসএমএস ট্র্যাকিং",
          "tooltip": "Send automated branded SMS updates with courier tracking links upon dispatch.",
          "starter": false,
          "basic": false,
          "medium": true,
          "high": true
        },
        {
          "name": "Courier Fraud & Return Risk Preventer",
          "nameBn": "কুরিয়ার ফ্রড ও রিটার্ন ঝুঁকি প্রিভেন্টর",
          "tooltip": "Identify fake buyers and fraudulent numbers based on return history.",
          "starter": false,
          "basic": false,
          "medium": true,
          "high": true
        }
      ]
    },
    {
      "id": "accounts_tax",
      "title": "Accounts, Bakir Khata & NBR VAT",
      "icon": "file-text",
      "features": [
        {
          "name": "Customer Due Ledger / Bakir Khata & Reminder SMS",
          "nameBn": "বাকি খাতা ও অটো তাগাদা এসএমএস",
          "tooltip": "Complete customer receivables ledger with 1-click due reminder SMS.",
          "starter": "Basic Cash/Due",
          "basic": true,
          "medium": true,
          "high": true
        },
        {
          "name": "Automated Daily Profit & Loss Statement",
          "nameBn": "প্রতিদিনের নিট লাভ ও লোকসান স্টেটমেন্ট",
          "tooltip": "Live calculated profit after deducting COGS and operating expenses.",
          "starter": false,
          "basic": "Standard",
          "medium": "Advanced Real-Time",
          "high": "Full Enterprise ERP"
        },
        {
          "name": "NBR Mushak 6.3 Automated VAT Invoice",
          "nameBn": "এনবিআর অনুমোদিত মূসক ৬.৩ ভ্যাট চালান",
          "tooltip": "Government-compliant Mushak 6.3 tax challans generated automatically.",
          "starter": "Simple VAT %",
          "basic": "Simple VAT %",
          "medium": true,
          "high": true
        },
        {
          "name": "Multi-Bank, MFS & Cash Drawer Audit",
          "nameBn": "ব্যাংক, বিকাশ ও ক্যাশ রিকনসিলিয়েশন",
          "tooltip": "Track separate balances for cash counters, bKash merchant, and bank accounts.",
          "starter": false,
          "basic": true,
          "medium": true,
          "high": true
        },
        {
          "name": "Daily Operating Expenses & Petty Cash Log",
          "nameBn": "দোকানের ভাড়া, বিল ও বিবিধ খরচ হিসাব",
          "tooltip": "Log rent, electricity, tea, staff meals, and miscellaneous shop expenses.",
          "starter": false,
          "basic": true,
          "medium": true,
          "high": true
        }
      ]
    },
    {
      "id": "mobile_ai_support",
      "title": "Mobile Apps, AI & Enterprise Support",
      "icon": "smartphone",
      "features": [
        {
          "name": "Owner's Live Mobile App (Android & iOS)",
          "nameBn": "মালিকের ডেডিকেটেড রিয়েল-টাইম মোবাইল অ্যাপ",
          "tooltip": "Live sales, stock, and profit dashboards on owner's smartphone anywhere.",
          "starter": "Mobile Web",
          "basic": "Android Only",
          "medium": "Android & iOS",
          "high": "Android, iOS & iPad POS"
        },
        {
          "name": "Bangla AI Business Intelligence Copilot",
          "nameBn": "বাংলা এআই বিজনেস অ্যাসিস্ট্যান্ট ও সেলস প্রেডিকশন",
          "tooltip": "Ask questions in conversational Bengali to uncover sales trends and stock insights.",
          "starter": false,
          "basic": false,
          "medium": true,
          "high": true
        },
        {
          "name": "Role-Based Permission & Anti-Theft Audit Trail",
          "nameBn": "স্টাফ রোল পারমিশন ও ফ্রড রোধে অডিট লগ",
          "tooltip": "Lock sensitive screens, discounts, and audit every bill edit/delete history.",
          "starter": false,
          "basic": "Standard",
          "medium": "Granular Roles",
          "high": "Enterprise Complete"
        },
        {
          "name": "Automated Daily Cloud Backup & 99.98% Uptime",
          "nameBn": "স্বয়ংক্রিয় ক্লাউড ব্যাকআপ ও ৯৯.৯৮% আপটাইম",
          "tooltip": "Continuous encrypted database snapshots ensuring zero data loss.",
          "starter": "Weekly",
          "basic": "Daily",
          "medium": "Hourly Real-Time",
          "high": "Continuous Multi-Region"
        },
        {
          "name": "Priority 24/7 WhatsApp & Dedicated Support",
          "nameBn": "২৪/৭ হোয়াটসঅ্যাপ ও ডেডিকেটেড ম্যানেজার",
          "tooltip": "Instant human phone and remote AnyDesk support whenever you need help.",
          "starter": "Office Hours",
          "basic": "Standard",
          "medium": "Priority 24/7",
          "high": "Dedicated Key Account Manager"
        },
        {
          "name": "Custom Invoice Designer (English & Bangla)",
          "nameBn": "কাস্টমাইজড ইনভয়েস ডিজাইন (বাংলা ও ইংরেজি)",
          "tooltip": "Personalize receipts with your shop logo, terms, and custom Bengali typography.",
          "starter": "Standard Slip",
          "basic": true,
          "medium": true,
          "high": true
        }
      ]
    }
  ],
  "whyChooseUs": [
    {
      "icon": "refresh-cw",
      "title": "রিয়েল-টাইম স্টক ও সেলস সিঙ্ক",
      "desc": "দোকানের কাউন্টারে পণ্য বিক্রি হওয়ার সাথে সাথেই ইনভেন্টরি থেকে স্টক কমে যাবে, অ্যাকাউন্টিংয়ে স্বয়ংক্রিয় ভাউচার পোস্ট হবে এবং অনলাইন স্টোরে লাইভ স্টক আপডেট হয়ে যাবে।"
    },
    {
      "icon": "wifi-off",
      "title": "জিরো-ডাউনটাইম অফলাইন POS",
      "desc": "বিদ্যুৎ বা ইন্টারনেট চলে গেলেও আপনার দোকানের বিক্রি বন্ধ হবে না। ইন্টারনেট ছাড়াই দ্রুত বারকোড স্ক্যান, ক্যাশ মেমো তৈরি ও প্রিন্ট করা যাবে; নেট সংযোগ ফিরে এলে সকল ডাটা অটোমেটিক সিঙ্ক হবে।"
    },
    {
      "icon": "map-pin",
      "title": "সম্পূর্ণ দেশীয় ইন্টিগ্রেশন",
      "desc": "বাংলাদেশের ব্যবসার বাস্তব চাহিদামাফিক বিকাশ ও নগদ পেমেন্ট, পাঠাও, স্টিডফাস্ট ও রেডেক্স কুরিয়ার ট্র্যাকিং এবং দেশীয় মুদ্রায় (BDT ৳) স্বয়ংক্রিয় হিসাবের সুবিধা।"
    },
    {
      "icon": "bot",
      "title": "বাংলায় এআই (AI) বিজনেস ইনসাইট",
      "desc": "সহজ বাংলায় প্রশ্ন করেই জেনে নিন ব্যবসার সার্বিক অবস্থা—যেমন: 'আজকের মোট লাভ কত?', 'কার কাছে সবচেয়ে বেশি বকেয়া?'। এক্সেল শিট খোঁজার ঝামেলা ছাড়াই চোখের পলকে সঠিক উত্তর।"
    },
    {
      "icon": "award",
      "title": "সেলস টার্গেট ও কমিশন অটোমেশন",
      "desc": "বিক্রয়কর্মীদের ব্যক্তিগত টার্গেট নির্ধারণ, পারফরম্যান্স ট্র্যাকিং এবং টিয়ার-ভিত্তিক সেলস কমিশন স্বয়ংক্রিয়ভাবে হিসাব হয়ে সরাসরি মাসিক পে-রোলে যুক্ত হবে।"
    },
    {
      "icon": "shield-check",
      "title": "নিজস্ব ব্র্যান্ডের মোবাইল অ্যাপ",
      "desc": "আমাদের Medium ও High প্যাকেজে আপনার নিজস্ব ব্র্যান্ডিংয়ে ডেডিকেটেড Android এবং iOS মোবাইল অ্যাপ অন্তর্ভুক্ত, যা আপনার কাস্টমারদের আধুনিক কেনাকাটার সেরা অভিজ্ঞতা দেবে।"
    }
  ],
  "faqs": [
    {
      "id": "faq-1",
      "category": "pricing",
      "categoryLabel": {
        "en": "Pricing & Plans",
        "bn": "মূল্য ও লাইসেন্স"
      },
      "en": {
        "q": "What is included in the transparent yearly subscription fee? Are there any hidden charges?",
        "a": "Our yearly packages (5,000, 10,000, 15,000, and 30,000 <span class='currency-taka'>&#2547;</span>/year) are 100% transparent with <strong>zero hidden charges</strong> and <strong>0% sales commission</strong>. Every package includes multi-region cloud server hosting, automated hourly encrypted backups, software version updates, and dedicated priority support from our Dhaka office. There are no surprise monthly maintenance bills."
      },
      "bn": {
        "q": "বাৎসরিক ফুল প্যাকেজ ফি-তে কী কী অন্তর্ভুক্ত রয়েছে? কোনো অতিরিক্ত লুকানো চার্জ আছে কি?",
        "a": "আমাদের বাৎসরিক প্যাকেজগুলোতে (৫,০০০, ১০,০০০, ১৫,০০০ এবং ৩০,০০০ <span class='currency-taka'>&#2547;</span>/বছর) কোনো লুকানো চার্জ বা বিক্রয়ের উপর কোনো কমিশন নেই। প্রতিটি প্যাকেজের মধ্যে রয়েছে ক্লাউড হোস্টিং, প্রতি ঘণ্টায় অটোমেটিক ক্লাউড ব্যাকআপ, নিয়মিত সফটওয়্যার আপডেট এবং ঢাকার অফিস থেকে সার্বক্ষণিক টেকনিক্যাল সাপোর্ট। কোনো মাসিক গোপন ফি নেই।"
      }
    },
    {
      "id": "faq-2",
      "category": "pricing",
      "categoryLabel": {
        "en": "Pricing & Plans",
        "bn": "মূল্য ও লাইসেন্স"
      },
      "en": {
        "q": "Can I easily upgrade to a higher package as my business expands to multiple outlets?",
        "a": "Yes, you can upgrade your plan at any time with a single click. All your existing product catalogs, historical sales reports, supplier ledgers, customer credit balances, and accounting data will seamlessly migrate without any downtime or data loss."
      },
      "bn": {
        "q": "ব্যবসা সম্প্রসারিত হলে কি পরবর্তীতে ছোট প্যাকেজ থেকে বড় প্যাকেজে আপগ্রেড করা যাবে?",
        "a": "হ্যাঁ, যেকোনো সময় আপনি খুব সহজে ছোট প্যাকেজ থেকে বড় প্যাকেজে আপগ্রেড করতে পারবেন। আপনার পূর্বের সকল বিক্রয় হিস্ট্রি, স্টক ডাটা, কাস্টমার বাকি-বকেয়া ও অ্যাকাউন্টিং তথ্য সম্পূর্ণ সুরক্ষিত থাকবে এবং কোনো জটিলতা ছাড়াই স্বয়ংক্রিয়ভাবে নতুন প্যাকেজে স্থানান্তরিত হবে।"
      }
    },
    {
      "id": "faq-3",
      "category": "pricing",
      "categoryLabel": {
        "en": "Pricing & Plans",
        "bn": "মূল্য ও লাইসেন্স"
      },
      "en": {
        "q": "Which packages include dedicated Android and iOS mobile apps for our brand?",
        "a": "Our Standard (15,000 <span class='currency-taka'>&#2547;</span>/year) and Premium (30,000 <span class='currency-taka'>&#2547;</span>/year) plans include custom-branded mobile apps for your business. Customers can place online orders directly from your branded app, while business owners can monitor real-time sales, live stock counts, and branch profits from anywhere in the world."
      },
      "bn": {
        "q": "কোন প্যাকেজগুলোতে নিজস্ব ব্র্যান্ডের মোবাইল অ্যাপ (Android ও iOS) পাওয়া যায়?",
        "a": "আমাদের Standard (১৫,০০০ <span class='currency-taka'>&#2547;</span>/বছর) এবং Premium (৩০,০০০ <span class='currency-taka'>&#2547;</span>/বছর) প্যাকেজে আপনার নিজস্ব দোকানের নামে ডেডিকেটেড Android এবং iOS মোবাইল অ্যাপ অন্তর্ভুক্ত রয়েছে। এর মাধ্যমে কাস্টমাররা সরাসরি অ্যাপ থেকে পণ্য অর্ডার করতে পারবেন এবং আপনি যেকোনো স্থান থেকে মোবাইলেই ব্যবসার লাইভ সেলস ও স্টক রিপোর্ট দেখতে পারবেন।"
      }
    },
    {
      "id": "faq-4",
      "category": "hardware",
      "categoryLabel": {
        "en": "Offline POS & Hardware",
        "bn": "অফলাইন পিওএস ও হার্ডওয়্যার"
      },
      "en": {
        "q": "How does the offline POS engine work when broadband Wi-Fi or electricity drops?",
        "a": "YES SME utilizes an advanced local client-side database cache. When your internet connection drops, the POS automatically switches to offline mode instantly. Your cashiers can continue rapid barcode scanning, invoice generation, cash tendering, and thermal receipt printing without interruption. As soon as connection returns, all offline transactions auto-sync to the central cloud without duplicate bill risk."
      },
      "bn": {
        "q": "ইন্টারনেট সংযোগ না থাকলে বা বিদ্যুৎ চলে গেলে অফলাইন POS কীভাবে কাজ করে?",
        "a": "আমাদের অফলাইন POS সিস্টেমে আপনার সকল পণ্যের তালিকা, স্টক মূল্য এবং বারকোড ব্রাউজারে বা লোকাল ডিভাইসে সংরক্ষিত থাকে। ফলে ইন্টারনেট সংযোগ বিচ্ছিন্ন হলেও আপনি স্বাভাবিকভাবে দ্রুত বারকোড স্ক্যান, ক্যাশ মেমো তৈরি, নগদ বিক্রি এবং থার্মাল রসিদ প্রিন্ট করতে পারবেন। পরবর্তীতে ইন্টারনেট সংযোগ ফিরে এলে সকল অফলাইন বিক্রয়ের ডাটা কোনো গড়মিল ছাড়াই স্বয়ংক্রিয়ভাবে মূল ক্লাউড ডাটাবেজে যুক্ত (Sync) হয়ে যাবে।"
      }
    },
    {
      "id": "faq-mpos",
      "category": "hardware",
      "categoryLabel": {
        "en": "Offline POS & Hardware",
        "bn": "অফলাইন পিওএস ও হার্ডওয়্যার"
      },
      "en": {
        "q": "If we do not have a computer or laptop, how can we use the POS system in our shop?",
        "a": "You do not need a computer or laptop at all! YES SME comes with full Mobile POS (mPOS) support on any Android or iOS smartphone. Our mPOS can scan barcodes directly using your phone's built-in camera or wireless Bluetooth scanner, print receipts via mini Bluetooth thermal printers, calculate Mushak 6.3 VAT, accept split MFS (bKash/Nagad) payments, and operate 100% offline without internet. It functions as a complete, full-fledged enterprise POS terminal straight from your pocket!"
      },
      "bn": {
        "q": "আমাদের দোকানে কম্পিউটার বা ল্যাপটপ না থাকলে কীভাবে পিওএস (POS) সফটওয়্যার ব্যবহার করব?",
        "a": "দোকানে কোনো কম্পিউটার বা ল্যাপটপের প্রয়োজন নেই! YES SME-তে রয়েছে স্বয়ংসম্পূর্ণ মোবাইল পিওএস (mPOS) সাপোর্ট, যা যেকোনো অ্যান্ড্রয়েড স্মার্টফোন বা আইফোনে অনায়াসেই ব্যবহার করা যায়। আমাদের মোবাইল পিওএস দিয়ে ফোনের নিজস্ব ক্যামেরা বা ব্লুটুথ স্ক্যানার দিয়ে সরাসরি বারকোড স্ক্যান করা যায়, ব্লুটুথ থার্মাল প্রিন্টারে রসিদ প্রিন্ট হয়, মূসক ৬.৩ ভ্যাট হিসাব ও বিকাশ/নগদ পেমেন্ট নেওয়া যায় এবং নেট ছাড়াই ১০০% অফলাইনে বিলিং করা যায়। একটি সাধারণ স্মার্টফোন দিয়েই আপনি সম্পূর্ণ পিওএস মেশিনের যাবতীয় কাজ পরিচালনা করতে পারবেন।"
      }
    },
    {
      "id": "faq-5",
      "category": "hardware",
      "categoryLabel": {
        "en": "Offline POS & Hardware",
        "bn": "অফলাইন পিওএস ও হার্ডওয়্যার"
      },
      "en": {
        "q": "Will YES SME work with our existing thermal receipt printers, barcode scanners, and cash drawers?",
        "a": "Yes! YES SME is universally compatible with standard 58mm and 80mm thermal receipt printers (including Epson, Xprinter, Rongta, Posiflex, Bixolon, Sunmi), USB and wireless 1D/2D QR barcode scanners, and electronic RJ11 cash drawers. No expensive proprietary hardware is locked in."
      },
      "bn": {
        "q": "আমাদের দোকানে ইতিমধ্যে ব্যবহৃত থার্মাল প্রিন্টার, বারকোড স্ক্যানার ও ক্যাশ ড্রয়ার কি ব্যবহার করা যাবে?",
        "a": "অবশ্যই! বাজারে প্রচলিত যেকোনো সাধারণ ৫৮ মিমি ও ৮০ মিমি থার্মাল রিসিট প্রিন্টার (Epson, Xprinter, Rongta, Posiflex, Sunmi), ইউএসবি ও ওয়্যারলেস বারকোড স্ক্যানার এবং অটোমেটিক ক্যাশ ড্রয়ারের সাথে YES SME শতভাগ সামঞ্জস্যপূর্ণ। বাড়তি কোনো দামি ডিভাইস কেনার বাধ্যবাধকতা নেই।"
      }
    },
    {
      "id": "faq-6",
      "category": "hardware",
      "categoryLabel": {
        "en": "Offline POS & Hardware",
        "bn": "অফলাইন পিওএস ও হার্ডওয়্যার"
      },
      "en": {
        "q": "How do bKash, Nagad, and courier services (Pathao, Steadfast, RedX) integrate with the software?",
        "a": "Our system features automated QR code generation for bKash and Nagad merchant payments directly on your POS screen and printed receipt. For e-commerce and retail deliveries, direct API integration with Pathao, Steadfast, and RedX enables 1-click parcel booking, shipping label printing, live tracking, and Cash-on-Delivery (COD) reconciliation."
      },
      "bn": {
        "q": "বিকাশ, নগদ এবং কুরিয়ার সার্ভিস (পাঠাও, স্টিডফাস্ট ইত্যাদি) কীভাবে সফটওয়্যারের সাথে কাজ করে?",
        "a": "সফটওয়্যারের পিওএস স্ক্রিন ও প্রিন্টেড ক্যাশ মেমোতে অটোমেটিক বিকাশ ও নগদ মার্চেন্ট কিউআর কোড জেনারেট হয়। এছাড়া পাঠাও, স্টিডফাস্ট ও রেডেক্স (REDX) কুরিয়ারের সাথে সরাসরি অটোমেটিক ইন্টিগ্রেশন থাকায় আপনি এক ক্লিকেই পার্সেল এন্ট্রি, শিপিং লেবেল প্রিন্ট এবং ক্যাশ-অন-ডেলিভারি (COD) পেমেন্ট রিকনসিলিয়েশন করতে পারবেন।"
      }
    },
    {
      "id": "faq-7",
      "category": "security",
      "categoryLabel": {
        "en": "Security & Cloud Backup",
        "bn": "ডেটা নিরাপত্তা ও ব্যাকআপ"
      },
      "en": {
        "q": "How secure is our business financial data, supplier costs, and customer information?",
        "a": "We adhere to enterprise security protocols. All data transmissions are protected by 256-bit SSL encryption. Database records are stored in multi-region Google Cloud and AWS tier-4 data centers with automated hourly snapshots. Even if your store computer crashes or is stolen, your business accounts remain 100% safe and recoverable in seconds."
      },
      "bn": {
        "q": "আমাদের প্রতিষ্ঠানের আর্থিক হিসাব, গোপনীয় ক্রয়মূল্য ও কাস্টমারদের তথ্য কতটা নিরাপদ?",
        "a": "আমরা আন্তর্জাতিক ব্যাংক-মানের সিকিউরিটি প্রোটোকল মেনে চলি। সকল ডাটা ২৫৬-বিট এসএসএল এনক্রিপশনের মাধ্যমে সংরক্ষিত থাকে এবং গুগল ক্লাউড ও এডব্লিউএস টিয়ার-৪ ডেটাসেন্টারে প্রতি ঘণ্টায় স্বয়ংক্রিয় ক্লাউড স্ন্যাপশট ব্যাকআপ হয়। আপনার দোকানের কম্পিউটার নষ্ট বা চুরি হলেও এক মিনিটের মধ্যে অন্য ডিভাইস থেকে সম্পূর্ণ হিসাব পুনরুদ্ধার সম্ভব।"
      }
    },
    {
      "id": "faq-8",
      "category": "security",
      "categoryLabel": {
        "en": "Security & Cloud Backup",
        "bn": "ডেটা নিরাপত্তা ও ব্যাকআপ"
      },
      "en": {
        "q": "Can sales staff or cashiers manipulate accounts, delete invoices, or steal inventory?",
        "a": "No. YES SME enforces strict Role-Based Access Control (RBAC). Cashiers have restricted access: they cannot delete sales invoices, change selling prices, view wholesale purchase costs, or edit inventory counts. Any discount, return, or invoice void requires the Owner/Manager's secure OTP authorization with an irreversible audit log."
      },
      "bn": {
        "q": "ক্যাশিয়ার বা কর্মচারীরা কি হিসাবের গড়মিল করতে, বিল মুছতে বা স্টক চুরি করতে পারবে?",
        "a": "একদমই না। YES SME-তে রয়েছে অত্যন্ত কঠোর ইউজার রোল পারমিশন সিস্টেম। ক্যাশিয়াররা কেবল বিল করতে পারবে; তারা কোনো পণ্যের ক্রয়মূল্য দেখতে, স্টক এডিট করতে বা কোনো বিল ডিলিট করতে পারবে না। প্রতিটি ডিসকাউন্ট বা বিল বাতিলের জন্য মালিকের ওটিপি পারমিশন বাধ্যতামূলক এবং প্রতিটি অ্যাকশনের নিখুঁত অডিট লগ সংরক্ষিত থাকে।"
      }
    },
    {
      "id": "faq-9",
      "category": "setup",
      "categoryLabel": {
        "en": "Setup & Migration",
        "bn": "সেটআপ ও সহায়তা"
      },
      "en": {
        "q": "Can we migrate our existing product catalog and opening stock from Excel spreadsheets?",
        "a": "Yes! YES SME includes a built-in Smart Excel Import Wizard. You can upload thousands of products, barcodes, variations (sizes/colors), supplier details, and opening inventory balances within 5 minutes. We also provide a ready-made Excel template to make migration painless."
      },
      "bn": {
        "q": "আমাদের এক্সেল শিট থেকে কয়েক হাজার পণ্যের তালিকা কি সহজে সফটওয়্যারে ইমপোর্ট করা যাবে?",
        "a": "হ্যাঁ! YES SME-তে রয়েছে স্মার্ট এক্সেল ইমপোর্ট টুল। মাত্র ৫ মিনিটে আপনি হাজার হাজার পণ্যের নাম, বারকোড, সাইজ/রং ভ্যারিয়েশন এবং ওপেনিং স্টক এক ক্লিকেই আপলোড করতে পারবেন। এছাড়া আমাদের রেডিমেড এক্সেল টেমপ্লেট রয়েছে যা আপনার ডেটা স্থানান্তরকে অত্যন্ত সহজ করে তুলবে।"
      }
    },
    {
      "id": "faq-10",
      "category": "setup",
      "categoryLabel": {
        "en": "Setup & Migration",
        "bn": "সেটআপ ও সহায়তা"
      },
      "en": {
        "q": "Do you provide staff onboarding training and on-site support in Dhaka?",
        "a": "Yes, absolutely! We conduct <strong>regular live online training classes scheduled at your team's convenience, and we continue these training sessions until your entire team has fully learned and mastered the software</strong> (at no extra charge). Furthermore, our dedicated engineering and onboarding team is physically based at Nikunja 2, Khilkhet, Dhaka. Having successfully onboarded <strong>200+ growing retail, pharmacy, fashion, and wholesale businesses across Bangladesh</strong>, we provide hands-on staff training, POS printer and barcode setup, 6-days-a-week priority telephone assistance via direct hotline (01955345331), and instant VIP WhatsApp group support."
      },
      "bn": {
        "q": "আমাদের সেলস টিমকে কি প্রশিক্ষণ দেওয়া হবে এবং ঢাকার অফিস থেকে কীভাবে সহায়তা পাব?",
        "a": "হ্যাঁ, অবশ্যই! আমরা আপনার ও আপনার টিমের সুবিধাজনক সময় অনুযায়ী <strong>অনলাইনে নিয়মিত লাইভ ট্রেনিং ক্লাস করাই এবং যতদিন না আপনারা সফটওয়্যারটি সম্পূর্ণভাবে শিখে নিচ্ছেন, ততদিন পর্যন্ত এই ক্লাস ও সাপোর্ট অব্যাহত থাকে</strong> (কোনো বাড়তি চার্জ ছাড়াই)। এছাড়া আমাদের নিজস্ব ইঞ্জিনিয়ারিং ও অনবোর্ডিং টিম ঢাকার নিকুঞ্জ ২-এ অবস্থিত। ইতোমধ্যে <strong>দেশব্যাপী ২০০+ সফল রিটেল, ফার্মেসি, ফ্যাশন ও হোলসেল ব্যবসায়ে</strong> সফলভাবে সিস্টেম চালু করার অভিজ্ঞতা নিয়ে আমরা আপনার সেলস ও অ্যাকাউন্টস টিমকে সরাসরি হাতে-কলমে প্রশিক্ষণ প্রদান করি, পিওএস প্রিন্টার ও বারকোড সেটআপ করে দিই এবং সপ্তাহে ৬ দিন সরাসরি ফোন হটলাইন (০১৯৫৫৩৪৫৩৩১) ও ডেডিকেটেড ভিআইপি হোয়াটসঅ্যাপ গ্রুপে সার্বক্ষণিক সহায়তা প্রদান করি।"
      }
    }
  ]
};

if (typeof window !== 'undefined') {
  window.PRICING_DATA = PRICING_DATA;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = PRICING_DATA;
}
