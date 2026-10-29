import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import LegoScene from './three/LegoScene';
import { soundEngine } from './utils/soundEngine';
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

function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

export default function App() {
  // ---------------------------------------------------------------------------
  // Core Portfolio & Character State
  // ---------------------------------------------------------------------------
  const [batmanMode, setBatmanMode] = useState(false);
  const [manualOutfit, setManualOutfit] = useState(null);
  const [autoOutfit, setAutoOutfit] = useState('classic');
  const [trickState, setTrickState] = useState({ name: null, nonce: 0 });
  const [menuOpen, setMenuOpen] = useState(false);
  const [soundMuted, setSoundMuted] = useState(false);
  const [speechText, setSpeechText] = useState(HERO_IDLE_QUIPS[0]);
  const [speechOverride, setSpeechOverride] = useState(null);
  const [floatingEmoji, setFloatingEmoji] = useState(null);
  const [playingEmojiId, setPlayingEmojiId] = useState(null);
  const [emailCopied, setEmailCopied] = useState(false);

  // In-website Project / Certification Window state
  const [activeWindowSlug, setActiveWindowSlug] = useState(null);
  const [activeWindowType, setActiveWindowType] = useState('project'); // 'project' | 'cert'
  const [windowCommentIdx, setWindowCommentIdx] = useState(0);

  // Scroll-choreographed Character Stage & Word Highlighting State
  const [stageState, setStageState] = useState({
    leftPercent: 73,
    topPercent: 54,
    isBadge: false,
    isWalking: false,
    walkDirection: -1,
    mood: 'wave',
  });
  const [aboutLitCount, setAboutLitCount] = useState(0);
  const [tourProgress, setTourProgress] = useState(() =>
    Object.fromEntries(
      TOUR_CHAPTERS.map((ch) => [
        ch.id,
        { activeStep: 0, bubbleLitCounts: ch.bubbles.map(() => 0) },
      ])
    )
  );

  // Grab & Drag + Cursor Tickle/Sneeze Tracking
  const [isGrabbed, setIsGrabbed] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const dragStartRef = useRef({ x: 0, y: 0, lastX: 0, lastY: 0, shakeScore: 0 });
  const hoverShakeRef = useRef({ lastX: 0, lastY: 0, score: 0, cooldownUntil: 0 });
  const globalPointerRef = useRef({ x: 0, y: 0 });

  // Section & Scroll Refs
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const chapterRefs = useRef({});
  const bubbleRefs = useRef({});
  const workRef = useRef(null);
  const certsRef = useRef(null);
  const footerRef = useRef(null);
  const projectWindowRef = useRef(null);

  // Audio Blip Deduplication Refs
  const prevAboutLitRef = useRef(0);
  const prevBubbleLitRef = useRef({});
  const speechTimeoutRef = useRef(null);

  const aboutWords = useMemo(() => OWNER_PROFILE.aboutText.split(' '), []);
  const activeOutfitId = batmanMode ? 'gotham' : manualOutfit || autoOutfit;
  const activeOutfitObj = useMemo(
    () => OUTFITS.find((o) => o.id === activeOutfitId) || OUTFITS[0],
    [activeOutfitId]
  );

  // ---------------------------------------------------------------------------
  // Helper: Temporary Speech Cloud Override
  // ---------------------------------------------------------------------------
  const sayTemporarily = useCallback((text, durationMs = 4200) => {
    setSpeechOverride(text);
    if (speechTimeoutRef.current) {
      clearTimeout(speechTimeoutRef.current);
    }
    speechTimeoutRef.current = setTimeout(() => {
      setSpeechOverride(null);
    }, durationMs);
  }, []);

  // ---------------------------------------------------------------------------
  // Trigger Character Trick + Sound
  // ---------------------------------------------------------------------------
  const triggerTrick = useCallback(
    (trickId, customMessage) => {
      setTrickState((prev) => ({ name: trickId, nonce: prev.nonce + 1 }));
      soundEngine.trick(trickId);

      const trickQuips = {
        dance: '🕺 Watch the footwork! Shipping code at 120 BPM.',
        backflip: '🤸 Alley-oop! Zero-downtime deployment flip!',
        spin: '🌀 360° full-stack rotation!',
        superhero: '🦸 Superhero landing! Hard on the knees, great for production.',
        panic: '😱 Wait—who force-pushed to main on a Friday?!',
        fly: '🚀 Taking off to low-latency orbit!',
        vanish: '🥷 Ninja mode activated. Poof!',
        hiccup: '🫧 Hic! Excuse me—too much espresso.',
        peekaboo: '🙈 Peekaboo! Still here.',
        selfie: '📸 Say cheese! Capturing the viewport.',
        dizzy: '😵‍💫 Whoa... everything is spinning!',
        sneeze: '🤧 Achoo! Excuse me.',
        sulk: '😤 Hmph. Fine, I’ll optimize the bundle myself.',
      };

      sayTemporarily(customMessage || trickQuips[trickId] || '✨ Ta-da!', 3800);
    },
    [sayTemporarily]
  );

  // ---------------------------------------------------------------------------
  // Batman Nocturnal Mode Toggle
  // ---------------------------------------------------------------------------
  const toggleBatmanMode = useCallback(() => {
    setBatmanMode((prev) => {
      const next = !prev;
      if (next) {
        soundEngine.batmanTransform(true);
        setTrickState((t) => ({ name: 'superhero', nonce: t.nonce + 1 }));
        sayTemporarily("🦇 I'm Batman. Nocturnal production architecture engaged.", 4800);
      } else {
        soundEngine.batmanTransform(false);
        setTrickState((t) => ({ name: 'spin', nonce: t.nonce + 1 }));
        sayTemporarily('☀️ Back to daylight builder suit!', 3500);
      }
      return next;
    });
  }, [sayTemporarily]);

  useEffect(() => {
    document.body.classList.toggle('batman-mode', batmanMode);
  }, [batmanMode]);

  useEffect(() => {
    document.body.classList.toggle('window-open', Boolean(activeWindowSlug));
  }, [activeWindowSlug]);

  // ---------------------------------------------------------------------------
  // Global Pointer Tracking for 3D Head/Torso Follow + Drag Handling
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const handlePointerMove = (e) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -((e.clientY / window.innerHeight) * 2 - 1);
      globalPointerRef.current = { x: clamp(nx, -1, 1), y: clamp(ny, -1, 1) };

      if (isGrabbed) {
        const dx = e.clientX - dragStartRef.current.x;
        const dy = e.clientY - dragStartRef.current.y;
        const stepDx = Math.abs(e.clientX - dragStartRef.current.lastX);
        const stepDy = Math.abs(e.clientY - dragStartRef.current.lastY);
        dragStartRef.current.lastX = e.clientX;
        dragStartRef.current.lastY = e.clientY;
        dragStartRef.current.shakeScore = dragStartRef.current.shakeScore * 0.88 + stepDx + stepDy;

        setDragOffset({
          x: clamp(dx, -window.innerWidth * 0.42, window.innerWidth * 0.42),
          y: clamp(dy, -window.innerHeight * 0.36, window.innerHeight * 0.36),
        });
      }
    };

    const handlePointerUp = () => {
      if (!isGrabbed) return;
      setIsGrabbed(false);
      const shakeScore = dragStartRef.current.shakeScore;
      dragStartRef.current.shakeScore = 0;
      setDragOffset({ x: 0, y: 0 });

      if (shakeScore > 260) {
        soundEngine.dizzy();
        setTrickState((prev) => ({ name: 'dizzy', nonce: prev.nonce + 1 }));
        sayTemporarily('😵‍💫 Whoa, easy there! You shook me dizzy!', 4200);
      } else {
        soundEngine.drop();
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerup', handlePointerUp);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [isGrabbed, sayTemporarily]);

  // ---------------------------------------------------------------------------
  // Idle Hero Quip Rotation
  // ---------------------------------------------------------------------------
  useEffect(() => {
    let idx = 0;
    const interval = setInterval(() => {
      idx = (idx + 1) % HERO_IDLE_QUIPS.length;
      if (!activeWindowSlug && window.scrollY < window.innerHeight * 0.45) {
        setSpeechText(HERO_IDLE_QUIPS[idx]);
      }
    }, 6200);
    return () => clearInterval(interval);
  }, [activeWindowSlug]);

  // ---------------------------------------------------------------------------
  // Scroll Choreography Engine (sebg.ch Right->Left Walk, Post-Arrival Word Blips,
  // Sticky Tour Chapters, Bottom-Left Circular Badge, and Footer Return)
  // ---------------------------------------------------------------------------
  useEffect(() => {
    let rafId = null;

    const updateScrollChoreography = () => {
      const vh = window.innerHeight || 1;
      const scrollY = window.scrollY;

      const aboutEl = aboutRef.current;
      const workEl = workRef.current;
      const footerEl = footerRef.current;

      const aboutRect = aboutEl ? aboutEl.getBoundingClientRect() : null;
      const workRect = workEl ? workEl.getBoundingClientRect() : null;
      const footerRect = footerEl ? footerEl.getBoundingClientRect() : null;

      // 1. Determine About Section Walk Progress & STRICT Post-Arrival Word Highlighting
      let nextLeft = 73;
      let nextTop = 54;
      let nextIsBadge = false;
      let nextIsWalking = false;
      let nextWalkDir = -1;
      let nextMood = 'wave';
      let nextAutoOutfit = 'classic';
      let nextSpeech = HERO_IDLE_QUIPS[0];
      let nextSectionMode = 'hero'; // 'hero' | 'about' | 'tour' | 'bento' | 'footer'

      if (aboutRect) {
        // Walk progress: starts as About enters viewport (top = vh * 0.92 -> top = vh * 0.25)
        const walkProgress = clamp((vh * 0.92 - aboutRect.top) / (vh * 0.67), 0, 1);

        if (walkProgress > 0 && aboutRect.bottom > vh * 0.2) {
          nextSectionMode = 'about';
          nextLeft = lerp(73, 22, walkProgress);
          nextTop = 56;

          if (walkProgress < 0.98) {
            // Character is actively walking from Right (73%) to Left (22%)
            nextIsWalking = true;
            nextWalkDir = -1;
            nextMood = 'wave';
            nextSpeech = '';
            // STRICT RULE: Zero words lit before the character arrives at his station!
            if (prevAboutLitRef.current !== 0) {
              prevAboutLitRef.current = 0;
              setAboutLitCount(0);
            }
          } else {
            // Character has arrived at left station (22%) -> points finger & lights words as user scrolls!
            nextIsWalking = false;
            nextMood = 'pointRight';
            const readSpan = Math.max(aboutRect.height - vh * 0.55, vh * 0.45);
            const scrolledPastArrival = Math.max(0, vh * 0.25 - aboutRect.top);
            const readRatio = clamp(scrolledPastArrival / readSpan, 0, 1);
            const litCount = Math.round(readRatio * aboutWords.length);

            if (litCount !== prevAboutLitRef.current) {
              if (litCount > prevAboutLitRef.current) {
                soundEngine.blip(litCount);
              }
              prevAboutLitRef.current = litCount;
              setAboutLitCount(litCount);
            }
            nextSpeech = '';
          }
        } else if (aboutRect.top >= vh * 0.92) {
          if (prevAboutLitRef.current !== 0) {
            prevAboutLitRef.current = 0;
            setAboutLitCount(0);
          }
        } else if (aboutRect.bottom <= vh * 0.2) {
          nextSectionMode = 'tour';
          nextLeft = 18;
          nextTop = 64;
          nextMood = 'pointRight';
          nextSpeech = '';
          if (prevAboutLitRef.current !== aboutWords.length) {
            prevAboutLitRef.current = aboutWords.length;
            setAboutLitCount(aboutWords.length);
          }
        }
      }

      // 2. Guided Tour Chapters (3 Sticky Split-Screen Chapters)
      const nextTourProgress = {};
      let activeChapter = null;

      TOUR_CHAPTERS.forEach((ch, chIdx) => {
        const chEl = chapterRefs.current[ch.id];
        if (!chEl) return;
        const chRect = chEl.getBoundingClientRect();

        // Check bubble word lighting & active slide step
        let activeStep = 0;
        const bubbleVisible = [];
        const bubbleLitCounts = ch.bubbles.map((text, bIdx) => {
          const bKey = `${ch.id}-${bIdx}`;
          const bEl = bubbleRefs.current[bKey];
          const wordCount = text.split(' ').length;
          if (!bEl) {
            bubbleVisible.push(bIdx === 0);
            return 0;
          }

          const bRect = bEl.getBoundingClientRect();
          const isVis = bIdx === 0 || bRect.top <= vh * 0.44;
          bubbleVisible.push(isVis);

          // Bubble lights up in the clear zone above the character's head
          const startTop = bIdx === 0 ? vh * 0.76 : vh * 0.44;
          const span = bIdx === 0 ? vh * 0.42 : vh * 0.34;
          const ratio = isVis ? clamp((startTop - bRect.top) / span, 0, 1) : 0;
          const lit = Math.round(ratio * wordCount);

          if (isVis && bRect.top < vh * 0.5) {
            activeStep = bIdx;
          }

          const prevLit = prevBubbleLitRef.current[bKey] || 0;
          if (lit !== prevLit) {
            if (lit > prevLit && chRect.top < vh && chRect.bottom > 0) {
              soundEngine.blip(lit + bIdx * 7);
            }
            prevBubbleLitRef.current[bKey] = lit;
          }
          return lit;
        });

        nextTourProgress[ch.id] = { activeStep, bubbleLitCounts, bubbleVisible };

        if (chRect.top < vh * 0.82 && chRect.bottom > vh * 0.18) {
          activeChapter = { chapter: ch, index: chIdx, rect: chRect, activeStep };
        }
      });

      setTourProgress((prev) => {
        let changed = false;
        for (const ch of TOUR_CHAPTERS) {
          const nextCh = nextTourProgress[ch.id];
          const prevCh = prev[ch.id];
          if (!nextCh || !prevCh) continue;
          if (
            nextCh.activeStep !== prevCh.activeStep ||
            nextCh.bubbleLitCounts.some((v, i) => v !== prevCh.bubbleLitCounts[i]) ||
            (nextCh.bubbleVisible &&
              (!prevCh.bubbleVisible ||
                nextCh.bubbleVisible.some((v, i) => v !== prevCh.bubbleVisible[i])))
          ) {
            changed = true;
            break;
          }
        }
        return changed ? nextTourProgress : prev;
      });

      if (activeChapter) {
        const { chapter, index, rect } = activeChapter;
        nextSectionMode = 'tour';
        nextAutoOutfit = chapter.outfit;
        const targetLeft = chapter.mascotSide === 'left' ? 18 : 82;
        const prevLeft = index === 0 ? 22 : TOUR_CHAPTERS[index - 1].mascotSide === 'left' ? 18 : 82;

        // Walk transition when entering chapter (top between vh * 0.82 and vh * 0.25)
        const enterRatio = clamp((vh * 0.82 - rect.top) / (vh * 0.52), 0, 1);
        nextLeft = lerp(prevLeft, targetLeft, enterRatio);
        nextTop = 72;

        if (enterRatio < 0.94 && Math.abs(targetLeft - prevLeft) > 8) {
          nextIsWalking = true;
          nextWalkDir = targetLeft > prevLeft ? 1 : -1;
          nextMood = 'wave';
          nextSpeech = '';
        } else {
          nextIsWalking = false;
          nextMood = chapter.mascotSide === 'left' ? 'pointRight' : 'pointLeft';
          nextSpeech = '';
        }

        // Dynamic chapter background tint (when not in Batman dark mode)
        if (!document.body.classList.contains('batman-mode')) {
          document.documentElement.style.setProperty('--bg-active', chapter.bgLight);
        }
      } else if (!document.body.classList.contains('batman-mode')) {
        document.documentElement.style.setProperty('--bg-active', '#F6F2E9');
      }

      // 3. All Work (#work — 18 Projects) & Certifications (#certifications — 6 Certs):
      // Character morphs into circular badge in bottom-left corner
      if (workRect && workRect.top < vh * 0.58) {
        const inFooter = footerRect && footerRect.top < vh * 0.55;
        if (!inFooter) {
          nextSectionMode = 'bento';
          nextIsBadge = true;
          nextIsWalking = false;
          nextMood = 'champion';
          const inCerts = certsRef.current && certsRef.current.getBoundingClientRect().top < vh * 0.55;
          nextSpeech = inCerts
            ? '6 verified credentials! Click any card to inspect or verify on LinkedIn.'
            : 'All 18 projects in a Bento box! Click any project to open it right inside the site.';
        } else {
          // 4. Footer (#contact): Character returns to full size on the right side
          nextSectionMode = 'footer';
          nextIsBadge = false;
          nextIsWalking = false;
          nextLeft = 75;
          nextTop = 58;
          nextMood = 'wave';
          nextSpeech = "Got a project? Click my email to copy it or let's connect on LinkedIn & GitHub!";
        }
      }

      // If in-website Project/Certification Window is open, lock character in bottom-left badge mode
      if (activeWindowSlug) {
        nextSectionMode = 'bento';
        nextIsBadge = true;
        nextIsWalking = false;
        nextMood = 'champion';
      }

      setAutoOutfit((prev) => (prev !== nextAutoOutfit ? nextAutoOutfit : prev));
      if (scrollY >= vh * 0.35 || activeWindowSlug) {
        setSpeechText(nextSpeech);
      }

      setStageState((prev) => {
        if (
          Math.abs(prev.leftPercent - nextLeft) < 0.1 &&
          Math.abs(prev.topPercent - nextTop) < 0.1 &&
          prev.isBadge === nextIsBadge &&
          prev.isWalking === nextIsWalking &&
          prev.walkDirection === nextWalkDir &&
          prev.mood === nextMood &&
          prev.sectionMode === nextSectionMode
        ) {
          return prev;
        }
        return {
          leftPercent: nextLeft,
          topPercent: nextTop,
          isBadge: nextIsBadge,
          isWalking: nextIsWalking,
          walkDirection: nextWalkDir,
          mood: nextMood,
          sectionMode: nextSectionMode,
        };
      });
    };

    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateScrollChoreography);
    };

    updateScrollChoreography();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [aboutWords.length, activeWindowSlug]);

  // ---------------------------------------------------------------------------
  // Play Phoney Audio Emoji (Chapter 2 Interactive 6-Button Quick Tray)
  // ---------------------------------------------------------------------------
  const handlePlayPhoneyEmoji = useCallback(
    (emojiItem) => {
      soundEngine.playPhoneyEmoji(emojiItem.id);
      setPlayingEmojiId(emojiItem.id);
      setFloatingEmoji(emojiItem.emoji);
      setTrickState((prev) => ({
        name: emojiItem.id === 'cheer' || emojiItem.id === 'yay' ? 'dance' : 'spin',
        nonce: prev.nonce + 1,
      }));
      sayTemporarily(emojiItem.quip, 4200);

      setTimeout(() => {
        setPlayingEmojiId((curr) => (curr === emojiItem.id ? null : curr));
      }, 650);
      setTimeout(() => {
        setFloatingEmoji((curr) => (curr === emojiItem.emoji ? null : curr));
      }, 1150);
    },
    [sayTemporarily]
  );

  // ---------------------------------------------------------------------------
  // Open / Close In-Website Project or Certification Window
  // ---------------------------------------------------------------------------
  const openProjectWindow = useCallback((slug, type = 'project') => {
    soundEngine.openWindow();
    setActiveWindowType(type);
    setActiveWindowSlug(slug);
    setWindowCommentIdx(0);
    setMenuOpen(false);
    requestAnimationFrame(() => {
      if (projectWindowRef.current) {
        projectWindowRef.current.scrollTo({ top: 0, behavior: 'instant' });
      }
    });
  }, []);

  const closeProjectWindow = useCallback(() => {
    soundEngine.closeWindow();
    setActiveWindowSlug(null);
  }, []);

  // Close window on Escape key
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (activeWindowSlug) closeProjectWindow();
        if (menuOpen) setMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeWindowSlug, closeProjectWindow, menuOpen]);

  // Update bottom-left character commentary bubble as user scrolls inside .project-window
  const handleProjectWindowScroll = useCallback((e) => {
    const el = e.currentTarget;
    const maxScroll = Math.max(1, el.scrollHeight - el.clientHeight);
    const ratio = clamp(el.scrollTop / maxScroll, 0, 1);
    const nextIdx = ratio < 0.34 ? 0 : ratio < 0.72 ? 1 : 2;
    setWindowCommentIdx((prev) => {
      if (prev !== nextIdx) {
        soundEngine.blip(nextIdx + 2);
      }
      return nextIdx;
    });
  }, []);

  // ---------------------------------------------------------------------------
  // Character Hover Tickle / Sneeze + Grab Start
  // ---------------------------------------------------------------------------
  const handleCharacterPointerMove = useCallback(
    (e) => {
      if (isGrabbed || stageState.isBadge) return;
      const now = performance.now();
      if (now < hoverShakeRef.current.cooldownUntil) return;

      const dx = Math.abs(e.clientX - hoverShakeRef.current.lastX);
      const dy = Math.abs(e.clientY - hoverShakeRef.current.lastY);
      hoverShakeRef.current.lastX = e.clientX;
      hoverShakeRef.current.lastY = e.clientY;

      if (dx + dy < 120) {
        hoverShakeRef.current.score = hoverShakeRef.current.score * 0.9 + (dx + dy);
      }

      if (hoverShakeRef.current.score > 460) {
        hoverShakeRef.current.score = 0;
        hoverShakeRef.current.cooldownUntil = now + 4500;
        if (Math.random() > 0.35) {
          soundEngine.giggle();
          setTrickState((prev) => ({ name: 'dance', nonce: prev.nonce + 1 }));
          sayTemporarily("😆 Stop, stop! I'm ticklish!", 3600);
        } else {
          soundEngine.sneeze();
          setTrickState((prev) => ({ name: 'sneeze', nonce: prev.nonce + 1 }));
          sayTemporarily('🤧 Achoo! Sorry, cursor dust.', 3600);
        }
      }
    },
    [isGrabbed, sayTemporarily, stageState.isBadge]
  );

  const handleCharacterPointerDown = useCallback(
    (e) => {
      if (stageState.isBadge) {
        setMenuOpen((prev) => !prev);
        soundEngine.pop();
        return;
      }
      setIsGrabbed(true);
      soundEngine.grab();
      dragStartRef.current = {
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
        lastX: e.clientX,
        lastY: e.clientY,
        shakeScore: 0,
      };
    },
    [dragOffset.x, dragOffset.y, stageState.isBadge]
  );

  const handleCopyEmail = useCallback(() => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(OWNER_PROFILE.email).catch(() => {});
    }
    soundEngine.Sparkle();
    setEmailCopied(true);
    sayTemporarily(`📋 Copied ${OWNER_PROFILE.email}! Talk soon.`, 4200);
    setTimeout(() => setEmailCopied(false), 3200);
  }, [sayTemporarily]);

  // Active Window Data Resolution
  const activeWindowItem = useMemo(() => {
    if (!activeWindowSlug) return null;
    if (activeWindowType === 'cert') {
      return CERTIFICATIONS_BY_SLUG.get(activeWindowSlug) || null;
    }
    return ALL_WORK_BY_SLUG.get(activeWindowSlug) || null;
  }, [activeWindowSlug, activeWindowType]);

  const adjacentWindowProjects = useMemo(() => {
    if (!activeWindowSlug || activeWindowType !== 'project') return null;
    return getAdjacentProjects(activeWindowSlug);
  }, [activeWindowSlug, activeWindowType]);

  // Determine live speech bubble text (override > project window commentary > scroll state)
  const displayedSpeech = useMemo(() => {
    if (speechOverride) return speechOverride;
    if (activeWindowItem) {
      if (activeWindowType === 'project' && activeWindowItem.commentary?.length) {
        const idx = clamp(windowCommentIdx, 0, activeWindowItem.commentary.length - 1);
        return activeWindowItem.commentary[idx];
      }
      if (activeWindowType === 'cert') {
        return activeWindowItem.appliedInWork || activeWindowItem.summary;
      }
    }
    return speechText;
  }, [activeWindowItem, activeWindowType, speechOverride, speechText, windowCommentIdx]);

  // Compute Mascot Stage fixed position style
  const mascotStageStyle = stageState.isBadge
    ? {
        left: '74px',
        top: 'calc(100vh - 78px)',
        transform: 'translate(-50%, -50%)',
      }
    : {
        left: `${stageState.leftPercent}%`,
        top: `${stageState.topPercent}%`,
        transform: `translate(calc(-50% + ${dragOffset.x}px), calc(-50% + ${dragOffset.y}px))`,
        transition: isGrabbed
          ? 'none'
          : 'left 0.28s cubic-bezier(0.22, 1, 0.36, 1), top 0.28s cubic-bezier(0.22, 1, 0.36, 1)',
      };

  return (
    <>
      {/* Whole-Viewport 3D LEGO Baseplate Stud Matrix + Batman Nocturnal Glow */}
      <div id="lego-stud-bg" aria-hidden="true" />
      <div id="batsignal-glow" aria-hidden="true" />

      {/* Floating Sound Toggle (Bottom Right) */}
      <div className="floating-controls">
        <button
          type="button"
          className="button button--small sound-toggle"
          onClick={() => {
            const muted = soundEngine.toggleMute();
            setSoundMuted(muted);
            if (!muted) soundEngine.pop();
          }}
          title={soundMuted ? 'Unmute interactive sound effects' : 'Mute interactive sound effects'}
          aria-label="Toggle sound effects"
        >
          {soundMuted ? '🔇' : '🔊'}
        </button>
      </div>

      {/* Choreographed 3D LEGO Character Stage (Tracks Cursor, Walks R->L, Points, Morphs to Badge) */}
      <div
        className={`mascot-stage ${stageState.isBadge ? 'is-badge' : ''} ${
          isGrabbed ? 'is-grabbing' : ''
        }`}
        style={mascotStageStyle}
      >
        {/* Speech Cloud Over/Beside Character */}
        {displayedSpeech && !menuOpen && (
          <div
            className="mascot-bubble"
            onClick={() => {
              soundEngine.pop();
              setMenuOpen(true);
            }}
            title="Click to open tricks & outfits"
          >
            {displayedSpeech}
          </div>
        )}

        {/* Floating Audio Emoji Burst */}
        {floatingEmoji && <div className="floating-emoji-burst">{floatingEmoji}</div>}

        {/* Trick & Dress-Up Popover Menu (.mascot-menu) */}
        {menuOpen && (
          <div className="mascot-menu" role="dialog" aria-label="Character tricks and outfits">
            <div className="mascot-menu__header">
              <span>What should I do?</span>
              <button
                type="button"
                className="mascot-menu__close"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>

            <div className="mascot-menu__section-label">Do a trick</div>
            <div className="mascot-menu__grid">
              {MASCOT_TRICKS.map((trick) => (
                <button
                  key={trick.id}
                  type="button"
                  className="mascot-menu__btn"
                  onClick={() => {
                    triggerTrick(trick.id);
                    setMenuOpen(false);
                  }}
                >
                  {trick.label}
                </button>
              ))}
            </div>

            <div className="mascot-menu__section-label">Dress me up</div>
            <div className="mascot-menu__grid">
              {OUTFITS.map((outfit) => (
                <button
                  key={outfit.id}
                  type="button"
                  className={`mascot-menu__btn ${activeOutfitId === outfit.id ? 'is-active' : ''}`}
                  onClick={() => {
                    soundEngine.pop();
                    if (outfit.id === 'gotham') {
                      if (!batmanMode) toggleBatmanMode();
                    } else {
                      if (batmanMode) setBatmanMode(false);
                      setManualOutfit(outfit.id);
                      sayTemporarily(`👕 Switched to ${outfit.label}! ${outfit.tagline}`, 3800);
                    }
                    setMenuOpen(false);
                  }}
                >
                  {outfit.shortLabel}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 3D WebGL Minifigure Canvas */}
        <div
          className="mascot-canvas-wrap"
          onPointerMove={handleCharacterPointerMove}
          onPointerDown={handleCharacterPointerDown}
          onDoubleClick={() => {
            soundEngine.pop();
            setMenuOpen((prev) => !prev);
          }}
        >
          <LegoScene
            outfitId={activeOutfitId}
            mood={stageState.mood}
            accent={activeOutfitObj.accent}
            trickState={trickState}
            onCharacterClick={() => {
              if (!isGrabbed) {
                soundEngine.pop();
                setMenuOpen((prev) => !prev);
              }
            }}
            isWalking={stageState.isWalking}
            walkDirection={stageState.walkDirection}
            isGrabbed={isGrabbed}
            badgeMode={stageState.isBadge}
            globalPointerRef={globalPointerRef}
          />
        </div>

        {/* Under-Character Quick Controls (Dress me up / Do a trick) */}
        {!stageState.isBadge &&
          (!stageState.sectionMode ||
            stageState.sectionMode === 'hero' ||
            stageState.sectionMode === 'footer') && (
            <div className="mascot-controls">
              <button
                type="button"
                className="mascot-chip"
                onClick={() => {
                  soundEngine.pop();
                  setMenuOpen((prev) => !prev);
                }}
              >
                ✨ Do a trick
              </button>
              <button
                type="button"
                className="mascot-chip"
                onClick={() => {
                  soundEngine.pop();
                  const currIdx = OUTFITS.findIndex((o) => o.id === activeOutfitId);
                  const nextOutfit = OUTFITS[(currIdx + 1) % OUTFITS.length];
                  if (nextOutfit.id === 'gotham') {
                    toggleBatmanMode();
                  } else {
                    if (batmanMode) setBatmanMode(false);
                    setManualOutfit(nextOutfit.id);
                    sayTemporarily(`👕 Dressed in ${nextOutfit.label}!`, 3500);
                  }
                }}
              >
                👕 Dress me up ({activeOutfitObj.shortLabel})
              </button>
            </div>
          )}
      </div>

      {/* =====================================================================
          MAIN PORTFOLIO PAGE
          ===================================================================== */}
      <main className="portfolio-page">
        {/* 1. HERO SECTION — Top-Left Name/Role, Top-Right Get in Touch, Plain Text on LEGO Studs */}
        <section id="hero" className="hero" ref={heroRef}>
          <header className="hero__header">
            <h1 className="hero__name">
              <span className="hero__name-primary">{OWNER_PROFILE.name}</span>
              <span className="hero__name-sub">{OWNER_PROFILE.roleTitle}</span>
            </h1>

            <div className="hero__header-actions">
              <a
                href="#contact"
                className="button button--yellow"
                onClick={() => soundEngine.pop()}
              >
                Get in touch
              </a>
            </div>
          </header>

          <div className="hero__body">
            <div className="hero__copy">
              <h2 className="hero__headline">
                {OWNER_PROFILE.heroLeadBeforeBatman}
                <button
                  type="button"
                  className="batman-trigger"
                  onClick={toggleBatmanMode}
                  title="Click to transform into Batman"
                >
                  {OWNER_PROFILE.heroBatmanWord}
                </button>
                .
              </h2>
            </div>
          </div>

          <div className="hero__scroll-cue">
            <span>↓ Scroll for the guided tour</span>
            <span>·</span>
            <span>Drag me, tickle me, or double-click for a trick</span>
          </div>
        </section>

        {/* 2. ABOUT SECTION — Character Walks Right -> Left, Then Points & Highlights Each Word with Blip Sound */}
        <section id="about" className="about" ref={aboutRef}>
          <div className="about__content">
            <span className="about__kicker">01 // GUIDED TOUR</span>
            <p className="about__text" aria-label={OWNER_PROFILE.aboutText}>
              {aboutWords.map((word, idx) => (
                <span key={idx}>
                  <span className={`about__word ${idx < aboutLitCount ? 'is-lit' : ''}`}>
                    {word}
                  </span>
                  {idx < aboutWords.length - 1 ? ' ' : ''}
                </span>
              ))}
            </p>
          </div>
        </section>

        {/* 3. GUIDED TOUR CHAPTERS (3 Sticky Split-Screen Chapters + Phoney 6 Default Audio Emojis) */}
        <section id="tour" className="tour">
          {TOUR_CHAPTERS.map((chapter, chapterIdx) => {
            const chState = tourProgress[chapter.id] || {
              activeStep: 0,
              bubbleLitCounts: chapter.bubbles.map(() => 0),
            };
            const currentStep = chState.activeStep;

            return (
              <article
                key={chapter.id}
                id={chapter.id}
                ref={(el) => {
                  chapterRefs.current[chapter.id] = el;
                }}
                className={`tour__chapter tour__chapter--mascot-${chapter.mascotSide}`}
              >
                {/* Chapter Title Header + View Project Button */}
                <div className="tour__header">
                  <h2 className="tour__title" aria-label={chapter.title}>
                    {chapter.title.split('').map((ch, cIdx) => (
                      <span
                        key={cIdx}
                        className="tour__char"
                        style={{ transitionDelay: `${cIdx * 18}ms` }}
                      >
                        {ch === ' ' ? '\u00A0' : ch}
                      </span>
                    ))}
                  </h2>

                  <div className="tour__header-actions">
                    <button
                      type="button"
                      className="button button--yellow"
                      onClick={() => openProjectWindow(chapter.projectSlug, 'project')}
                    >
                      View project
                    </button>
                    {chapter.hosts?.[0] && (
                      <a
                        href={chapter.hosts[0].url}
                        target="_blank"
                        rel="noreferrer"
                        className="button"
                        onClick={() => soundEngine.pop()}
                      >
                        Visit {chapter.hosts[0].label} ↗
                      </a>
                    )}
                  </div>
                </div>

                {/* Sticky Split-Screen Body: Scrolling Speech Bubbles + Sticky Desktop/Mobile Frames */}
                <div className="tour__body">
                  {/* Scrolling Speech Bubbles Column */}
                  <div className="tour__steps">
                    {chapter.bubbles.map((bubbleText, bIdx) => {
                      const words = bubbleText.split(' ');
                      const litWords = chState.bubbleLitCounts[bIdx] || 0;
                      const isBubbleVisible =
                        bIdx === 0 || (chState.bubbleVisible && chState.bubbleVisible[bIdx]);
                      const bKey = `${chapter.id}-${bIdx}`;

                      return (
                        <div
                          key={bKey}
                          ref={(el) => {
                            bubbleRefs.current[bKey] = el;
                          }}
                          className={`tour__bubble ${isBubbleVisible ? 'is-visible' : ''}`}
                        >
                          <span className="tour__bubble-step">
                            0{chapterIdx + 1}.0{bIdx + 1} // TOUR NOTE
                          </span>
                          <div>
                            {words.map((word, wIdx) => (
                              <span key={wIdx}>
                                <span
                                  className={`tour__word ${wIdx < litWords ? 'is-lit' : ''}`}
                                >
                                  {word}
                                </span>
                                {wIdx < words.length - 1 ? ' ' : ''}
                              </span>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Sticky Desktop Browser + Mobile Phone Frame + Phoney 6-Emoji Quick Tray */}
                  <div className="tour__stage">
                    <div className="tour__devices">
                      {/* Desktop Browser Frame */}
                      <div className="tour__browser">
                        <div className="tour__browser-bar">
                          <div className="tour__traffic" aria-hidden="true">
                            <span className="tour__dot tour__dot--red" />
                            <span className="tour__dot tour__dot--yellow" />
                            <span className="tour__dot tour__dot--green" />
                          </div>

                          <div className="tour__hosts">
                            {chapter.hosts.map((host) => {
                              const isHostActive =
                                !host.activeOnSteps || host.activeOnSteps.includes(currentStep);
                              return (
                                <a
                                  key={host.label}
                                  href={host.url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className={`tour__host-pill ${isHostActive ? 'is-active' : ''}`}
                                >
                                  🔒 {host.label} ↗
                                </a>
                              );
                            })}
                          </div>

                          <div className="tour__hosts">
                            {[0, 1, 2].map((sIdx) => (
                              <button
                                key={sIdx}
                                type="button"
                                className={`tour__host-pill ${
                                  currentStep === sIdx ? 'is-active' : ''
                                }`}
                                onClick={() => {
                                  soundEngine.pop();
                                  const targetBubble =
                                    bubbleRefs.current[`${chapter.id}-${sIdx}`];
                                  if (targetBubble) {
                                    targetBubble.scrollIntoView({
                                      behavior: 'smooth',
                                      block: 'center',
                                    });
                                  }
                                }}
                              >
                                {sIdx + 1}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Vertical Sliding Desktop Screen Track */}
                        <div className="tour__viewport">
                          <div
                            className="tour__screen-track"
                            style={{ '--step': currentStep }}
                          >
                            {chapter.desktopSlides.map((slide, sIdx) => (
                              <div key={sIdx} className="tour__screen">
                                <img src={slide.src} alt={slide.alt} loading="lazy" />
                                <div className="tour__screen-overlay">
                                  <span className="tour__screen-badge">{slide.badge}</span>
                                  <p className="tour__screen-caption">{slide.caption}</p>

                                  {slide.overlayPills && (
                                    <div className="tour__overlay-pills">
                                      {slide.overlayPills.map((pill) => (
                                        <span key={pill} className="tour__overlay-pill">
                                          {pill}
                                        </span>
                                      ))}
                                    </div>
                                  )}

                                  {slide.overlayStats && (
                                    <div className="tour__overlay-stats">
                                      {slide.overlayStats.map((st) => (
                                        <div key={st.label} className="tour__overlay-stat">
                                          <strong>{st.value}</strong>
                                          <span>{st.label}</span>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Overlapping Mobile Phone Frame */}
                      <div className="tour__phone">
                        <div className="tour__phone-inner">
                          <div className="tour__phone-statusbar" aria-hidden="true">
                            <span>9:41</span>
                            <span className="tour__phone-island" />
                            <span>5G 100%</span>
                          </div>
                          <div className="tour__phone-viewport">
                            <div
                              className="tour__phone-track"
                              style={{ '--step': currentStep }}
                            >
                              {chapter.mobileSlides.map((mSlide, mIdx) => (
                                <div key={mIdx} className="tour__phone-screen">
                                  <img src={mSlide.src} alt={mSlide.alt} loading="lazy" />
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Phoney's 6 Default Audio Emojis Interactive Soundboard (Chapter 2) */}
                    {chapter.hasPhoneySoundboard && (
                      <div className="phoney-tray">
                        <div className="phoney-tray__header">
                          <span className="phoney-tray__title">
                            🔊 Phoney Quick Tray · 6 Default Audio Emojis
                          </span>
                          <span className="phoney-tray__hint">
                            Press any button to hear that Audio Emoji!
                          </span>
                        </div>
                        <div className="phoney-tray__grid">
                          {PHONEY_AUDIO_EMOJIS.map((item) => (
                            <button
                              key={item.id}
                              type="button"
                              className={`phoney-emoji-btn ${
                                playingEmojiId === item.id ? 'is-playing' : ''
                              }`}
                              onClick={() => handlePlayPhoneyEmoji(item)}
                            >
                              <span className="phoney-emoji-btn__icon">{item.emoji}</span>
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

        {/* 4. ALL WORK SECTION (#work — 18 Verified Projects in Variable-Span 12-Col Bento Grid) */}
        <section id="work" className="bento-section" ref={workRef}>
          <div className="bento-section__header">
            <h2 className="bento-section__title">All work</h2>
            <span className="bento-section__count">{ALL_PROJECTS.length} projects</span>
          </div>

          <div className="bento-grid">
            {ALL_PROJECTS.map((project) => (
              <article
                key={project.slug}
                className={`bento-card ${project.bentoSpan || 'col-4'}`}
                style={{ '--card-tint': project.surfaceTint }}
                onClick={() => openProjectWindow(project.slug, 'project')}
              >
                <div className="bento-card__media">
                  {project.coverImage ? (
                    <img src={project.coverImage} alt={project.title} loading="lazy" />
                  ) : (
                    <div className="bento-card__spec-preview">
                      <span className="bento-card__badge">
                        #{project.number} · {project.category}
                      </span>
                      <pre className="bento-card__spec-code">{project.previewCode}</pre>
                    </div>
                  )}
                </div>

                <div className="bento-card__body">
                  <div className="bento-card__meta">
                    <span className="bento-card__badge">
                      #{project.number} · {project.category}
                    </span>
                    <span className="bento-card__year">{project.year}</span>
                  </div>

                  <h3 className="bento-card__title">{project.title}</h3>
                  <p className="bento-card__subtitle">{project.subtitle}</p>

                  <div className="bento-card__stack">
                    {project.stack.slice(0, 4).map((tech) => (
                      <span key={tech} className="bento-card__tag">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="bento-card__footer">
                    <span className="bento-card__open">Open in-site window →</span>
                    <a
                      href={project.liveUrl || project.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="bento-card__ext"
                      onClick={(e) => {
                        e.stopPropagation();
                        soundEngine.pop();
                      }}
                    >
                      {project.liveLabel || 'Visit ↗'}
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 5. CERTIFICATIONS SECTION (#certifications — 6 Verified Credentials in Bento Grid) */}
        <section id="certifications" className="bento-section" ref={certsRef}>
          <div className="bento-section__header">
            <h2 className="bento-section__title">Certifications</h2>
            <span className="bento-section__count">{CERTIFICATIONS.length} credentials</span>
          </div>

          <div className="bento-grid">
            {CERTIFICATIONS.map((cert) => (
              <article
                key={cert.slug}
                className={`bento-card ${cert.bentoSpan || 'col-6'}`}
                style={{ '--card-tint': cert.surfaceTint }}
                onClick={() => openProjectWindow(cert.slug, 'cert')}
              >
                <div className="bento-card__body">
                  <div className="bento-card__meta">
                    <span className="bento-card__badge">
                      {cert.number} · {cert.issuer}
                    </span>
                    <span className="bento-card__year">{cert.issueDate}</span>
                  </div>

                  <h3 className="bento-card__title">{cert.title}</h3>
                  <p className="bento-card__subtitle">{cert.summary}</p>

                  <div className="bento-card__stack">
                    {cert.skills.map((skill) => (
                      <span key={skill} className="bento-card__tag">
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="bento-card__footer">
                    <span className="bento-card__open">Inspect credential →</span>
                    <a
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="bento-card__ext"
                      onClick={(e) => {
                        e.stopPropagation();
                        soundEngine.pop();
                      }}
                    >
                      {cert.verifyLabel}
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 6. FOOTER (#contact — sebg.ch Outro Parity + Full-Size LEGO Character on Right) */}
        <footer id="contact" className="footer" ref={footerRef}>
          <div className="footer__inner">
            <div className="footer__top">
              <div className="footer__name">
                <strong>{OWNER_PROFILE.name}</strong>
                <span>{OWNER_PROFILE.roleTitle}</span>
              </div>

              <button
                type="button"
                className="button button--small"
                onClick={() => {
                  soundEngine.pop();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                ↑ Back to top
              </button>
            </div>

            <div className="footer__main">
              <h2 className="footer__title">Got a project?</h2>
              <p className="footer__subtitle">I’m taking on new work.</p>

              <div className="footer__email-row">
                <button
                  type="button"
                  className="footer__email-btn"
                  onClick={handleCopyEmail}
                  title="Click to copy email address"
                >
                  {emailCopied ? '✓ Copied avichalgoyal15@gmail.com' : OWNER_PROFILE.email}
                </button>
              </div>

              <div className="footer__links">
                <a
                  href={OWNER_PROFILE.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="footer__link"
                >
                  GitHub (avichal15) ↗
                </a>
                <a
                  href={OWNER_PROFILE.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="footer__link"
                >
                  LinkedIn (avichalgoyal007) ↗
                </a>
                <a href={`mailto:${OWNER_PROFILE.email}`} className="footer__link">
                  Send Email ↗
                </a>
                <a
                  href={OWNER_PROFILE.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="footer__link"
                >
                  Resume PDF ↗
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
                  👕 Dress me up
                </button>
                <button
                  type="button"
                  className="footer__action-btn"
                  onClick={() => {
                    const randomTrick =
                      MASCOT_TRICKS[Math.floor(Math.random() * MASCOT_TRICKS.length)];
                    triggerTrick(randomTrick.id);
                  }}
                >
                  ✨ Do a trick
                </button>
                <button
                  type="button"
                  className="footer__action-btn"
                  onClick={toggleBatmanMode}
                >
                  {batmanMode ? '☀️ Daylight Mode' : '🦇 Batman Mode'}
                </button>
              </div>
            </div>
          </div>
        </footer>
      </main>

      {/* =====================================================================
          IN-WEBSITE PROJECT & CREDENTIAL WINDOW (.project-window)
          Opens inside the site with circular flood transition, Year/Role/Stack,
          animated visual slides, bottom-left character commentary, and Next Project!
          ===================================================================== */}
      {activeWindowItem && (
        <div
          className="project-window"
          ref={projectWindowRef}
          onScroll={handleProjectWindowScroll}
          role="dialog"
          aria-modal="true"
          aria-label={activeWindowItem.title}
        >
          <div className="project-window__inner">
            {/* Sticky Top Bar: Back Button + External Visit Links */}
            <div className="project-window__topbar">
              <button type="button" className="button" onClick={closeProjectWindow}>
                ← Back to portfolio
              </button>

              <div className="project-window__actions">
                {activeWindowType === 'project' ? (
                  <>
                    {activeWindowItem.liveUrl && (
                      <a
                        href={activeWindowItem.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="button button--yellow"
                        onClick={() => soundEngine.pop()}
                      >
                        {activeWindowItem.liveLabel || 'Visit website ↗'}
                      </a>
                    )}
                    {activeWindowItem.repoUrl &&
                      activeWindowItem.repoUrl !== activeWindowItem.liveUrl && (
                        <a
                          href={activeWindowItem.repoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="button"
                          onClick={() => soundEngine.pop()}
                        >
                          {activeWindowItem.repoLabel || 'View GitHub ↗'}
                        </a>
                      )}
                  </>
                ) : (
                  <a
                    href={activeWindowItem.verifyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="button button--yellow"
                    onClick={() => soundEngine.pop()}
                  >
                    {activeWindowItem.verifyLabel}
                  </a>
                )}
              </div>
            </div>

            {/* Project / Credential Hero Metadata Card (Year, Role, Tech Stack) */}
            <div className="project-window__hero">
              <div className="project-window__kicker">
                {activeWindowType === 'project'
                  ? `PROJECT #${activeWindowItem.number} · ${activeWindowItem.category}`
                  : `CREDENTIAL ${activeWindowItem.number} · ${activeWindowItem.category}`}
              </div>
              <h2 className="project-window__title">{activeWindowItem.title}</h2>
              <p className="project-window__subtitle">
                {activeWindowItem.subtitle || activeWindowItem.summary}
              </p>

              <div className="project-window__facts">
                <div>
                  <span className="project-window__fact-label">Year</span>
                  <span className="project-window__fact-value">
                    {activeWindowItem.year || activeWindowItem.issueDate}
                  </span>
                </div>
                <div>
                  <span className="project-window__fact-label">
                    {activeWindowType === 'project' ? 'Role' : 'Issuing Organization'}
                  </span>
                  <span className="project-window__fact-value">
                    {activeWindowItem.role || activeWindowItem.issuer}
                  </span>
                </div>
                <div>
                  <span className="project-window__fact-label">
                    {activeWindowType === 'project' ? 'Tech Stack' : 'Verified Skills'}
                  </span>
                  <div className="project-window__stack">
                    {(activeWindowItem.stack || activeWindowItem.skills || []).map((t) => (
                      <span key={t} className="bento-card__tag">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Animated Visual Slides */}
            {activeWindowType === 'project' && activeWindowItem.slides?.length > 0 && (
              <div className="project-window__slides">
                {activeWindowItem.slides.map((slide, sIdx) => (
                  <figure
                    key={sIdx}
                    className="project-window__slide"
                    style={{ animationDelay: `${sIdx * 90}ms` }}
                  >
                    <img src={slide.src} alt={slide.caption} loading="lazy" />
                    <figcaption className="project-window__slide-caption">
                      0{sIdx + 1} // {slide.caption}
                    </figcaption>
                  </figure>
                ))}
              </div>
            )}

            {/* Engineering Architecture & Key Highlights */}
            <div className="project-window__details">
              <h3>
                {activeWindowType === 'project'
                  ? 'Architecture & Key Outcomes'
                  : 'Credential Scope & Production Application'}
              </h3>
              <p>{activeWindowItem.summary}</p>

              {activeWindowItem.previewCode && (
                <pre
                  className="bento-card__spec-code"
                  style={{ marginBottom: '20px', fontSize: '0.84rem' }}
                >
                  {activeWindowItem.previewCode}
                </pre>
              )}

              {activeWindowItem.highlights?.length > 0 && (
                <ul className="project-window__highlights">
                  {activeWindowItem.highlights.map((item, hIdx) => (
                    <li key={hIdx}>{item}</li>
                  ))}
                </ul>
              )}

              {activeWindowItem.appliedInWork && (
                <p style={{ marginTop: '16px', fontWeight: 600 }}>
                  {activeWindowItem.appliedInWork}
                </p>
              )}
            </div>

            {/* Interactive Phoney Soundboard inside Phoney's Project Window too! */}
            {activeWindowItem.slug === 'phoney' && (
              <div className="phoney-tray" style={{ marginBottom: '42px' }}>
                <div className="phoney-tray__header">
                  <span className="phoney-tray__title">
                    🔊 Try Phoney’s 6 Default Audio Emojis Live
                  </span>
                  <span className="phoney-tray__hint">Tap any emoji button to hear it</span>
                </div>
                <div className="phoney-tray__grid">
                  {PHONEY_AUDIO_EMOJIS.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      className={`phoney-emoji-btn ${
                        playingEmojiId === item.id ? 'is-playing' : ''
                      }`}
                      onClick={() => handlePlayPhoneyEmoji(item)}
                    >
                      <span className="phoney-emoji-btn__icon">{item.emoji}</span>
                      <span className="phoney-emoji-btn__label">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom "Next Project" Smooth Window Transition */}
            {activeWindowType === 'project' && adjacentWindowProjects?.next && (
              <div
                className="project-window__next"
                onClick={() => openProjectWindow(adjacentWindowProjects.next.slug, 'project')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    openProjectWindow(adjacentWindowProjects.next.slug, 'project');
                  }
                }}
              >
                <div>
                  <span className="project-window__next-kicker">
                    NEXT PROJECT (#{adjacentWindowProjects.next.number} OF {ALL_PROJECTS.length})
                  </span>
                  <div className="project-window__next-title">
                    {adjacentWindowProjects.next.title} — {adjacentWindowProjects.next.subtitle}
                  </div>
                </div>
                <span className="button">Open next project →</span>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
