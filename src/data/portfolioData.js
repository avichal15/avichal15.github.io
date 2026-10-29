export const OWNER_PROFILE = {
  name: 'Avichal Goyal',
  roleTitle: 'Software Developer',
  heroLeadBeforeBatman:
    'I’m a product-minded software engineer who builds web products, AI tools, and automations that make real-world work easier. And occasionally, I’m ',
  heroBatmanWord: 'Batman',
  aboutText:
    "Over the last 3 years, I've built full-stack web products, AI tools, Android telecom apps, and 7-platform operations engines for 50,000+ learners and enterprise teams. Here are a few of my favorites...",
  location: 'New Delhi / NCR, India',
  email: 'avichalgoyal15@gmail.com',
  phone: '+91 9667665882',
  resumeUrl: '/resume.pdf',
  githubUrl: 'https://github.com/avichal15',
  linkedinUrl: 'https://www.linkedin.com/in/avichalgoyal007/',
  googleDeveloperUrl: 'https://developers.google.com/profile/badges/community/gear',
};

export const PROFILE = OWNER_PROFILE;

// Phoney's exact 6 Default Quick Tray Audio Emojis (verified from current-sounds.webp)
export const PHONEY_AUDIO_EMOJIS = [
  {
    slot: 1,
    id: 'cheer',
    emoji: '👏',
    label: 'Cheer',
    color: '#FACC15',
    quip: '👏 Crowd goes wild! Instant applause right inside the call.',
  },
  {
    slot: 2,
    id: 'faaah',
    emoji: '😱',
    label: 'Faaah',
    color: '#F97316',
    quip: '😱 FAAAAH! For dramatic plot twists on the line.',
  },
  {
    slot: 3,
    id: 'fart',
    emoji: '💨',
    label: 'Fart',
    color: '#22C55E',
    quip: '💨 Pffft! Because every serious friend group needs a raspberry button.',
  },
  {
    slot: 4,
    id: 'wompwomp',
    emoji: '😑',
    label: 'Womp Womp',
    color: '#38BDF8',
    quip: '😑 Womp womp... sad trombone when plans get cancelled.',
  },
  {
    slot: 5,
    id: 'wow',
    emoji: '🤩',
    label: 'Wow',
    color: '#A855F7',
    quip: '🤩 Woooow! High-energy hype without interrupting the speaker.',
  },
  {
    slot: 6,
    id: 'yay',
    emoji: '🙌',
    label: 'Yay!',
    color: '#EC4899',
    quip: '🙌 YAY! Celebration fanfare delivered in under 180ms.',
  },
];

export const AUDIO_EMOJIS = PHONEY_AUDIO_EMOJIS;

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
    tagline: 'Product-minded software developer ready to ship.',
  },
  {
    id: 'doctor',
    label: 'MediStudyGo Clinical Coat',
    shortLabel: 'MedTech',
    atlasKey: 'doctor',
    hairColor: '#1f1610',
    accent: '#14B8A6',
    showHelmet: false,
    showCape: false,
    tagline: 'EdTech, LMS operations, and 50,000+ medical learners.',
  },
  {
    id: 'techy',
    label: 'Phoney & Systems AI Suit',
    shortLabel: 'Systems AI',
    atlasKey: 'techy',
    hairColor: '#1f1610',
    accent: '#3B82F6',
    showHelmet: false,
    showCape: false,
    tagline: 'Android telecom services, Audio Emojis, and AI session bridges.',
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
    label: 'Batman Nocturnal Rig',
    shortLabel: 'Batman',
    atlasKey: 'gotham',
    hairColor: '#141821',
    accent: '#FACC15',
    showHelmet: true,
    showCape: true,
    tagline: 'Nocturnal debugging & high-stakes production architecture.',
  },
];

export const MASCOT_TRICKS = [
  { id: 'dance', label: 'Dance' },
  { id: 'backflip', label: 'Backflip' },
  { id: 'spin', label: '360° Spin' },
  { id: 'superhero', label: 'Superhero Landing' },
  { id: 'panic', label: 'Panic' },
  { id: 'fly', label: 'Fly' },
  { id: 'vanish', label: 'Vanish' },
  { id: 'hiccup', label: 'Hiccup' },
  { id: 'peekaboo', label: 'Peekaboo' },
  { id: 'selfie', label: 'Take a Selfie' },
  { id: 'dizzy', label: 'Get Dizzy' },
  { id: 'sneeze', label: 'Sneeze' },
  { id: 'sulk', label: 'Sulk' },
];

export const TRICKS = MASCOT_TRICKS.map((t) => t.id);

export const HERO_IDLE_QUIPS = [
  "Hi, I'm Avichal! Scroll down and I'll walk you through my work.",
  "Oh hi, you're here! Want the guided tour?",
  'Psst. You can grab and drag me around — or double-click me for a trick.',
  'Move your cursor around me... careful, I might be ticklish.',
  'Click "Batman" in the headline if you want to see my nocturnal suit.',
];

