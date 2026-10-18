export const OWNER_PROFILE = {
  name: 'Avichal Goyal',
  introGreeting: "Hi, I'm Avichal Goyal.",
  headline:
    'I’m a product-minded software engineer who builds web products, AI tools, and automations that make real-world work easier.',
  subheadline:
    'From learner operations and CRM automations to Android apps, 360° 3D commerce studios, and open-source developer tools.',
  location: 'New Delhi / NCR, India',
  email: 'avichalgoyal15@gmail.com',
  phone: '+91 9667665882',
  resumeUrl: '/resume.pdf',
  githubUrl: 'https://github.com/avichal15',
  linkedinUrl: 'https://www.linkedin.com/in/avichalgoyal007/',
  characterCue: 'Psst. Drag to spin me — or tap "Do a trick".',
  gothamModeNote:
    'Original brick-built nocturnal vigilante tribute mode. All portfolio identity, work history, and links remain 100% factual Avichal Goyal.',
};

export const PERSONAL_INTRO = {
  eyebrow: '00 / HUMAN INTRODUCTION',
  title: 'I like sitting where messy real-world operations meet clean software.',
  paragraphs: [
    "My path into product engineering didn't start in a vacuum. After finishing my B.Tech in Computer Science at SRM Institute of Science and Technology (2021–2025), I joined MediStudyGo, where I saw firsthand how much time teams lose when payments, learner provisioning, CRM follow-ups, and reporting live in disconnected silos.",
    "Since then, I've focused on building software that removes friction for real users and operators — whether that's an everyday Android dialer with expressive Audio Emojis (Phoney), a 360+ brand corporate voucher platform (TruGifting Solutions), or an interactive 3D WebGL garment customizer (Masterplayer Designs & Printing).",
  ],
  quickFacts: [
    {
      period: 'Mar 2026 – Present',
      role: 'Independent Software Engineer & Product Builder',
      org: 'Client Products & Self-Directed R&D',
      summary:
        'Shipping full-stack web platforms, interactive 3D commerce tools, Android beta products, and AI workflow automations.',
    },
    {
      period: 'May 2025 – Feb 2026',
      role: 'Associate – Product & Platform Operations',
      org: 'MediStudyGo',
      summary:
        'Owned learner onboarding automation, LMS/Shopify/CRM integrations, campaign operations, and cross-functional reporting for 50,000+ medical students.',
    },
    {
      period: '2021 – 2025',
      role: 'B.Tech in Computer Science & Engineering',
      org: 'SRM Institute of Science and Technology, Delhi-NCR',
      summary:
        'Built foundations in data structures, full-stack MERN development, computer vision, and applied AI.',
    },
  ],
  characterBubble:
    "Scroll down and I'll walk you through my four flagship product stories — complete with the outfit from each chapter.",
};

export const AUDIO_EMOJIS = [
  {
    id: 'chime',
    label: 'Chime',
    emoji: '✨',
    description: 'Warm harmonic two-note bell for friendly hellos and agreement.',
    freqStart: 587.33,
    freqEnd: 880.0,
    type: 'sine',
    duration: 0.42,
  },
  {
    id: 'pop',
    label: 'Pop',
    emoji: '🫧',
    description: 'Crisp tactile bubble pop for quick acknowledgments on the line.',
    freqStart: 320.0,
    freqEnd: 780.0,
    type: 'triangle',
    duration: 0.18,
  },
  {
    id: 'boing',
    label: 'Boing',
    emoji: '弹簧',
    displayEmoji: '🌀',
    description: 'Playful spring bounce when a joke lands mid-conversation.',
    freqStart: 220.0,
    freqEnd: 640.0,
    type: 'sawtooth',
    duration: 0.38,
  },
  {
    id: 'buzz',
    label: 'Buzz',
    emoji: '⚡',
    description: 'Low game-show style buzzer for playful pushback.',
    freqStart: 145.0,
    freqEnd: 110.0,
    type: 'sawtooth',
    duration: 0.34,
  },
  {
    id: 'sparkle',
    label: 'Sparkle',
    emoji: '🌟',
    description: 'Bright arpeggiated shimmer for good news and celebrations.',
    freqStart: 659.25,
    freqEnd: 1318.5,
    type: 'sine',
    duration: 0.48,
  },
  {
    id: 'tada',
    label: 'Ta-da',
    emoji: '🎉',
    description: 'Upbeat major chord fanfare for announcements and milestones.',
    freqStart: 523.25,
    freqEnd: 1046.5,
    type: 'triangle',
    duration: 0.52,
  },
];

