import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
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
  getAdjacentCertifications,
  getAdjacentProjects,
} from './data/portfolioData';
import LegoScene from './three/LegoScene';
import { injectProceduralLegoBaseplate } from './utils/legoBaseplateTexture';
import { soundEngine } from './utils/soundEngine';

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function SmoothTitleReveal({ text, revealed = true }) {
  const words = String(text || '').split(' ');
  let charCounter = 0;
  return (
    <span className={revealed ? 'is-title-revealed' : ''}>
      {words.map((word, wIdx) => (
        <React.Fragment key={`${word}-${wIdx}`}>
          <span className="title-reveal-word">
            {Array.from(word).map((ch, cIdx) => {
              const idx = charCounter++;
              return (
                <span key={`${cIdx}-${idx}`} className="title-char-mask">
                  <span className="title-char" style={{ '--char-i': idx }}>
                    {ch}
                  </span>
                </span>
              );
            })}
          </span>
          {wIdx < words.length - 1 ? ' ' : ''}
        </React.Fragment>
      ))}
    </span>
  );
}

const MASTERPLAYER_STUDIO_MODES = [
  {
    id: 'spin',
    slideIdx: 0,
    label: '360° 3D Garment Studio',
    swatch: '#EF4444',
    quip: 'Buyers spin 240 GSM tees in 360° WebGL and snap logos onto 5 print slots live!',
  },
  {
    id: 'crm',
    slideIdx: 1,
    label: 'Custom CRM & Top SEO',
    swatch: '#FFD500',
    quip: 'I built their custom order CRM and technical SEO — ranking them #1 on Google.',
  },
  {
    id: 'gst',
    slideIdx: 2,
    label: '22 Depts · 18% GST Engine',
    swatch: '#14B8A6',
    quip: 'Calculates bulk tier discounts and 18% GST input credit across 22 merch categories.',
  },
];

