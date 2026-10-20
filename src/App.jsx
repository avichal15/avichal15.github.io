import { useEffect, useMemo, useRef, useState } from 'react';
import LegoScene from './three/LegoScene';
import {
  ALL_WORK_BY_SLUG,
  ARCHIVE_PROJECTS,
  CERTIFICATIONS,
  FEATURED_STORIES,
  OUTFITS,
  PROFILE,
  ROLE_OUTFIT_RULES,
  TRICKS,
} from './data/portfolioData';

const STAGE_WAYPOINTS = [
  { id: 'sec-0', left: 73, top: 53, scale: 1.0, badge: false, mood: 'wave', autoOutfit: 'classic', label: '00 // INTRO' },
  { id: 'sec-1', left: 22, top: 53, scale: 1.0, badge: false, mood: 'builder', autoOutfit: 'doctor', label: '01 // MEDISTUDYGO' },
  { id: 'sec-2', left: 78, top: 53, scale: 1.0, badge: false, mood: 'caller', autoOutfit: 'techy', label: '02 // PHONEY AI' },
  { id: 'sec-3', left: 22, top: 53, scale: 1.0, badge: false, mood: 'commerce', autoOutfit: 'classic', label: '03 // TRUGIFTING' },
  { id: 'sec-4', left: 78, top: 53, scale: 1.0, badge: false, mood: 'architect', autoOutfit: 'masterplayer', label: '04 // MASTERPLAYER' },
  { id: 'sec-5', left: 22, top: 53, scale: 1.0, badge: false, mood: 'builder', autoOutfit: 'techy', label: '05 // OMNIROUTE OSS' },
  { id: 'sec-6', left: 7, top: 86, scale: 1.0, badge: true, mood: 'champion', autoOutfit: 'gotham', label: '06 // ARCHIVE & CERTS' },
  { id: 'sec-7', left: 17, top: 54, scale: 0.78, badge: false, mood: 'wave', autoOutfit: 'classic', label: '07 // PHILOSOPHY' },
  { id: 'sec-8', left: 84, top: 68, scale: 0.72, badge: false, mood: 'champion', autoOutfit: 'gotham', label: '08 // CONTACT' },
];

const SECTION_THEMES = {
  'sec-0': '#F5C518',
  'sec-1': '#BAE6FD',
  'sec-2': '#DDD6FE',
  'sec-3': '#FED7AA',
  'sec-4': '#BBF7D0',
  'sec-5': '#A5F3FC',
  'sec-6': '#FDE047',
  'sec-7': '#FBCFE8',
  'sec-8': '#E2E8F0',
};

const OMNIROUTE_SCENARIOS = [
  {
    name: 'Scenario 1: Private VLAN (10.24.0.18:5173)',
    origin: 'http://10.24.0.18:5173',
    cookie: 'SameSite=Lax; HttpOnly (Secure omitted for HTTP LAN)',
    status: '200 OK · CSRF & Origin Validated · Session Persisted',
  },
  {
    name: 'Scenario 2: Tailscale Mesh (100.88.14.9:3000)',
    origin: 'http://100.88.14.9:3000',
    cookie: 'SameSite=Lax; HttpOnly; Domain=100.88.14.9',
    status: '200 OK · Multi-hop Loopback Handshake Complete',
  },
  {
    name: 'Scenario 3: Reverse Proxy HTTPS (gateway.avichalgoyal.me)',
    origin: 'https://gateway.avichalgoyal.me',
    cookie: 'SameSite=Strict; Secure; HttpOnly',
    status: '200 OK · TLS Detected · Strict Cookie Enforced',
  },
];