// ============================================================================
// 5 GUIDED TOUR CHAPTERS IN EXACT USER-SPECIFIED ORDER:
// 1. MediStudyGo -> 2. Phoney -> 3. Masterplayer Prints -> 4. TruGifting Solutions -> 5. OmniRoute Session Sync
// ============================================================================
export const TOUR_CHAPTERS = [
  {
    id: 'tour-medistudygo',
    projectSlug: 'medistudygo',
    title: 'MediStudyGo',
    subtitle: 'Medical EdTech Platform & 7-System Learner Operations Engine',
    role: 'Associate – Product & Platform Operations',
    year: '2025 – 2026',
    mascotSide: 'left',
    outfit: 'doctor',
    tint: '#FFBE1A',
    bgLight: '#E8F3EF',
    bgDark: '#0D191B',
    liveUrl: 'https://medistudygo.com/',
    hosts: [{ label: 'medistudygo.com', url: 'https://medistudygo.com/' }],
    desktopSlides: [
      {
        src: '/media/projects/medistudygo-desktop.png',
        alt: 'MediStudyGo live desktop storefront showing MBBS, BDS, BPT, and Nursing mind maps',
        badge: 'LIVE STOREFRONT · 50,000+ LEARNERS',
        caption: 'MBBS, BDS, BPT & Nursing Visual Mind Maps, Flashcards & NEET PG Revision Bundles',
      },
      {
        src: '/media/projects/medistudygo-ops-desktop.png',
        alt: 'MediStudyGo 7-Platform Automated Operations Engine',
        badge: '7-PLATFORM OPERATIONS PIPELINE',
        caption: 'Shopify ↔ Shiprocket ↔ DoubleTick WhatsApp ↔ Graphy LMS ↔ Brevo ↔ Razorpay ↔ Sheets',
      },
      {
        src: '/media/projects/medistudygo-flashcards-desktop.png',
        alt: 'MediStudyGo 29,500+ Active-Recall Flashcards & Cohort Analytics',
        badge: '29,500+ FLASHCARDS & COHORT ANALYTICS',
        caption: 'Automated order-to-entitlement provisioning & exam-season cohort broadcasts',
      },
    ],
    mobileSlides: [
      {
        src: '/media/projects/medistudygo-mobile.png',
        alt: 'MediStudyGo mobile storefront',
      },
      {
        src: '/media/projects/medistudygo-mobile-2.png',
        alt: 'MediStudyGo mobile telemetry & operations view',
      },
      {
        src: '/media/projects/medistudygo-mobile-3.png',
        alt: 'MediStudyGo mobile flashcard & recommendation view',
      },
    ],
    bubbles: [
      'This is MediStudyGo. I owned product and platform operations here for 50,000+ medical, dental, and nursing students.',
      'It connects 7 platforms — Shopify, Shiprocket, DoubleTick WhatsApp, Graphy LMS, Brevo, Razorpay, and Google Sheets — so orders unlock course access automatically.',
      'I also structured 29,500+ flashcards, cart-recovery flows, and cohort analytics so peak exam launches shipped without a single bottleneck.',
    ],
  },
  {
    id: 'tour-phoney',
    projectSlug: 'phoney',
    title: 'Phoney',
    subtitle: 'Expressive Android InCallService Dialer & Live Audio Emoji Soundboard',
    role: 'Creator & Lead Android / Web Engineer',
    year: '2026',
    mascotSide: 'right',
    outfit: 'techy',
    tint: '#A87FFB',
    bgLight: '#EAE6F8',
    bgDark: '#121024',
    liveUrl: 'https://phoney.avichalgoyal.me/',
    repoUrl: 'https://github.com/avichal15',
    hosts: [{ label: 'phoney.avichalgoyal.me', url: 'https://phoney.avichalgoyal.me/' }],
    hasPhoneySoundboard: true,
    desktopSlides: [
      {
        src: '/media/projects/phoney-desktop.png',
        alt: 'Phoney interactive 3D web showcase at phoney.avichalgoyal.me',
        badge: 'PHONEY · EXPRESSIVE ANDROID DIALER',
        caption: 'Out of pocket. Into your calls. Companion 3D web showcase + native Android dialer.',
      },
      {
        src: '/media/projects/phoney-dialer-desktop.png',
        alt: 'Phoney Android InCallService architecture and call screens',
        badge: 'KOTLIN INCALLSERVICE · ZERO-CLUTTER DIALER',
        caption: 'Native cellular call controls, fast contact search, and transparent privacy permissions.',
      },
      {
        src: '/media/projects/phoney-themes-desktop.png',
        alt: 'Phoney 4 adaptive themes and 6-Slot Audio Emoji Quick Tray',
        badge: '4 ADAPTIVE THEMES · 6 DEFAULT AUDIO EMOJIS',
        caption: 'Tap any of the 6 Quick Tray Audio Emojis below to hear them right now!',
      },
    ],
    mobileSlides: [
      {
        src: '/media/projects/current-recents.webp',
        alt: 'Phoney Recents screen on Android',
      },
      {
        src: '/media/projects/call.webp',
        alt: 'Phoney live in-call interface on Android',
      },
      {
        src: '/media/projects/current-sounds.webp',
        alt: 'Phoney 6 default Audio Emojis Quick Tray on Android',
      },
    ],
    bubbles: [
      'Next up is Phoney — an everyday Android calling app I built around expressive in-call Audio Emojis.',
      'I built both the native Kotlin InCallService dialer and the interactive 3D web showcase at phoney.avichalgoyal.me.',
      "Want to try it? Press any button in Phoney's 6-slot Quick Tray and you'll hear that Audio Emoji!",
    ],
  },
  {
    id: 'tour-masterplayer',
    projectSlug: 'masterplayer-designs-and-printing',
    title: 'Masterplayer Prints',
    subtitle: '360° WebGL Custom Apparel Studio & 22-Department B2B Print Commerce',
    role: 'Lead Full-Stack & 3D WebGL Architect',
    year: '2026',
    mascotSide: 'left',
    outfit: 'masterplayer',
    tint: '#5EEAD4',
    bgLight: '#F7ECE4',
    bgDark: '#1A1215',
    liveUrl: 'https://masterplayerprints.com/',
    hosts: [{ label: 'masterplayerprints.com', url: 'https://masterplayerprints.com/' }],
    desktopSlides: [
      {
        src: '/media/projects/masterplayer-desktop.png',
        alt: 'Masterplayer Designs & Printing 360 WebGL 3D Customizer Studio',
        badge: 'MASTERPLAYERPRINTS.COM · 360° WEBGL STUDIO',
        caption: 'Interactive 2D/3D custom apparel & merch studio across 22 architectural departments.',
      },
      {
        src: '/media/projects/masterplayer-studio-desktop.png',
        alt: 'Masterplayer 22 merchandise departments bento catalog',
        badge: '22 ARCHITECTURAL MERCHANDISE DEPARTMENTS',
        caption: 'Custom 240 GSM oversized tees, hoodies, corporate kits, drinkware, bags & trophies.',
      },
      {
        src: '/media/projects/masterplayer-b2b-desktop.png',
        alt: 'Masterplayer 3D print slot configurator and 18% GST B2B bulk calculator',
        badge: '3D PRINT SLOTS · 18% GST B2B ENGINE',
        caption: 'Spin garments in 360°, snap logos onto 5 print slots & calculate bulk GST quotes.',
      },
    ],
    mobileSlides: [
      {
        src: '/media/projects/masterplayer-mobile.png',
        alt: 'Masterplayer mobile 3D studio',
      },
      {
        src: '/media/projects/masterplayer-mobile-2.png',
        alt: 'Masterplayer mobile merchandise bento',
      },
      {
        src: '/media/projects/masterplayer-mobile-3.png',
        alt: 'Masterplayer mobile B2B quote engine',
      },
    ],
    bubbles: [
      'Third up is Masterplayer Prints — a B2B and D2C custom printing platform spanning 22 merchandise departments.',
      "In the 360° WebGL Customizer Studio, buyers spin 240 GSM apparel in real time, strip white logo backgrounds automatically, and snap art onto 5 print slots.",
      'It also computes tiered bulk discounts with 18% GST input credit breakdowns and dispatches print-ready specs straight to production.',
    ],
  },
  {
    id: 'tour-trugifting',
    projectSlug: 'trugifting-solutions',
    title: 'TruGifting Solutions',
    subtitle: 'Enterprise Corporate Gifting, Custom Hamper Builder & 360+ Brand Vouchers',
    role: 'Lead Full-Stack Product Engineer',
    year: '2025 – 2026',
    mascotSide: 'right',
    outfit: 'classic',
    tint: '#FB7185',
    bgLight: '#FBF2E3',
    bgDark: '#1C1612',
    liveUrl: 'https://trugiftingsolutions.com/',
    hosts: [{ label: 'trugiftingsolutions.com', url: 'https://trugiftingsolutions.com/' }],
    desktopSlides: [
      {
        src: '/media/projects/trugifting-desktop.png',
        alt: 'TruGifting Solutions enterprise corporate gifting storefront',
        badge: 'TRUGIFTINGSOLUTIONS.COM · 50+ ENTERPRISE CLIENTS',
        caption: 'End-to-end corporate gifting, onboarding kits, and festival hampers for tier-1 teams.',
      },
      {
        src: '/media/projects/trugifting-vouchers-desktop.png',
        alt: 'TruGifting Solutions 360+ brand vouchers and employee R&R rewards catalog',
        badge: '360+ BRAND VOUCHERS · R&R PAYOUTS',
        caption: 'Instant digital gift cards, channel partner incentives, and multi-brand reward catalogs.',
      },
      {
        src: '/media/projects/trugifting-hamper-desktop.png',
        alt: 'TruGifting Solutions interactive custom hamper builder and pan-India fulfillment',
        badge: 'INTERACTIVE HAMPER BUILDER · PAN-INDIA DISPATCH',
        caption: 'Curate custom branded merchandise boxes with live MOQ pricing and B2B quote generation.',
      },
    ],
    mobileSlides: [
      {
        src: '/media/projects/trugifting-mobile.png',
        alt: 'TruGifting Solutions mobile storefront',
      },
      {
        src: '/media/projects/trugifting-mobile-2.png',
        alt: 'TruGifting Solutions mobile brand vouchers view',
      },
      {
        src: '/media/projects/trugifting-mobile-3.png',
        alt: 'TruGifting Solutions mobile welcome kits & hamper builder',
      },
    ],
    bubbles: [
      'Fourth is TruGifting Solutions — an enterprise corporate gifting and rewards platform serving 50+ corporate teams.',
      'HR and procurement leaders can browse 360+ brand vouchers for employee R&R or sales incentives with instant digital fulfillment.',
      'I also engineered the interactive custom hamper builder so teams can assemble branded onboarding kits and generate bulk B2B quotes in seconds.',
    ],
  },
  {
    id: 'tour-session-sync',
    projectSlug: 'omniroute-session-sync',
    title: 'OmniRoute Session Sync',
    subtitle: 'Browser-to-CLI OAuth & Cookie Session Bridge for Multi-Model AI Gateways',
    role: 'Systems & Extension Architect',
    year: '2026',
    mascotSide: 'left',
    outfit: 'techy',
    tint: '#38BDF8',
    bgLight: '#E4EEF9',
    bgDark: '#0B1322',
    liveUrl: 'https://github.com/avichal15/session-sync',
    repoUrl: 'https://github.com/avichal15/session-sync',
    hosts: [{ label: 'github.com/avichal15/session-sync', url: 'https://github.com/avichal15/session-sync' }],
    desktopSlides: [
      {
        src: '/media/projects/session-sync-desktop-1.png',
        alt: 'OmniRoute Session Sync Chrome MV3 extension popup paired and unpaired states',
        badge: 'SESSION-SYNC · CHROME MV3 TO CLI BRIDGE',
        caption: 'Captures authenticated browser sessions and pairs them with local or remote AI gateways.',
      },
      {
        src: '/media/projects/session-sync-desktop-2.png',
        alt: 'OmniRoute Session Sync multi-provider harvesting and cryptographic pairing pipeline',
        badge: 'CRYPTOGRAPHIC PAIRING & FINGERPRINT ALIGNMENT',
        caption: 'Harvests cookies, bearer tokens, UA & sec-ch-ua headers across ChatGPT, Claude, Gemini & Grok.',
      },
      {
        src: '/media/projects/session-sync-desktop-3.png',
        alt: 'OmniRoute Session Sync real-time gateway diagnostics and heartbeat sync',
        badge: 'ZERO-DOWNTIME TOKEN ROTATION',
        caption: 'Background MV3 alarm heartbeats keep CLI tools and SDK agents authenticated without manual copy-paste.',
      },
    ],
    mobileSlides: [
      {
        src: '/media/projects/session-sync-mobile-1.png',
        alt: 'OmniRoute Session Sync paired extension popup',
      },
      {
        src: '/media/projects/session-sync-mobile-2.png',
        alt: 'OmniRoute Session Sync provider health telemetry',
      },
      {
        src: '/media/projects/session-sync-mobile-3.png',
        alt: 'OmniRoute Session Sync cryptographic token pairing view',
      },
    ],
    bubbles: [
      'And fifth: OmniRoute Session Sync — a Chrome Manifest V3 extension and daemon bridge I built at github.com/avichal15/session-sync.',
      'It captures authenticated browser cookies, bearer tokens, and TLS/UA fingerprint hints and syncs them straight into local CLI tools.',
      'With background heartbeat alarms and cryptographic token pairing, multi-provider AI workflows stay authenticated with zero manual copy-paste.',
    ],
  },
];