export const FEATURED_STORIES = [
  {
    number: '01',
    slug: 'medistudygo',
    title: 'MediStudyGo',
    subtitle: 'Medical Ed-Tech Platform & Learner Operations Engine',
    relationshipBadge: 'Former Work · May 2025 – Feb 2026',
    year: '2025 – 2026',
    role: 'Associate – Product & Platform Operations',
    outfit: 'doctor',
    outfitLabel: 'Clinical Lab Coat & Teal Scrubs (Doctor Sheet)',
    characterSheetImg: '/media/characters/sheet-doctor.jpg',
    accentColor: '#1A7F8E',
    surfaceTint: '#ECF8FA',
    liveUrl: 'https://medistudygo.com/',
    liveLabel: 'Visit medistudygo.com',
    repoUrl: null,
    repoLabel: null,
    stack: [
      'Shopify & LMS Operations',
      'Zoho CRM & Marketing Automation',
      'WhatsApp & Email Workflows',
      'Cohort & Revenue Analytics',
      'Catalog & Access Provisioning',
    ],
    speechBeats: [
      'At MediStudyGo, I worked right where medical education meets day-to-day platform operations — helping thousands of MBBS, BDS, and nursing students get fast, reliable access to visual mind maps, flashcards, and video revision tools.',
      'Instead of letting manual course provisioning, coupon logic, and CRM follow-ups slow the team down, I connected storefront orders, learner onboarding, and support pipelines into repeatable workflows.',
    ],
    summary:
      'Streamlined learner onboarding, storefront-to-app access provisioning, CRM lifecycle campaigns, and operational reporting for a fast-growing medical exam-prep platform serving 50,000+ students.',
    problem:
      'As MediStudyGo scaled across MBBS, BDS, BPT, and Nursing cohorts, orders arrived from web checkouts, bundle promotions, and institutional drives. Manual verification between storefront orders, app entitlements, and student support queues created bottlenecks during peak exam seasons.',
    whatIBuiltAndOwned: [
      'Designed and maintained automated learner onboarding and entitlement workflows linking storefront purchases to app access and welcome communications.',
      'Structured CRM segmentation, cart-recovery sequences, and exam-cohort broadcasts across WhatsApp and email with measurable conversion tracking.',
      'Built operational trackers for bundle fulfillment, replacement requests, and cross-functional weekly KPI reporting across product, content, and support teams.',
      'Audited catalog metadata, pricing tiers, and promotional campaign rules on the live storefront so launches shipped without checkout regressions.',
    ],
    shippedStatus: {
      live: [
        'Public storefront at medistudygo.com serving MBBS, BDS, BPT, and Nursing mind maps, flashcards, and NEET PG revision bundles.',
        'Automated order-to-onboarding communication flows and structured student support triage.',
      ],
      notes:
        'Represents Avichal’s full-time operational and product systems role from May 2025 to February 2026.',
    },
    media: {
      desktop: '/media/projects/medistudygo-desktop.png',
      desktopAlt: 'MediStudyGo live desktop storefront showing MBBS, BDS, BPT, and Nursing mind map collections',
      mobile: '/media/projects/medistudygo-mobile.png',
      mobileAlt: 'MediStudyGo mobile responsive storefront and 50,000+ students social proof',
      gallery: [
        {
          src: '/media/projects/medistudygo-desktop.png',
          caption: 'Live MediStudyGo web platform with cohort selector (MBBS / BDS / BPT / Nursing) and visual mind-map catalog.',
        },
        {
          src: '/media/projects/medistudygo-mobile.png',
          caption: 'Mobile-first student discovery flow and instant app access prompts.',
        },
      ],
    },
  },
  {
    number: '02',
    slug: 'phoney',
    title: 'Phoney',
    subtitle: 'Out of pocket. Into your calls. — Expressive Android Dialer with Audio Emojis',
    relationshipBadge: 'Personal Android Product · Early-Access Beta',
    year: '2026',
    role: 'Creator, Android & Full-Stack Engineer',
    outfit: 'techy',
    outfitLabel: 'AI/Dev Hoodie, Round Glasses & DEV Lanyard (Techy Sheet)',
    characterSheetImg: '/media/characters/sheet-techy.png',
    accentColor: '#1D4ED8',
    surfaceTint: '#EEF4FF',
    liveUrl: 'https://phoney.avichalgoyal.me/',
    liveLabel: 'Visit phoney.avichalgoyal.me',
    repoUrl: 'https://github.com/avichal15/calling-app-',
    repoLabel: 'Repo (GitHub · Private)',
    repoIsPrivate: true,
    betaCtaUrl: 'mailto:avichalgoyal15@gmail.com?subject=Phoney%20Android%20Beta%20Tester%20Opt-In&body=Hi%20Avichal%2C%20I%27d%20love%20to%20test%20the%20Phoney%20Android%20beta!',
    betaCtaLabel: 'Join Android Beta (Opt-In)',
    stack: [
      'Android (Kotlin / Telecom InCallService)',
      'React 19 + Three.js Product Site',
      'Expressive Audio Emoji Tray',
      'Web Audio Sound Preview',
      'Privacy-First Call Controls',
    ],
    speechBeats: [
      "Next up is Phoney — my personal Android calling app built around a simple observation: everyday phone calls feel stuck in 2010, even when you're talking to your closest friends.",
      'Phoney pairs a clean, zero-clutter dialer with one-tap Audio Emojis right inside the call tray. It is currently in opt-in Android early access while I complete final release gates.',
    ],
    summary:
      'An everyday Android calling app that brings one-tap Audio Emojis and tactile Material-inspired call controls to live phone conversations, accompanied by an interactive 3D product showcase at phoney.avichalgoyal.me.',
    problem:
      'Messaging apps have stickers, reactions, and voice notes, but standard cellular phone calls remain rigid and expressionless. At the same time, third-party dialers often bloat the interface with spammy ads or invasive permissions.',
    whatIBuiltAndOwned: [
      'Architected the Android dialer and in-call surface around fast contact lookup, clean recents filtering, and a customizable 6-slot Quick Tray for Audio Emojis.',
      'Designed and built the companion interactive web showcase at phoney.avichalgoyal.me featuring a draggable 3D handset sculpture, live sound previews, and transparent privacy documentation.',
      'Implemented strict release-gate honesty and privacy boundaries: phone calls work without mandatory sign-in, and any future recording or sound-pack features follow explicit user consent and platform compliance.',
    ],
    shippedStatus: {
      live: [
        'Interactive product website live at https://phoney.avichalgoyal.me/ with 3D sculpture, theme switcher, and screen walkthroughs.',
        'Android early-access build (India · 18+) in active opt-in beta testing with Recents, Contacts, In-Call Keypad, and Audio Emoji Quick Tray.',
      ],
      inProgress: [
        'Play Store public production rollout gates, expanded original royalty-free sound packs, and verified carrier/device compatibility matrix.',
      ],
      privacyAndConsentNote:
        'Transparency note: Phoney is currently in opt-in Android early access. It never promotes or performs hidden or undisclosed call recording; core calling works locally with clear user-controlled permissions.',
    },
    media: {
      desktop: '/media/projects/phoney-desktop.png',
      desktopAlt: 'Phoney live desktop web showcase at phoney.avichalgoyal.me',
      mobile: '/media/projects/current-sounds.webp',
      mobileAlt: 'Phoney Android app Sounds screen showing the 6-slot Audio Emoji Quick Tray',
      gallery: [
        {
          src: '/media/projects/phoney-desktop.png',
          caption: 'Live product showcase at phoney.avichalgoyal.me with interactive 3D handset sculpture.',
        },
        {
          src: '/media/projects/current-sounds.webp',
          caption: 'Real Android app screen: Audio Emoji Quick Tray and sound pack browser.',
        },
        {
          src: '/media/projects/current-recents.webp',
          caption: 'Real Android app screen: Clean Recents tab with quick call filters and floating keypad trigger.',
        },
        {
          src: '/media/projects/call.webp',
          caption: 'Real Android app screen: In-call interface with one-tap Audio Emoji reaction triggers.',
        },
        {
          src: '/media/projects/current-privacy.webp',
          caption: 'Real Android app screen: Transparent privacy and permission controls.',
        },
      ],
    },
  },
  {
    number: '03',
    slug: 'trugifting-solutions',
    title: 'TruGifting Solutions',
    subtitle: 'B2B Corporate Gifting, 360+ Brand Vouchers & Employee R&R Platform',
    relationshipBadge: 'Independent Project · Post-MediStudyGo (2026)',
    year: '2026',
    role: 'Independent Full-Stack & Frontend Engineer',
    outfit: 'techy',
    outfitLabel: 'Product Engineer Hoodie & Smart Specs (Techy Sheet)',
    characterSheetImg: '/media/characters/sheet-techy.png',
    accentColor: '#0F6E4B',
    surfaceTint: '#ECFDF5',
    liveUrl: 'https://trugiftingsolutions.com/',
    liveLabel: 'Visit trugiftingsolutions.com',
    repoUrl: 'https://github.com/avichal15/trugifting-solutions',
    repoLabel: 'Repo (GitHub · Private)',
    repoIsPrivate: true,
    stack: [
      'Responsive Web Architecture',
      'Brand Voucher Catalog & Filtering',
      'Enterprise Quote & Demo Flows',
      'SEO & Performance Optimization',
      'B2B Gifting Workflows',
    ],
    speechBeats: [
      'After wrapping up my role at MediStudyGo, I took on TruGifting Solutions as an independent build — creating a polished digital storefront for corporate gifting, employee rewards, and channel loyalty programs.',
      'The platform helps HR and procurement teams browse 360+ brand vouchers — from Amazon, Flipkart, and Swiggy to MakeMyTrip — and request tailored bulk quotes in seconds.',
    ],
    summary:
      'Designed and shipped the live B2B web platform for TruGifting Solutions, showcasing 360+ brand gift cards, corporate gifting catalogs, employee recognition (R&R) workflows, and instant quote generation.',
    problem:
      'Corporate gifting buyers need immediate clarity on supported voucher brands, bulk fulfillment reliability, and redemption flexibility before booking a consultation. Legacy brochure sites failed to communicate catalog breadth or capture structured B2B leads.',
    whatIBuiltAndOwned: [
      'Engineered the complete responsive web experience at trugiftingsolutions.com with dedicated pathways for Brand Vouchers, Corporate Gifting, Employee R&R, and Channel Loyalty.',
      'Built interactive brand voucher network showcases highlighting 360+ partner brands across e-commerce, dining, fashion, travel, and electronics.',
      'Implemented high-conversion B2B quote and demo request flows tailored for HR leaders, sales managers, and procurement teams.',
    ],
    shippedStatus: {
      live: [
        'Production website live at https://trugiftingsolutions.com/ with interactive brand voucher showcase, solution verticals, and lead capture.',
      ],
      notes:
        'Built independently after MediStudyGo as a dedicated client/partner web platform.',
    },
    media: {
      desktop: '/media/projects/trugifting-desktop.png',
      desktopAlt: 'TruGifting Solutions live desktop site showing 360+ brand gift cards and corporate gifting hero',
      mobile: '/media/projects/trugifting-mobile.png',
      mobileAlt: 'TruGifting Solutions mobile responsive view',
      gallery: [
        {
          src: '/media/projects/trugifting-desktop.png',
          caption: 'Live desktop storefront at trugiftingsolutions.com featuring the floating brand voucher wheel.',
        },
        {
          src: '/media/projects/trugifting-mobile.png',
          caption: 'Mobile responsive layout optimized for fast B2B voucher exploration and quote requests.',
        },
      ],
    },
  },
  {
    number: '04',
    slug: 'masterplayer-designs-and-printing',
    title: 'Masterplayer Designs & Printing',
    subtitle: 'Interactive 360° WebGL 3D Customizer Studio & B2B Print Atelier',
    relationshipBadge: 'Current Ongoing Collaboration · 2026 – Present',
    year: '2026 – Present',
    role: 'Product Engineer & Creative Technologist',
    outfit: 'masterplayer',
    outfitLabel: 'Red/Black Plaid Flannel, Studio Glasses & STAFF Lanyard (Masterplayer Sheet)',
    characterSheetImg: '/media/characters/sheet-masterplayer.jpg',
    accentColor: '#B91C1C',
    surfaceTint: '#FEF2F2',
    liveUrl: 'https://masterplayerprints.com/',
    liveLabel: 'Visit masterplayerprints.com',
    repoUrl: 'https://github.com/avichal15/Masterplayer',
    repoLabel: 'Repo (GitHub · Private)',
    repoIsPrivate: true,
    stack: [
      'Three.js / WebGL 360° Customizer',
      'HTML5 2D Print-Zone Canvas',
      'Shopify Online Store 2.0 (Liquid + JSON)',
      'B2B Tiered Pricing & 18% GST Engine',
      'WhatsApp Studio Dispatch Flow',
    ],
    speechBeats: [
      "My fourth featured chapter is an ongoing collaboration: Masterplayer Designs & Printing — where we're turning custom apparel, merch, and corporate gifting into an interactive 3D studio.",
      'Customers can spin a 240 GSM tee or ceramic mug in 360° WebGL, snap their logo onto specific print slots, auto-remove white backgrounds, and calculate B2B bulk pricing with 18% GST credit.',
    ],
    summary:
      'An ongoing product engineering collaboration building an interactive 2D/3D custom print studio, 22 architectural bento departments, and B2B bulk quoting on top of a hybrid WebGL + Shopify Online Store 2.0 stack.',
    problem:
      'Custom printing customers struggle to visualize how a chest crest, oversized back print, or sleeve logo will actually sit on heavy-gauge fabric or curved drinkware, leading to back-and-forth proof delays on WhatsApp.',
    whatIBuiltAndOwned: [
      'Built the interactive 360° WebGL 3D Studio and 2D customization workbench supporting slot-based logo placement (Center Chest, Left Chest Crest, Oversized Front, Back Studio Print, Sleeves) and live client-side white-background removal.',
      'Structured the 22 Studio Departments and 63+ custom blank catalog spanning 240–380 GSM apparel, 3D puff embroidery caps, laser-engraved drinkware, and corporate welcome kits.',
      'Implemented the B2B bulk pricing and 18% GST input-credit quote calculator with direct WhatsApp Studio and cart handoff.',
    ],
    shippedStatus: {
      live: [
        'Live storefront at https://masterplayerprints.com/ with interactive 360° WebGL 3D customizer preview, 11 hero 3D blank presets, 22 department bento grid, and B2B 18% GST quote calculator.',
        'Client-side logo upload, white-background removal toggle, and print-slot switching.',
      ],
      inProgress: [
        'Automated high-DPI print-ready vector/CMYK preflight export directly from customer 3D sessions into production queues.',
        'Expanded multi-item corporate hamper box configurator and real-time courier tracking webhooks.',
      ],
    },
    media: {
      desktop: '/media/projects/masterplayer-desktop.png',
      desktopAlt: 'Masterplayer Designs & Printing live 360 WebGL 3D Studio on desktop',
      mobile: '/media/projects/masterplayer-mobile.png',
      mobileAlt: 'Masterplayer 3D WebGL Studio on mobile viewport',
      gallery: [
        {
          src: '/media/projects/masterplayer-desktop.png',
          caption: 'Live 360° WebGL 3D Studio at masterplayerprints.com showing 240 GSM Heavyweight Crewneck customization.',
        },
        {
          src: '/media/projects/masterplayer-mobile.png',
          caption: 'Responsive mobile 3D customizer with print-slot pills and color swatches.',
        },
      ],
    },
  },
];

