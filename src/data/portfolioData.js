export const OWNER_PROFILE = {
  name: 'Avichal Goyal',
  roleTitle: 'Software Developer',
  batmanRoleTitle: 'Software Developer // Gotham Night Shift',
  heroLeadBeforeBatman:
    'I’m a product-minded software engineer who builds web products, AI tools, and automations that make real-world work easier. And occasionally, I’m ',
  heroBatmanWord: 'Batman',
  aboutText:
    'Hi, I am Avichal Goyal. I graduated with my B.Tech in Computer Science from SRM University (2021–2025), and I am a full-stack developer with deep hands-on knowledge of AI tools and products. I love helping businesses build real-world software that saves hours of manual work. After building core automation and CRM systems at MediStudyGo, I parted ways to begin my own independent journey — shipping commercial platforms, native Android apps, and open-source AI tools.',
  batmanHeroQuip:
    'I only code in black. And sometimes, very, very dark grey. Scroll down to inspect the Batcomputer.',
  bentoTooltipNormal:
    'All 18 projects in a Bento box! Click any project to inspect it right inside the site.',
  bentoTooltipBatman:
    'All 18 Batcomputer files in a Bento box! Click any classified project to inspect it right inside the site.',
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
    quip: '👏 Crowd goes wild! Instant applause right inside the call.',
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
    quip: '😱 FAAAAH! For dramatic plot twists on the line.',
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
    quip: '💨 Pffft! Because every serious friend group needs a raspberry button.',
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
    quip: '😑 Womp womp... sad trombone when plans get cancelled.',
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
    quip: '🤩 Woooow! High-energy hype without interrupting the speaker.',
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
  "Hi, I'm Avichal! Scroll down and I'll walk you through my story and favorite builds.",
  "Oh hi, you're here! Want the guided tour?",
  'Psst. You can grab and drag me around — or double-click me for a trick.',
  'Move your cursor around me... careful, I might be ticklish.',
  'Click "Batman." in the headline if you want to enter the Batcave.',
];