export default function App() {
  // -------------------------------------------------------------------------
  // CORE APP STATE
  // -------------------------------------------------------------------------
  const [batmanMode, setBatmanMode] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTrick, setActiveTrick] = useState(null);
  const [manualOutfit, setManualOutfit] = useState('classic');
  const [playingEmojiId, setPlayingEmojiId] = useState(null);
  const [activeEmotion, setActiveEmotion] = useState('neutral');
  const [isReadingActive, setIsReadingActive] = useState(false);
  const [scrollVelocityState, setScrollVelocityState] = useState(0);

  // Walking state: ONLY true when physically translating between sections/projects
  const [isWalkingState, setIsWalkingState] = useState(false);
  const [walkDirectionState, setWalkDirectionState] = useState(-1);

  // Active in-site Case Study Window: { type: 'project' | 'cert', slug: string } | null
  const [activeModal, setActiveModal] = useState(null);
  const [activeModalSlideIdx, setActiveModalSlideIdx] = useState(0);
  // Inside opened project: starts 'hero-right' on right side -> transitions to 'badge' when scrolling down -> 'next-right' at bottom
  const [modalMascotMode, setModalMascotMode] = useState('hero-right');
  const [modalTitleRevealed, setModalTitleRevealed] = useState(false);

  // Track which Tour chapters have entered viewport for smooth "Respawwwn"-style title arrival
  const [visibleChapters, setVisibleChapters] = useState(() => ({
    [TOUR_CHAPTERS[0]?.id]: true,
  }));

  // Guided tour active step per chapter: { [chapterId]: 0 | 1 | 2 }
  const [chapterSteps, setChapterSteps] = useState(() =>
    Object.fromEntries(TOUR_CHAPTERS.map((ch) => [ch.id, 0]))
  );

  // Scroll illumination word count for #about (0 = none lit, 1 = first word lit, etc.)
  const [aboutLitCount, setAboutLitCount] = useState(0);

  // Mascot speech & stage state (Speech bubble renders ABOVE character's head)
  const [speechText, setSpeechText] = useState(HERO_IDLE_QUIPS[0]);
  const [speechLitCount, setSpeechLitCount] = useState(1);
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
    mood: 'neutral',
  });

  // -------------------------------------------------------------------------
  // REFS FOR 60FPS PHYSICS, DRAG, PIXEL DISSOLVE & SCROLL CHOREOGRAPHY
  // -------------------------------------------------------------------------
  const mascotAnchorRef = useRef(null);
  const mascotMenuRef = useRef(null);
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const workRef = useRef(null);
  const certsRef = useRef(null);
  const footerRef = useRef(null);
  const chapterRefs = useRef({});
  const bubbleRefs = useRef({});
  const pixelCanvasRefs = useRef({});
  const prevChapterStepsRef = useRef({});
  const modalScrollRef = useRef(null);
  const morphSourceRectRef = useRef(null);
  const caseCoverRef = useRef(null);

  const globalPointerRef = useRef({ x: 0, y: 0 });
  const scrollVelocityRef = useRef(0);
  const lastScrollYRef = useRef(typeof window !== 'undefined' ? window.scrollY : 0);
  const lastScrollTimeRef = useRef(0);
  const scrollStopTimerRef = useRef(null);
  const customSpeechUntilRef = useRef(0);
  const emotionResetTimerRef = useRef(null);
  const readingPulseTimerRef = useRef(null);
  const speechWordTimerRef = useRef(null);
  const speechDelayTimerRef = useRef(null);
  const currentRecitedTextRef = useRef('');
  const scrollSpeechLitRef = useRef(1);
  const aboutCurrentCountRef = useRef(0);
  const aboutTargetCountRef = useRef(0);
  const lastSpokenSectionRef = useRef('hero');
  const tickleCounterRef = useRef(0);
  const lastTickleTimeRef = useRef(0);
  const lastMascotTapRef = useRef(0);
  const isWalkingRef = useRef(false);
  const walkDirRef = useRef(-1);

  // Mascot position physics (viewport pixel coordinates)
  const posRef = useRef({
    x: typeof window !== 'undefined' ? window.innerWidth * 0.78 : 960,
    y: typeof window !== 'undefined' ? window.innerHeight * 0.584 : 460,
    vx: 0,
    vy: 0,
    targetX: typeof window !== 'undefined' ? window.innerWidth * 0.78 : 960,
    targetY: typeof window !== 'undefined' ? window.innerHeight * 0.584 : 460,
    isDragging: false,
    dragOffsetX: 0,
    dragOffsetY: 0,
    hasCustomDropPos: false,
    customX: 0,
    customY: 0,
  });

  const [isDraggingState, setIsDraggingState] = useState(false);

  // -------------------------------------------------------------------------
  // INJECT PROCEDURAL 3D LEGO BASEPLATE TEXTURE ON MOUNT
  // -------------------------------------------------------------------------
  useEffect(() => {
    injectProceduralLegoBaseplate(72);
  }, []);

  // -------------------------------------------------------------------------
  // COMPUTED OUTFIT
  // -------------------------------------------------------------------------
  const activeOutfitId = useMemo(() => {
    if (batmanMode) return 'gotham';
    if (manualOutfit && manualOutfit !== 'classic') return manualOutfit;
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
  // HELPER: TRIGGER TEMPORARY FACIAL EMOTION
  // -------------------------------------------------------------------------
  const triggerEmotion = useCallback((emotionName, durationMs = 2000) => {
    if (emotionResetTimerRef.current) {
      clearTimeout(emotionResetTimerRef.current);
    }
    setActiveEmotion(emotionName);
    emotionResetTimerRef.current = setTimeout(() => {
      setActiveEmotion('neutral');
    }, durationMs);
  }, []);

  // -------------------------------------------------------------------------
  // HELPER: PULSE LIP MOVEMENT WHILE CHARACTER READS / SPEAKS WORDS
  // -------------------------------------------------------------------------
  const pulseLipMovement = useCallback((durationMs = 230) => {
    setIsReadingActive(true);
    if (readingPulseTimerRef.current) {
      clearTimeout(readingPulseTimerRef.current);
    }
    readingPulseTimerRef.current = setTimeout(() => {
      setIsReadingActive(false);
    }, durationMs);
  }, []);

  // -------------------------------------------------------------------------
  // HELPER: RECITE ANY BUBBLE SENTENCE WORD-BY-WORD STARTING FROM WORD #1 (IDX 0)
  // -------------------------------------------------------------------------
  const reciteBubbleSentence = useCallback(
    (text, options = {}) => {
      const { speechDelayMs = 0, silentSpeech = false, forceRestart = false } = options;
      const cleanText = String(text || '').trim();
      if (!cleanText) return;

      if (!forceRestart && currentRecitedTextRef.current === cleanText) {
        return;
      }
      currentRecitedTextRef.current = cleanText;

      if (speechWordTimerRef.current) {
        clearInterval(speechWordTimerRef.current);
        speechWordTimerRef.current = null;
      }
      if (speechDelayTimerRef.current) {
        clearTimeout(speechDelayTimerRef.current);
        speechDelayTimerRef.current = null;
      }

      const words = cleanText.split(/\s+/).filter(Boolean);
      setSpeechText(cleanText);
      setSpeechVisible(true);

      if (words.length === 0) {
        setSpeechLitCount(0);
        return;
      }

      const startReadingWords = () => {
        let idx = 0;
        const stepWord = () => {
          if (idx >= words.length) {
            setSpeechLitCount(words.length);
            if (speechWordTimerRef.current) {
              clearInterval(speechWordTimerRef.current);
              speechWordTimerRef.current = null;
            }
            return;
          }
          // If the character is still walking across the screen into this section,
          // keep ONLY the very first word (idx = 0, e.g. "MediStudyGo") lit until walking finishes!
          if (idx > 0 && isWalkingRef.current && !options.ignoreWalk) {
            setSpeechLitCount(1);
            return;
          }
          // Highlight sequentially from the very first word (idx = 0 -> count = 1, idx = 1 -> count = 2, ...)
          setSpeechLitCount(idx + 1);
          pulseLipMovement(190);
          if (!silentSpeech) {
            soundEngine.speakWord(words[idx], idx);
          }
          idx += 1;
        };

        stepWord();
        if (words.length > 1) {
          speechWordTimerRef.current = setInterval(stepWord, 145);
        }
      };

      if (speechDelayMs > 0) {
        setSpeechLitCount(0);
        speechDelayTimerRef.current = setTimeout(startReadingWords, speechDelayMs);
      } else {
        startReadingWords();
      }
    },
    [pulseLipMovement]
  );

  // -------------------------------------------------------------------------
  // HELPER: SCROLL-SYNCHRONIZED WORD-BY-WORD SPEECH (SPEED DEPENDS ON USER SCROLL)
  // At scrollProgress = 0, ONLY word #1 (e.g. "MediStudyGo") is lit/spoken;
  // subsequent words are ONLY read as the user scrolls further!
  // -------------------------------------------------------------------------
  const syncScrollSpeech = useCallback(
    (text, scrollProgress, options = {}) => {
      const { silentOnInit = false } = options;
      const cleanText = String(text || '').trim();
      if (!cleanText) return;

      if (speechWordTimerRef.current) {
        clearInterval(speechWordTimerRef.current);
        speechWordTimerRef.current = null;
      }
      if (speechDelayTimerRef.current) {
        clearTimeout(speechDelayTimerRef.current);
        speechDelayTimerRef.current = null;
      }

      const words = cleanText.split(/\s+/).filter(Boolean);
      if (words.length === 0) return;

      const p = clamp(scrollProgress, 0, 1);
      const targetLit = Math.min(
        words.length,
        Math.max(1, 1 + Math.floor(p * (words.length - 0.01)))
      );

      setSpeechText(cleanText);
      setSpeechVisible(true);

      if (currentRecitedTextRef.current !== cleanText) {
        currentRecitedTextRef.current = cleanText;
        scrollSpeechLitRef.current = targetLit;
        setSpeechLitCount(targetLit);
        if (!silentOnInit) {
          soundEngine.speakWord(words[targetLit - 1], targetLit - 1);
          pulseLipMovement(185);
        }
      } else if (targetLit !== scrollSpeechLitRef.current) {
        if (targetLit > scrollSpeechLitRef.current) {
          soundEngine.speakWord(words[targetLit - 1], targetLit - 1);
          pulseLipMovement(185);
        }
        scrollSpeechLitRef.current = targetLit;
        setSpeechLitCount(targetLit);
      }
    },
    [pulseLipMovement]
  );

  // Initialize Hero greeting on mount with word #1 lit (waits for user scroll to read further)
  useEffect(() => {
    const timer = setTimeout(() => {
      syncScrollSpeech(HERO_IDLE_QUIPS[0], 0, { silentOnInit: true });
    }, 0);
    return () => {
      clearTimeout(timer);
      if (speechWordTimerRef.current) clearInterval(speechWordTimerRef.current);
      if (speechDelayTimerRef.current) clearTimeout(speechDelayTimerRef.current);
    };
  }, [syncScrollSpeech]);

  // -------------------------------------------------------------------------
  // HELPER: SPEAK TEMPORARY LINE ABOVE HEAD (WORD-BY-WORD LIP SYNC + VOICE)
  // -------------------------------------------------------------------------
  const sayTemporarily = useCallback(
    (text, durationMs = 3600, mood = 'happy', emotionOverride = null, options = {}) => {
      const { speechDelayMs = 0, silentSpeech = false } = options;
      customSpeechUntilRef.current = performance.now() + durationMs + speechDelayMs;
      setStageState((prev) => ({ ...prev, mood }));
      if (emotionOverride) {
        triggerEmotion(emotionOverride, durationMs + speechDelayMs);
      }
      reciteBubbleSentence(text, {
        speechDelayMs,
        silentSpeech,
        forceRestart: true,
      });
    },
    [triggerEmotion, reciteBubbleSentence]
  );

  // -------------------------------------------------------------------------
  // UNPIXELATING MOSAIC DISSOLVE WHEN TOUR SLIDE CHANGES (SEBG.CH EFFECT)
  // -------------------------------------------------------------------------
  const runUnpixelateTransition = useCallback((chapterId) => {
    const canvas = pixelCanvasRefs.current[chapterId];
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = (canvas.width = 320);
    const h = (canvas.height = 200);
    canvas.classList.add('is-active');

    const steps = [24, 14, 8, 4];
    let stepIdx = 0;

    const drawStep = () => {
      if (stepIdx >= steps.length) {
        ctx.clearRect(0, 0, w, h);
        canvas.classList.remove('is-active');
        return;
      }
      const blockSize = steps[stepIdx];
      const alpha = 0.34 - stepIdx * 0.075;
      ctx.clearRect(0, 0, w, h);

      for (let y = 0; y < h; y += blockSize) {
        for (let x = 0; x < w; x += blockSize) {
          if ((x + y + stepIdx * 7) % 3 === 0) continue;
          const isAccent = (x * 13 + y * 7 + stepIdx) % 11 === 0;
          ctx.fillStyle = isAccent
            ? `rgba(255, 213, 0, ${alpha})`
            : `rgba(244, 241, 234, ${alpha})`;
          ctx.fillRect(x, y, blockSize - 1, blockSize - 1);
        }
      }
      stepIdx += 1;
      setTimeout(drawStep, 55);
    };

    drawStep();
  }, []);

  useEffect(() => {
    for (const ch of TOUR_CHAPTERS) {
      const prevStep = prevChapterStepsRef.current[ch.id];
      const nextStep = chapterSteps[ch.id] || 0;
      if (prevStep !== undefined && prevStep !== nextStep) {
        runUnpixelateTransition(ch.id);
      }
      prevChapterStepsRef.current[ch.id] = nextStep;
    }
  }, [chapterSteps, runUnpixelateTransition]);

  // -------------------------------------------------------------------------
  // TOGGLE SOUND ENGINE
  // -------------------------------------------------------------------------
  const handleToggleSound = useCallback(() => {
    const nextState = soundEngine.toggle();
    setSoundEnabled(nextState);
    if (nextState) {
      sayTemporarily(
        "Sound effects enabled! Try Phoney's Audio Emojis or my tricks.",
        3200,
        'happy',
        'laugh'
      );
    }
  }, [sayTemporarily]);

  // -------------------------------------------------------------------------
  // TOGGLE LEGO BATMAN ("BATCAVE & BATCOMPUTER") MODE
  // -------------------------------------------------------------------------
  const applyBatmanMode = useCallback(
    (next) => {
      setBatmanMode(next);
      document.body.classList.toggle('batman-mode', next);
      soundEngine.setBatmanMode(next);
      soundEngine.batmanTransform(next);
      if (next) {
        setManualOutfit('gotham');
        sayTemporarily(OWNER_PROFILE.batmanHeroQuip, 4800, 'surprised', 'surprised', {
          speechDelayMs: 520,
        });
      } else {
        setManualOutfit('classic');
        sayTemporarily('Back to daylight LEGO studio mode!', 3000, 'happy', 'laugh', {
          speechDelayMs: 220,
        });
      }
    },
    [sayTemporarily]
  );

  const toggleBatmanMode = useCallback(() => {
    applyBatmanMode(!batmanMode);
  }, [batmanMode, applyBatmanMode]);

  // -------------------------------------------------------------------------
  // SELECT OUTFIT FROM "DRESS ME UP" MENU
  // -------------------------------------------------------------------------
  const handleSelectOutfit = useCallback(
    (outfitId) => {
      setMenuOpen(false);
      if (outfitId === 'gotham') {
        applyBatmanMode(true);
        return;
      }
      if (batmanMode) {
        setBatmanMode(false);
        document.body.classList.remove('batman-mode');
        soundEngine.setBatmanMode(false);
      }
      setManualOutfit(outfitId);
      soundEngine.pop();
      const found = OUTFITS.find((o) => o.id === outfitId);
      if (found) {
        sayTemporarily(`Switched to ${found.label}! ${found.tagline}`, 3200, 'happy', 'laugh');
      }
    },
    [batmanMode, applyBatmanMode, sayTemporarily]
  );

  // -------------------------------------------------------------------------
  // TRIGGER CHARACTER TRICK
  // -------------------------------------------------------------------------
  const triggerTrick = useCallback(
    (trickId) => {
      setActiveTrick(trickId);
      setMenuOpen(false);
      soundEngine.playTrickSound(trickId);

      const trickQuips = {
        dance: 'Watch the footwork! 60fps procedural groove.',
        backflip: 'Alley-oop! Clean 360° backflip.',
        spin: 'Spinning into production at full velocity!',
        superhero: 'Superhero landing! Hard on the plastic knees.',
        panic: 'PROD IS DOWN! Just kidding, all checks are green.',
        fly: 'Taking off! Zero-gravity minifigure flight mode.',
        vanish: 'Going incognito... and back!',
        hiccup: '*Hic!* Excuse me, too much espresso.',
        peekaboo: 'Peekaboo! You found me.',
        selfie: 'Say cheese! Capturing the good angle.',
        dizzy: 'Whoa... the room is spinning.',
        sneeze: 'ACHOO! Pardon the plastic dust.',
        sulk: 'Hmph. Click a project to cheer me up!',
      };

      const trickEmotions = {
        dance: 'laugh',
        backflip: 'wow',
        spin: 'surprised',
        superhero: 'wow',
        panic: 'surprised',
        fly: 'laugh',
        vanish: 'cheeky',
        hiccup: 'surprised',
        peekaboo: 'laugh',
        selfie: 'cheeky',
        dizzy: 'surprised',
        sneeze: 'surprised',
        sulk: 'sad',
      };

      sayTemporarily(
        trickQuips[trickId] || `Performing ${trickId}!`,
        2800,
        'happy',
        trickEmotions[trickId] || 'laugh',
        { speechDelayMs: 440 }
      );
      const timer = setTimeout(() => {
        setActiveTrick((curr) => (curr === trickId ? null : curr));
      }, 2400);
      return () => clearTimeout(timer);
    },
    [sayTemporarily]
  );

  // -------------------------------------------------------------------------
  // PLAY PHONEY AUDIO EMOJI (EXACT WAV + FACIAL EMOTION)
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
      const targetEmotion =
        emojiItem.id === 'wow' ? 'wow' : emojiItem.emotion || 'laugh';
      sayTemporarily(emojiItem.quip, 3200, targetEmotion, targetEmotion, {
        silentSpeech: true,
      });
      setStageState((prev) => ({ ...prev, gesture: 'cheer' }));

      setTimeout(() => {
        setPlayingEmojiId((curr) => (curr === emojiItem.id ? null : curr));
        setStageState((prev) => ({
          ...prev,
          gesture: prev.gesture === 'cheer' ? null : prev.gesture,
        }));
      }, 1250);
    },
    [sayTemporarily]
  );

  // -------------------------------------------------------------------------
  // MANUAL SLIDE SWITCHER KEYCAP HANDLER (1, 2, 3)
  // -------------------------------------------------------------------------
  const handleSelectChapterSlide = useCallback(
    (chapterId, slideIdx, e) => {
      if (e) e.stopPropagation();
      soundEngine.click();
      setChapterSteps((prev) => ({ ...prev, [chapterId]: slideIdx }));
      const ch = TOUR_CHAPTERS.find((c) => c.id === chapterId);
      if (ch && ch.bubbles[slideIdx]) {
        sayTemporarily(ch.bubbles[slideIdx], 3800, 'happy', null, { speechDelayMs: 90 });
      }
      const bKey = `${chapterId}-${slideIdx}`;
      const bEl = bubbleRefs.current[bKey];
      if (bEl) {
        bEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    },
    [sayTemporarily]
  );

  // -------------------------------------------------------------------------
  // OPEN / CLOSE IN-SITE CASE STUDY WINDOW WITH FLIP IMAGE ENLARGEMENT & BG SWEEP
  // -------------------------------------------------------------------------
  const applyMorphOrigin = useCallback((sourceEl, clickEvent) => {
    if (typeof window === 'undefined') return;
    let mediaEl = sourceEl;
    const nextSec = sourceEl?.closest?.('.case-next');
    if (sourceEl?.querySelector) {
      mediaEl =
        sourceEl.querySelector('.tour__browser, .bento-card__media, .case-next__preview, img') ||
        sourceEl;
    }
    if (mediaEl === sourceEl && sourceEl?.closest) {
      const chapter = sourceEl.closest('.tour__chapter');
      if (chapter) {
        mediaEl = chapter.querySelector('.tour__browser') || sourceEl;
      } else if (nextSec) {
        mediaEl = nextSec.querySelector('.case-next__preview') || sourceEl;
      }
    }

    if (mediaEl?.getBoundingClientRect) {
      const rect = mediaEl.getBoundingClientRect();
      morphSourceRectRef.current = {
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
        isFromNext: Boolean(nextSec),
      };
      const clickX = clickEvent?.clientX ?? rect.left + rect.width / 2;
      const clickY = clickEvent?.clientY ?? rect.top + rect.height / 2;
      document.documentElement.style.setProperty('--click-x', `${clickX.toFixed(0)}px`);
      document.documentElement.style.setProperty('--click-y', `${clickY.toFixed(0)}px`);
    } else {
      morphSourceRectRef.current = null;
      document.documentElement.style.setProperty('--click-x', '50%');
      document.documentElement.style.setProperty('--click-y', '50%');
    }
  }, []);

  const openProjectWindow = useCallback(
    (slug, e) => {
      const project = ALL_WORK_BY_SLUG[slug];
      if (!project) return;
      applyMorphOrigin(e?.currentTarget, e);
      soundEngine.openWindow();
      setModalTitleRevealed(false);
      setModalMascotMode('hero-right');
      setActiveModal({ type: 'project', slug });
      setActiveModalSlideIdx(0);
      setMenuOpen(false);
      const firstComment =
        project.characterComments?.[0] ||
        `This is ${project.title}! Explore the full showcase and live links.`;
      sayTemporarily(firstComment, 6500, 'happy', 'laugh', { speechDelayMs: 160 });
    },
    [applyMorphOrigin, sayTemporarily]
  );

  const openCertWindow = useCallback(
    (slug, e) => {
      const cert = CERTIFICATIONS_BY_SLUG[slug];
      if (!cert) return;
      applyMorphOrigin(e?.currentTarget, e);
      soundEngine.openWindow();
      setModalTitleRevealed(false);
      setModalMascotMode('hero-right');
      setActiveModal({ type: 'cert', slug });
      setActiveModalSlideIdx(0);
      setMenuOpen(false);
      sayTemporarily(
        `Verified Credential: ${cert.title} issued by ${cert.issuer}.`,
        6000,
        'happy',
        'laugh',
        { speechDelayMs: 160 }
      );
    },
    [applyMorphOrigin, sayTemporarily]
  );

  // Smooth FLIP enlargement of the clicked project/cert image into .case-hero__cover
  useLayoutEffect(() => {
    if (!activeModal) return undefined;

    if (modalScrollRef.current) {
      const prevBehavior = modalScrollRef.current.style.scrollBehavior;
      modalScrollRef.current.style.scrollBehavior = 'auto';
      modalScrollRef.current.scrollTop = 0;
      modalScrollRef.current.style.scrollBehavior = prevBehavior;
    }

    const raf = requestAnimationFrame(() => {
      setModalTitleRevealed(true);
    });

    const coverEl = caseCoverRef.current;
    const srcRect = morphSourceRectRef.current;
    if (coverEl && srcRect && typeof coverEl.animate === 'function') {
      const targetRect = coverEl.getBoundingClientRect();
      if (targetRect.width > 20 && targetRect.height > 20) {
        let sx = clamp(srcRect.width / targetRect.width, 0.18, 1.35);
        let sy = clamp(srcRect.height / targetRect.height, 0.18, 1.35);
        let dx = srcRect.left - targetRect.left;
        let dy = srcRect.top - targetRect.top;

        // When opening the next project/credential from the bottom .case-next section,
        // .case-next__preview shares the 8-column width with .case-hero__cover (sx ≈ 1.0).
        // Start from a 0.56x preview card scale at the bottom so it enlarges smoothly just like "All Work"!
        if (srcRect.isFromNext) {
          sx = 0.56;
          sy = 0.56;
          const startWidth = targetRect.width * sx;
          const startLeft = srcRect.left + (srcRect.width - startWidth) * 0.5;
          const startTop = Math.max(srcRect.top + 24, window.innerHeight * 0.58);
          dx = startLeft - targetRect.left;
          dy = startTop - targetRect.top;
        }

        coverEl.animate(
          [
            {
              transformOrigin: '0 0',
              transform: `translate3d(${dx.toFixed(1)}px, ${dy.toFixed(1)}px, 0) scale(${sx.toFixed(3)}, ${sy.toFixed(3)})`,
            },
            {
              transformOrigin: '0 0',
              transform: 'translate3d(0px, 0px, 0) scale(1, 1)',
            },
          ],
          {
            duration: 640,
            easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
            fill: 'both',
          }
        );
      }
      morphSourceRectRef.current = null;
    }

    return () => cancelAnimationFrame(raf);
  }, [activeModal]);

  const closeWindow = useCallback(() => {
    soundEngine.closeWindow();
    setModalTitleRevealed(false);
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
  // GLOBAL POINTER TRACKING & DRAG HANDLERS
  // -------------------------------------------------------------------------
  useEffect(() => {
    lastScrollTimeRef.current = performance.now();

    const onPointerMove = (e) => {
      globalPointerRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      globalPointerRef.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
      document.documentElement.style.setProperty('--cursor-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--cursor-y', `${e.clientY}px`);

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
        sayTemporarily(
          'Solid landing! Double-click me anytime to switch outfits or do a trick.',
          3000,
          'happy',
          'laugh'
        );
      }
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerup', onPointerUp);
    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, [sayTemporarily]);

  // Periodic Hero idle quip rotation (No sleeping / closed-eye state)
  useEffect(() => {
    let quipIndex = 0;
    const interval = setInterval(() => {
      const now = performance.now();
      if (
        stageState.sectionMode === 'hero' &&
        !activeModal &&
        now > customSpeechUntilRef.current
      ) {
        if (batmanMode) {
          setSpeechText(OWNER_PROFILE.batmanHeroQuip);
        } else {
          quipIndex = (quipIndex + 1) % HERO_IDLE_QUIPS.length;
          setSpeechText(HERO_IDLE_QUIPS[quipIndex]);
        }
      }
    }, 7500);
    return () => clearInterval(interval);
  }, [stageState.sectionMode, activeModal, batmanMode]);

  // -------------------------------------------------------------------------
  // SCROLL CHOREOGRAPHY: SECTION DETECTION, ABOVE-HEAD SPEECH BUBBLE & POINTING
  // -------------------------------------------------------------------------
  useEffect(() => {
    const evaluateScroll = () => {
      const now = performance.now();
      const scrollY = window.scrollY;
      const dt = Math.max(16, now - lastScrollTimeRef.current);
      const dy = scrollY - lastScrollYRef.current;
      const vel = clamp((dy / dt) * 18, -32, 32);
      scrollVelocityRef.current = vel;
      setScrollVelocityState(vel);
      lastScrollYRef.current = scrollY;
      lastScrollTimeRef.current = now;

      if (scrollStopTimerRef.current) clearTimeout(scrollStopTimerRef.current);
      scrollStopTimerRef.current = setTimeout(() => {
        scrollVelocityRef.current = 0;
        setScrollVelocityState(0);
      }, 70);

      if (Math.abs(dy) > 25 && posRef.current.hasCustomDropPos) {
        posRef.current.hasCustomDropPos = false;
      }

      const vh = window.innerHeight;

      // 1. ABOUT WORD-BY-WORD SCROLL ILLUMINATION & VOICE + LIP MOVEMENT (100% SCROLL-DRIVEN)
      if (aboutRef.current) {
        const aboutSectionRect = aboutRef.current.getBoundingClientRect();
        const aboutWordsList = OWNER_PROFILE.aboutText.trim().split(/\s+/);
        const wordCount = aboutWordsList.length;

        // Only begin reading #about once the section enters the active stage (top <= vh * 0.50)
        const startY = vh * 0.50;
        const endY = -(aboutSectionRect.height - vh * 0.88);
        const rawP = (startY - aboutSectionRect.top) / Math.max(220, startY - endY);
        const p = clamp(rawP, 0, 1);

        const targetCount =
          aboutSectionRect.top > startY
            ? 0
            : Math.min(wordCount, Math.max(1, 1 + Math.floor(p * (wordCount - 0.01))));
        aboutTargetCountRef.current = targetCount;

        if (targetCount !== aboutCurrentCountRef.current) {
          if (targetCount > aboutCurrentCountRef.current && targetCount >= 1) {
            const spokenWord = aboutWordsList[clamp(targetCount - 1, 0, wordCount - 1)];
            soundEngine.speakWord(spokenWord, targetCount - 1);
            pulseLipMovement(190);
          }
          aboutCurrentCountRef.current = targetCount;
          setAboutLitCount(targetCount);
        }
      }

      // 2. EVALUATE GUIDED TOUR CHAPTERS & STEPS (100% SCROLL-DRIVEN PACE)
      let detectedChapter = null;
      let detectedChapterStep = 0;
      const nextBubbleProgress = {};
      const nextChapterSteps = {};
      const newlyVisibleChapters = {};

      TOUR_CHAPTERS.forEach((ch) => {
        const el = chapterRefs.current[ch.id];
        if (!el) return;
        const rect = el.getBoundingClientRect();

        if (rect.top < vh * 0.78 && rect.bottom > vh * 0.12) {
          newlyVisibleChapters[ch.id] = true;
        }

        if (rect.top < vh * 0.55 && rect.bottom > vh * 0.35) {
          detectedChapter = ch;
        }

        let activeStepForChapter = 0;
        ch.bubbles.forEach((_, idx) => {
          const bKey = `${ch.id}-${idx}`;
          const bEl = bubbleRefs.current[bKey];
          if (!bEl) return;
          const bRect = bEl.getBoundingClientRect();

          // Step 0 enters when the chapter enters (bRect.top ~ vh * 0.85), holding word #1 until vh * 0.80;
          // Steps 1 & 2 become active when bRect.top crosses vh * 0.66, holding word #1 until vh * 0.64.
          const enterY = idx === 0 ? vh * 0.80 : vh * 0.64;
          const finishY = -vh * 0.08;
          const exitY = -vh * 0.22;

          let bp = 0;
          if (bRect.top <= enterY && bRect.bottom >= exitY) {
            bp = clamp((enterY - bRect.top) / Math.max(120, enterY - finishY), 0, 1);
          } else if (bRect.bottom < exitY) {
            bp = 1;
          }

          nextBubbleProgress[bKey] = bp;

          if (bRect.top <= vh * 0.66) {
            activeStepForChapter = idx;
          }
        });

        nextChapterSteps[ch.id] = activeStepForChapter;
        if (detectedChapter && detectedChapter.id === ch.id) {
          detectedChapterStep = activeStepForChapter;
        }
      });

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

      setVisibleChapters((prev) => {
        let changed = false;
        for (const k of Object.keys(newlyVisibleChapters)) {
          if (!prev[k]) {
            changed = true;
            break;
          }
        }
        return changed ? { ...prev, ...newlyVisibleChapters } : prev;
      });

      // 3. DETERMINE ACTIVE SECTION, BASEPLATE ABS COLOR & MASCOT POSE
      const aboutRect = aboutRef.current?.getBoundingClientRect();
      const workRect = workRef.current?.getBoundingClientRect();
      const certsRect = certsRef.current?.getBoundingClientRect();
      const footerRect = footerRef.current?.getBoundingClientRect();

      let nextSectionMode = 'hero';
      let nextBg = batmanMode ? '#0B0C0E' : '#EAE6DF';
      let nextMascotSide = 'right';
      let nextOutfit = 'classic';
      let nextFacingYaw = -0.28;
      let nextPointSide = 0;
      let nextIsBadge = false;
      let nextMood = 'neutral';

      if (footerRect && footerRect.top < vh * 0.65) {
        nextSectionMode = 'footer';
        nextBg = batmanMode ? '#0B0C0E' : '#141414';
        nextMascotSide = 'right';
        nextOutfit = batmanMode ? 'gotham' : 'classic';
        nextFacingYaw = -0.35;
        nextMood = 'wave';
        if (now > customSpeechUntilRef.current) {
          lastSpokenSectionRef.current = 'footer';
          const footerBp = clamp((vh * 0.65 - footerRect.top) / Math.max(120, vh * 0.34), 0, 1);
          syncScrollSpeech(
            "Got a project or role in mind? Click my email below and let's talk!",
            footerBp
          );
        }
      } else if (certsRect && certsRect.top < vh * 0.55 && certsRect.bottom > vh * 0.25) {
        nextSectionMode = 'certs';
        nextBg = batmanMode ? '#0B0C0E' : '#EAE6DF';
        nextIsBadge = true;
        nextOutfit = batmanMode ? 'gotham' : 'classic';
        nextFacingYaw = 0.24;
        const certsLine =
          '5 verified credentials in Java DSA, Full-Stack MERN, Business Intelligence, R & Google Developer Program.';
        if (now > customSpeechUntilRef.current) {
          lastSpokenSectionRef.current = 'certs';
          const certsBp = clamp((vh * 0.55 - certsRect.top) / Math.max(120, vh * 0.38), 0, 1);
          syncScrollSpeech(certsLine, certsBp);
          setSpeechVisible(certsRect.top > vh * 0.15);
        }
      } else if (workRect && workRect.top < vh * 0.55 && workRect.bottom > vh * 0.2) {
        nextSectionMode = 'work';
        nextBg = batmanMode ? '#0B0C0E' : '#EAE6DF';
        nextIsBadge = true;
        nextOutfit = batmanMode ? 'gotham' : 'classic';
        nextFacingYaw = 0.25;
        const workLine = batmanMode
          ? OWNER_PROFILE.bentoTooltipBatman
          : OWNER_PROFILE.bentoTooltipNormal;
        if (now > customSpeechUntilRef.current) {
          lastSpokenSectionRef.current = 'work';
          const workBp = clamp((vh * 0.55 - workRect.top) / Math.max(120, vh * 0.42), 0, 1);
          syncScrollSpeech(workLine, workBp);
          setSpeechVisible(workRect.top > vh * 0.12);
        }
      } else if (detectedChapter) {
        lastSpokenSectionRef.current = 'tour';
        nextSectionMode = 'tour';
        nextBg = batmanMode ? detectedChapter.bgDark : detectedChapter.bgLight;
        nextMascotSide = detectedChapter.mascotSide;
        nextOutfit = batmanMode ? 'gotham' : detectedChapter.outfit;
        nextFacingYaw = detectedChapter.mascotSide === 'left' ? 0.36 : -0.36;
        nextPointSide = detectedChapter.mascotSide === 'left' ? 1 : -1;
        nextMood = detectedChapter.mascotSide === 'left' ? 'pointRight' : 'pointLeft';

        // Speak Tour descriptions EXCLUSIVELY in the speech bubble ABOVE the character's head,
        // driven 100% by user scroll progress (activeBp) starting from word #1 ("MediStudyGo")!
        if (now > customSpeechUntilRef.current) {
          const line =
            detectedChapter.bubbles[detectedChapterStep] || detectedChapter.bubbles[0];
          const activeBp =
            nextBubbleProgress[`${detectedChapter.id}-${detectedChapterStep}`] ?? 0;
          syncScrollSpeech(line, activeBp);
        }
      } else if (aboutRect && aboutRect.top < vh * 0.58 && aboutRect.bottom > vh * 0.25) {
        lastSpokenSectionRef.current = 'about';
        nextSectionMode = 'about';
        nextBg = batmanMode ? '#0B0C0E' : '#EAE6DF';
        nextMascotSide = 'left';
        nextOutfit = batmanMode ? 'gotham' : 'classic';
        nextFacingYaw = 0.32;
        nextPointSide = 1;
        nextMood = 'pointRight';
        if (now > customSpeechUntilRef.current) {
          setSpeechVisible(false);
        }
      } else {
        lastSpokenSectionRef.current = 'hero';
        nextSectionMode = 'hero';
        nextBg = batmanMode ? '#0B0C0E' : '#EAE6DF';
        nextMascotSide = 'right';
        nextOutfit = batmanMode ? 'gotham' : 'classic';
        nextFacingYaw = -0.28;
        nextMood = 'neutral';
        if (now > customSpeechUntilRef.current) {
          const heroLine = batmanMode ? OWNER_PROFILE.batmanHeroQuip : HERO_IDLE_QUIPS[0];
          const heroBp = clamp(scrollY / Math.max(120, vh * 0.28), 0, 1);
          syncScrollSpeech(heroLine, heroBp, { silentOnInit: scrollY < 5 });
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
          prev.pointSide === nextPointSide &&
          prev.mood === nextMood
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
          mood: nextMood,
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
  }, [batmanMode, pulseLipMovement, syncScrollSpeech]);

  // -------------------------------------------------------------------------
  // 60FPS MASCOT POSITION INTERPOLATION LOOP & WALKING TRANSLATION GATE
  // Character ONLY walks when physically moving between sections/projects!
  // -------------------------------------------------------------------------
  useEffect(() => {
    let rafId;
    const tick = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const isMobile = vw < 900;
      const p = posRef.current;

      const isBadgeNow = activeModal ? modalMascotMode === 'badge' : stageState.isBadge;
      const isProjectSizeNow = !isBadgeNow && Boolean(activeModal);

      if (isBadgeNow) {
        p.targetX = isMobile ? 58 : 74;
        p.targetY = isMobile ? vh - 64 : vh - 76;
      } else if (activeModal) {
        // Upon opening a project (or at Next Project footer), character stands on the RIGHT side at original 300x375 size!
        p.targetX = isMobile ? vw * 0.78 : vw * 0.83;
        p.targetY = isMobile ? vh * 0.78 : vh * 0.67;
      } else if (p.hasCustomDropPos) {
        p.targetX = clamp(p.customX, 80, vw - 80);
        p.targetY = clamp(p.customY, 110, vh - 90);
      } else if (stageState.sectionMode === 'hero') {
        p.targetX = isMobile ? vw * 0.5 : vw * 0.78;
        p.targetY = isMobile ? vh * 0.72 : vh * 0.584;
      } else if (stageState.sectionMode === 'about') {
        p.targetX = isMobile ? vw * 0.25 : vw * 0.145;
        p.targetY = isMobile ? vh * 0.76 : vh * 0.545;
      } else if (stageState.sectionMode === 'tour') {
        // Keep the 392x490 character size across the main page Tour chapters
        if (stageState.mascotSide === 'left') {
          p.targetX = isMobile ? vw * 0.22 : vw * 0.17;
        } else {
          p.targetX = isMobile ? vw * 0.78 : vw * 0.83;
        }
        p.targetY = isMobile ? vh * 0.78 : vh * 0.625;
      } else if (stageState.sectionMode === 'footer') {
        p.targetX = isMobile ? vw * 0.72 : vw * 0.76;
        p.targetY = isMobile ? vh * 0.64 : Math.min(vh * 0.485, vh - 295);
      }

      if (!p.isDragging) {
        const lerpStep = activeModal ? 0.145 : 0.095;
        p.vx = (p.targetX - p.x) * lerpStep;
        p.vy = (p.targetY - p.y) * lerpStep;
        p.x = lerp(p.x, p.targetX, lerpStep);
        p.y = lerp(p.y, p.targetY, lerpStep);
      }

      // Check physical translation distance to target slot:
      // Character ONLY walks when translating across the screen between projects/sections!
      const dx = p.targetX - p.x;
      const dy = p.targetY - p.y;
      const dist = Math.hypot(dx, dy);
      const shouldWalk = !isBadgeNow && !p.isDragging && dist > 28;

      if (shouldWalk !== isWalkingRef.current) {
        isWalkingRef.current = shouldWalk;
        setIsWalkingState(shouldWalk);
      }
      if (shouldWalk && Math.abs(dx) > 8) {
        const nextDir = dx >= 0 ? 1 : -1;
        if (nextDir !== walkDirRef.current) {
          walkDirRef.current = nextDir;
          setWalkDirectionState(nextDir);
        }
      }

      if (mascotAnchorRef.current) {
        mascotAnchorRef.current.style.transform = `translate3d(${p.x.toFixed(1)}px, ${p.y.toFixed(1)}px, 0)`;
      }

      if (mascotMenuRef.current) {
        const menuEl = mascotMenuRef.current;
        const mw = menuEl.offsetWidth || 424;
        const mh = menuEl.offsetHeight || 215;
        const headTopY = isBadgeNow ? p.y - 64 : isProjectSizeNow ? p.y - 108 : p.y - 210;
        const sideOffset = isProjectSizeNow ? 105 : 150;
        let menuLeft;
        let menuTop;
        if (headTopY - mh - 8 >= 68) {
          menuTop = headTopY - mh - 8;
          menuLeft = clamp(p.x - mw / 2, 16, vw - mw - 16);
        } else {
          menuTop = clamp(headTopY - mh - 8, 68, Math.max(68, vh - mh - 16));
          if (p.x > vw * 0.5) {
            menuLeft = clamp(p.x - sideOffset - mw, 16, vw - mw - 16);
          } else {
            menuLeft = clamp(p.x + sideOffset, 16, vw - mw - 16);
          }
        }
        menuEl.style.left = `${Math.round(menuLeft)}px`;
        menuEl.style.top = `${Math.round(menuTop)}px`;
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [stageState, activeModal, modalMascotMode]);

  // -------------------------------------------------------------------------
  // MASCOT INTERACTION HANDLERS (GRAB, DELIBERATE TICKLE, DOUBLE-CLICK MENU)
  // -------------------------------------------------------------------------
  const handleCharacterPointerDown = (e) => {
    if (e.button !== undefined && e.button !== 0) return;
    const p = posRef.current;
    p.isDragging = true;
    p.dragOffsetX = e.clientX - p.x;
    p.dragOffsetY = e.clientY - p.y;
    setIsDraggingState(true);
    soundEngine.grab();
    sayTemporarily(
      'Whoa! Careful with the ABS plastic hair — where are we flying?',
      2600,
      'surprised',
      'surprised'
    );
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

  // Deliberate rapid scrubbing required to tickle (never triggers on casual cursor pass)
  const handleCharacterPointerMove = () => {
    if (posRef.current.isDragging) return;
    const now = performance.now();
    if (now - lastTickleTimeRef.current < 85) {
      tickleCounterRef.current += 1;
      if (tickleCounterRef.current > 24) {
        tickleCounterRef.current = 0;
        soundEngine.giggle();
        sayTemporarily(
          'Haha, that tickles! Double-click me for a trick!',
          1100,
          'tickle',
          'tickle'
        );
      }
    } else if (now - lastTickleTimeRef.current > 350) {
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
  const adjacentCerts = useMemo(
    () => (activeModalCert ? getAdjacentCertifications(activeModalCert.slug) : null),
    [activeModalCert]
  );

  // Update character position mode (right side -> porthole bubble -> next-right) & commentary when scrolling inside the Case Study Window
  const handleModalScroll = useCallback(() => {
    if (!modalScrollRef.current) return;
    const el = modalScrollRef.current;
    const vh = window.innerHeight;
    const scrollTop = el.scrollTop;
    const maxScroll = Math.max(1, el.scrollHeight - el.clientHeight);
    const caseHeroEl = el.querySelector('.case-hero');
    const caseNextEl = el.querySelector('.case-next');
    const heroRect = caseHeroEl?.getBoundingClientRect();
    const nextRect = caseNextEl?.getBoundingClientRect();
    const hasNextItem = Boolean(adjacentProjects?.next || adjacentCerts?.next);

    // Keep character standing on the right side in its original 300x375 size
    // until the entire top section (.case-hero & cover image, which has space on the right) scrolls past!
    if (!heroRect || heroRect.bottom > vh * 0.32) {
      setModalMascotMode('hero-right');
    } else if (hasNextItem && nextRect && nextRect.top <= vh * 0.52) {
      setModalMascotMode((prev) => {
        if (prev !== 'next-right') {
          reciteBubbleSentence('Want to see another one?', { forceRestart: true });
        }
        return 'next-right';
      });
      return;
    } else {
      setModalMascotMode('badge');
    }

    if (activeModalCert) {
      const ratio = scrollTop / maxScroll;
      const certLines = [activeModalCert.summary, ...(activeModalCert.highlights || [])].filter(
        Boolean
      );
      if (certLines.length > 0) {
        const scaled = ratio * certLines.length;
        const idx = clamp(Math.floor(scaled), 0, certLines.length - 1);
        const commentProgress = clamp(scaled - idx, 0, 1);
        syncScrollSpeech(certLines[idx], commentProgress);
      }
      return;
    }

    if (!activeModalProject) return;
    const ratio = scrollTop / maxScroll;
    const comments = activeModalProject.characterComments || [];
    if (comments.length > 0) {
      const scaled = ratio * comments.length;
      const idx = clamp(Math.floor(scaled), 0, comments.length - 1);
      const commentProgress = clamp(scaled - idx, 0, 1);
      if (idx !== activeModalSlideIdx) {
        setActiveModalSlideIdx(idx);
      }
      syncScrollSpeech(comments[idx], commentProgress);
    }
  }, [
    activeModalProject,
    activeModalCert,
    activeModalSlideIdx,
    adjacentProjects,
    adjacentCerts,
    reciteBubbleSentence,
    syncScrollSpeech,
  ]);

  const isBadgeActive = activeModal ? modalMascotMode === 'badge' : stageState.isBadge;
  const isProjectPreviewSize = !isBadgeActive && Boolean(activeModal);
  const effectiveMood = activeModal
    ? modalMascotMode === 'next-right'
      ? 'pointLeft'
      : modalMascotMode === 'hero-right'
      ? 'wave'
      : 'neutral'
    : stageState.mood;
  const isFooterInView = stageState.sectionMode === 'footer' && !activeModal;

  return (
    <div className="app-shell">
      <div id="batsignal-glow" aria-hidden="true" />

      {/* =====================================================================
          CORNER SOUND TOGGLE BUTTON (NO FLOATING BUTTONS ON CHARACTER)
          ===================================================================== */}
      <button
        type="button"
        className={`button sound-toggle ${isFooterInView ? 'sound-toggle--footer-offset' : ''}`}
        aria-pressed={soundEnabled}
        aria-label={soundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
        title={soundEnabled ? 'Sound On' : 'Sound Off'}
        onClick={handleToggleSound}
      >
        {soundEnabled ? (
          <svg width="20" height="20" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M7.28 2.22a.75.75 0 0 1 .47.7v10.16a.75.75 0 0 1-1.28.53L3.44 10.5H1.75A.75.75 0 0 1 1 9.75v-3.5a.75.75 0 0 1 .75-.75h1.69l3.03-3.11a.75.75 0 0 1 .81-.17Z"
              fill="currentColor"
            />
            <path
              d="M10 5.5a3.5 3.5 0 0 1 0 5M12 3a6.5 6.5 0 0 1 0 10"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M7.28 2.22a.75.75 0 0 1 .47.7v10.16a.75.75 0 0 1-1.28.53L3.44 10.5H1.75A.75.75 0 0 1 1 9.75v-3.5a.75.75 0 0 1 .75-.75h1.69l3.03-3.11a.75.75 0 0 1 .81-.17Z"
              fill="currentColor"
            />
            <path
              d="M10.5 6l4 4m0-4l-4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        )}
      </button>

      {/* =====================================================================
          FIXED 3D MASCOT LAYER (STANDALONE INDIVIDUAL + BUBBLE ABOVE HEAD)
          ===================================================================== */}
      <div
        className={`mascot-layer ${activeModal ? 'mascot-layer--window-open' : ''}`}
        aria-live="polite"
      >
        <div
          ref={mascotAnchorRef}
          className={`mascot-anchor ${isBadgeActive ? 'is-badge' : ''} ${
            isProjectPreviewSize ? 'is-project-size' : ''
          }`}
        >
          {/* Speech Bubble Directly ABOVE Character's Head */}
          {(speechVisible || Boolean(activeModal)) && !menuOpen && (
            <div className="mascot-bubble">
              <div className="mascot-bubble__card">
                <p className="mascot-bubble__text">
                  {speechWords.map((word, idx) => {
                    const isLit = idx < speechLitCount;
                    return (
                      <span
                        key={`${word}-${idx}`}
                        className={`mascot-bubble__word ${isLit ? 'is-lit' : ''}`}
                        style={{ opacity: isLit ? 1 : 0.24 }}
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
            title="Drag me around, or double-click me to pick an outfit or trick!"
          >
            <LegoScene
              outfitId={activeOutfitId}
              mood={effectiveMood}
              emotion={activeEmotion}
              isReading={isReadingActive}
              scrollVelocity={scrollVelocityState}
              accent="#FFD500"
              trickState={activeTrick}
              onCharacterClick={handleMascotClick}
              isWalking={isWalkingState}
              walkDirection={walkDirectionState}
              isGrabbed={isDraggingState}
              badgeMode={isBadgeActive}
              globalPointerRef={globalPointerRef}
            />
          </div>
        </div>

        {/* Viewport-Clamped Dress Me Up & Trick Selection Popover Menu */}
        {menuOpen && (
          <div
            ref={mascotMenuRef}
            className="mascot-menu"
            role="dialog"
            aria-label="Mascot outfits and tricks menu"
          >
            <div className="mascot-menu__header">
              <span className="mascot-menu__title">Dress me up & Tricks</span>
              <button
                type="button"
                className="mascot-menu__close"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>

            <span className="mascot-menu__section-label">OUTFITS</span>
            <div className="mascot-menu__grid">
              {OUTFITS.map((o) => (
                <button
                  key={o.id}
                  type="button"
                  className={`mascot-menu__btn ${activeOutfitId === o.id ? 'is-active' : ''}`}
                  onClick={() => handleSelectOutfit(o.id)}
                >
                  {o.shortLabel}
                </button>
              ))}
            </div>

            <span className="mascot-menu__section-label">TRICKS</span>
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
      </div>

      {/* =====================================================================
          MAIN SCROLLING PORTFOLIO
          ===================================================================== */}
      <main>
        {/* -------------------------------------------------------------------
            1. HERO SECTION (MINIMAL TOP BAR + 3D LEGO BRICK CTAS)
            ------------------------------------------------------------------- */}
        <section ref={heroRef} id="hero" className="hero grid-page bg-grid">
          <header className="hero__top">
            <p className="hero__name">
              <span className="hero__name-primary">{OWNER_PROFILE.name}</span>
              <span className="hero__name-sub">
                {batmanMode ? OWNER_PROFILE.batmanRoleTitle : OWNER_PROFILE.roleTitle}
              </span>
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
                title="Click to toggle LEGO Batman Batcave Mode!"
              >
                <span>{OWNER_PROFILE.heroBatmanWord}.</span>
              </button>
            </h1>
          </div>
        </section>

        {/* -------------------------------------------------------------------
            2. ABOUT SECTION (STICKY WORD-BY-WORD SCROLL ILLUMINATION)
            ------------------------------------------------------------------- */}
        <section ref={aboutRef} id="about" className="about bg-grid">
          <div className="about__sticky grid-page">
            <div className="about__inner">
              <p className="about__text">
                {aboutWords.map((word, idx) => {
                  const isLit = idx < aboutLitCount;
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
            3. GUIDED TOUR CHAPTERS:
               01: MediStudyGo -> 02: Phoney -> 03: TruGifting Solutions ->
               04: Masterplayer Designs & Printing -> 05: OmniRoute Session Sync
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
                } ${visibleChapters[chapter.id] ? 'is-chapter-visible' : ''}`}
              >
                {/* Sticky 100svh Stage on the 12-Column Grid */}
                <div className="tour__stage-wrap grid-page">
                  <div className="tour__title-row">
                    <div className="tour__title-block">
                      <span className="tour__eyebrow">
                        <span className="tour__log-stud" aria-hidden="true" />
                        <span>
                          {batmanMode
                            ? chapter.batmanCode
                            : `${chapter.code} // FEATURED CASE STUDY`}
                        </span>
                      </span>
                      <h2 className="tour__title">
                        <SmoothTitleReveal
                          text={chapter.title}
                          revealed={Boolean(visibleChapters[chapter.id])}
                        />
                      </h2>
                    </div>

                    <div className="tour__actions">
                      <div
                        className="tour__slide-switchers"
                        role="group"
                        aria-label={`${chapter.title} slide switcher`}
                      >
                        {chapter.desktopSlides.map((_, sIdx) => (
                          <button
                            key={sIdx}
                            type="button"
                            className={`keycap-btn ${activeStep === sIdx ? 'is-active' : ''}`}
                            onClick={(e) => handleSelectChapterSlide(chapter.id, sIdx, e)}
                            aria-label={`Slide ${sIdx + 1}`}
                          >
                            {sIdx + 1}
                          </button>
                        ))}
                      </div>

                      <button
                        type="button"
                        className="button button--yellow"
                        onClick={(e) => openProjectWindow(chapter.projectSlug, e)}
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
                        onClick={(e) => openProjectWindow(chapter.projectSlug, e)}
                        role="button"
                        tabIndex={0}
                        aria-label={`Open ${chapter.title} full case study`}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            openProjectWindow(chapter.projectSlug, e);
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
                            <span aria-hidden="true">↗</span>
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
                                  fetchPriority={chapterIdx === 0 && sIdx === 0 ? 'high' : 'auto'}
                                />
                              </div>
                            ))}
                          </div>

                          {/* Unpixelating Mosaic Dissolve Canvas Overlay */}
                          <canvas
                            ref={(el) => {
                              pixelCanvasRefs.current[chapter.id] = el;
                            }}
                            className="tour__pixel-canvas"
                            aria-hidden="true"
                          />

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

                      {/* Overlapping 3D Dark-Metallic Smartphone Hardware with Dynamic Island */}
                      <div
                        className="tour__phone"
                        onClick={(e) => openProjectWindow(chapter.projectSlug, e)}
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

                    {/* Phoney Interactive 6-Slot Audio Emoji Quick Tray (100% Visible in Stage) */}
                    {chapter.hasPhoneySoundboard && (
                      <div
                        className="phoney-soundboard"
                        aria-label="Phoney Interactive 6-Slot Audio Emoji Quick Tray"
                      >
                        <div className="phoney-soundboard__header">
                          <span className="phoney-soundboard__badge">
                            LIVE AUDIO EMOJI QUICK TRAY
                          </span>
                          <span className="phoney-soundboard__sub">
                            Tap any keycap to hear Phoney’s real in-call sound:
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
                              {item.icon ? (
                                <img
                                  src={item.icon}
                                  alt=""
                                  className="phoney-emoji-btn__icon"
                                  aria-hidden="true"
                                />
                              ) : (
                                <span>{item.emoji}</span>
                              )}
                              <span>{item.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Masterplayer Interactive 360° 3D Customizer Studio Bar */}
                    {chapter.has3DStudioPreview && (
                      <div
                        className="mp-3d-studio-bar"
                        aria-label="Masterplayer 360° 3D Studio Controls"
                      >
                        <div className="phoney-soundboard__header">
                          <span className="phoney-soundboard__badge">
                            360° WEBGL 3D STUDIO & B2B ENGINE
                          </span>
                          <span className="phoney-soundboard__sub">
                            Inspect the 3D customizer & CRM stack:
                          </span>
                        </div>

                        <div className="phoney-soundboard__grid">
                          {MASTERPLAYER_STUDIO_MODES.map((mode) => (
                            <button
                              key={mode.id}
                              type="button"
                              className={`phoney-emoji-btn ${
                                activeStep === mode.slideIdx ? 'is-playing' : ''
                              }`}
                              onClick={(e) => {
                                handleSelectChapterSlide(chapter.id, mode.slideIdx, e);
                                sayTemporarily(mode.quip, 3600, 'pointLeft', 'laugh');
                              }}
                            >
                              <span
                                className="mp-swatch-dot"
                                style={{ backgroundColor: mode.swatch }}
                                aria-hidden="true"
                              />
                              <span>{mode.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Invisible Scroll Trigger Steps (Drives activeStep & above-head speech bubble) */}
                <div className="tour__lines grid-page" aria-hidden="true">
                  {chapter.bubbles.map((_, bIdx) => {
                    const bKey = `${chapter.id}-${bIdx}`;
                    return (
                      <div
                        key={bKey}
                        ref={(el) => {
                          bubbleRefs.current[bKey] = el;
                        }}
                        className="tour__step"
                      />
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>

        {/* -------------------------------------------------------------------
            4. ALL WORK BENTO GRID (#work — 10 APPROVED PUBLIC PROJECTS)
            ------------------------------------------------------------------- */}
        <section ref={workRef} id="work" className="bento-section bg-grid">
          <div className="bento-section__inner">
            <div className="bento-section__header">
              <h2 className="bento-section__title">All work</h2>
              <p className="bento-section__count">
                {batmanMode
                  ? `${ALL_PROJECTS.length} Classified Batcomputer Files · Click to inspect`
                  : `${ALL_PROJECTS.length} Projects · Click any card to inspect`}
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
                  onClick={(e) => openProjectWindow(project.slug, e)}
                  onMouseEnter={() => {
                    customSpeechUntilRef.current = performance.now() + 2600;
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
                      <span>#{project.number}</span>
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
                      <span className="bento-card__open">View project →</span>

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
                  onClick={(e) => openCertWindow(cert.slug, e)}
                  onMouseEnter={() => {
                    customSpeechUntilRef.current = performance.now() + 2600;
                    setSpeechText(`${cert.title} — Issued by ${cert.issuer}`);
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
            6. CONTACT FOOTER (#contact — MATTE CHARCOAL ABS #141414)
            ------------------------------------------------------------------- */}
        <footer ref={footerRef} id="contact" className="footer grid-page bg-grid">
          <div className="footer__top">
            <h2 className="footer__title">Got a project?</h2>
            <p className="footer__lead">Need a product-minded developer or AI builder? Let’s talk.</p>

            <button
              type="button"
              className="footer__email"
              onClick={() => {
                navigator.clipboard?.writeText(OWNER_PROFILE.email);
                soundEngine.playTrickSound('dance');
                setStageState((prev) => ({ ...prev, gesture: 'cheer' }));
                sayTemporarily(
                  `Copied ${OWNER_PROFILE.email} to your clipboard! Talk soon!`,
                  3800,
                  'laugh',
                  'laugh'
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
            </div>
          </div>

          <div className="footer__bottom">
            <span>© 2026 {OWNER_PROFILE.name} · Built with React 19, Three.js & WebAudio</span>

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
                onClick={() => {
                  soundEngine.pop();
                  setMenuOpen(true);
                }}
              >
                Dress me up
              </button>
              <button
                type="button"
                className="footer__action-btn"
                onClick={toggleBatmanMode}
              >
                {batmanMode ? 'Daylight Studio' : 'Batman Mode'}
              </button>
            </div>
          </div>
        </footer>
      </main>

      {/* =====================================================================
          FULL-VIEWPORT CASE STUDY WINDOW (.project-window — MORPHS FROM CARD)
          ===================================================================== */}
      {activeModalProject && (
        <div
          key={`backdrop-project-${activeModalProject.slug}`}
          className="project-window-backdrop"
          style={{
            '--window-bg': batmanMode ? '#0B0C0E' : '#EAE6DF',
            '--window-tint': batmanMode ? '#14161D' : activeModalProject.surfaceTint,
          }}
        >
          <div
            key={`project-${activeModalProject.slug}`}
            className="project-window"
            role="dialog"
            aria-modal="true"
          >
            <div className="project-window__bg-sweep" aria-hidden="true" />
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

            <div
              ref={modalScrollRef}
              className="project-window__scroll"
              onScroll={handleModalScroll}
            >
              <section className="case-hero grid-page bg-grid">
                <span className="case-hero__eyebrow">
                  <span className="tour__log-stud" aria-hidden="true" />{' '}
                  {batmanMode
                    ? `BATCOMPUTER FILE // #${activeModalProject.number} · ${activeModalProject.category}`
                    : `PROJECT ${activeModalProject.number} · ${activeModalProject.category}`}
                </span>
                <h1 className="case-hero__title">
                  <SmoothTitleReveal
                    text={activeModalProject.title}
                    revealed={modalTitleRevealed}
                  />
                </h1>

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

                <div ref={caseCoverRef} className="case-hero__cover">
                  <div className="case-browser-frame">
                    <div className="tour__browser-bar">
                      <div className="tour__dots">
                        <span className="tour__dot tour__dot--red" />
                        <span className="tour__dot tour__dot--yellow" />
                        <span className="tour__dot tour__dot--green" />
                      </div>
                      {activeModalProject.liveUrl ? (
                        <a
                          href={activeModalProject.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="tour__host-pill"
                        >
                          {activeModalProject.liveLabel || activeModalProject.title} ↗
                        </a>
                      ) : (
                        <span className="tour__host-pill">{activeModalProject.title}</span>
                      )}
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
                          TRY PHONEY’S 6 DEFAULT AUDIO EMOJIS
                        </span>
                        <span className="phoney-soundboard__sub">
                          Click any keycap to trigger the real in-call sound:
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
                            {item.icon ? (
                              <img
                                src={item.icon}
                                alt=""
                                className="phoney-emoji-btn__icon"
                                aria-hidden="true"
                              />
                            ) : (
                              <span>{item.emoji}</span>
                            )}
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

              {adjacentProjects?.next && (
                <section className="case-next grid-page bg-grid">
                  <span className="case-next__eyebrow">Next project</span>
                  <div className="case-next__header">
                    <h2 className="case-next__title">
                      <SmoothTitleReveal
                        text={adjacentProjects.next.title}
                        revealed={modalMascotMode === 'next-right' || modalTitleRevealed}
                      />
                    </h2>
                    <button
                      type="button"
                      className="button button--yellow"
                      onClick={(e) => {
                        openProjectWindow(adjacentProjects.next.slug, e);
                      }}
                    >
                      <span>View project</span>
                    </button>
                  </div>

                  <div
                    className="case-next__preview"
                    onClick={(e) => {
                      openProjectWindow(adjacentProjects.next.slug, e);
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
          key={`backdrop-cert-${activeModalCert.slug}`}
          className="project-window-backdrop"
          style={{
            '--window-bg': batmanMode ? '#0B0C0E' : '#EAE6DF',
            '--window-tint': batmanMode ? '#14161D' : activeModalCert.surfaceTint,
          }}
        >
          <div
            key={`cert-${activeModalCert.slug}`}
            className="project-window"
            role="dialog"
            aria-modal="true"
          >
            <div className="project-window__bg-sweep" aria-hidden="true" />
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

            <div
              ref={modalScrollRef}
              className="project-window__scroll"
              onScroll={handleModalScroll}
            >
              <section className="case-hero grid-page bg-grid">
                <span className="case-hero__eyebrow">
                  VERIFIED CREDENTIAL · {activeModalCert.issuer}
                </span>
                <h1 className="case-hero__title">
                  <SmoothTitleReveal
                    text={activeModalCert.title}
                    revealed={modalTitleRevealed}
                  />
                </h1>

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

                <div ref={caseCoverRef} className="case-hero__cover">
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

              {adjacentCerts?.next && (
                <section className="case-next grid-page bg-grid">
                  <span className="case-next__eyebrow">Next credential</span>
                  <div className="case-next__header">
                    <h2 className="case-next__title">
                      <SmoothTitleReveal
                        text={adjacentCerts.next.title}
                        revealed={modalMascotMode === 'next-right' || modalTitleRevealed}
                      />
                    </h2>
                    <button
                      type="button"
                      className="button button--yellow"
                      onClick={(e) => {
                        openCertWindow(adjacentCerts.next.slug, e);
                      }}
                    >
                      <span>View credential</span>
                    </button>
                  </div>

                  <div
                    className="case-next__preview"
                    onClick={(e) => {
                      openCertWindow(adjacentCerts.next.slug, e);
                    }}
                  >
                    <img
                      src={adjacentCerts.next.coverImage}
                      alt={adjacentCerts.next.title}
                    />
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