// ============================================================================
// ALL 18 VERIFIED PROJECTS FOR THE BENTO GRID (#work) & CASE STUDY WINDOW
// ============================================================================
export const ALL_PROJECTS = [
  {
    number: '01',
    slug: 'medistudygo',
    title: 'MediStudyGo',
    subtitle: 'Medical EdTech Platform & 7-System Learner Operations Engine',
    category: 'EdTech & Operations',
    year: '2025 – 2026',
    role: 'Associate – Product & Platform Operations',
    bentoSpan: 'col-6',
    bentoTall: true,
    accentColor: '#0D9488',
    surfaceTint: '#E6F4F1',
    liveUrl: 'https://medistudygo.com/',
    liveLabel: 'Visit medistudygo.com',
    repoUrl: 'https://github.com/avichal15',
    repoLabel: 'GitHub Profile',
    coverImage: '/media/projects/medistudygo-desktop.png',
    stack: [
      'Shopify Storefront',
      'Graphy LMS',
      'Shiprocket API',
      'DoubleTick WhatsApp',
      'Brevo CRM',
      'Razorpay Webhooks',
      'Google Sheets Telemetry',
    ],
    summary:
      'Owned end-to-end product and platform operations for a fast-scaling medical EdTech ecosystem serving 50,000+ MBBS, BDS, BPT, and Nursing students across India.',
    description: [
      'Connected 7 production platforms — Shopify, Shiprocket, DoubleTick WhatsApp, Graphy LMS, Brevo, Razorpay, and Google Sheets — into a unified, zero-bottleneck order-to-entitlement pipeline.',
      'Structured and QA-governed 29,500+ active-recall flashcards, visual mind maps, and NEET PG revision bundles while automating WhatsApp cart recovery and cohort analytics.',
    ],
    metrics: [
      { value: '50,000+', label: 'Medical, Dental & Nursing Learners' },
      { value: '29,500+', label: 'Active-Recall Flashcards Structured' },
      { value: '7 Platforms', label: 'Unified in Real-Time Operations' },
    ],
    slides: [
      {
        src: '/media/projects/medistudygo-desktop.png',
        caption: 'MediStudyGo Storefront — MBBS, BDS, BPT & Nursing Visual Mind Maps & Revision Bundles',
      },
      {
        src: '/media/projects/medistudygo-ops-desktop.png',
        caption: '7-Platform Operations Pipeline & Real-Time Revenue / Channel Telemetry',
      },
      {
        src: '/media/projects/medistudygo-flashcards-desktop.png',
        caption: '29,500+ Active-Recall Flashcards & Automated Cohort Recommendation Engine',
      },
    ],
    mobileSlides: [
      { src: '/media/projects/medistudygo-mobile.png', alt: 'MediStudyGo mobile storefront' },
      { src: '/media/projects/medistudygo-mobile-2.png', alt: 'MediStudyGo mobile telemetry' },
      { src: '/media/projects/medistudygo-mobile-3.png', alt: 'MediStudyGo mobile flashcards' },
    ],
    characterComments: [
      'Welcome inside MediStudyGo! Every purchase here triggers an automated 7-platform relay so students get instant LMS access.',
      'Look at the telemetry view — we tracked channel ROI, cart recovery, and Shiprocket print dispatch in real time.',
      'During peak NEET PG & university exam windows, this pipeline handled thousands of concurrent enrollments without manual intervention.',
    ],
  },
  {
    number: '02',
    slug: 'phoney',
    title: 'Phoney',
    subtitle: 'Expressive Android InCallService Dialer & Live Audio Emoji Soundboard',
    category: 'Android & Interactive Web',
    year: '2026',
    role: 'Creator & Lead Engineer',
    bentoSpan: 'col-6',
    bentoTall: true,
    accentColor: '#7C3AED',
    surfaceTint: '#EAE6F8',
    liveUrl: 'https://phoney.avichalgoyal.me/',
    liveLabel: 'Visit phoney.avichalgoyal.me',
    repoUrl: 'https://github.com/avichal15',
    repoLabel: 'View on GitHub',
    coverImage: '/media/projects/phoney-desktop.png',
    hasPhoneySoundboard: true,
    stack: [
      'Kotlin',
      'Jetpack Compose',
      'Android InCallService',
      'RoleManager API',
      'React 19',
      'Three.js',
      'WebAudio API',
    ],
    summary:
      'A full-featured native Android default dialer replacement built around a 6-slot in-call Audio Emoji Quick Tray, paired with an interactive 3D web showcase.',
    description: [
      'Engineered a native Kotlin & Jetpack Compose Telecom InCallService handling hold, mute, speaker routing, keypad DTMF, and real-time audio emoji injection.',
      'Designed 4 adaptive visual themes (Dark, Light, Neo-Brutalist, Soft Pastel) and shipped a companion web showcase at phoney.avichalgoyal.me with live sound previews.',
    ],
    metrics: [
      { value: '6 Emojis', label: 'Instant Quick-Tray Audio Reactions' },
      { value: '< 180ms', label: 'In-Call Sound Trigger Latency' },
      { value: '4 Themes', label: 'Dark · Light · Neo · Soft' },
    ],
    slides: [
      {
        src: '/media/projects/phoney-desktop.png',
        caption: 'Phoney Companion Web Showcase (phoney.avichalgoyal.me) — Out of pocket. Into your calls.',
      },
      {
        src: '/media/projects/phoney-dialer-desktop.png',
        caption: 'Native Kotlin InCallService Dialer — Recents, Active Call, Quick Tray & Privacy Controls',
      },
      {
        src: '/media/projects/phoney-themes-desktop.png',
        caption: '4 Adaptive Dialer Themes (Dark, Light, Neo, Soft) + 6-Slot Audio Emoji Quick Tray',
      },
    ],
    mobileSlides: [
      { src: '/media/projects/current-recents.webp', alt: 'Phoney Recents screen' },
      { src: '/media/projects/call.webp', alt: 'Phoney Active Call screen' },
      { src: '/media/projects/current-sounds.webp', alt: 'Phoney 6-Slot Audio Emoji Quick Tray' },
    ],
    characterComments: [
      'Phoney replaces a boring system phone app with an expressive dialer that lets you drop Audio Emojis mid-call.',
      'You can test all 6 default Quick Tray sounds — Cheer, Faaah, Fart, Womp Womp, Wow, and Yay — right here!',
      'Everything runs with strict Android permission hygiene: zero contact uploads and zero background tracking.',
    ],
  },
  {
    number: '03',
    slug: 'masterplayer-designs-and-printing',
    title: 'Masterplayer Prints',
    subtitle: '360° WebGL Custom Apparel Studio & 22-Department B2B Print Commerce',
    category: '3D Commerce & WebGL',
    year: '2026',
    role: 'Lead Full-Stack & 3D WebGL Architect',
    bentoSpan: 'col-6',
    bentoTall: false,
    accentColor: '#DC2626',
    surfaceTint: '#F7ECE4',
    liveUrl: 'https://masterplayerprints.com/',
    liveLabel: 'Visit masterplayerprints.com',
    repoUrl: 'https://github.com/avichal15',
    repoLabel: 'GitHub Profile',
    coverImage: '/media/projects/masterplayer-desktop.png',
    stack: [
      'React 19',
      'Three.js / WebGL',
      'Canvas 2D Texture Atlas',
      '22-Dept Bento Catalog',
      '18% GST Calculator',
      'WhatsApp Dispatch',
    ],
    summary:
      'Interactive 360° 3D apparel customization studio and 22-department B2B custom printing marketplace with real-time print-slot mapping and bulk GST pricing.',
    description: [
      'Built an interactive 3D garment configurator where buyers rotate 240 GSM oversized tees and hoodies in 360°, upload custom artwork with automatic white-background removal, and position prints across 5 precision slots.',
      'Architected a 22-department merchandise catalog featuring live MOQ tier pricing, 18% GST input tax credit breakdowns, and automated production spec sheets.',
    ],
    metrics: [
      { value: '22 Depts', label: 'Custom Apparel & Corporate Merch' },
      { value: '360° 3D', label: 'Real-Time WebGL Garment Studio' },
      { value: '5 Slots', label: 'Front · Back · Chest · Sleeves' },
    ],
    slides: [
      {
        src: '/media/projects/masterplayer-desktop.png',
        caption: 'Masterplayer Prints — 360° Interactive 3D Apparel Studio & Storefront',
      },
      {
        src: '/media/projects/masterplayer-studio-desktop.png',
        caption: '22 Architectural Merchandise Departments — Apparel, Bags, Drinkware, Corporate Kits & Awards',
      },
      {
        src: '/media/projects/masterplayer-b2b-desktop.png',
        caption: '5 Precision Print Slots + Automated 18% GST B2B Bulk Quote Engine',
      },
    ],
    mobileSlides: [
      { src: '/media/projects/masterplayer-mobile.png', alt: 'Masterplayer mobile storefront' },
      { src: '/media/projects/masterplayer-mobile-2.png', alt: 'Masterplayer mobile 3D merch studio' },
      { src: '/media/projects/masterplayer-mobile-3.png', alt: 'Masterplayer mobile B2B catalog' },
    ],
    characterComments: [
      'Masterplayer Prints turns custom merch ordering into a tactile 3D studio experience.',
      'Upload any logo, strip its background in one click, and preview it on a 240 GSM tee from every angle.',
      'Procurement teams get instant tiered bulk pricing with full 18% GST input credit calculations.',
    ],
  },
  {
    number: '04',
    slug: 'trugifting-solutions',
    title: 'TruGifting Solutions',
    subtitle: 'Enterprise Corporate Gifting, Custom Hamper Builder & 360+ Brand Vouchers',
    category: 'B2B E-Commerce',
    year: '2025 – 2026',
    role: 'Lead Full-Stack Product Engineer',
    bentoSpan: 'col-6',
    bentoTall: false,
    accentColor: '#D97706',
    surfaceTint: '#FBF2E3',
    liveUrl: 'https://trugiftingsolutions.com/',
    liveLabel: 'Visit trugiftingsolutions.com',
    repoUrl: 'https://github.com/avichal15',
    repoLabel: 'GitHub Profile',
    coverImage: '/media/projects/trugifting-desktop.png',
    stack: [
      'React / Vite',
      'Custom Hamper Configurator',
      '360+ Brand Vouchers',
      'Enterprise R&R Workflows',
      'Automated Quote Engine',
    ],
    summary:
      'B2B corporate gifting and employee rewards platform serving 50+ enterprise clients with an interactive hamper builder and 360+ instant digital brand vouchers.',
    description: [
      'Designed and shipped trugiftingsolutions.com for HR, procurement, and channel marketing teams to curate custom onboarding kits, festive hampers, and executive milestones.',
      'Integrated a 360+ brand voucher catalog alongside a multi-step hamper builder with live budget filtering, MOQ calculators, and instant B2B quotation routing.',
    ],
    metrics: [
      { value: '50+ Clients', label: 'Enterprise & Corporate Teams Served' },
      { value: '360+ Brands', label: 'Instant Digital Gift Vouchers' },
      { value: 'Pan-India', label: 'End-to-End Kit Fulfillment' },
    ],
    slides: [
      {
        src: '/media/projects/trugifting-desktop.png',
        caption: 'TruGifting Solutions — Enterprise Corporate Gifting & Employee R&R Platform',
      },
      {
        src: '/media/projects/trugifting-vouchers-desktop.png',
        caption: '360+ Brand Vouchers & Channel Partner Incentive Program Architecture',
      },
      {
        src: '/media/projects/trugifting-hamper-desktop.png',
        caption: 'Interactive Custom Hamper Builder & Pan-India Welcome Kit Fulfillment',
      },
    ],
    mobileSlides: [
      { src: '/media/projects/trugifting-mobile.png', alt: 'TruGifting mobile storefront' },
      { src: '/media/projects/trugifting-mobile-2.png', alt: 'TruGifting mobile voucher catalog' },
      { src: '/media/projects/trugifting-mobile-3.png', alt: 'TruGifting mobile welcome kits' },
    ],
    characterComments: [
      'TruGifting Solutions powers corporate gifting and employee rewards for 50+ enterprise teams.',
      'From 360+ digital brand vouchers to custom physical welcome kits, everything is built for fast B2B procurement.',
      'Buyers can mix and match hamper items by budget tier and generate a complete quotation in seconds.',
    ],
  },
  {
    number: '05',
    slug: 'omniroute-session-sync',
    title: 'OmniRoute Session Sync',
    subtitle: 'Browser-to-CLI OAuth & Cookie Session Bridge for Multi-Model AI Gateways',
    category: 'Developer Tools & Browser Extensions',
    year: '2026',
    role: 'Systems & Extension Architect',
    bentoSpan: 'col-8',
    bentoTall: false,
    accentColor: '#0284C7',
    surfaceTint: '#E4EEF9',
    liveUrl: 'https://github.com/avichal15/session-sync',
    liveLabel: 'View Session Sync Repo',
    repoUrl: 'https://github.com/avichal15/session-sync',
    repoLabel: 'github.com/avichal15/session-sync',
    coverImage: '/media/projects/session-sync-desktop-1.png',
    stack: [
      'Chrome Manifest V3',
      'JavaScript / Node.js',
      'chrome.cookies API',
      'Cryptographic Token Pairing',
      'Background Alarms',
      'Header & TLS Fingerprint Sync',
    ],
    summary:
      'A Chrome Manifest V3 extension and local/remote daemon bridge that harvests authenticated browser sessions and keeps CLI tools and AI gateways continuously synced.',
    description: [
      'Built a Manifest V3 background service worker and popup UI that captures HttpOnly session cookies, bearer tokens, User-Agent strings, and sec-ch-ua client hints across AI provider domains.',
      'Implemented cryptographic X-Session-Sync-Token pairing, periodic chrome.alarms heartbeats, and instant tab-change delta pushes so local CLI harnesses never suffer expired-token downtime.',
    ],
    metrics: [
      { value: 'Zero-Copy', label: 'Automatic Browser-to-CLI Auth Sync' },
      { value: 'MV3 Alarms', label: 'Continuous Heartbeat Rotation' },
      { value: 'Multi-Host', label: 'Local & Remote Gateway Pairing' },
    ],
    slides: [
      {
        src: '/media/projects/session-sync-desktop-1.png',
        caption: 'OmniRoute Session Sync — Chrome MV3 Extension Paired & Unpaired Diagnostic Views',
      },
      {
        src: '/media/projects/session-sync-desktop-2.png',
        caption: 'Multi-Provider Cookie & Bearer Token Harvesting Pipeline with Fingerprint Alignment',
      },
      {
        src: '/media/projects/session-sync-desktop-3.png',
        caption: 'Real-Time Gateway Diagnostics, Per-Domain Health & One-Click Sync Controls',
      },
    ],
    mobileSlides: [
      { src: '/media/projects/session-sync-mobile-1.png', alt: 'Session Sync paired extension UI' },
      { src: '/media/projects/session-sync-mobile-2.png', alt: 'Session Sync domain telemetry' },
      { src: '/media/projects/session-sync-mobile-3.png', alt: 'Session Sync pairing handshake' },
    ],
    characterComments: [
      'Tired of copying cookies from DevTools into terminal scripts? OmniRoute Session Sync automates the entire bridge.',
      'It pairs your browser with your local gateway using a cryptographic token and syncs session updates on the fly.',
      'Check out the full source code at github.com/avichal15/session-sync!',
    ],
  },
  {
    number: '06',
    slug: 'mahadev-plywood',
    title: 'Mahadev Plywood & Hardware',
    subtitle: 'B2B Architectural Timber Catalog, Sheet Calculator & Contractor Dispatch',
    category: 'B2B Commerce',
    year: '2025 – 2026',
    role: 'Full-Stack Developer',
    bentoSpan: 'col-4',
    bentoTall: false,
    accentColor: '#B45309',
    surfaceTint: '#F5EFE6',
    liveUrl: 'https://github.com/avichal15',
    liveLabel: 'View Project',
    repoUrl: 'https://github.com/avichal15',
    repoLabel: 'GitHub',
    coverImage: '/media/projects/mahadev-plywood.png',
    stack: ['React 19', 'Vite', 'Sheet Estimator', 'Finish Visualizer', 'WhatsApp BOQ'],
    summary:
      'Digital catalog and contractor bill-of-quantities (BOQ) estimator for a regional plywood, laminate, and architectural hardware distributor in Meerut / NCR.',
    description: [
      'Structured 280+ SKUs across marine-grade plywood, HDHMR boards, blockboards, decorative veneers, and architectural fittings.',
      'Built an interactive room-to-sheet calculator that estimates sheet counts, wastage margins, and hardware quantities for instant dealer quotes.',
    ],
    metrics: [
      { value: '280+ SKUs', label: 'Timber, Laminate & Hardware Catalog' },
      { value: '< 15ms', label: 'Instant BOQ Sheet Calculation' },
      { value: '99 Score', label: 'Mobile Lighthouse Performance' },
    ],
    slides: [
      { src: '/media/projects/mahadev-plywood.png', caption: 'Mahadev Plywood & Hardware — B2B Timber Catalog & BOQ Calculator' },
    ],
    characterComments: [
      'Built for architects, interior contractors, and homeowners in Meerut & NCR to estimate plywood and laminate sheets accurately.',
    ],
  },
  {
    number: '07',
    slug: 'chanakya-reel-ai',
    title: 'Chanakya Reel AI',
    subtitle: 'Autonomous Short-Form Video Generation & Beat-Synced FFmpeg Pipeline',
    category: 'Generative AI & Media',
    year: '2026',
    role: 'AI Systems Engineer',
    bentoSpan: 'col-4',
    bentoTall: false,
    accentColor: '#EAB308',
    surfaceTint: '#F4F1E4',
    liveUrl: 'https://github.com/avichal15',
    liveLabel: 'View Pipeline',
    repoUrl: 'https://github.com/avichal15',
    repoLabel: 'GitHub',
    coverImage: '/media/projects/chanakya-reel-ai.png',
    stack: ['Python', 'FFmpeg', 'Gemini Vision', 'Whisper Timestamps', 'TTS Synthesis'],
    summary:
      'End-to-end autonomous vertical video studio turning historical strategy prompts into 60fps 9:16 Reels with AI keyframes, voiceovers, and word-level captions.',
    description: [
      'Orchestrates retention-optimized scriptwriting, neural voice synthesis, Whisper word-boundary alignment, and studio keyframe generation.',
      'Renders broadcast-ready 1080x1920 H.264 MP4 reels with dynamic Ken Burns camera motion and audio ducking.',
    ],
    metrics: [
      { value: '1080x1920', label: '60fps Vertical Cinema Output' },
      { value: '< 90s', label: 'Autonomous End-to-End Render' },
      { value: 'Word-Sync', label: 'Millisecond Caption Alignment' },
    ],
    slides: [
      { src: '/media/projects/chanakya-reel-ai.png', caption: 'Chanakya Reel AI — Autonomous Script-to-MP4 Vertical Video Engine' },
    ],
    characterComments: [
      'Chanakya Reel AI turns a single topic into a complete, beat-synced vertical video in under 90 seconds.',
    ],
  },
  {
    number: '08',
    slug: 'insta-manager',
    title: 'Insta Manager Studio',
    subtitle: 'Creator SPR Analytics, Carousel Retention Auditor & DM Funnel Engine',
    category: 'Creator Growth & Automation',
    year: '2026',
    role: 'Product & Automation Engineer',
    bentoSpan: 'col-4',
    bentoTall: false,
    accentColor: '#DB2777',
    surfaceTint: '#F7E8F0',
    liveUrl: 'https://github.com/avichal15',
    liveLabel: 'View Studio',
    repoUrl: 'https://github.com/avichal15',
    repoLabel: 'GitHub',
    coverImage: '/media/projects/insta-manager.png',
    stack: ['Node.js', 'React', 'Instagram Graph Bridge', 'SPR Telemetry', 'SQLite'],
    summary:
      'Creator growth command center optimizing Sends-Per-Reach (SPR), 20-slide carousel retention, trial reel A/B testing, and automated DM keyword funnels.',
    description: [
      'Tracks high-weight algorithmic signals including DM shares per reach (SPR), watch completion rate (VCR), and 60-minute threaded reply velocity.',
      'Automates keyword-triggered DM resource delivery and audits captions against SEO and 2-2-1 hashtag rules.',
    ],
    metrics: [
      { value: '3–5x Weight', label: 'SPR Share Signal Optimization' },
      { value: '20-Slide', label: 'Carousel Retention Telemetry' },
      { value: '60-Min', label: 'Automated DM & Reply Loop' },
    ],
    slides: [
      { src: '/media/projects/insta-manager.png', caption: 'Insta Manager Studio — SPR Telemetry & Automated DM Funnel Engine' },
    ],
    characterComments: [
      'Insta Manager focuses on the metrics that actually drive reach in 2026: DM Sends-Per-Reach and watch time.',
    ],
  },
  {
    number: '09',
    slug: 'career-ops',
    title: 'Career-Ops Multi-Agent Suite',
    subtitle: 'JD Semantic Parser, LaTeX/PDF Resume Compiler & ATS Intelligence',
    category: 'AI Agents & Developer Tools',
    year: '2026',
    role: 'AI Workflow Architect',
    bentoSpan: 'col-4',
    bentoTall: false,
    accentColor: '#2563EB',
    surfaceTint: '#E8EFFA',
    liveUrl: 'https://github.com/avichal15',
    liveLabel: 'View Suite',
    repoUrl: 'https://github.com/avichal15',
    repoLabel: 'GitHub',
    coverImage: '/media/projects/career-ops.png',
    stack: ['Python', 'Node.js', 'LaTeX PDF Compiler', 'Playwright Worker', 'SQLite'],
    summary:
      'Autonomous career operations pipeline that parses job descriptions, tailors evidence-backed 1-page LaTeX/PDF resumes, and tracks application stages.',
    description: [
      'Maps live job requirements against verified project evidence to compile role-specific, clickable ATS resumes and cover letters in seconds.',
      'Includes automated browser worker verification and zero-slop factual auditing.',
    ],
    metrics: [
      { value: '95%+ ATS', label: 'Semantic Keyword & Evidence Match' },
      { value: '4.2 Sec', label: '1-Page Clickable PDF Compilation' },
      { value: '100%', label: 'Grounded Portfolio Fact Alignment' },
    ],
    slides: [
      { src: '/media/projects/career-ops.png', caption: 'Career-Ops — Autonomous JD Parser & LaTeX Resume Compiler' },
    ],
    characterComments: [
      'Career-Ops compiles role-tailored, clickable 1-page PDFs grounded strictly in real engineering projects.',
    ],
  },
  {
    number: '10',
    slug: 'trading-swarm',
    title: 'Algorithmic Trading Swarm',
    subtitle: 'Multi-Agent Market Regime Detection & Monte Carlo Risk Engine',
    category: 'Quantitative Systems',
    year: '2026',
    role: 'Quantitative Systems Engineer',
    bentoSpan: 'col-6',
    bentoTall: false,
    accentColor: '#059669',
    surfaceTint: '#E6F5EE',
    liveUrl: 'https://github.com/avichal15',
    liveLabel: 'View Architecture',
    repoUrl: 'https://github.com/avichal15',
    repoLabel: 'GitHub',
    coverImage: '/media/projects/trading-swarm.png',
    stack: ['Python', 'NumPy / Pandas', 'Monte Carlo Simulation', 'WebSocket Feeds', 'Risk Gate'],
    summary:
      'Multi-agent quantitative trading research and execution harness with volatility regime classification and 10,000-path Monte Carlo drawdown guardrails.',
    description: [
      'Combines uncorrelated alpha factor agents (trend, mean-reversion, order-flow imbalance, volatility regime) behind a strict Kelly-criterion risk gate.',
      'Validates strategies through walk-forward optimization and Monte Carlo tail-risk stress testing before live routing.',
    ],
    metrics: [
      { value: '10,000x', label: 'Monte Carlo Drawdown Paths' },
      { value: '< 50ms', label: 'Multi-Agent Signal Consensus' },
      { value: 'Strict Gate', label: 'Automated Tail-Risk Protection' },
    ],
    slides: [
      { src: '/media/projects/trading-swarm.png', caption: 'Algorithmic Trading Swarm — Multi-Agent Alpha & Monte Carlo Risk Gate' },
    ],
    characterComments: [
      'Every signal in the Trading Swarm must pass a 10,000-path Monte Carlo drawdown gate before execution.',
    ],
  },
  {
    number: '11',
    slug: 'microcoach',
    title: 'MicroCoach AI',
    subtitle: 'Real-Time Behavioral Micro-Coaching & Habit Loop Companion',
    category: 'AI Product & EdTech',
    year: '2025 – 2026',
    role: 'Product & Full-Stack Engineer',
    bentoSpan: 'col-6',
    bentoTall: false,
    accentColor: '#4F46E5',
    surfaceTint: '#EAEAF8',
    liveUrl: 'https://github.com/avichal15',
    liveLabel: 'View MicroCoach',
    repoUrl: 'https://github.com/avichal15',
    repoLabel: 'GitHub',
    coverImage: '/media/projects/microcoach-desktop.png',
    stack: ['React', 'TypeScript', 'Gemini API', 'Behavioral Nudges', 'PWA'],
    summary:
      'bite-sized AI coaching workspace that converts long-term goals into 2-minute daily behavioral check-ins and adaptive reflection loops.',
    description: [
      'Designed an approachable, low-friction coaching interface using Stitch design tokens and real-time LLM feedback.',
      'Tracks streak momentum, cognitive load, and actionable next steps without overwhelming the user.',
    ],
    metrics: [
      { value: '2-Min', label: 'Daily Micro-Coaching Check-Ins' },
      { value: 'Adaptive', label: 'Context-Aware Reflection Prompts' },
      { value: 'Zero Friction', label: 'Mobile & Desktop PWA' },
    ],
    slides: [
      { src: '/media/projects/microcoach-desktop.png', caption: 'MicroCoach AI — Interactive Behavioral Coaching Workspace' },
    ],
    characterComments: [
      'MicroCoach breaks big goals down into 2-minute daily actions that actually stick.',
    ],
  },
  {
    number: '12',
    slug: 'zoho-crm-automation',
    title: 'Zoho CRM ↔ 5-Channel Sync',
    subtitle: 'Unified E-Commerce, Inventory & Logistics Webhook Orchestrator',
    category: 'Enterprise Automation',
    year: '2025',
    role: 'Backend & Integrations Engineer',
    bentoSpan: 'col-4',
    bentoTall: false,
    accentColor: '#16A34A',
    surfaceTint: '#E8F6EC',
    liveUrl: 'https://github.com/avichal15',
    liveLabel: 'View Integration',
    repoUrl: 'https://github.com/avichal15',
    repoLabel: 'GitHub',
    coverImage: '/media/projects/zoho-crm-automation.png',
    stack: ['Node.js', 'Zoho CRM API', 'Shopify', 'Amazon SP-API', 'Shiprocket', 'India Post'],
    summary:
      'Production integration engine synchronizing Zoho CRM with Shopify, Amazon, Shiprocket, and India Post via REST webhooks and CSV migration pipelines.',
    description: [
      'Eliminated manual data entry across sales and logistics teams by unifying order ingestion, AWB tracking, and customer lifecycle updates.',
      'Built idempotent retry queues, dead-letter error handling, and automated reconciliation dashboards.',
    ],
    metrics: [
      { value: '5 Channels', label: 'Zoho · Shopify · Amazon · Logistics' },
      { value: '100%', label: 'Idempotent Webhook Reliability' },
      { value: 'Real-Time', label: 'Order & AWB Status Sync' },
    ],
    slides: [
      { src: '/media/projects/zoho-crm-automation.png', caption: 'Zoho CRM ↔ 5-Channel E-Commerce & Logistics Sync Engine' },
    ],
    characterComments: [
      'This pipeline connected Zoho CRM to Shopify, Amazon, Shiprocket, and India Post in real time.',
    ],
  },
  {
    number: '13',
    slug: 'openinssist',
    title: 'OpenInssist',
    subtitle: 'Local-First AI Engineering Workspace with MCP Tool Execution',
    category: 'AI Developer Tools',
    year: '2026',
    role: 'Systems Engineer',
    bentoSpan: 'col-4',
    bentoTall: false,
    accentColor: '#6366F1',
    surfaceTint: '#ECECFB',
    liveUrl: 'https://github.com/avichal15',
    liveLabel: 'View Project',
    repoUrl: 'https://github.com/avichal15',
    repoLabel: 'GitHub',
    coverImage: '/media/projects/openinssist.png',
    stack: ['TypeScript', 'React', 'Node.js', 'MCP Protocol', 'Vector Memory'],
    summary:
      'Extensible local-first AI workspace combining multi-model routing, Model Context Protocol (MCP) tool execution, and persistent semantic memory.',
    description: [
      'Provides a unified developer cockpit for code search, terminal execution, and episodic memory recall across local and cloud LLMs.',
    ],
    metrics: [
      { value: 'MCP Native', label: 'Deterministic Tool Execution' },
      { value: 'Hybrid', label: 'Local + Frontier Cloud Routing' },
      { value: 'Persistent', label: 'Semantic Project Memory' },
    ],
    slides: [
      { src: '/media/projects/openinssist.png', caption: 'OpenInssist — Local-First AI Engineering Workspace' },
    ],
    characterComments: [
      'OpenInssist brings MCP tools and semantic memory into a clean, local-first developer workspace.',
    ],
  },
  {
    number: '14',
    slug: 'rizzler',
    title: 'Rizzler AI',
    subtitle: 'Vision-Grounded Conversational Coach & Sub-Second Reply Engine',
    category: 'Consumer AI App',
    year: '2026',
    role: 'Full-Stack Creator',
    bentoSpan: 'col-4',
    bentoTall: false,
    accentColor: '#E11D48',
    surfaceTint: '#F9E8EC',
    liveUrl: 'https://github.com/avichal15',
    liveLabel: 'View Project',
    repoUrl: 'https://github.com/avichal15',
    repoLabel: 'GitHub',
    coverImage: '/media/projects/rizzler.png',
    stack: ['React', 'Vision VLM', 'Streaming SSE', 'Node.js', 'PWA'],
    summary:
      'Conversational AI assistant that parses chat screenshots via Vision VLMs and generates tone-calibrated, natural replies in under 600ms.',
    description: [
      'Supports multi-persona tone sliders, instant screenshot OCR context extraction, and one-tap clipboard actions.',
    ],
    metrics: [
      { value: '< 600ms', label: 'First-Token Streaming Reply' },
      { value: 'Vision OCR', label: 'Instant Screenshot Context Parse' },
      { value: '4 Tones', label: 'Calibrated Persona Modes' },
    ],
    slides: [
      { src: '/media/projects/rizzler.png', caption: 'Rizzler AI — Vision-Grounded Conversational Coach' },
    ],
    characterComments: [
      'Upload any chat screenshot and Rizzler AI crafts a sharp, natural reply matched to your tone.',
    ],
  },
  {
    number: '15',
    slug: 'dhuri-hoon-main',
    title: 'Dhuri Hoon Main',
    subtitle: 'Interactive Audio-Visual Storytelling & Beat-Synced Web Experience',
    category: 'Creative Coding & WebAudio',
    year: '2026',
    role: 'Creative Technologist',
    bentoSpan: 'col-3',
    bentoTall: false,
    accentColor: '#CA8A04',
    surfaceTint: '#F6F0DF',
    liveUrl: 'https://github.com/avichal15',
    liveLabel: 'View Project',
    repoUrl: 'https://github.com/avichal15',
    repoLabel: 'GitHub',
    coverImage: '/media/projects/dhuri-hoon-main.png',
    stack: ['React', 'WebAudio API', 'Canvas 2D / WebGL', 'Kinetic Typography'],
    summary:
      'Beat-synced interactive web experience pairing kinetic Hindi/English typography with WebAudio frequency analysis and shareable story cards.',
    description: [
      'Synchronizes visual scene transitions and lyric reveals directly to the WebAudio hardware clock at 60fps.',
    ],
    metrics: [
      { value: '60fps', label: 'Audio-Reactive Visual Stage' },
      { value: 'WebAudio', label: 'Hardware-Clock Lyric Sync' },
      { value: 'Instant', label: 'Social Story Card Export' },
    ],
    slides: [
      { src: '/media/projects/dhuri-hoon-main.png', caption: 'Dhuri Hoon Main — Interactive Audio-Visual Web Experience' },
    ],
    characterComments: [
      'Every frame and lyric transition here is locked to the WebAudio frequency spectrum.',
    ],
  },
  {
    number: '16',
    slug: 'karo',
    title: 'Karo Productivity',
    subtitle: 'Keyboard-First Action Queue, Sprint Timeboxer & Habit Engine',
    category: 'Productivity Web App',
    year: '2025 – 2026',
    role: 'Frontend Architect',
    bentoSpan: 'col-3',
    bentoTall: false,
    accentColor: '#EA580C',
    surfaceTint: '#F8EDE4',
    liveUrl: 'https://github.com/avichal15',
    liveLabel: 'View Project',
    repoUrl: 'https://github.com/avichal15',
    repoLabel: 'GitHub',
    coverImage: '/media/projects/karo.png',
    stack: ['React', 'TypeScript', 'IndexedDB', 'Command Palette', 'Tailwind CSS'],
    summary:
      'Zero-bloat, keyboard-driven task and sprint execution workspace with sub-50ms command palette actions and offline-first persistence.',
    description: [
      'Designed for high-velocity daily execution with instant hotkey navigation, Pomodoro focus blocks, and streak telemetry.',
    ],
    metrics: [
      { value: '< 50ms', label: 'Command Palette Response' },
      { value: '100%', label: 'Offline-First Local Storage' },
      { value: 'Hotkey', label: 'Zero-Mouse Task Triage' },
    ],
    slides: [
      { src: '/media/projects/karo.png', caption: 'Karo — Keyboard-First Action Queue & Sprint Timeboxer' },
    ],
    characterComments: [
      'Karo is built for speed: hit Cmd+K, queue your sprint tasks, and execute without touching the mouse.',
    ],
  },
  {
    number: '17',
    slug: 'remotion-studio',
    title: 'Remotion Launch Studio',
    subtitle: 'Programmatic React-to-MP4 Product Walkthrough & 3D Camera Rig',
    category: 'Programmatic Video',
    year: '2026',
    role: 'Creative Engineer',
    bentoSpan: 'col-3',
    bentoTall: false,
    accentColor: '#0284C7',
    surfaceTint: '#E5F1F8',
    liveUrl: 'https://github.com/avichal15',
    liveLabel: 'View Studio',
    repoUrl: 'https://github.com/avichal15',
    repoLabel: 'GitHub',
    coverImage: '/media/projects/remotion-studio.png',
    stack: ['Remotion', 'React 19', 'Three.js', 'Spring Physics', 'FFmpeg'],
    summary:
      'Programmatic video rendering suite turning React components and 3D device frames into deterministic 60fps launch trailers.',
    description: [
      'Uses mathematical spring physics, parameterized props, and automated FFmpeg audio mastering for repeatable product videos.',
    ],
    metrics: [
      { value: '60fps', label: 'Deterministic Frame Rendering' },
      { value: 'React->MP4', label: 'Code-Driven Video Pipelines' },
      { value: '3D Rig', label: 'Spring-Physics Camera Motion' },
    ],
    slides: [
      { src: '/media/projects/remotion-studio.png', caption: 'Remotion Launch Studio — Programmatic React-to-MP4 Video Engine' },
    ],
    characterComments: [
      'Why edit launch videos by hand when you can write React components and render 60fps MP4s deterministically?',
    ],
  },
  {
    number: '18',
    slug: 'maus',
    title: 'Maus Browser Agent',
    subtitle: 'Accessibility-Tree DOM Grounding & Self-Healing Web Automation',
    category: 'Autonomous Agents',
    year: '2026',
    role: 'Agent Systems Engineer',
    bentoSpan: 'col-3',
    bentoTall: false,
    accentColor: '#9333EA',
    surfaceTint: '#F1E8F9',
    liveUrl: 'https://github.com/avichal15',
    liveLabel: 'View Agent',
    repoUrl: 'https://github.com/avichal15',
    repoLabel: 'GitHub',
    coverImage: '/media/projects/maus.png',
    stack: ['Python', 'Node.js', 'CDP / Playwright', 'Accessibility Tree', 'Agent Loop'],
    summary:
      'High-speed browser automation agent that operates on compact accessibility tree refs (@eN) instead of slow, token-heavy screenshot loops.',
    description: [
      'Extracts interactive DOM elements with bounding rects and dispatches verified click/type actions with deterministic post-condition checks.',
    ],
    metrics: [
      { value: '18ms', label: 'Accessibility Tree Snapshot' },
      { value: '85% Less', label: 'Context Token Consumption' },
      { value: 'Verified', label: 'Post-Action DOM Assertions' },
    ],
    slides: [
      { src: '/media/projects/maus.png', caption: 'Maus — Accessibility-Tree Grounded Browser Agent Harness' },
    ],
    characterComments: [
      'Maus reads the browser accessibility tree in 18ms so web agents can act fast without screenshot bloat.',
    ],
  },
];

