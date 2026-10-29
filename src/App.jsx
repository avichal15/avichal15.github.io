import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ALL_PROJECTS,
  ALL_WORK_BY_SLUG,
  CERTIFICATIONS,
  CERTIFICATIONS_BY_SLUG,
  HERO_IDLE_QUIPS,
  MASCOT_TRICKS,
  OUTFITS,
  OWNER_PROFILE,
  PHONEY_AUDIO_EMOJIS,
  TOUR_CHAPTERS,
  getAdjacentProjects,
} from './data/portfolioData';
import LegoScene from './three/LegoScene';
import { soundEngine } from './utils/soundEngine';

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

export default function App() {
  // -------------------------------------------------------------------------
  // CORE APP STATE
  // -------------------------------------------------------------------------
  const [batmanMode, setBatmanMode] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTrick, setActiveTrick] = useState(null);
  const [manualOutfit] = useState('classic');
  const [playingEmojiId, setPlayingEmojiId] = useState(null);

  // Active in-site Case Study Window: { type: 'project' | 'cert', slug: string } | null
  const [activeModal, setActiveModal] = useState(null);
  const [activeModalSlideIdx, setActiveModalSlideIdx] = useState(0);

  // Guided tour active step per chapter: { [chapterId]: 0 | 1 | 2 }
  const [chapterSteps, setChapterSteps] = useState(() =>
    Object.fromEntries(TOUR_CHAPTERS.map((ch) => [ch.id, 0]))
  );

  // Scroll illumination progress
  const [aboutWordProgress, setAboutWordProgress] = useState(0);
  const [bubbleProgressMap, setBubbleProgressMap] = useState({});

  // Mascot speech & stage state
  const [speechText, setSpeechText] = useState(HERO_IDLE_QUIPS[0]);
  const [speechLitRatio, setSpeechLitRatio] = useState(1);
  const [speechVisible, setSpeechVisible] = useState(true);
  const [stageState, setStageState] = useState({
    sectionMode: 'hero',
    activeChapterId: null,
    mascotSide: 'right',
    isBadge: false,
    scrollOutfit: 'classic',
    facingYaw: -0.28,
    pointSide: 0,
    gesture: null,
    mood: 'happy',
  });

  // -------------------------------------------------------------------------
  // REFS FOR 60FPS PHYSICS, DRAG, AND SCROLL CHOREOGRAPHY
  // -------------------------------------------------------------------------
  const mascotAnchorRef = useRef(null);
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const workRef = useRef(null);
  const certsRef = useRef(null);
  const footerRef = useRef(null);
  const chapterRefs = useRef({});
  const bubbleRefs = useRef({});
  const modalScrollRef = useRef(null);

  const globalPointerRef = useRef({ x: 0, y: 0 });
  const scrollVelocityRef = useRef(0);
  const lastScrollYRef = useRef(typeof window !== 'undefined' ? window.scrollY : 0);
  const lastScrollTimeRef = useRef(0);
  const lastBlipIndexRef = useRef(-1);
  const customSpeechUntilRef = useRef(0);
  const tickleCounterRef = useRef(0);
  const lastTickleTimeRef = useRef(0);
  const lastMascotTapRef = useRef(0);

  // Mascot position physics (viewport pixel coordinates)
  const posRef = useRef({
    x: typeof window !== 'undefined' ? window.innerWidth * 0.72 : 920,
    y: typeof window !== 'undefined' ? window.innerHeight * 0.56 : 480,
    vx: 0,
    vy: 0,
    targetX: typeof window !== 'undefined' ? window.innerWidth * 0.72 : 920,
    targetY: typeof window !== 'undefined' ? window.innerHeight * 0.56 : 480,
    isDragging: false,
    dragOffsetX: 0,
    dragOffsetY: 0,
    hasCustomDropPos: false,
    customX: 0,
    customY: 0,
  });

  const [isDraggingState, setIsDraggingState] = useState(false);
  const [isSleeping, setIsSleeping] = useState(false);
  const lastActivityRef = useRef(0);

  // -------------------------------------------------------------------------
  // COMPUTED OUTFIT
  // -------------------------------------------------------------------------
  const activeOutfitId = useMemo(() => {
    if (batmanMode) return 'gotham';
    if (
      stageState.sectionMode === 'tour' &&
      stageState.scrollOutfit &&
      stageState.scrollOutfit !== 'classic'
    ) {
      return stageState.scrollOutfit;
    }
    return manualOutfit || 'classic';
  }, [batmanMode, stageState.sectionMode, stageState.scrollOutfit, manualOutfit]);

  // -------------------------------------------------------------------------
  // HELPER: SPEAK TEMPORARY LINE WITH OPTIONAL SOUND BLIPS
  // -------------------------------------------------------------------------
  const sayTemporarily = useCallback((text, durationMs = 4200, mood = 'happy') => {
    customSpeechUntilRef.current = performance.now() + durationMs;
    setSpeechText(text);
    setSpeechLitRatio(1);
    setSpeechVisible(true);
    setStageState((prev) => ({ ...prev, mood }));
    soundEngine.blip();
  }, []);

  // -------------------------------------------------------------------------
  // TOGGLE SOUND ENGINE
  // -------------------------------------------------------------------------
  const handleToggleSound = useCallback(() => {
    const nextState = soundEngine.toggle();
    setSoundEnabled(nextState);
    if (nextState) {
      sayTemporarily('🔊 Sound effects enabled! Try Phoney’s Audio Emojis or my tricks.', 3400);
    }
  }, [sayTemporarily]);

  // -------------------------------------------------------------------------
  // TOGGLE BATMAN NOCTURNAL MODE
  // -------------------------------------------------------------------------
  const toggleBatmanMode = useCallback(() => {
    setBatmanMode((prev) => {
      const next = !prev;
      document.body.classList.toggle('batman-mode', next);
      soundEngine.playTrickSound('superhero');
      if (next) {
        sayTemporarily(
          "🦇 I'm Batman. Gotham nocturnal mode activated — cape and cowl locked in.",
          4500,
          'surprised'
        );
      } else {
        sayTemporarily('☀️ Back to daylight builder mode!', 3200, 'happy');
      }
      return next;
    });
  }, [sayTemporarily]);

  // -------------------------------------------------------------------------
  // TRIGGER CHARACTER TRICK
  // -------------------------------------------------------------------------
  const triggerTrick = useCallback(
    (trickId) => {
      setActiveTrick(trickId);
      setMenuOpen(false);
      soundEngine.playTrickSound(trickId);

      const trickQuips = {
        dance: '🕺 Watch the footwork! 60fps procedural groove.',
        backflip: '🤸‍♂️ Alley-oop! Clean 360° backflip.',
        spin: '🌪️ Spinning into production at full velocity!',
        superhero: '🦸‍♂️ Superhero landing! Hard on the plastic knees.',
        panic: '😱 PROD IS DOWN! Just kidding, all checks are green.',
        fly: '🚀 Taking off! Zero-gravity minifigure flight mode.',
        vanish: '🫥 Going incognito... and back!',
        hiccup: '🫢 *Hic!* Excuse me, too much espresso.',
        peekaboo: '🙈 Peekaboo! You found me.',
        selfie: '📸 Say cheese! Capturing the good angle.',
        dizzy: '😵‍💫 Whoa... the room is spinning.',
        sneeze: '🤧 ACHOO! Pardon the plastic dust.',
        sulk: '😤 Hmph. Nobody clicked my favorite project yet.',
      };

      sayTemporarily(trickQuips[trickId] || `✨ Performing ${trickId}!`, 2800);
      const timer = setTimeout(() => {
        setActiveTrick((curr) => (curr === trickId ? null : curr));
      }, 2400);
      return () => clearTimeout(timer);
    },
    [sayTemporarily]
  );

  // -------------------------------------------------------------------------
  // PLAY PHONEY AUDIO EMOJI
  // -------------------------------------------------------------------------
  const handlePlayPhoneyEmoji = useCallback(
    (emojiItem, e) => {
      if (e) e.stopPropagation();
      if (!soundEngine.enabled) {
        soundEngine.setEnabled(true);
        setSoundEnabled(true);
      }
      setPlayingEmojiId(emojiItem.id);
      soundEngine.playPhoneyEmoji(emojiItem.id);
      sayTemporarily(emojiItem.quip, 3600, 'happy');
      setStageState((prev) => ({ ...prev, gesture: 'cheer' }));

      setTimeout(() => {
        setPlayingEmojiId((curr) => (curr === emojiItem.id ? null : curr));
        setStageState((prev) => ({
          ...prev,
          gesture: prev.gesture === 'cheer' ? null : prev.gesture,
        }));
      }, 1100);
    },
    [sayTemporarily]
  );

  // -------------------------------------------------------------------------
  // OPEN / CLOSE IN-SITE CASE STUDY WINDOW
  // -------------------------------------------------------------------------
  const openProjectWindow = useCallback((slug) => {
    const project = ALL_WORK_BY_SLUG[slug];
    if (!project) return;
    soundEngine.whoosh();
    setActiveModal({ type: 'project', slug });
    setActiveModalSlideIdx(0);
    setMenuOpen(false);
    const firstComment =
      project.characterComments?.[0] ||
      `Welcome inside ${project.title}! Scroll through the full case study and slides.`;
    customSpeechUntilRef.current = performance.now() + 8000;
    setSpeechText(firstComment);
    setSpeechLitRatio(1);
    setSpeechVisible(true);
  }, []);

  const openCertWindow = useCallback((slug) => {
    const cert = CERTIFICATIONS_BY_SLUG[slug];
    if (!cert) return;
    soundEngine.whoosh();
    setActiveModal({ type: 'cert', slug });
    setActiveModalSlideIdx(0);
    setMenuOpen(false);
    customSpeechUntilRef.current = performance.now() + 7000;
    setSpeechText(`🎓 Verified Credential: ${cert.title} issued by ${cert.issuer}.`);
    setSpeechLitRatio(1);
    setSpeechVisible(true);
  }, []);

  const closeWindow = useCallback(() => {
    soundEngine.whoosh();
    setActiveModal(null);
  }, []);

  // Lock body scroll & handle Escape when Case Study Window is open
  useEffect(() => {
    if (!activeModal) {
      document.body.style.overflow = '';
      return;
    }
    document.body.style.overflow = 'hidden';
    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeWindow();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [activeModal, closeWindow]);

  // -------------------------------------------------------------------------
  // GLOBAL POINTER TRACKING & SLEEP TIMER
  // -------------------------------------------------------------------------
  useEffect(() => {
    lastScrollTimeRef.current = performance.now();
    lastActivityRef.current = performance.now();

    const onPointerMove = (e) => {
      globalPointerRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      globalPointerRef.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
      lastActivityRef.current = performance.now();
      if (isSleeping) {
        setIsSleeping(false);
        soundEngine.wake();
      }

      if (posRef.current.isDragging) {
        const nextX = clamp(e.clientX - posRef.current.dragOffsetX, 80, window.innerWidth - 80);
        const nextY = clamp(e.clientY - posRef.current.dragOffsetY, 110, window.innerHeight - 90);
        posRef.current.vx = nextX - posRef.current.x;
        posRef.current.vy = nextY - posRef.current.y;
        posRef.current.x = nextX;
        posRef.current.y = nextY;
        posRef.current.customX = nextX;
        posRef.current.customY = nextY;
      }
    };

    const onPointerUp = () => {
      if (posRef.current.isDragging) {
        posRef.current.isDragging = false;
        posRef.current.hasCustomDropPos = true;
        setIsDraggingState(false);
        soundEngine.drop();
        sayTemporarily('😮‍💨 Phew! Solid landing. Double-click me if you want a trick!', 3600);
      }
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerup', onPointerUp);
    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, [isSleeping, sayTemporarily]);

  // Periodic idle quip / sleep check
  useEffect(() => {
    let quipIndex = 0;
    const interval = setInterval(() => {
      const now = performance.now();
      if (now - lastActivityRef.current > 28000 && !posRef.current.isDragging && !activeModal) {
        if (!isSleeping) {
          setIsSleeping(true);
          soundEngine.sleep();
          setSpeechText('💤 Zzz... move your cursor or scroll to wake me up.');
        }
        return;
      }
      if (
        stageState.sectionMode === 'hero' &&
        !activeModal &&
        now > customSpeechUntilRef.current
      ) {
        quipIndex = (quipIndex + 1) % HERO_IDLE_QUIPS.length;
        setSpeechText(HERO_IDLE_QUIPS[quipIndex]);
        setSpeechLitRatio(1);
      }
    }, 6500);
    return () => clearInterval(interval);
  }, [stageState.sectionMode, activeModal, isSleeping]);

  // -------------------------------------------------------------------------
  // SCROLL CHOREOGRAPHY: SECTION DETECTION, WORD LIGHTING, CHAPTER STEPS
  // -------------------------------------------------------------------------
  useEffect(() => {
    const evaluateScroll = () => {
      const now = performance.now();
      const scrollY = window.scrollY;
      const dt = Math.max(16, now - lastScrollTimeRef.current);
      const dy = scrollY - lastScrollYRef.current;
      scrollVelocityRef.current = clamp((dy / dt) * 18, -32, 32);
      lastScrollYRef.current = scrollY;
      lastScrollTimeRef.current = now;
      lastActivityRef.current = now;

      if (Math.abs(dy) > 25 && posRef.current.hasCustomDropPos) {
        posRef.current.hasCustomDropPos = false;
      }

      const vh = window.innerHeight;
      const vw = window.innerWidth;
      const isMobile = vw <= 1024;
      const characterTop = isMobile
        ? posRef.current.y - 115
        : Math.min(posRef.current.y - 140, vh * 0.62);

      // 1. ABOUT WORD-BY-WORD SCROLL ILLUMINATION (Strict: only after scrolling above character)
      if (aboutRef.current) {
        const textEl = aboutRef.current.querySelector('.about__text') || aboutRef.current;
        const rect = textEl.getBoundingClientRect();
        let p = 0;
        if (rect.bottom <= characterTop) {
          const totalRange = Math.max(120, characterTop - Math.max(96, rect.height * 0.45));
          const traveled = characterTop - rect.bottom;
          p = clamp(traveled / totalRange, 0, 1);
        }
        setAboutWordProgress(p);

        const wordCount = OWNER_PROFILE.aboutText.split(/\s+/).length;
        const currentWordIdx = Math.floor(p * wordCount);
        if (p > 0.03 && p < 0.98 && currentWordIdx !== lastBlipIndexRef.current) {
          lastBlipIndexRef.current = currentWordIdx;
          soundEngine.blip();
        }
      }

      // 2. EVALUATE GUIDED TOUR CHAPTERS & BUBBLES
      let detectedChapter = null;
      let detectedChapterStep = 0;
      const nextBubbleProgress = {};
      const nextChapterSteps = {};

      TOUR_CHAPTERS.forEach((ch) => {
        const el = chapterRefs.current[ch.id];
        if (!el) return;
        const rect = el.getBoundingClientRect();

        if (rect.top < vh * 0.55 && rect.bottom > vh * 0.35) {
          detectedChapter = ch;
        }

        let activeStepForChapter = 0;
        ch.bubbles.forEach((_, idx) => {
          const bKey = `${ch.id}-${idx}`;
          const bEl = bubbleRefs.current[bKey];
          if (!bEl) return;
          const bRect = bEl.getBoundingClientRect();
          const bCenter = bRect.top + bRect.height * 0.5;

          let bp = 0;
          if (bRect.bottom <= characterTop) {
            const totalTravel = Math.max(100, characterTop - Math.max(88, bRect.height * 0.5));
            const traveled = characterTop - bRect.bottom;
            bp = clamp(traveled / totalTravel, 0, 1);
          }
          nextBubbleProgress[bKey] = bp;

          if (bCenter < vh * 0.72) {
            activeStepForChapter = idx;
          }
        });

        nextChapterSteps[ch.id] = activeStepForChapter;
        if (detectedChapter && detectedChapter.id === ch.id) {
          detectedChapterStep = activeStepForChapter;
        }
      });

      setBubbleProgressMap(nextBubbleProgress);
      setChapterSteps((prev) => {
        let changed = false;
        for (const k of Object.keys(nextChapterSteps)) {
          if (prev[k] !== nextChapterSteps[k]) {
            changed = true;
            break;
          }
        }
        return changed ? nextChapterSteps : prev;
      });

      // 3. DETERMINE ACTIVE SECTION, BACKGROUND TINT & MASCOT TARGET POSE
      const aboutRect = aboutRef.current?.getBoundingClientRect();
      const workRect = workRef.current?.getBoundingClientRect();
      const certsRect = certsRef.current?.getBoundingClientRect();
      const footerRect = footerRef.current?.getBoundingClientRect();

      let nextSectionMode = 'hero';
      let nextBg = batmanMode ? '#0B0F19' : '#F6F2E9';
      let nextMascotSide = 'right';
      let nextOutfit = 'classic';
      let nextFacingYaw = -0.28;
      let nextPointSide = 0;
      let nextIsBadge = false;

      if (footerRect && footerRect.top < vh * 0.58) {
        nextSectionMode = 'footer';
        nextBg = '#0B0B0C';
        nextMascotSide = 'right';
        nextOutfit = batmanMode ? 'gotham' : 'classic';
        nextFacingYaw = -0.35;
        if (now > customSpeechUntilRef.current) {
          setSpeechText("Want to build something together? Click my email below and let's talk!");
          setSpeechVisible(true);
        }
      } else if (certsRect && certsRect.top < vh * 0.55 && certsRect.bottom > vh * 0.25) {
        nextSectionMode = 'certs';
        nextBg = batmanMode ? '#0D1322' : '#EFECE2';
        nextIsBadge = true;
        nextOutfit = batmanMode ? 'gotham' : 'classic';
        nextFacingYaw = 0.24;
        if (now > customSpeechUntilRef.current) {
          setSpeechText(
            'Verified credentials in Java DSA, Full-Stack MERN, Business Intelligence, R Programming & Google Developer Program.'
          );
          setSpeechVisible(true);
        }
      } else if (workRect && workRect.top < vh * 0.55 && workRect.bottom > vh * 0.2) {
        nextSectionMode = 'work';
        nextBg = batmanMode ? '#0E1525' : '#F1F1EC';
        nextIsBadge = true;
        nextOutfit = batmanMode ? 'gotham' : 'classic';
        nextFacingYaw = 0.25;
        if (now > customSpeechUntilRef.current) {
          setSpeechText(
            'Here are all 18 projects! Click any card to open its full case study window.'
          );
          setSpeechVisible(true);
        }
      } else if (detectedChapter) {
        nextSectionMode = 'tour';
        nextBg = batmanMode ? detectedChapter.bgDark : detectedChapter.bgLight;
        nextMascotSide = detectedChapter.mascotSide;
        nextOutfit = batmanMode ? 'gotham' : detectedChapter.outfit;
        nextFacingYaw = detectedChapter.mascotSide === 'left' ? 0.36 : -0.36;
        nextPointSide = detectedChapter.mascotSide === 'left' ? 1 : -1;

        if (now > customSpeechUntilRef.current) {
          const line =
            detectedChapter.bubbles[detectedChapterStep] || detectedChapter.bubbles[0];
          setSpeechText(line);
          setSpeechVisible(false);
        }
      } else if (aboutRect && aboutRect.top < vh * 0.58 && aboutRect.bottom > vh * 0.25) {
        nextSectionMode = 'about';
        nextBg = batmanMode ? '#0E1626' : '#F3EFE4';
        nextMascotSide = 'left';
        nextOutfit = batmanMode ? 'gotham' : 'classic';
        nextFacingYaw = 0.32;
        if (now > customSpeechUntilRef.current) {
          setSpeechText('Keep scrolling — I’ll walk you through 5 of my favorite builds!');
          setSpeechVisible(true);
        }
      } else {
        nextSectionMode = 'hero';
        nextBg = batmanMode ? '#0B0F19' : '#F6F2E9';
        nextMascotSide = 'right';
        nextOutfit = batmanMode ? 'gotham' : 'classic';
        nextFacingYaw = -0.28;
        if (now > customSpeechUntilRef.current) {
          setSpeechVisible(true);
        }
      }

      document.documentElement.style.setProperty('--bg-active', nextBg);

      setStageState((prev) => {
        if (
          prev.sectionMode === nextSectionMode &&
          prev.activeChapterId === (detectedChapter?.id || null) &&
          prev.mascotSide === nextMascotSide &&
          prev.isBadge === nextIsBadge &&
          prev.scrollOutfit === nextOutfit &&
          prev.facingYaw === nextFacingYaw &&
          prev.pointSide === nextPointSide
        ) {
          return prev;
        }
        return {
          ...prev,
          sectionMode: nextSectionMode,
          activeChapterId: detectedChapter?.id || null,
          mascotSide: nextMascotSide,
          isBadge: nextIsBadge,
          scrollOutfit: nextOutfit,
          facingYaw: nextFacingYaw,
          pointSide: nextPointSide,
        };
      });
    };

    evaluateScroll();
    window.addEventListener('scroll', evaluateScroll, { passive: true });
    window.addEventListener('resize', evaluateScroll);
    return () => {
      window.removeEventListener('scroll', evaluateScroll);
      window.removeEventListener('resize', evaluateScroll);
    };
  }, [batmanMode]);

  // -------------------------------------------------------------------------
  // 60FPS MASCOT POSITION INTERPOLATION LOOP
  // -------------------------------------------------------------------------
  useEffect(() => {
    let rafId;
    const tick = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const isMobile = vw < 900;
      const p = posRef.current;

      const isBadgeNow = Boolean(activeModal) || stageState.isBadge;
      if (isBadgeNow) {
        p.targetX = isMobile ? 68 : 96;
        p.targetY = isMobile ? vh - 72 : vh - 96;
      } else if (p.hasCustomDropPos) {
        p.targetX = clamp(p.customX, 80, vw - 80);
        p.targetY = clamp(p.customY, 110, vh - 90);
      } else if (stageState.sectionMode === 'hero') {
        p.targetX = isMobile ? vw * 0.5 : vw * 0.78;
        p.targetY = isMobile ? vh * 0.74 : vh * 0.56;
      } else if (stageState.sectionMode === 'about') {
        p.targetX = isMobile ? vw * 0.25 : vw * 0.22;
        p.targetY = isMobile ? vh * 0.78 : vh * 0.56;
      } else if (stageState.sectionMode === 'tour') {
        if (stageState.mascotSide === 'left') {
          p.targetX = isMobile ? vw * 0.2 : vw * 0.18;
        } else {
          p.targetX = isMobile ? vw * 0.8 : vw * 0.82;
        }
        p.targetY = isMobile ? vh * 0.82 : vh * 0.62;
      } else if (stageState.sectionMode === 'footer') {
        p.targetX = isMobile ? vw * 0.72 : vw * 0.76;
        p.targetY = isMobile ? vh * 0.75 : vh * 0.54;
      }

      if (!p.isDragging) {
        p.vx = (p.targetX - p.x) * 0.09;
        p.vy = (p.targetY - p.y) * 0.09;
        p.x = lerp(p.x, p.targetX, 0.09);
        p.y = lerp(p.y, p.targetY, 0.09);
      }

      const now = performance.now();
      if (now - lastScrollTimeRef.current > 90) {
        scrollVelocityRef.current = 0;
      } else {
        scrollVelocityRef.current *= 0.82;
      }

      if (mascotAnchorRef.current) {
        mascotAnchorRef.current.style.transform = `translate3d(${p.x.toFixed(1)}px, ${p.y.toFixed(1)}px, 0)`;
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [stageState, activeModal]);

  // -------------------------------------------------------------------------
  // MASCOT INTERACTION HANDLERS (GRAB, TICKLE, DOUBLE-CLICK TRICK MENU)
  // -------------------------------------------------------------------------
  const handleCharacterPointerDown = (e) => {
    if (e.button !== undefined && e.button !== 0) return;
    const p = posRef.current;
    p.isDragging = true;
    p.dragOffsetX = e.clientX - p.x;
    p.dragOffsetY = e.clientY - p.y;
    setIsDraggingState(true);
    soundEngine.grab();
    sayTemporarily('🫨 Whoa! Careful with the yellow hair—where are we flying?', 3000, 'surprised');
  };

  const handleMascotClick = () => {
    const now = performance.now();
    if (now - lastMascotTapRef.current < 340) {
      soundEngine.pop();
      setMenuOpen((prev) => !prev);
      lastMascotTapRef.current = 0;
    } else {
      lastMascotTapRef.current = now;
    }
  };

  const handleCharacterPointerMove = () => {
    if (posRef.current.isDragging) return;
    const now = performance.now();
    if (now - lastTickleTimeRef.current < 160) {
      tickleCounterRef.current += 1;
      if (tickleCounterRef.current > 10) {
        tickleCounterRef.current = 0;
        soundEngine.giggle();
        sayTemporarily('😂 Haha, stop! That tickles! Double-click me for a trick!', 3200, 'happy');
      }
    } else if (now - lastTickleTimeRef.current > 800) {
      tickleCounterRef.current = 0;
    }
    lastTickleTimeRef.current = now;
  };

  // -------------------------------------------------------------------------
  // SPLIT WORDS FOR HERO, ABOUT, AND SPEECH BUBBLE
  // -------------------------------------------------------------------------
  const heroWordsBeforeBatman = useMemo(
    () => OWNER_PROFILE.heroLeadBeforeBatman.trim().split(/\s+/),
    []
  );
  const aboutWords = useMemo(() => OWNER_PROFILE.aboutText.trim().split(/\s+/), []);
  const speechWords = useMemo(() => (speechText || '').trim().split(/\s+/), [speechText]);

  const activeModalProject =
    activeModal?.type === 'project' ? ALL_WORK_BY_SLUG[activeModal.slug] : null;
  const activeModalCert =
    activeModal?.type === 'cert' ? CERTIFICATIONS_BY_SLUG[activeModal.slug] : null;
  const adjacentProjects = useMemo(
    () => (activeModalProject ? getAdjacentProjects(activeModalProject.slug) : null),
    [activeModalProject]
  );

  // Update character commentary when scrolling inside the Case Study Window
  const handleModalScroll = useCallback(() => {
    if (!modalScrollRef.current || !activeModalProject) return;
    const el = modalScrollRef.current;
    const ratio = el.scrollTop / Math.max(1, el.scrollHeight - el.clientHeight);
    const comments = activeModalProject.characterComments || [];
    if (comments.length > 0) {
      const idx = clamp(Math.floor(ratio * comments.length), 0, comments.length - 1);
      if (idx !== activeModalSlideIdx) {
        setActiveModalSlideIdx(idx);
        setSpeechText(comments[idx]);
        setSpeechVisible(true);
      }
    }
  }, [activeModalProject, activeModalSlideIdx]);

  const isBadgeActive = Boolean(activeModal) || stageState.isBadge;

  return (
    <div className="app-shell">
      <div id="batsignal-glow" aria-hidden="true" />

      {/* =====================================================================
          FIXED SOUND TOGGLE (BOTTOM RIGHT — SEBG.CH)
          ===================================================================== */}
      <button
        type="button"
        className="button sound-toggle"
        aria-pressed={soundEnabled}
        aria-label={soundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
        title={soundEnabled ? 'Sound On' : 'Sound Off'}
        onClick={handleToggleSound}
      >
        {soundEnabled ? (
          <svg width="20" height="20" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M7.28 2.22a.75.75 0 0 1 .47.7v10.16a.75.75 0 0 1-1.28.53L3.44 10.5H1.75A.75.75 0 0 1 1 9.75v-3.5a.75.75 0 0 1 .75-.75h1.69l3.03-3.11a.75.75 0 0 1 .81-.17Z" fill="currentColor" />
            <path d="M10 5.5a3.5 3.5 0 0 1 0 5M12 3a6.5 6.5 0 0 1 0 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M7.28 2.22a.75.75 0 0 1 .47.7v10.16a.75.75 0 0 1-1.28.53L3.44 10.5H1.75A.75.75 0 0 1 1 9.75v-3.5a.75.75 0 0 1 .75-.75h1.69l3.03-3.11a.75.75 0 0 1 .81-.17Z" fill="currentColor" />
            <path d="M10.5 6l4 4m0-4l-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        )}
      </button>

      {/* =====================================================================
          FIXED 3D MASCOT LAYER (HERO / TOUR STAGE / CORNER BADGE IN CASE VIEW)
          ===================================================================== */}
      <div
        className={`mascot-layer ${activeModal ? 'mascot-layer--window-open' : ''}`}
        aria-live="polite"
      >
        <div
          ref={mascotAnchorRef}
          className={`mascot-anchor ${isBadgeActive ? 'is-badge' : ''}`}
        >
          {/* Speech Bubble */}
          {(speechVisible || Boolean(activeModal)) && !menuOpen && (
            <div className="mascot-bubble">
              <div className="mascot-bubble__card">
                <p className="mascot-bubble__text">
                  {speechWords.map((word, idx) => {
                    const isLit = idx / Math.max(1, speechWords.length) <= speechLitRatio;
                    return (
                      <span
                        key={`${word}-${idx}`}
                        className="mascot-bubble__word"
                        style={{ opacity: isLit ? 1 : 0.25 }}
                      >
                        {word}{' '}
                      </span>
                    );
                  })}
                </p>
                <div className="mascot-bubble__tail" />
              </div>
            </div>
          )}

          {/* Trick Selection Menu (Double-click character or click Do a trick) */}
          {menuOpen && (
            <div className="mascot-menu" role="dialog" aria-label="Mascot tricks menu">
              <div className="mascot-menu__header">
                <span className="mascot-menu__title">Pick a trick</span>
                <button
                  type="button"
                  className="mascot-menu__close"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close tricks menu"
                >
                  ✕
                </button>
              </div>
              <div className="mascot-menu__grid">
                {MASCOT_TRICKS.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    className={`mascot-menu__btn ${activeTrick === t.id ? 'is-active' : ''}`}
                    onClick={() => triggerTrick(t.id)}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 3D WebGL Canvas */}
          <div
            className="mascot-canvas-wrap"
            onPointerMove={handleCharacterPointerMove}
            onPointerDown={handleCharacterPointerDown}
            onTouchStart={(e) => {
              const now = Date.now();
              if (now - lastMascotTapRef.current < 380) {
                e.preventDefault();
                soundEngine.pop();
                setMenuOpen((prev) => !prev);
              }
              lastMascotTapRef.current = now;
            }}
            onClick={handleMascotClick}
            onDoubleClick={(e) => {
              e.stopPropagation();
              soundEngine.pop();
              setMenuOpen((prev) => !prev);
            }}
            title="Drag me around, or double-click me to pick a trick!"
          >
            <LegoScene
              outfit={activeOutfitId}
              trick={activeTrick}
              gesture={stageState.gesture}
              mood={stageState.mood}
              isBadge={isBadgeActive}
              isDragging={isDraggingState}
              isSleeping={isSleeping}
              facingYaw={stageState.facingYaw}
              pointSide={stageState.pointSide}
              scrollVelocityRef={scrollVelocityRef}
              mascotPosRef={posRef}
              globalPointerRef={globalPointerRef}
            />
          </div>
        </div>
      </div>

      {/* =====================================================================
          MAIN SCROLLING PORTFOLIO
          ===================================================================== */}
      <main>
        {/* -------------------------------------------------------------------
            1. HERO SECTION (12-COLUMN GRID — SEBG.CH)
            ------------------------------------------------------------------- */}
        <section ref={heroRef} id="hero" className="hero grid-page bg-grid">
          <header className="hero__top">
            <p className="hero__name">
              <span className="hero__name-primary">{OWNER_PROFILE.name}</span>
              <span className="hero__name-sub">{OWNER_PROFILE.roleTitle}</span>
            </p>

            <div className="hero__header-actions">
              <button
                type="button"
                className="button"
                onClick={() => {
                  soundEngine.pop();
                  setMenuOpen((prev) => !prev);
                }}
              >
                <span>Do a trick</span>
              </button>
              <a
                href="#contact"
                className="button button--yellow"
                onClick={(e) => {
                  e.preventDefault();
                  soundEngine.pop();
                  footerRef.current?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span>Get in touch</span>
              </a>
            </div>
          </header>

          <div className="hero__content">
            <h1 className="hero__headline">
              {heroWordsBeforeBatman.map((word, idx) => (
                <React.Fragment key={`${word}-${idx}`}>
                  <span
                    className="hero__word"
                    style={{ animationDelay: `${0.06 + idx * 0.03}s` }}
                  >
                    {word}
                  </span>{' '}
                </React.Fragment>
              ))}
              <button
                type="button"
                className="batman-trigger"
                onClick={toggleBatmanMode}
                title="Click to toggle Batman Nocturnal Mode!"
              >
                <span>🦇 {OWNER_PROFILE.heroBatmanWord}</span>
              </button>
              <span>.</span>
            </h1>
          </div>
        </section>

        {/* -------------------------------------------------------------------
            2. ABOUT SECTION (STICKY 145SVH — WORD-BY-WORD SCROLL ILLUMINATION)
            ------------------------------------------------------------------- */}
        <section ref={aboutRef} id="about" className="about bg-grid">
          <div className="about__sticky grid-page">
            <div className="about__inner">
              <p className="about__text">
                {aboutWords.map((word, idx) => {
                  const threshold = idx / Math.max(1, aboutWords.length);
                  const isLit = aboutWordProgress >= threshold;
                  return (
                    <React.Fragment key={`${word}-${idx}`}>
                      <span className={`about__word ${isLit ? 'is-lit' : ''}`}>{word}</span>{' '}
                    </React.Fragment>
                  );
                })}
              </p>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------------
            3. GUIDED TOUR CHAPTERS (ALL 5 PROJECTS IN EXACT ORDER)
               1. MediStudyGo -> 2. Phoney -> 3. Masterplayer Prints ->
               4. TruGifting Solutions -> 5. OmniRoute Session Sync
            ------------------------------------------------------------------- */}
        <div className="tour" id="guided-tour">
          {TOUR_CHAPTERS.map((chapter, chapterIdx) => {
            const activeStep = chapterSteps[chapter.id] || 0;
            const currentDesktopSlide =
              chapter.desktopSlides[activeStep] || chapter.desktopSlides[0];

            return (
              <section
                key={chapter.id}
                id={chapter.id}
                ref={(el) => {
                  chapterRefs.current[chapter.id] = el;
                }}
                style={{ '--chapter-tint': chapter.tint }}
                className={`tour__chapter bg-grid ${
                  chapter.mascotSide === 'left'
                    ? 'tour__chapter--left'
                    : 'tour__chapter--right'
                }`}
              >
                {/* Sticky 100svh Stage on the 12-Column Grid */}
                <div className="tour__stage-wrap grid-page">
                  <div className="tour__title-row">
                    <div className="tour__title-block">
                      <span className="tour__eyebrow">
                        0{chapterIdx + 1} / 0{TOUR_CHAPTERS.length} · Featured case study
                      </span>
                      <h2 className="tour__title">{chapter.title}</h2>
                    </div>

                    <div className="tour__actions">
                      <button
                        type="button"
                        className="button button--yellow"
                        onClick={() => openProjectWindow(chapter.projectSlug)}
                      >
                        <span>View project</span>
                      </button>
                    </div>
                  </div>

                  {/* Generous 8-Column Showcase Frame (Browser Stack + Overlapping 3D Phone Stack) */}
                  <div className="tour__span">
                    <div className="tour__device-group">
                      <div
                        className="tour__browser"
                        onClick={() => openProjectWindow(chapter.projectSlug)}
                        role="button"
                        tabIndex={0}
                        aria-label={`Open ${chapter.title} full case study`}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            openProjectWindow(chapter.projectSlug);
                          }
                        }}
                      >
                        <div className="tour__browser-bar">
                          <div className="tour__dots">
                            <span className="tour__dot tour__dot--red" />
                            <span className="tour__dot tour__dot--yellow" />
                            <span className="tour__dot tour__dot--green" />
                          </div>

                          <div className="tour__hosts" onClick={(e) => e.stopPropagation()}>
                            {chapter.hosts.map((h) => (
                              <a
                                key={h.url}
                                href={h.url}
                                target="_blank"
                                rel="noreferrer"
                                className="tour__host-pill"
                              >
                                {h.label} ↗
                              </a>
                            ))}
                          </div>

                          <div className="tour__expand-hint">
                            <span>Expand case study</span>
                            <span aria-hidden="true">⤢</span>
                          </div>
                        </div>

                        <div className="tour__viewport">
                          <div
                            className="tour__stack-track"
                            style={{
                              transform: `translate3d(0, ${activeStep * -100}%, 0)`,
                            }}
                          >
                            {chapter.desktopSlides.map((slide, sIdx) => (
                              <div key={`${chapter.id}-d-${sIdx}`} className="tour__slide-frame">
                                <img
                                  src={slide.src}
                                  alt={slide.alt || chapter.title}
                                  className="tour__screen-img"
                                  loading={chapterIdx === 0 && sIdx === 0 ? 'eager' : 'lazy'}
                                />
                              </div>
                            ))}
                          </div>

                          <div className="tour__slide-step-dots">
                            {chapter.desktopSlides.map((_, idx) => (
                              <span
                                key={idx}
                                className={`tour__step-dot ${
                                  activeStep === idx ? 'is-active' : ''
                                }`}
                              />
                            ))}
                          </div>

                          {currentDesktopSlide?.badge && (
                            <div className="tour__slide-pill">
                              <span>{currentDesktopSlide.badge}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Overlapping 3D Phone Mockup with synced vertical screen stack */}
                      <div
                        className="tour__phone"
                        onClick={() => openProjectWindow(chapter.projectSlug)}
                        title={`Click to open ${chapter.title} case study`}
                      >
                        <div
                          className="tour__phone-shell"
                          style={{
                            transform: `rotateY(${
                              chapter.mascotSide === 'left'
                                ? 6 - activeStep * 3
                                : -6 + activeStep * 3
                            }deg)`,
                          }}
                        >
                          <div className="tour__phone-screen">
                            <div className="tour__phone-statusbar">
                              <span>9:41</span>
                              <div className="tour__phone-notch" />
                              <div className="tour__phone-status-icons">
                                <span className="tour__phone-status-dot" />
                                <span className="tour__phone-status-dot" />
                              </div>
                            </div>
                            <div className="tour__phone-body">
                              <div
                                className="tour__stack-track"
                                style={{
                                  transform: `translate3d(0, ${activeStep * -100}%, 0)`,
                                }}
                              >
                                {chapter.mobileSlides.map((mSlide, mIdx) => (
                                  <div
                                    key={`${chapter.id}-m-${mIdx}`}
                                    className="tour__slide-frame"
                                  >
                                    <img
                                      src={mSlide.src}
                                      alt={mSlide.alt || `${chapter.title} mobile`}
                                      className="tour__phone-img"
                                      loading="lazy"
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Phoney Interactive 6-Slot Audio Emoji Quick Tray */}
                    {chapter.hasPhoneySoundboard && (
                      <div
                        className="phoney-soundboard"
                        aria-label="Phoney Interactive 6-Slot Audio Emoji Quick Tray"
                      >
                        <div className="phoney-soundboard__header">
                          <span className="phoney-soundboard__badge">
                            🔊 LIVE AUDIO EMOJI QUICK TRAY
                          </span>
                          <span className="phoney-soundboard__sub">
                            Tap any slot to hear Phoney’s real in-call sound:
                          </span>
                        </div>

                        <div className="phoney-soundboard__grid">
                          {PHONEY_AUDIO_EMOJIS.map((item) => (
                            <button
                              key={item.id}
                              type="button"
                              style={{ '--emoji-accent': item.color }}
                              className={`phoney-emoji-btn ${
                                playingEmojiId === item.id ? 'is-playing' : ''
                              }`}
                              onClick={(e) => handlePlayPhoneyEmoji(item, e)}
                            >
                              <span>{item.emoji}</span>
                              <span>{item.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Scrolling Speech Bubbles in Mascot Column */}
                <div className="tour__lines grid-page">
                  {chapter.bubbles.map((bubbleText, bIdx) => {
                    const bKey = `${chapter.id}-${bIdx}`;
                    const bp = bubbleProgressMap[bKey] ?? 0;
                    const words = bubbleText.split(/\s+/);
                    const isBubbleActive = activeStep === bIdx || bp > 0.08;

                    return (
                      <div
                        key={bKey}
                        ref={(el) => {
                          bubbleRefs.current[bKey] = el;
                        }}
                        className="tour__step"
                      >
                        <div
                          className={`tour__bubble-card ${isBubbleActive ? 'is-active' : ''}`}
                        >
                          <p className="tour__bubble-text">
                            {words.map((w, wIdx) => {
                              const wLit = bp >= wIdx / Math.max(1, words.length);
                              return (
                                <React.Fragment key={`${w}-${wIdx}`}>
                                  <span className={`tour__bubble-word ${wLit ? 'is-lit' : ''}`}>
                                    {w}
                                  </span>{' '}
                                </React.Fragment>
                              );
                            })}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>

        {/* -------------------------------------------------------------------
            4. ALL WORK BENTO GRID (#work — ALL 18 VERIFIED PROJECTS)
            ------------------------------------------------------------------- */}
        <section ref={workRef} id="work" className="bento-section bg-grid">
          <div className="bento-section__inner">
            <div className="bento-section__header">
              <h2 className="bento-section__title">All work</h2>
              <p className="bento-section__count">
                {ALL_PROJECTS.length} Projects · Click any card to inspect
              </p>
            </div>

            <div className="bento-grid">
              {ALL_PROJECTS.map((project) => (
                <article
                  key={project.slug}
                  className={`bento-card ${project.bentoSpan || 'col-4'}`}
                  style={{
                    '--card-accent': project.accentColor,
                    '--card-tint': project.surfaceTint,
                  }}
                  onClick={() => openProjectWindow(project.slug)}
                  onMouseEnter={() => {
                    customSpeechUntilRef.current = performance.now() + 2800;
                    setSpeechText(`${project.title} — ${project.subtitle}`);
                    setSpeechVisible(true);
                  }}
                >
                  <div className="bento-card__media">
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      className="bento-card__img"
                      loading="lazy"
                    />
                    <span className="bento-card__badge">{project.category}</span>
                  </div>

                  <div className="bento-card__body">
                    <div className="bento-card__meta">
                      <span>{project.number}</span>
                      <span>·</span>
                      <span>{project.year}</span>
                      <span>·</span>
                      <span>{project.role}</span>
                    </div>

                    <h3 className="bento-card__title">{project.title}</h3>
                    <p className="bento-card__summary">{project.summary}</p>

                    <div className="bento-card__tags">
                      {project.stack.slice(0, 4).map((tech) => (
                        <span key={tech} className="bento-tag">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="bento-card__footer">
                      <span className="bento-card__open">View case study →</span>

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="bento-card__ext"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {project.liveUrl.includes('github.com') ? 'GitHub ↗' : 'Live site ↗'}
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------------
            5. CERTIFICATIONS & CREDENTIALS (#certifications — 5 APPROVED ITEMS)
            ------------------------------------------------------------------- */}
        <section ref={certsRef} id="certifications" className="bento-section bg-grid">
          <div className="bento-section__inner">
            <div className="bento-section__header">
              <h2 className="bento-section__title">Certifications</h2>
              <p className="bento-section__count">
                {CERTIFICATIONS.length} Verified Credentials · Technical & Cloud Mastery
              </p>
            </div>

            <div className="bento-grid">
              {CERTIFICATIONS.map((cert) => (
                <article
                  key={cert.slug}
                  className={`bento-card cert-card ${cert.bentoSpan || 'col-4'}`}
                  style={{
                    '--card-accent': cert.accentColor,
                    '--card-tint': cert.surfaceTint,
                  }}
                  onClick={() => openCertWindow(cert.slug)}
                  onMouseEnter={() => {
                    customSpeechUntilRef.current = performance.now() + 2600;
                    setSpeechText(`🎓 ${cert.title} — Issued by ${cert.issuer}`);
                    setSpeechVisible(true);
                  }}
                >
                  <div className="bento-card__media">
                    <img
                      src={cert.coverImage}
                      alt={cert.title}
                      className="bento-card__img"
                      loading="lazy"
                    />
                    <span className="bento-card__badge">{cert.issuer}</span>
                  </div>

                  <div className="bento-card__body">
                    <div className="bento-card__meta">
                      <span>{cert.number}</span>
                      <span>·</span>
                      <span>{cert.issueDate}</span>
                      <span>·</span>
                      <span>ID: {cert.credentialId}</span>
                    </div>

                    <h3 className="bento-card__title">{cert.title}</h3>
                    <p className="bento-card__summary">{cert.summary}</p>

                    <div className="bento-card__tags">
                      {cert.skills.slice(0, 4).map((skill) => (
                        <span key={skill} className="bento-tag">
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="bento-card__footer">
                      <span className="bento-card__open">Inspect credential →</span>
                      {cert.verifyUrl && (
                        <a
                          href={cert.verifyUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="bento-card__ext"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {cert.verifyLabel} ↗
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------------
            6. CONTACT FOOTER (#contact — EXACT SEBG.CH DARK INK LAYOUT)
            ------------------------------------------------------------------- */}
        <footer ref={footerRef} id="contact" className="footer grid-page bg-grid">
          <div className="footer__top">
            <h2 className="footer__title">Get in touch</h2>
            <p className="footer__lead">Got a project or role in mind? Let’s talk.</p>

            <button
              type="button"
              className="footer__email"
              onClick={() => {
                navigator.clipboard?.writeText(OWNER_PROFILE.email);
                soundEngine.playTrickSound('dance');
                setStageState((prev) => ({ ...prev, gesture: 'cheer' }));
                sayTemporarily(
                  `📋 Copied ${OWNER_PROFILE.email} to your clipboard! Talk soon!`,
                  4200,
                  'happy'
                );
              }}
              title="Click to copy email address"
            >
              {OWNER_PROFILE.email}
            </button>

            <div className="footer__links">
              <a
                href={OWNER_PROFILE.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="footer__social-link"
              >
                <span>LinkedIn</span>
                <span aria-hidden="true">↗</span>
              </a>
              <a
                href={OWNER_PROFILE.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="footer__social-link"
              >
                <span>GitHub</span>
                <span aria-hidden="true">↗</span>
              </a>
              <a
                href={OWNER_PROFILE.googleDeveloperUrl}
                target="_blank"
                rel="noreferrer"
                className="footer__social-link"
              >
                <span>Google Developer</span>
                <span aria-hidden="true">↗</span>
              </a>
              <a
                href={OWNER_PROFILE.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="footer__social-link"
              >
                <span>Resume PDF</span>
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          <div className="footer__bottom">
            <span>© 2026 {OWNER_PROFILE.name} · Built with Three.js & WebAudio</span>

            <div className="footer__bottom-actions">
              <button
                type="button"
                className="footer__action-btn"
                onClick={() => {
                  soundEngine.pop();
                  setMenuOpen(true);
                }}
              >
                Do a trick
              </button>
              <button
                type="button"
                className="footer__action-btn"
                onClick={toggleBatmanMode}
              >
                {batmanMode ? 'Daylight Mode' : 'Batman Mode'}
              </button>
            </div>
          </div>
        </footer>
      </main>

      {/* =====================================================================
          FULL-VIEWPORT CASE STUDY WINDOW (.project-window — SEBG.CH CASE VIEW)
          ===================================================================== */}
      {activeModalProject && (
        <div
          className="project-window-backdrop"
          style={{
            '--window-bg': batmanMode ? '#0B0F19' : '#F6F2E9',
            '--window-tint': batmanMode ? '#111827' : activeModalProject.surfaceTint,
          }}
        >
          <div className="project-window" role="dialog" aria-modal="true">
            {/* Top Navigation Bar */}
            <header className="project-window__topbar">
              <button type="button" className="button" onClick={closeWindow}>
                <span>← Back</span>
              </button>

              <div className="project-window__topbar-right">
                {activeModalProject.liveUrl && (
                  <a
                    href={activeModalProject.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="button button--yellow"
                  >
                    <span>{activeModalProject.liveLabel || 'Visit website'}</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                )}
                {activeModalProject.repoUrl &&
                  activeModalProject.repoUrl !== activeModalProject.liveUrl && (
                    <a
                      href={activeModalProject.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="button"
                    >
                      <span>{activeModalProject.repoLabel || 'GitHub'}</span>
                      <span aria-hidden="true">↗</span>
                    </a>
                  )}
              </div>
            </header>

            {/* Scrollable Case Study Content */}
            <div
              ref={modalScrollRef}
              className="project-window__scroll"
              onScroll={handleModalScroll}
            >
              {/* 1. CASE HERO (12-column grid) */}
              <section className="case-hero grid-page bg-grid">
                <span className="case-hero__eyebrow">
                  PROJECT {activeModalProject.number} · {activeModalProject.category}
                </span>
                <h1 className="case-hero__title">{activeModalProject.title}</h1>

                <dl className="case-hero__meta">
                  <div className="case-hero__meta-item">
                    <dt>Role</dt>
                    <dd>{activeModalProject.role}</dd>
                  </div>
                  <div className="case-hero__meta-item">
                    <dt>Year</dt>
                    <dd>{activeModalProject.year}</dd>
                  </div>
                  <div className="case-hero__meta-item">
                    <dt>Core Stack</dt>
                    <dd>{activeModalProject.stack.slice(0, 4).join(' · ')}</dd>
                  </div>
                </dl>

                <div className="case-hero__cover">
                  <div className="case-browser-frame">
                    <div className="tour__browser-bar">
                      <div className="tour__dots">
                        <span className="tour__dot tour__dot--red" />
                        <span className="tour__dot tour__dot--yellow" />
                        <span className="tour__dot tour__dot--green" />
                      </div>
                      <span className="tour__host-pill">{activeModalProject.title}</span>
                      <span />
                    </div>
                    <div className="case-browser-screen">
                      <img
                        src={activeModalProject.slides?.[0]?.src || activeModalProject.coverImage}
                        alt={activeModalProject.title}
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* 2. CASE NARRATIVE & IMPACT METRICS */}
              <section className="case-narrative grid-page bg-grid">
                <p className="case-reveal">{activeModalProject.summary}</p>

                <div className="case-copy">
                  {activeModalProject.description.map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ))}

                  {activeModalProject.hasPhoneySoundboard && (
                    <div className="phoney-soundboard" style={{ marginLeft: 0 }}>
                      <div className="phoney-soundboard__header">
                        <span className="phoney-soundboard__badge">
                          🔊 TRY PHONEY’S 6 DEFAULT AUDIO EMOJIS
                        </span>
                        <span className="phoney-soundboard__sub">
                          Click any slot to trigger the live call sound:
                        </span>
                      </div>
                      <div className="phoney-soundboard__grid">
                        {PHONEY_AUDIO_EMOJIS.map((item) => (
                          <button
                            key={item.id}
                            type="button"
                            style={{ '--emoji-accent': item.color }}
                            className={`phoney-emoji-btn ${
                              playingEmojiId === item.id ? 'is-playing' : ''
                            }`}
                            onClick={(e) => handlePlayPhoneyEmoji(item, e)}
                          >
                            <span>{item.emoji}</span>
                            <span>{item.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {activeModalProject.metrics && (
                  <div className="case-metrics">
                    {activeModalProject.metrics.map((m, idx) => (
                      <div key={idx} className="case-metric-card">
                        <strong>{m.value}</strong>
                        <span>{m.label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </section>

              {/* 3. CASE SHOWCASE GALLERY (Full 12-Col + Dual 6-Col + Triple Mobile) */}
              <section className="case-gallery grid-page bg-grid">
                {activeModalProject.slides?.map((slide, sIdx) => (
                  <div
                    key={sIdx}
                    className={sIdx === 0 ? 'case-browser-full' : 'case-browser-half'}
                  >
                    <div className="case-browser-frame">
                      <div className="tour__browser-bar">
                        <div className="tour__dots">
                          <span className="tour__dot tour__dot--red" />
                          <span className="tour__dot tour__dot--yellow" />
                          <span className="tour__dot tour__dot--green" />
                        </div>
                        <span className="tour__host-pill">
                          Slide 0{sIdx + 1} / 0{activeModalProject.slides.length}
                        </span>
                        <span />
                      </div>
                      <div className="case-browser-screen">
                        <img src={slide.src} alt={slide.caption || activeModalProject.title} />
                      </div>
                      {slide.caption && (
                        <div className="case-browser-caption">{slide.caption}</div>
                      )}
                    </div>
                  </div>
                ))}

                {/* Triple Mobile Mockups Row when mobileSlides exist */}
                {activeModalProject.mobileSlides &&
                  activeModalProject.mobileSlides.length > 0 && (
                    <div className="case-phones-row">
                      {activeModalProject.mobileSlides.slice(0, 3).map((mSlide, mIdx) => (
                        <div
                          key={mIdx}
                          className={`case-phone-col--${mIdx + 1}`}
                          style={{ containerType: 'inline-size' }}
                        >
                          <div className="tour__phone-shell">
                            <div className="tour__phone-screen">
                              <div className="tour__phone-statusbar">
                                <span>9:41</span>
                                <div className="tour__phone-notch" />
                                <div className="tour__phone-status-icons">
                                  <span className="tour__phone-status-dot" />
                                  <span className="tour__phone-status-dot" />
                                </div>
                              </div>
                              <div className="tour__phone-body">
                                <img
                                  src={mSlide.src}
                                  alt={mSlide.alt || `${activeModalProject.title} mobile`}
                                  className="tour__phone-img"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
              </section>

              {/* 4. NEXT PROJECT SECTION (.case-next) */}
              {adjacentProjects?.next && (
                <section className="case-next grid-page bg-grid">
                  <span className="case-next__eyebrow">Next project</span>
                  <div className="case-next__header">
                    <h2 className="case-next__title">{adjacentProjects.next.title}</h2>
                    <button
                      type="button"
                      className="button button--yellow"
                      onClick={() => {
                        openProjectWindow(adjacentProjects.next.slug);
                        modalScrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    >
                      <span>View project</span>
                    </button>
                  </div>

                  <div
                    className="case-next__preview"
                    onClick={() => {
                      openProjectWindow(adjacentProjects.next.slug);
                      modalScrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    <img
                      src={adjacentProjects.next.coverImage}
                      alt={adjacentProjects.next.title}
                    />
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          FULL-VIEWPORT CERTIFICATION WINDOW
          ===================================================================== */}
      {activeModalCert && (
        <div
          className="project-window-backdrop"
          style={{
            '--window-bg': batmanMode ? '#0B0F19' : '#F6F2E9',
            '--window-tint': batmanMode ? '#111827' : activeModalCert.surfaceTint,
          }}
        >
          <div className="project-window" role="dialog" aria-modal="true">
            <header className="project-window__topbar">
              <button type="button" className="button" onClick={closeWindow}>
                <span>← Back</span>
              </button>

              <div className="project-window__topbar-right">
                {activeModalCert.verifyUrl && (
                  <a
                    href={activeModalCert.verifyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="button button--yellow"
                  >
                    <span>{activeModalCert.verifyLabel}</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                )}
                {activeModalCert.secondaryUrl && (
                  <a
                    href={activeModalCert.secondaryUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="button"
                  >
                    <span>{activeModalCert.secondaryLabel}</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                )}
              </div>
            </header>

            <div className="project-window__scroll">
              <section className="case-hero grid-page bg-grid">
                <span className="case-hero__eyebrow">
                  VERIFIED CREDENTIAL · {activeModalCert.issuer}
                </span>
                <h1 className="case-hero__title">{activeModalCert.title}</h1>

                <dl className="case-hero__meta">
                  <div className="case-hero__meta-item">
                    <dt>Issuing Organization</dt>
                    <dd>{activeModalCert.issuer}</dd>
                  </div>
                  <div className="case-hero__meta-item">
                    <dt>Issued Date</dt>
                    <dd>{activeModalCert.issueDate}</dd>
                  </div>
                  <div className="case-hero__meta-item">
                    <dt>Credential ID</dt>
                    <dd>{activeModalCert.credentialId}</dd>
                  </div>
                </dl>

                <div className="case-hero__cover">
                  <div className="case-browser-frame">
                    <div className="tour__browser-bar">
                      <div className="tour__dots">
                        <span className="tour__dot tour__dot--red" />
                        <span className="tour__dot tour__dot--yellow" />
                        <span className="tour__dot tour__dot--green" />
                      </div>
                      <span className="tour__host-pill">{activeModalCert.credentialId}</span>
                      <span />
                    </div>
                    <div className="case-browser-screen">
                      <img src={activeModalCert.coverImage} alt={activeModalCert.title} />
                    </div>
                  </div>
                </div>
              </section>

              <section className="case-narrative grid-page bg-grid">
                <p className="case-reveal">{activeModalCert.summary}</p>

                <div className="case-copy">
                  {activeModalCert.highlights.map((item, idx) => (
                    <p key={idx}>• {item}</p>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
