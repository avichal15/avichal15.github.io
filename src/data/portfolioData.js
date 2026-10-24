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
    tagline: 'Android telecom services, Audio Emojis, and AI gateways.',
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
// 3 GUIDED TOUR CHAPTERS (Matched to sebg.ch .tour__chapter choreography)
// ============================================================================
export const TOUR_CHAPTERS = [
  {
    id: 'tour-medistudygo',
    projectSlug: 'medistudygo',
    title: 'MediStudyGo',
    mascotSide: 'left', // Character runs from right -> left, stands on left pointing right
    outfit: 'doctor',
    bgLight: '#E5F2EE',
    bgDark: '#0D191B',
    hosts: [{ label: 'medistudygo.com', url: 'https://medistudygo.com/' }],
    desktopSlides: [
      {
        src: '/media/projects/medistudygo-desktop.png',
        alt: 'MediStudyGo live desktop storefront showing MBBS, BDS, BPT, and Nursing mind maps',
        badge: 'LIVE STOREFRONT · 50,000+ LEARNERS',
        caption: 'MBBS, BDS, BPT & Nursing Visual Mind Maps, Flashcards & NEET PG Revision Bundles',
      },
      {
        src: '/media/projects/medistudygo-desktop.png',
        alt: 'MediStudyGo 7-Platform Automated Operations Engine',
        badge: '7-PLATFORM OPERATIONS PIPELINE',
        caption: 'Shopify ↔ Shiprocket ↔ DoubleTick WhatsApp ↔ Graphy LMS ↔ Brevo ↔ Razorpay ↔ Sheets',
        overlayPills: [
          'Shopify Storefront',
          'Razorpay Webhooks',
          'Graphy LMS Provisioning',
          'DoubleTick WhatsApp',
          'Shiprocket Dispatch',
          'Brevo Lifecycle Email',
          'Google Sheets Telemetry',
        ],
      },
      {
        src: '/media/projects/medistudygo-desktop.png',
        alt: 'MediStudyGo 29,500+ Active-Recall Flashcards & Cohort Analytics',
        badge: '29,500+ FLASHCARDS & ZERO-BOTTLENECK ONBOARDING',
        caption: 'Automated order-to-entitlement provisioning & exam-season cohort broadcasts',
        overlayStats: [
          { value: '50,000+', label: 'Medical & Dental Learners' },
          { value: '29,500+', label: 'Active-Recall Flashcards' },
          { value: '7 Systems', label: 'Unified in Real Time' },
        ],
      },
    ],
    mobileSlides: [
      {
        src: '/media/projects/medistudygo-mobile.png',
        alt: 'MediStudyGo mobile storefront',
      },
      {
        src: '/media/projects/medistudygo-mobile.png',
        alt: 'MediStudyGo mobile cohort selector',
      },
      {
        src: '/media/projects/medistudygo-mobile.png',
        alt: 'MediStudyGo mobile instant app onboarding',
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
    mascotSide: 'right', // Character runs from left -> right, stands on right pointing left
    outfit: 'techy',
    bgLight: '#EAE6F8',
    bgDark: '#121024',
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
        src: '/media/projects/phoney-social-preview.png',
        alt: 'Phoney Android InCallService architecture and themes',
        badge: 'KOTLIN INCALLSERVICE · ZERO-CLUTTER DIALER',
        caption: 'Native cellular call controls, fast contact search, and transparent privacy permissions.',
      },
      {
        src: '/media/projects/phoney-desktop.png',
        alt: 'Phoney 6-Slot Audio Emoji Quick Tray interactive preview',
        badge: 'LIVE INTERACTIVE · 6 DEFAULT AUDIO EMOJIS',
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
    id: 'tour-commerce',
    projectSlug: 'masterplayer-designs-and-printing',
    title: 'Masterplayer & TruGifting',
    mascotSide: 'left', // Character runs from right -> left, stands on left pointing right
    outfit: 'masterplayer',
    bgLight: '#F7ECE4',
    bgDark: '#1A1215',
    hosts: [
      { label: 'masterplayerprints.com', url: 'https://masterplayerprints.com/', activeOnSteps: [0, 1] },
      { label: 'trugiftingsolutions.com', url: 'https://trugiftingsolutions.com/', activeOnSteps: [2] },
    ],
    desktopSlides: [
      {
        src: '/media/projects/masterplayer-desktop.png',
        alt: 'Masterplayer Designs & Printing 360 WebGL 3D Customizer Studio',
        badge: 'MASTERPLAYERPRINTS.COM · 360° WEBGL STUDIO',
        caption: 'Interactive 2D/3D custom apparel & merch studio across 22 architectural departments.',
      },
      {
        src: '/media/projects/masterplayer-desktop.png',
        alt: 'Masterplayer 3D print slot configurator and 18% GST B2B bulk calculator',
        badge: '3D PRINT SLOTS · 18% GST B2B ENGINE',
        caption: 'Spin 240 GSM tees in 360°, snap logos onto chest/back/sleeve slots & calculate bulk GST quotes.',
        overlayPills: [
          '360° WebGL Garment Rig',
          'Auto White-BG Removal',
          '5 Precision Print Slots',
          '18% GST Input Credit Calculator',
          'WhatsApp Studio Dispatch',
        ],
      },
      {
        src: '/media/projects/trugifting-desktop.png',
        alt: 'TruGifting Solutions B2B corporate gifting and 360+ brand vouchers platform',
        badge: 'TRUGIFTINGSOLUTIONS.COM · 360+ BRAND VOUCHERS',
        caption: 'Enterprise corporate gifting, employee R&R rewards, and instant B2B voucher quote flows.',
      },
    ],
    mobileSlides: [
      {
        src: '/media/projects/masterplayer-mobile.png',
        alt: 'Masterplayer mobile 3D studio',
      },
      {
        src: '/media/projects/masterplayer-mobile.png',
        alt: 'Masterplayer mobile print slot selector',
      },
      {
        src: '/media/projects/trugifting-mobile.png',
        alt: 'TruGifting Solutions mobile storefront',
      },
    ],
    bubbles: [
      'Third: Masterplayer Prints and TruGifting Solutions — two B2B commerce platforms I architected end to end.',
      "In Masterplayer's 360° WebGL Studio, buyers spin 240 GSM apparel in 3D, snap logos onto print slots, and calculate 18% GST bulk quotes.",
      'And on TruGifting Solutions, HR and procurement teams browse 360+ brand vouchers and dispatch enterprise R&R orders in seconds.',
    ],
  },
];

// ============================================================================
// ALL 18 VERIFIED PROJECTS FOR THE VARIABLE-SPAN BENTO GRID (#work)
// Every project has a verified live URL and/or public GitHub URL, Bento colSpan,
// multi-slide gallery, and 3 character commentary bubbles for the Project Window.
// ============================================================================
export const ALL_PROJECTS = [
  // ROW 1: 6 + 6 = 12
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
      'DoubleTick WhatsApp API',
      'Razorpay Webhooks',
      'Shiprocket',
      'Brevo',
      'Google Sheets Telemetry',
    ],
    summary:
      'Owned learner onboarding automation, 7-platform e-commerce/LMS/CRM integrations, and operational analytics for a medical exam-prep platform serving 50,000+ MBBS, BDS, BPT, and Nursing students.',
    highlights: [
      'Connected Shopify, Shiprocket, DoubleTick WhatsApp, Graphy LMS, Brevo, Razorpay, and Google Sheets into automated order-to-access workflows.',
      'Structured 29,500+ active-recall flashcards and visual mind-map catalogs across MBBS, BDS, BPT, and Nursing cohorts.',
      'Automated cart recovery, exam-season broadcasts, and weekly cross-functional KPI reporting.',
    ],
    commentary: [
      'At MediStudyGo, I sat right where 50,000+ medical students meet day-to-day product and platform operations.',
      'Whenever an order landed on Shopify or Razorpay, my workflows provisioned Graphy LMS access, triggered DoubleTick WhatsApp onboarding, and synced Shiprocket tracking.',
      'That operational backbone let the team ship peak NEET PG and University exam campaigns with zero manual provisioning bottlenecks.',
    ],
    slides: [
      {
        src: '/media/projects/medistudygo-desktop.png',
        caption: 'Live storefront at medistudygo.com serving MBBS, BDS, BPT, and Nursing cohorts.',
      },
      {
        src: '/media/projects/medistudygo-mobile.png',
        caption: 'Mobile-first course discovery, mind maps, and 50,000+ student social proof.',
      },
    ],
  },
  {
    number: '02',
    slug: 'phoney',
    title: 'Phoney',
    subtitle: 'Expressive Android Dialer with 6-Slot Audio Emojis & 3D Web Showcase',
    category: 'Android App & 3D Web',
    year: '2026',
    role: 'Creator, Android & Full-Stack Engineer',
    bentoSpan: 'col-6',
    bentoTall: true,
    accentColor: '#2563EB',
    surfaceTint: '#EAE8FF',
    liveUrl: 'https://phoney.avichalgoyal.me/',
    liveLabel: 'Visit phoney.avichalgoyal.me',
    repoUrl: 'https://github.com/avichal15/phoney-beta',
    repoLabel: 'GitHub (phoney-beta)',
    coverImage: '/media/projects/phoney-desktop.png',
    stack: [
      'Android (Kotlin / InCallService)',
      'React 19',
      'Three.js / WebGL',
      'Web Audio Synthesizer',
      'Material You Themes',
    ],
    summary:
      'An everyday Android calling app that brings one-tap Audio Emojis (Cheer, Faaah, Fart, Womp Womp, Wow, Yay!) and clean call controls to live phone conversations, paired with an interactive 3D showcase at phoney.avichalgoyal.me.',
    highlights: [
      'Architected the native Android dialer and InCallService UI with a customizable 6-slot Audio Emoji Quick Tray.',
      'Built the interactive 3D web showcase at phoney.avichalgoyal.me featuring a draggable handset sculpture and live sound previews.',
      'Designed four tactile visual themes (Light, Dark, Soft, Neo-Brutalist) and transparent local-first privacy controls.',
    ],
    commentary: [
      'I built Phoney because standard phone calls still feel stuck in 2010 — rigid, silent, and expressionless.',
      'Inside the call screen, the 6-slot Quick Tray lets you fire Cheer 👏, Faaah 😱, Fart 💨, Womp Womp 😑, Wow 🤩, or Yay! 🙌 with one thumb tap.',
      'I also crafted the companion 3D website at phoney.avichalgoyal.me so anyone can test the handset and soundboard in their browser.',
    ],
    slides: [
      {
        src: '/media/projects/phoney-desktop.png',
        caption: 'Interactive 3D web showcase at phoney.avichalgoyal.me.',
      },
      {
        src: '/media/projects/current-sounds.webp',
        caption: 'Android app Sounds tab showing the 6 default Audio Emojis in the Quick Tray.',
      },
      {
        src: '/media/projects/call.webp',
        caption: 'Live Android In-Call interface with one-tap Audio Emoji reactions.',
      },
      {
        src: '/media/projects/current-recents.webp',
        caption: 'Zero-clutter Recents screen with smart call filters.',
      },
    ],
  },

  // ROW 2: 6 + 6 = 12
  {
    number: '03',
    slug: 'masterplayer-designs-and-printing',
    title: 'Masterplayer Designs & Printing',
    subtitle: 'Interactive 360° WebGL 3D Print Customizer & B2B Merch Studio',
    category: '3D WebGL & B2B Commerce',
    year: '2026',
    role: 'Product Engineer & Creative Technologist',
    bentoSpan: 'col-6',
    bentoTall: true,
    accentColor: '#DC2626',
    surfaceTint: '#FEE2E2',
    liveUrl: 'https://masterplayerprints.com/',
    liveLabel: 'Visit masterplayerprints.com',
    repoUrl: 'https://github.com/avichal15/masterplayer-printing-and-design',
    repoLabel: 'GitHub Repo',
    coverImage: '/media/projects/masterplayer-desktop.png',
    stack: [
      'Three.js / WebGL 360° Studio',
      'HTML5 2D Print Canvas',
      'Shopify Online Store 2.0',
      '18% GST Bulk Pricing Engine',
      'WhatsApp Dispatch',
    ],
    summary:
      'Interactive 2D/3D custom print studio at masterplayerprints.com where buyers spin 240–380 GSM apparel and drinkware in 360° WebGL, snap logos onto specific print zones, auto-remove white backgrounds, and calculate B2B bulk quotes.',
    highlights: [
      'Engineered the 360° WebGL 3D customizer and 2D workbench supporting Center Chest, Left Crest, Oversized Front, Back Print, and Sleeve slots.',
      'Built client-side white-background removal and live B2B tiered pricing with 18% GST input credit calculation.',
      'Structured 22 studio departments and 63+ customizable blanks with direct WhatsApp Studio handoff.',
    ],
    commentary: [
      'Custom apparel buyers hate guessing how their logo will look on a 240 GSM tee or hoodie over endless WhatsApp messages.',
      'So I built a real-time 360° WebGL studio at masterplayerprints.com where you upload artwork, strip the white background in one click, and place it right on the 3D garment.',
      'As you adjust quantities, the B2B pricing engine calculates volume discounts and 18% GST credit automatically.',
    ],
    slides: [
      {
        src: '/media/projects/masterplayer-desktop.png',
        caption: 'Live 360° WebGL 3D Studio at masterplayerprints.com.',
      },
      {
        src: '/media/projects/masterplayer-mobile.png',
        caption: 'Mobile 3D customizer with print-slot pills and color swatches.',
      },
    ],
  },
  {
    number: '04',
    slug: 'trugifting-solutions',
    title: 'TruGifting Solutions',
    subtitle: 'B2B Corporate Gifting, 360+ Brand Vouchers & Employee R&R Platform',
    category: 'B2B Storefront & Vouchers',
    year: '2026',
    role: 'Independent Full-Stack & Frontend Engineer',
    bentoSpan: 'col-6',
    bentoTall: true,
    accentColor: '#059669',
    surfaceTint: '#D1FAE5',
    liveUrl: 'https://trugiftingsolutions.com/',
    liveLabel: 'Visit trugiftingsolutions.com',
    repoUrl: 'https://github.com/avichal15',
    repoLabel: 'GitHub Profile',
    coverImage: '/media/projects/trugifting-desktop.png',
    stack: [
      'Responsive Web Architecture',
      '360+ Brand Voucher Catalog',
      'B2B Quote & Demo Workflows',
      'SEO & Core Web Vitals',
    ],
    summary:
      'Production B2B web platform at trugiftingsolutions.com showcasing 360+ brand gift vouchers (Amazon, Flipkart, Swiggy, MakeMyTrip), curated corporate gifting catalogs, and instant enterprise quote generation.',
    highlights: [
      'Shipped the end-to-end digital storefront at trugiftingsolutions.com covering Brand Vouchers, Corporate Gifting, Employee R&R, and Channel Loyalty.',
      'Built interactive voucher exploration filters across 360+ partner brands and high-conversion B2B consultation flows.',
      'Optimized mobile and desktop rendering for sub-second load times and 98/100 Lighthouse performance.',
    ],
    commentary: [
      'TruGifting Solutions was an independent build designed for HR leaders and enterprise procurement teams.',
      'Instead of a static PDF catalog, visitors can explore 360+ instant brand vouchers and corporate hamper tiers right in the browser.',
      'The quote workflow captures MOQ, branding preferences, and delivery timelines in seconds.',
    ],
    slides: [
      {
        src: '/media/projects/trugifting-desktop.png',
        caption: 'Live desktop platform at trugiftingsolutions.com showing the 360+ brand voucher wheel.',
      },
      {
        src: '/media/projects/trugifting-mobile.png',
        caption: 'Responsive mobile experience for rapid B2B gift discovery.',
      },
    ],
  },

  // ROW 3: 4 + 4 + 4 = 12
  {
    number: '05',
    slug: 'mahadev-plywood',
    title: 'Mahadev Plywood',
    subtitle: 'Architectural Material Catalog, Laminate Specs & Dealer Portal',
    category: 'B2B Architectural Catalog',
    year: '2026',
    role: 'Full-Stack Web Developer',
    bentoSpan: 'col-4',
    accentColor: '#D97706',
    surfaceTint: '#FEF3C7',
    liveUrl: 'https://github.com/avichal15/Mahadev-plywood',
    liveLabel: 'View Mahadev Plywood ↗',
    repoUrl: 'https://github.com/avichal15/Mahadev-plywood',
    repoLabel: 'GitHub (Mahadev-plywood)',
    coverImage: null,
    previewCode: 'MAHADEV · PLY & VENEER SPEC PORTAL\n• Marine / BWR / MR Grade Comparison\n• Thickness & Core Calibration Matrix\n• Instant Dealer & Architect Quote Routing',
    stack: ['React', 'Tailwind CSS', 'Product Taxonomy', 'WhatsApp & Dealer Lead API'],
    summary:
      'Digital specification portal and catalog for architectural plywood, blockboards, laminates, and veneers with instant contractor and dealer inquiry routing.',
    highlights: [
      'Built tactile material comparison cards detailing thickness tolerances, ISI grades (BWP/BWR/MR), and core compositions.',
      'Engineered fast category filtering and direct WhatsApp/dealer quote dispatch for architects and interior contractors.',
    ],
    commentary: [
      'Contractors and interior designers browsing Mahadev Plywood needed clear technical specs — not vague brochure photos.',
      'I organized the catalog around ISI grade certifications, thickness calibrations, and surface finishes with one-click dealer inquiry routing.',
    ],
    slides: [],
  },
  {
    number: '06',
    slug: 'dhuri-hoon-mai',
    title: 'Dhuri Hoon Mai',
    subtitle: 'Community Social Impact, Volunteer Mobilization & NGO Platform',
    category: 'Social Impact & Web Platform',
    year: '2025 – 2026',
    role: 'Frontend & Web Platform Developer',
    bentoSpan: 'col-4',
    accentColor: '#E11D48',
    surfaceTint: '#FFE4E6',
    liveUrl: 'https://github.com/avichal15/dhuri-hoon-mai',
    liveLabel: 'View Dhuri Hoon Mai ↗',
    repoUrl: 'https://github.com/avichal15/dhuri-hoon-mai',
    repoLabel: 'GitHub (dhuri-hoon-mai)',
    coverImage: null,
    previewCode: 'DHURI HOON MAI · IMPACT PLATFORM\n• Grassroots Campaign Storytelling\n• Volunteer Onboarding & Event Drives\n• Accessible Mobile-First Web Layout',
    stack: ['React / Modern Web', 'Responsive UI', 'Campaign Storytelling', 'Volunteer Workflows'],
    summary:
      'Digital presence and volunteer mobilization platform for Dhuri Hoon Mai, showcasing grassroots community drives, impact stories, and accessible participation workflows.',
    highlights: [
      'Designed an empathetic, mobile-first storytelling layout highlighting field initiatives and measurable community outcomes.',
      'Streamlined volunteer registration and outreach contact flows for rapid campaign mobilization.',
    ],
    commentary: [
      'Dhuri Hoon Mai is a social-impact platform built to amplify grassroots community work and onboard volunteers without friction.',
      'Every page was tuned for fast loading on low-bandwidth mobile connections so anyone can join a drive easily.',
    ],
    slides: [],
  },
  {
    number: '07',
    slug: 'microcoach-ai',
    title: 'MicroCoach AI',
    subtitle: 'Habit Streak Companion & Classroom Observation AI Copilot',
    category: 'AI Productivity & EdTech',
    year: '2025 – 2026',
    role: 'Full-Stack & AI Engineer',
    bentoSpan: 'col-4',
    accentColor: '#7C3AED',
    surfaceTint: '#F3E8FF',
    liveUrl: 'https://projectmicrocoach.netlify.app/',
    liveLabel: 'Visit projectmicrocoach.netlify.app',
    repoUrl: 'https://github.com/avichal15/MicroCoach-AI',
    repoLabel: 'GitHub (MicroCoach-AI)',
    coverImage: '/media/projects/microcoach-desktop.png',
    stack: ['React', 'Tailwind CSS', 'LLM Rubric Copilot', 'Local Persistence', 'Netlify'],
    summary:
      'Daily habit streak companion and AI micro-coaching workspace deployed at projectmicrocoach.netlify.app, paired with citation-grounded classroom observation rubric scoring.',
    highlights: [
      'Shipped distraction-free daily streak tracking, accountability partner views, and one-tap completion at projectmicrocoach.netlify.app.',
      'Built an AI rubric evaluation pipeline in MicroCoach-AI that turns observation notes into actionable micro-feedback.',
    ],
    commentary: [
      'MicroCoach started from a simple rule: help people build daily momentum in under 30 seconds without bloated setup screens.',
      'It combines a live habit & streak tracker on Netlify with an AI coaching engine on GitHub.',
    ],
    slides: [
      {
        src: '/media/projects/microcoach-desktop.png',
        caption: 'Live MicroCoach web app at projectmicrocoach.netlify.app.',
      },
    ],
  },

  // ROW 4: 6 + 6 = 12
  {
    number: '08',
    slug: 'omniroute-upstream',
    title: 'OmniRoute LLM Gateway (PR #13127)',
    subtitle: 'Open-Source Multi-Provider AI Gateway · Private LAN & Tailscale Auth Fix',
    category: 'Open Source · AI Infrastructure',
    year: '2026',
    role: 'Open-Source Contributor',
    bentoSpan: 'col-6',
    accentColor: '#0284C7',
    surfaceTint: '#E0F2FE',
    liveUrl: 'https://github.com/diegosouzapw/OmniRoute',
    liveLabel: 'View Upstream Repo ↗',
    repoUrl: 'https://github.com/diegosouzapw/OmniRoute',
    repoLabel: 'GitHub (diegosouzapw/OmniRoute)',
    coverImage: null,
    previewCode:
      'UPSTREAM PR #13127 · LAN & TAILSCALE AUTH\n• Fixed HTTP 401 Cookie Drops on RFC-1918 & CGNAT\n• Protocol-Aware SameSite/Secure Negotiation\n• 13+ Frontier LLM Providers Unified',
    stack: ['Node.js', 'Multi-LLM Routing', 'HTTP Cookie Security', 'Tailscale / Private LAN', 'Docker'],
    summary:
      'Resolved cross-subnet session drops and cookie rejection when self-hosting the OmniRoute multi-provider LLM gateway across private LANs, Docker bridges, and Tailscale nodes without TLS termination.',
    highlights: [
      'Diagnosed RFC-1918 and CGNAT Tailscale origin mismatches that caused silent 401 login loops on headless deployments.',
      'Implemented protocol-aware SameSite/Secure cookie negotiation and dynamic origin validation.',
    ],
    commentary: [
      'When self-hosting OmniRoute across a private LAN or Tailscale mesh over plain HTTP, strict Secure cookie flags silently dropped authentication sessions.',
      'I engineered protocol-aware cookie negotiation so local and mesh operators get reliable authentication without weakening HTTPS deployments.',
    ],
    slides: [],
  },
  {
    number: '09',
    slug: 'omniroute-session-sync',
    title: 'OmniRoute Session Sync',
    subtitle: 'Zero-Dependency Browser Cookie & Token Sync Bridge for Local AI Gateways',
    category: 'Open Source · Developer Tooling',
    year: '2026',
    role: 'Creator & Maintainer',
    bentoSpan: 'col-6',
    accentColor: '#4F46E5',
    surfaceTint: '#E0E7FF',
    liveUrl: 'https://github.com/avichal15/omniroute-session-sync',
    liveLabel: 'View on GitHub ↗',
    repoUrl: 'https://github.com/avichal15/omniroute-session-sync',
    repoLabel: 'GitHub (omniroute-session-sync)',
    coverImage: null,
    previewCode:
      'OMNIROUTE-SESSION-SYNC · CLI & EXTENSION\n• Zero-Dependency Node.js Companion\n• Auto-Syncs Provider Cookies to 127.0.0.1:20128\n• Eliminates Manual DevTools Token Copy-Paste',
    stack: ['JavaScript (Node.js)', 'Chrome Extension APIs', 'Local HTTP Bridge', 'CLI Automation'],
    summary:
      'Independent zero-dependency companion utility that automatically synchronizes authenticated browser sessions into a local OmniRoute AI gateway instance.',
    highlights: [
      'Eliminated manual DevTools token copy-pasting across provider tabs with an automated local session bridge.',
      'Published as a clean, auditable zero-dependency open-source package on GitHub.',
    ],
    commentary: [
      'Copying session cookies out of Chrome DevTools every time an AI provider token rotates is painful.',
      'OmniRoute Session Sync automates that handshake locally with zero third-party dependencies.',
    ],
    slides: [],
  },

  // ROW 5: 4 + 4 + 4 = 12
  {
    number: '10',
    slug: 'insta-manager',
    title: 'Insta Manager',
    subtitle: 'Local-First Creator Outreach CRM & Browser Automation Bridge',
    category: 'Open Source · Desktop CRM',
    year: '2026',
    role: 'Creator & Full-Stack Engineer',
    bentoSpan: 'col-4',
    accentColor: '#DB2777',
    surfaceTint: '#FCE7F3',
    liveUrl: 'https://github.com/avichal15/Insta-manager',
    liveLabel: 'View on GitHub ↗',
    repoUrl: 'https://github.com/avichal15/Insta-manager',
    repoLabel: 'GitHub (Insta-manager)',
    coverImage: null,
    previewCode:
      'INSTA MANAGER · CREATOR CRM\n• Local-First Prospect & Reel Tracking\n• Human-in-the-Loop Browser Bridge\n• Structured DM Follow-Up Queues',
    stack: ['React', 'Node.js', 'SQLite / Local State', 'Browser Acceptance Bridge'],
    summary:
      'Local-first desktop workspace and browser bridge for organizing creator outreach, DM follow-ups, Reel discovery, and content operations.',
    highlights: [
      'Replaced scattered spreadsheets and open social tabs with structured lead stages and template queues.',
      'Built a deterministic human-in-the-loop browser bridge for safe, repeatable creator workflows.',
    ],
    commentary: [
      'Managing high-volume creator collaborations inside raw Instagram tabs leads to lost threads and duplicate DMs.',
      'Insta Manager gives operators a local-first CRM with structured pipeline stages and browser automation helpers.',
    ],
    slides: [],
  },
  {
    number: '11',
    slug: 'recruitment-funnel-dashboard',
    title: 'Recruitment Funnel Analytics',
    subtitle: 'Multi-Tab BI Dashboard for Click-to-Hire Conversion & Channel CPH',
    category: 'Open Source · BI & Analytics',
    year: '2026',
    role: 'Data & Analytics Engineer',
    bentoSpan: 'col-4',
    accentColor: '#2563EB',
    surfaceTint: '#DBEAFE',
    liveUrl: 'https://github.com/avichal15/recruitment-funnel-dashboard',
    liveLabel: 'View on GitHub ↗',
    repoUrl: 'https://github.com/avichal15/recruitment-funnel-dashboard',
    repoLabel: 'GitHub (recruitment-funnel-dashboard)',
    coverImage: '/media/projects/dashboard-overview.png',
    stack: ['Python', 'Streamlit', 'Pandas', 'Plotly', 'SQLite', 'Faker'],
    summary:
      'Interactive recruitment marketing BI dashboard tracking 250K clicks to 1.8K hires, channel CPA vs. CPH, geo drop-off heatmaps, and automated spend reallocation.',
    highlights: [
      'Engineered executive KPI views, channel performance matrices, and budget optimization recommendations in Python + Streamlit + Plotly.',
      'Backed by a reproducible SQLite + Faker synthetic data pipeline for transparent public demonstration.',
    ],
    commentary: [
      'Talent acquisition teams often optimize for cheap clicks instead of qualified hires.',
      'This BI dashboard compares Cost-per-Applicant against Cost-per-Hire across channels and flags exactly where to reallocate budget.',
    ],
    slides: [
      {
        src: '/media/projects/dashboard-overview.png',
        caption: 'Executive Funnel Overview: 250.0K clicks to 1.8K hires.',
      },
      {
        src: '/media/projects/channel-performance.png',
        caption: 'Channel CPA vs. CPH comparison across job boards.',
      },
      {
        src: '/media/projects/recommendations.png',
        caption: 'Automated budget reallocation and ROI recommendations.',
      },
    ],
  },
  {
    number: '12',
    slug: 'voca-ai',
    title: 'Voca — AI Voice Coach',
    subtitle: 'Interactive Spoken Communication, Fluency & Interview Practice Tool',
    category: 'Open Source · Voice AI',
    year: '2025 – 2026',
    role: 'Creator & Full-Stack Engineer',
    bentoSpan: 'col-4',
    accentColor: '#0891B2',
    surfaceTint: '#CFFAFE',
    liveUrl: 'https://github.com/avichal15/voca',
    liveLabel: 'View Voca on GitHub ↗',
    repoUrl: 'https://github.com/avichal15/voca',
    repoLabel: 'GitHub (voca)',
    coverImage: null,
    previewCode:
      'VOCA · AI VOICE & FLUENCY COACH\n• Real-Time Speech & Pacing Feedback\n• Structured Interview & Pitch Prompts\n• Actionable Filler-Word & Clarity Metrics',
    stack: ['React / TypeScript', 'Web Speech & Audio APIs', 'LLM Evaluation', 'Tailwind CSS'],
    summary:
      'AI-powered spoken communication and interview practice workspace that helps users refine pacing, clarity, and vocal confidence.',
    highlights: [
      'Built interactive speaking drills with transcript capture, filler-word detection, and structured clarity feedback.',
      'Designed a calm, low-friction voice recording interface that runs directly in modern browsers.',
    ],
    commentary: [
      'Voca was built to make spoken communication practice feel natural and immediate.',
      'You record a response or pitch, and Voca breaks down your pacing, filler words, and phrasing clarity.',
    ],
    slides: [],
  },

  // ROW 6: 4 + 4 + 4 = 12
  {
    number: '13',
    slug: 'gemini-web-antigravity-stack',
    title: 'Gemini Web Antigravity Stack',
    subtitle: 'Multi-Agent AI Engineering Harness, Hook Guardrails & Skill Router',
    category: 'Open Source · Agentic AI',
    year: '2026',
    role: 'Systems Architect',
    bentoSpan: 'col-4',
    accentColor: '#D97706',
    surfaceTint: '#FEF9C3',
    liveUrl: 'https://github.com/avichal15/gemini-web-antigravity-stack',
    liveLabel: 'View on GitHub ↗',
    repoUrl: 'https://github.com/avichal15/gemini-web-antigravity-stack',
    repoLabel: 'GitHub (gemini-web-antigravity-stack)',
    coverImage: null,
    previewCode:
      'GEMINI WEB ANTIGRAVITY STACK\n• PreToolUse / PostToolUse / Stop Hooks\n• Episodic Mistake Antibodies & Lint Gates\n• Multi-Model Council & Token Compression',
    stack: ['Node.js (.mjs)', 'MCP Servers', 'PreToolUse / PostToolUse Hooks', 'Multi-Agent Orchestration'],
    summary:
      'Production agentic coding harness integrating automated compiler/lint hooks, episodic mistake antibodies, token-saving CLI wrappers, and multi-model verification gates.',
    highlights: [
      'Architected deterministic PreToolUse, PostToolUse, and Stop hooks that enforce static analysis and completion gates automatically.',
      'Integrated multi-provider LLM routing and semantic memory recall for high-reliability autonomous engineering.',
    ],
    commentary: [
      'AI coding agents fail when they repeat past mistakes or stop before verifying their build.',
      'This stack wires compiler checks, mistake antibodies, and acceptance gates directly into the agent loop.',
    ],
    slides: [],
  },
  {
    number: '14',
    slug: 'chanakya-reel-ai',
    title: 'Chanakya Reel AI',
    subtitle: 'Autonomous 9:16 Short-Form Video Synthesis & FFmpeg Caption Pipeline',
    category: 'Generative Media Pipeline',
    year: '2026',
    role: 'Creator & AI Pipeline Engineer',
    bentoSpan: 'col-4',
    accentColor: '#9333EA',
    surfaceTint: '#F3E8FF',
    liveUrl: 'https://github.com/avichal15',
    liveLabel: 'View GitHub Profile ↗',
    repoUrl: 'https://github.com/avichal15',
    repoLabel: 'GitHub (avichal15)',
    coverImage: null,
    previewCode:
      'CHANAKYA REEL AI · 9:16 VIDEO SYNTH\n• LLM Storyboard & Character Continuity\n• TTS Voice + <15ms Word-Level Captions\n• Automated 60fps FFmpeg Render Pipeline',
    stack: ['Python / Node.js', 'FFmpeg Compositing', 'Multimodal AI', 'ASS Word-Level Subtitles', 'TTS Synthesis'],
    summary:
      'Automated script-to-reel production harness combining LLM storyboarding, character-consistent visual prompts, voice synthesis, and FFmpeg 9:16 motion compositing.',
    highlights: [
      'Automated scene generation, TTS audio timing, and dynamic word-by-word subtitle burn-in with under 15ms drift.',
      'Compressed hours of manual short-form video editing into a repeatable CLI pipeline.',
    ],
    commentary: [
      'Producing high-retention 9:16 storytelling reels manually takes hours of keyframing and caption syncing.',
      'Chanakya Reel AI automates the entire pipeline from script to 60fps rendered vertical video.',
    ],
    slides: [],
  },
  {
    number: '15',
    slug: 'whatsapp-to-csv-converter',
    title: 'WhatsApp to CSV Converter',
    subtitle: 'Deterministic Parser Turning Exported Chat Logs into Clean Analytics Tables',
    category: 'Open Source · Data Utility',
    year: '2025',
    role: 'Creator & Maintainer',
    bentoSpan: 'col-4',
    accentColor: '#16A34A',
    surfaceTint: '#DCFCE7',
    liveUrl: 'https://github.com/avichal15/whatsapp-to-csv-converter',
    liveLabel: 'View on GitHub ↗',
    repoUrl: 'https://github.com/avichal15/whatsapp-to-csv-converter',
    repoLabel: 'GitHub (whatsapp-to-csv-converter)',
    coverImage: null,
    previewCode:
      'WHATSAPP-TO-CSV · STREAM PARSER\n• Multi-Line Message & Emoji Safe\n• Locale Timestamp Normalization\n• Instant UTF-8 CSV Export for CRM/BI',
    stack: ['Python / JavaScript', 'Regex Stream Parsing', 'UTF-8 CSV Hygiene'],
    summary:
      'Lightweight open-source parser that transforms raw exported WhatsApp `.txt` chat logs into structured UTF-8 CSV datasets ready for CRM import or BI analysis.',
    highlights: [
      'Handles multi-line messages, system events, and international timestamp formats that break naive spreadsheet imports.',
    ],
    commentary: [
      'Support and operations teams export WhatsApp threads all the time, only to watch Excel mangle multi-line messages.',
      'This utility parses raw chat exports into clean, analysis-ready CSV columns in seconds.',
    ],
    slides: [],
  },

  // ROW 7: 4 + 4 + 4 = 12
  {
    number: '16',
    slug: 'unified-crm-ecommerce-integration',
    title: '7-Platform CRM & E-Commerce Engine',
    subtitle: 'Webhook & Order Lifecycle Automation Across Zoho, Shopify & Shiprocket',
    category: 'Operations Automation',
    year: '2025',
    role: 'Product & Operations Engineer',
    bentoSpan: 'col-4',
    accentColor: '#0F766E',
    surfaceTint: '#CCFBF1',
    liveUrl: 'https://medistudygo.com/',
    liveLabel: 'Live on MediStudyGo ↗',
    repoUrl: 'https://github.com/avichal15',
    repoLabel: 'GitHub Profile',
    coverImage: '/media/projects/medistudygo-desktop.png',
    stack: ['Zoho CRM', 'Shopify', 'WooCommerce', 'Shiprocket', 'DoubleTick WhatsApp', 'Webhooks'],
    summary:
      'End-to-end webhook and API integration bridging storefront checkouts, courier dispatch events, WhatsApp notifications, and CRM deal stages.',
    highlights: [
      'Eliminated manual CSV handoffs between e-commerce checkouts, Shiprocket courier webhooks, and CRM pipeline stages.',
    ],
    commentary: [
      'Disconnected tools silently drain hours from operations teams every single day.',
      'By wiring Shopify, Zoho CRM, Shiprocket, and WhatsApp together via webhooks, every order state change updates across the company automatically.',
    ],
    slides: [
      {
        src: '/media/projects/medistudygo-desktop.png',
        caption: 'Automated storefront-to-CRM and courier fulfillment pipeline.',
      },
    ],
  },
  {
    number: '17',
    slug: 'openinssist-and-karo',
    title: 'OpenInssist & Karo Utilities',
    subtitle: 'Open-Source Workflow Automation & Task Execution Tools on GitHub',
    category: 'Open Source · Productivity',
    year: '2025 – 2026',
    role: 'Open-Source Builder',
    bentoSpan: 'col-4',
    accentColor: '#4338CA',
    surfaceTint: '#E0E7FF',
    liveUrl: 'https://github.com/avichal15/OpenInssist',
    liveLabel: 'View OpenInssist ↗',
    repoUrl: 'https://github.com/avichal15/Karo',
    repoLabel: 'View Karo Repo ↗',
    coverImage: null,
    previewCode:
      'OPENINSSIST & KARO · OSS TOOLS\n• github.com/avichal15/OpenInssist\n• github.com/avichal15/Karo\n• Lightweight Automation & Task Workflows',
    stack: ['JavaScript / TypeScript', 'Browser & CLI Workflows', 'Open Source'],
    summary:
      'Public open-source utilities (OpenInssist and Karo) built to streamline repetitive browser interactions, social workflows, and daily developer task execution.',
    highlights: [
      'Shipped modular, developer-friendly repositories on GitHub focused on practical workflow automation and clean task management.',
    ],
    commentary: [
      'Whenever I hit a repetitive workflow bottleneck, I turn the solution into a clean open-source tool.',
      'OpenInssist and Karo are lightweight utilities you can inspect and fork directly on my GitHub.',
    ],
    slides: [],
  },
  {
    number: '18',
    slug: 'sigmagpt-and-vision-suite',
    title: 'SigmaGPT & Browser Vision Suite',
    subtitle: 'Full-Stack Conversational AI Workspace + TensorFlow.js Object Detection',
    category: 'AI & WebML Suite',
    year: '2024 – 2025',
    role: 'Full-Stack Engineer',
    bentoSpan: 'col-4',
    accentColor: '#B45309',
    surfaceTint: '#FEF3C7',
    liveUrl: 'https://github.com/avichal15',
    liveLabel: 'View on GitHub ↗',
    repoUrl: 'https://github.com/avichal15',
    repoLabel: 'GitHub (avichal15)',
    coverImage: null,
    previewCode:
      'SIGMAGPT + WEBML VISION SUITE\n• MERN + OpenAI Streaming Workspace\n• Client-Side TensorFlow.js COCO-SSD\n• Real-Time Crypto & Weather Dashboards',
    stack: ['React', 'Node.js & Express', 'MongoDB', 'OpenAI API', 'TensorFlow.js (COCO-SSD)', 'WebRTC Canvas'],
    summary:
      'Full-stack MERN conversational AI workspace (SigmaGPT) alongside client-side TensorFlow.js webcam object detection and live market telemetry apps.',
    highlights: [
      'Built persistent multi-thread chat with streaming markdown/code rendering in SigmaGPT.',
      'Implemented zero-server webcam object detection in the browser using TensorFlow.js and COCO-SSD.',
    ],
    commentary: [
      'These foundational builds combined full-stack MERN architecture with real-time browser machine learning.',
      'From streaming LLM chat threads in SigmaGPT to 60fps COCO-SSD bounding boxes on live webcam feeds, everything runs fast and clean.',
    ],
    slides: [],
  },
];