export const ARCHIVE_PROJECTS = [
  {
    slug: 'omniroute-session-sync',
    title: 'OmniRoute Session Sync',
    category: 'Open Source · Developer Tooling',
    period: '2026',
    featuredInOpenSource: true,
    summary:
      'Zero-dependency browser session and cookie synchronization companion utility for the local OmniRoute AI gateway.',
    disclaimer:
      'Independent third-party companion utility built to sync authenticated browser sessions into a local decolua/omniroute instance — not a claim of authorship over the upstream decolua/omniroute project.',
    problem:
      'Local AI routing gateways often require refreshed browser session tokens across multiple provider tabs, which is tedious to copy manually from DevTools.',
    solution:
      'Built an automated session-sync utility and extension bridge that reads authorized local session cookies and updates the local OmniRoute endpoint cleanly.',
    stack: ['JavaScript (Node.js)', 'Chrome Extension APIs', 'Local HTTP Bridge', 'CLI Automation'],
    liveUrl: null,
    repoUrl: 'https://github.com/avichal15/omniroute-session-sync',
    repoLabel: 'View on GitHub (Public)',
    repoIsPrivate: false,
    media: null,
  },
  {
    slug: 'insta-manager',
    title: 'Instagram Manager (Local-First Creator & Outreach CRM)',
    category: 'Open Source · Desktop & Automation',
    period: '2026',
    featuredInOpenSource: true,
    summary:
      'Local-first desktop workspace and browser bridge for organizing creator outreach, DM follow-ups, and content operations.',
    problem:
      'Managing high-volume creator collaborations and prospect follow-ups inside native social tabs leads to lost context and duplicate outreach.',
    solution:
      'Created a local-first React + Python/Node desktop workflow with structured lead stages, template queues, and human-in-the-loop browser actions.',
    stack: ['React', 'Node.js', 'SQLite / Local Storage', 'Browser Automation Bridge'],
    liveUrl: null,
    repoUrl: 'https://github.com/avichal15/Insta-manager',
    repoLabel: 'View on GitHub (Public)',
    repoIsPrivate: false,
    media: null,
  },
  {
    slug: 'recruitment-funnel-dashboard',
    title: 'Recruitment Funnel Analytics Dashboard',
    category: 'Open Source · BI & Analytics',
    period: '2026',
    featuredInOpenSource: true,
    summary:
      'Interactive recruitment marketing analytics dashboard tracking click-to-hire conversion, channel CPA/CPH, and geo drop-off.',
    disclaimer:
      'Portfolio analytics demonstration: all funnel metrics ($508K spend, 250K clicks, 1.8K hires) are generated locally using synthetic data (Faker, Pandas, and SQLite) rather than proprietary employer data.',
    problem:
      'Talent acquisition teams struggle to compare cost-per-applicant vs. cost-per-qualified-hire across job boards (Indeed, LinkedIn, Google Jobs, Programmatic) in a single view.',
    solution:
      'Engineered a multi-tab Streamlit + Plotly + SQLite analytics application featuring executive KPI cards, channel performance tables, geo heatmaps, and automated budget reallocation recommendations.',
    stack: ['Python', 'Streamlit', 'Pandas', 'Plotly', 'SQLite', 'Faker (Synthetic Data)'],
    liveUrl: null,
    repoUrl: 'https://github.com/avichal15/recruitment-funnel-dashboard',
    repoLabel: 'View on GitHub (Public)',
    repoIsPrivate: false,
    media: '/media/projects/dashboard-overview.png',
    gallery: [
      {
        src: '/media/projects/dashboard-overview.png',
        caption: 'Executive View: 250.0K clicks to 1.8K hires funnel snapshot (synthetic demo dataset).',
      },
      {
        src: '/media/projects/channel-performance.png',
        caption: 'Channel Performance breakdown comparing Cost per Applicant vs. Cost per Hire.',
      },
      {
        src: '/media/projects/recommendations.png',
        caption: 'Automated spend optimization and channel reallocation insights.',
      },
    ],
  },
  {
    slug: 'whatsapp-to-csv-converter',
    title: 'WhatsApp to CSV Converter',
    category: 'Open Source · Data Utility',
    period: '2025',
    featuredInOpenSource: true,
    summary:
      'Lightweight parser that transforms raw exported WhatsApp chat `.txt` logs into clean, UTF-8 structured CSV tables for analysis.',
    problem:
      'Operations and support teams frequently export WhatsApp threads for audit or CRM import, but multi-line messages and locale timestamps break naive spreadsheet imports.',
    solution:
      'Built a deterministic parser handling multi-line message bodies, sender extraction, system notifications, and timestamp normalization into analysis-ready CSVs.',
    stack: ['Python / JavaScript', 'Regex & Stream Parsing', 'CSV Data Hygiene'],
    liveUrl: null,
    repoUrl: 'https://github.com/avichal15/whatsapp-to-csv-converter',
    repoLabel: 'View on GitHub (Public)',
    repoIsPrivate: false,
    media: null,
  },
  {
    slug: 'microcoach',
    title: 'MicroCoach — Habit & Streak Companion',
    category: 'Web Application · Productivity',
    period: '2025',
    featuredInOpenSource: false,
    summary:
      'Clean daily habit tracker with streak visualization, accountability partner tabs, and AI micro-coaching prompts.',
    problem:
      'Most habit trackers overwhelm users with complex setup screens before they complete a single daily action.',
    solution:
      'Built and deployed a fast, distraction-free web app at projectmicrocoach.netlify.app focused on daily streak momentum, one-tap task completion, and lightweight coaching.',
    stack: ['React', 'Tailwind CSS', 'Local State Persistence', 'Netlify'],
    liveUrl: 'https://projectmicrocoach.netlify.app/',
    liveLabel: 'Visit projectmicrocoach.netlify.app',
    repoUrl: null,
    media: '/media/projects/microcoach-desktop.png',
  },
  {
    slug: 'unified-crm-ecommerce-integration',
    title: 'Unified CRM & E-Commerce Operations Pipeline',
    category: 'Operations Engineering · Automation',
    period: 'May 2025 – Jul 2025',
    featuredInOpenSource: false,
    summary:
      'End-to-end operational integration connecting Zoho CRM, Shopify, WooCommerce, and Shiprocket for automated order and lead lifecycle tracking.',
    problem:
      'Manual CSV exports between e-commerce checkouts, courier tracking, and CRM deal stages caused delayed customer updates and reporting drift.',
    solution:
      'Configured webhook-driven synchronization and field mapping across storefront orders, Shiprocket dispatch events, and Zoho CRM pipeline stages.',
    stack: ['Zoho CRM', 'Shopify', 'WooCommerce', 'Shiprocket', 'Webhooks & REST APIs'],
    liveUrl: null,
    repoUrl: null,
    media: null,
  },
  {
    slug: 'sigmagpt',
    title: 'SigmaGPT — Full-Stack Conversational AI Workspace',
    category: 'AI & Full-Stack Web',
    period: 'Feb 2025 – May 2025',
    featuredInOpenSource: false,
    summary:
      'Custom conversational AI web application featuring persistent thread history, markdown/code rendering, and responsive prompt controls.',
    problem:
      'Needed a customizable, self-hosted chat interface to experiment with system prompts, token streaming, and multi-session persistence.',
    solution:
      'Built a full-stack React + Node.js/Express + MongoDB chat workspace integrated with OpenAI completion APIs.',
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'OpenAI API'],
    liveUrl: null,
    repoUrl: 'https://github.com/avichal15',
    repoLabel: 'GitHub Profile',
    media: null,
  },
  {
    slug: 'project-snowball',
    title: 'Project Snowball',
    category: 'Web Platform · Community',
    period: '2024 – 2025',
    featuredInOpenSource: false,
    summary:
      'Collaborative student and builder initiative focused on compounding small technical projects into production-ready portfolios.',
    problem:
      'Students often learn syntax in isolation without shipping end-to-end products or iterating on real user feedback.',
    solution:
      'Organized structured project milestones, peer code reviews, and deployment sprints.',
    stack: ['React', 'JavaScript', 'Git Workflows', 'Product Operations'],
    liveUrl: null,
    repoUrl: 'https://github.com/avichal15',
    repoLabel: 'GitHub Profile',
    media: null,
  },
  {
    slug: 'weather-app',
    title: 'Real-Time Weather Forecast App',
    category: 'Frontend Web App',
    period: '2024',
    featuredInOpenSource: false,
    summary:
      'Fast city weather lookup application displaying live temperature, humidity, wind speed, and condition states via REST weather APIs.',
    problem:
      'Practice project focused on clean asynchronous API error handling, debounced search, and responsive card layouts.',
    solution:
      'Built a lightweight frontend client consuming live meteorological endpoints with instant metric unit formatting.',
    stack: ['JavaScript (ES6+)', 'REST APIs', 'HTML5 & CSS3'],
    liveUrl: null,
    repoUrl: 'https://github.com/avichal15',
    repoLabel: 'GitHub Profile',
    media: null,
  },
  {
    slug: 'crypto-price-tracker',
    title: 'Cryptocurrency Live Price Tracker',
    category: 'Frontend Dashboard',
    period: '2024',
    featuredInOpenSource: false,
    summary:
      'Real-time market table tracking top cryptocurrency prices, 24-hour percentage changes, market caps, and search filtering.',
    problem:
      'Wanted a clean, zero-noise market overview that updates live market data without heavy charting clutter.',
    solution:
      'Developed a responsive React dashboard fetching live market tickers with instant client-side search and sorting.',
    stack: ['React', 'CoinGecko REST API', 'CSS Grid & Flexbox'],
    liveUrl: null,
    repoUrl: 'https://github.com/avichal15',
    repoLabel: 'GitHub Profile',
    media: null,
  },
  {
    slug: 'object-detection-tensorflow',
    title: 'Real-Time Browser Object Detection',
    category: 'Computer Vision & WebML',
    period: '2024',
    featuredInOpenSource: false,
    summary:
      'Client-side webcam object detection running directly in the browser using TensorFlow.js and the pre-trained COCO-SSD model.',
    problem:
      'Demonstrating real-time computer vision inference without sending private camera frames to a backend server.',
    solution:
      'Integrated TensorFlow.js and HTML5 Canvas bounding-box overlays on live WebRTC video streams at interactive frame rates.',
    stack: ['TensorFlow.js', 'COCO-SSD', 'React', 'HTML5 Canvas & WebRTC'],
    liveUrl: null,
    repoUrl: 'https://github.com/avichal15',
    repoLabel: 'GitHub Profile',
    media: null,
  },
];

