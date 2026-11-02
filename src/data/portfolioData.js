import { PROJECT_ASSET_MANIFEST } from './projectAssets';

export const OWNER_PROFILE = {
  name: 'Avichal Goyal',
  shortName: 'Avichal',
  handle: 'avichal15',
  role: 'AI Systems Engineer, Product Ops & Full-Stack Builder',
  headlineLead: 'I build products, websites, and',
  headlineAccent: 'AI systems.',
  subheadline:
    'Welcome to my portfolio! Here I showcase my work, my process, and of course, the occasional turn into',
  batmanLabel: 'Batman.',
  location: 'Bengaluru / Greater Noida / Meerut, India',
  availability: "I'm taking on new work.",
  email: 'avichalgoyal15@gmail.com',
  phone: '+91 8171952726',
  websiteUrl: 'https://avichalgoyal.me',
  githubUrl: 'https://github.com/avichal15',
  linkedinUrl: 'https://www.linkedin.com/in/avichalgoyal007/',
  resumeUrl: '/resume.pdf',
  heroGreetingNormal: 'Hey there! Welcome to my LEGO studio — scroll down for the guided tour!',
  heroGreetingBatman: 'I am vengeance. I am the night. Let us inspect the Batcomputer.',
  bentoTooltipNormal:
    'Click any of the 10 verified builds to expand its full case study — or press the bat-signal to switch into Gotham mode!',
  bentoTooltipBatman:
    'All 10 public case files in the Batcomputer are unlocked. Select a dossier to inspect the architecture.',
};

export const CHARACTER_OUTFITS = [
  {
    id: 'builder',
    label: 'Builder',
    badge: 'DEFAULT',
    atlasKey: 'base',
    showHelmet: false,
    showCape: false,
    description: 'Studio yellow hoodie & black trousers — everyday product builder rig.',
    torsoColor: '#facc15',
    legsColor: '#18181b',
    accentColor: '#111827',
    hat: 'hair',
    quote: 'Fresh yellow bricks, clean commits, zero filler!',
  },
  {
    id: 'batman',
    label: 'Batman',
    badge: 'GOTHAM',
    atlasKey: 'gotham',
    showHelmet: true,
    showCape: true,
    description: 'Armored dark knight suit with scalloped cape, cowl, and utility belt.',
    torsoColor: '#18181b',
    legsColor: '#09090b',
    accentColor: '#facc15',
    hat: 'cowl',
    quote: 'It is not who I am underneath, but what I ship that defines me.',
  },
  {
    id: 'doctor',
    label: 'Surgeon / EdTech',
    badge: 'CHAPTER 01',
    atlasKey: 'doctor',
    showHelmet: false,
    showCape: false,
    description: 'Clinical lab coat, stethoscope, and scrub trousers for MediStudyGo.',
    torsoColor: '#f8fafc',
    legsColor: '#0284c7',
    accentColor: '#0ea5e9',
    hat: 'hair',
    quote: 'Paging Dr. Avichal — medical syllabus diagnostics ready!',
  },
  {
    id: 'techy',
    label: 'Android / Audio',
    badge: 'CHAPTER 02',
    atlasKey: 'techy',
    showHelmet: false,
    showCape: false,
    description: 'Cobalt developer jacket with studio headphones for Phoney.',
    torsoColor: '#4f46e5',
    legsColor: '#1e1b4b',
    accentColor: '#38bdf8',
    hat: 'headphones',
    quote: 'Testing in-call Audio Emojis on a custom Android dialer!',
  },
  {
    id: 'masterplayer',
    label: '3D Print Maker',
    badge: 'CHAPTER 04',
    atlasKey: 'masterplayer',
    showHelmet: false,
    showCape: false,
    description: 'Custom apparel & 3D commerce studio rig for Masterplayer & TruGifting.',
    torsoColor: '#ea580c',
    legsColor: '#1c1917',
    accentColor: '#fbbf24',
    hat: 'cap',
    quote: 'Interactive 3D garment previews ready for custom printing!',
  },
];

// Full outfit lookup including legacy aliases ('classic', 'gotham', 'exec', 'maker', 'hacker')
export const OUTFITS = [
  ...CHARACTER_OUTFITS,
  {
    id: 'classic',
    label: 'Builder',
    atlasKey: 'base',
    showHelmet: false,
    showCape: false,
  },
  {
    id: 'gotham',
    label: 'Batman',
    atlasKey: 'gotham',
    showHelmet: true,
    showCape: true,
  },
  {
    id: 'exec',
    label: 'Commerce Director',
    atlasKey: 'masterplayer',
    showHelmet: false,
    showCape: false,
  },
  {
    id: 'maker',
    label: '3D Print Maker',
    atlasKey: 'masterplayer',
    showHelmet: false,
    showCape: false,
  },
  {
    id: 'hacker',
    label: 'AI Infra Architect',
    atlasKey: 'techy',
    showHelmet: false,
    showCape: false,
  },
];

export const CHARACTER_TRICKS = [
  {
    id: 'wave',
    label: 'Studio Wave',
    icon: '👋',
    speech: 'Hey! Click any project card to expand its full interactive case study!',
    batmanSpeech: 'Gotham acknowledges your presence.',
  },
  {
    id: 'backflip',
    label: 'Brick Backflip',
    icon: '🤸',
    speech: '10/10 landing! Not a single LEGO stud came loose.',
    batmanSpeech: 'Tactical aerial evasion complete.',
  },
  {
    id: 'spin',
    label: '360° Spin',
    icon: '🌪️',
    speech: 'Spinning through full-stack architecture at 60 FPS!',
    batmanSpeech: 'Grapnel spin maneuver executed.',
  },
  {
    id: 'superhero',
    label: 'Hero Landing',
    icon: '⚡',
    speech: 'Three-point superhero landing! Hard on the plastic knees.',
    batmanSpeech: 'Vengeance lands without a sound.',
  },
  {
    id: 'dance',
    label: 'Deploy Dance',
    icon: '🕺',
    speech: 'When production builds pass with zero warnings!',
    batmanSpeech: 'Even the Dark Knight celebrates a clean deployment.',
  },
];

export const PHONEY_AUDIO_EMOJIS = [
  {
    id: 'cheer',
    label: 'Cheer',
    emoji: '👏',
    src: '/sounds/original/cheer.wav',
    reaction: 'Crowd goes wild! Ship it to production!',
    mood: 'cheer',
  },
  {
    id: 'faaah',
    label: 'Faaah',
    emoji: '😱',
    src: '/sounds/original/faaah.wav',
    reaction: 'Cinematic dramatic reveal triggered!',
    mood: 'surprised',
  },
  {
    id: 'fart',
    label: 'Fart',
    emoji: '💨',
    src: '/sounds/original/fart.wav',
    reaction: 'Classic in-call prank button! Every friend group tests this first.',
    mood: 'laugh',
  },
  {
    id: 'wompwomp',
    label: 'Womp Womp',
    emoji: '🎺',
    src: '/sounds/original/womp-womp.wav',
    reaction: 'Womp womp... when someone says they still use the stock dialer.',
    mood: 'sad',
  },
  {
    id: 'wow',
    label: 'Wow',
    emoji: '🤩',
    src: '/sounds/original/wow.wav',
    reaction: 'Real-time audio injection right inside an active phone call!',
    mood: 'wow',
  },
  {
    id: 'yay',
    label: 'Yay!',
    emoji: '🙌',
    src: '/sounds/original/yay.wav',
    reaction: 'Yay! Custom MP3/WAV soundboard slots unlocked!',
    mood: 'dance',
  },
];