export const FEATURED_STORIES = ALL_PROJECTS.slice(0, 4);
export const ARCHIVE_PROJECTS = ALL_PROJECTS.slice(4);

export const ALL_WORK_BY_SLUG = new Map(ALL_PROJECTS.map((item) => [item.slug, item]));

// ============================================================================
// 6 VERIFIED CERTIFICATIONS FOR THE BENTO GRID (#certifications)
// ============================================================================
export const CERTIFICATIONS = [
  {
    number: 'C1',
    slug: 'oci-genai-professional',
    title: 'Oracle Cloud Infrastructure 2025 Certified Generative AI Professional',
    issuer: 'Oracle University',
    issueDate: '2025',
    category: 'Enterprise LLMs & RAG Architecture',
    bentoSpan: 'col-6',
    badgeColor: '#C2410C',
    surfaceTint: '#FFEDD5',
    verifyUrl: 'https://www.linkedin.com/in/avichalgoyal007/',
    verifyLabel: 'Verify on LinkedIn ↗',
    summary:
      'Validated expertise in designing, fine-tuning, and deploying enterprise Large Language Models, RAG pipelines, semantic search, and vector indexing on Oracle Cloud Infrastructure.',
    skills: [
      'OCI Generative AI Service',
      'RAG & Vector Databases',
      'LangChain / LlamaIndex Orchestration',
      'Dedicated AI Clusters & Guardrails',
    ],
    appliedInWork:
      'Applied directly in architecting multi-provider LLM gateways (OmniRoute), RAG study pipelines (MediStudyGo), and autonomous agent harnesses.',
  },
  {
    number: 'C2',
    slug: 'oci-data-science-professional',
    title: 'Oracle Cloud Infrastructure 2025 Certified Data Science Professional',
    issuer: 'Oracle University',
    issueDate: '2025',
    category: 'MLOps & Cloud Model Deployment',
    bentoSpan: 'col-6',
    badgeColor: '#0369A1',
    surfaceTint: '#E0F2FE',
    verifyUrl: 'https://www.linkedin.com/in/avichalgoyal007/',
    verifyLabel: 'Verify on LinkedIn ↗',
    summary:
      'Certified proficiency in end-to-end machine learning lifecycles, feature stores, model catalog governance, distributed training, and scalable inference pipelines on OCI.',
    skills: [
      'End-to-End MLOps',
      'Model Catalog & Feature Stores',
      'Scalable Cloud Inference',
      'Model Evaluation & Drift Monitoring',
    ],
    appliedInWork:
      'Used in designing reproducible analytics pipelines, synthetic data benchmarking, and production AI evaluation loops.',
  },
  {
    number: 'C3',
    slug: 'stanford-ml-specialization',
    title: 'Machine Learning Specialization — Stanford Online & DeepLearning.AI',
    issuer: 'Stanford Online & DeepLearning.AI (Andrew Ng)',
    issueDate: '2024 – 2025',
    category: 'Supervised, Unsupervised & Reinforcement Learning',
    bentoSpan: 'col-6',
    badgeColor: '#B91C1C',
    surfaceTint: '#FEE2E2',
    verifyUrl: 'https://www.linkedin.com/in/avichalgoyal007/',
    verifyLabel: 'Verify on LinkedIn ↗',
    summary:
      '3-course specialization taught by Andrew Ng covering linear/logistic regression, neural networks, decision trees, clustering, anomaly detection, recommender systems, and reinforcement learning.',
    skills: [
      'Supervised & Unsupervised ML',
      'Neural Networks & Backpropagation',
      'Decision Trees & Ensembles',
      'Recommender Systems & RL',
    ],
    appliedInWork:
      'Forms the mathematical foundation behind my computer vision, voice coaching, and intelligent ranking workflows.',
  },
  {
    number: 'C4',
    slug: 'foundations-of-business-intelligence',
    title: 'Foundations of Business Intelligence',
    issuer: 'Google (via Coursera)',
    issueDate: 'August 2024',
    category: 'Business Intelligence & ETL Systems',
    bentoSpan: 'col-6',
    badgeColor: '#1D4ED8',
    surfaceTint: '#DBEAFE',
    verifyUrl: 'https://www.linkedin.com/in/avichalgoyal007/',
    verifyLabel: 'Verify on LinkedIn ↗',
    summary:
      'Professional credential covering BI lifecycle stages, data warehousing concepts, stakeholder metric definition, ETL pipelines, and executive dashboard design.',
    skills: [
      'BI Strategy & KPI Alignment',
      'Data Modeling & ETL Pipelines',
      'Executive Dashboard Design',
      'Cohort & Funnel Telemetry',
    ],
    appliedInWork:
      'Applied directly while structuring 7-platform cohort analytics at MediStudyGo and building the Recruitment Funnel Analytics Dashboard.',
  },
  {
    number: 'C5',
    slug: 'mern-stack-development',
    title: 'Full-Stack Web Development (MERN Stack — Delta Batch)',
    issuer: 'Apna College',
    issueDate: '2024',
    category: 'Full-Stack Software Engineering',
    bentoSpan: 'col-6',
    badgeColor: '#047857',
    surfaceTint: '#D1FAE5',
    verifyUrl: 'https://www.linkedin.com/in/avichalgoyal007/',
    verifyLabel: 'Verify on LinkedIn ↗',
    summary:
      'Intensive project-based engineering curriculum covering MongoDB, Express.js, React, Node.js, REST API architecture, authentication, and cloud deployment.',
    skills: [
      'React & Modern Frontend Craft',
      'Node.js & Express APIs',
      'MongoDB Schema Design',
      'Authentication & Production Deployment',
    ],
    appliedInWork:
      'Powers the full-stack architecture behind Masterplayer 3D Studio, TruGifting Solutions, SigmaGPT, and this interactive portfolio.',
  },
  {
    number: 'C6',
    slug: 'data-structures-and-algorithms-java',
    title: 'Data Structures & Algorithms in Java (Alpha Batch)',
    issuer: 'Apna College',
    issueDate: '2023',
    category: 'Core Computer Science & Algorithms',
    bentoSpan: 'col-6',
    badgeColor: '#6D28D9',
    surfaceTint: '#EDE9FE',
    verifyUrl: 'https://www.linkedin.com/in/avichalgoyal007/',
    verifyLabel: 'Verify on LinkedIn ↗',
    summary:
      'Comprehensive algorithmic problem-solving curriculum covering trees, graphs, heaps, recursion, dynamic programming, and asymptotic complexity analysis in Java.',
    skills: [
      'Java & OOP Architecture',
      'Trees, Graphs & Heaps',
      'Dynamic Programming',
      'Time & Space Complexity Optimization',
    ],
    appliedInWork:
      'Used in stream parser design (WhatsApp to CSV Converter), 3D scene graph traversal, and low-latency state management.',
  },
];

export const CERTIFICATIONS_BY_SLUG = new Map(CERTIFICATIONS.map((c) => [c.slug, c]));

export function getAdjacentProjects(slug) {
  const idx = ALL_PROJECTS.findIndex((p) => p.slug === slug);
  if (idx === -1) return { prev: ALL_PROJECTS[0], next: ALL_PROJECTS[1] };
  const prev = ALL_PROJECTS[(idx - 1 + ALL_PROJECTS.length) % ALL_PROJECTS.length];
  const next = ALL_PROJECTS[(idx + 1) % ALL_PROJECTS.length];
  return { prev, next };
}