export const ALL_WORK_BY_SLUG = new Map([
  ...FEATURED_STORIES.map((item) => [item.slug, { ...item, isFeatured: true }]),
  ...ARCHIVE_PROJECTS.map((item) => [item.slug, { ...item, isFeatured: false }]),
]);

export const CERTIFICATIONS = [
  {
    slug: 'foundations-of-business-intelligence',
    title: 'Foundations of Business Intelligence',
    issuer: 'Google (via Coursera)',
    issueDate: 'August 2024',
    category: 'Business Intelligence & Data Systems',
    badgeColor: '#2563EB',
    summary:
      'Professional training covering BI lifecycle stages, data warehousing concepts, stakeholder metric definition, ETL pipelines, and executive dashboard design.',
    skills: [
      'Business Intelligence (BI) Strategy',
      'Data Modeling & ETL Concepts',
      'KPI & Stakeholder Alignment',
      'Dashboard Design & Reporting Hygiene',
    ],
    appliedInWork:
      'Applied directly while structuring cohort analytics at MediStudyGo and designing the multi-tab Recruitment Funnel Analytics Dashboard.',
    verificationNote:
      'Listed on Avichal Goyal’s verified resume (Issued Aug 2024 by Google on Coursera). Request direct Coursera verification link or PDF copy via email if required for hiring compliance.',
    verifyUrl: 'mailto:avichalgoyal15@gmail.com?subject=Credential%20Verification%20Request%20-%20Foundations%20of%20Business%20Intelligence',
    verifyLabel: 'Request Verification Link',
  },
  {
    slug: 'mern-stack-development',
    title: 'Full-Stack Web Development (MERN Stack — Delta Batch)',
    issuer: 'Apna College',
    issueDate: '2024',
    category: 'Full-Stack Software Engineering',
    badgeColor: '#0F6E4B',
    summary:
      'Intensive project-based curriculum covering MongoDB, Express.js, React, Node.js, RESTful API design, authentication, and cloud deployment.',
    skills: [
      'React & Component Architecture',
      'Node.js & Express REST APIs',
      'MongoDB Schema Design',
      'Authentication, State & Deployment',
    ],
    appliedInWork:
      'Forms the core engineering foundation behind SigmaGPT, TruGifting Solutions, Masterplayer 3D Studio, and this interactive portfolio.',
    verificationNote:
      'Completed via Apna College Delta Batch (2024). Certificate copy available upon request.',
    verifyUrl: 'mailto:avichalgoyal15@gmail.com?subject=Credential%20Verification%20Request%20-%20MERN%20Stack%20Development',
    verifyLabel: 'Request Certificate Copy',
  },
  {
    slug: 'data-structures-and-algorithms-java',
    title: 'Data Structures & Algorithms in Java (Alpha Batch)',
    issuer: 'Apna College',
    issueDate: '2023',
    category: 'Core Computer Science & Algorithms',
    badgeColor: '#B45309',
    summary:
      'Comprehensive algorithmic problem-solving curriculum covering arrays, linked lists, trees, graphs, recursion, dynamic programming, and time/space complexity analysis in Java.',
    skills: [
      'Java & Object-Oriented Programming',
      'Trees, Graphs & Heaps',
      'Dynamic Programming & Greedy Algorithms',
      'Asymptotic Complexity Analysis',
    ],
    appliedInWork:
      'Used in parser design (WhatsApp to CSV Converter), 3D scene graph traversal, and performance-critical frontend state management.',
    verificationNote:
      'Completed via Apna College Alpha Batch (2023). Certificate copy available upon request.',
    verifyUrl: 'mailto:avichalgoyal15@gmail.com?subject=Credential%20Verification%20Request%20-%20DSA%20in%20Java',
    verifyLabel: 'Request Certificate Copy',
  },
];