export const ABOUT_STORY_PARAGRAPHS = [
  {
    id: 'about-p1',
    lead: '01 // PRODUCT OPERATIONS MEETS FULL-STACK ENGINEERING',
    text: 'I work at the intersection of product operations, full-stack web & Android engineering, and applied AI systems. Whether scaling a medical education storefront at MediStudyGo, shipping a custom Android phone app, or architecting B2B commerce platforms, I care about software that survives real users and real business constraints.',
    bubbleTitle: '00.01 // STUDIO PHILOSOPHY',
    bubbleText:
      'I do not stop at Figma mocks or isolated scripts — I own the workflow from product discovery and UX engineering all the way to deployment and analytics.',
    outfit: 'builder',
  },
  {
    id: 'about-p2',
    lead: '02 // COMMERCIAL WEB, ANDROID & OPEN-SOURCE INFRASTRUCTURE',
    text: 'Across 10 public builds, my work spans commercial storefronts (MediStudyGo, TruGifting Solutions, Masterplayer Designs & Printing, Mahadev Plywood & Hardware), interactive social-impact experiences (Dhuri Hoon Mai), custom Android communication tools (Phoney), and open-source developer infrastructure (OmniRoute Session Sync, Gemini Web Antigravity Skill Stack, Insta Manager, Recruitment Funnel Analytics).',
    bubbleTitle: '00.02 // PUBLIC PROOF OF WORK',
    bubbleText:
      'Every project in this portfolio is backed by a live deployed website, an inspectable public GitHub repository, or a real product interface.',
    outfit: 'hacker',
  },
];

