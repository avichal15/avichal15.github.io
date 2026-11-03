import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ABOUT_STORY_PARAGRAPHS,
  ALL_PROJECTS,
  CERTIFICATIONS,
  CHARACTER_OUTFITS,
  CHARACTER_TRICKS,
  FEATURED_PROJECTS,
  OWNER_PROFILE,
  PHONEY_AUDIO_EMOJIS,
  PROJECT_COUNT,
  findCertificationBySlug,
  findProjectBySlug,
} from './data/portfolioData';
import LegoScene from './three/LegoScene';
import { soundEngine } from './utils/soundEngine';
import { CertificationModal, ProjectCaseStudyModal } from './components/ProjectCaseStudyModal';

function parseLocationRoute(pathname) {
  const clean = String(pathname || '/').replace(/\/+$/, '') || '/';
  if (clean.startsWith('/work/')) {
    const slug = clean.slice('/work/'.length);
    const project = findProjectBySlug(slug);
    if (project) return { type: 'project', project, certification: null };
  }
  if (clean.startsWith('/certifications/')) {
    const slug = clean.slice('/certifications/'.length);
    const certification = findCertificationBySlug(slug);
    if (certification) return { type: 'certification', project: null, certification };
  }
  return { type: 'home', project: null, certification: null };
}