export const CERTIFICATIONS_BY_SLUG = new Map(
  CERTIFICATIONS.map((cert) => [cert.slug, cert])
);

export function getAdjacentWorkItems(slug) {
  const ordered = [
    ...FEATURED_STORIES.map((s) => ({
      slug: s.slug,
      title: s.title,
      subtitle: s.subtitle,
      badge: `Story ${s.number} · ${s.relationshipBadge}`,
      isFeatured: true,
    })),
    ...ARCHIVE_PROJECTS.map((p) => ({
      slug: p.slug,
      title: p.title,
      subtitle: p.summary,
      badge: p.category,
      isFeatured: false,
    })),
  ];
  const idx = ordered.findIndex((item) => item.slug === slug);
  if (idx === -1) return { prev: ordered[0], next: ordered[1] };
  const prev = ordered[(idx - 1 + ordered.length) % ordered.length];
  const next = ordered[(idx + 1) % ordered.length];
  return { prev, next };
}

export function getAdjacentCertifications(slug) {
  const idx = CERTIFICATIONS.findIndex((c) => c.slug === slug);
  if (idx === -1) return { prev: CERTIFICATIONS[0], next: CERTIFICATIONS[1] };
  const prev = CERTIFICATIONS[(idx - 1 + CERTIFICATIONS.length) % CERTIFICATIONS.length];
  const next = CERTIFICATIONS[(idx + 1) % CERTIFICATIONS.length];
  return { prev, next };
}