export const ALL_PROJECTS = [
  // 01 — MediStudyGo
  {
    index: 1,
    code: '01',
    slug: 'medistudygo',
    id: 'medistudygo',
    title: 'MediStudyGo',
    shortTitle: 'MediStudyGo',
    category: 'EdTech & Product Operations',
    featured: true,
    tourNumber: '01',
    year: '2025 – Present',
    role: 'Product Operations Associate & Growth/Storefront Engineer',
    clientOrContext: 'MediStudyGo (Commercial EdTech Platform)',
    status: 'Live Commercial Platform',
    liveUrl: 'https://medistudygo.com/',
    liveLabel: 'Visit medistudygo.com',
    repoUrl: null,
    hosts: ['medistudygo.com'],
    themeTint: '#E9D5FF',
    stageBg: '#DDD6FE',
    accentColor: '#6D28D9',
    outfit: 'doctor',
    characterSide: 'left',
    preview: PROJECT_ASSET_MANIFEST.medistudygo.desktop[0].src,
    mobilePreview: PROJECT_ASSET_MANIFEST.medistudygo.mobile[0].src,
    assetProvenance: PROJECT_ASSET_MANIFEST.medistudygo,
    tagline:
      'High-yield visual medical, dental, and nursing exam preparation storefront and product operations engine.',
    summary:
      'Scaled storefront merchandising, syllabus-mapped bundle architecture, and cross-functional product operations for MediStudyGo — serving MBBS, BDS, BPT, Nursing, and NEET PG learners.',
    problem:
      'Medical and nursing students face dense, fragmented textbooks across MBBS, BDS, Nursing, and NEET PG tracks. Discovering the exact syllabus-matched mind maps, revision notes, and bundles on desktop and mobile required clearer product hierarchy, faster storefront navigation, and tighter operational coordination between content, catalog, and support teams.',
    solution:
      'Structured the storefront experience around degree tracks (MBBS, BDS, BPT, Nursing, NEET PG), interactive before/after note comparisons, flipbook previews, and year-wise bundle packs while streamlining catalog operations, student onboarding flows, and mobile conversion paths.',
    implementation: [
      'Organized degree-wise and prof-year catalog taxonomy so students can filter mind maps, flashcards, and combo bundles in two taps.',
      'Engineered interactive visual comparison and flipbook preview sections on medistudygo.com to demonstrate high-yield visual notes vs. dense textbook pages.',
      'Coordinated product operations across catalog updates, bundle pricing, student support feedback loops, and mobile checkout optimization.',
    ],
    stack: ['Product Operations', 'Shopify / Storefront UX', 'JavaScript', 'Conversion Optimization', 'EdTech Catalog Ops', 'Analytics'],
    metrics: [
      { label: 'Academic Tracks', value: 'MBBS · BDS · Nursing · NEET PG' },
      { label: 'Platform Status', value: 'Live at medistudygo.com' },
      { label: 'Core Format', value: 'Visual Mind Maps & App Bundles' },
    ],
    characterComments: [
      'Welcome to Chapter 01! At MediStudyGo, I work on Product Operations and storefront journeys for medical & nursing students.',
      'Notice the interactive textbook-vs-mindmap comparison and flipbook preview — built so students can inspect real notes before buying.',
      'Switch to slide 3 to see how year-wise combo bundles and mobile catalog cards are structured for fast exam-season checkout.',
    ],
    slides: [
      {
        step: '01.01',
        title: 'Degree-First Storefront & NEET PG / MBBS Positioning',
        caption:
          'Live homepage hero on medistudygo.com guiding students directly into MBBS, BDS, BPT, Nursing, and NEET PG revision tracks.',
        desktopImage: PROJECT_ASSET_MANIFEST.medistudygo.desktop[0].src,
        mobileImage: PROJECT_ASSET_MANIFEST.medistudygo.mobile[0].src,
        tourNote:
          'Welcome to Chapter 01! At MediStudyGo, I bridge product operations and storefront UX so medical students find the right exam prep fast.',
      },
      {
        step: '01.02',
        title: 'High-Yield Visual Notes vs. Traditional Textbooks',
        caption:
          'Interactive visual comparison and trust metrics showcasing how clinical mind maps compress dense medical chapters into rapid revision sheets.',
        desktopImage: PROJECT_ASSET_MANIFEST.medistudygo.desktop[1].src,
        mobileImage: PROJECT_ASSET_MANIFEST.medistudygo.mobile[1].src,
        tourNote:
          'Students want proof before purchasing study material — we highlight real page comparisons and verified student outcomes.',
      },
      {
        step: '01.03',
        title: 'Interactive Flipbook Previews & Year-Wise Bundles',
        caption:
          'Inside-the-book flipbook reader and prof-year bundle cards designed for both desktop study sessions and mobile checkout.',
        desktopImage: PROJECT_ASSET_MANIFEST.medistudygo.desktop[2].src,
        mobileImage: PROJECT_ASSET_MANIFEST.medistudygo.mobile[2].src,
        tourNote:
          'Every screenshot here is captured directly from the live medistudygo.com storefront — zero popups, zero mixed assets.',
      },
    ],
  },

  // 02 — Phoney
  {
    index: 2,
    code: '02',
    slug: 'phoney',
    id: 'phoney',
    title: 'Phoney',
    shortTitle: 'Phoney',
    category: 'Android Development',
    featured: true,
    tourNumber: '02',
    year: '2025 – 2026',
    role: 'Creator & Lead Android / Web Engineer',
    clientOrContext: 'Independent Product & Open Android Utility',
    status: 'Live Product Showcase & Android Build',
    liveUrl: 'https://phoney.avichalgoyal.me/',
    liveLabel: 'Visit phoney.avichalgoyal.me',
    repoUrl: 'https://github.com/avichal15',
    hosts: ['phoney.avichalgoyal.me'],
    themeTint: '#C7D2FE',
    stageBg: '#BCC6E6',
    accentColor: '#3730A3',
    outfit: 'techy',
    characterSide: 'right',
    hasAudioEmojiTray: true,
    preview: PROJECT_ASSET_MANIFEST.phoney.desktop[0].src,
    mobilePreview: PROJECT_ASSET_MANIFEST.phoney.mobile[0].src,
    assetProvenance: PROJECT_ASSET_MANIFEST.phoney,
    tagline:
      'Custom Android phone & contacts app featuring live in-call Audio Emojis, custom sound uploads, and consent-aware local call recording.',
    summary:
      'An expressive Android dialer replacement that upgrades everyday voice calls with a real-time in-call Audio Emoji soundboard, custom audio slot imports, T9 smart contact search, and transparent on-device call recording controls.',
    problem:
      'Default Android dialers are rigid utilities that strip personality from voice calls and bury contact management, sound effects, and local call archiving behind fragmented system menus.',
    solution:
      'Built Phoney as a cohesive Android dialer and contacts replacement with an instant in-call Audio Emoji tray (6 built-in reactions plus custom MP3/WAV/OGG imports), clean T9 dialer ergonomics, and an explicit, user-controlled local call recording workflow that respects Android platform permissions and consent boundaries.',
    implementation: [
      'Engineered the Android InCallService UI and low-latency AudioTrack/MediaPlayer soundboard capable of triggering 6 built-in Audio Emojis plus user-uploaded clips during active calls.',
      'Designed an explicit recording consent and device-compatibility flow storing recordings locally on-device with zero third-party cloud uploads.',
      'Built the interactive web companion at phoney.avichalgoyal.me where visitors can test the live Audio Emoji soundboard before installing the APK.',
    ],
    stack: ['Kotlin / Android SDK', 'InCallService API', 'Low-Latency AudioTrack', 'Local On-Device Storage', 'React Web Showcase'],
    metrics: [
      { label: 'Default Audio Emojis', value: '6 Built-In + Custom Uploads' },
      { label: 'Storage Architecture', value: '100% On-Device Local Storage' },
      { label: 'Recording Flow', value: 'Explicit Consent & Permission Controls' },
    ],
    characterComments: [
      'Chapter 02 is Phoney — my custom Android dialer! Try clicking the 6 Audio Emoji buttons in the tray below to hear them.',
      'Beyond the 6 default reactions (Cheer, Faaah, Fart, Womp Womp, Wow, Yay!), users can import their own custom MP3 or WAV clips.',
      'Phoney also includes local call recording with an explicit user consent flow and clear Android permission handling — everything stays on-device.',
    ],
    slides: [
      {
        step: '02.01',
        title: 'Custom Android Dialer & Smart Contacts Replacement',
        caption:
          'Phoney replaces the stock phone app with a fast T9 dialer, recent call timeline, and expressive in-call controls.',
        desktopImage: PROJECT_ASSET_MANIFEST.phoney.desktop[0].src,
        mobileImage: PROJECT_ASSET_MANIFEST.phoney.mobile[0].src,
        tourNote:
          'Meet Phoney! I built this custom Android phone app to make voice calls expressive again. Click any Audio Emoji below to test the soundboard!',
      },
      {
        step: '02.02',
        title: 'Live In-Call Audio Emojis & Custom Sound Uploads',
        caption:
          'Trigger 6 built-in reactions (Cheer, Faaah, Fart, Womp Womp, Wow, Yay!) or load custom MP3/WAV clips directly from the in-call tray.',
        desktopImage: PROJECT_ASSET_MANIFEST.phoney.desktop[1].src,
        mobileImage: PROJECT_ASSET_MANIFEST.phoney.mobile[1].src,
        tourNote:
          'Users can fire instant sound reactions mid-call or map their own audio clips to the quick tray.',
      },
      {
        step: '02.03',
        title: 'Consent-First Call Recording & On-Device Privacy',
        caption:
          'Transparent call recording workflow with explicit user consent controls, Android permission checks, and local-only storage.',
        desktopImage: PROJECT_ASSET_MANIFEST.phoney.desktop[2].src,
        mobileImage: PROJECT_ASSET_MANIFEST.phoney.mobile[2].src,
        tourNote:
          'Call recording is designed around explicit user consent and Android OS audio-routing rules, keeping all archives strictly on your device.',
      },
    ],
  },

  // 03 — TruGifting Solutions
  {
    index: 3,
    code: '03',
    slug: 'trugifting-solutions',
    id: 'trugifting-solutions',
    title: 'TruGifting Solutions',
    shortTitle: 'TruGifting Solutions',
    category: 'B2B E-Commerce',
    featured: true,
    tourNumber: '03',
    year: '2025 – 2026',
    role: 'Full-Stack Web & B2B E-Commerce Engineer',
    clientOrContext: 'TruGifting Solutions (Corporate Gifting & Brand Vouchers)',
    status: 'Live B2B Storefront',
    liveUrl: 'https://www.trugiftingsolutions.com/',
    liveLabel: 'Visit trugiftingsolutions.com',
    repoUrl: null,
    hosts: ['trugiftingsolutions.com', 'www.trugiftingsolutions.com'],
    themeTint: '#CCFBF1',
    stageBg: '#B8EFEA',
    accentColor: '#0F766E',
    outfit: 'exec',
    characterSide: 'left',
    preview: PROJECT_ASSET_MANIFEST['trugifting-solutions'].desktop[0].src,
    mobilePreview: PROJECT_ASSET_MANIFEST['trugifting-solutions'].mobile[0].src,
    assetProvenance: PROJECT_ASSET_MANIFEST['trugifting-solutions'],
    tagline:
      'Enterprise corporate gifting, festive onboarding kits, and brand voucher distribution platform.',
    summary:
      'Designed and built the standalone B2B digital storefront for TruGifting Solutions — enabling HR, procurement, and enterprise teams to configure custom corporate hampers, browse brand vouchers, and submit tiered bulk inquiries.',
    problem:
      'Corporate procurement and HR teams ordering festive hampers, employee joining kits, and multi-brand digital vouchers needed a dedicated B2B catalog with clear MOQ tiers, GST-ready inquiry capture, and custom hamper configuration instead of static PDF brochures.',
    solution:
      'Delivered trugiftingsolutions.com as a dedicated B2B corporate gifting platform featuring a curated brand voucher showcase, an interactive custom hamper builder, and direct enterprise quote pipelines.',
    implementation: [
      'Architected the standalone B2B storefront at trugiftingsolutions.com with distinct navigation for physical corporate hampers and digital brand vouchers.',
      'Built the interactive custom hamper configurator allowing HR buyers to select box styles, merchandise items, branding options, and recipient quantities.',
      'Implemented mobile-first catalog browsing and instant WhatsApp/email procurement lead capture for rapid enterprise turnarounds.',
    ],
    stack: ['React / Next.js', 'Tailwind CSS', 'B2B Catalog Architecture', 'Custom Hamper Builder', 'Enterprise Lead Flow'],
    metrics: [
      { label: 'Business Model', value: 'Dedicated B2B Corporate Gifting' },
      { label: 'Core Modules', value: 'Brand Vouchers + Hamper Builder' },
      { label: 'Live Domain', value: 'trugiftingsolutions.com' },
    ],
    characterComments: [
      'Chapter 03 showcases TruGifting Solutions — a standalone B2B corporate gifting and brand voucher platform.',
      'Enterprise buyers can browse digital brand vouchers or build custom employee onboarding and festive hampers step by step.',
      'Every screen here comes strictly from trugiftingsolutions.com — completely independent from any other client storefront.',
    ],
    slides: [
      {
        step: '03.01',
        title: 'Enterprise Corporate Gifting & Procurement Storefront',
        caption:
          'Live homepage at trugiftingsolutions.com built for HR leaders, channel partners, and enterprise procurement teams.',
        desktopImage: PROJECT_ASSET_MANIFEST['trugifting-solutions'].desktop[0].src,
        mobileImage: PROJECT_ASSET_MANIFEST['trugifting-solutions'].mobile[0].src,
        tourNote:
          'Chapter 03 is TruGifting Solutions — a standalone B2B corporate gifting platform built for HR and procurement teams.',
      },
      {
        step: '03.02',
        title: 'Multi-Brand Digital Voucher & Reward Catalog',
        caption:
          'Structured voucher catalog for employee rewards, channel incentives, and festive corporate distribution.',
        desktopImage: PROJECT_ASSET_MANIFEST['trugifting-solutions'].desktop[1].src,
        mobileImage: PROJECT_ASSET_MANIFEST['trugifting-solutions'].mobile[1].src,
        tourNote:
          'Procurement teams can evaluate brand voucher denominations alongside physical gifting options in one unified catalog.',
      },
      {
        step: '03.03',
        title: 'Interactive Corporate Hamper & Onboarding Kit Builder',
        caption:
          'Step-by-step hamper builder for assembling custom-branded welcome kits and bulk festive gift boxes.',
        desktopImage: PROJECT_ASSET_MANIFEST['trugifting-solutions'].desktop[2].src,
        mobileImage: PROJECT_ASSET_MANIFEST['trugifting-solutions'].mobile[2].src,
        tourNote:
          'Instead of back-and-forth spreadsheets, buyers configure their hamper contents and submit structured bulk quote requests directly.',
      },
    ],
  },

  // 04 — Masterplayer Designs & Printing
  {
    index: 4,
    code: '04',
    slug: 'masterplayer-designs-and-printing',
    id: 'masterplayer-designs-and-printing',
    title: 'Masterplayer Designs & Printing',
    shortTitle: 'Masterplayer Designs & Printing',
    category: '3D Commerce & Business Automation',
    featured: true,
    tourNumber: '04',
    year: '2025 – Present',
    role: 'Full-Stack 3D Commerce & Automation Engineer',
    clientOrContext: 'Masterplayer Designs & Printing (Ongoing Client Collaboration)',
    status: 'Live Storefront & Ongoing Engineering',
    liveUrl: 'https://www.masterplayerprints.com/',
    liveLabel: 'Visit masterplayerprints.com',
    repoUrl: null,
    hosts: ['masterplayerprints.com', 'www.masterplayerprints.com'],
    themeTint: '#FFEDD5',
    stageBg: '#FDE6C4',
    accentColor: '#C2410C',
    outfit: 'maker',
    characterSide: 'right',
    preview: PROJECT_ASSET_MANIFEST['masterplayer-designs-and-printing'].desktop[0].src,
    mobilePreview: PROJECT_ASSET_MANIFEST['masterplayer-designs-and-printing'].mobile[0].src,
    assetProvenance: PROJECT_ASSET_MANIFEST['masterplayer-designs-and-printing'],
    tagline:
      'Custom apparel & merchandise storefront featuring an interactive 3D garment customizer and print-order workflow.',
    summary:
      'Built and actively evolving the digital commerce platform for Masterplayer Designs & Printing — combining a retail/bulk custom apparel catalog with an interactive 3D garment customization studio and automated order intake.',
    problem:
      'Custom printing customers ordering hoodies, oversized tees, jerseys, and branded merchandise struggled to visualize artwork placement, fabric colors, and print sizing before placing single or bulk orders.',
    solution:
      'Engineered masterplayerprints.com as a dedicated custom apparel and printing platform featuring category-driven merchandise discovery, an interactive 3D garment preview studio, and structured print-production order capture.',
    implementation: [
      'Developed the standalone storefront at masterplayerprints.com showcasing custom t-shirts, hoodies, sportswear, and promotional print categories.',
      'Integrated an interactive 3D garment customizer allowing users to preview logo placement, garment colors, and print zones in real time.',
      'Continuing ongoing engineering collaboration to expand automated quote estimation, print-ready artwork validation, and production pipeline tooling.',
    ],
    stack: ['React / Vite', 'Three.js / WebGL 3D Studio', 'Tailwind CSS', 'Print Order Automation', 'Responsive Commerce'],
    metrics: [
      { label: 'Core Capability', value: 'Interactive 3D Garment Customizer' },
      { label: 'Engagement', value: 'Ongoing Client Engineering' },
      { label: 'Live Domain', value: 'masterplayerprints.com' },
    ],
    characterComments: [
      'Chapter 04 is Masterplayer Designs & Printing — a dedicated custom apparel and printing platform with an interactive 3D garment studio.',
      'Customers can browse custom merchandise categories and preview their artwork directly on 3D apparel models before ordering.',
      'This is an active, ongoing collaboration focused exclusively on masterplayerprints.com and its print production workflows.',
    ],
    slides: [
      {
        step: '04.01',
        title: 'Custom Apparel & Printing Storefront Hero',
        caption:
          'Live storefront at masterplayerprints.com built for custom streetwear, team jerseys, and branded merchandise.',
        desktopImage: PROJECT_ASSET_MANIFEST['masterplayer-designs-and-printing'].desktop[0].src,
        mobileImage: PROJECT_ASSET_MANIFEST['masterplayer-designs-and-printing'].mobile[0].src,
        tourNote:
          'Welcome to Chapter 04! Masterplayer Designs & Printing is a standalone custom apparel and print platform.',
      },
      {
        step: '04.02',
        title: 'Apparel, Sportswear & Print Merchandise Catalog',
        caption:
          'Category showcase covering oversized tees, hoodies, sublimation jerseys, and custom print merchandise.',
        desktopImage: PROJECT_ASSET_MANIFEST['masterplayer-designs-and-printing'].desktop[1].src,
        mobileImage: PROJECT_ASSET_MANIFEST['masterplayer-designs-and-printing'].mobile[1].src,
        tourNote:
          'Visitors can explore garment specifications, fabric weights, and printing techniques across both desktop and mobile.',
      },
      {
        step: '04.03',
        title: 'Interactive 3D Garment Customizer & Order Pipeline',
        caption:
          'Real-time 3D apparel customization studio for testing colors, artwork placement, and bulk print specifications.',
        desktopImage: PROJECT_ASSET_MANIFEST['masterplayer-designs-and-printing'].desktop[2].src,
        mobileImage: PROJECT_ASSET_MANIFEST['masterplayer-designs-and-printing'].mobile[2].src,
        tourNote:
          'Our ongoing engineering roadmap continues expanding the 3D customizer and automated print-shop order workflows.',
      },
    ],
  },

  // 05 — OmniRoute Session Sync
  {
    index: 5,
    code: '05',
    slug: 'omniroute-session-sync',
    id: 'omniroute-session-sync',
    title: 'OmniRoute Session Sync',
    shortTitle: 'OmniRoute Session Sync',
    category: 'Open Source & AI Infrastructure',
    featured: true,
    tourNumber: '05',
    year: '2026',
    role: 'Open-Source Creator & Systems Engineer',
    clientOrContext: 'Community-Maintained Companion for the OmniRoute Ecosystem',
    status: 'Public Open-Source Repository',
    liveUrl: null,
    liveLabel: null,
    repoUrl: 'https://github.com/avichal15/omniroute-session-sync',
    repoLabel: 'View GitHub Repo',
    hosts: ['github.com/avichal15/omniroute-session-sync'],
    themeTint: '#BAE6FD',
    stageBg: '#BFDBFE',
    accentColor: '#0284C7',
    outfit: 'hacker',
    characterSide: 'left',
    preview: PROJECT_ASSET_MANIFEST['omniroute-session-sync'].desktop[0].src,
    mobilePreview: null,
    assetProvenance: PROJECT_ASSET_MANIFEST['omniroute-session-sync'],
    tagline:
      'Chrome MV3 extension and local loopback bridge that automatically syncs authenticated AI web sessions into OmniRoute.',
    summary:
      'An open-source companion extension and local bridge that monitors authenticated browser cookies across ChatGPT, Gemini, Qwen, Z.ai, Grok, and DeepSeek — pushing fresh session credentials to an OmniRoute instance via its management API.',
    problem:
      'Developers running a local or self-hosted OmniRoute AI gateway alongside web-session-backed providers (ChatGPT, Gemini, Qwen, Z.ai, Grok, DeepSeek) face frequent cookie rotation and session expiration. Manually opening DevTools, copying cookies, and pasting tokens into the gateway breaks automated workflows every few hours.',
    solution:
      'Built OmniRoute Session Sync — a Chrome Manifest V3 extension paired with a loopback local bridge that watches target provider cookies via chrome.cookies and chrome.alarms, automatically syncing rotated credentials straight into OmniRoute (`Browser → Local Bridge → OmniRoute`).',
    implementation: [
      'Engineered the Chrome MV3 service worker using chrome.cookies.onChanged and periodic chrome.alarms heartbeats to detect credential rotation across 6 AI web providers.',
      'Built a secure localhost pairing handshake (127.0.0.1) that authenticates the browser extension against the local bridge and pushes structured provider payloads to the OmniRoute management API (:20128).',
      'Designed a compact dark-mode extension popup displaying live pairing status, per-provider cookie health indicators, manual sync triggers, and diagnostic logs.',
    ],
    stack: ['Chrome Extension MV3', 'JavaScript / Node.js', 'chrome.cookies & chrome.alarms', 'Localhost Bridge API', 'OmniRoute Ecosystem'],
    metrics: [
      { label: 'Supported Providers', value: 'ChatGPT · Gemini · Qwen · Z.ai · Grok · DeepSeek' },
      { label: 'Sync Pipeline', value: 'Browser → Local Bridge → OmniRoute' },
      { label: 'License & Repo', value: 'Open Source on GitHub' },
    ],
    characterComments: [
      'Chapter 05 is OmniRoute Session Sync — my open-source Chrome MV3 companion extension for the OmniRoute AI gateway ecosystem.',
      'Switch to slide 2 to inspect the real Chrome extension popup UI showing both paired and unpaired states alongside the 6 supported AI providers.',
      'Whenever ChatGPT, Gemini, Qwen, Z.ai, Grok, or DeepSeek rotates a session cookie in your browser, the local bridge updates OmniRoute automatically!',
    ],
    slides: [
      {
        step: '05.01',
        title: 'Automated Web-Session Continuity for OmniRoute',
        caption:
          'Architectural key visual: Browser provider sessions flowing through the local loopback bridge into the OmniRoute gateway.',
        desktopImage: PROJECT_ASSET_MANIFEST['omniroute-session-sync'].desktop[0].src,
        mobileImage: null,
        tourNote:
          'Chapter 05 is OmniRoute Session Sync — an open-source companion tool that eliminates manual DevTools cookie copying for AI gateways.',
      },
      {
        step: '05.02',
        title: 'Chrome MV3 Extension Popup UI (Paired & Unpaired States)',
        caption:
          'Authentic Chrome MV3 extension interface showing localhost bridge pairing, per-provider session status, and instant sync controls.',
        desktopImage: PROJECT_ASSET_MANIFEST['omniroute-session-sync'].desktop[1].src,
        mobileImage: null,
        tourNote:
          'Here is the actual Chrome MV3 popup UI — showing zero-config localhost pairing and live sync telemetry across all 6 AI providers.',
      },
      {
        step: '05.03',
        title: '3-Stage Pipeline: Browser → Local Bridge → OmniRoute',
        caption:
          'Event-driven cookie change listeners and MV3 heartbeat alarms keep local OmniRoute instances authenticated without manual intervention.',
        desktopImage: PROJECT_ASSET_MANIFEST['omniroute-session-sync'].desktop[2].src,
        mobileImage: null,
        tourNote:
          'The full source code, MV3 manifest, and setup guide are publicly available on GitHub at avichal15/omniroute-session-sync.',
      },
    ],
  },

  // 06 — Gemini Web Antigravity Skill Stack
  {
    index: 6,
    code: '06',
    slug: 'gemini-web-antigravity-stack',
    id: 'gemini-web-antigravity-stack',
    title: 'Gemini Web Antigravity Skill Stack',
    shortTitle: 'Gemini Web Antigravity Skill Stack',
    category: 'Agentic AI & Developer Infrastructure',
    featured: false,
    tourNumber: null,
    year: '2026',
    role: 'AI Systems Architect & Open-Source Author',
    clientOrContext: 'Open-Source Agentic Engineering Framework',
    status: 'Public Open-Source Repository',
    liveUrl: null,
    liveLabel: null,
    repoUrl: 'https://github.com/avichal15/gemini-web-antigravity-stack',
    repoLabel: 'View GitHub Repo',
    hosts: ['github.com/avichal15/gemini-web-antigravity-stack'],
    themeTint: '#E9D5FF',
    stageBg: '#E9D5FF',
    accentColor: '#7E22CE',
    outfit: 'hacker',
    characterSide: 'left',
    preview: PROJECT_ASSET_MANIFEST['gemini-web-antigravity-stack'].desktop[0].src,
    mobilePreview: null,
    assetProvenance: PROJECT_ASSET_MANIFEST['gemini-web-antigravity-stack'],
    tagline:
      'Modular skill pack, MCP protocol bridges, vector memory immunization, and verification harnesses for agentic coding environments.',
    summary:
      'An open-source collection of reusable agent skills, multi-model orchestration scripts, semantic memory hooks, and deterministic browser/CLI verification workflows built to make autonomous coding agents reliable on complex engineering tasks.',
    problem:
      'Out-of-the-box coding agents frequently suffer from context-window bloat, unverified UI claims, repeated tool mistakes across sessions, and sequential execution bottlenecks on multi-file repositories.',
    solution:
      'Engineered a structured skill stack combining bounded codebase scouting, multi-model architectural review, EmbeddingGemma semantic mistake memory ("antibodies"), and headless browser/DOM verification gates.',
    implementation: [
      'Packaged modular SKILL.md workflows with deterministic CLI helper scripts for browser DOM auditing, visual regression checks, and atomic Git hygiene.',
      'Built a persistent semantic memory and mistake-immunization layer that indexes past bug fixes and blocks repeated antipatterns before tool execution.',
      'Published the portable skill architecture and configuration templates openly on GitHub for agentic IDE users.',
    ],
    stack: ['Python', 'Node.js / PowerShell', 'MCP Protocol', 'Vector Memory', 'Browser Automation', 'Agentic Workflows'],
    metrics: [
      { label: 'Architecture', value: 'Scout → Council → Verifier Pipeline' },
      { label: 'Memory Layer', value: 'Semantic Mistake Immunization' },
      { label: 'Distribution', value: 'Open Source on GitHub' },
    ],
    characterComments: [
      'The Gemini Web Antigravity Skill Stack packages reusable skills, memory hooks, and verification gates for autonomous coding agents.',
    ],
    slides: [
      {
        step: '06.01',
        title: 'Modular Agentic Skill Stack & 3-Stage Execution Pipeline',
        caption:
          'Conceptual architecture of the Scout, Multi-Model Council, and Deterministic Verifier pipeline.',
        desktopImage: PROJECT_ASSET_MANIFEST['gemini-web-antigravity-stack'].desktop[0].src,
        mobileImage: null,
        tourNote:
          'Modular skills and verification harnesses that turn raw LLM tool calls into disciplined software engineering workflows.',
      },
      {
        step: '06.02',
        title: 'Semantic Vector Memory & Browser Verification Gates',
        caption:
          'Connected MCP bridges, EmbeddingGemma episodic memory, and headless DOM inspection tools.',
        desktopImage: PROJECT_ASSET_MANIFEST['gemini-web-antigravity-stack'].desktop[1].src,
        mobileImage: null,
        tourNote:
          'Inspect the repository on GitHub at avichal15/gemini-web-antigravity-stack.',
      },
    ],
  },

  // 07 — Insta Manager
  {
    index: 7,
    code: '07',
    slug: 'insta-manager',
    id: 'insta-manager',
    title: 'Insta Manager',
    shortTitle: 'Insta Manager',
    category: 'Creator Tools & Automation',
    featured: false,
    tourNumber: null,
    year: '2025 – 2026',
    role: 'Creator & Full-Stack Automation Engineer',
    clientOrContext: 'Open-Source Creator Workflow Tooling',
    status: 'Public Open-Source Repository',
    liveUrl: null,
    liveLabel: null,
    repoUrl: 'https://github.com/avichal15/Insta-manager',
    repoLabel: 'View GitHub Repo',
    hosts: ['github.com/avichal15/Insta-manager'],
    themeTint: '#FCE7F3',
    stageBg: '#FCE7F3',
    accentColor: '#BE185D',
    outfit: 'techy',
    characterSide: 'right',
    preview: PROJECT_ASSET_MANIFEST['insta-manager'].desktop[0].src,
    mobilePreview: null,
    assetProvenance: PROJECT_ASSET_MANIFEST['insta-manager'],
    tagline:
      'Keyboard-first desktop workspace and browser automation bridge for Instagram Reels review, scheduling reminders, and DM triage.',
    summary:
      'A creator productivity suite that enhances Instagram web workflows with keyboard-driven Reels scrubbing (J/K/L shortcuts), carousel frame inspection, scheduled draft reminders, and organized DM follow-up queues.',
    problem:
      'Creators and social media managers working on desktop browsers deal with clunky native video scrubbing, scattered DM threads, and manual content-review checklists when managing daily Reels and carousel pipelines.',
    solution:
      'Built Insta Manager to wrap Instagram web workflows in a keyboard-first control surface with frame-accurate video transport controls, DOM state inspection hooks, and structured outreach/publishing checklists.',
    implementation: [
      'Engineered keyboard shortcut bindings and media playback controllers for rapid Reels scrubbing, speed toggling, and carousel slide navigation.',
      'Built a browser acceptance and DOM interaction bridge for deterministic creator-state inspection and draft workflow organization.',
      'Published the source code on GitHub at avichal15/Insta-manager.',
    ],
    stack: ['JavaScript / TypeScript', 'Browser DOM Bridge', 'Media Playback Controls', 'Creator Workflow Automation'],
    metrics: [
      { label: 'Core UX', value: 'Keyboard-First Reels & Carousel Controls' },
      { label: 'Workflow Scope', value: 'Draft Review & DM Queue Triage' },
      { label: 'Repository', value: 'github.com/avichal15/Insta-manager' },
    ],
    characterComments: [
      'Insta Manager gives creators keyboard-driven Reels scrubbing, carousel inspection, and organized DM triage on desktop.',
    ],
    slides: [
      {
        step: '07.01',
        title: 'Creator Workflow Studio & Keyboard-First Reels Timeline',
        caption:
          'Art-directed creator workspace concept highlighting J/K/L timeline scrubbing, draft status cards, and DM triage queues.',
        desktopImage: PROJECT_ASSET_MANIFEST['insta-manager'].desktop[0].src,
        mobileImage: null,
        tourNote:
          'Designed for creators who want desktop-grade keyboard shortcuts and structured publishing queues.',
      },
      {
        step: '07.02',
        title: 'Desktop Control Surface & Playback Inspector',
        caption:
          'Focused desktop workspace for managing Reels playback, audio sync checks, and outreach workflows.',
        desktopImage: PROJECT_ASSET_MANIFEST['insta-manager'].desktop[1].src,
        mobileImage: null,
        tourNote:
          'Explore the code on GitHub at avichal15/Insta-manager.',
      },
    ],
  },

  // 08 — Recruitment Funnel Analytics
  {
    index: 8,
    code: '08',
    slug: 'recruitment-funnel-analytics',
    id: 'recruitment-funnel-analytics',
    title: 'Recruitment Funnel Analytics',
    shortTitle: 'Recruitment Funnel Analytics',
    category: 'Business Intelligence & Analytics',
    featured: false,
    tourNumber: null,
    year: '2025',
    role: 'Data & Analytics Engineer',
    clientOrContext: 'Open-Source BI & Decision-Support System',
    status: 'Public Open-Source Repository',
    liveUrl: null,
    liveLabel: null,
    repoUrl: 'https://github.com/avichal15/recruitment-funnel-dashboard',
    repoLabel: 'View GitHub Repo',
    hosts: ['github.com/avichal15/recruitment-funnel-dashboard'],
    themeTint: '#DBEAFE',
    stageBg: '#DBEAFE',
    accentColor: '#1D4ED8',
    outfit: 'exec',
    characterSide: 'left',
    preview: PROJECT_ASSET_MANIFEST['recruitment-funnel-analytics'].desktop[0].src,
    mobilePreview: null,
    assetProvenance: PROJECT_ASSET_MANIFEST['recruitment-funnel-analytics'],
    tagline:
      'End-to-end SQLite, Python, and Streamlit analytics suite modeling 250K ad clicks and 35K applications across recruitment channels.',
    summary:
      'A business intelligence and funnel diagnostics dashboard built with Python, SQLite, Pandas, and Streamlit — analyzing a realistic synthetic dataset of 250,000 recruitment ad clicks and 35,000 candidate applications to surface channel ROI, stage drop-offs, and automated budget reallocation recommendations.',
    problem:
      'Talent acquisition teams often track ad spend, career-site clicks, ATS stage transitions, and final hires in disconnected spreadsheets, obscuring which sourcing channels produce qualified hires versus high-volume drop-offs.',
    solution:
      'Built a reproducible SQLite + Streamlit analytics pipeline backed by a realistic synthetic recruitment dataset (250K clicks, 35K applications) that computes stage-by-stage conversion rates, cost-per-hire, time-to-fill, and rule-based budget recommendations.',
    implementation: [
      'Modeled a multi-table SQLite schema and synthetic data generator simulating 250,000 sourcing clicks and 35,000 candidate journeys across LinkedIn, Indeed, Referrals, Career Page, and Campus channels.',
      'Built interactive Plotly funnel visualizations, cohort conversion matrices, and role-level cost-per-hire scorecards in Streamlit.',
      'Implemented an automated bottleneck diagnostic engine that flags high-drop-off stages and suggests channel budget shifts.',
    ],
    stack: ['Python', 'SQLite', 'Streamlit', 'Plotly', 'Pandas', 'BI Funnel Modeling'],
    metrics: [
      { label: 'Synthetic Dataset Scope', value: '250K Clicks · 35K Applications' },
      { label: 'Data Engine', value: 'SQLite + Pandas + Plotly' },
      { label: 'Decision Layer', value: 'Automated Channel ROI Recommendations' },
    ],
    characterComments: [
      'Recruitment Funnel Analytics models 250K synthetic clicks and 35K applications in SQLite + Streamlit to diagnose hiring bottlenecks.',
    ],
    slides: [
      {
        step: '08.01',
        title: 'Executive Hiring Funnel & Conversion Scorecard',
        caption:
          'Streamlit executive overview tracking clicks, applications, interviews, offers, and hires across sourcing channels (synthetic benchmark dataset).',
        desktopImage: PROJECT_ASSET_MANIFEST['recruitment-funnel-analytics'].desktop[0].src,
        mobileImage: null,
        tourNote:
          'Built with Python, SQLite, and Streamlit using a transparent 250K-click / 35K-application synthetic recruitment dataset.',
      },
      {
        step: '08.02',
        title: 'Channel Performance & Cost-Per-Hire Attribution',
        caption:
          'Comparative breakdown of sourcing channel efficiency, stage conversion velocity, and acquisition cost.',
        desktopImage: PROJECT_ASSET_MANIFEST['recruitment-funnel-analytics'].desktop[1].src,
        mobileImage: null,
        tourNote:
          'Highlights which channels drive actual offers and hires rather than raw top-of-funnel click volume.',
      },
      {
        step: '08.03',
        title: 'Automated Bottleneck Diagnosis & Budget Recommendations',
        caption:
          'Rule-based decision-support view recommending sourcing budget reallocations and interview stage improvements.',
        desktopImage: PROJECT_ASSET_MANIFEST['recruitment-funnel-analytics'].desktop[2].src,
        mobileImage: null,
        tourNote:
          'Full SQLite generator and Streamlit dashboard code are available at avichal15/recruitment-funnel-dashboard.',
      },
    ],
  },

  // 09 — Mahadev Plywood & Hardware
  {
    index: 9,
    code: '09',
    slug: 'mahadev-plywood',
    id: 'mahadev-plywood',
    title: 'Mahadev Plywood & Hardware',
    shortTitle: 'Mahadev Plywood & Hardware',
    category: 'B2B Commerce',
    featured: false,
    tourNumber: null,
    year: '2026',
    role: 'Full-Stack Web & 3D Interaction Engineer',
    clientOrContext: 'Mahadev Buildcorp (Meerut Timber & Architectural Hardware)',
    status: 'Live Deployed Website & Public Repo',
    liveUrl: 'https://mahadev-plywood.vercel.app/',
    liveLabel: 'Visit mahadev-plywood.vercel.app',
    repoUrl: 'https://github.com/avichal15/Mahadev-Buildcorp',
    repoLabel: 'View GitHub Repo',
    hosts: ['mahadev-plywood.vercel.app', 'github.com/avichal15/Mahadev-Buildcorp'],
    themeTint: '#FDE68A',
    stageBg: '#FDE68A',
    accentColor: '#B45309',
    outfit: 'builder',
    characterSide: 'right',
    preview: PROJECT_ASSET_MANIFEST['mahadev-plywood'].desktop[0].src,
    mobilePreview: PROJECT_ASSET_MANIFEST['mahadev-plywood'].mobile[0].src,
    assetProvenance: PROJECT_ASSET_MANIFEST['mahadev-plywood'],
    tagline:
      'Interactive 3D PlyStack showcase and 12-category B2B timber & architectural hardware specification platform for Meerut builders.',
    summary:
      'A tactile B2B trade storefront for Mahadev Plywood & Hardware (Garh Road, Meerut) featuring a scroll-driven 3D plywood stack hero ("Every Layer In Stock"), dual amber/cyan material themes, and a 165-SKU specification counter across 12 building-material categories.',
    problem:
      'Local contractors, interior designers, and carpenters sourcing marine plywood, laminates, adhesives, and architectural fittings frequently lose half a workday driving between fragmented suppliers because traditional timber yards lack an inspectable digital inventory.',
    solution:
      'Designed and engineered mahadev-plywood.vercel.app as an industrial-grade digital counter ("One Counter. The Whole Job.") with an interactive 3D PlyStack hero, brand-verified adhesive and hardware shelves (Mahacol, Pidilite, Jivanjor, Bondtile), and direct contractor call/quote dispatch.',
    implementation: [
      'Engineered the scroll-responsive 3D PlyStack hero in React and Three.js that separates individual timber veneer and core layers as the visitor scrolls.',
      'Built an interactive 12-category, 165-SKU product specification stage covering marine plywood, blockboards, decorative laminates, mortise locks, channels, and adhesives.',
      'Designed a high-contrast industrial dark UI with warm timber-amber and hardware-cyan accents tailored for fast mobile lookup on active construction sites.',
    ],
    stack: ['React 19 / Vite', 'Three.js / WebGL 3D Stack', 'Tailwind CSS', 'GSAP Scroll Choreography', 'B2B Trade Catalog'],
    metrics: [
      { label: 'Inventory Scope', value: '165 Types Across 12 Categories' },
      { label: '3D Hero Engine', value: 'Interactive Scroll-Split PlyStack' },
      { label: 'Live Deployment', value: 'mahadev-plywood.vercel.app' },
    ],
    characterComments: [
      'Mahadev Plywood & Hardware brings an interactive 3D plywood stack and a 12-category B2B trade catalog to Meerut contractors and architects!',
    ],
    slides: [
      {
        step: '09.01',
        title: 'Every Layer In Stock — Interactive 3D PlyStack Hero',
        caption:
          'Live homepage at mahadev-plywood.vercel.app featuring the illuminated 3D plywood stack and direct trade dispatch.',
        desktopImage: PROJECT_ASSET_MANIFEST['mahadev-plywood'].desktop[0].src,
        mobileImage: PROJECT_ASSET_MANIFEST['mahadev-plywood'].mobile[0].src,
        tourNote:
          'Captured live from mahadev-plywood.vercel.app — built for builders, carpenters, and architects in Meerut.',
      },
      {
        step: '09.02',
        title: 'Scroll-Driven Veneer & Core Layer Inspection',
        caption:
          'As visitors scroll, the 3D plywood stack separates to reveal structural core layers and material craftsmanship.',
        desktopImage: PROJECT_ASSET_MANIFEST['mahadev-plywood'].desktop[1].src,
        mobileImage: PROJECT_ASSET_MANIFEST['mahadev-plywood'].mobile[0].src,
        tourNote:
          'Combines tactile 3D product storytelling with practical trade specifications.',
      },
      {
        step: '09.03',
        title: 'One Counter, The Whole Job — 12-Category Trade Catalog',
        caption:
          'Adhesive brands (Mahacol, Pidilite, Jivanjor, Bondtile) and 165 material types organized for single-stop contractor fulfilment.',
        desktopImage: PROJECT_ASSET_MANIFEST['mahadev-plywood'].desktop[2].src,
        mobileImage: PROJECT_ASSET_MANIFEST['mahadev-plywood'].mobile[0].src,
        tourNote:
          'Inspect both the live site at mahadev-plywood.vercel.app and the source repo at avichal15/Mahadev-Buildcorp.',
      },
    ],
  },

  // 10 — Dhuri Hoon Mai
  {
    index: 10,
    code: '10',
    slug: 'dhuri-hoon-mai',
    id: 'dhuri-hoon-mai',
    title: 'Dhuri Hoon Mai',
    shortTitle: 'Dhuri Hoon Mai',
    category: 'Creative Technology & Interactive Media',
    featured: false,
    tourNumber: null,
    year: '2026',
    role: 'Creative Technologist & Lead Frontend Architect',
    clientOrContext: 'Dhuri Hoon Mai — Soch Se Kamyabi Tak (NGO & Social Enterprise)',
    status: 'Live Deployed Website & Public Repo',
    liveUrl: 'https://dhuri-hoon-mai.vercel.app/',
    liveLabel: 'Visit dhuri-hoon-mai.vercel.app',
    repoUrl: 'https://github.com/avichal15/Dhuri-Hoon-Mai',
    repoLabel: 'View GitHub Repo',
    hosts: ['dhuri-hoon-mai.vercel.app', 'github.com/avichal15/Dhuri-Hoon-Mai'],
    themeTint: '#FCE7F3',
    stageBg: '#FBCFE8',
    accentColor: '#9D174D',
    outfit: 'builder',
    characterSide: 'left',
    preview: PROJECT_ASSET_MANIFEST['dhuri-hoon-mai'].desktop[0].src,
    mobilePreview: PROJECT_ASSET_MANIFEST['dhuri-hoon-mai'].mobile[0].src,
    assetProvenance: PROJECT_ASSET_MANIFEST['dhuri-hoon-mai'],
    tagline:
      'Editorial NGO & social enterprise web platform featuring an interactive sponsorship impact simulator, 20-year timeline, and Gala 2026 showcase.',
    summary:
      'Designed and built the official multi-page editorial web experience for Dhuri Hoon Mai ("I Am The Axis of Change") — uniting grassroots women empowerment, Fearless Little Champs literacy, an interactive monthly sponsorship impact simulator, and the Grand Excellence Gala 2026.',
    problem:
      'Grassroots NGOs and social enterprises with two decades of real community work (2006–2026 across Delhi NCR) often struggle to communicate their institutional credibility, transparent donor impact, and flagship summit events through generic charity templates.',
    solution:
      'Engineered dhuri-hoon-mai.vercel.app as a bilingual-inspired editorial platform with a real-time sponsorship impact slider, a 2006–2026 historical milestone timeline, a 5-pillar program matrix, and a dedicated Grand Excellence Gala 2026 registration experience.',
    implementation: [
      'Built the interactive Pledging Simulator that dynamically calculates how monthly contributions (e.g., ₹1,500/mo to ₹25,000/mo) translate into school kits, nutrition, and artisan training.',
      'Crafted an editorial typography system pairing serif headlines, Hindi Devanagari watermarks, custom magnetic cursor interactions, and mobile-first WhatsApp/call donor actions.',
      'Architected multi-view routing across Home, 5-Pillar Programs, Gala 2026, Impact Stories, and Contact & Sponsorship portals.',
    ],
    stack: ['React / Vite', 'Editorial UI & Motion Design', 'Interactive Impact Simulator', 'Responsive Architecture', 'Vercel'],
    metrics: [
      { label: 'Institutional Legacy', value: '2006 – 2026 (20 Years in Delhi NCR)' },
      { label: 'Interactive Feature', value: 'Real-Time Sponsorship Impact Simulator' },
      { label: 'Live Deployment', value: 'dhuri-hoon-mai.vercel.app' },
    ],
    characterComments: [
      'Dhuri Hoon Mai ("I Am The Axis of Change") is an editorial social-impact platform featuring a live sponsorship impact simulator and 20-year timeline!',
    ],
    slides: [
      {
        step: '10.01',
        title: 'Dhuri Hoon Mai: The Central Axis of Life & Self-Reliance',
        caption:
          'Live editorial hero at dhuri-hoon-mai.vercel.app celebrating 20 years of women empowerment and child education across Delhi NCR.',
        desktopImage: PROJECT_ASSET_MANIFEST['dhuri-hoon-mai'].desktop[0].src,
        mobileImage: PROJECT_ASSET_MANIFEST['dhuri-hoon-mai'].mobile[0].src,
        tourNote:
          'Captured directly from the live dhuri-hoon-mai.vercel.app deployment — showcasing real community programs and verified impact metrics.',
      },
      {
        step: '10.02',
        title: 'Interactive Pledging Simulator & 2006–2026 Grassroots Timeline',
        caption:
          'Donors slide the monthly contribution bar to inspect real-time student sponsorship and artisan workshop allocation.',
        desktopImage: PROJECT_ASSET_MANIFEST['dhuri-hoon-mai'].desktop[1].src,
        mobileImage: PROJECT_ASSET_MANIFEST['dhuri-hoon-mai'].mobile[0].src,
        tourNote:
          'The interactive simulator turns abstract donations into tangible educational and vocational outcomes.',
      },
      {
        step: '10.03',
        title: 'Grand Excellence Gala 2026 & Five-Pillar Ecosystem',
        caption:
          'Flagship summit showcase and 5-pillar program architecture connecting grassroots literacy with commercial exhibition platforms.',
        desktopImage: PROJECT_ASSET_MANIFEST['dhuri-hoon-mai'].desktop[2].src,
        mobileImage: PROJECT_ASSET_MANIFEST['dhuri-hoon-mai'].mobile[0].src,
        tourNote:
          'Explore the live experience at dhuri-hoon-mai.vercel.app and the source code at avichal15/Dhuri-Hoon-Mai.',
      },
    ],
  },
];