export const ALL_WORK_BY_SLUG = Object.fromEntries(
  ALL_PROJECTS.map((project) => [project.slug, project])
);

// ============================================================================
// 5 USER-APPROVED CERTIFICATIONS & CREDENTIALS (#certifications)
// ============================================================================
export const CERTIFICATIONS = [
  {
    number: '01',
    slug: 'alpha-dsa-java',
    title: 'Alpha — Data Structures & Algorithms in Java',
    issuer: 'Apna College',
    issueDate: '2024',
    credentialId: '66369520abe8a8bb500f4cc4',
    bentoSpan: 'col-6',
    accentColor: '#EAB308',
    surfaceTint: '#FAF3DF',
    verifyUrl: 'https://drive.google.com/file/d/1XW-d99bUjhoESE_QPKTfft6neT_WcdFQ/view',
    verifyLabel: 'View Official Certificate',
    secondaryUrl: '/media/certifications/alpha-dsa-java.pdf',
    secondaryLabel: 'Download PDF',
    coverImage: '/media/certifications/cert-alpha-dsa.png',
    skills: [
      'Java',
      'Data Structures & Algorithms',
      'Trees & Graphs',
      'Dynamic Programming',
      'Heaps & Hashing',
      'Time & Space Complexity',
    ],
    summary:
      'Completed intensive algorithmic problem-solving and data structures mastery in Java (Alpha Batch 3.0), covering 300+ problems across trees, graphs, dynamic programming, recursion, tries, and asymptotic complexity.',
    highlights: [
      'Mastered core and advanced data structures in Java: Arrays, Linked Lists, Stacks, Queues, Binary Trees, BSTs, Heaps, HashMaps, Tries, and Graph representations.',
      'Solved 300+ algorithmic problems spanning Greedy strategies, Divide & Conquer, Backtracking, Segment Trees, and Dynamic Programming.',
      'Applied strict time and space complexity optimization to production backend and systems engineering challenges.',
    ],
  },
  {
    number: '02',
    slug: 'full-stack-web-development-delta',
    title: 'Full-Stack Web Development (Delta — MERN Stack)',
    issuer: 'Apna College',
    issueDate: '2024',
    credentialId: 'DELTA-5.0-MERN',
    bentoSpan: 'col-6',
    accentColor: '#2563EB',
    surfaceTint: '#E8EFFA',
    verifyUrl: 'https://www.apnacollege.in/course/delta-5',
    verifyLabel: 'View Program Curriculum',
    coverImage: '/media/certifications/cert-delta-webdev.png',
    skills: [
      'React',
      'Node.js',
      'Express.js',
      'MongoDB & SQL',
      'REST APIs',
      'JWT & OAuth Security',
      'Modern CSS & Tailwind',
    ],
    summary:
      'Comprehensive end-to-end full-stack web engineering track covering modern frontend architecture in React, scalable Node.js & Express APIs, relational and NoSQL database design, authentication, and cloud deployment.',
    highlights: [
      'Engineered responsive, accessible frontend interfaces using semantic HTML5, modern CSS Grid/Flexbox, JavaScript ES6+, and React component architectures.',
      'Built production RESTful APIs with Node.js and Express, implementing session/JWT authentication, middleware validation, and rate-limiting.',
      'Designed normalized SQL schemas and MongoDB document models with indexing, aggregation pipelines, and cloud deployment workflows.',
    ],
  },
  {
    number: '03',
    slug: 'foundations-of-business-intelligence',
    title: 'Foundations of Business Intelligence',
    issuer: 'Google',
    issueDate: 'May 14, 2024',
    credentialId: 'GD9A2LQJSAG2',
    bentoSpan: 'col-4',
    accentColor: '#0284C7',
    surfaceTint: '#E5F2FA',
    verifyUrl: '/media/certifications/cert-google-bi.png',
    verifyLabel: 'View Verified Credential',
    coverImage: '/media/certifications/cert-google-bi.png',
    skills: [
      'Business Intelligence',
      'ETL & Data Pipelines',
      'Data Modeling',
      'KPI Dashboards',
      'Stakeholder Reporting',
      'Decision Intelligence',
    ],
    summary:
      'Authorized by Google and signed by Amanda Brophy (Global Director of Google Career Certificates). Validates core expertise in transforming raw operational data into actionable BI pipelines, dimensional models, and executive KPI dashboards.',
    highlights: [
      'Mastered the end-to-end Business Intelligence lifecycle: stakeholder requirement gathering, data source auditing, ETL pipeline design, and metric governance.',
      'Designed high-signal executive dashboards and cohort monitoring models that directly power product and e-commerce operations.',
      'Applied BI frameworks to unify multi-channel order, fulfillment, and learner retention telemetry in production.',
    ],
  },
  {
    number: '04',
    slug: 'programming-in-r-data-science',
    title: 'Programming in R & Data Science Analytics',
    issuer: 'Google & IIT Madras (NPTEL)',
    issueDate: '2023 – 2024',
    credentialId: 'NPTEL23CS97S35830272',
    bentoSpan: 'col-4',
    accentColor: '#0D9488',
    surfaceTint: '#E6F4F1',
    verifyUrl: 'https://archive.nptel.ac.in/noc/Ecertificate/?q=NPTEL23CS97S3583027210022409',
    verifyLabel: 'Verify Official Certificate',
    secondaryUrl: '/media/certifications/programming-in-r-data-science.pdf',
    secondaryLabel: 'View Certificate PDF',
    coverImage: '/media/certifications/cert-google-r.png',
    skills: [
      'R Programming',
      'Tidyverse & dplyr',
      'ggplot2 Visualization',
      'Statistical Modeling',
      'Regression & Classification',
      'Linear Algebra in R',
    ],
    summary:
      'Verified credential in R programming, statistical data analysis, and engineering data science. Covers RStudio workflows, Tidyverse data wrangling, ggplot2 visualization, hypothesis testing, linear/logistic regression, and clustering.',
    highlights: [
      'Wrote vectorized R scripts, custom functions, and Tidyverse (dplyr, tidyr, readr) pipelines to clean, transform, and model complex datasets.',
      'Implemented linear algebra foundations, optimization algorithms, multivariate regression, and classification models in R.',
      'Created publication-grade visual diagnostics and reproducible analytical reports using ggplot2 and R Markdown.',
    ],
  },
  {
    number: '05',
    slug: 'google-developer-program-credentials',
    title: 'Google Developer Program & Gen AI Academy APAC',
    issuer: 'Google for Developers',
    issueDate: '2025 – 2026',
    credentialId: 'GDP-GENAI-APAC-C3',
    bentoSpan: 'col-4',
    accentColor: '#D97706',
    surfaceTint: '#FBF2E3',
    verifyUrl: 'https://developers.google.com/profile/badges/community/gear',
    verifyLabel: 'View Google Developer Badge',
    secondaryUrl: 'https://me.developers.google.com/u/me',
    secondaryLabel: 'Google Developer Profile',
    coverImage: '/media/certifications/cert-google-dev-program.png',
    skills: [
      'Gemini API',
      'Vertex AI',
      'Gen AI Academy APAC',
      'Google Cloud Architecture',
      'Agentic Workflows',
      'Google Developer Program',
    ],
    summary:
      'Active Google Developer Program Premium member and Gen AI Academy APAC (Cohort 3) credential holder, recognized with official Google for Developers Community Gear and Cloud AI badges.',
    highlights: [
      'Completed the Google Developer Program Gen AI Academy APAC Edition (Cohort 3), building production multimodal and agentic applications with Gemini and Vertex AI.',
      'Earned the official Google for Developers Community Gear credential and Premium Tier developer benefits on me.developers.google.com.',
      'Shipped live Gemini Vision, Google Vids, and Vertex AI integrations across production web and creative automation systems.',
    ],
  },
];

export const CERTIFICATIONS_BY_SLUG = Object.fromEntries(
  CERTIFICATIONS.map((cert) => [cert.slug, cert])
);

export function getAdjacentProjects(slug) {
  const index = ALL_PROJECTS.findIndex((p) => p.slug === slug);
  if (index === -1) {
    return {
      prev: ALL_PROJECTS[ALL_PROJECTS.length - 1],
      next: ALL_PROJECTS[0],
    };
  }
  const prev = ALL_PROJECTS[(index - 1 + ALL_PROJECTS.length) % ALL_PROJECTS.length];
  const next = ALL_PROJECTS[(index + 1) % ALL_PROJECTS.length];
  return { prev, next };
}

export function getAdjacentCertifications(slug) {
  const index = CERTIFICATIONS.findIndex((c) => c.slug === slug);
  if (index === -1) {
    return {
      prev: CERTIFICATIONS[CERTIFICATIONS.length - 1],
      next: CERTIFICATIONS[0],
    };
  }
  const prev = CERTIFICATIONS[(index - 1 + CERTIFICATIONS.length) % CERTIFICATIONS.length];
  const next = CERTIFICATIONS[(index + 1) % CERTIFICATIONS.length];
  return { prev, next };
}