export const PROFILE = OWNER_PROFILE;
export const FEATURED_PROJECTS = FEATURED_STORIES;

export const OUTFITS = [
  {
    id: 'classic',
    label: 'Classic Builder Suit',
    shortLabel: 'Builder',
    atlasKey: 'base',
    hairColor: '#1f1610',
    accent: '#F5C518',
    showHelmet: false,
    showCape: false,
    tagline: 'Product-minded full-stack builder ready to ship.',
  },
  {
    id: 'doctor',
    label: 'MediStudyGo Clinical Coat',
    shortLabel: 'MedTech',
    atlasKey: 'doctor',
    hairColor: '#1f1610',
    accent: '#38BDF8',
    showHelmet: false,
    showCape: false,
    tagline: 'EdTech, LMS operations, and 50,000+ medical learners.',
  },
  {
    id: 'techy',
    label: 'Phoney & OmniRoute Systems Suit',
    shortLabel: 'Systems AI',
    atlasKey: 'techy',
    hairColor: '#1f1610',
    accent: '#A855F7',
    showHelmet: false,
    showCape: false,
    tagline: 'Android telecom services, WebRTC audio, and AI gateways.',
  },
  {
    id: 'masterplayer',
    label: 'Masterplayer 3D Studio Flannel',
    shortLabel: '3D Studio',
    atlasKey: 'masterplayer',
    hairColor: '#1f1610',
    accent: '#EF4444',
    showHelmet: false,
    showCape: false,
    tagline: '360° WebGL garment customizer & B2B print commerce.',
  },
  {
    id: 'gotham',
    label: 'Gotham Nocturnal Vigilante Rig',
    shortLabel: 'Batman',
    atlasKey: 'gotham',
    hairColor: '#141821',
    accent: '#F5C518',
    showHelmet: true,
    showCape: true,
    tagline: 'Nocturnal debugging & high-stakes production architecture.',
  },
];