export const FEATURED_PROJECTS = ALL_PROJECTS.filter((project) => project.featured);

export const PROJECT_COUNT = ALL_PROJECTS.length;

export const CERTIFICATIONS = [
  {
    id: 'wharton-ai',
    slug: 'wharton-ai-business',
    title: 'AI for Business Specialization',
    issuer: 'The Wharton School — University of Pennsylvania',
    date: '2025',
    credentialType: 'Executive / University Specialization',
    preview: '/media/certificates/wharton-ai.png',
    verifyUrl: '/media/certificates/wharton-ai.png',
    summary:
      'Applied AI strategy, machine learning analytics, people management, and ethical governance for enterprise operations.',
    skills: ['AI Strategy', 'Predictive Analytics', 'Enterprise Governance', 'Business Operations'],
  },
  {
    id: 'bits-ai',
    slug: 'bits-pilani-ai',
    title: 'Artificial Intelligence & Machine Learning Foundations',
    issuer: 'BITS Pilani',
    date: '2025',
    credentialType: 'Academic Credential',
    preview: '/media/certificates/bits-ai.png',
    verifyUrl: '/media/certificates/bits-ai.png',
    summary:
      'Foundational coursework in statistical learning, neural architectures, data pipelines, and applied problem solving.',
    skills: ['Machine Learning', 'Python Data Stack', 'Model Evaluation', 'Problem Formulation'],
  },
  {
    id: 'pwc-analytics',
    slug: 'pwc-power-bi-analytics',
    title: 'Power BI & Business Analytics Virtual Case Experience',
    issuer: 'PwC',
    date: '2025',
    credentialType: 'Industry Simulation',
    preview: '/media/certificates/pwc-analytics.png',
    verifyUrl: '/media/certificates/pwc-analytics.png',
    summary:
      'Executive KPI dashboarding, customer churn diagnostics, and data-driven stakeholder storytelling.',
    skills: ['Business Intelligence', 'KPI Modeling', 'Root-Cause Analysis', 'Executive Reporting'],
  },
  {
    id: 'Prompt-Engineering',
    slug: 'ibm-prompt-engineering',
    title: 'Generative AI & Prompt Engineering',
    issuer: 'IBM',
    date: '2025',
    credentialType: 'Technical Certification',
    preview: '/media/certificates/Prompt-Engineering.png',
    verifyUrl: '/media/certificates/Prompt-Engineering.png',
    summary:
      'Structured prompt design, chain-of-thought orchestration, and LLM reliability patterns for production applications.',
    skills: ['LLM Orchestration', 'Structured Outputs', 'Prompt Engineering', 'Agentic Workflows'],
  },
  {
    id: 'tata-genai',
    slug: 'tata-genai-analytics',
    title: 'GenAI Powered Data Analytics',
    issuer: 'Tata Group (Forage)',
    date: '2025',
    credentialType: 'Industry Simulation',
    preview: '/media/certificates/tata-genai.png',
    verifyUrl: '/media/certificates/tata-genai.png',
    summary:
      'Exploratory data analysis, risk profiling, and AI-assisted collections strategy design.',
    skills: ['Data Analytics', 'GenAI Decision Systems', 'Risk Modeling', 'Strategy'],
  },
  {
    id: 'jpmorgan-swe',
    slug: 'jpmorgan-software-engineering',
    title: 'Software Engineering Job Simulation',
    issuer: 'JPMorgan Chase & Co.',
    date: '2025',
    credentialType: 'Industry Simulation',
    preview: '/media/certificates/jpmorgan-swe.png',
    verifyUrl: '/media/certificates/jpmorgan-swe.png',
    summary:
      'Financial data feed integration, frontend perspective visualization, and patch verification.',
    skills: ['Software Engineering', 'React / TypeScript', 'Data Feeds', 'Verification'],
  },
  {
    id: 'deloitte-tech',
    slug: 'deloitte-technology-consulting',
    title: 'Technology & Data Analytics Simulation',
    issuer: 'Deloitte',
    date: '2025',
    credentialType: 'Industry Simulation',
    preview: '/media/certificates/deloitte-tech.png',
    verifyUrl: '/media/certificates/deloitte-tech.png',
    summary:
      'Telemetry data classification, operational dashboarding, and enterprise system architecture proposals.',
    skills: ['Data Telemetry', 'Systems Architecture', 'Consulting', 'Dashboard Design'],
  },
  {
    id: 'outskill-genai',
    slug: 'outskill-generative-ai',
    title: 'Generative AI Mastermind & Automation',
    issuer: 'Outskill',
    date: '2025',
    credentialType: 'Technical Intensive',
    preview: '/media/certificates/outskill-genai.png',
    verifyUrl: '/media/certificates/outskill-genai.png',
    summary:
      'Multi-tool AI automation workflows, custom agent pipelines, and rapid product prototyping.',
    skills: ['AI Automation', 'Agent Pipelines', 'Rapid Prototyping'],
  },
];

export function findProjectBySlug(slug) {
  if (!slug) return null;
  const clean = String(slug).trim().toLowerCase();
  return (
    ALL_PROJECTS.find(
      (p) => p.slug.toLowerCase() === clean || p.id.toLowerCase() === clean
    ) || null
  );
}

export function findCertificationBySlug(slug) {
  if (!slug) return null;
  const clean = String(slug).trim().toLowerCase();
  return (
    CERTIFICATIONS.find(
      (c) => c.slug.toLowerCase() === clean || c.id.toLowerCase() === clean
    ) || null
  );
}
