import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  CheckCircle2,
  Clock,
  ExternalLink,
  GitBranch,
  Info,
  Layers,
  Shield,
  Sparkles,
  Sun,
} from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';
import SpeechBubble from './components/SpeechBubble';
import DeviceMockupShowcase from './components/DeviceMockupShowcase';
import PhoneyAudioWidget from './components/PhoneyAudioWidget';
import WorkDetailView from './components/WorkDetailView';
import WorkIndexView from './components/WorkIndexView';
import CertificationsView from './components/CertificationsView';
import LegoScene from './three/LegoScene';
import {
  OWNER_PROFILE,
  PERSONAL_INTRO,
  FEATURED_STORIES,
  ARCHIVE_PROJECTS,
  CERTIFICATIONS,
} from './data/portfolioData';

const TRICK_SEQUENCE = [
  { type: 'jump', label: '360° Brick Hop!', duration: 950 },
  { type: 'wave', label: 'Friendly Studio Wave!', duration: 1100 },
  { type: 'point', label: 'Check Out This Build!', duration: 950 },
];

function parseRoute(pathname) {
  const clean = (pathname || '/').replace(/\/+$/, '') || '/';
  if (clean === '/') return { view: 'home', slug: null };
  if (clean === '/work') return { view: 'work-index', slug: null };
  if (clean.startsWith('/work/')) {
    return { view: 'work-detail', slug: decodeURIComponent(clean.slice('/work/'.length)) };
  }
  if (clean === '/certifications') return { view: 'cert-index', slug: null };
  if (clean.startsWith('/certifications/')) {
    return {
      view: 'cert-detail',
      slug: decodeURIComponent(clean.slice('/certifications/'.length)),
    };
  }
  return { view: 'home', slug: null };
}