const PREVIEW_CATALOG = {
  medistudygo: {
    title: 'MediStudyGo — Full-Stack EdTech & AI Dental Tutor',
    tag: 'INTERACTIVE CASE STUDY · REACT 19 + FASTAPI',
    liveUrl: 'https://www.medistudygo.com/',
    repoUrl: 'https://github.com/avichal15',
    routePath: '/work/medistudygo',
    summary:
      'Production medical & dental exam platform featuring 29,500+ flashcards, spaced-repetition scheduling, Razorpay checkout, and a multimodal AI tutor.',
    metrics: [
      { label: 'Active Flashcards & Notes', value: '29,500+' },
      { label: 'Median API Latency', value: '62ms' },
      { label: 'Payment Webhook Reliability', value: '99.98%' },
    ],
    highlights: [
      'Built custom spaced-repetition deck engine with keyboard-first shortcuts and instant search across 29.5k cards.',
      'Integrated Gemini & RAG context pipelines so dental students can query anatomy and pathology diagrams directly.',
      'Shipped full Razorpay subscription lifecycle with idempotent webhook verification and instant entitlement unlocks.',
    ],
  },
  phoney: {
    title: 'Phoney — Real-Time AI Voice Agent & Android 15 Call Screening',
    tag: 'ANDROID 15 IN-CALL SERVICE · WEBRTC + GEMINI LIVE',
    liveUrl: 'https://github.com/avichal15/phoney-beta',
    repoUrl: 'https://github.com/avichal15/phoney-beta',
    routePath: '/work/phoney',
    summary:
      'Native Android CallScreeningService + InCallService voice agent that intercepts spam, transcribes callers in real time, and lets you inject live voice/soundboard responses.',
    metrics: [
      { label: 'End-to-End Voice Turnaround', value: '180ms' },
      { label: 'Android Target SDK', value: 'API 35 (Android 15)' },
      { label: 'Spam Interception Accuracy', value: '97.4%' },
    ],
    highlights: [
      'Engineered native Kotlin telecom bridge binding Android InCallService audio streams to low-latency WebSockets.',
      'Designed tactile glassmorphic call HUD with live transcript streaming, sentiment cues, and instant human takeover.',
      'Added programmable soundboard & AI persona switching mid-call without dropping the telecom audio session.',
    ],
  },
  trugifting: {
    title: 'TruGifting — Enterprise Corporate Gifting & Catalog Platform',
    tag: 'B2B COMMERCE ENGINE · CUSTOM QUOTE WORKFLOWS',
    liveUrl: 'https://trugifting.com/',
    repoUrl: 'https://github.com/avichal15',
    routePath: '/work/trugifting',
    summary:
      'High-conversion B2B corporate gifting storefront and bulk quote engine serving enterprise procurement teams with custom MOQ pricing and branding previews.',
    metrics: [
      { label: 'Catalog SKUs Indexed', value: '850+' },
      { label: 'Lighthouse Performance', value: '98 / 100' },
      { label: 'Quote Turnaround Speed', value: '4x Faster' },
    ],
    highlights: [
      'Architected tiered MOQ pricing calculators and multi-SKU corporate hamper builders with instant PDF/WhatsApp quote dispatch.',
      'Optimized image delivery pipeline and category filtering for zero-layout-shift browsing on mobile and desktop.',
      'Built admin inventory & inquiry pipeline for rapid B2B fulfillment tracking.',
    ],
  },
  masterplayer: {
    title: 'Masterplayer — Custom Jersey & Sublimation Print Studio',
    tag: 'SPORTS APPAREL CONFIGURATOR · PRODUCTION PIPELINE',
    liveUrl: 'https://github.com/avichal15/masterplayer-printing-and-design',
    repoUrl: 'https://github.com/avichal15/masterplayer-printing-and-design',
    routePath: '/work/masterplayer',
    summary:
      'End-to-end custom sportswear and sublimation printing platform managing team roster sizing, fabric selection, vector artwork proofing, and factory job tickets.',
    metrics: [
      { label: 'Custom Roster Configurations', value: 'Unlimited' },
      { label: 'Print Spec Error Reduction', value: '-78%' },
      { label: 'Order-to-Press Handoff', value: '< 5 mins' },
    ],
    highlights: [
      'Replaced manual WhatsApp spreadsheet chaos with structured team roster tables (player name, number, size, sleeve cut, GSM fabric).',
      'Automated print-ready job sheet generation for sublimation heat-press operators.',
      'Built interactive kit preview cards with real-time fabric and collar telemetry.',
    ],
  },
  omniroute: {
    title: 'OmniRoute — Open-Source Multi-Provider LLM Gateway (PR #13127)',
    tag: 'OPEN SOURCE CONTRIBUTION · SESSION & LAN AUTH BRIDGE',
    liveUrl: 'https://github.com/diegosouzapw/OmniRoute',
    repoUrl: 'https://github.com/diegosouzapw/OmniRoute',
    routePath: '/work',
    summary:
      'Resolved cross-subnet session drops and cookie rejection when self-hosting OmniRoute across private LANs, Docker bridges, and Tailscale nodes without TLS termination.',
    metrics: [
      { label: 'Upstream PR Reference', value: 'PR #13127' },
      { label: 'Providers Routed', value: '13+ Frontier APIs' },
      { label: 'Failover Overhead', value: '< 12ms' },
    ],
    highlights: [
      'Diagnosed RFC-1918 & CGNAT Tailscale origin mismatches that caused silent 401 session loops on headless Linux deployments.',
      'Implemented protocol-aware SameSite/Secure cookie negotiation and dynamic origin allowlisting.',
      'Added automated regression tests covering localhost, LAN IPv4, Docker bridge, and HTTPS reverse-proxy topologies.',
    ],
  },
  microcoach: {
    title: 'MicroCoach AI — Classroom Observation & Rubric Copilot',
    tag: 'AI PEDAGOGY ENGINE · REAL-TIME RUBRIC SCORING',
    liveUrl: 'https://github.com/avichal15/MicroCoach-AI',
    repoUrl: 'https://github.com/avichal15/MicroCoach-AI',
    routePath: '/work/microcoach-ai',
    summary:
      'AI instructional coaching platform that converts classroom transcripts and observation notes into structured rubric scores and actionable micro-feedback.',
    metrics: [
      { label: 'Coaching Turnaround', value: 'Under 30s' },
      { label: 'Rubric Dimensions', value: '12+ Pedagogical Axes' },
      { label: 'Feedback Specificity', value: 'Citation-Grounded' },
    ],
    highlights: [
      'Designed multi-stage LLM evaluation pipeline that cites exact classroom dialogue timestamps for every rubric score.',
      'Built clean dashboard for school leaders to track teacher growth trajectories across semesters.',
    ],
  },
  chanakya: {
    title: 'Chanakya Reel AI — Autonomous Short-Form Video Synthesis Pipeline',
    tag: 'GENERATIVE MEDIA PIPELINE · FFMPEG + MULTIMODAL AI',
    liveUrl: 'https://github.com/avichal15',
    repoUrl: 'https://github.com/avichal15',
    routePath: '/work/chanakya-reel-ai',
    summary:
      'Automated script-to-reel production harness combining LLM storyboarding, voice synthesis, dynamic word-level captions, and FFmpeg motion compositing.',
    metrics: [
      { label: 'Render Aspect Ratio', value: '9:16 @ 60fps' },
      { label: 'Pipeline Automation', value: 'End-to-End' },
      { label: 'Caption Sync Drift', value: '< 15ms' },
    ],
    highlights: [
      'Orchestrated scene generation, character consistency prompts, TTS audio timing, and ASS/FFmpeg subtitle burn-in.',
      'Reduced manual short-form video editing time from hours to a single CLI run.',
    ],
  },
  mahadev: {
    title: 'Mahadev Plywood — Architectural Material Catalog & Dealer Portal',
    tag: 'B2B SHOWCASE · HIGH-SPEED PRODUCT DISCOVERY',
    liveUrl: 'https://github.com/avichal15/Mahadev-plywood',
    repoUrl: 'https://github.com/avichal15/Mahadev-plywood',
    routePath: '/work/mahadev-plywood',
    summary:
      'Digital catalog and specification portal for architectural plywood, laminates, and veneers with instant dealer inquiry routing.',
    metrics: [
      { label: 'Material Categories', value: '6+ Core Lines' },
      { label: 'Mobile First Load', value: '0.9s' },
      { label: 'Inquiry Conversion', value: 'Direct WhatsApp + Lead API' },
    ],
    highlights: [
      'Built tactile material comparison cards showcasing thickness tolerances, core grades, and finish textures.',
      'Engineered SEO-friendly product taxonomy for regional B2B contractors and interior designers.',
    ],
  },
  cert_oci_genai: {
    title: 'Oracle Cloud Infrastructure 2025 Certified Generative AI Professional',
    tag: 'OFFICIAL ORACLE CERTIFICATION · LLM & RAG ARCHITECTURE',
    liveUrl: 'https://www.linkedin.com/in/avichalgoyal007/',
    repoUrl: '/media/certs/oci-genai-prof.pdf',
    routePath: '/certifications/oci-genai-professional',
    summary:
      'Validated expertise in designing, fine-tuning, and deploying enterprise Large Language Models, RAG pipelines, and semantic vector search on Oracle Cloud Infrastructure.',
    metrics: [
      { label: 'Issuing Authority', value: 'Oracle University' },
      { label: 'Year Earned', value: '2025' },
      { label: 'Credential Scope', value: 'Professional Tier' },
    ],
    highlights: [
      'Covers OCI Generative AI Service, dedicated AI clusters, LangChain/LlamaIndex orchestration, and enterprise guardrails.',
      'Verified production competency in embedding models, chunking strategies, and vector database indexing.',
    ],
  },
  cert_oci_ds: {
    title: 'Oracle Cloud Infrastructure 2025 Certified Data Science Professional',
    tag: 'OFFICIAL ORACLE CERTIFICATION · MLOPS & MODEL DEPLOYMENT',
    liveUrl: 'https://www.linkedin.com/in/avichalgoyal007/',
    repoUrl: '/media/certs/oci-data-science-prof.pdf',
    routePath: '/certifications/oci-data-science-professional',
    summary:
      'Certified proficiency in end-to-end machine learning lifecycles, feature stores, model catalog governance, and scalable inference pipelines on OCI.',
    metrics: [
      { label: 'Issuing Authority', value: 'Oracle University' },
      { label: 'Year Earned', value: '2025' },
      { label: 'Credential Scope', value: 'Professional Tier' },
    ],
    highlights: [
      'Demonstrated mastery of automated ML pipelines, distributed training, model evaluation, and drift monitoring.',
    ],
  },
  cert_stanford_ml: {
    title: 'Machine Learning Specialization — Stanford Online & DeepLearning.AI',
    tag: 'ANDREW NG SPECIALIZATION · SUPERVISED & UNSUPERVISED ML',
    liveUrl: 'https://www.linkedin.com/in/avichalgoyal007/',
    repoUrl: '/media/certs/coursera-ml-stanford.pdf',
    routePath: '/certifications/stanford-ml-specialization',
    summary:
      'Foundational and advanced specialization taught by Andrew Ng covering supervised learning, neural networks, decision trees, recommender systems, and reinforcement learning.',
    metrics: [
      { label: 'Instructors', value: 'Andrew Ng / Stanford' },
      { label: 'Core Modules', value: '3-Course Track' },
      { label: 'Focus', value: 'First-Principles ML' },
    ],
    highlights: [
      'Implemented gradient descent, regularized logistic regression, neural network backpropagation, and collaborative filtering from scratch.',
    ],
  },
};

function getPathname() {
  return window.location.pathname.replace(/\/+$/, '') || '/';
}

function usePathname() {
  const [pathname, setPathname] = useState(getPathname);

  useEffect(() => {
    const onPopState = () => setPathname(getPathname());
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = (to) => {
    const normalized = to.replace(/\/+$/, '') || '/';
    if (normalized === pathname) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    window.history.pushState({}, '', normalized);
    setPathname(normalized);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return [pathname, navigate];
}

function findOutfit(id) {
  return OUTFITS.find((outfit) => outfit.id === id) ?? OUTFITS[0];
}

function resolveOutfitFromRole(text) {
  const normalized = text.trim().toLowerCase();
  if (!normalized) {
    return null;
  }

  for (const rule of ROLE_OUTFIT_RULES) {
    if (rule.keywords.some((keyword) => normalized.includes(keyword))) {
      return rule;
    }
  }

  return {
    outfitId: 'techy',
    message: `Mapped "${text.trim()}" to the Full-Stack Techy suit — shipping clean architecture and fast UX.`,
  };
}

function ScrollSpeech({ text }) {
  const words = useMemo(() => text.split(/\s+/).filter(Boolean), [text]);
  return (
    <span className="scroll-speech">
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className="scroll-word">
          {word}{' '}
        </span>
      ))}
    </span>
  );
}