export const TRICKS = ['backflip', 'spin', 'superhero', 'wave'];

export const ROLE_OUTFIT_RULES = [
  {
    keywords: ['batman', 'gotham', 'dark', 'night', 'security', 'cyber', 'audit', 'vigilante'],
    outfitId: 'gotham',
    message: '🦇 Activated Gotham Nocturnal Rig — cowled helmet, scalloped cape & dark-mode telemetry.',
  },
  {
    keywords: ['med', 'doctor', 'health', 'dental', 'edtech', 'study', 'lms', 'clinic', 'hospital'],
    outfitId: 'doctor',
    message: '🩺 Switched to MediStudyGo Clinical Coat — built for 50,000+ medical learners & LMS ops.',
  },
  {
    keywords: ['print', 'jersey', '3d', 'webgl', 'shopify', 'commerce', 'design', 'apparel', 'gift', 'b2b'],
    outfitId: 'masterplayer',
    message: '🎨 Switched to Masterplayer 3D Studio Flannel — WebGL customizers & B2B commerce engines.',
  },
  {
    keywords: ['android', 'phone', 'call', 'voice', 'ai', 'llm', 'omniroute', 'backend', 'api', 'fullstack'],
    outfitId: 'techy',
    message: '⚡ Switched to Systems & AI Engineer Suit — Android 15 InCallService, AI routing & full-stack.',
  },
];