export default function App() {
  const [pathname, setPathname] = useState(() => window.location.pathname || '/');
  const [gothamMode, setGothamMode] = useState(false);
  const [scrollOutfit, setScrollOutfit] = useState('base');
  const [manualOutfit, setManualOutfit] = useState(null);
  const [trickState, setTrickState] = useState(null);
  const [activeStoryNumber, setActiveStoryNumber] = useState('00');
  const [chapterProgress, setChapterProgress] = useState({
    intro: 1,
    medistudygo: 0.35,
    phoney: 0.35,
    'trugifting-solutions': 0.35,
    'masterplayer-designs-and-printing': 0.35,
  });
  const [isDesktopViewport, setIsDesktopViewport] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth >= 1024 : true
  );
  const [reducedMotion, setReducedMotion] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  );

  const scrollProgressRef = useRef(0);
  const trickIndexRef = useRef(0);
  const trickTimerRef = useRef(null);
  const storyRefs = useRef({});
  const introRef = useRef(null);

  const route = parseRoute(pathname);
  const activeOutfit = manualOutfit || scrollOutfit;
  const effectiveOutfit = gothamMode ? 'gotham' : activeOutfit;

  // Sync theme attribute on documentElement for Gotham Mode vs Daylight Studio
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', gothamMode ? 'gotham' : 'studio');
  }, [gothamMode]);

  // Listen to viewport width & prefers-reduced-motion
  useEffect(() => {
    const onResize = () => {
      setIsDesktopViewport(window.innerWidth >= 1024);
    };
    window.addEventListener('resize', onResize, { passive: true });

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onMqChange = (e) => setReducedMotion(e.matches);
    mq.addEventListener('change', onMqChange);

    return () => {
      window.removeEventListener('resize', onResize);
      mq.removeEventListener('change', onMqChange);
    };
  }, []);

  // History API popstate listener
  useEffect(() => {
    const onPopState = () => {
      setPathname(window.location.pathname || '/');
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // Navigation handler supporting internal routes and section hashes
  const handleNavigate = useCallback((targetPath, hash = null) => {
    const cleanTarget = targetPath || '/';
    if (window.location.pathname !== cleanTarget) {
      window.history.pushState({}, '', hash ? `${cleanTarget}#${hash}` : cleanTarget);
      setPathname(cleanTarget);
    } else if (hash) {
      window.history.replaceState({}, '', `${cleanTarget}#${hash}`);
    }

    if (hash) {
      window.setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
        }
      }, 60);
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [reducedMotion]);

  // Trigger a physical trick on the 3D minifigure
  const handleTriggerTrick = useCallback(() => {
    const chosen = gothamMode
      ? { type: 'grapple', label: 'Grapple Rooftop Leap!', duration: 1050 }
      : TRICK_SEQUENCE[trickIndexRef.current % TRICK_SEQUENCE.length];
    trickIndexRef.current += 1;

    if (trickTimerRef.current) {
      window.clearTimeout(trickTimerRef.current);
    }

    setTrickState({
      ...chosen,
      until: Date.now() + chosen.duration,
    });

    trickTimerRef.current = window.setTimeout(() => {
      setTrickState(null);
    }, chosen.duration);
  }, [gothamMode]);

  // Toggle Go Gotham Mode
  const handleToggleGotham = useCallback(() => {
    const nextGotham = !gothamMode;
    setGothamMode(nextGotham);

    if (trickTimerRef.current) {
      window.clearTimeout(trickTimerRef.current);
    }

    setTrickState({
      type: 'jump',
      label: nextGotham ? 'Gotham Brick Vigilante Mode Engaged!' : 'Daylight Brick Studio Restored!',
      duration: 950,
      until: Date.now() + 950,
    });

    trickTimerRef.current = window.setTimeout(() => {
      setTrickState(null);
    }, 950);
  }, [gothamMode]);

  // Scroll listener for overall progress, active chapter outfit, and word-by-word speech bubble reading
  useEffect(() => {
    if (route.view !== 'home') return undefined;

    const updateScrollTelemetry = () => {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      scrollProgressRef.current = Math.max(0, Math.min(1, window.scrollY / maxScroll));

      const vh = Math.max(1, window.innerHeight);
      const nextProgress = {
        intro: 1,
        medistudygo: 0.35,
        phoney: 0.35,
        'trugifting-solutions': 0.35,
        'masterplayer-designs-and-printing': 0.35,
      };

      if (introRef.current) {
        const rect = introRef.current.getBoundingClientRect();
        const raw = (vh * 0.82 - rect.top) / Math.max(240, rect.height * 0.75);
        nextProgress.intro = Math.max(0.25, Math.min(1, raw));
      }

      let detectedOutfit = 'base';
      let detectedNumber = '00';

      FEATURED_STORIES.forEach((story) => {
        const el = storyRefs.current[story.slug];
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const raw = (vh * 0.78 - rect.top) / Math.max(280, rect.height * 0.65);
        nextProgress[story.slug] = Math.max(0.2, Math.min(1, raw));

        if (rect.top <= vh * 0.55 && rect.bottom >= vh * 0.22) {
          detectedOutfit = story.outfit;
          detectedNumber = story.number;
        }
      });

      setChapterProgress(nextProgress);
      setScrollOutfit(detectedOutfit);
      setActiveStoryNumber(detectedNumber);
    };

    updateScrollTelemetry();
    window.addEventListener('scroll', updateScrollTelemetry, { passive: true });
    window.addEventListener('resize', updateScrollTelemetry, { passive: true });
    return () => {
      window.removeEventListener('scroll', updateScrollTelemetry);
      window.removeEventListener('resize', updateScrollTelemetry);
    };
  }, [route.view]);

  const openSourceProjects = ARCHIVE_PROJECTS.filter((p) => p.featuredInOpenSource);
  const additionalArchiveProjects = ARCHIVE_PROJECTS.filter((p) => !p.featuredInOpenSource);

  const outfitPresets = [
    { id: 'base', label: '00 · Studio' },
    { id: 'doctor', label: '01 · Doctor' },
    { id: 'techy', label: '02/03 · Techy' },
    { id: 'masterplayer', label: '04 · Print Studio' },
  ];

  const renderCharacterStageCard = (isMobileMount = false) => (
    <div className={`stage-card-shell ${isMobileMount ? 'stage-card-mobile' : 'stage-card-desktop'}`}>
      {/* Top Stage Telemetry Bar */}
      <div className="stage-top-bar">
        <div className="stage-status-chip">
          <span className="stage-live-dot" aria-hidden="true" />
          <span>
            {gothamMode
              ? 'GOTHAM VIGILANTE RIG · GLTF 2.0'
              : `CHAPTER ${activeStoryNumber} · ${effectiveOutfit.toUpperCase()} RIG`}
          </span>
        </div>

        <button
          type="button"
          className="stage-mini-trick-btn"
          onClick={handleTriggerTrick}
        >
          <Sparkles size={13} aria-hidden="true" />
          <span>Do a trick</span>
        </button>
      </div>

      {/* 3D WebGL Canvas Stage */}
      <div className="stage-canvas-container">
        <LegoScene
          scrollProgressRef={scrollProgressRef}
          activeOutfit={effectiveOutfit}
          gothamMode={gothamMode}
          trickState={trickState}
          onTriggerTrick={handleTriggerTrick}
          reducedMotion={reducedMotion}
        />

        {/* Active Trick Toast Overlay */}
        {trickState && (
          <div className="stage-trick-toast" role="status" aria-live="polite">
            <Sparkles size={14} aria-hidden="true" />
            <span>{trickState.label}</span>
          </div>
        )}
      </div>

      {/* Bottom Stage Controls & Outfit Switcher */}
      <div className="stage-bottom-bar">
        <p className="stage-cue-text">{OWNER_PROFILE.characterCue}</p>

        <div className="stage-outfit-pills" role="group" aria-label="Switch 3D Minifigure Outfit">
          {outfitPresets.map((preset) => {
            const isSelected = !gothamMode && effectiveOutfit === preset.id;
            return (
              <button
                key={preset.id}
                type="button"
                className={`outfit-pill-btn ${isSelected ? 'is-active' : ''}`}
                onClick={() => {
                  if (gothamMode) setGothamMode(false);
                  setManualOutfit(preset.id === scrollOutfit ? null : preset.id);
                  handleTriggerTrick();
                }}
              >
                {preset.label}
              </button>
            );
          })}
          {manualOutfit && !gothamMode && (
            <button
              type="button"
              className="outfit-pill-btn outfit-pill-reset"
              onClick={() => setManualOutfit(null)}
              title="Resume automatic scroll-driven outfit changes"
            >
              Auto-Scroll
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className={`portfolio-app-root ${gothamMode ? 'theme-gotham' : 'theme-studio'}`}>
      <a href="#main-content" className="skip-to-content-link">
        Skip to main content
      </a>

      <Header
        currentPath={pathname}
        onNavigate={handleNavigate}
        gothamMode={gothamMode}
        onToggleGotham={handleToggleGotham}
        onTriggerTrick={handleTriggerTrick}
        activeOutfit={effectiveOutfit}
      />

      {/* Gotham Mode Active Notice Strip */}
      {gothamMode && (
        <div className="gotham-banner-strip" role="region" aria-label="Go Gotham Mode Active">
          <div className="gotham-banner-inner">
            <span className="gotham-banner-text">
              <Shield size={15} aria-hidden="true" />
              <span>
                <strong>GO GOTHAM MODE ACTIVE:</strong> {OWNER_PROFILE.gothamModeNote}
              </span>
            </span>
            <button
              type="button"
              className="gotham-banner-exit"
              onClick={handleToggleGotham}
            >
              <Sun size={14} aria-hidden="true" />
              <span>Return to Daylight Studio</span>
            </button>
          </div>
        </div>
      )}

      <main id="main-content" className="main-content-area">
        {route.view === 'work-index' && (
          <WorkIndexView
            onNavigate={handleNavigate}
            onOutfitChange={(o) => setManualOutfit(o)}
          />
        )}

        {route.view === 'work-detail' && (
          <WorkDetailView
            slug={route.slug}
            onNavigate={handleNavigate}
            onOutfitChange={(o) => setManualOutfit(o)}
            onTriggerTrick={handleTriggerTrick}
          />
        )}

        {route.view === 'cert-index' && (
          <CertificationsView slug={null} onNavigate={handleNavigate} />
        )}

        {route.view === 'cert-detail' && (
          <CertificationsView slug={route.slug} onNavigate={handleNavigate} />
        )}

        {route.view === 'home' && (
          <div className="home-split-shell">
            {/* LEFT COLUMN: Narrative, Hero, 4 Flagship Chapters, Open Source & Archive */}
            <div className="story-column">
              {/* HERO SECTION */}
              <section className="hero-section" aria-labelledby="hero-greeting-heading">
                <div className="hero-top-badges">
                  <span className="neo-badge neo-badge-red">
                    <span className="stud-dot" aria-hidden="true" />
                    <span>PRODUCT-MINDED SOFTWARE ENGINEER</span>
                  </span>
                  <span className="neo-badge neo-badge-outline">NEW DELHI / NCR · INDIA</span>
                </div>

                <p id="hero-greeting-heading" className="hero-greeting">
                  {OWNER_PROFILE.introGreeting}
                </p>

                <h1 className="hero-headline">{OWNER_PROFILE.headline}</h1>

                <p className="hero-subheadline">{OWNER_PROFILE.subheadline}</p>

                {/* Primary Hero Actions */}
                <div className="hero-cta-row">
                  <a
                    href="/#stories"
                    className="neo-btn neo-btn-primary"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigate('/', 'stories');
                    }}
                  >
                    <span>Explore Featured Stories</span>
                    <ArrowRight size={16} aria-hidden="true" />
                  </a>

                  <button
                    type="button"
                    className="neo-btn neo-btn-secondary"
                    onClick={handleTriggerTrick}
                  >
                    <Sparkles size={16} aria-hidden="true" />
                    <span>Do a trick</span>
                  </button>

                  <button
                    type="button"
                    className={`neo-btn ${gothamMode ? 'neo-btn-accent' : 'neo-btn-dark'}`}
                    onClick={handleToggleGotham}
                    aria-pressed={gothamMode}
                  >
                    {gothamMode ? (
                      <>
                        <Sun size={16} aria-hidden="true" />
                        <span>Studio Mode</span>
                      </>
                    ) : (
                      <>
                        <Shield size={16} aria-hidden="true" />
                        <span>Go Gotham</span>
                      </>
                    )}
                  </button>

                  <a
                    href="/work"
                    className="neo-btn neo-btn-secondary"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigate('/work');
                    }}
                  >
                    <span>All 15 Projects</span>
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </a>
                </div>

                {/* Intentional Mobile / Tablet 3D Character Stage Placement */}
                {!isDesktopViewport && (
                  <div className="hero-mobile-stage-wrap">
                    {renderCharacterStageCard(true)}
                  </div>
                )}
              </section>

              {/* 00 / HUMAN INTRODUCTION SECTION */}
              <section
                ref={introRef}
                className="human-intro-section"
                aria-labelledby="human-intro-heading"
              >
                <div className="section-kicker">
                  <span className="stud-dot" aria-hidden="true" />
                  <span>{PERSONAL_INTRO.eyebrow}</span>
                </div>

                <h2 id="human-intro-heading" className="section-title">
                  {PERSONAL_INTRO.title}
                </h2>

                <SpeechBubble
                  speaker="Avichal"
                  badge="Studio Black Sweater (Base Sheet)"
                  text={PERSONAL_INTRO.characterBubble}
                  progress={chapterProgress.intro}
                  accentColor="#E3000B"
                />

                <div className="intro-paragraphs">
                  {PERSONAL_INTRO.paragraphs.map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ))}
                </div>

                <div className="intro-facts-grid">
                  {PERSONAL_INTRO.quickFacts.map((fact, idx) => (
                    <div key={idx} className="intro-fact-card">
                      <span className="fact-period">{fact.period}</span>
                      <h3 className="fact-role">{fact.role}</h3>
                      <span className="fact-org">{fact.org}</span>
                      <p className="fact-summary">{fact.summary}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* 01–04 FLAGSHIP PRODUCT STORIES */}
              <div id="stories" className="stories-stack-container">
                <div className="stories-section-header">
                  <span className="section-kicker">
                    <span className="stud-dot" aria-hidden="true" />
                    <span>01–04 · FLAGSHIP PRODUCT STORIES</span>
                  </span>
                  <h2 className="section-title">
                    Four chapters. Four real-world problem spaces.
                  </h2>
                  <p className="section-lead">
                    Scroll through each chapter in order — watch the minifigure swap into the chapter’s outfit while exploring live screenshots, product architecture, and full case studies.
                  </p>
                </div>

                {FEATURED_STORIES.map((story) => (
                  <article
                    key={story.slug}
                    id={`story-${story.slug}`}
                    ref={(el) => {
                      storyRefs.current[story.slug] = el;
                    }}
                    className="story-chapter-card"
                    style={{
                      '--chapter-accent': story.accentColor,
                      '--chapter-tint': story.surfaceTint,
                    }}
                    aria-labelledby={`story-heading-${story.slug}`}
                  >
                    {/* Chapter Top Bar */}
                    <div className="chapter-top-meta">
                      <div className="chapter-badge-group">
                        <span className="story-number-pill">CHAPTER {story.number}</span>
                        <span className="story-relationship-pill">{story.relationshipBadge}</span>
                      </div>
                      <span className="chapter-outfit-indicator">
                        Outfit: <strong>{story.outfitLabel}</strong>
                      </span>
                    </div>

                    {/* Title & Subtitle */}
                    <h3 id={`story-heading-${story.slug}`} className="chapter-title">
                      <a
                        href={`/work/${story.slug}`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavigate(`/work/${story.slug}`);
                        }}
                      >
                        {story.title}
                      </a>
                    </h3>
                    <p className="chapter-subtitle">{story.subtitle}</p>

                    {/* Scroll-Driven Word-by-Word Speech Bubble */}
                    <SpeechBubble
                      speaker="Avichal"
                      badge={story.outfitLabel}
                      text={story.speechBeats.join(' ')}
                      progress={chapterProgress[story.slug] ?? 0.6}
                      accentColor={story.accentColor}
                    />

                    {/* Art-Directed Desktop + Mobile Mockup Showcase */}
                    <DeviceMockupShowcase
                      desktopSrc={story.media.desktop}
                      desktopAlt={story.media.desktopAlt}
                      mobileSrc={story.media.mobile}
                      mobileAlt={story.media.mobileAlt}
                      liveUrl={story.liveUrl}
                      characterSheetImg={story.characterSheetImg}
                      outfitLabel={story.outfitLabel}
                      accentColor={story.accentColor}
                    />

                    {/* Interactive Phoney Audio Emoji Widget inside Story 02 */}
                    {story.slug === 'phoney' && (
                      <PhoneyAudioWidget
                        betaCtaUrl={story.betaCtaUrl}
                        liveUrl={story.liveUrl}
                        onReactionTrigger={handleTriggerTrick}
                      />
                    )}

                    {/* Problem & What I Built Columns */}
                    <div className="chapter-details-grid">
                      <div className="chapter-detail-box">
                        <h4>Why It Needed To Exist</h4>
                        <p>{story.problem}</p>
                      </div>

                      <div className="chapter-detail-box">
                        <h4>What I Built & Owned</h4>
                        <ul className="chapter-bullet-list">
                          {story.whatIBuiltAndOwned.map((bullet, idx) => (
                            <li key={idx}>
                              <CheckCircle2 size={16} className="bullet-icon" aria-hidden="true" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Shipped vs In-Progress Honesty Box (Especially for Phoney & Masterplayer) */}
                    {story.shippedStatus && (
                      <div className="chapter-status-strip">
                        <div className="status-block">
                          <span className="status-tag status-tag-live">
                            <CheckCircle2 size={14} aria-hidden="true" />
                            <span>SHIPPED & VERIFIED LIVE</span>
                          </span>
                          <ul>
                            {story.shippedStatus.live.map((item, idx) => (
                              <li key={idx}>{item}</li>
                            ))}
                          </ul>
                        </div>

                        {story.shippedStatus.inProgress && (
                          <div className="status-block status-block-wip">
                            <span className="status-tag status-tag-wip">
                              <Clock size={14} aria-hidden="true" />
                              <span>ACTIVE WORK IN PROGRESS</span>
                            </span>
                            <ul>
                              {story.shippedStatus.inProgress.map((item, idx) => (
                                <li key={idx}>{item}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Stack Chips */}
                    <div className="chapter-stack-row">
                      {story.stack.map((tech) => (
                        <span key={tech} className="stack-chip">
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Chapter Bottom Action Bar */}
                    <div className="chapter-actions-bar">
                      <a
                        href={`/work/${story.slug}`}
                        className="neo-btn neo-btn-primary"
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavigate(`/work/${story.slug}`);
                        }}
                      >
                        <span>Read Full Case Study</span>
                        <ArrowRight size={16} aria-hidden="true" />
                      </a>

                      {story.liveUrl && (
                        <a
                          href={story.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="neo-btn neo-btn-secondary"
                        >
                          <span>{story.liveLabel || 'Visit live site'}</span>
                          <ExternalLink size={15} aria-hidden="true" />
                        </a>
                      )}

                      {story.repoUrl && (
                        <a
                          href={story.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="neo-btn neo-btn-secondary"
                        >
                          <GitBranch size={15} aria-hidden="true" />
                          <span>{story.repoLabel}</span>
                        </a>
                      )}

                      {story.betaCtaUrl && (
                        <a href={story.betaCtaUrl} className="neo-btn neo-btn-accent">
                          <Sparkles size={15} aria-hidden="true" />
                          <span>{story.betaCtaLabel}</span>
                        </a>
                      )}
                    </div>
                  </article>
                ))}
              </div>

              {/* OPEN SOURCE & UNDER THE HOOD SECTION */}
              <section
                id="open-source"
                className="open-source-section"
                aria-labelledby="open-source-heading"
              >
                <div className="section-kicker">
                  <span className="stud-dot" aria-hidden="true" />
                  <span>OPEN SOURCE & DEVELOPER UTILITIES</span>
                </div>
                <h2 id="open-source-heading" className="section-title">
                  Under the Hood: Public GitHub Repositories
                </h2>
                <p className="section-lead">
                  Alongside commercial platforms, I build open-source utilities, local-first CRMs, and analytics dashboards — all publicly inspectable on GitHub.
                </p>

                <div className="open-source-grid">
                  {openSourceProjects.map((proj) => (
                    <article key={proj.slug} className="open-source-card">
                      <div className="archive-card-top">
                        <span className="archive-category-tag">{proj.category}</span>
                        <span className="archive-period-tag">{proj.period}</span>
                      </div>

                      <h3 className="archive-card-title">
                        <a
                          href={`/work/${proj.slug}`}
                          onClick={(e) => {
                            e.preventDefault();
                            handleNavigate(`/work/${proj.slug}`);
                          }}
                        >
                          {proj.title}
                        </a>
                      </h3>

                      <p className="archive-card-summary">{proj.summary}</p>

                      {proj.media && (
                        <div className="os-card-preview-img">
                          <img src={proj.media} alt={`${proj.title} preview`} loading="lazy" />
                        </div>
                      )}

                      {proj.disclaimer && (
                        <div className="archive-mini-disclaimer" role="note">
                          <Info size={15} aria-hidden="true" />
                          <span>{proj.disclaimer}</span>
                        </div>
                      )}

                      <div className="archive-stack-row">
                        {proj.stack.map((t) => (
                          <span key={t} className="stack-chip">
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="archive-card-actions">
                        <a
                          href={`/work/${proj.slug}`}
                          className="neo-btn neo-btn-primary"
                          onClick={(e) => {
                            e.preventDefault();
                            handleNavigate(`/work/${proj.slug}`);
                          }}
                        >
                          <span>Case Study</span>
                          <ArrowUpRight size={14} aria-hidden="true" />
                        </a>
                        {proj.repoUrl && (
                          <a
                            href={proj.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="neo-btn neo-btn-secondary"
                          >
                            <GitBranch size={14} aria-hidden="true" />
                            <span>{proj.repoLabel}</span>
                            <ExternalLink size={13} aria-hidden="true" />
                          </a>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              {/* COMPLETE ARCHIVE PREVIEW SECTION */}
              <section className="archive-preview-section" aria-labelledby="archive-preview-heading">
                <div className="archive-preview-header">
                  <div>
                    <span className="section-kicker">
                      <Layers size={14} aria-hidden="true" />
                      <span>COMPLETE WORK CATALOGUE · NO PROJECT LEFT BEHIND</span>
                    </span>
                    <h2 id="archive-preview-heading" className="section-title">
                      Earlier Web Apps, AI Workspaces & Ops Pipelines
                    </h2>
                  </div>
                  <a
                    href="/work"
                    className="neo-btn neo-btn-primary"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigate('/work');
                    }}
                  >
                    <span>Browse All 15 Projects (/work)</span>
                    <ArrowRight size={15} aria-hidden="true" />
                  </a>
                </div>

                <div className="compact-archive-list">
                  {additionalArchiveProjects.map((proj) => (
                    <div key={proj.slug} className="compact-archive-row">
                      <div className="compact-row-main">
                        <span className="compact-row-period">{proj.period}</span>
                        <a
                          href={`/work/${proj.slug}`}
                          className="compact-row-title"
                          onClick={(e) => {
                            e.preventDefault();
                            handleNavigate(`/work/${proj.slug}`);
                          }}
                        >
                          {proj.title}
                        </a>
                        <span className="compact-row-cat">{proj.category}</span>
                      </div>
                      <div className="compact-row-actions">
                        {proj.liveUrl && (
                          <a
                            href={proj.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="compact-ext-link"
                          >
                            <span>Live</span>
                            <ExternalLink size={13} aria-hidden="true" />
                          </a>
                        )}
                        <a
                          href={`/work/${proj.slug}`}
                          className="compact-detail-link"
                          onClick={(e) => {
                            e.preventDefault();
                            handleNavigate(`/work/${proj.slug}`);
                          }}
                        >
                          <span>Details</span>
                          <ArrowRight size={14} aria-hidden="true" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* CERTIFICATIONS & CREDENTIALS PREVIEW SECTION */}
              <section className="certs-preview-section" aria-labelledby="certs-preview-heading">
                <div className="archive-preview-header">
                  <div>
                    <span className="section-kicker">
                      <Award size={14} aria-hidden="true" />
                      <span>VERIFIED CREDENTIALS</span>
                    </span>
                    <h2 id="certs-preview-heading" className="section-title">
                      Certifications & Core Engineering Training
                    </h2>
                  </div>
                  <a
                    href="/certifications"
                    className="neo-btn neo-btn-secondary"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigate('/certifications');
                    }}
                  >
                    <span>All Credentials (/certifications)</span>
                    <ArrowRight size={15} aria-hidden="true" />
                  </a>
                </div>

                <div className="certs-preview-grid">
                  {CERTIFICATIONS.map((cert) => (
                    <article key={cert.slug} className="cert-preview-card">
                      <div className="cert-card-top">
                        <span className="cert-issuer-pill">{cert.issuer}</span>
                        <span className="cert-date-pill">{cert.issueDate}</span>
                      </div>
                      <h3>
                        <a
                          href={`/certifications/${cert.slug}`}
                          onClick={(e) => {
                            e.preventDefault();
                            handleNavigate(`/certifications/${cert.slug}`);
                          }}
                        >
                          {cert.title}
                        </a>
                      </h3>
                      <p>{cert.summary}</p>
                      <a
                        href={`/certifications/${cert.slug}`}
                        className="compact-detail-link"
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavigate(`/certifications/${cert.slug}`);
                        }}
                      >
                        <span>Inspect Credential & Applied Work</span>
                        <ArrowRight size={14} aria-hidden="true" />
                      </a>
                    </article>
                  ))}
                </div>
              </section>
            </div>

            {/* RIGHT COLUMN ON DESKTOP: Sticky Persistent 3D Minifigure World */}
            {isDesktopViewport && (
              <aside
                className="stage-column"
                aria-label="Persistent 3D Minifigure Companion Stage"
              >
                <div className="stage-sticky-holder">{renderCharacterStageCard(false)}</div>
              </aside>
            )}
          </div>
        )}
      </main>

      <Footer
        onNavigate={handleNavigate}
        gothamMode={gothamMode}
        onToggleGotham={handleToggleGotham}
      />
    </div>
  );
}