export default function App() {
  const initialRoute = useMemo(
    () => parseLocationRoute(typeof window !== 'undefined' ? window.location.pathname : '/'),
    []
  );

  // Route & Modal state
  const [activeProject, setActiveProject] = useState(initialRoute.project);
  const [activeCertification, setActiveCertification] = useState(initialRoute.certification);
  const [originRect, setOriginRect] = useState(null);
  const savedScrollYRef = useRef(0);

  // Reduced motion preference
  const [reducedMotion, setReducedMotion] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false
      : false
  );

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return undefined;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e) => setReducedMotion(e.matches);
    mq.addEventListener?.('change', handler);
    return () => mq.removeEventListener?.('change', handler);
  }, []);

  // Audio state — strictly muted by default (no autoplay)
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [activeAudioEmoji, setActiveAudioEmoji] = useState(null);

  // Character & Theme state
  const [isBatmanMode, setIsBatmanMode] = useState(false);
  const [manualOutfitId, setManualOutfitId] = useState(null);
  const [trickState, setTrickState] = useState(null);
  const [characterEmotion, setCharacterEmotion] = useState(null);
  const [speechOverride, setSpeechOverride] = useState(null);
  const [wardrobeOpen, setWardrobeOpen] = useState(false);

  // Section & Scroll Choreography state (discrete transitions only — zero per-pixel re-renders)
  const [sectionMode, setSectionMode] = useState('hero');
  const [activeTourIndex, setActiveTourIndex] = useState(0);
  const [activeAboutIndex, setActiveAboutIndex] = useState(0);
  const [tourSlides, setTourSlides] = useState(() =>
    Object.fromEntries(FEATURED_PROJECTS.map((p) => [p.slug, 0]))
  );
  const [workFilter, setWorkFilter] = useState('all');
  const [emailCopied, setEmailCopied] = useState(false);

  // Dragging state for 3D character dock
  const [isGrabbed, setIsGrabbed] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const dragStartRef = useRef(null);

  // Mutable refs for 60fps loop without triggering React re-renders
  const scrollVelocityRef = useRef(0);
  const globalPointerRef = useRef({ x: 0, y: 0 });
  const aboutSectionRef = useRef(null);
  const tourSectionRefs = useRef({});
  const workCardRefs = useRef({});
  const speechTimerRef = useRef(null);

  const showTemporarySpeech = useCallback((text, emotion = 'happy', durationMs = 4200) => {
    if (speechTimerRef.current) clearTimeout(speechTimerRef.current);
    setSpeechOverride(text);
    if (emotion) setCharacterEmotion(emotion);
    speechTimerRef.current = setTimeout(() => {
      setSpeechOverride(null);
      setCharacterEmotion(null);
    }, durationMs);
  }, []);

  useEffect(() => {
    return () => {
      if (speechTimerRef.current) clearTimeout(speechTimerRef.current);
    };
  }, []);

  // Global pointer tracker (updates ref directly, zero React re-renders)
  useEffect(() => {
    const onPointerMove = (e) => {
      const vw = Math.max(window.innerWidth, 1);
      const vh = Math.max(window.innerHeight, 1);
      globalPointerRef.current = {
        x: (e.clientX / vw) * 2 - 1,
        y: -((e.clientY / vh) * 2 - 1),
      };

      if (dragStartRef.current) {
        const dx = e.clientX - dragStartRef.current.startX;
        const dy = e.clientY - dragStartRef.current.startY;
        const maxOffsetX = Math.min(260, vw * 0.28);
        const maxOffsetY = Math.min(180, vh * 0.22);
        setDragOffset({
          x: Math.max(-maxOffsetX, Math.min(maxOffsetX, dragStartRef.current.origX + dx)),
          y: Math.max(-maxOffsetY, Math.min(maxOffsetY, dragStartRef.current.origY + dy)),
        });
      }
    };

    const onPointerUp = () => {
      if (dragStartRef.current) {
        dragStartRef.current = null;
        setIsGrabbed(false);
        soundEngine.drop();
      }
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerup', onPointerUp, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, []);

  // Single coherent requestAnimationFrame scroll observer
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let lastTime = performance.now();
    let rafId = null;

    const evaluateScroll = () => {
      rafId = null;
      const now = performance.now();
      const dt = Math.max(16, now - lastTime);
      const scrollY = window.scrollY;
      const rawVel = ((scrollY - lastScrollY) / dt) * 16.67;
      scrollVelocityRef.current = scrollVelocityRef.current * 0.75 + rawVel * 0.25;
      lastScrollY = scrollY;
      lastTime = now;

      const vh = window.innerHeight || 900;
      const probeY = scrollY + vh * 0.45;

      // Update About word lighting directly via CSS custom property (no React setState per pixel)
      const aboutEl = aboutSectionRef.current;
      if (aboutEl) {
        const rect = aboutEl.getBoundingClientRect();
        const progress = Math.max(
          0,
          Math.min(1, (vh * 0.72 - rect.top) / Math.max(rect.height * 0.85, 1))
        );
        aboutEl.style.setProperty('--about-progress', progress.toFixed(3));
        const wordNodes = aboutEl.querySelectorAll('[data-word-threshold]');
        wordNodes.forEach((node) => {
          const threshold = parseFloat(node.getAttribute('data-word-threshold') || '0');
          if (progress >= threshold) {
            node.classList.add('is-lit');
          } else {
            node.classList.remove('is-lit');
          }
        });
        const nextAboutIdx = progress > 0.52 ? 1 : 0;
        setActiveAboutIndex((prev) => (prev === nextAboutIdx ? prev : nextAboutIdx));
      }

      // Determine discrete sectionMode
      const contactEl = document.getElementById('contact');
      const certsEl = document.getElementById('certifications');
      const workEl = document.getElementById('work');
      const tourEl = document.getElementById('tour');

      let nextMode = 'hero';
      if (contactEl && probeY >= contactEl.offsetTop - vh * 0.15) {
        nextMode = 'contact';
      } else if (certsEl && probeY >= certsEl.offsetTop - vh * 0.1) {
        nextMode = 'certifications';
      } else if (workEl && probeY >= workEl.offsetTop - vh * 0.1) {
        nextMode = 'work';
      } else if (tourEl && probeY >= tourEl.offsetTop - vh * 0.12) {
        nextMode = 'tour';
      } else if (aboutEl && probeY >= aboutEl.offsetTop - vh * 0.12) {
        nextMode = 'about';
      }

      setSectionMode((prev) => {
        if (prev !== nextMode) {
          setDragOffset((d) => (d.x === 0 && d.y === 0 ? d : { x: 0, y: 0 }));
          return nextMode;
        }
        return prev;
      });

      if (nextMode === 'tour') {
        let bestIdx = 0;
        let bestDist = Infinity;
        FEATURED_PROJECTS.forEach((proj, idx) => {
          const el = tourSectionRefs.current[proj.slug];
          if (!el) return;
          const r = el.getBoundingClientRect();
          const centerDist = Math.abs(r.top + r.height / 2 - vh * 0.5);
          if (centerDist < bestDist) {
            bestDist = centerDist;
            bestIdx = idx;
          }
        });
        setActiveTourIndex((prev) => {
          if (prev !== bestIdx) {
            setDragOffset((d) => (d.x === 0 && d.y === 0 ? d : { x: 0, y: 0 }));
            setManualOutfitId(null);
            return bestIdx;
          }
          return prev;
        });
      }
    };

    const onScroll = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(evaluateScroll);
      }
    };

    evaluateScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  // Browser history popstate & Escape key handler
  useEffect(() => {
    const onPopState = () => {
      const route = parseLocationRoute(window.location.pathname);
      setActiveProject(route.project);
      setActiveCertification(route.certification);
      setOriginRect(null);
      if (route.type === 'home' && savedScrollYRef.current > 0) {
        const restoreY = savedScrollYRef.current;
        requestAnimationFrame(() => {
          window.scrollTo({ top: restoreY, behavior: 'instant' });
        });
      }
    };

    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // Update document title on route changes
  useEffect(() => {
    if (activeProject) {
      document.title = `${activeProject.title} — ${OWNER_PROFILE.name}`;
    } else if (activeCertification) {
      document.title = `${activeCertification.title} — ${OWNER_PROFILE.name}`;
    } else {
      document.title = `${OWNER_PROFILE.name} — AI Systems, Product Ops & Full-Stack Portfolio`;
    }
  }, [activeProject, activeCertification]);

  // Open / close project case study with shared-element origin rect
  const openProjectCaseStudy = useCallback((project, sourceElement = null) => {
    if (!project) return;
    if (typeof window !== 'undefined') {
      savedScrollYRef.current = window.scrollY;
      const el = sourceElement || workCardRefs.current[project.slug];
      if (el && typeof el.getBoundingClientRect === 'function') {
        const r = el.getBoundingClientRect();
        setOriginRect({ top: r.top, left: r.left, width: r.width, height: r.height });
      } else {
        setOriginRect(null);
      }
      const nextUrl = `/work/${project.slug}`;
      if (window.location.pathname !== nextUrl) {
        window.history.pushState({ projectSlug: project.slug }, '', nextUrl);
      }
    }
    soundEngine.openWindow();
    setWardrobeOpen(false);
    setActiveCertification(null);
    setActiveProject(project);
  }, []);

  const openCertificationModal = useCallback((cert) => {
    if (!cert) return;
    if (typeof window !== 'undefined') {
      savedScrollYRef.current = window.scrollY;
      const nextUrl = `/certifications/${cert.slug}`;
      if (window.location.pathname !== nextUrl) {
        window.history.pushState({ certSlug: cert.slug }, '', nextUrl);
      }
    }
    soundEngine.openWindow();
    setWardrobeOpen(false);
    setActiveProject(null);
    setActiveCertification(cert);
  }, []);

  const closeModal = useCallback(() => {
    soundEngine.closeWindow();
    setActiveProject(null);
    setActiveCertification(null);
    if (typeof window !== 'undefined') {
      if (window.location.pathname !== '/') {
        window.history.pushState({}, '', '/');
      }
      const restoreY = savedScrollYRef.current;
      if (restoreY > 0) {
        requestAnimationFrame(() => {
          window.scrollTo({ top: restoreY, behavior: 'instant' });
        });
      }
    }
  }, []);

  // Escape key closes open modal or wardrobe popover
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (activeProject || activeCertification) {
          closeModal();
        } else if (wardrobeOpen) {
          setWardrobeOpen(false);
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeProject, activeCertification, wardrobeOpen, closeModal]);

  // Lock body scroll while full-page modal is open
  useEffect(() => {
    if (typeof document === 'undefined') return undefined;
    if (activeProject || activeCertification) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeProject, activeCertification]);

  // Resolve active outfit for the 3D minifigure
  const currentTourProject = FEATURED_PROJECTS[activeTourIndex] || FEATURED_PROJECTS[0];
  const resolvedOutfitId = useMemo(() => {
    if (isBatmanMode) return 'batman';
    if (manualOutfitId) return manualOutfitId;
    if (sectionMode === 'tour' && currentTourProject?.outfit) {
      return currentTourProject.outfit;
    }
    if (sectionMode === 'about') {
      return ABOUT_STORY_PARAGRAPHS[activeAboutIndex]?.outfit || 'builder';
    }
    return 'builder';
  }, [isBatmanMode, manualOutfitId, sectionMode, currentTourProject, activeAboutIndex]);

  const activeOutfitObj = useMemo(
    () =>
      CHARACTER_OUTFITS.find((o) => o.id === resolvedOutfitId) ||
      CHARACTER_OUTFITS[0],
    [resolvedOutfitId]
  );

  // Trigger a character trick animation
  const triggerTrick = useCallback(
    (trickInput = null) => {
      const chosen =
        typeof trickInput === 'string'
          ? CHARACTER_TRICKS.find((t) => t.id === trickInput) || CHARACTER_TRICKS[0]
          : trickInput ||
            CHARACTER_TRICKS[Math.floor(Math.random() * CHARACTER_TRICKS.length)];

      const payload = {
        nonce: Date.now() + Math.random(),
        startedAt: performance.now(),
        kind: chosen.id,
        duration: 1.45,
      };
      setTrickState(payload);
      soundEngine.playTrickSound(chosen.id);
      showTemporarySpeech(
        isBatmanMode ? chosen.batmanSpeech : chosen.speech,
        chosen.id === 'dance' ? 'laugh' : 'happy',
        3800
      );
    },
    [isBatmanMode, showTemporarySpeech]
  );

  // Toggle Batman mode
  const toggleBatmanMode = useCallback(() => {
    setIsBatmanMode((prev) => {
      const next = !prev;
      soundEngine.batmanTransform(next);
      if (next) {
        setManualOutfitId('batman');
        showTemporarySpeech(OWNER_PROFILE.heroGreetingBatman, 'surprised', 4200);
      } else {
        setManualOutfitId(null);
        showTemporarySpeech(OWNER_PROFILE.heroGreetingNormal, 'happy', 3800);
      }
      return next;
    });
  }, [showTemporarySpeech]);

  // Select outfit from Wardrobe
  const selectOutfit = useCallback(
    (outfit) => {
      const nextIsBatman = outfit.id === 'batman';
      setIsBatmanMode(nextIsBatman);
      setManualOutfitId(outfit.id);
      soundEngine.setBatmanMode(nextIsBatman);
      soundEngine.pop();
      showTemporarySpeech(outfit.quote, 'happy', 3800);
    },
    [showTemporarySpeech]
  );

  // Toggle sound engine
  const handleToggleSound = useCallback(() => {
    const enabled = soundEngine.toggle();
    setSoundEnabled(enabled);
  }, []);

  // Play Phoney Audio Emoji
  const handlePlayAudioEmoji = useCallback(
    (emojiItem) => {
      if (!emojiItem) return;
      setActiveAudioEmoji(emojiItem.id);
      soundEngine.playPhoneyEmoji(emojiItem.id);
      setTrickState({
        nonce: Date.now() + Math.random(),
        startedAt: performance.now(),
        kind: emojiItem.mood === 'dance' ? 'dance' : 'wave',
        duration: 1.35,
      });
      showTemporarySpeech(`${emojiItem.emoji} ${emojiItem.reaction}`, emojiItem.mood, 3800);
      setTimeout(() => {
        setActiveAudioEmoji((prev) => (prev === emojiItem.id ? null : prev));
      }, 1400);
    },
    [showTemporarySpeech]
  );

  // Copy email in Contact footer
  const handleCopyEmail = useCallback(() => {
    soundEngine.click();
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(OWNER_PROFILE.email).catch(() => {});
    }
    setEmailCopied(true);
    showTemporarySpeech('Email copied to clipboard! Looking forward to building together.', 'happy', 3800);
    setTimeout(() => setEmailCopied(false), 3200);
  }, [showTemporarySpeech]);

  // Scroll to section helper
  const scrollToSection = useCallback(
    (sectionId) => {
      soundEngine.click();
      if (activeProject || activeCertification) {
        closeModal();
      }
      requestAnimationFrame(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
        }
      });
    },
    [activeProject, activeCertification, closeModal, reducedMotion]
  );

  // Filtered projects for the All Work Bento Grid
  const filteredProjects = useMemo(() => {
    if (workFilter === 'featured') return ALL_PROJECTS.filter((p) => p.featured);
    if (workFilter === 'commerce') {
      return ALL_PROJECTS.filter((p) =>
        ['medistudygo', 'trugifting-solutions', 'masterplayer-designs-and-printing', 'mahadev-plywood', 'dhuri-hoon-mai'].includes(p.slug)
      );
    }
    if (workFilter === 'ai-oss') {
      return ALL_PROJECTS.filter((p) =>
        ['omniroute-session-sync', 'gemini-web-antigravity-stack', 'insta-manager'].includes(p.slug)
      );
    }
    if (workFilter === 'android-bi') {
      return ALL_PROJECTS.filter((p) =>
        ['phoney', 'recruitment-funnel-analytics'].includes(p.slug)
      );
    }
    return ALL_PROJECTS;
  }, [workFilter]);

  // Determine character stage dock class and facing orientation
  const isBadgePorthole = sectionMode === 'work' || sectionMode === 'certifications';
  const tourCharacterSide =
    sectionMode === 'tour' ? currentTourProject?.characterSide || 'left' : 'right';

  const facingYaw = useMemo(() => {
    if (isBadgePorthole) return 0;
    if (sectionMode === 'tour') {
      return tourCharacterSide === 'left' ? 0.34 : -0.34;
    }
    return -0.26;
  }, [isBadgePorthole, sectionMode, tourCharacterSide]);

  // Speech bubble text (hidden in Tour unless speechOverride is active, because Tour chapters have their own Tour Note card)
  const activeSpeechText = useMemo(() => {
    if (speechOverride) return speechOverride;
    if (sectionMode === 'hero') {
      return isBatmanMode
        ? OWNER_PROFILE.heroGreetingBatman
        : OWNER_PROFILE.heroGreetingNormal;
    }
    if (sectionMode === 'about') {
      return ABOUT_STORY_PARAGRAPHS[activeAboutIndex]?.bubbleText || '';
    }
    if (sectionMode === 'contact') {
      return isBatmanMode
        ? 'Send the Bat-Signal to avichalgoyal15@gmail.com — I am ready for the next mission.'
        : "Got an ambitious product or website in mind? Click the yellow LEGO brick to copy my email!";
    }
    return null;
  }, [speechOverride, sectionMode, isBatmanMode, activeAboutIndex]);

  return (
    <div
      className={`portfolio-root ${isBatmanMode ? 'theme-batman' : 'theme-studio'}`}
      data-section-mode={sectionMode}
    >
      {/* ====================================================================
          TOP NAVIGATION BAR
         ==================================================================== */}
      <header className="top-navbar" role="banner">
        <div className="top-navbar__inner">
          <div className="top-navbar__brand">
            <a
              href="#hero"
              className="brand-wordmark"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('hero');
              }}
            >
              <span className="brand-wordmark__stud" aria-hidden="true" />
              <span>Avichal.</span>
            </a>
            <span className="brand-status-pill">
              <span className="brand-status-pill__dot" />
              {isBatmanMode ? 'GOTHAM // BATCOMPUTER' : `STUDIO // ${PROJECT_COUNT} PUBLIC BUILDS`}
            </span>
          </div>

          <nav className="top-navbar__links" aria-label="Primary navigation">
            <button type="button" className="nav-link-btn" onClick={() => scrollToSection('about')}>
              About
            </button>
            <button type="button" className="nav-link-btn" onClick={() => scrollToSection('tour')}>
              Guided Tour ({FEATURED_PROJECTS.length})
            </button>
            <button type="button" className="nav-link-btn" onClick={() => scrollToSection('work')}>
              All Work ({PROJECT_COUNT})
            </button>
            <button
              type="button"
              className="nav-link-btn"
              onClick={() => scrollToSection('certifications')}
            >
              Credentials ({CERTIFICATIONS.length})
            </button>
            <button type="button" className="nav-link-btn" onClick={() => scrollToSection('contact')}>
              Contact
            </button>
          </nav>

          <div className="top-navbar__actions">
            <button
              type="button"
              className={`nav-pill-btn ${isBatmanMode ? 'is-active' : ''}`}
              onClick={toggleBatmanMode}
              aria-pressed={isBatmanMode}
              title="Toggle Batman Mode"
              data-testid="nav-batman-toggle"
            >
              <span aria-hidden="true">{isBatmanMode ? '🦇' : '🧱'}</span>
              <span>{isBatmanMode ? 'Batman On' : 'Batman'}</span>
            </button>

            <button
              type="button"
              className={`nav-pill-btn ${soundEnabled ? 'is-active' : ''}`}
              onClick={handleToggleSound}
              aria-pressed={soundEnabled}
              title={soundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
              data-testid="nav-sound-toggle"
            >
              <span aria-hidden="true">{soundEnabled ? '🔊' : '🔇'}</span>
              <span>{soundEnabled ? 'Sound On' : 'Muted'}</span>
            </button>

            <button
              type="button"
              className="lego-brick-btn lego-brick-btn--yellow lego-brick-btn--sm"
              onClick={() => scrollToSection('contact')}
              data-testid="nav-contact-cta"
            >
              Get in touch
            </button>
          </div>
        </div>
      </header>

      {/* ====================================================================
          PERSISTENT 3D MINIFIGURE STAGE & UNIFIED CHARACTER CONTROLS
         ==================================================================== */}
      <aside
        className={`character-dock character-dock--${sectionMode} ${
          sectionMode === 'tour' ? `character-dock--tour-${tourCharacterSide}` : ''
        } ${isBadgePorthole ? 'character-dock--porthole' : ''} ${
          activeProject || activeCertification ? 'is-modal-hidden' : ''
        }`}
        style={{
          '--drag-x': `${dragOffset.x}px`,
          '--drag-y': `${dragOffset.y}px`,
        }}
        aria-label="Interactive 3D LEGO minifigure assistant"
        data-testid="character-dock"
      >
        {/* Speech Bubble — Clamped within viewport & never covers project cards */}
        {!isBadgePorthole && activeSpeechText && (
          <div className="character-speech-bubble" role="status" aria-live="polite">
            <div className="character-speech-bubble__eyebrow">
              <span>{isBatmanMode ? 'BAT-SIGNAL // VOICE' : `AVICHAL // ${activeOutfitObj.label.toUpperCase()}`}</span>
              {speechOverride && (
                <button
                  type="button"
                  className="character-speech-bubble__close"
                  onClick={() => setSpeechOverride(null)}
                  aria-label="Dismiss speech bubble"
                >
                  ×
                </button>
              )}
            </div>
            <p className="character-speech-bubble__text">{activeSpeechText}</p>
          </div>
        )}

        {/* 3D Canvas Container */}
        <div
          className={`character-canvas-shell ${isBadgePorthole ? 'is-porthole' : ''} ${
            isGrabbed ? 'is-grabbing' : ''
          }`}
          onPointerDown={(e) => {
            if (isBadgePorthole) return;
            dragStartRef.current = {
              startX: e.clientX,
              startY: e.clientY,
              origX: dragOffset.x,
              origY: dragOffset.y,
            };
            setIsGrabbed(true);
            soundEngine.grab();
          }}
          title={
            isBadgePorthole
              ? 'Click to perform a trick!'
              : 'Click for a trick or drag to reposition!'
          }
        >
          <Suspense
            fallback={
              <div className="character-fallback" aria-hidden="true">
                🧱
              </div>
            }
          >
            <LegoScene
              outfitId={resolvedOutfitId}
              mood={isBatmanMode ? 'batman' : 'wave'}
              emotion={characterEmotion}
              isReading={sectionMode === 'about'}
              scrollVelocity={scrollVelocityRef}
              trickState={trickState}
              onCharacterClick={() => triggerTrick()}
              isGrabbed={isGrabbed}
              badgeMode={isBadgePorthole}
              facingYaw={facingYaw}
              globalPointerRef={globalPointerRef}
            />
          </Suspense>
        </div>

        {/* Unified Character Control Bar — Single source of controls (no footer duplication) */}
        <div className="character-controls-bar" data-testid="character-controls-bar">
          <button
            type="button"
            className="char-ctrl-pill"
            onClick={() => triggerTrick()}
            data-testid="char-trick-btn"
          >
            <span aria-hidden="true">✨</span>
            <span>Do a trick</span>
          </button>

          <button
            type="button"
            className={`char-ctrl-pill ${wardrobeOpen ? 'is-active' : ''}`}
            onClick={() => {
              soundEngine.click();
              setWardrobeOpen((prev) => !prev);
            }}
            aria-expanded={wardrobeOpen}
            data-testid="char-dress-btn"
          >
            <span aria-hidden="true">👕</span>
            <span>
              {isBadgePorthole ? 'Wardrobe' : `Dress me up (${activeOutfitObj.label})`}
            </span>
          </button>

          {!isBadgePorthole && (
            <button
              type="button"
              className={`char-ctrl-pill ${isBatmanMode ? 'is-active' : ''}`}
              onClick={toggleBatmanMode}
              aria-pressed={isBatmanMode}
              data-testid="char-batman-btn"
            >
              <span aria-hidden="true">🦇</span>
              <span>{isBatmanMode ? 'Gotham' : 'Batman'}</span>
            </button>
          )}
        </div>
      </aside>

      {/* ====================================================================
          VIEWPORT-SAFE WARDROBE & TRICKS POPOVER (NEVER CLIPS TOP/BOTTOM)
         ==================================================================== */}
      {wardrobeOpen && (
        <div
          className="wardrobe-popover-backdrop"
          onClick={() => setWardrobeOpen(false)}
          data-testid="wardrobe-backdrop"
        >
          <div
            className="wardrobe-popover"
            role="dialog"
            aria-label="Character Wardrobe and Tricks"
            onClick={(e) => e.stopPropagation()}
            data-testid="wardrobe-popover"
          >
            <div className="wardrobe-popover__header">
              <div>
                <span className="wardrobe-popover__eyebrow">MINIFIGURE CUSTOMIZER</span>
                <h3 className="wardrobe-popover__title">Dress Me Up & Do a Trick</h3>
              </div>
              <button
                type="button"
                className="wardrobe-popover__close"
                onClick={() => setWardrobeOpen(false)}
                aria-label="Close character menu"
              >
                ×
              </button>
            </div>

            <div className="wardrobe-popover__section">
              <span className="wardrobe-popover__label">SELECT OUTFIT RIG</span>
              <div className="wardrobe-outfit-grid">
                {CHARACTER_OUTFITS.map((outfit) => {
                  const selected = resolvedOutfitId === outfit.id;
                  return (
                    <button
                      key={outfit.id}
                      type="button"
                      className={`wardrobe-outfit-card ${selected ? 'is-selected' : ''}`}
                      onClick={() => selectOutfit(outfit)}
                      data-testid={`outfit-option-${outfit.id}`}
                    >
                      <span
                        className="wardrobe-outfit-swatch"
                        style={{
                          background: outfit.torsoColor,
                          borderColor: outfit.accentColor,
                        }}
                      />
                      <div className="wardrobe-outfit-info">
                        <strong>{outfit.label}</strong>
                        <span>{outfit.badge}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="wardrobe-popover__section">
              <span className="wardrobe-popover__label">TRIGGER PROCEDURAL 3D TRICK</span>
              <div className="wardrobe-trick-row">
                {CHARACTER_TRICKS.map((trick) => (
                  <button
                    key={trick.id}
                    type="button"
                    className="wardrobe-trick-chip"
                    onClick={() => triggerTrick(trick)}
                    data-testid={`trick-option-${trick.id}`}
                  >
                    <span aria-hidden="true">{trick.icon}</span>
                    <span>{trick.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {(dragOffset.x !== 0 || dragOffset.y !== 0) && (
              <div className="wardrobe-popover__footer">
                <button
                  type="button"
                  className="char-ctrl-pill"
                  onClick={() => setDragOffset({ x: 0, y: 0 })}
                >
                  Reset character position
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ====================================================================
          MAIN SCROLLING PAGE CONTENT
         ==================================================================== */}
      <main className="portfolio-main">
        {/* ------------------------------------------------------------------
            1. HERO SECTION (Reference 2: Cream LEGO Baseplate + Batman Brick)
           ------------------------------------------------------------------ */}
        <section id="hero" className="hero-section lego-baseplate-cream">
          <div className="section-container hero-grid">
            <div className="hero-copy">
              <div className="hero-eyebrow-pill">
                <span className="hero-eyebrow-pill__stud" aria-hidden="true" />
                <span>AVICHAL GOYAL // PRODUCT OPS, FULL-STACK & AI SYSTEMS</span>
              </div>

              <h1 className="hero-headline">
                {OWNER_PROFILE.headlineLead}{' '}
                <span className="hero-headline__highlight">{OWNER_PROFILE.headlineAccent}</span>
              </h1>

              <p className="hero-subheadline">
                {OWNER_PROFILE.subheadline}{' '}
                <button
                  type="button"
                  className="lego-inline-batman-brick"
                  onClick={toggleBatmanMode}
                  title="Click to suit up as Batman!"
                  data-testid="hero-batman-brick"
                >
                  <span className="lego-inline-batman-brick__studs" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </span>
                  <span>{OWNER_PROFILE.batmanLabel}</span>
                </button>
              </p>

              <div className="hero-cta-row">
                <button
                  type="button"
                  className="lego-brick-btn lego-brick-btn--yellow"
                  onClick={() => scrollToSection('tour')}
                >
                  <span>Start Guided Tour (05)</span>
                  <span aria-hidden="true">↓</span>
                </button>

                <button
                  type="button"
                  className="lego-brick-btn lego-brick-btn--white"
                  onClick={() => scrollToSection('work')}
                >
                  <span>All {PROJECT_COUNT} Projects</span>
                  <span aria-hidden="true">→</span>
                </button>

                <a
                  href={OWNER_PROFILE.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="lego-brick-btn lego-brick-btn--dark"
                >
                  <span>Resume PDF</span>
                  <span aria-hidden="true">↗</span>
                </a>
              </div>

              <div className="hero-proof-strip">
                <div className="hero-proof-item">
                  <strong>{PROJECT_COUNT}</strong>
                  <span>Verified Public Builds</span>
                </div>
                <div className="hero-proof-item">
                  <strong>05</strong>
                  <span>Interactive Guided Chapters</span>
                </div>
                <div className="hero-proof-item">
                  <strong>08</strong>
                  <span>Industry & Academic Credentials</span>
                </div>
              </div>
            </div>

            {/* Right column spacer reserves room for the interactive 3D minifigure on desktop */}
            <div className="hero-character-slot" aria-hidden="true" />
          </div>
        </section>

        {/* ------------------------------------------------------------------
            2. ABOUT STORY SECTION (Scroll-Illuminated Words)
           ------------------------------------------------------------------ */}
        <section
          id="about"
          ref={aboutSectionRef}
          className="about-section lego-baseplate-warm"
        >
          <div className="section-container about-grid">
            <div className="about-story-col">
              <div className="section-eyebrow">00 // BUILDER STORY & ENGINEERING ETHOS</div>
              <h2 className="section-heading">
                Real storefronts, native apps, and open-source AI tooling.
              </h2>

              <div className="about-paragraphs">
                {ABOUT_STORY_PARAGRAPHS.map((para, pIdx) => {
                  const words = para.text.split(' ');
                  const totalWords = words.length;
                  const rangeStart = pIdx * 0.45;
                  const rangeSpan = 0.45;

                  return (
                    <article key={para.id} className="about-card">
                      <span className="about-card__lead">{para.lead}</span>
                      <p className="about-card__words">
                        {words.map((word, wIdx) => {
                          const threshold = rangeStart + (wIdx / Math.max(totalWords, 1)) * rangeSpan;
                          return (
                            <span
                              key={`${para.id}-${wIdx}`}
                              className="story-word is-lit"
                              data-word-threshold={threshold.toFixed(3)}
                            >
                              {word}{' '}
                            </span>
                          );
                        })}
                      </p>
                    </article>
                  );
                })}
              </div>
            </div>

            <div className="about-character-slot" aria-hidden="true" />
          </div>
        </section>

        {/* ------------------------------------------------------------------
            3. FEATURED CASE STUDIES — 5 GUIDED TOUR CHAPTERS (Ref 1 & Ref 3)
           ------------------------------------------------------------------ */}
        <section id="tour" className="tour-wrapper" aria-label="Featured Case Studies Guided Tour">
          {FEATURED_PROJECTS.map((project) => {
            const activeSlideIdx = tourSlides[project.slug] || 0;
            const slides = project.slides || [];
            const currentSlide = slides[activeSlideIdx] || slides[0];
            const isCharLeft = project.characterSide === 'left';

            return (
              <article
                key={project.slug}
                id={`tour-${project.slug}`}
                ref={(el) => {
                  tourSectionRefs.current[project.slug] = el;
                }}
                className={`tour-chapter ${
                  isCharLeft ? 'tour-chapter--char-left' : 'tour-chapter--char-right'
                }`}
                style={{
                  '--chapter-bg': project.stageBg,
                  '--chapter-accent': project.accentColor,
                }}
                data-testid={`tour-chapter-${project.slug}`}
              >
                <div className="section-container tour-chapter__grid">
                  {/* Character + Tour Note Column */}
                  <div className="tour-chapter__narrator-col">
                    <div className="tour-note-card">
                      <div className="tour-note-card__eyebrow">
                        <span>{currentSlide.step} // TOUR NOTE</span>
                        <span className="tour-note-card__cat">{project.category}</span>
                      </div>
                      <h2 className="tour-note-card__project">{project.title}</h2>
                      <p className="tour-note-card__text">{currentSlide.tourNote}</p>

                      <div className="tour-note-card__metrics">
                        {(project.metrics || []).slice(0, 2).map((m) => (
                          <div key={m.label} className="tour-mini-metric">
                            <span>{m.label}</span>
                            <strong>{m.value}</strong>
                          </div>
                        ))}
                      </div>

                      <div className="tour-note-card__actions">
                        <button
                          type="button"
                          className="lego-brick-btn lego-brick-btn--yellow"
                          onClick={(e) =>
                            openProjectCaseStudy(
                              project,
                              e.currentTarget.closest('.tour-chapter')?.querySelector('.tour-device-stage')
                            )
                          }
                          data-testid={`tour-view-project-${project.slug}`}
                        >
                          <span>View project</span>
                          <span aria-hidden="true">→</span>
                        </button>

                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="lego-brick-btn lego-brick-btn--white"
                            data-testid={`tour-live-link-${project.slug}`}
                          >
                            <span>{project.liveLabel}</span>
                            <span aria-hidden="true">↗</span>
                          </a>
                        )}

                        {!project.liveUrl && project.repoUrl && (
                          <a
                            href={project.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="lego-brick-btn lego-brick-btn--dark"
                            data-testid={`tour-repo-link-${project.slug}`}
                          >
                            <span>{project.repoLabel || 'View GitHub Repo'}</span>
                            <span aria-hidden="true">↗</span>
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Reserved slot below Tour Note where the 3D minifigure stands */}
                    <div className="tour-minifig-stage-spacer" aria-hidden="true" />
                  </div>

                  {/* Device Showcase Column (Browser + Phone + Slide Keycaps 1 2 3) */}
                  <div className="tour-chapter__showcase-col">
                    <div className="tour-showcase-header">
                      <div className="tour-showcase-header__meta">
                        <span className="tour-chapter-badge">CHAPTER {project.tourNumber}</span>
                        <h3 className="tour-showcase-header__title">{currentSlide.title}</h3>
                      </div>

                      <div
                        className="tour-keycaps"
                        role="tablist"
                        aria-label={`${project.title} tour slides`}
                      >
                        {slides.map((slide, sIdx) => (
                          <button
                            key={slide.step}
                            type="button"
                            role="tab"
                            aria-selected={sIdx === activeSlideIdx}
                            className={`tour-keycap-btn ${
                              sIdx === activeSlideIdx ? 'is-active' : ''
                            }`}
                            onClick={() => {
                              soundEngine.click();
                              setTourSlides((prev) => ({ ...prev, [project.slug]: sIdx }));
                            }}
                            data-testid={`tour-keycap-${project.slug}-${sIdx + 1}`}
                          >
                            {sIdx + 1}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div
                      className={`tour-device-stage ${
                        currentSlide.mobileImage ? 'has-mobile' : 'desktop-only'
                      }`}
                      onClick={(e) => openProjectCaseStudy(project, e.currentTarget)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          openProjectCaseStudy(project, e.currentTarget);
                        }
                      }}
                      aria-label={`Open ${project.title} full case study`}
                    >
                      {/* Browser Window Mockup */}
                      <div className="tour-browser-frame">
                        <div className="tour-browser-frame__chrome">
                          <div className="tour-browser-frame__dots" aria-hidden="true">
                            <span className="dot dot--red" />
                            <span className="dot dot--yellow" />
                            <span className="dot dot--green" />
                          </div>
                          <div className="tour-browser-frame__address">
                            {project.liveUrl || project.repoUrl}
                          </div>
                          <span className="tour-browser-frame__expand">Expand Case Study ⤢</span>
                        </div>
                        <div className="tour-browser-frame__screen">
                          <img
                            src={currentSlide.desktopImage}
                            alt={`${project.title} — ${currentSlide.title}`}
                            loading="lazy"
                          />
                        </div>
                      </div>

                      {/* Overlapping Mobile Phone Mockup */}
                      {currentSlide.mobileImage && (
                        <div className="tour-phone-frame">
                          <div className="tour-phone-frame__notch" aria-hidden="true" />
                          <div className="tour-phone-frame__screen">
                            <img
                              src={currentSlide.mobileImage}
                              alt={`${project.title} mobile view`}
                              loading="lazy"
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    <p className="tour-slide-caption">{currentSlide.caption}</p>

                    {/* Phoney Quick Tray · 6 Default Audio Emojis (Reference 3) */}
                    {project.hasAudioEmojiTray && (
                      <div
                        className="phoney-tray"
                        data-testid="phoney-audio-tray"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="phoney-tray__header">
                          <span className="phoney-tray__title">
                            PHONEY QUICK TRAY · 6 DEFAULT AUDIO EMOJIS
                          </span>
                          <span className="phoney-tray__hint">Click any reaction to play</span>
                        </div>
                        <div className="phoney-tray__buttons">
                          {PHONEY_AUDIO_EMOJIS.map((item) => (
                            <button
                              key={item.id}
                              type="button"
                              className={`phoney-emoji-btn ${
                                activeAudioEmoji === item.id ? 'is-playing' : ''
                              }`}
                              onClick={() => handlePlayAudioEmoji(item)}
                              data-testid={`phoney-emoji-${item.id}`}
                            >
                              <span className="phoney-emoji-btn__icon" aria-hidden="true">
                                {item.emoji}
                              </span>
                              <span className="phoney-emoji-btn__label">{item.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </section>

        {/* ------------------------------------------------------------------
            4. ALL WORK BENTO GRID — 10 CURATED PROJECTS (Reference 5)
           ------------------------------------------------------------------ */}
        <section id="work" className="work-section lego-baseplate-cream">
          <div className="section-container">
            <div className="work-header">
              <div>
                <span className="section-eyebrow">
                  ALL WORK // {PROJECT_COUNT} VERIFIED PUBLIC PROJECTS
                </span>
                <h2 className="section-heading">
                  Selected Products, Storefronts & Open-Source Systems
                </h2>
                <p className="section-subheading">
                  {isBatmanMode
                    ? OWNER_PROFILE.bentoTooltipBatman
                    : OWNER_PROFILE.bentoTooltipNormal}
                </p>
              </div>

              <div className="work-filters" role="tablist" aria-label="Filter projects">
                {[
                  { id: 'all', label: `All (${PROJECT_COUNT})` },
                  { id: 'featured', label: `Featured (${FEATURED_PROJECTS.length})` },
                  { id: 'commerce', label: 'Commerce & Web (5)' },
                  { id: 'ai-oss', label: 'AI & Open Source (3)' },
                  { id: 'android-bi', label: 'Android & BI (2)' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={workFilter === tab.id}
                    className={`work-filter-pill ${workFilter === tab.id ? 'is-active' : ''}`}
                    onClick={() => {
                      soundEngine.click();
                      setWorkFilter(tab.id);
                    }}
                    data-testid={`work-filter-${tab.id}`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="bento-grid" data-testid="bento-projects-grid">
              {filteredProjects.map((project) => (
                <article
                  key={project.slug}
                  ref={(el) => {
                    workCardRefs.current[project.slug] = el;
                  }}
                  className={`bento-card ${project.featured ? 'bento-card--featured' : ''}`}
                  style={{ '--card-tint': project.themeTint, '--card-accent': project.accentColor }}
                  onClick={(e) => openProjectCaseStudy(project, e.currentTarget)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      openProjectCaseStudy(project, e.currentTarget);
                    }
                  }}
                  aria-label={`${project.title} — ${project.category}. Click to open full case study.`}
                  data-testid={`bento-card-${project.slug}`}
                  data-project-code={project.code}
                >
                  {/* Top Visual Preview Block */}
                  <div className="bento-card__media">
                    <div className="bento-card__badges">
                      <span className="bento-badge bento-badge--code">#{project.code}</span>
                      <span className="bento-badge bento-badge--cat">{project.category}</span>
                    </div>
                    <img
                      src={project.preview}
                      alt={`${project.title} preview`}
                      className="bento-card__img"
                      loading="lazy"
                    />
                  </div>

                  {/* Bottom Metadata & Action Block */}
                  <div className="bento-card__body">
                    <div className="bento-card__meta-row">
                      <span className="bento-card__year">{project.year}</span>
                      <span className="bento-card__status">{project.status}</span>
                    </div>

                    <h3 className="bento-card__title">{project.title}</h3>
                    <p className="bento-card__tagline">{project.tagline}</p>

                    <div className="bento-card__tags">
                      {(project.stack || []).slice(0, 4).map((tag) => (
                        <span key={tag} className="bento-tag">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="bento-card__footer">
                      <span className="bento-card__cta">
                        <span>View case study</span>
                        <span aria-hidden="true">→</span>
                      </span>

                      <div
                        className="bento-card__ext-links"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bento-ext-link"
                            title={project.liveLabel || 'Visit live site'}
                          >
                            Live ↗
                          </a>
                        )}
                        {project.repoUrl && (
                          <a
                            href={project.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bento-ext-link"
                            title="View GitHub repository"
                          >
                            GitHub ↗
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------
            5. CERTIFICATIONS & CREDENTIALS SECTION
           ------------------------------------------------------------------ */}
        <section id="certifications" className="certs-section lego-baseplate-warm">
          <div className="section-container">
            <div className="certs-header">
              <span className="section-eyebrow">
                CREDENTIALS // {CERTIFICATIONS.length} VERIFIED CERTIFICATES & SIMULATIONS
              </span>
              <h2 className="section-heading">Academic & Industry Specializations</h2>
              <p className="section-subheading">
                Click any credential card to inspect the full certificate and skill breakdown.
              </p>
            </div>

            <div className="certs-grid" data-testid="certifications-grid">
              {CERTIFICATIONS.map((cert) => (
                <article
                  key={cert.id}
                  className="cert-card"
                  onClick={() => openCertificationModal(cert)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      openCertificationModal(cert);
                    }
                  }}
                  data-testid={`cert-card-${cert.slug}`}
                >
                  <div className="cert-card__preview">
                    <img src={cert.preview} alt={cert.title} loading="lazy" />
                  </div>
                  <div className="cert-card__body">
                    <span className="cert-card__issuer">{cert.issuer}</span>
                    <h3 className="cert-card__title">{cert.title}</h3>
                    <p className="cert-card__summary">{cert.summary}</p>
                    <div className="cert-card__footer">
                      <span className="cert-card__date">{cert.date}</span>
                      <span className="cert-card__inspect">Inspect credential →</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------
            6. CONTACT SECTION & FOOTER (Reference 4: Matte Black Baseplate)
           ------------------------------------------------------------------ */}
        <footer id="contact" className="contact-footer lego-baseplate-black" data-testid="contact-section">
          <div className="section-container contact-footer__inner">
            <div className="contact-footer__top-row">
              <span className="contact-eyebrow">
                06 // DIRECT DISPATCH · {OWNER_PROFILE.location.toUpperCase()}
              </span>
              <button
                type="button"
                className="back-to-top-btn"
                onClick={() => scrollToSection('hero')}
                data-testid="back-to-top-btn"
              >
                ↑ Back to top
              </button>
            </div>

            <div className="contact-footer__grid">
              <div className="contact-footer__left">
                <h2 className="contact-headline">Got a project?</h2>
                <p className="contact-availability">{OWNER_PROFILE.availability}</p>

                {/* Giant Tactile 3D Yellow LEGO Brick Email Button */}
                <div className="contact-email-brick-wrap">
                  <button
                    type="button"
                    className={`contact-email-brick ${emailCopied ? 'is-copied' : ''}`}
                    onClick={handleCopyEmail}
                    data-testid="contact-email-brick"
                  >
                    <span className="contact-email-brick__studs" aria-hidden="true">
                      <i />
                      <i />
                      <i />
                      <i />
                      <i />
                    </span>
                    <span className="contact-email-brick__text">{OWNER_PROFILE.email}</span>
                    <span className="contact-email-brick__badge">
                      {emailCopied ? 'Copied to clipboard! ✓' : 'Click to copy email'}
                    </span>
                  </button>
                </div>

                {/* External & Direct Contact Action Buttons */}
                <div className="contact-actions-row">
                  <a
                    href={OWNER_PROFILE.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-action-pill"
                    data-testid="contact-github-link"
                  >
                    <span>GitHub (avichal15)</span>
                    <span aria-hidden="true">↗</span>
                  </a>

                  <a
                    href={OWNER_PROFILE.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-action-pill"
                    data-testid="contact-linkedin-link"
                  >
                    <span>LinkedIn (avichalgoyal007)</span>
                    <span aria-hidden="true">↗</span>
                  </a>

                  <a
                    href={`mailto:${OWNER_PROFILE.email}`}
                    className="contact-action-pill"
                    data-testid="contact-mailto-link"
                  >
                    <span>Send Email</span>
                    <span aria-hidden="true">↗</span>
                  </a>

                  <a
                    href={OWNER_PROFILE.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-action-pill"
                    data-testid="contact-resume-link"
                  >
                    <span>Resume PDF</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                </div>

                <div className="contact-legal-row">
                  <span>
                    © {new Date().getFullYear()} {OWNER_PROFILE.name}. Crafted with React, Three.js
                    & tactile LEGO engineering.
                  </span>
                </div>
              </div>

              {/* Right column slot where the persistent 3D minifigure stands in Contact mode */}
              <div className="contact-character-slot" aria-hidden="true" />
            </div>
          </div>
        </footer>
      </main>

      {/* ====================================================================
          FULL-PAGE SHARED-ELEMENT PROJECT CASE STUDY & CERTIFICATION MODALS
         ==================================================================== */}
      {activeProject && (
        <ProjectCaseStudyModal
          key={activeProject.slug}
          project={activeProject}
          originRect={originRect}
          onClose={closeModal}
          onSelectProject={(nextProj) => openProjectCaseStudy(nextProj, null)}
          onPlayAudioEmoji={handlePlayAudioEmoji}
          activeAudioEmoji={activeAudioEmoji}
          reducedMotion={reducedMotion}
        />
      )}

      {activeCertification && (
        <CertificationModal
          certification={activeCertification}
          onClose={closeModal}
        />
      )}
    </div>
  );
}
