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
      "id": "product_ecommerce",
      "title": "Product & E-commerce",
      "icon": "shopping-bag",
      "features": [
        {
          "name": "Product Capacity",
          "tooltip": "Total number of active products allowed in the catalog.",
          "starter": "200 Products",
          "basic": "250 Products",
          "medium": "350 Products",
          "high": "Unlimited",
          "nameBn": "প্রোডাক্ট সংখ্যা ধারণক্ষমতা"
        },
        {
          "name": "Product Variants (Size, Color, Weight)",
          "tooltip": "Manage variant-level SKU, barcodes, pricing, and stock.",
          "starter": true,
          "basic": true,
          "medium": true,
          "high": true,
          "nameBn": "প্রোডাক্ট ভ্যারিয়েন্ট (সাইজ, রঙ, ওজন)"
        },
        {
          "name": "Automatic Barcode Generation & Printing",
          "tooltip": "Generate Code-128 / EAN barcodes and print thermal sticker labels.",
          "starter": false,
          "basic": true,
          "medium": true,
          "high": true,
          "nameBn": "স্বয়ংক্রিয় বারকোড তৈরি ও স্টিকার প্রিন্টিং"
        },
        {
          "name": "Bulk Excel / CSV Product Import & Export",
          "tooltip": "Upload hundreds of items at once with batch price update.",
          "starter": false,
          "basic": true,
          "medium": true,
          "high": true,
          "nameBn": "একসাথে এক্সেল / সিএসভি দিয়ে প্রোডাক্ট ইমপোর্ট-এক্সপোর্ট"
        },
        {
          "name": "Integrated E-commerce Web Storefront",
          "tooltip": "Full responsive online shop directly connected to your ERP inventory.",
          "starter": false,
          "basic": true,
          "medium": true,
          "high": true,
          "nameBn": "কানেক্টেড ফ্রি ই-কমার্স অনলাইন শপ"
        },
        {
          "name": "E-commerce Website Themes & Custom Branding",
          "tooltip": "Custom logo, hero banners, brand colors, and promotional sections.",
          "starter": false,
          "basic": false,
          "medium": true,
          "high": true,
          "nameBn": "ওয়েবসাইট থিম কাস্টমাইজেশন ও ব্র্যান্ডিং"
        },
        {
          "name": "Customer Reviews, Wishlist & Order Tracking",
          "tooltip": "Engage online buyers with live delivery status and reviews.",
          "starter": false,
          "basic": false,
          "medium": true,
          "high": true,
          "nameBn": "কাস্টমার রিভিউ, উইশলিস্ট ও লাইভ অর্ডার ট্র্যাকিং"
        }
      ]
    },
    {
      "id": "pos_sales",
      "title": "POS & Sales Operations",
      "icon": "terminal",
      "features": [
        {
          "name": "Mobile POS (mPOS) with Phone Camera Barcode Scanner",
          "nameBn": "মোবাইল পিওএস (mPOS) ও স্মার্টফোন ক্যামেরা বারকোড স্ক্যানার",
          "description": "Operate a complete POS terminal straight from your Android/iOS smartphone without buying a computer or hardware scanner.",
          "descriptionBn": "কোনো কম্পিউটার বা দামি স্ক্যানার ছাড়াই সাধারণ স্মার্টফোন থেকে সম্পূর্ণ পিওএস বিলিং ও ক্যামেরা দিয়ে বারকোড স্ক্যানিং।",
          "values": {
            "starter": true,
            "basic": true,
            "medium": true,
            "high": true
          },
          "starter": false,
          "basic": true,
          "medium": true,
          "high": true
        },
        {
          "name": "Smart POS Billing System",
          "tooltip": "Quick barcode scanning, search by SKU/name, touchscreen cart.",
          "starter": false,
          "basic": true,
          "medium": true,
          "high": true,
          "nameBn": "স্মার্ট পিওএস ক্যাশ কাউন্টার বিলিং"
        },
        {
          "name": "Thermal Receipt (58mm/80mm) & A4 Invoices",
          "tooltip": "Print on standard thermal roll printers or full A4 vouchers.",
          "starter": false,
          "basic": true,
          "medium": true,
          "high": true,
          "nameBn": "থার্মাল রসিদ (৫৮/৮০ মিমি) ও এ৪ চালান প্রিন্ট"
        },
        {
          "name": "Offline POS with Automatic Sync",
          "tooltip": "Record sales without internet connectivity; automatically synchronizes when connection returns.",
          "starter": false,
          "basic": true,
          "medium": true,
          "high": true,
          "nameBn": "ইন্টারনেট ছাড়া অফলাইন ক্যাশ মেমো ও অটো সিঙ্ক"
        },
        {
          "name": "Multiple Payment Split (Cash, bKash, Nagad, Card, Due)",
          "tooltip": "Accept split payments on a single invoice (e.g. 50% Cash + 50% bKash).",
          "starter": "Basic Cash/Due",
          "basic": true,
          "medium": true,
          "high": true,
          "nameBn": "মাল্টিপল স্প্লিট পেমেন্ট (নগদ, বিকাশ, নগদ, কার্ড ও বাকি)"
        },
        {
          "name": "Sales Return & Exchange Management",
          "tooltip": "Effortlessly process customer returns, refunds, or replacement items.",
          "starter": false,
          "basic": true,
          "medium": true,
          "high": true,
          "nameBn": "বিক্রিত পণ্য ফেরত ও সহজ এক্সচেঞ্জ ম্যানেজমেন্ট"
        },
        {
          "name": "Hold & Resume Invoices / Draft Sales",
          "tooltip": "Save pending carts during peak counter rushes and retrieve anytime.",
          "starter": false,
          "basic": true,
          "medium": true,
          "high": true,
          "nameBn": "চলমান বিল হোল্ড ও ড্রাফট চালান রিকভারি"
        },
        {
          "name": "Cashier Shift & Cash Register Closing",
          "tooltip": "Track opening cash, expected cash vs actual cash, shortage reports.",
          "starter": false,
          "basic": true,
          "medium": true,
          "high": true,
          "nameBn": "ক্যাশিয়ার শিফট ক্লোজিং ও ক্যাশ ড্রয়ার অডিট"
        },
        {
          "name": "Installment (কিস্তি) Sales Tracking",
          "tooltip": "Scheduled installment due dates, down-payment, and payment reminders.",
          "starter": false,
          "basic": false,
          "medium": true,
          "high": true,
          "nameBn": "কিস্তি (EMI) বিক্রয় ও পেমেন্ট শিডিউল ট্র্যাকিং"
        }
      ]
    },
    {
      "id": "inventory_warehousing",
      "title": "Inventory & Warehousing",
      "icon": "archive",
      "features": [
        {
          "name": "Real-time Stock Tracking",
          "tooltip": "Stock balance updates immediately after each sale, purchase, or return.",
          "starter": true,
          "basic": true,
          "medium": true,
          "high": true,
          "nameBn": "রিয়েল-টাইম লাইভ ইনভেন্টরি স্টক ট্র্যাকিং"
        },
        {
          "name": "Low-Stock & Out-of-Stock Alerts",
          "tooltip": "Automated notifications when inventory drops below reorder thresholds.",
          "starter": true,
          "basic": true,
          "medium": true,
          "high": true,
          "nameBn": "স্টক শেষ হওয়ার আগেই স্বয়ংক্রিয় সতর্কতা (Low Stock)"
        },
        {
          "name": "Stock Adjustment & Opening Balance",
          "tooltip": "Manually adjust stock counts or set initial inventory balances.",
          "starter": true,
          "basic": true,
          "medium": true,
          "high": true,
          "nameBn": "স্টক সমন্বয় ও প্রারম্ভিক স্টক ব্যালেন্স এন্ট্রি"
        },
        {
          "name": "Multi-Warehouse Management",
          "tooltip": "Manage separate physical warehouses with dedicated stock levels.",
          "starter": false,
          "basic": false,
          "medium": true,
          "high": true,
          "nameBn": "একাধিক কেন্দ্রীয় গুদাম ও গোডাউন পরিচালনা"
        },
        {
          "name": "Inter-Warehouse Stock Transfer & In-Transit Tracking",
          "tooltip": "Dispatch and receive stock across godowns with approval workflows.",
          "starter": false,
          "basic": false,
          "medium": true,
          "high": true,
          "nameBn": "শাখা থেকে শাখায় স্টক স্থানান্তর চালান ও গেট পাস"
        },
        {
          "name": "Batch, Lot & Expiry Date Tracking",
          "tooltip": "Essential for medicine, cosmetics, and perishable packaged foods.",
          "starter": false,
          "basic": false,
          "medium": "To Be Confirmed",
          "high": true,
          "nameBn": "ব্যাচ নম্বর, লট ও মেয়াদোত্তীর্ণ তারিখ ট্র্যাকিং"
        },
        {
          "name": "Serial Number & Warranty Management",
          "tooltip": "Track unique serial numbers for electronics and track warranty periods.",
          "starter": false,
          "basic": false,
          "medium": true,
          "high": true,
          "nameBn": "সিরিয়াল নম্বর / আইএমইআই ও অফিসিয়াল ওয়ারেন্টি সনদ"
        },
        {
          "name": "Dead Stock & Slow-Moving Stock Analysis",
          "tooltip": "Identify non-performing inventory to prevent locked capital.",
          "starter": false,
          "basic": false,
          "medium": true,
          "high": true,
          "nameBn": "অবিক্রিত ও ধীরগতির পণ্য বিশ্লেষণ (Dead Stock)"
        }
      ]
    },
    {
      "id": "purchasing_suppliers",
      "title": "Purchasing & Suppliers",
      "icon": "truck",
      "features": [
        {
          "name": "Supplier Profiles & Contact Database",
          "tooltip": "Maintain complete vendor details and opening balances.",
          "starter": true,
          "basic": true,
          "medium": true,
          "high": true,
          "nameBn": "সরবরাহকারী প্রোফাইল ও মহাজন কন্টাক্ট ডিরেক্টরি"
        },
        {
          "name": "Purchase Orders & Goods Receiving Notes (GRN)",
          "tooltip": "Formal PO creation, partial and full receiving against orders.",
          "starter": true,
          "basic": true,
          "medium": true,
          "high": true,
          "nameBn": "ক্রয়াদেশ (PO) ও পণ্য গ্রহণ চালান (GRN)"
        },
        {
          "name": "Supplier Payable & Due Ledger",
          "tooltip": "Track outstanding supplier invoices, advance payments, and payment vouchers.",
          "starter": true,
          "basic": true,
          "medium": true,
          "high": true,
          "nameBn": "মহাজন বাকি খাতা ও প্রদেয় বিলের হিসাব"
        },
        {
          "name": "Purchase Return & Cancellation Workflow",
          "tooltip": "Process damaged goods returns and debit notes to suppliers.",
          "starter": true,
          "basic": true,
          "medium": true,
          "high": true,
          "nameBn": "ক্রয়কৃত পণ্য ফেরত ও মহাজন ক্রেডিট নোট"
        },
        {
          "name": "Purchase Cost History & Price Fluctuations",
          "tooltip": "Monitor vendor price adjustments and automatic product cost updates.",
          "starter": true,
          "basic": true,
          "medium": true,
          "high": true,
          "nameBn": "পণ্য ক্রয়ের পূর্ব ইতিহাস ও বাজারদর যাচাই"
        }
      ]
    },
    {
      "id": "accounting_finance",
      "title": "Accounting & Finance",
      "icon": "dollar-sign",
      "features": [
        {
          "name": "Cash Book & Daily Expense Tracker",
          "tooltip": "Record daily operational expenses and petty cash movements.",
          "starter": "Basic Notes",
          "basic": true,
          "medium": true,
          "high": true,
          "nameBn": "দৈনিক ক্যাশবুক ও দোকান খরচের হিসাব"
        },
        {
          "name": "Bank Accounts & MFS (bKash/Nagad) Ledger",
          "tooltip": "Manage multiple bank and mobile money accounts in one view.",
          "starter": true,
          "basic": true,
          "medium": true,
          "high": true,
          "nameBn": "ব্যাংক হিসাব ও বিকাশ/নগদ মার্চেন্ট লেজার"
        },
        {
          "name": "Full Double-Entry Accounting Engine",
          "tooltip": "Chart of accounts, general ledger, journal vouchers, and contra entries.",
          "starter": false,
          "basic": false,
          "medium": true,
          "high": true,
          "nameBn": "পূর্ণাঙ্গ ডাবল-এন্ট্রি একাউন্টিং ও জার্নাল ভাউচার"
        },
        {
          "name": "Automated Financial Statements (P&L, Balance Sheet, Cash Flow)",
          "tooltip": "Generate real-time Profit & Loss and Balance Sheets without manual bookkeeping.",
          "starter": false,
          "basic": "Standard Summary",
          "medium": true,
          "high": true,
          "nameBn": "স্বয়ংক্রিয় লাভ-ক্ষতি (P&L), ব্যালেন্স শিট ও ক্যাশ-ফ্লো"
        },
        {
          "name": "Bangladesh VAT Configuration & Mushak Reports",
          "tooltip": "NBR-aligned VAT calculations, sales/purchase VAT ledgers, and audit files.",
          "starter": "Simple VAT %",
          "basic": true,
          "medium": true,
          "high": true,
          "nameBn": "বাংলাদেশ মূসক ভ্যাট ও অফিসিয়াল মূসক ৬.৩ চালান"
        },
        {
          "name": "Fixed Assets & Depreciation Tracking",
          "tooltip": "Record company assets, schedules, and asset write-offs.",
          "starter": false,
          "basic": false,
          "medium": true,
          "high": true,
          "nameBn": "স্থায়ী সম্পদ ও বার্ষিক অবচয় (Depreciation) হিসাব"
        }
      ]
    },
    {
      "id": "courier_logistics",
      "title": "Courier & Logistics",
      "icon": "send",
      "features": [
        {
          "name": "Direct Pathao Courier Booking & API",
          "tooltip": "Book parcels directly from the order list and print consignment labels. Basic plan includes choice of 1 courier (Pathao or Steadfast).",
          "starter": false,
          "basic": "1 Courier (Pathao/Steadfast)",
          "medium": true,
          "high": true,
          "nameBn": "পাঠাও কুরিয়ার সরাসরি ১-ক্লিক পার্সেল বুকিং"
        },
        {
          "name": "Steadfast Courier Booking & API",
          "tooltip": "Direct API booking, pickup requests, and automated parcel status sync. Basic plan includes choice of 1 courier (Pathao or Steadfast).",
          "starter": false,
          "basic": "1 Courier (Pathao/Steadfast)",
          "medium": true,
          "high": true,
          "nameBn": "স্টিডফাস্ট কুরিয়ার অটো বুকিং ও এপিআই সিঙ্ক"
        },
        {
          "name": "REDX & Multi-Courier Simultaneous Dispatch",
          "tooltip": "Dispatch through multiple delivery partners concurrently across different branches or zones.",
          "starter": false,
          "basic": false,
          "medium": true,
          "high": true,
          "nameBn": "রেডএক্স ও অন্যান্য কুরিয়ারে একসাথে বুকিং"
        },
        {
          "name": "Courier COD Collection & Settlement Reconciliation",
          "tooltip": "Reconcile received cash-on-delivery against courier remittance statements.",
          "starter": false,
          "basic": true,
          "medium": true,
          "high": true,
          "nameBn": "কুরিয়ার সিওডি (COD) কালেকশন ও ব্যাংক টাকা মিল"
        },
        {
          "name": "Automated Shipping Label & Invoice Generation",
          "tooltip": "Bulk thermal label printing with barcoded consignment numbers.",
          "starter": false,
          "basic": false,
          "medium": true,
          "high": true,
          "nameBn": "স্বয়ংক্রিয় থার্মাল শিপিং স্টিকার ও প্যাকিং স্লিপ"
        },
        {
          "name": "Courier Fraud / Delivery Risk Assessment",
          "tooltip": "Analyze customer return rate history before accepting orders to minimize delivery failure costs.",
          "starter": false,
          "basic": true,
          "medium": true,
          "high": true,
          "nameBn": "কুরিয়ার রিটার্ন ও ফ্রড রিস্ক প্রিডিকশন"
        }
      ]
    },
    {
      "id": "crm_loyalty",
      "title": "CRM & Customer Loyalty",
      "icon": "heart",
      "features": [
        {
          "name": "Customer Profiles & Purchase History",
          "tooltip": "Maintain complete customer records, addresses, and order records.",
          "starter": true,
          "basic": true,
          "medium": true,
          "high": true,
          "nameBn": "গ্রাহক প্রোফাইল ও পূর্ববর্তী ক্রয়ের সম্পূর্ণ হিস্ট্রি"
        },
        {
          "name": "Customer Due Tracking & Credit Limit Alerts",
          "tooltip": "Set maximum credit caps and monitor overdue receivable aging.",
          "starter": "Basic Due",
          "basic": true,
          "medium": true,
          "high": true,
          "nameBn": "গ্রাহক বাকি খাতা ও স্বয়ংক্রিয় ক্রেডিট লিমিট লক"
        },
        {
          "name": "Due Reminder SMS Notification",
          "tooltip": "Send automated SMS reminders for pending customer balances.",
          "starter": true,
          "basic": true,
          "medium": true,
          "high": true,
          "nameBn": "বাকি টাকার তাগাদায় স্বয়ংক্রিয় বাংলা এসএমএস"
        },
        {
          "name": "Digital Loyalty Card & QR Code Membership",
          "tooltip": "Customer membership cards with unique QR/barcode for scan-to-identify.",
          "starter": false,
          "basic": false,
          "medium": true,
          "high": true,
          "nameBn": "ডিজিটাল লয়ালটি কার্ড ও কিউআর কোড মেম্বারশিপ"
        },
        {
          "name": "Loyalty Points Engine & Tiered Membership",
          "tooltip": "Reward points per ৳100 spent; Silver, Gold, Platinum VIP tiers.",
          "starter": false,
          "basic": false,
          "medium": true,
          "high": true,
          "nameBn": "লয়ালটি পয়েন্ট আর্নিং, রিডিম ও ভিআইপি স্তর"
        },
        {
          "name": "Customer Segmentation (Retail, Wholesale, VIP)",
          "tooltip": "Group customers for personalized marketing and custom price tiers.",
          "starter": false,
          "basic": true,
          "medium": true,
          "high": true,
          "nameBn": "গ্রাহক ক্যাটাগরি (খুচরা, পাইকারি, ভিআইপি বা কর্পোরেট)"
        }
      ]
    },
    {
      "id": "mobile_applications",
      "title": "Mobile Applications",
      "icon": "smartphone",
      "features": [
        {
          "name": "Mobile-Responsive Admin Web Panel",
          "tooltip": "Optimized dashboard accessible on any mobile or tablet browser.",
          "starter": true,
          "basic": true,
          "medium": true,
          "high": true,
          "nameBn": "মোবাইল-ফ্রেন্ডলি রেসপনসিভ অ্যাডমিন প্যানেল"
        },
        {
          "name": "Dedicated Mobile Apps (Android & iOS)",
          "tooltip": "Dedicated branded native/hybrid mobile apps published on Play Store & App Store.",
          "starter": false,
          "basic": false,
          "medium": true,
          "high": true,
          "nameBn": "কাস্টম ব্র্যান্ডেড মোবাইল অ্যাপস (Android ও iOS)"
        },
        {
          "name": "PWA (Progressive Web App) Installable Support",
          "tooltip": "Install app icon on desktop and phone home screens directly from browser.",
          "starter": true,
          "basic": true,
          "medium": true,
          "high": true,
          "nameBn": "ইনস্টলযোগ্য প্রগ্রেসিভ ওয়েব অ্যাপ (PWA) সমর্থন"
        }
      ]
    },
    {
      "id": "hr_payroll",
      "title": "HR, Employees & Payroll",
      "icon": "users",
      "features": [
        {
          "name": "Employee Profiles & Role Assignments",
          "tooltip": "Designate cashiers, managers, and salesmen to specific branches.",
          "starter": false,
          "basic": true,
          "medium": true,
          "high": true,
          "nameBn": "কর্মচারী প্রোফাইল ও দায়িত্বভিত্তিক রোল পারমিশন"
        },
        {
          "name": "Employee-wise Sales Performance Tracking",
          "tooltip": "Track which salesperson generated each invoice, volume, and gross profit.",
          "starter": false,
          "basic": true,
          "medium": true,
          "high": true,
          "nameBn": "কর্মীবান্ধব সেলস টার্গেট ও বিক্রয় পারফরম্যান্স"
        },
        {
          "name": "Sales Targets, Leaderboards & Commissions",
          "tooltip": "Define individual or branch sales targets and percentage commissions.",
          "starter": false,
          "basic": false,
          "medium": true,
          "high": true,
          "nameBn": "বিক্রয় কমিশন ও লিডারবোর্ড হিসাব"
        },
        {
          "name": "Automated Monthly Payroll & Salary Sheets",
          "tooltip": "Calculate base pay, overtime, commissions, bonus, and deductions.",
          "starter": false,
          "basic": false,
          "medium": "To Be Confirmed",
          "high": true,
          "nameBn": "স্বয়ংক্রিয় মাসিক বেতন শিট ও পে-স্লিপ তৈরি"
        },
        {
          "name": "Attendance & Leave Management Calendar",
          "tooltip": "Check-in/out logging, paid/unpaid leaves, and holiday calendars.",
          "starter": false,
          "basic": false,
          "medium": false,
          "high": true,
          "nameBn": "দৈনিক বায়োমেট্রিক হাজিরা ও ছুটির ক্যালেন্ডার"
        }
      ]
    },
    {
      "id": "ai_automation",
      "title": "AI & Business Intelligence",
      "icon": "cpu",
      "features": [
        {
          "name": "AI-Powered Sales Reporting",
          "tooltip": "Smart sales analytics and instant summary generation.",
          "starter": true,
          "basic": true,
          "medium": true,
          "high": true,
          "nameBn": "এআই চালিত দৈনিক বিক্রয় অ্যানালিটিক্স"
        },
        {
          "name": "Bilingual AI Business Assistant (Bangla & English)",
          "tooltip": "Ask questions in conversational Bangla (আজ কত টাকার বিক্রি হয়েছে?) and get live data.",
          "starter": false,
          "basic": false,
          "medium": true,
          "high": true,
          "nameBn": "বাংলা ও ইংরেজিতে দ্বৈতভাষিক এআই কোপাইলট"
        },
        {
          "name": "AI Stock & Reorder Recommendations",
          "tooltip": "AI detects fast/slow-moving goods and predicts reorder requirements.",
          "starter": false,
          "basic": false,
          "medium": true,
          "high": true,
          "nameBn": "এআই স্টক ও পণ্য কেনার ভবিষ্যৎ পূর্বাভাস"
        },
        {
          "name": "AI Shopping Assistant Bot for E-commerce Store",
          "tooltip": "Interactive conversational bot on your web store to assist customers and close sales.",
          "starter": false,
          "basic": true,
          "medium": true,
          "high": true,
          "nameBn": "ই-কমার্স ওয়েবসাইটের জন্য এআই শপিং চ্যাটবট"
        },
        {
          "name": "Meta Ads (Facebook/Instagram) Automation & AI Copy",
          "tooltip": "Automated ad campaign creation, AI headlines, copy variations, and competitor ad library research.",
          "starter": false,
          "basic": false,
          "medium": false,
          "high": true,
          "nameBn": "মেটা ও ফেসবুক বিজ্ঞাপনের অটোমেশন এবং এআই কপি"
        }
      ]
    },
    {
      "id": "multi_branch",
      "title": "Multi-Branch Management",
      "icon": "layers",
      "features": [
        {
          "name": "Single Outlet / Store Management",
          "tooltip": "Manage a single shop location or online-only outlet.",
          "starter": true,
          "basic": true,
          "medium": true,
          "high": true,
          "nameBn": "একক আউটলেট / শোরুম সম্পূর্ণ পরিচালনা"
        },
        {
          "name": "Multi-Branch Outlets & Branch Managers",
          "tooltip": "Add multiple physical outlets with dedicated branch manager permissions.",
          "starter": "1 store",
          "basic": "1 store",
          "medium": "2 Branches",
          "high": "5 Branches",
          "nameBn": "একাধিক শাখা আউটলেট ও ব্রাঞ্চ ম্যানেজার একাউন্ট"
        },
        {
          "name": "Centralized Product Catalog & Pricing",
          "tooltip": "Control products globally or allow branch-specific price tiers.",
          "starter": false,
          "basic": false,
          "medium": true,
          "high": true,
          "nameBn": "কেন্দ্রীয় মাস্টার প্রোডাক্ট ক্যাটালগ ও প্রাইজ কন্ট্রোল"
        },
        {
          "name": "Head Office Master Dashboard & Branch P&L Comparison",
          "tooltip": "Compare revenue, expenses, and profits across all branches side-by-side.",
          "starter": false,
          "basic": false,
          "medium": true,
          "high": true,
          "nameBn": "হেড অফিস ড্যাশবোর্ড ও সকল শাখার লাভ-ক্ষতি তুলনা"
        }
      ]
    },
    {
      "id": "security_reporting",
      "title": "Security, Roles & Advanced Reporting",
      "icon": "shield",
      "features": [
        {
          "name": "Admin User Limit",
          "tooltip": "Number of staff accounts with administrative access.",
          "starter": "To Be Confirmed",
          "basic": "Up to 5 Users",
          "medium": "Up to 10 Users",
          "high": "Unlimited Users",
          "nameBn": "ইউজার একাউন্ট সংখ্যা সীমা"
        },
        {
          "name": "Hosting Infrastructure",
          "tooltip": "High-performance deployment server architecture (Shared, VPS, or AWS Cloud).",
          "starter": "Shared",
          "basic": "VPS",
          "medium": "AWS",
          "high": "AWS",
          "nameBn": "হোস্টিং ও ক্লাউড সার্ভার ইনফ্রাস্ট্রাকচার"
        },
        {
          "name": "Cloud Storage Capacity",
          "tooltip": "Dedicated cloud storage for catalog images, databases, and invoices.",
          "starter": "1 GB",
          "basic": "2 GB",
          "medium": "4 GB",
          "high": "10 GB",
          "nameBn": "ক্লাউড স্টোরেজ ধারণক্ষমতা"
        },
        {
          "name": "Monthly Web Traffic",
          "tooltip": "E-commerce and admin web traffic bandwidth.",
          "starter": false,
          "basic": "Up to 5,000 visits",
          "medium": "Up to 10,000 visits",
          "high": "Unlimited (Fair-use)",
          "nameBn": "মাসিক ওয়েবসাইট ট্রাফিক ভিজিটর সীমা"
        },
        {
          "name": "Granular Role-Based Permissions (RBAC)",
          "tooltip": "Restrict cashier from seeing purchase costs, delete permissions, or financial reports.",
          "starter": "Standard",
          "basic": true,
          "medium": true,
          "high": true,
          "nameBn": "ভূমিকাভিত্তিক নিরাপত্তা অনুমতি (RBAC পারমিশন)"
        },
        {
          "name": "Complete Audit Trail & User Activity Logs",
          "tooltip": "Track who created, modified, or canceled any invoice or transaction.",
          "starter": false,
          "basic": false,
          "medium": true,
          "high": true,
          "nameBn": "কর্মীদের কাজের সম্পূর্ণ অডিট ট্রেইল ও লগ হিস্ট্রি"
        },
        {
          "name": "Automated Daily Cloud Backups",
          "tooltip": "Nightly automated encrypted backups to protect business records.",
          "starter": true,
          "basic": true,
          "medium": true,
          "high": true,
          "nameBn": "প্রতিদিনের ক্লাউড ব্যাকআপ ও আজীবন ডেটা নিরাপত্তা"
        },
        {
          "name": "Export to PDF, Excel & CSV",
          "tooltip": "Download financial and inventory reports in formatted spreadsheets and PDFs.",
          "starter": "PDF Only",
          "basic": true,
          "medium": true,
          "high": true,
          "nameBn": "পিডিএফ, এক্সেল ও সিএসভি ফরম্যাটে রিপোর্ট ডাউনলোড"
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
        "a": "Yes! Our engineering and onboarding team is physically based at Nikunja 2, Khilkhet, Dhaka. Having successfully onboarded <strong>200+ growing retail, pharmacy, fashion, and wholesale businesses across Bangladesh</strong>, we provide comprehensive hands-on staff training, POS hardware configuration, and 6-days-a-week priority assistance via direct hotline (01955345331) and dedicated VIP WhatsApp groups."
      },
      "bn": {
        "q": "আমাদের সেলস টিমকে কি প্রশিক্ষণ দেওয়া হবে এবং ঢাকার অফিস থেকে কীভাবে সহায়তা পাব?",
        "a": "হ্যাঁ! আমাদের নিজস্ব ইঞ্জিনিয়ারিং ও অনবোর্ডিং টিম ঢাকার নিকুঞ্জ ২-এ অবস্থিত। ইতোমধ্যে <strong>দেশব্যাপী ২০০+ সফল রিটেল, ফার্মেসি, ফ্যাশন ও হোলসেল ব্যবসায়ে</strong> সফলভাবে সিস্টেম চালু করার অভিজ্ঞতা নিয়ে আমরা আপনার সেলস ও অ্যাকাউন্টস টিমকে সরাসরি হাতে-কলমে প্রশিক্ষণ প্রদান করি, পিওএস প্রিন্টার ও বারকোড সেটআপ করে দিই এবং সপ্তাহে ৬ দিন সরাসরি ফোন হটলাইন (০১৯৫৫৩৪৫৩৩১) ও ডেডিকেটেড ভিআইপি হোয়াটসঅ্যাপ গ্রুপে সার্বক্ষণিক সহায়তা প্রদান করি।"
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
