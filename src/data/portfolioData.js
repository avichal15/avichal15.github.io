export const OWNER_PROFILE = {
  name: 'Avichal Goyal',
  roleTitle: 'Software Developer',
  batmanRoleTitle: 'Software Developer // Gotham Night Shift',
  heroLeadBeforeBatman:
    'I’m a product-minded software engineer who builds web products, AI tools, and automations that make real-world work easier. And occasionally, I’m ',
  heroBatmanWord: 'Batman',
  aboutText:
    'Hi, I am Avichal Goyal — a Computer Science graduate from SRM University (2021–2025) and full-stack engineer focused on AI tools and business automation. After automating 7-platform operations at MediStudyGo, I began my independent journey shipping B2B platforms, Android apps, and open-source AI infrastructure.',
  batmanHeroQuip:
    'I only code in black. And sometimes, very, very dark grey. Scroll down to inspect the Batcomputer.',
  bentoTooltipNormal:
    'All 10 projects in a Bento box! Click any project to inspect it right inside the site.',
  bentoTooltipBatman:
    'All 10 Batcomputer files in a Bento box! Click any classified project to inspect it right inside the site.',
  location: 'New Delhi / NCR, India',
  email: 'avichalgoyal15@gmail.com',
  phone: '+91 9667665882',
  githubUrl: 'https://github.com/avichal15',
  linkedinUrl: 'https://www.linkedin.com/in/avichalgoyal007/',
  googleDeveloperUrl: 'https://developers.google.com/profile/badges/community/gear',
  gothamModeNote:
    'Includes a LEGO Batman Batcave & Batcomputer transformation mode.',
};

export const PROFILE = OWNER_PROFILE;