function ScratchCard({ onComplete }) {
  const canvasRef = useRef(null);
  const [revealed, setRevealed] = useState(false);
  const [percent, setPercent] = useState(0);
  const isDrawingRef = useRef(false);

  const initCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.globalCompositeOperation = 'source-over';
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#F59E0B');
    grad.addColorStop(0.5, '#FDE047');
    grad.addColorStop(1, '#D97706');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = 'rgba(15, 23, 42, 0.16)';
    ctx.lineWidth = 2;
    for (let x = -height; x < width; x += 18) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + height, height);
      ctx.stroke();
    }

    ctx.fillStyle = '#0F172A';
    ctx.font = '700 18px "Fredoka", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('✦ SCRATCH GOLD FOIL TO REVEAL MNEMONIC ✦', width / 2, height / 2 - 6);
    ctx.font = '700 12px "Space Mono", monospace';
    ctx.fillText('DRAG CURSOR OR FINGER ACROSS CARD', width / 2, height / 2 + 18);
  };

  useEffect(() => {
    initCanvas();
  }, []);

  const scratchAt = (clientX, clientY) => {
    const canvas = canvasRef.current;
    if (!canvas || revealed) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;

    const ctx = canvas.getContext('2d');
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 28, 0, Math.PI * 2);
    ctx.fill();

    const img = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let transparent = 0;
    const total = img.length / 4;
    for (let i = 3; i < img.length; i += 16) {
      if (img[i] < 128) transparent += 1;
    }
    const ratio = Math.min(100, Math.round((transparent / (total / 4)) * 100));
    setPercent(ratio);
    if (ratio >= 45 && !revealed) {
      setRevealed(true);
      onComplete?.();
    }
  };

  const handleReset = () => {
    setRevealed(false);
    setPercent(0);
    initCanvas();
  };

  return (
    <div className="scratch-widget">
      <div className="scratch-header">
        <span className="font-mono">HIGH-YIELD DENTAL ANATOMY CARD #402</span>
        <div className="scratch-actions">
          <span className="scratch-pct">{revealed ? '100% UNLOCKED' : `${percent}% SCRATCHED`}</span>
          <button type="button" className="scratch-reset-btn" onClick={handleReset}>
            Reset Foil
          </button>
        </div>
      </div>
      <div className="scratch-stage">
        <div className="scratch-answer">
          <p className="scratch-kicker">CRANIAL NERVE VII (FACIAL NERVE) BRANCHES:</p>
          <h4>“To Zanzibar By Motor Car”</h4>
          <p>
            <strong>T</strong>emporal · <strong>Z</strong>ygomatic · <strong>B</strong>uccal ·{' '}
            <strong>M</strong>arginal Mandibular · <strong>C</strong>ervical
          </p>
        </div>
        <canvas
          ref={canvasRef}
          width={520}
          height={148}
          className={`scratch-canvas ${revealed ? 'is-cleared' : ''}`}
          onPointerDown={(e) => {
            isDrawingRef.current = true;
            scratchAt(e.clientX, e.clientY);
          }}
          onPointerMove={(e) => {
            if (isDrawingRef.current) scratchAt(e.clientX, e.clientY);
          }}
          onPointerUp={() => {
            isDrawingRef.current = false;
          }}
          onPointerLeave={() => {
            isDrawingRef.current = false;
          }}
        />
      </div>
    </div>
  );
}

function PhoneyCallDeck({ onEmojiPulse }) {
  const [callState, setCallState] = useState('screening');
  const [seconds, setSeconds] = useState(14);
  const [activeFeed, setActiveFeed] = useState(
    'AI Screening Agent: “Hello! Avichal is currently shipping production code. State your inquiry and I will route or summarize it live.”'
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSeconds((s) => (s + 1) % 3600);
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const playTone = (freq1, freq2) => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq1, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq2, ctx.currentTime + 0.18);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    } catch {
      // Ignore audio errors if blocked by browser autoplay policy
    }
  };

  const triggerSoundboard = (emoji, text, f1, f2) => {
    playTone(f1, f2);
    setActiveFeed(text);
    onEmojiPulse?.(emoji);
  };

  const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
  const ss = String(seconds % 60).padStart(2, '0');

  return (
    <div className="phoney-deck">
      <div className="phoney-statusbar">
        <span>ANDROID 15 · INCALLSERVICE</span>
        <span className="phoney-timer">
          ● {callState.toUpperCase()} · {mm}:{ss}
        </span>
      </div>
      <div className="phoney-caller">
        <div>
          <p className="phoney-caller-tag">INCOMING TELECOM STREAM</p>
          <h4>+91 (800) 555-0199 · Unknown Enterprise Lead</h4>
        </div>
        <span className="phoney-badge">180ms WebRTC</span>
      </div>
      <div className="phoney-transcript">{activeFeed}</div>
      <div className="phoney-soundboard">
        <button
          type="button"
          onClick={() =>
            triggerSoundboard(
              '🤖',
              'AI Persona [Executive Gatekeeper]: “Verified caller intent: B2B Engineering Contract. Forwarding transcript to Avichal.”',
              520,
              780
            )
          }
        >
          🤖 AI Gatekeeper
        </button>
        <button
          type="button"
          onClick={() =>
            triggerSoundboard(
              '⚡',
              'Soundboard [Instant Pitch]: “Avichal builds high-velocity full-stack & AI products. Press 1 to book a technical deep-dive.”',
              640,
              960
            )
          }
        >
          ⚡ Pitch Drop
        </button>
        <button
          type="button"
          onClick={() =>
            triggerSoundboard(
              '🛡️',
              'Spam Shield Triggered: “Robocall fingerprint matched. Call sandboxed and logged with zero ring interruption.”',
              420,
              260
            )
          }
        >
          🛡️ Block Spam
        </button>
      </div>
      <div className="phoney-controls">
        <button
          type="button"
          className={`phoney-btn ${callState === 'answered' ? 'is-green' : ''}`}
          onClick={() => {
            setCallState('answered');
            playTone(440, 880);
            setActiveFeed('Live Takeover Active: Direct duplex audio bridged to Android 15 handset.');
          }}
        >
          📞 Answer / Takeover
        </button>
        <button
          type="button"
          className={`phoney-btn ${callState === 'screening' ? 'is-purple' : ''}`}
          onClick={() => {
            setCallState('screening');
            playTone(580, 690);
            setActiveFeed('AI Screening Resumed: Gemini Live streaming real-time caller intent analysis.');
          }}
        >
          🧠 Auto-Screen
        </button>
      </div>
    </div>
  );
}