// ============================================================================
// 5 GUIDED TOUR CHAPTERS IN EXACT GOOGLE SITES SEQUENCE & STORYTELLING VOICE:
// Slide 1: MediStudyGo -> Slide 2: Phoney -> Slide 3: TruGifting Solutions ->
// Slide 4: Masterplayer Designs & Printing -> Slide 5: OmniRoute Session Sync
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
    bgLight: '#EAE5DD',
    bgDark: '#0B0C0E',
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
        alt: 'MediStudyGo product catalog and 7-platform automated operations',
        badge: '7-PLATFORM AUTOMATED BRAIN',
        caption: 'Shopify ↔ Shiprocket ↔ DoubleTick WhatsApp ↔ Graphy LMS ↔ Brevo ↔ Razorpay ↔ Sheets',
      },
      {
        src: '/media/projects/medistudygo-flashcards-desktop.png',
        alt: 'MediStudyGo student learning experience and revision bundles',
        badge: '29,500+ ACTIVE-RECALL FLASHCARDS',
        caption: 'Automated order-to-entitlement provisioning & exam-season student broadcasts',
      },
    ],
    mobileSlides: [
      {
        src: '/media/projects/medistudygo-mobile.png',
        alt: 'MediStudyGo mobile storefront',
      },
      {
        src: '/media/projects/medistudygo-mobile-2.png',
        alt: 'MediStudyGo mobile courses & mind maps',
      },
      {
        src: '/media/projects/medistudygo-mobile-3.png',
        alt: 'MediStudyGo mobile student reviews & bundles',
      },
    ],
    bubbles: [
      'At MediStudyGo, the team was juggling seven separate apps by hand. I stepped in and wired Shopify, Shiprocket, DoubleTick WhatsApp, Graphy LMS, Brevo, Razorpay, and Google Sheets into one automated brain serving 50,000+ medical and dental students across India.',
      'Whenever a student places an order now, courses unlock in Graphy automatically, Shiprocket dispatches print notes, and DoubleTick sends instant WhatsApp updates without anyone lifting a finger.',
      'I also structured 29,500+ active-recall flashcards, visual mind maps, and automated cart-recovery workflows so peak NEET PG exam seasons ran with zero bottlenecks.',
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
    bgLight: '#BCC6E6',
    bgDark: '#0B0C0E',
    liveUrl: 'https://phoney.avichalgoyal.me/',
    repoUrl: 'https://github.com/avichal15',
    hosts: [{ label: 'phoney.avichalgoyal.me', url: 'https://phoney.avichalgoyal.me/' }],
    hasPhoneySoundboard: true,
    desktopSlides: [
      {
        src: '/media/projects/phoney-desktop.png',
        alt: 'Phoney interactive 3D web showcase at phoney.avichalgoyal.me',
        badge: 'PHONEY · ANDROID 15 DIALER',
        caption: 'Out of pocket. Into your calls. Companion 3D web showcase + native Android dialer.',
      },
      {
        src: '/media/projects/phoney-dialer-desktop.png',
        alt: 'Phoney Android InCallService architecture and call screens',
        badge: 'SILENT CALL RECORDING & INCALLSERVICE',
        caption: 'Record call voice cleanly without awkward announcement alerts + instant contact search.',
      },
      {
        src: '/media/projects/phoney-themes-desktop.png',
        alt: 'Phoney 4 adaptive themes and 6-Slot Audio Emoji Quick Tray',
        badge: 'LIVE IN-CALL AUDIO EMOJIS',
        caption: 'Tap any of the 6 Quick Tray Audio Emojis below to hear them right now!',
      },
    ],
    mobileSlides: [
      {
        src: '/screens/current-recents.webp',
        alt: 'Phoney Recents screen on Android',
      },
      {
        src: '/screens/current-sounds.webp',
        alt: 'Phoney 6 default Audio Emojis Quick Tray on Android',
      },
      {
        src: '/screens/current-privacy.webp',
        alt: 'Phoney privacy & permissions screen on Android',
      },
    ],
    bubbles: [
      'Meet Phoney — my very first Android app, built from scratch for Android 15 and now open for beta testers! It replaces the stock phone dialer so you can record call voice cleanly without any awkward declaration announcement, and trigger live Audio Emojis mid-call to express exactly how you feel.',
      'I engineered the native Kotlin & Jetpack Compose InCallService from the ground up, plus the interactive 3D web showcase at phoney.avichalgoyal.me.',
      "Want to hear how it feels on a real call? Tap any of Phoney's 6 Quick Tray Audio Emojis right below — Cheer, Faaah, Fart, Womp Womp, Wow, or Yay!",
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
    bgLight: '#EAE5DD',
    bgDark: '#0B0C0E',
    liveUrl: 'https://www.trugiftingsolutions.com/',
    hosts: [
      { label: 'trugiftingsolutions.com', url: 'https://www.trugiftingsolutions.com/' },
      { label: 'masterplayerprints.com', url: 'https://www.masterplayerprints.com/' },
    ],
    desktopSlides: [
      {
        src: '/media/projects/trugifting-desktop.png',
        alt: 'TruGifting Solutions enterprise corporate gifting storefront',
        badge: 'TRUGIFTINGSOLUTIONS.COM · FIRST INDEPENDENT CLIENT',
        caption: 'End-to-end B2B corporate gifting, onboarding kits, and festival hampers for enterprise teams.',
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
        badge: 'INTERACTIVE HAMPER BUILDER · BULK QUOTES',
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
      'Right after parting ways with MediStudyGo, TruGifting Solutions was the very first client project I landed on my own journey. I built their complete B2B corporate gifting platform from the ground up — making it simple for enterprise teams to explore curated hampers and request bulk quotes in seconds.',
      'HR and procurement leaders across 50+ enterprise clients use it to browse 360+ instant digital brand vouchers for employee rewards and channel incentives.',
      'I also designed the interactive custom hamper configurator with live MOQ tier pricing so corporate onboarding kits go from idea to pan-India dispatch effortlessly.',
    ],
  },
  {
    id: 'tour-masterplayer',
    code: '04.01',
    batmanCode: 'BATCOMPUTER LOG // FILE 04.01',
    projectSlug: 'masterplayer-designs-and-printing',
    title: 'Masterplayer & TruGifting',
    subtitle: 'Custom CRM, 360° WebGL Apparel Studio, Technical SEO & Digital Ads',
    role: 'Lead Full-Stack, CRM & Growth Architect',
    year: '2026',
    mascotSide: 'right',
    outfit: 'masterplayer',
    tint: '#5EEAD4',
    bgLight: '#EAE5DD',
    bgDark: '#0B0C0E',
    liveUrl: 'https://www.masterplayerprints.com/',
    hosts: [
      { label: 'masterplayerprints.com', url: 'https://www.masterplayerprints.com/' },
      { label: 'trugiftingsolutions.com', url: 'https://www.trugiftingsolutions.com/' },
    ],
    desktopSlides: [
      {
        src: '/media/projects/masterplayer-desktop.png',
        alt: 'Masterplayer Designs & Printing 360 WebGL 3D Customizer Studio',
        badge: 'MASTERPLAYERPRINTS.COM · FULL-STACK + CRM + SEO',
        caption: 'Custom CRM, website & backend, top Google SEO rankings, and digital ad management.',
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
        badge: '360° 3D PRINT SLOTS · 18% GST ENGINE',
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
      'This is Masterplayer Designs and Printing — who I am collaborating with right now! I built their custom CRM, engineered their website and backend, optimized their technical SEO so they rank at the top of Google searches, and manage their digital ad campaigns end to end.',
      'Inside the 360° WebGL Customizer Studio, buyers spin 240 GSM apparel in real time, strip white logo backgrounds in one click, and snap artwork onto 5 print slots.',
      'Behind the storefront, my custom B2B quote engine calculates tiered bulk discounts with 18% GST input credit breakdowns across all 22 merchandise departments.',
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
    bgLight: '#EAE5DD',
    bgDark: '#0B0C0E',
    liveUrl: 'https://github.com/avichal15/session-sync',
    repoUrl: 'https://github.com/avichal15/session-sync',
    hosts: [
      { label: 'github.com/avichal15/session-sync', url: 'https://github.com/avichal15/session-sync' },
    ],
    desktopSlides: [
      {
        src: '/media/projects/session-sync-desktop-1.png',
        alt: 'OmniRoute Session Sync Chrome MV3 extension popup paired and unpaired states',
        badge: 'SESSION-SYNC · CHROME MV3 TO CLI BRIDGE',
        caption: 'Syncs live browser sessions across ChatGPT, Gemini, Qwen, Z.ai, Grok & DeepSeek.',
      },
      {
        src: '/media/projects/session-sync-desktop-2.png',
        alt: 'OmniRoute Session Sync multi-provider harvesting and cryptographic pairing pipeline',
        badge: 'CRYPTOGRAPHIC PAIRING & FINGERPRINT ALIGNMENT',
        caption: 'Harvests cookies, bearer tokens, UA & sec-ch-ua headers automatically.',
      },
      {
        src: '/media/projects/session-sync-desktop-3.png',
        alt: 'OmniRoute Session Sync real-time gateway diagnostics and heartbeat sync',
        badge: 'ZERO-DOWNTIME TOKEN ROTATION',
        caption: 'Background MV3 alarm heartbeats keep CLI tools and AI gateways authenticated 24/7.',
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
      'The creator of OmniRoute highlighted a major pain point: expiring browser cookies kept breaking web AI models. I built and contributed OmniRoute Session Sync — an automated Chrome extension and local bridge that syncs live sessions across ChatGPT, Gemini, Qwen, Z.ai, Grok, and DeepSeek with zero downtime.',
      'It pairs your browser with local or remote gateways using a cryptographic token, harvesting HttpOnly cookies, bearer tokens, and TLS/User-Agent fingerprint headers automatically.',
      'With background Manifest V3 heartbeat alarms, your CLI agents and SDK pipelines stay authenticated 24/7 without ever copying cookies from DevTools again.',
    ],
  },
];

export const FEATURED_STORIES = TOUR_CHAPTERS.map((ch, idx) => ({
  number: `0${idx + 1}`,
  slug: ch.projectSlug,
  title: ch.title,
}));

// ============================================================================
// ALL 18 VERIFIED PROJECTS FOR THE BENTO GRID (#work) & CASE STUDY WINDOW
// Written in Avichal's relatable first-person storytelling style
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
      'At MediStudyGo, the team was juggling seven separate apps by hand. I wired Shopify, Shiprocket, DoubleTick WhatsApp, Graphy LMS, Brevo, Razorpay, and Google Sheets into one automated brain serving 50,000+ medical and dental students.',
    description: [
      'Before I built the automation layer, every order required manual checks across Shopify, Razorpay, Graphy LMS, and Shiprocket. I connected all seven platforms so course entitlements unlock automatically the moment a student checks out.',
      'I also structured and audited 29,500+ active-recall flashcards, visual mind maps, and NEET PG revision bundles while automating WhatsApp cart recovery and cohort analytics.',
    ],
    metrics: [
      { value: '50,000+', label: 'Medical, Dental & Nursing Learners' },
      { value: '29,500+', label: 'Active-Recall Flashcards Structured' },
      { value: '7 Platforms', label: 'Unified into One Automated Brain' },
    ],
    slides: [
      {
        src: '/media/projects/medistudygo-desktop.png',
        caption: 'MediStudyGo Live Storefront — MBBS, BDS, BPT & Nursing Visual Mind Maps & Revision Bundles',
      },
      {
        src: '/media/projects/medistudygo-ops-desktop.png',
        caption: 'MediStudyGo Product Catalog & 7-Platform Automated Fulfilment Flow',
      },
      {
        src: '/media/projects/medistudygo-flashcards-desktop.png',
        caption: 'MediStudyGo Student Experience & 29,500+ Active-Recall Flashcards',
      },
    ],
    mobileSlides: [
      { src: '/media/projects/medistudygo-mobile.png', alt: 'MediStudyGo mobile storefront' },
      { src: '/media/projects/medistudygo-mobile-2.png', alt: 'MediStudyGo mobile catalog' },
      { src: '/media/projects/medistudygo-mobile-3.png', alt: 'MediStudyGo mobile student view' },
    ],
    characterComments: [
      'At MediStudyGo, I wired 7 separate platforms into one automated operations brain for 50,000+ students.',
      'Orders on Shopify now provision Graphy LMS courses and Shiprocket print dispatches automatically.',
      'During peak NEET PG exam windows, this system ran thousands of student enrollments with zero manual bottlenecks.',
    ],
  },
  {
    number: '02',
    slug: 'phoney',
    title: 'Phoney',
    subtitle: 'Expressive Android 15 InCallService Dialer & Live Audio Emoji Soundboard',
    category: 'Android 15 & WebAudio',
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
      'Android 15 InCallService',
      'Clean Call Recording',
      'React 19',
      'Three.js / WebGL',
      'WebAudio API',
    ],
    summary:
      'Meet Phoney — my very first Android app, built from scratch for Android 15 and now open for beta testers! It replaces the stock dialer for clean call recording without awkward announcement alerts and live in-call Audio Emojis.',
    description: [
      'I wanted a phone app that felt personal, fast, and genuinely fun to use. So I built Phoney in Kotlin and Jetpack Compose on top of Android’s Telecom InCallService API — complete with clean call voice recording and a 6-slot Quick Tray of live Audio Emojis.',
      'I also built the interactive 3D companion website at phoney.avichalgoyal.me so anyone can test Cheer, Faaah, Fart, Womp Womp, Wow, and Yay right in their browser before joining the Android beta.',
    ],
    metrics: [
      { value: '6 Emojis', label: 'Live In-Call Audio Reactions' },
      { value: '< 180ms', label: 'In-Call Sound Trigger Latency' },
      { value: 'Android 15', label: 'Native Kotlin InCallService' },
    ],
    slides: [
      {
        src: '/media/projects/phoney-desktop.png',
        caption: 'Phoney Companion Web Showcase (phoney.avichalgoyal.me) — Out of pocket. Into your calls.',
      },
      {
        src: '/media/projects/phoney-dialer-desktop.png',
        caption: 'Native Kotlin InCallService Dialer — Clean Call Recording, Recents & Quick Tray',
      },
      {
        src: '/media/projects/phoney-themes-desktop.png',
        caption: '4 Adaptive Dialer Themes + 6-Slot Live Audio Emoji Quick Tray',
      },
    ],
    mobileSlides: [
      { src: '/screens/current-recents.webp', alt: 'Phoney Recents screen' },
      { src: '/screens/current-sounds.webp', alt: 'Phoney 6-Slot Audio Emoji Quick Tray' },
      { src: '/screens/current-privacy.webp', alt: 'Phoney Privacy & Permissions screen' },
    ],
    characterComments: [
      'Phoney is my first Android app! It replaces your stock dialer with clean call recording and live Audio Emojis.',
      'Tap any of the 6 Quick Tray buttons — Cheer, Faaah, Fart, Womp Womp, Wow, or Yay — to hear the real app sounds!',
      'Everything runs locally on device with strict Android permission hygiene and zero contact uploads.',
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
    bentoSpan: 'col-6',
    bentoTall: false,
    accentColor: '#D97706',
    surfaceTint: '#FBF2E3',
    liveUrl: 'https://www.trugiftingsolutions.com/',
    liveLabel: 'Visit trugiftingsolutions.com',
    repoUrl: 'https://github.com/avichal15',
    repoLabel: 'GitHub Profile',
    coverImage: '/media/projects/trugifting-desktop.png',
    stack: [
      'React 19',
      'Vite',
      'Custom Hamper Configurator',
      '360+ Brand Vouchers',
      'Enterprise R&R Workflows',
      'Bulk Quote Engine',
    ],
    summary:
      'Right after parting ways with MediStudyGo, TruGifting Solutions was the very first client project I landed on my own journey. I built their complete B2B corporate gifting platform from the ground up.',
    description: [
      'Landing TruGifting Solutions as my first independent client was a milestone I’m really proud of. I designed and engineered trugiftingsolutions.com so HR, procurement, and leadership teams can explore curated hampers and request bulk quotes in seconds.',
      'The platform combines a 360+ instant digital brand voucher catalog with an interactive custom hamper builder, live MOQ tier pricing, and pan-India fulfillment workflows serving 50+ enterprise clients.',
    ],
    metrics: [
      { value: '50+ Clients', label: 'Enterprise & Corporate Teams Served' },
      { value: '360+ Brands', label: 'Instant Digital Gift Vouchers' },
      { value: '1st Client', label: 'Independent Full-Stack Launch' },
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
      'TruGifting Solutions was the very first client project I landed when I started my independent journey!',
      'HR and procurement teams can browse 360+ brand vouchers or build custom welcome kits in seconds.',
      'It now serves 50+ corporate teams with instant B2B quote generation and pan-India dispatch.',
    ],
  },
  {
    number: '04',
    slug: 'masterplayer-designs-and-printing',
    title: 'Masterplayer Designs & Printing',
    subtitle: 'Custom CRM, 360° WebGL Apparel Studio, Top Google SEO & Digital Ads',
    category: '3D Commerce, CRM & SEO',
    year: '2026',
    role: 'Lead Full-Stack, CRM & Growth Architect',
    bentoSpan: 'col-6',
    bentoTall: false,
    accentColor: '#DC2626',
    surfaceTint: '#F7ECE4',
    liveUrl: 'https://www.masterplayerprints.com/',
    liveLabel: 'Visit masterplayerprints.com',
    repoUrl: 'https://github.com/avichal15',
    repoLabel: 'GitHub Profile',
    coverImage: '/media/projects/masterplayer-desktop.png',
    stack: [
      'React 19',
      'Three.js / WebGL',
      'Custom B2B CRM',
      'Technical SEO',
      'Google & Meta Ads',
      '18% GST Quote Engine',
    ],
    summary:
      'This is Masterplayer Designs and Printing — who I am collaborating with right now! I built their custom CRM, engineered their website and 360° 3D studio, ranked them at the top of Google via SEO, and run their digital ads.',
    description: [
      'With Masterplayer Designs and Printing, I own the entire technical and growth stack: I built their custom internal CRM for order tracking, engineered masterplayerprints.com with a 360° WebGL apparel customizer, and architected their 22-department B2B catalog.',
      'Beyond the code, I overhauled their technical SEO and schema markup so they rank at the top of Google searches for custom printing, and I actively manage their digital ad campaigns to drive qualified B2B orders.',
    ],
    metrics: [
      { value: '22 Depts', label: 'Custom Apparel & Corporate Merch' },
      { value: '360° 3D', label: 'Real-Time WebGL Garment Studio' },
      { value: 'Top SEO', label: 'Custom CRM + Search & Ad Growth' },
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
        caption: '5 Precision Print Slots + Custom CRM & 18% GST B2B Bulk Quote Engine',
      },
    ],
    mobileSlides: [
      { src: '/media/projects/masterplayer-mobile.png', alt: 'Masterplayer mobile storefront' },
      { src: '/media/projects/masterplayer-mobile-2.png', alt: 'Masterplayer mobile 3D merch studio' },
      { src: '/media/projects/masterplayer-mobile-3.png', alt: 'Masterplayer mobile B2B catalog' },
    ],
    characterComments: [
      'I’m actively collaborating with Masterplayer right now — handling their custom CRM, 3D website, SEO, and digital ads!',
      'Buyers can spin 240 GSM tees in 360°, remove white logo backgrounds automatically, and place art on 5 print slots.',
      'Our technical SEO and ad funnels bring B2B buyers straight into the live GST bulk quote calculator.',
    ],
  },
  {
    number: '05',
    slug: 'omniroute-session-sync',
    title: 'OmniRoute Session Sync',
    subtitle: 'Automated Chrome MV3 Extension & Multi-Model AI Session Bridge',
    category: 'Open-Source AI Infrastructure',
    year: '2026',
    role: 'Creator & Open-Source Contributor',
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
      'Multi-Model AI Bridge',
    ],
    summary:
      'The creator of OmniRoute highlighted a major pain point: expiring browser cookies kept breaking web AI models. I built and contributed OmniRoute Session Sync to keep ChatGPT, Gemini, Qwen, Z.ai, Grok, and DeepSeek synced 24/7.',
    description: [
      'When I saw how often expiring browser cookies broke web-session AI gateways, I built OmniRoute Session Sync — a Chrome Manifest V3 extension and local daemon bridge that harvests live cookies, bearer tokens, and User-Agent/client-hint headers automatically.',
      'Using cryptographic X-Session-Sync-Token pairing and background MV3 alarm heartbeats, it pushes fresh session state across ChatGPT, Gemini, Qwen, Z.ai, Grok, and DeepSeek with zero manual DevTools copy-pasting.',
    ],
    metrics: [
      { value: '6+ AI Hosts', label: 'ChatGPT · Gemini · Qwen · Grok · DeepSeek' },
      { value: 'MV3 Alarms', label: 'Zero-Downtime Heartbeat Rotation' },
      { value: 'Open Source', label: 'Contributed to OmniRoute Ecosystem' },
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
      'Expiring cookies used to break web AI gateways constantly — so I built OmniRoute Session Sync to fix it for good.',
      'It pairs your browser with your local gateway using a cryptographic token and syncs session updates on the fly.',
      'Check out the open-source repo at github.com/avichal15/session-sync!',
    ],
  },
  {
    number: '06',
    slug: 'antigravity-gemini-skills',
    title: 'Gemini Web Antigravity Skill Stack',
    subtitle: '65+ Autonomous Agent Skills, MCP Harnesses & Multi-Model Council Router',
    category: 'Agentic AI & MCP Architecture',
    year: '2026',
    role: 'AI Systems Architect',
    bentoSpan: 'col-4',
    bentoTall: false,
    accentColor: '#6366F1',
    surfaceTint: '#ECECFB',
    liveUrl: 'https://github.com/avichal15',
    liveLabel: 'View Skill Stack',
    repoUrl: 'https://github.com/avichal15',
    repoLabel: 'GitHub',
    coverImage: '/media/projects/antigravity-stack.png',
    stack: [
      'Gemini API',
      'Model Context Protocol (MCP)',
      'EmbeddingGemma 2',
      'Obscura Engine',
      'Multi-Agent Council',
    ],
    summary:
      'I engineered my own 65-skill autonomous agent stack for Antigravity — combining multi-model council deliberation, EmbeddingGemma 2 semantic memory, and deterministic browser/CLI verification.',
    description: [
      'To make coding agents genuinely reliable on complex full-stack builds, I designed a modular skill & MCP ecosystem covering accessibility-tree browser testing (Obscura), mistake-immunizing semantic memory (EmbeddingGemma 2), and parallel multi-agent worktrees.',
      'Each skill packages executable scripts, strict verification gates, and low-token telemetry so agents ship verified production software instead of placeholders.',
    ],
    metrics: [
      { value: '65+ Skills', label: 'Modular Agent & MCP Playbooks' },
      { value: '85% Less', label: 'Context Token Overhead' },
      { value: '3-Stage', label: 'Scout · Council · Verifier Loop' },
    ],
    slides: [
      {
        src: '/media/projects/antigravity-stack.png',
        caption: 'Gemini Web Antigravity Skill Stack — Multi-Model Council & MCP Orchestration Architecture',
      },
    ],
    characterComments: [
      'This is the 65-skill agentic backbone I built to orchestrate Gemini, MCP servers, and semantic memory!',
    ],
  },
  {
    number: '07',
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
      'Applying to roles manually takes hours of repetitive formatting. I built Career-Ops to parse job descriptions, match them against my real project evidence, and compile tailored 1-page LaTeX PDFs in 4 seconds.',
    description: [
      'Career-Ops reads a target role’s technical requirements, selects the most relevant verified engineering projects from my portfolio database, and compiles a clean, clickable 1-page PDF without ever inventing fake claims.',
      'It also tracks application stages in SQLite and runs automated Playwright layout checks so every document renders with zero overflow.',
    ],
    metrics: [
      { value: '95%+ ATS', label: 'Semantic Keyword & Evidence Match' },
      { value: '4.2 Sec', label: '1-Page Clickable PDF Compilation' },
      { value: '100%', label: 'Grounded Portfolio Fact Alignment' },
    ],
    slides: [
      { src: '/media/projects/career-ops.png', caption: 'Career-Ops — Autonomous JD Parser & LaTeX Compiler' },
    ],
    characterComments: [
      'I built Career-Ops so tailoring evidence-backed technical applications takes 4 seconds instead of 2 hours.',
    ],
  },
  {
    number: '08',
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
      'I wanted to turn timeless Indian strategy stories into cinematic vertical Reels automatically — so I built Chanakya Reel AI to script, voice, animate, and render 60fps 9:16 MP4s in under 90 seconds.',
    description: [
      'Given a single strategy prompt, the pipeline writes a high-retention hook and script, synthesizes expressive voiceovers, extracts millisecond word boundaries with Whisper, and generates studio keyframes.',
      'FFmpeg then composites Ken Burns camera motion, audio ducking, and word-synced captions into a broadcast-ready 1080x1920 H.264 video.',
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
      'Chanakya Reel AI turns a single strategy topic into a beat-synced 60fps vertical video in under 90 seconds.',
    ],
  },
  {
    number: '09',
    slug: 'trading-swarm',
    title: 'Algorithmic Trading Swarm',
    subtitle: 'Multi-Agent Market Regime Detection & Monte Carlo Risk Engine',
    category: 'Quantitative Systems',
    year: '2026',
    role: 'Quantitative Systems Engineer',
    bentoSpan: 'col-4',
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
      'Single-indicator trading bots fail whenever market volatility shifts. I built Algorithmic Trading Swarm so multiple specialist agents vote on regime shifts behind a 10,000-path Monte Carlo risk gate.',
    description: [
      'Combines uncorrelated alpha factor agents — trend, mean-reversion, order-flow imbalance, and volatility regime classification — with strict Kelly-criterion position sizing.',
      'Every candidate strategy must survive walk-forward optimization and 10,000-path Monte Carlo tail-risk stress testing before a single order is routed.',
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
      'Every signal in my Trading Swarm has to pass a 10,000-path Monte Carlo drawdown gate before execution.',
    ],
  },
  {
    number: '10',
    slug: 'insta-manager',
    title: 'Insta Manager',
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
    terminalLines: [
      '$ insta-manager audit --reel "launch_v2.mp4"',
      '✓ SPR (Sends/Reach): 4.8% [3.4x algorithmic weight]',
      '✓ Keyword DM Funnel: 142 auto-replies dispatched (<1.2s)',
    ],
    stack: ['Node.js', 'React', 'Instagram Graph Bridge', 'SPR Telemetry', 'SQLite'],
    summary:
      'While growing creator pages, I realized DM Sends-Per-Reach (SPR) drives 3–5x more distribution than likes. I built Insta Manager to audit carousel retention, trial reels, and keyword DM funnels.',
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
      { src: '/media/projects/insta-manager.png', caption: 'Insta Manager — SPR Telemetry & Automated DM Funnel Engine' },
    ],
    characterComments: [
      'Insta Manager focuses on the metrics that actually drive reach: DM Sends-Per-Reach and watch completion!',
    ],
  },
  {
    number: '11',
    slug: 'recruitment-funnel-analytics',
    title: 'Recruitment Funnel Analytics',
    subtitle: 'Full-Funnel Hiring Attribution, Channel ROI & Automated Spend Optimizer',
    category: 'BI & Decision Intelligence',
    year: '2025 – 2026',
    role: 'BI & Data Application Engineer',
    bentoSpan: 'col-4',
    bentoTall: false,
    accentColor: '#0D9488',
    surfaceTint: '#E6F4F1',
    liveUrl: 'https://github.com/avichal15',
    liveLabel: 'View Analytics App',
    repoUrl: 'https://github.com/avichal15',
    repoLabel: 'GitHub',
    coverImage: '/media/projects/dashboard-overview.png',
    stack: ['Python', 'Streamlit', 'Plotly', 'Pandas', 'SQLite', 'Rule-Based BI Engine'],
    summary:
      'Talent teams often waste budget on high-click job boards that never convert to hires. I built this interactive BI dashboard in Python, Streamlit, and SQLite to track 250K+ clicks through to qualified hires.',
    description: [
      'Models end-to-end recruitment attribution across Indeed, LinkedIn, Google Jobs, Programmatic, Meta, Referral, and Organic channels — slicing Cost-Per-Applicant ($18.88) and Cost-Per-Hire ($291) by geography, device, and job family.',
      'Includes an automated Rule-Based Recommendations engine that flags inefficient LinkedIn spend, tablet form friction, and high-converting regional cohorts.',
    ],
    metrics: [
      { value: '250.0K', label: 'Top-of-Funnel Clicks Modeled' },
      { value: '$291 CPH', label: 'Channel & Geo Cost-Per-Hire Attribution' },
      { value: 'SQLite + BI', label: 'Automated Spend Recommendations' },
    ],
    slides: [
      {
        src: '/media/projects/dashboard-overview.png',
        caption: 'Executive Funnel Overview — 250K Clicks, 35K Applications, 9.6K Qualified & 1.8K Hires',
      },
      {
        src: '/media/projects/channel-performance.png',
        caption: 'Channel Efficiency & Device Conversion Analysis Across 7 Acquisition Sources',
      },
      {
        src: '/media/projects/recommendations.png',
        caption: 'Automated Rule-Based Spend & UX Recommendations Engine',
      },
    ],
    characterComments: [
      'I built this Streamlit + SQLite BI dashboard to show exactly which hiring channels produce real hires vs wasted clicks.',
      'Notice how it flags Tablet form friction and recommends shifting budget toward top-converting regions automatically!',
    ],
  },
  {
    number: '12',
    slug: 'voca-ai-voice-coach',
    title: 'Voca — AI Voice Coach',
    subtitle: 'Real-Time Prosody, Pace & Confidence Coaching Workspace',
    category: 'AI Product & Speech Coaching',
    year: '2025 – 2026',
    role: 'Product & Full-Stack Engineer',
    bentoSpan: 'col-4',
    bentoTall: false,
    accentColor: '#4F46E5',
    surfaceTint: '#EAEAF8',
    liveUrl: 'https://github.com/avichal15',
    liveLabel: 'View Voca Coach',
    repoUrl: 'https://github.com/avichal15',
    repoLabel: 'GitHub',
    coverImage: '/media/projects/microcoach-desktop.png',
    terminalLines: [
      '$ voca-coach stream --mic default --mode interview',
      '✓ Pace: 138 WPM (Optimal) · Filler words: 0 detected',
      '✓ Confidence & Clarity Score: 94/100 (+18% vs baseline)',
    ],
    stack: ['React', 'TypeScript', 'WebAudio API', 'Gemini Live API', 'PWA'],
    summary:
      'Practicing for interviews or pitches alone feels awkward without feedback. I built Voca — AI Voice Coach to analyze speaking pace, filler words, and vocal confidence in real time through 2-minute daily drills.',
    description: [
      'Combines WebAudio pitch/cadence tracking with Gemini feedback loops to turn intimidating communication goals into approachable 2-minute micro-coaching sessions.',
      'Tracks streak momentum, WPM stability, and filler-word reduction across mobile and desktop.',
    ],
    metrics: [
      { value: '2-Min', label: 'Daily Voice & Pitch Check-Ins' },
      { value: 'Real-Time', label: 'WPM & Filler-Word Telemetry' },
      { value: 'Zero Friction', label: 'Mobile & Desktop WebAudio PWA' },
    ],
    slides: [
      { src: '/media/projects/microcoach-desktop.png', caption: 'Voca — AI Voice & Behavioral Micro-Coaching Workspace' },
    ],
    characterComments: [
      'Voca listens to your speaking pace and filler words in real time so you can nail interviews and product pitches!',
    ],
  },
  {
    number: '13',
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
      'Sales and dispatch teams were losing hours reconciling CSVs across five portals. I built an idempotent webhook orchestrator that syncs Zoho CRM with Shopify, Amazon, Shiprocket, and India Post in real time.',
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
      'This pipeline connected Zoho CRM to Shopify, Amazon, Shiprocket, and India Post with zero manual CSV work.',
    ],
  },
  {
    number: '14',
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
      'For a regional timber and hardware distributor in Meerut & NCR, I built a digital catalog of 280+ SKUs and an interactive room-to-sheet BOQ calculator that sends instant contractor quotes over WhatsApp.',
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
      'Contractors and homeowners use this calculator to estimate plywood and laminate sheets in seconds.',
    ],
  },
  {
    number: '15',
    slug: 'openinssist',
    title: 'OpenInssist',
    subtitle: 'Local-First AI Engineering Workspace with MCP Tool Execution',
    category: 'AI Developer Tools',
    year: '2026',
    role: 'Systems Engineer',
    bentoSpan: 'col-3',
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
      'I built OpenInssist as a local-first AI developer cockpit — uniting multi-model LLM routing, deterministic MCP tool execution, and persistent semantic project memory.',
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
      'OpenInssist brings MCP tools and semantic memory into a fast, local-first developer cockpit.',
    ],
  },
  {
    number: '16',
    slug: 'rizzler',
    title: 'Rizzler AI',
    subtitle: 'Vision-Grounded Conversational Coach & Sub-Second Reply Engine',
    category: 'Consumer AI App',
    year: '2026',
    role: 'Full-Stack Creator',
    bentoSpan: 'col-3',
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
      'Staring at a text thread wondering how to reply? I built Rizzler AI so you can drop any chat screenshot and get witty, context-aware replies streamed in under 600ms.',
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
      'Drop any chat screenshot into Rizzler AI and it crafts a natural reply matched to your vibe.',
    ],
  },
  {
    number: '17',
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
      'An interactive audio-visual web piece I crafted that locks kinetic Hindi/English typography and particle shaders directly to the WebAudio frequency clock at 60fps.',
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
      'Every frame and lyric reveal here is locked directly to the WebAudio frequency spectrum.',
    ],
  },
  {
    number: '18',
    slug: 'remotion-studio',
    title: 'Remotion & Karo Launch Studio',
    subtitle: 'Programmatic React-to-MP4 Video Engine & Keyboard-First Sprint Queue',
    category: 'Programmatic Video & Productivity',
    year: '2026',
    role: 'Creative & Frontend Architect',
    bentoSpan: 'col-3',
    bentoTall: false,
    accentColor: '#EA580C',
    surfaceTint: '#F8EDE4',
    liveUrl: 'https://github.com/avichal15',
    liveLabel: 'View Studio',
    repoUrl: 'https://github.com/avichal15',
    repoLabel: 'GitHub',
    coverImage: '/media/projects/remotion-studio.png',
    stack: ['Remotion', 'React 19', 'Three.js', 'IndexedDB', 'Command Palette'],
    summary:
      'Instead of keyframing product videos by hand, I built a programmatic React-to-MP4 studio paired with Karo — my sub-50ms keyboard-first sprint queue.',
    description: [
      'Uses mathematical spring physics, parameterized React props, and automated FFmpeg audio mastering to render deterministic 60fps product launch trailers alongside a hotkey-driven sprint workspace.',
    ],
    metrics: [
      { value: '60fps', label: 'Deterministic React-to-MP4 Render' },
      { value: '< 50ms', label: 'Karo Command Palette Triage' },
      { value: '3D Rig', label: 'Spring-Physics Camera Motion' },
    ],
    slides: [
      { src: '/media/projects/remotion-studio.png', caption: 'Remotion Launch Studio — Programmatic React-to-MP4 Video Engine' },
      { src: '/media/projects/karo.png', caption: 'Karo — Keyboard-First Action Queue & Sprint Timeboxer' },
    ],
    characterComments: [
      'Why edit launch videos by hand when you can write React components and render 60fps MP4s deterministically?',
    ],
  },
];

export const ALL_WORK_BY_SLUG = Object.fromEntries(
  ALL_PROJECTS.map((project) => [project.slug, project])
);

// ============================================================================
// 5 USER-APPROVED CERTIFICATIONS & CREDENTIALS (#certifications)
// Zero mention of "Coursera" anywhere
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