// Phoney's exact 6 Default Quick Tray Audio Emojis (verified from phoney.avichalgoyal.me)
export const PHONEY_AUDIO_EMOJIS = [
  {
    slot: 1,
    id: 'cheer',
    emoji: '👏',
    icon: '/reactions/emoji_u1f44f.svg',
    src: '/sounds/original/cheer.wav',
    emotion: 'laugh',
    label: 'Cheer',
    color: '#FACC15',
    quip: 'Crowd goes wild! Instant applause right inside the call.',
  },
  {
    slot: 2,
    id: 'faaah',
    emoji: '😱',
    icon: '/reactions/emoji_u1f631.svg',
    src: '/sounds/original/faaah.wav',
    emotion: 'surprised',
    label: 'Faaah',
    color: '#F97316',
    quip: 'FAAAAH! For dramatic plot twists on the line.',
  },
  {
    slot: 3,
    id: 'fart',
    emoji: '💨',
    icon: '/reactions/emoji_u1f4a8.svg',
    src: '/sounds/original/fart.wav',
    emotion: 'cheeky',
    label: 'Fart',
    color: '#22C55E',
    quip: 'Pffft! Because every close friend group needs a raspberry button.',
  },
  {
    slot: 4,
    id: 'wompwomp',
    emoji: '😑',
    icon: '/reactions/emoji_u1f611.svg',
    src: '/sounds/original/womp-womp.wav',
    emotion: 'sad',
    label: 'Womp Womp',
    color: '#38BDF8',
    quip: 'Womp womp... sad trombone when plans get cancelled.',
  },
  {
    slot: 5,
    id: 'wow',
    emoji: '🤩',
    icon: '/reactions/emoji_u1f929.svg',
    src: '/sounds/original/wow.wav',
    emotion: 'surprised',
    label: 'Wow',
    color: '#A855F7',
    quip: 'Woooow! High-energy hype without interrupting the speaker.',
  },
  {
    slot: 6,
    id: 'yay',
    emoji: '🙌',
    icon: '/reactions/emoji_u1f64c.svg',
    src: '/sounds/original/yay.wav',
    emotion: 'laugh',
    label: 'Yay!',
    color: '#EC4899',
    quip: 'YAY! Celebration fanfare delivered in under 180ms.',
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
    accent: '#FFD000',
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
    accent: '#FFD000',
    showHelmet: true,
    showCape: true,
    tagline: 'I only code in black. And sometimes, very, very dark grey.',
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
  "Hi, I'm Avichal! Scroll down and I'll walk you through my favorite builds.",
  "Oh hi, you're here! Want the guided tour?",
  'You can grab and drag me around — or double-click me for a trick.',
  'Click "Batman." in the headline if you want to enter the Batcave.',
];

// ============================================================================
// 5 GUIDED TOUR CHAPTERS (Concise 1-sentence speech bubbles above head,
// strictly separated TruGifting & Masterplayer, pattern-matched slides)
// ============================================================================
export const TOUR_CHAPTERS = [
  {
    id: 'tour-medistudygo',
    code: '01.01',
    batmanCode: 'BATCOMPUTER LOG // FILE 01.01',
    projectSlug: 'medistudygo',
    title: 'MediStudyGo',
    subtitle: 'Medical EdTech Platform & 7-System Learner Operations Engine',
    role: 'Associate – Product & Platform Operations',
    year: '2025 – 2026',
    mascotSide: 'left',
    outfit: 'doctor',
    tint: '#FFD000',
    bgLight: '#EAE6DF',
    bgDark: '#0B0C0E',
    liveUrl: 'https://medistudygo.com/',
    hosts: [{ label: 'medistudygo.com', url: 'https://medistudygo.com/' }],
    desktopSlides: [
      {
        src: '/projects/medistudygo/desktop-hero.webp',
        alt: 'MediStudyGo live desktop storefront showing MBBS, BDS, BPT, and Nursing mind maps',
        badge: 'LIVE STOREFRONT · 50,000+ LEARNERS',
        caption: 'MBBS, BDS & Nursing visual mind maps, flashcards, and NEET PG bundles.',
      },
      {
        src: '/projects/medistudygo/desktop-feature.webp',
        alt: 'MediStudyGo product catalog and 7-platform automated operations',
        badge: '7-PLATFORM AUTOMATED BRAIN',
        caption: 'Shopify ↔ Shiprocket ↔ DoubleTick WhatsApp ↔ Graphy LMS ↔ Brevo ↔ Razorpay.',
      },
      {
        src: '/projects/medistudygo/desktop-catalog.webp',
        alt: 'MediStudyGo student learning experience and revision bundles',
        badge: '29,500+ ACTIVE-RECALL FLASHCARDS',
        caption: 'Automated course unlocks, print dispatch, and exam-season student broadcasts.',
      },
    ],
    mobileSlides: [
      {
        src: '/projects/medistudygo/mobile-preview.webp',
        alt: 'MediStudyGo mobile storefront',
      },
      {
        src: '/projects/medistudygo/mobile-courses.webp',
        alt: 'MediStudyGo mobile courses & mind maps',
      },
      {
        src: '/projects/medistudygo/mobile-bundles.webp',
        alt: 'MediStudyGo mobile student reviews & bundles',
      },
    ],
    bubbles: [
      'MediStudyGo serves 50,000+ medical students with visual mind maps and flashcards.',
      'I connected Shopify, Graphy LMS, Shiprocket, and WhatsApp into one automated workflow.',
      'Every order now unlocks courses and dispatches print notes automatically in seconds.',
    ],
  },
  {
    id: 'tour-phoney',
    code: '02.01',
    batmanCode: 'BATCOMPUTER LOG // FILE 02.01',
    projectSlug: 'phoney',
    title: 'Phoney',
    subtitle: 'Expressive Android 15 InCallService Dialer & Live Audio Emoji Soundboard',
    role: 'Creator & Lead Android / Web Engineer',
    year: '2026',
    mascotSide: 'right',
    outfit: 'techy',
    tint: '#A87FFB',
    bgLight: '#B8C4E8',
    bgDark: '#0B0C0E',
    liveUrl: 'https://phoney.avichalgoyal.me/',
    repoUrl: 'https://github.com/avichal15/calling-app-',
    hosts: [{ label: 'phoney.avichalgoyal.me', url: 'https://phoney.avichalgoyal.me/' }],
    hasPhoneySoundboard: true,
    desktopSlides: [
      {
        src: '/projects/phoney/desktop-hero.webp',
        alt: 'Phoney interactive 3D web showcase at phoney.avichalgoyal.me',
        badge: 'PHONEY · ANDROID 15 DIALER',
        caption: 'Out of pocket. Into your calls — native Android 15 dialer & 3D web showcase.',
      },
      {
        src: '/projects/phoney/android-dialer.webp',
        alt: 'Phoney 6 default Audio Emojis Quick Tray showcase',
        badge: 'LIVE IN-CALL AUDIO EMOJIS',
        caption: 'Six one-tap audio reactions inside live calls — try the tray right below!',
      },
      {
        src: '/projects/phoney/audio-emojis.webp',
        alt: 'Phoney adaptive themes, silent call recording, and local privacy',
        badge: 'SILENT RECORDING & ADAPTIVE THEMES',
        caption: 'Record calls cleanly without announcement alerts across 4 adaptive themes.',
      },
    ],
    mobileSlides: [
      {
        src: '/media/projects/call.webp',
        alt: 'Phoney live in-call screen with Record and Audio Emojis controls',
      },
      {
        src: '/projects/phoney/mobile-sounds.webp',
        alt: 'Phoney 6 default Audio Emojis Quick Tray on Android',
      },
      {
        src: '/media/projects/theme-neo.webp',
        alt: 'Phoney adaptive dialer theme and call interface on Android',
      },
    ],
    bubbles: [
      'Phoney is my custom Android 15 dialer with silent call recording and live Audio Emojis.',
      'I built the native Kotlin InCallService and this 3D showcase at phoney.avichalgoyal.me.',
      'Tap any of the 6 Audio Emoji buttons in the tray to hear them right now!',
    ],
  },
  {
    id: 'tour-trugifting',
    code: '03.01',
    batmanCode: 'BATCOMPUTER LOG // FILE 03.01',
    projectSlug: 'trugifting-solutions',
    title: 'TruGifting Solutions',
    subtitle: 'Enterprise B2B Corporate Gifting, Custom Hamper Builder & 360+ Brand Vouchers',
    role: 'Lead Full-Stack Product Engineer',
    year: '2025 – 2026',
    mascotSide: 'left',
    outfit: 'classic',
    tint: '#FB7185',
    bgLight: '#EAE6DF',
    bgDark: '#0B0C0E',
    liveUrl: 'https://www.trugiftingsolutions.com/',
    hosts: [
      { label: 'trugiftingsolutions.com', url: 'https://www.trugiftingsolutions.com/' },
    ],
    desktopSlides: [
      {
        src: '/projects/trugifting/desktop-hero.webp',
        alt: 'TruGifting Solutions enterprise corporate gifting storefront',
        badge: 'TRUGIFTINGSOLUTIONS.COM · B2B GIFTING',
        caption: 'End-to-end corporate gifting, onboarding kits, and festival hampers.',
      },
      {
        src: '/projects/trugifting/voucher-section.webp',
        alt: 'TruGifting Solutions 360+ brand vouchers and employee R&R rewards catalog',
        badge: '360+ BRAND VOUCHERS · R&R PAYOUTS',
        caption: 'Instant digital gift cards and employee reward catalogs for 50+ enterprises.',
      },
      {
        src: '/projects/trugifting/hamper-builder.webp',
        alt: 'TruGifting Solutions interactive custom hamper builder and pan-India fulfillment',
        badge: 'INTERACTIVE HAMPER BUILDER',
        caption: 'Build custom branded swag boxes with live MOQ tiers and instant B2B quotes.',
      },
    ],
    mobileSlides: [
      {
        src: '/projects/trugifting/mobile-preview.webp',
        alt: 'TruGifting Solutions mobile storefront',
      },
      {
        src: '/projects/trugifting/mobile-vouchers.webp',
        alt: 'TruGifting Solutions mobile brand vouchers view',
      },
      {
        src: '/projects/trugifting/mobile-hampers.webp',
        alt: 'TruGifting Solutions mobile welcome kits & hamper builder',
      },
    ],
    bubbles: [
      'TruGifting Solutions was my first independent client — a B2B corporate gifting platform.',
      'HR and procurement teams browse 360+ instant brand vouchers for employee rewards.',
      'I also built a live hamper configurator with MOQ pricing and bulk quote generation.',
    ],
  },
  {
    id: 'tour-masterplayer',
    code: '04.01',
    batmanCode: 'BATCOMPUTER LOG // FILE 04.01',
    projectSlug: 'masterplayer-designs-and-printing',
    title: 'Masterplayer Designs & Printing',
    subtitle: '360° WebGL 3D Apparel Studio, Custom B2B CRM, Technical SEO & Ads',
    role: 'Lead Full-Stack, CRM & Growth Architect',
    year: '2026',
    mascotSide: 'right',
    outfit: 'masterplayer',
    tint: '#5EEAD4',
    bgLight: '#EAE6DF',
    bgDark: '#0B0C0E',
    liveUrl: 'https://www.masterplayerprints.com/',
    repoUrl: 'https://github.com/avichal15/Masterplayer',
    hosts: [
      { label: 'masterplayerprints.com', url: 'https://www.masterplayerprints.com/' },
    ],
    has3DStudioPreview: true,
    desktopSlides: [
      {
        src: '/projects/masterplayer/3d-customizer.webp',
        alt: 'Masterplayer Designs & Printing 360 WebGL 3D Customizer Studio',
        badge: '360° WEBGL 3D APPAREL STUDIO',
        caption: 'Spin 3D garments in 360°, snap logos onto 5 print slots, and preview live.',
      },
      {
        src: '/projects/masterplayer/desktop-hero.webp',
        alt: 'Masterplayer storefront, custom CRM, and top Google SEO',
        badge: 'MASTERPLAYERPRINTS.COM · CRM + TOP SEO',
        caption: 'Full-stack B2B print storefront, custom order CRM, and top Google search rankings.',
      },
      {
        src: '/projects/masterplayer/product-catalog.webp',
        alt: 'Masterplayer 22 merchandise departments and 18% GST bulk calculator',
        badge: '22 MERCH DEPARTMENTS · 18% GST ENGINE',
        caption: 'Tiered B2B pricing with 18% GST input credit across 22 custom merch categories.',
      },
    ],
    mobileSlides: [
      {
        src: '/projects/masterplayer/mobile-b2b.webp',
        alt: 'Masterplayer mobile 3D garment studio',
      },
      {
        src: '/projects/masterplayer/mobile-preview.webp',
        alt: 'Masterplayer mobile storefront',
      },
      {
        src: '/projects/masterplayer/mobile-catalog.webp',
        alt: 'Masterplayer mobile 22-department B2B catalog',
      },
    ],
    bubbles: [
      'For Masterplayer Prints, I built a 360° 3D WebGL apparel studio and custom CRM.',
      'Buyers spin 3D garments in real time and snap logos onto five precision print slots.',
      'I also lead their technical SEO and digital ads, ranking them at the top of Google.',
    ],
  },
  {
    id: 'tour-session-sync',
    code: '05.01',
    batmanCode: 'BATCOMPUTER LOG // FILE 05.01',
    projectSlug: 'omniroute-session-sync',
    title: 'OmniRoute Session Sync',
    subtitle: 'Automated Chrome MV3 Extension & Multi-Model AI Session Bridge',
    role: 'Creator & Open-Source Contributor',
    year: '2026',
    mascotSide: 'left',
    outfit: 'techy',
    tint: '#38BDF8',
    bgLight: '#EAE6DF',
    bgDark: '#0B0C0E',
    liveUrl: 'https://github.com/avichal15/omniroute-session-sync',
    repoUrl: 'https://github.com/avichal15/omniroute-session-sync',
    hosts: [
      { label: 'github.com/avichal15/omniroute-session-sync', url: 'https://github.com/avichal15/omniroute-session-sync' },
    ],
    desktopSlides: [
      {
        src: '/projects/omniroute/cover.webp',
        alt: 'OmniRoute Session Sync Chrome MV3 extension popup paired and unpaired states',
        badge: 'SESSION-SYNC · CHROME MV3 TO CLI BRIDGE',
        caption: 'Syncs live browser sessions across ChatGPT, Gemini, Qwen, Z.ai, Grok & DeepSeek.',
      },
      {
        src: '/projects/omniroute/extension-paired.webp',
        alt: 'OmniRoute Session Sync multi-provider harvesting and cryptographic pairing pipeline',
        badge: 'CRYPTOGRAPHIC PAIRING & FINGERPRINT ALIGNMENT',
        caption: 'Harvests cookies, bearer tokens, and User-Agent headers automatically.',
      },
      {
        src: '/projects/omniroute/architecture.webp',
        alt: 'OmniRoute Session Sync real-time gateway diagnostics and heartbeat sync',
        badge: 'ZERO-DOWNTIME TOKEN ROTATION',
        caption: 'Background MV3 alarm heartbeats keep CLI tools and AI gateways authenticated 24/7.',
      },
    ],
    mobileSlides: [
      {
        src: '/projects/omniroute/extension-paired.webp',
        alt: 'OmniRoute Session Sync paired extension popup',
      },
      {
        src: '/projects/omniroute/cover.webp',
        alt: 'OmniRoute Session Sync provider health telemetry',
      },
      {
        src: '/projects/omniroute/architecture.webp',
        alt: 'OmniRoute Session Sync cryptographic token pairing view',
      },
    ],
    bubbles: [
      'OmniRoute Session Sync is my open-source Chrome MV3 extension for AI gateways.',
      'It pairs your browser with local CLI tools to sync cookies and bearer tokens.',
      'Background heartbeats keep ChatGPT, Gemini, Qwen, and DeepSeek connected 24/7.',
    ],
  },
];

export const FEATURED_STORIES = TOUR_CHAPTERS.map((ch, idx) => ({
  number: `0${idx + 1}`,
  slug: ch.projectSlug,
  title: ch.title,
}));

// ============================================================================
// STRICTLY 10 APPROVED PUBLIC PROJECTS FOR BENTO GRID (#work) & CASE MODAL
// Concise, high-impact copy with verified live URLs and matched screenshots
// ============================================================================
export const ALL_PROJECTS = [
  {
    number: '01',
    slug: 'medistudygo',
    title: 'MediStudyGo',
    subtitle: 'Medical EdTech Platform & 7-System Learner Operations Engine',
    category: 'EdTech & Product Operations',
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
    coverImage: '/projects/medistudygo/desktop-hero.webp',
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
      'Unified Shopify, Graphy LMS, Shiprocket, DoubleTick WhatsApp, Brevo, and Razorpay into one automated brain for 50,000+ medical students.',
    description: [
      'Connected seven separate operational tools so course entitlements in Graphy LMS and print dispatches in Shiprocket trigger automatically on checkout.',
      'Structured 29,500+ active-recall flashcards, visual mind maps, and automated WhatsApp cart recovery for NEET PG and MBBS cohorts.',
    ],
    metrics: [
      { value: '50,000+', label: 'Medical, Dental & Nursing Learners' },
      { value: '29,500+', label: 'Active-Recall Flashcards Structured' },
      { value: '7 Platforms', label: 'Unified into One Automated Brain' },
    ],
    slides: [
      {
        src: '/projects/medistudygo/desktop-hero.webp',
        caption: 'MediStudyGo Storefront — MBBS, BDS & Nursing Visual Mind Maps & Bundles',
      },
      {
        src: '/projects/medistudygo/desktop-feature.webp',
        caption: '7-Platform Automated Fulfilment — Shopify, Graphy LMS, Shiprocket & WhatsApp',
      },
      {
        src: '/projects/medistudygo/desktop-catalog.webp',
        caption: 'Student Revision Experience & 29,500+ Active-Recall Flashcards',
      },
    ],
    mobileSlides: [
      { src: '/projects/medistudygo/mobile-preview.webp', alt: 'MediStudyGo mobile storefront' },
      { src: '/projects/medistudygo/mobile-courses.webp', alt: 'MediStudyGo mobile catalog' },
      { src: '/projects/medistudygo/mobile-bundles.webp', alt: 'MediStudyGo mobile student view' },
    ],
    characterComments: [
      'I wired 7 separate platforms into one automated operations brain for 50,000+ students.',
      'Orders on Shopify unlock Graphy LMS courses and Shiprocket print dispatches automatically.',
    ],
  },
  {
    number: '02',
    slug: 'phoney',
    title: 'Phoney',
    hasPhoneySoundboard: true,
    subtitle: 'Expressive Android 15 InCallService Dialer & Live Audio Emoji Soundboard',
    category: 'Android Development',
    year: '2026',
    role: 'Creator & Lead Engineer',
    bentoSpan: 'col-6',
    bentoTall: true,
    accentColor: '#7C3AED',
    surfaceTint: '#EAE6F8',
    liveUrl: 'https://phoney.avichalgoyal.me/',
    liveLabel: 'Visit phoney.avichalgoyal.me',
    repoUrl: 'https://github.com/avichal15/calling-app-',
    repoLabel: 'View on GitHub',
    coverImage: '/projects/phoney/desktop-hero.webp',
    stack: [
      'Kotlin',
      'Jetpack Compose',
      'Android 15 InCallService',
      'Clean Call Recording',
      'React 19',
      'Three.js / WebGL',
      'WebAudio API',
    ],
    summary:
      'Native Android 15 dialer built in Kotlin & Jetpack Compose featuring silent call recording, adaptive themes, and a 6-slot live Audio Emoji tray.',
    description: [
      'Built on Android’s Telecom InCallService API to replace the stock dialer with clean local call recording and sub-180ms in-call Audio Emojis.',
      'Accompanied by an interactive 3D web showcase at phoney.avichalgoyal.me where visitors can test all 6 reactions live.',
    ],
    metrics: [
      { value: '6 Emojis', label: 'Live In-Call Audio Reactions' },
      { value: '< 180ms', label: 'In-Call Sound Trigger Latency' },
      { value: 'Android 15', label: 'Native Kotlin InCallService' },
    ],
    slides: [
      {
        src: '/projects/phoney/desktop-hero.webp',
        caption: 'Phoney 3D Web Showcase (phoney.avichalgoyal.me) — Out of pocket. Into your calls.',
      },
      {
        src: '/projects/phoney/android-dialer.webp',
        caption: '6-Slot Live Audio Emoji Quick Tray — Cheer, Faaah, Fart, Womp Womp, Wow & Yay!',
      },
      {
        src: '/projects/phoney/audio-emojis.webp',
        caption: 'Native Kotlin InCallService — Clean Call Recording & 4 Adaptive Themes',
      },
    ],
    mobileSlides: [
      { src: '/media/projects/call.webp', alt: 'Phoney live in-call screen' },
      { src: '/projects/phoney/mobile-sounds.webp', alt: 'Phoney 6-Slot Audio Emoji Quick Tray' },
      { src: '/media/projects/theme-neo.webp', alt: 'Phoney adaptive Neo theme' },
    ],
    characterComments: [
      'Phoney replaces your stock Android dialer with silent call recording and live Audio Emojis.',
      'Tap any of the 6 Quick Tray buttons below to hear the real in-call sound effects!',
    ],
  },
  {
    number: '03',
    slug: 'trugifting-solutions',
    title: 'TruGifting Solutions',
    subtitle: 'Enterprise Corporate Gifting, Custom Hamper Builder & 360+ Brand Vouchers',
    category: 'B2B E-Commerce',
    year: '2025 – 2026',
    role: 'Lead Full-Stack Product Engineer',
    bentoSpan: 'col-4',
    bentoTall: false,
    accentColor: '#D97706',
    surfaceTint: '#FBF2E3',
    liveUrl: 'https://www.trugiftingsolutions.com/',
    liveLabel: 'Visit trugiftingsolutions.com',
    repoUrl: 'https://github.com/avichal15',
    repoLabel: 'GitHub Profile',
    coverImage: '/projects/trugifting/desktop-hero.webp',
    stack: [
      'React 19',
      'Vite',
      'Custom Hamper Configurator',
      '360+ Brand Vouchers',
      'Enterprise R&R Workflows',
      'Bulk Quote Engine',
    ],
    summary:
      'B2B corporate gifting platform featuring an interactive custom hamper builder, 360+ digital brand vouchers, and instant bulk quote generation.',
    description: [
      'Engineered trugiftingsolutions.com as my first independent client launch so HR and procurement teams can curate onboarding kits and festival hampers in seconds.',
      'Combines a 360+ instant brand voucher catalog with live MOQ tier pricing for 50+ enterprise teams across India.',
    ],
    metrics: [
      { value: '50+ Clients', label: 'Enterprise & Corporate Teams Served' },
      { value: '360+ Brands', label: 'Instant Digital Gift Vouchers' },
      { value: 'Live MOQ', label: 'Custom Hamper Quote Builder' },
    ],
    slides: [
      {
        src: '/projects/trugifting/desktop-hero.webp',
        caption: 'TruGifting Solutions (trugiftingsolutions.com) — Enterprise Corporate Gifting',
      },
      {
        src: '/projects/trugifting/voucher-section.webp',
        caption: '360+ Digital Brand Vouchers & Employee Reward Programs',
      },
      {
        src: '/projects/trugifting/hamper-builder.webp',
        caption: 'Interactive Custom Hamper Builder & Pan-India Kit Fulfillment',
      },
    ],
    mobileSlides: [
      { src: '/projects/trugifting/mobile-preview.webp', alt: 'TruGifting mobile storefront' },
      { src: '/projects/trugifting/mobile-vouchers.webp', alt: 'TruGifting mobile voucher catalog' },
      { src: '/projects/trugifting/mobile-hampers.webp', alt: 'TruGifting mobile hamper builder' },
    ],
    characterComments: [
      'TruGifting Solutions was my first independent client — built for enterprise gifting at scale.',
      'Teams can curate custom swag boxes or send 360+ brand vouchers in a few clicks.',
    ],
  },
  {
    number: '04',
    slug: 'masterplayer-designs-and-printing',
    title: 'Masterplayer Designs & Printing',
    subtitle: '360° WebGL Apparel Studio, Custom B2B CRM, Technical SEO & Digital Ads',
    category: '3D Commerce & Business Automation',
    year: '2026',
    role: 'Lead Full-Stack, CRM & Growth Architect',
    bentoSpan: 'col-4',
    bentoTall: false,
    accentColor: '#DC2626',
    surfaceTint: '#F7ECE4',
    liveUrl: 'https://www.masterplayerprints.com/',
    liveLabel: 'Visit masterplayerprints.com',
    repoUrl: 'https://github.com/avichal15/Masterplayer',
    repoLabel: 'View on GitHub',
    coverImage: '/projects/masterplayer/3d-customizer.webp',
    stack: [
      'React 19',
      'Three.js / WebGL',
      'Custom B2B CRM',
      'Technical SEO',
      'Google & Meta Ads',
      '18% GST Quote Engine',
    ],
    summary:
      'Interactive 360° WebGL 3D apparel customizer, 22-department B2B print storefront, custom order CRM, and top-ranked Google SEO.',
    description: [
      'Built masterplayerprints.com with a real-time 360° 3D garment studio where buyers spin 240 GSM apparel, strip white logo backgrounds, and snap art onto 5 print slots.',
      'Delivered their internal order CRM, 18% GST bulk quote engine, technical SEO rankings, and digital ad funnels end to end.',
    ],
    metrics: [
      { value: '360° 3D', label: 'Real-Time WebGL Garment Studio' },
      { value: '22 Depts', label: 'Custom Apparel & Corporate Merch' },
      { value: 'Top SEO', label: 'Custom CRM + Search & Ad Growth' },
    ],
    slides: [
      {
        src: '/projects/masterplayer/3d-customizer.webp',
        caption: '360° Interactive WebGL 3D Apparel Studio & 5-Slot Logo Configurator',
      },
      {
        src: '/projects/masterplayer/desktop-hero.webp',
        caption: 'Masterplayer Prints Storefront — Custom CRM, Top Google SEO & Ad Funnels',
      },
      {
        src: '/projects/masterplayer/product-catalog.webp',
        caption: '22 Merchandise Departments & 18% GST B2B Bulk Quote Calculator',
      },
    ],
    mobileSlides: [
      { src: '/projects/masterplayer/mobile-b2b.webp', alt: 'Masterplayer mobile 3D merch studio' },
      { src: '/projects/masterplayer/mobile-preview.webp', alt: 'Masterplayer mobile storefront' },
      { src: '/projects/masterplayer/mobile-catalog.webp', alt: 'Masterplayer mobile B2B catalog' },
    ],
    characterComments: [
      'Buyers spin 3D garments in 360° and place logos across 5 print slots right in the browser.',
      'I built their 3D storefront, custom CRM, and SEO stack at masterplayerprints.com.',
    ],
  },
  {
    number: '05',
    slug: 'omniroute-session-sync',
    title: 'OmniRoute Session Sync',
    subtitle: 'Automated Chrome MV3 Extension & Multi-Model AI Session Bridge',
    category: 'Open Source & AI Infrastructure',
    year: '2026',
    role: 'Creator & Open-Source Contributor',
    bentoSpan: 'col-4',
    bentoTall: false,
    accentColor: '#0284C7',
    surfaceTint: '#E4EEF9',
    liveUrl: 'https://github.com/avichal15/omniroute-session-sync',
    liveLabel: 'View Session Sync Repo',
    repoUrl: 'https://github.com/avichal15/omniroute-session-sync',
    repoLabel: 'github.com/avichal15/omniroute-session-sync',
    coverImage: '/projects/omniroute/cover.webp',
    stack: [
      'Chrome Manifest V3',
      'JavaScript / Node.js',
      'chrome.cookies API',
      'Cryptographic Token Pairing',
      'Background Alarms',
      'Multi-Model AI Bridge',
    ],
    summary:
      'Open-source Chrome MV3 extension and daemon bridge that syncs live browser sessions across ChatGPT, Gemini, Qwen, Z.ai, Grok, and DeepSeek.',
    description: [
      'Harvests HttpOnly cookies, bearer tokens, and User-Agent client-hint headers automatically so local CLI agents and AI gateways never break on expired cookies.',
      'Uses cryptographic token pairing and MV3 alarm heartbeats for zero-downtime 24/7 authentication.',
    ],
    metrics: [
      { value: '6+ AI Hosts', label: 'ChatGPT · Gemini · Qwen · Grok · DeepSeek' },
      { value: 'MV3 Alarms', label: 'Zero-Downtime Heartbeat Rotation' },
      { value: 'Open Source', label: 'Contributed to OmniRoute Ecosystem' },
    ],
    slides: [
      {
        src: '/projects/omniroute/cover.webp',
        caption: 'OmniRoute Session Sync — Chrome MV3 Extension Paired & Diagnostic States',
      },
      {
        src: '/projects/omniroute/extension-paired.webp',
        caption: 'Cryptographic Pairing & Multi-Provider Cookie/Bearer Harvesting Pipeline',
      },
      {
        src: '/projects/omniroute/architecture.webp',
        caption: 'Real-Time Gateway Diagnostics & Background Heartbeat Sync',
      },
    ],
    mobileSlides: [
      { src: '/projects/omniroute/extension-paired.webp', alt: 'Session Sync paired extension UI' },
      { src: '/projects/omniroute/cover.webp', alt: 'Session Sync domain telemetry' },
      { src: '/projects/omniroute/architecture.webp', alt: 'Session Sync pairing handshake' },
    ],
    characterComments: [
      'OmniRoute Session Sync keeps CLI agents authenticated across 6+ web AI platforms 24/7.',
    ],
  },
  {
    number: '06',
    slug: 'antigravity-gemini-skills',
    title: 'Gemini Web Antigravity Skill Stack',
    subtitle: '65+ Autonomous Agent Skills, MCP Harnesses & Multi-Model Council Router',
    category: 'Agentic AI & Developer Infrastructure',
    year: '2026',
    role: 'AI Systems Architect',
    bentoSpan: 'col-6',
    bentoTall: false,
    accentColor: '#6366F1',
    surfaceTint: '#ECECFB',
    liveUrl: 'https://github.com/avichal15',
    liveLabel: 'View on GitHub',
    repoUrl: 'https://github.com/avichal15',
    repoLabel: 'GitHub',
    coverImage: '/projects/antigravity-stack/cover.webp',
    stack: [
      'Gemini API',
      'Model Context Protocol (MCP)',
      'EmbeddingGemma 2',
      'Obscura Engine',
      'Multi-Agent Council',
    ],
    summary:
      'Modular 65-skill autonomous agent stack combining multi-model council orchestration, EmbeddingGemma 2 semantic memory, and Obscura UI verification.',
    description: [
      'Orchestrates parallel specialist subagents, accessibility-tree browser checks, and mistake-immunizing semantic memory to cut main-window token usage by 85%.',
      'Packages deterministic CLI harnesses and verification gates for production full-stack engineering.',
    ],
    metrics: [
      { value: '65+ Skills', label: 'Modular Agent & MCP Playbooks' },
      { value: '85% Less', label: 'Context Token Overhead' },
      { value: '3-Stage', label: 'Scout · Council · Verifier Loop' },
    ],
    slides: [
      {
        src: '/projects/antigravity-stack/cover.webp',
        caption: 'Gemini Web Antigravity Skill Stack — Multi-Model Council & MCP Architecture',
      },
      {
        src: '/projects/antigravity-stack/architecture.webp',
        caption: '3-Stage Elephant-Goldfish Orchestration & Semantic Memory Pipeline',
      },
    ],
    characterComments: [
      'This 65-skill agentic stack powers my multi-model council, MCP tools, and semantic memory.',
    ],
  },
  {
    number: '07',
    slug: 'insta-manager',
    title: 'Insta Manager',
    subtitle: 'Creator SPR Analytics, Carousel Retention Auditor & DM Funnel Engine',
    category: 'Creator Tools & Automation',
    year: '2026',
    role: 'Product & Automation Engineer',
    bentoSpan: 'col-6',
    bentoTall: false,
    accentColor: '#DB2777',
    surfaceTint: '#F7E8F0',
    liveUrl: 'https://github.com/avichal15',
    liveLabel: 'View on GitHub',
    repoUrl: 'https://github.com/avichal15',
    repoLabel: 'GitHub',
    coverImage: '/projects/insta-manager/cover.webp',
    stack: ['Node.js', 'React', 'Instagram Graph Bridge', 'SPR Telemetry', 'SQLite'],
    summary:
      'Creator growth engine that tracks DM Sends-Per-Reach (SPR), carousel retention drop-offs, and automated keyword DM funnels.',
    description: [
      'Measures high-weight algorithmic distribution signals including DM shares per reach (3–5x weight) and watch completion rates.',
      'Automates keyword-triggered DM resource delivery and pre-publish caption/hashtag audits.',
    ],
    metrics: [
      { value: '3–5x Weight', label: 'SPR Share Signal Optimization' },
      { value: '20-Slide', label: 'Carousel Retention Telemetry' },
      { value: '< 1.2s', label: 'Automated Keyword DM Dispatch' },
    ],
    slides: [
      {
        src: '/projects/insta-manager/cover.webp',
        caption: 'Insta Manager — SPR Share Telemetry & Automated Keyword DM Funnel Engine',
      },
      {
        src: '/projects/insta-manager/product-preview.webp',
        caption: 'Carousel Retention Auditor & Trial Reel Performance Tracker',
      },
    ],
    characterComments: [
      'Insta Manager optimizes the #1 signal that drives reach: DM Sends-Per-Reach!',
    ],
  },
  {
    number: '08',
    slug: 'recruitment-funnel-analytics',
    title: 'Recruitment Funnel Analytics',
    subtitle: 'Full-Funnel Hiring Attribution, Channel ROI & Automated Spend Optimizer',
    category: 'BI & Analytics',
    year: '2025 – 2026',
    role: 'BI & Data Application Engineer',
    bentoSpan: 'col-4',
    bentoTall: false,
    accentColor: '#0D9488',
    surfaceTint: '#E6F4F1',
    liveUrl: 'https://github.com/avichal15',
    liveLabel: 'View on GitHub',
    repoUrl: 'https://github.com/avichal15',
    repoLabel: 'GitHub',
    coverImage: '/projects/recruitment-funnel/desktop-overview.webp',
    stack: ['Python', 'Streamlit', 'Plotly', 'Pandas', 'SQLite', 'Rule-Based BI Engine'],
    summary:
      'Interactive Python, Streamlit & SQLite BI dashboard modeling 250K+ job clicks through to hires with automated budget optimization.',
    description: [
      'Slices Cost-Per-Applicant ($18.88) and Cost-Per-Hire ($291) across 7 acquisition channels, devices, and geographies.',
      'Includes a rule-based recommendation engine that flags inefficient ad spend and mobile/tablet form drop-offs.',
    ],
    metrics: [
      { value: '250.0K', label: 'Top-of-Funnel Clicks Modeled' },
      { value: '$291 CPH', label: 'Channel & Geo Cost-Per-Hire Attribution' },
      { value: 'SQLite + BI', label: 'Automated Spend Recommendations' },
    ],
    slides: [
      {
        src: '/projects/recruitment-funnel/desktop-overview.webp',
        caption: 'Executive Funnel Overview — 250K Clicks, 35K Applications & 1.8K Hires',
      },
      {
        src: '/projects/recruitment-funnel/channel-performance.webp',
        caption: 'Channel Efficiency & Device Conversion Analysis Across 7 Sources',
      },
      {
        src: '/projects/recruitment-funnel/recommendations.webp',
        caption: 'Automated Rule-Based Spend & UX Recommendations Engine',
      },
    ],
    characterComments: [
      'This Streamlit + SQLite BI engine shows exactly which hiring channels deliver real hires.',
    ],
  },
  {
    number: '09',
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
    liveUrl: 'https://mahadev-plywood.live/',
    liveLabel: 'Visit mahadev-plywood.live',
    repoUrl: 'https://github.com/avichal15',
    repoLabel: 'GitHub',
    coverImage: '/projects/mahadev-plywood/desktop-hero.webp',
    stack: ['React 19', 'Vite', 'Sheet Estimator', 'Finish Visualizer', 'WhatsApp BOQ'],
    summary:
      'Digital B2B catalog of 280+ timber and hardware SKUs with an interactive room-to-sheet BOQ calculator and WhatsApp quote dispatch.',
    description: [
      'Organizes 280+ SKUs across marine plywood, HDHMR boards, blockboards, veneers, and architectural fittings for contractors in NCR.',
      'Calculates exact sheet counts, wastage margins, and hardware quantities for one-click WhatsApp dealer quotes.',
    ],
    metrics: [
      { value: '280+ SKUs', label: 'Timber, Laminate & Hardware Catalog' },
      { value: '< 15ms', label: 'Instant BOQ Sheet Calculation' },
      { value: '99 Score', label: 'Mobile Lighthouse Performance' },
    ],
    slides: [
      {
        src: '/projects/mahadev-plywood/desktop-hero.webp',
        caption: 'Mahadev Plywood & Hardware (mahadev-plywood.live) — B2B Timber Storefront',
      },
      {
        src: '/projects/mahadev-plywood/desktop-counter.webp',
        caption: 'Interactive Room-to-Sheet BOQ Calculator & Contractor Quote Estimator',
      },
      {
        src: '/projects/mahadev-plywood/desktop-catalog.webp',
        caption: '280+ Architectural Plywood, Laminate & Hardware SKU Catalog',
      },
    ],
    mobileSlides: [
      { src: '/projects/mahadev-plywood/mobile-preview.webp', alt: 'Mahadev Plywood mobile view' },
    ],
    characterComments: [
      'Click Visit mahadev-plywood.live to try the live timber catalog and sheet calculator!',
    ],
  },
  {
    number: '10',
    slug: 'dhuri-hoon-main',
    title: 'Dhuri Hoon Main',
    subtitle: 'Regional Social Impact Platform, Volunteer Mobilization & Program Portal',
    category: 'Creative Web Experience',
    year: '2026',
    role: 'Lead Web Developer',
    bentoSpan: 'col-4',
    bentoTall: false,
    accentColor: '#CA8A04',
    surfaceTint: '#F6F0DF',
    liveUrl: 'https://dhurihoonmai.com/',
    liveLabel: 'Visit dhurihoonmai.com',
    repoUrl: 'https://github.com/avichal15',
    repoLabel: 'GitHub',
    coverImage: '/projects/dhuri-hoon-mai/desktop-hero.webp',
    stack: ['React', 'Vite', 'Responsive Civic UI', 'Volunteer Workflows', 'Bilingual Storytelling'],
    summary:
      'Public civic and community impact platform for Dhuri featuring regional programs, volunteer onboarding, and transparent impact reporting.',
    description: [
      'Designed and shipped dhurihoonmai.com to connect local citizens with healthcare, education, and youth empowerment drives.',
      'Features fast mobile-first navigation, program galleries, and streamlined citizen participation flows.',
    ],
    metrics: [
      { value: 'Live Site', label: 'dhurihoonmai.com' },
      { value: 'Mobile-1st', label: 'Accessible Regional Civic UI' },
      { value: '3 Pillars', label: 'Education · Health · Community' },
    ],
    slides: [
      {
        src: '/projects/dhuri-hoon-mai/desktop-hero.webp',
        caption: 'Dhuri Hoon Main (dhurihoonmai.com) — Community Impact Homepage',
      },
      {
        src: '/projects/dhuri-hoon-mai/desktop-programs.webp',
        caption: 'Community Programs, Citizen Initiatives & Regional Drives',
      },
      {
        src: '/projects/dhuri-hoon-mai/desktop-impact.webp',
        caption: 'On-Ground Impact Metrics & Volunteer Participation Portal',
      },
    ],
    mobileSlides: [
      { src: '/projects/dhuri-hoon-mai/mobile-preview.webp', alt: 'Dhuri Hoon Main mobile view' },
    ],
    characterComments: [
      'Click Visit dhurihoonmai.com to explore the live community platform!',
    ],
  },
];

export const ALL_WORK_BY_SLUG = Object.fromEntries(
  ALL_PROJECTS.map((project) => [project.slug, project])
);

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
    secondaryLabel: 'View Certificate PDF',
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
      'Completed intensive algorithmic problem-solving in Java (Alpha Batch 3.0), solving 300+ problems across trees, graphs, DP, recursion, and tries.',
    highlights: [
      'Mastered Arrays, Linked Lists, Stacks, Queues, Binary Trees, BSTs, Heaps, HashMaps, Tries, and Graph algorithms in Java.',
      'Solved 300+ problems across Greedy, Divide & Conquer, Backtracking, Segment Trees, and Dynamic Programming.',
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
      'End-to-end MERN stack web engineering track covering React frontend architecture, Node.js & Express APIs, SQL/MongoDB databases, and cloud deployment.',
    highlights: [
      'Built responsive frontend interfaces with React, modern CSS Grid/Flexbox, and component design systems.',
      'Engineered REST APIs with Node.js, Express, JWT/OAuth security, and normalized SQL/NoSQL schemas.',
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
      'Authorized by Google. Validates expertise in transforming operational data into ETL pipelines, dimensional models, and executive KPI dashboards.',
    highlights: [
      'Mastered stakeholder metric governance, data source auditing, ETL pipeline design, and KPI dashboard modeling.',
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
    ],
    summary:
      'Verified credential in R programming, Tidyverse data wrangling, ggplot2 visualization, hypothesis testing, and regression modeling.',
    highlights: [
      'Built vectorized R pipelines and statistical regression/classification models with publication-grade ggplot2 diagnostics.',
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
    ],
    summary:
      'Google Developer Program Premium member and Gen AI Academy APAC (Cohort 3) credential holder building production multimodal apps with Gemini & Vertex AI.',
    highlights: [
      'Completed Gen AI Academy APAC (Cohort 3) and earned official Google for Developers Community Gear credentials.',
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