function AllWorkView({ navigate }) {
  const [activeCategory, setActiveCategory] = useState('All');

  const allItems = useMemo(() => {
    const featured = FEATURED_STORIES.map((s) => ({
      slug: s.slug,
      title: s.title,
      subtitle: s.subtitle,
      category: 'Featured Flagship',
      period: s.year,
      summary: s.summary,
      stack: s.stack || [],
      image: s.media?.desktop || null,
      liveUrl: s.liveUrl,
      repoUrl: s.repoUrl,
    }));
    const archive = ARCHIVE_PROJECTS.map((p) => ({
      slug: p.slug,
      title: p.title,
      subtitle: p.category,
      category: p.category,
      period: p.period,
      summary: p.summary,
      stack: p.stack || [],
      image: typeof p.media === 'string' ? p.media : p.media?.desktop || null,
      liveUrl: p.liveUrl,
      repoUrl: p.repoUrl,
    }));
    return [...featured, ...archive];
  }, []);

  const categories = useMemo(() => {
    const unique = new Set(allItems.map((project) => project.category));
    return ['All', ...unique];
  }, [allItems]);

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') {
      return allItems;
    }
    return allItems.filter((project) => project.category === activeCategory);
  }, [activeCategory, allItems]);

  return (
    <main className="subpage-shell">
      <div className="subpage-header pixel-shadow-box">
        <div>
          <p className="eyebrow">COMPLETE ENGINEERING ARCHIVE · {allItems.length} SYSTEMS</p>
          <h1 className="subpage-title">All Deployed Products, AI Systems &amp; Client Work</h1>
          <p className="subpage-lead">
            Every flagship platform, client storefront, AI agent harness, and utility built and maintained by Avichal
            Goyal. Click any card for the full architecture breakdown, verified status, and live links.
          </p>
        </div>
        <div className="subpage-actions">
          <button type="button" className="neo-btn neo-btn-yellow" onClick={() => navigate('/')}>
            ← Back to 3D Interactive Stage
          </button>
          <button type="button" className="neo-btn" onClick={() => navigate('/certifications')}>
            View Certifications ({CERTIFICATIONS.length})
          </button>
        </div>
      </div>

      <div className="filter-row" role="tablist" aria-label="Filter projects by category">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={`nav-chip ${activeCategory === category ? 'active' : ''}`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="archive-grid">
        {filteredProjects.map((project) => (
          <article key={project.slug} className="archive-card pixel-shadow-box">
            {project.image ? (
              <div className="archive-card-media" onClick={() => navigate(`/work/${project.slug}`)}>
                <img src={project.image} alt={project.title} loading="lazy" />
              </div>
            ) : null}
            <div className="archive-card-top">
              <span className="pill-badge">{project.category}</span>
              <span className="archive-period">{project.period}</span>
            </div>
            <h2>{project.title}</h2>
            <p className="archive-subtitle">{project.subtitle}</p>
            <p className="archive-summary">{project.summary}</p>
            <div className="stack-tags">
              {project.stack.map((tech) => (
                <span key={tech} className="stack-tag">
                  {tech}
                </span>
              ))}
            </div>
            <div className="archive-card-actions">
              <button
                type="button"
                className="neo-btn neo-btn-yellow"
                onClick={() => navigate(`/work/${project.slug}`)}
              >
                Read Case Study →
              </button>
              {project.liveUrl ? (
                <a className="neo-btn" href={project.liveUrl} target="_blank" rel="noreferrer">
                  Live Site ↗
                </a>
              ) : null}
              {project.repoUrl ? (
                <a className="neo-btn" href={project.repoUrl} target="_blank" rel="noreferrer">
                  GitHub ↗
                </a>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}

function ProjectDetailView({ slug, navigate }) {
  const project = ALL_WORK_BY_SLUG.get(slug);

  if (!project) {
    return (
      <main className="subpage-shell">
        <div className="subpage-header pixel-shadow-box">
          <div>
            <p className="eyebrow">PROJECT NOT FOUND</p>
            <h1 className="subpage-title">That project slug doesn&apos;t exist</h1>
          </div>
          <button type="button" className="neo-btn neo-btn-yellow" onClick={() => navigate('/work')}>
            ← Back to All Work
          </button>
        </div>
      </main>
    );
  }

  const heroImg = typeof project.media === 'string' ? project.media : project.media?.desktop || null;
  const highlights = project.whatIBuiltAndOwned || (project.solution ? [project.solution] : []);

  return (
    <main className="subpage-shell">
      <div className="subpage-header pixel-shadow-box">
        <div>
          <p className="eyebrow">
            {project.category || project.relationshipBadge} · {project.period || project.year}
          </p>
          <h1 className="subpage-title">{project.title}</h1>
          <p className="subpage-lead">{project.subtitle || project.summary}</p>
        </div>
        <div className="subpage-actions">
          <button type="button" className="neo-btn" onClick={() => navigate('/work')}>
            ← All Work
          </button>
          <button type="button" className="neo-btn" onClick={() => navigate('/')}>
            3D Stage
          </button>
          {project.liveUrl ? (
            <a className="neo-btn neo-btn-yellow" href={project.liveUrl} target="_blank" rel="noreferrer">
              Visit Live Deployment ↗
            </a>
          ) : null}
          {project.repoUrl ? (
            <a className="neo-btn" href={project.repoUrl} target="_blank" rel="noreferrer">
              Source Repository ↗
            </a>
          ) : null}
        </div>
      </div>

      {heroImg ? (
        <div className="detail-hero-media pixel-shadow-box">
          <img src={heroImg} alt={project.title} />
        </div>
      ) : null}

      <div className="detail-columns">
        <section className="detail-panel pixel-shadow-box">
          <h2>System Overview</h2>
          <p>{project.summary}</p>
          {project.problem ? (
            <>
              <h3>Problem Statement</h3>
              <p>{project.problem}</p>
            </>
          ) : null}
          {highlights.length > 0 ? (
            <>
              <h3>Engineering Highlights &amp; Ownership</h3>
              <ul className="detail-list">
                {highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </>
          ) : null}
        </section>

        <aside className="detail-panel pixel-shadow-box">
          <h3>Technology Stack</h3>
          <div className="stack-tags">
            {(project.stack || []).map((tech) => (
              <span key={tech} className="stack-tag">
                {tech}
              </span>
            ))}
          </div>
        </aside>
      </div>
    </main>
  );
}

function CertificationsView({ navigate }) {
  return (
    <main className="subpage-shell">
      <div className="subpage-header pixel-shadow-box">
        <div>
          <p className="eyebrow">VERIFIED CREDENTIALS &amp; TECHNICAL TRAINING</p>
          <h1 className="subpage-title">Certifications &amp; Academic Credentials</h1>
          <p className="subpage-lead">
            Verified credentials across Business Intelligence, Full-Stack MERN Engineering, and Data Structures &amp;
            Algorithms.
          </p>
        </div>
        <div className="subpage-actions">
          <button type="button" className="neo-btn neo-btn-yellow" onClick={() => navigate('/')}>
            ← Back to 3D Stage
          </button>
          <button type="button" className="neo-btn" onClick={() => navigate('/work')}>
            Explore All Projects
          </button>
        </div>
      </div>

      <div className="archive-grid">
        {CERTIFICATIONS.map((cert) => (
          <article key={cert.slug} className="archive-card pixel-shadow-box">
            <div className="archive-card-top">
              <span className="pill-badge">{cert.issuer}</span>
              <span className="archive-period">{cert.issueDate}</span>
            </div>
            <h2>{cert.title}</h2>
            <p className="archive-subtitle">{cert.category}</p>
            <p className="archive-summary">{cert.summary}</p>
            <div className="stack-tags">
              {(cert.skills || []).map((skill) => (
                <span key={skill} className="stack-tag">
                  {skill}
                </span>
              ))}
            </div>
            <div className="archive-card-actions">
              <button
                type="button"
                className="neo-btn neo-btn-yellow"
                onClick={() => navigate(`/certifications/${cert.slug}`)}
              >
                Inspect Credential →
              </button>
              {cert.verifyUrl ? (
                <a className="neo-btn" href={cert.verifyUrl}>
                  {cert.verifyLabel || 'Verify'} ↗
                </a>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}

function CertificationDetailView({ slug, navigate }) {
  const cert = CERTIFICATIONS.find((item) => item.slug === slug);

  if (!cert) {
    return (
      <main className="subpage-shell">
        <div className="subpage-header pixel-shadow-box">
          <div>
            <p className="eyebrow">CREDENTIAL NOT FOUND</p>
            <h1 className="subpage-title">That certification slug doesn&apos;t exist</h1>
          </div>
          <button type="button" className="neo-btn neo-btn-yellow" onClick={() => navigate('/certifications')}>
            ← Back to Certifications
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="subpage-shell">
      <div className="subpage-header pixel-shadow-box">
        <div>
          <p className="eyebrow">
            {cert.issuer} · {cert.issueDate}
          </p>
          <h1 className="subpage-title">{cert.title}</h1>
          <p className="subpage-lead">{cert.summary}</p>
        </div>
        <div className="subpage-actions">
          <button type="button" className="neo-btn" onClick={() => navigate('/certifications')}>
            ← All Certifications
          </button>
          {cert.verifyUrl ? (
            <a className="neo-btn neo-btn-yellow" href={cert.verifyUrl}>
              {cert.verifyLabel || 'Request Verification'} ↗
            </a>
          ) : null}
        </div>
      </div>

      <div className="detail-columns">
        <section className="detail-panel pixel-shadow-box">
          <h2>Applied in Production Work</h2>
          <p>{cert.appliedInWork}</p>
          <h3>Verification Note</h3>
          <p>{cert.verificationNote}</p>
        </section>

        <aside className="detail-panel pixel-shadow-box">
          <h2>Verified Competencies</h2>
          <div className="stack-tags">
            {(cert.skills || []).map((skill) => (
              <span key={skill} className="stack-tag">
                {skill}
              </span>
            ))}
          </div>
        </aside>
      </div>
    </main>
  );
}

export default function App() {
  const [pathname, navigate] = usePathname();
  const [activeWaypointIdx, setActiveWaypointIdx] = useState(0);
  const [outfitId, setOutfitId] = useState('classic');
  const [manualOutfitLock, setManualOutfitLock] = useState(false);
  const [angleIndex, setAngleIndex] = useState(0);
  const [trickState, setTrickState] = useState({ kind: 'wave', startedAt: 0 });
  const [roleQuery, setRoleQuery] = useState('');
  const [roleFeedback, setRoleFeedback] = useState(
    'Try typing "doctor", "payment", "security", "jersey", or "founder" — or use the 3D controls on the floating LEGO character!'
  );
  const [morphActive, setMorphActive] = useState(false);
  const [floatingEmoji, setFloatingEmoji] = useState(null);
  const [omniScenarioIdx, setOmniScenarioIdx] = useState(0);
  const [previewKey, setPreviewKey] = useState(null);

  const stageRef = useRef(null);
  const trickIndexRef = useRef(0);
  const isJumpingRef = useRef(false);
  const [isJumpingAcross, setIsJumpingAcross] = useState(false);

  const isBatmanMode = outfitId === 'gotham';

  // Sync Batman dark mode class onto document.body
  useEffect(() => {
    if (isBatmanMode) {
      document.body.classList.add('batman-mode');
    } else {
      document.body.classList.remove('batman-mode');
    }
  }, [isBatmanMode]);

  const triggerMorphFlash = () => {
    setMorphActive(true);
    window.setTimeout(() => setMorphActive(false), 560);
  };

  // Continuous Scroll Choreography: Parabolic Jump Arcs + Word-by-Word Reveal + Dynamic Section Background
  useEffect(() => {
    if (pathname !== '/') return undefined;

    let rafId = null;

    const updateChoreography = () => {
      const vh = Math.max(window.innerHeight, 1);
      const scrollCenter = window.scrollY + vh * 0.5;

      // 1. Word-by-word progressive reveal (.scroll-word)
      const wordNodes = document.querySelectorAll('.scroll-word');
      wordNodes.forEach((wordEl) => {
        const rect = wordEl.getBoundingClientRect();
        const triggerPoint = vh * 0.86;
        if (rect.top < triggerPoint) {
          wordEl.classList.add('lit');
        } else {
          wordEl.classList.remove('lit');
        }
      });

      // 2. Measure section centers
      const centers = STAGE_WAYPOINTS.map((wp) => {
        const el = document.getElementById(wp.id);
        if (!el) return 0;
        const rect = el.getBoundingClientRect();
        return window.scrollY + rect.top + rect.height * 0.5;
      });

      // Find nearest active section
      let closestIdx = 0;
      let minDist = Infinity;
      centers.forEach((c, idx) => {
        const d = Math.abs(scrollCenter - c);
        if (d < minDist) {
          minDist = d;
          closestIdx = idx;
        }
      });

      setActiveWaypointIdx((prev) => (prev !== closestIdx ? closestIdx : prev));

      // Update section background color variable
      const activeId = STAGE_WAYPOINTS[closestIdx]?.id || 'sec-0';
      const activeBg = SECTION_THEMES[activeId] || '#F5C518';
      document.documentElement.style.setProperty('--bg-active', activeBg);

      // Interpolate between waypoint i and i+1
      let i = 0;
      while (i < centers.length - 1 && scrollCenter > centers[i + 1]) {
        i += 1;
      }

      const wpA = STAGE_WAYPOINTS[i];
      const wpB = STAGE_WAYPOINTS[Math.min(i + 1, STAGE_WAYPOINTS.length - 1)];
      const cA = centers[i] || 0;
      const cB = centers[Math.min(i + 1, centers.length - 1)] || cA + 1;
      const rawT = cB > cA ? Math.min(1, Math.max(0, (scrollCenter - cA) / (cB - cA))) : 0;
      // Smoothstep easing
      const t = rawT * rawT * (3 - 2 * rawT);

      const interpLeft = wpA.left + (wpB.left - wpA.left) * t;
      const interpTop = wpA.top + (wpB.top - wpA.top) * t;
      const interpScale = wpA.scale + (wpB.scale - wpA.scale) * t;

      // Parabolic jump arc when crossing horizontally between Left & Right columns
      const horizontalDelta = Math.abs(wpB.left - wpA.left);
      const isCrossJump = horizontalDelta > 28 && rawT > 0.08 && rawT < 0.92;
      const jumpArcVh = horizontalDelta > 28 ? -Math.sin(t * Math.PI) * 9.5 : 0;

      if (isCrossJump !== isJumpingRef.current) {
        isJumpingRef.current = isCrossJump;
        setIsJumpingAcross(isCrossJump);
      }

      if (stageRef.current && window.innerWidth > 1024) {
        const inBadge = STAGE_WAYPOINTS[closestIdx]?.badge;
        if (inBadge) {
          stageRef.current.style.left = '7%';
          stageRef.current.style.top = '86%';
          stageRef.current.style.transform = 'translate(-50%, -50%) scale(1)';
        } else {
          stageRef.current.style.left = `${interpLeft.toFixed(2)}%`;
          stageRef.current.style.top = `${(interpTop + jumpArcVh).toFixed(2)}%`;
          stageRef.current.style.transform = `translate(-50%, -50%) scale(${interpScale.toFixed(3)})`;
        }
      }
    };

    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateChoreography);
    };

    updateChoreography();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [pathname]);

  // Auto-morph outfit on section change unless user manually locked an outfit
  useEffect(() => {
    if (manualOutfitLock) return;
    const wp = STAGE_WAYPOINTS[activeWaypointIdx];
    if (wp?.autoOutfit && wp.autoOutfit !== outfitId) {
      setOutfitId(wp.autoOutfit);
      triggerMorphFlash();
    }
  }, [activeWaypointIdx, manualOutfitLock]);

  const currentWaypoint = STAGE_WAYPOINTS[activeWaypointIdx] ?? STAGE_WAYPOINTS[0];
  const currentOutfit = findOutfit(outfitId);

  const cycleOutfit = () => {
    const currentIndex = OUTFITS.findIndex((item) => item.id === outfitId);
    const nextOutfit = OUTFITS[(currentIndex + 1) % OUTFITS.length];
    setManualOutfitLock(true);
    setOutfitId(nextOutfit.id);
    triggerMorphFlash();
    setTrickState({ kind: 'spin', startedAt: performance.now() });
    setRoleFeedback(`Switched to ${nextOutfit.label} — ${nextOutfit.tagline}`);
  };

  const triggerTrick = (customKind) => {
    const kind = customKind ?? TRICKS[trickIndexRef.current % TRICKS.length];
    trickIndexRef.current += 1;
    setTrickState({ kind, startedAt: performance.now() });
  };

  const toggleBatmanMode = () => {
    setManualOutfitLock(true);
    if (outfitId === 'gotham') {
      setOutfitId('classic');
      triggerMorphFlash();
      setTrickState({ kind: 'spin', startedAt: performance.now() });
      setRoleFeedback('Exited Gotham Night Protocol — Back to Classic Builder Yellow.');
    } else {
      setOutfitId('gotham');
      triggerMorphFlash();
      setTrickState({ kind: 'superhero', startedAt: performance.now() });
      setRoleFeedback('🦇 I AM VENGEANCE. Gotham Dark Mode & Tactical Cape Activated.');
    }
  };

  const handleRoleSubmit = (event) => {
    event.preventDefault();
    const match = resolveOutfitFromRole(roleQuery);
    if (!match) {
      setRoleFeedback('Enter any role or keyword (e.g. "doctor", "fintech", "android", "security") to morph the rig.');
      return;
    }
    setManualOutfitLock(true);
    setOutfitId(match.outfitId);
    triggerMorphFlash();
    setTrickState({ kind: 'superhero', startedAt: performance.now() });
    setRoleFeedback(match.message);
  };

  const scrollToSection = (id) => {
    if (pathname !== '/') {
      navigate('/');
      window.setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 90);
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const pulseEmoji = (emoji) => {
    setFloatingEmoji(emoji);
    triggerTrick('wave');
    window.setTimeout(() => setFloatingEmoji(null), 1400);
  };

  // Subpage routes (/work, /work/:slug, /certifications, /certifications/:slug)
  if (pathname === '/work') {
    return <AllWorkView navigate={navigate} />;
  }
  if (pathname.startsWith('/work/')) {
    const slug = pathname.replace('/work/', '');
    return <ProjectDetailView slug={slug} navigate={navigate} />;
  }
  if (pathname === '/certifications') {
    return <CertificationsView navigate={navigate} />;
  }
  if (pathname.startsWith('/certifications/')) {
    const slug = pathname.replace('/certifications/', '');
    return <CertificationDetailView slug={slug} navigate={navigate} />;
  }

  const activePreview = previewKey ? PREVIEW_CATALOG[previewKey] : null;
  const activeOmni = OMNIROUTE_SCENARIOS[omniScenarioIdx] ?? OMNIROUTE_SCENARIOS[0];

  return (
    <div className="lego-portfolio-root">
      {/* Whole-Site Tactile 3D LEGO Stud Baseplate Matrix */}
      <div id="lego-stud-bg" aria-hidden="true" />
      <div id="batsignal-glow" aria-hidden="true" />

      {/* Top Sticky Pill Navigation */}
      <header className="top-nav">
        <button type="button" className="brand-chip" onClick={() => scrollToSection('sec-0')}>
          <span className="brand-stud" />
          <strong>AVICHAL.GOYAL</strong>
        </button>

        <nav className="top-nav-links" aria-label="Storybook slides">
          <button
            type="button"
            className={`nav-chip ${activeWaypointIdx === 0 ? 'active' : ''}`}
            onClick={() => scrollToSection('sec-0')}
          >
            Intro
          </button>
          <button
            type="button"
            className={`nav-chip ${activeWaypointIdx === 1 ? 'active' : ''}`}
            onClick={() => scrollToSection('sec-1')}
          >
            01 MediStudyGo
          </button>
          <button
            type="button"
            className={`nav-chip ${activeWaypointIdx === 2 ? 'active' : ''}`}
            onClick={() => scrollToSection('sec-2')}
          >
            02 Phoney AI
          </button>
          <button
            type="button"
            className={`nav-chip ${activeWaypointIdx === 3 ? 'active' : ''}`}
            onClick={() => scrollToSection('sec-3')}
          >
            03 TruGifting
          </button>
          <button
            type="button"
            className={`nav-chip ${activeWaypointIdx === 4 ? 'active' : ''}`}
            onClick={() => scrollToSection('sec-4')}
          >
            04 Masterplayer
          </button>
          <button
            type="button"
            className={`nav-chip ${activeWaypointIdx === 5 ? 'active' : ''}`}
            onClick={() => scrollToSection('sec-5')}
          >
            05 OmniRoute
          </button>
          <button
            type="button"
            className={`nav-chip ${activeWaypointIdx === 6 ? 'active' : ''}`}
            onClick={() => scrollToSection('sec-6')}
          >
            All Work &amp; Certs
          </button>
          <button
            type="button"
            className={`nav-chip ${activeWaypointIdx >= 7 ? 'active' : ''}`}
            onClick={() => scrollToSection('sec-8')}
          >
            Contact
          </button>
        </nav>

        <div className="top-nav-actions">
          <button type="button" className="nav-chip" onClick={cycleOutfit}>
            👕 Dress ({currentOutfit.shortLabel})
          </button>
          <button
            type="button"
            className={`nav-chip bat-toggle-chip ${isBatmanMode ? 'active' : ''}`}
            onClick={toggleBatmanMode}
          >
            🦇 {isBatmanMode ? 'Exit Batman' : 'Batman Mode'}
          </button>
        </div>
      </header>

      {/* Floating 3D LEGO Character Stage — Choreographed across Left, Right & Circular Badge */}
      <div
        id="character-stage"
        ref={stageRef}
        className={`${currentWaypoint.badge ? 'badge-mode' : ''}`}
        onClick={() => {
          if (currentWaypoint.badge) {
            scrollToSection('sec-7');
          }
        }}
        title={currentWaypoint.badge ? 'Click to summon 3D Minifig back to full size!' : undefined}
      >
        <div id="morph-ring" className={morphActive ? 'active' : ''} />

        <div id="pointing-badge">
          {isBatmanMode ? '🦇 GOTHAM KNIGHT // ' : '⚡ '}
          {currentWaypoint.label}
        </div>

        {floatingEmoji ? <div className="floating-emoji-burst">{floatingEmoji}</div> : null}

        <div className="three-canvas-holder">
          <LegoScene
            outfitId={outfitId}
            mood={currentWaypoint.mood}
            accent={currentOutfit.accent}
            trickState={trickState}
            onCycleOutfit={cycleOutfit}
            angleIndex={angleIndex}
            isJumpingAcross={isJumpingAcross}
            badgeMode={currentWaypoint.badge}
          />
        </div>

        {/* 4-Angle Camera View Switcher */}
        <div className="angle-bar" role="group" aria-label="3D Minifigure viewing angle">
          {['Front', '3/4 View', 'Side', 'Back'].map((label, idx) => (
            <button
              key={label}
              type="button"
              className={`angle-pill ${angleIndex === idx ? 'active' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                setAngleIndex(idx);
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Character Action Dock */}
        <div className="char-dock">
          <button type="button" className="dock-btn" onClick={cycleOutfit}>
            👕 Dress me up
          </button>
          <button type="button" className="dock-btn" onClick={() => triggerTrick()}>
            🤸 Do a trick
          </button>
          <button type="button" className="dock-btn dock-btn-bat" onClick={toggleBatmanMode}>
            🦇 {isBatmanMode ? 'Builder Mode' : 'Transform'}
          </button>
        </div>
      </div>

      {/* Choreographed Story Sections (sec-0 to sec-8) */}
      <main className="choreo-main">
        {/* SLIDE 00: HERO INTRO (Card Left, 3D Minifig Right) */}
        <section id="sec-0" className="story-section align-left">
          <div className="story-card pixel-shadow-box">
            <div className="card-kicker-row">
              <span className="pill-badge">⚡ AVAILABLE FOR HIGH-IMPACT FULL-STACK &amp; AI ROLES</span>
              <span className="font-mono">JAIPUR / REMOTE</span>
            </div>

            <h1 className="hero-headline">
              Hi, I&apos;m <span className="highlight-underline">Avichal Goyal</span> —{' '}
              <ScrollSpeech text="a product-minded software engineer turning complex AI, telecom, and commerce problems into tactile, zero-latency software." />{' '}
              And occasionally, I&apos;m{' '}
              <span className="bat-highlight" onClick={toggleBatmanMode} role="button" tabIndex={0}>
                Batman
              </span>
              .
            </h1>

            <p className="story-lead">
              <ScrollSpeech text="Scroll down to watch my rigged 3D LEGO minifigure leap across the screen, switch suits for each domain, and walk you through 10+ production platforms." />
            </p>

            {/* Interactive Role-to-Suit Matcher */}
            <form className="role-matcher-box" onSubmit={handleRoleSubmit}>
              <label htmlFor="role-input" className="font-mono">
                🎯 TYPE YOUR TEAM OR DOMAIN TO MORPH MY 3D SUIT:
              </label>
              <div className="role-input-row">
                <input
                  id="role-input"
                  type="text"
                  value={roleQuery}
                  onChange={(e) => setRoleQuery(e.target.value)}
                  placeholder="e.g. HealthTech, Android Voice AI, Payments, Security, Batman..."
                />
                <button type="submit" className="neo-btn neo-btn-yellow">
                  Morph Rig →
                </button>
              </div>
              <p className="role-feedback">{roleFeedback}</p>
            </form>

            {/* Outfit Switcher Chips */}
            <div className="suit-selector-row">
              {OUTFITS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`suit-chip ${outfitId === item.id ? 'active' : ''}`}
                  onClick={() => {
                    setManualOutfitLock(true);
                    setOutfitId(item.id);
                    triggerMorphFlash();
                    setTrickState({ kind: 'spin', startedAt: performance.now() });
                  }}
                >
                  <span className="suit-dot" style={{ background: item.accent }} />
                  {item.shortLabel}
                </button>
              ))}
            </div>

            <div className="hero-cta-row">
              <button type="button" className="neo-btn neo-btn-yellow" onClick={() => scrollToSection('sec-1')}>
                Start Guided Tour ↓
              </button>
              <button type="button" className="neo-btn" onClick={() => navigate('/work')}>
                Full Archive ({ARCHIVE_PROJECTS.length} Projects)
              </button>
              <a className="neo-btn" href={PROFILE.resumeUrl} target="_blank" rel="noreferrer">
                Resume PDF ↗
              </a>
            </div>
          </div>
        </section>

        {/* SLIDE 01: MEDISTUDYGO (3D Minifig Jumps Left -> Card Right) */}
        <section id="sec-1" className="story-section align-right">
          <div className="story-card pixel-shadow-box">
            <div className="card-kicker-row">
              <span className="pill-badge">01 // HEALTH &amp; EDTECH PLATFORM</span>
              <span className="font-mono">REACT 19 · FASTAPI · RAZORPAY · RAG</span>
            </div>

            <h2 className="section-title">MediStudyGo — 29,500+ Medical Flashcards &amp; AI Tutor</h2>

            <p className="story-lead">
              <ScrollSpeech text="Medical and dental students were drowning in static PDFs. I architected a high-speed study engine with 29,500+ active-recall cards, AI RAG tutoring, and verified Razorpay checkout." />
            </p>

            <div className="project-showcase-media">
              <img
                src="/media/projects/medistudygo-desktop.png"
                alt="MediStudyGo platform screenshot"
                loading="lazy"
              />
            </div>

            {/* Interactive Gold Foil Scratch Card */}
            <ScratchCard onComplete={() => pulseEmoji('🦷')} />

            <div className="metric-strip">
              <div>
                <strong>29,500+</strong>
                <span>Flashcards &amp; Notes</span>
              </div>
              <div>
                <strong>62ms</strong>
                <span>Median Search Latency</span>
              </div>
              <div>
                <strong>99.98%</strong>
                <span>Razorpay Webhook Sync</span>
              </div>
            </div>

            <div className="card-action-row">
              <a className="neo-btn neo-btn-yellow" href="https://www.medistudygo.com/" target="_blank" rel="noreferrer">
                Visit medistudygo.com ↗
              </a>
              <button type="button" className="neo-btn" onClick={() => setPreviewKey('medistudygo')}>
                Quick Spec Preview
              </button>
              <button type="button" className="neo-btn" onClick={() => navigate('/work/medistudygo')}>
                Full Case Study →
              </button>
            </div>
          </div>
        </section>

        {/* SLIDE 02: PHONEY AI (3D Minifig Jumps Right -> Card Left) */}
        <section id="sec-2" className="story-section align-left">
          <div className="story-card pixel-shadow-box">
            <div className="card-kicker-row">
              <span className="pill-badge">02 // ANDROID 15 TELECOM &amp; VOICE AI</span>
              <span className="font-mono">KOTLIN · INCALLSERVICE · GEMINI LIVE</span>
            </div>

            <h2 className="section-title">Phoney — Real-Time AI Call Screening &amp; In-Call Agent</h2>

            <p className="story-lead">
              <ScrollSpeech text="Why let unknown numbers hijack your focus? Phoney binds directly to Android 15 CallScreeningService and InCallService to intercept spam, stream live transcripts, and talk back in 180ms." />
            </p>

            {/* Live Interactive Android 15 In-Call Deck */}
            <PhoneyCallDeck onEmojiPulse={pulseEmoji} />

            <div className="card-action-row">
              <a
                className="neo-btn neo-btn-yellow"
                href="https://github.com/avichal15/phoney-beta"
                target="_blank"
                rel="noreferrer"
              >
                Inspect Android Repo ↗
              </a>
              <button type="button" className="neo-btn" onClick={() => setPreviewKey('phoney')}>
                Quick Spec Preview
              </button>
              <button type="button" className="neo-btn" onClick={() => navigate('/work/phoney')}>
                Full Case Study →
              </button>
            </div>
          </div>
        </section>

        {/* SLIDE 03: TRUGIFTING (3D Minifig Jumps Left -> Card Right) */}
        <section id="sec-3" className="story-section align-right">
          <div className="story-card pixel-shadow-box">
            <div className="card-kicker-row">
              <span className="pill-badge">03 // B2B CORPORATE COMMERCE</span>
              <span className="font-mono">NEXT.JS · TAILWIND · BULK QUOTE ENGINE</span>
            </div>

            <h2 className="section-title">TruGifting — Enterprise Corporate Gifting Storefront</h2>

            <p className="story-lead">
              <ScrollSpeech text="Enterprise procurement teams needed custom MOQ pricing, logo personalization previews, and instant multi-SKU quote generation across 850+ curated corporate gifts." />
            </p>

            <div className="project-showcase-media">
              <img
                src="/media/projects/trugifting-desktop.png"
                alt="TruGifting corporate storefront"
                loading="lazy"
              />
            </div>

            <div className="metric-strip">
              <div>
                <strong>850+</strong>
                <span>Curated B2B SKUs</span>
              </div>
              <div>
                <strong>98 / 100</strong>
                <span>Lighthouse Score</span>
              </div>
              <div>
                <strong>4x Faster</strong>
                <span>Bulk Quote Dispatch</span>
              </div>
            </div>

            <div className="card-action-row">
              <a className="neo-btn neo-btn-yellow" href="https://trugifting.com/" target="_blank" rel="noreferrer">
                Visit trugifting.com ↗
              </a>
              <button type="button" className="neo-btn" onClick={() => setPreviewKey('trugifting')}>
                Quick Spec Preview
              </button>
              <button type="button" className="neo-btn" onClick={() => navigate('/work/trugifting')}>
                Full Case Study →
              </button>
            </div>
          </div>
        </section>

        {/* SLIDE 04: MASTERPLAYER (3D Minifig Jumps Right -> Card Left) */}
        <section id="sec-4" className="story-section align-left">
          <div className="story-card pixel-shadow-box">
            <div className="card-kicker-row">
              <span className="pill-badge">04 // CUSTOM APPAREL &amp; PRINT PIPELINE</span>
              <span className="font-mono">REACT · SUBLIMATION WORKFLOW · B2B</span>
            </div>

            <h2 className="section-title">Masterplayer — Custom Sportswear &amp; Print Studio</h2>

            <p className="story-lead">
              <ScrollSpeech text="Turned chaotic WhatsApp jersey orders into a structured sublimation production studio — capturing player rosters, GSM fabric specs, collar cuts, and print-ready factory tickets." />
            </p>

            <div className="project-showcase-media">
              <img
                src="/media/projects/masterplayer-desktop.png"
                alt="Masterplayer custom jersey studio"
                loading="lazy"
              />
            </div>

            <div className="metric-strip">
              <div>
                <strong>-78%</strong>
                <span>Print Spec Errors</span>
              </div>
              <div>
                <strong>&lt; 5 min</strong>
                <span>Order-to-Press Ticket</span>
              </div>
              <div>
                <strong>100%</strong>
                <span>Roster Size Validation</span>
              </div>
            </div>

            <div className="card-action-row">
              <a
                className="neo-btn neo-btn-yellow"
                href="https://github.com/avichal15/masterplayer-printing-and-design"
                target="_blank"
                rel="noreferrer"
              >
                Explore Repository ↗
              </a>
              <button type="button" className="neo-btn" onClick={() => setPreviewKey('masterplayer')}>
                Quick Spec Preview
              </button>
              <button type="button" className="neo-btn" onClick={() => navigate('/work/masterplayer')}>
                Full Case Study →
              </button>
            </div>
          </div>
        </section>

        {/* SLIDE 05: OMNIROUTE OSS CONTRIBUTION (3D Minifig Jumps Left -> Card Right) */}
        <section id="sec-5" className="story-section align-right">
          <div className="story-card pixel-shadow-box">
            <div className="card-kicker-row">
              <span className="pill-badge">05 // OPEN-SOURCE INFRASTRUCTURE · PR #13127</span>
              <span className="font-mono">NODE.JS · MULTI-LLM GATEWAY · LAN AUTH</span>
            </div>

            <h2 className="section-title">OmniRoute Session Sync — Private LAN &amp; Tailscale Auth Fix</h2>

            <p className="story-lead">
              <ScrollSpeech text="Self-hosted engineers running OmniRoute across private LANs and Tailscale subnets hit silent 401 cookie drops over HTTP. I engineered protocol-aware session negotiation in PR #13127." />
            </p>

            {/* Interactive Loopback & Subnet Handshake Simulator */}
            <div className="omni-sim-box">
              <div className="omni-tabs">
                {OMNIROUTE_SCENARIOS.map((item, idx) => (
                  <button
                    key={item.name}
                    type="button"
                    className={`omni-tab ${omniScenarioIdx === idx ? 'active' : ''}`}
                    onClick={() => {
                      setOmniScenarioIdx(idx);
                      pulseEmoji('🔌');
                    }}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
              <div className="omni-terminal">
                <div>
                  <span>ORIGIN HEADER:</span> <code>{activeOmni.origin}</code>
                </div>
                <div>
                  <span>SET-COOKIE POLICY:</span> <code>{activeOmni.cookie}</code>
                </div>
                <div className="omni-status">
                  <span>GATEWAY VERDICT:</span> <strong>{activeOmni.status}</strong>
                </div>
              </div>
            </div>

            <div className="card-action-row">
              <a
                className="neo-btn neo-btn-yellow"
                href="https://github.com/diegosouzapw/OmniRoute"
                target="_blank"
                rel="noreferrer"
              >
                View OmniRoute Upstream ↗
              </a>
              <button type="button" className="neo-btn" onClick={() => setPreviewKey('omniroute')}>
                Inspect PR #13127 Architecture
              </button>
            </div>
          </div>
        </section>

        {/* SLIDE 06: FULL BENTO ARCHIVE & CERTIFICATIONS (3D Minifig Morphs into Bottom-Left Circular Badge!) */}
        <section id="sec-6" className="story-section align-full">
          <div className="story-card story-card-wide pixel-shadow-box">
            <div className="card-kicker-row">
              <span className="pill-badge">06 // FULL ARCHIVE, MORE SHIPPED BUILDS &amp; ORACLE / STANFORD CERTS</span>
              <span className="font-mono">CLICK ANY TILE FOR INSTANT IN-PAGE PREVIEW</span>
            </div>

            <h2 className="section-title">More Production Systems &amp; Verified Qualifications</h2>

            <p className="story-lead">
              <ScrollSpeech text="Notice how my 3D minifigure docked into a live circular badge at the bottom-left so this full-width Bento grid has room to breathe! Click any project or certification below to inspect its specs right here." />
            </p>

            <div className="bento-showcase-grid">
              <div className="bento-tile" onClick={() => setPreviewKey('microcoach')}>
                <span className="pill-badge">AI EDTECH</span>
                <h3>MicroCoach AI — Classroom Rubric Copilot</h3>
                <p>Timestamp-grounded instructional coaching &amp; automated rubric evaluation for educators.</p>
                <span className="tile-cta">Open Interactive Preview →</span>
              </div>

              <div className="bento-tile" onClick={() => setPreviewKey('chanakya')}>
                <span className="pill-badge">GENERATIVE VIDEO</span>
                <h3>Chanakya Reel AI — Autonomous Video Synth</h3>
                <p>End-to-end 9:16 storyboarding, TTS voice synthesis, and FFmpeg word-level caption rendering.</p>
                <span className="tile-cta">Open Interactive Preview →</span>
              </div>

              <div className="bento-tile" onClick={() => setPreviewKey('mahadev')}>
                <span className="pill-badge">B2B CATALOG</span>
                <h3>Mahadev Plywood — Architectural Portal</h3>
                <p>High-speed B2B specification portal for architectural plywood, veneers, and dealer routing.</p>
                <span className="tile-cta">Open Interactive Preview →</span>
              </div>

              <div className="bento-tile bento-tile-cert" onClick={() => setPreviewKey('cert_oci_genai')}>
                <span className="pill-badge">ORACLE CERTIFIED 2025</span>
                <h3>OCI Generative AI Professional</h3>
                <p>Enterprise LLM orchestration, RAG pipelines, semantic search &amp; vector indexing on OCI.</p>
                <span className="tile-cta">Verify Credential →</span>
              </div>

              <div className="bento-tile bento-tile-cert" onClick={() => setPreviewKey('cert_oci_ds')}>
                <span className="pill-badge">ORACLE CERTIFIED 2025</span>
                <h3>OCI Data Science Professional</h3>
                <p>Production MLOps, model catalog governance, feature stores &amp; scalable cloud inference.</p>
                <span className="tile-cta">Verify Credential →</span>
              </div>

              <div className="bento-tile bento-tile-cert" onClick={() => setPreviewKey('cert_stanford_ml')}>
                <span className="pill-badge">STANFORD &amp; DEEPLEARNING.AI</span>
                <h3>Machine Learning Specialization (Andrew Ng)</h3>
                <p>Supervised learning, neural networks, decision trees, recommender systems &amp; RL.</p>
                <span className="tile-cta">Verify Credential →</span>
              </div>
            </div>

            <div className="card-action-row" style={{ marginTop: '1.5rem' }}>
              <button type="button" className="neo-btn neo-btn-yellow" onClick={() => navigate('/work')}>
                Browse All {ARCHIVE_PROJECTS.length} Project Case Studies →
              </button>
              <button type="button" className="neo-btn" onClick={() => navigate('/certifications')}>
                Browse All {CERTIFICATIONS.length} Verified Certificates →
              </button>
            </div>
          </div>
        </section>

        {/* SLIDE 07: ENGINEERING PHILOSOPHY (3D Minifig Pops Back Out to Left -> Card Right) */}
        <section id="sec-7" className="story-section align-right">
          <div className="story-card pixel-shadow-box">
            <div className="card-kicker-row">
              <span className="pill-badge">07 // HOW I BUILD &amp; SHIP</span>
              <span className="font-mono">FIRST PRINCIPLES · ZERO FLUFF</span>
            </div>

            <h2 className="section-title">Built Brick by Brick — With Obsessive Craft</h2>

            <p className="story-lead">
              <ScrollSpeech text="Whether I am wiring a low-latency Android 15 telecom socket, tuning a multi-model LLM gateway, or crafting a 3D WebGL interface, I optimize for two things: immediate user delight and rock-solid production reliability." />
            </p>

            <div className="philosophy-grid">
              <div className="phil-item">
                <h4>01. Product-First Engineering</h4>
                <p>Code only matters when it solves a real bottleneck—faster checkouts, clearer medical recall, or zero-drop calls.</p>
              </div>
              <div className="phil-item">
                <h4>02. Full-Stack Ownership</h4>
                <p>From PostgreSQL schemas and FastAPI/Node workers right up to Three.js shaders and native Kotlin services.</p>
              </div>
              <div className="phil-item">
                <h4>03. AI That Actually Ships</h4>
                <p>Grounded RAG pipelines, deterministic tool-calling, and sub-200ms voice streaming instead of fragile demos.</p>
              </div>
            </div>
          </div>
        </section>

        {/* SLIDE 08: GIANT CTA FOOTER (Card Left, 3D Minifig Right) */}
        <section id="sec-8" className="story-section align-left">
          <div className="story-card pixel-shadow-box footer-cta-card">
            <div className="card-kicker-row">
              <span className="pill-badge">08 // LET&apos;S BUILD SOMETHING ICONIC</span>
              <span className="font-mono">DIRECT RESPONSE &lt; 12 HOURS</span>
            </div>

            <h2 className="section-title">Ready to Ship Your Next Flagship Product?</h2>

            <p className="story-lead">
              <ScrollSpeech text="Drop me an email or connect on LinkedIn and GitHub. Whether it's a founding engineer role, an AI systems contract, or a wild product idea — let's build it." />
            </p>

            <a className="giant-email-cta" href="mailto:avichalgoyal15@gmail.com">
              avichalgoyal15@gmail.com ↗
            </a>

            <div className="hero-cta-row" style={{ marginTop: '1.5rem' }}>
              <a
                className="neo-btn neo-btn-yellow"
                href="https://www.linkedin.com/in/avichalgoyal007/"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn (avichalgoyal007) ↗
              </a>
              <a className="neo-btn" href="https://github.com/avichal15" target="_blank" rel="noreferrer">
                GitHub (avichal15) ↗
              </a>
              <a className="neo-btn" href={PROFILE.resumeUrl} target="_blank" rel="noreferrer">
                Download Resume PDF ↗
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Clickable In-Website Preview Modal (Slide 06 & Quick Spec Previews) */}
      {activePreview ? (
        <div className="preview-modal-backdrop" onClick={() => setPreviewKey(null)} role="dialog" aria-modal="true">
          <div className="preview-modal-card pixel-shadow-box" onClick={(e) => e.stopPropagation()}>
            <div className="preview-modal-header">
              <div>
                <span className="pill-badge">{activePreview.tag}</span>
                <h3>{activePreview.title}</h3>
              </div>
              <button type="button" className="modal-close-btn" onClick={() => setPreviewKey(null)}>
                ✕ Close
              </button>
            </div>

            <p className="preview-modal-summary">{activePreview.summary}</p>

            <div className="metric-strip">
              {activePreview.metrics.map((m) => (
                <div key={m.label}>
                  <strong>{m.value}</strong>
                  <span>{m.label}</span>
                </div>
              ))}
            </div>

            <ul className="detail-list">
              {activePreview.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>

            <div className="card-action-row" style={{ marginTop: '1.5rem' }}>
              {activePreview.liveUrl ? (
                <a className="neo-btn neo-btn-yellow" href={activePreview.liveUrl} target="_blank" rel="noreferrer">
                  Open Live Link / Credential ↗
                </a>
              ) : null}
              {activePreview.routePath ? (
                <button
                  type="button"
                  className="neo-btn"
                  onClick={() => {
                    const target = activePreview.routePath;
                    setPreviewKey(null);
                    navigate(target);
                  }}
                >
                  Open Dedicated Case Study Page →
                </button>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
