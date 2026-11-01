import { useEffect, useState } from 'react';
import { ALL_PROJECTS, PHONEY_AUDIO_EMOJIS } from '../data/portfolioData';

export function ProjectCaseStudyModal({
  project,
  originRect,
  onClose,
  onSelectProject,
  onPlayAudioEmoji,
  activeAudioEmoji,
  reducedMotion = false,
}) {
  const [activeSlideIdx, setActiveSlideIdx] = useState(0);
  const [phase, setPhase] = useState(() => (reducedMotion || !originRect ? 'expanded' : 'from-card'));

  useEffect(() => {
    if (reducedMotion || !originRect) return undefined;
    let raf2 = null;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        setPhase('expanded');
      });
    });
    return () => {
      cancelAnimationFrame(raf1);
      if (raf2 !== null) cancelAnimationFrame(raf2);
    };
  }, [originRect, reducedMotion]);

  if (!project) return null;

  const slides = project.slides || [];
  const currentSlide = slides[activeSlideIdx] || slides[0] || {
    step: `${project.code}.01`,
    title: project.title,
    caption: project.summary,
    desktopImage: project.preview,
    mobileImage: project.mobilePreview,
  };

  const currentIdx = ALL_PROJECTS.findIndex((p) => p.slug === project.slug);
  const prevProject =
    currentIdx > 0 ? ALL_PROJECTS[currentIdx - 1] : ALL_PROJECTS[ALL_PROJECTS.length - 1];
  const nextProject =
    currentIdx < ALL_PROJECTS.length - 1 ? ALL_PROJECTS[currentIdx + 1] : ALL_PROJECTS[0];

  const provenanceDesktop = project.assetProvenance?.desktop?.[activeSlideIdx] ||
    project.assetProvenance?.desktop?.[0] || null;

  // Compute shared-element FLIP transform from source card bounding box
  let shellStyle = {
    '--case-accent': project.accentColor || '#FFD000',
    '--case-tint': project.themeTint || '#F4F0EA',
  };

  if (phase === 'from-card' && originRect && typeof window !== 'undefined') {
    const vw = Math.max(window.innerWidth, 320);
    const vh = Math.max(window.innerHeight, 320);
    const scaleX = Math.max(0.18, Math.min(1, originRect.width / vw));
    const scaleY = Math.max(0.18, Math.min(1, originRect.height / vh));
    const tx = originRect.left + originRect.width / 2 - vw / 2;
    const ty = originRect.top + originRect.height / 2 - vh / 2;
    shellStyle = {
      ...shellStyle,
      transform: `translate3d(${tx.toFixed(1)}px, ${ty.toFixed(1)}px, 0) scale(${scaleX.toFixed(3)}, ${scaleY.toFixed(3)})`,
      borderRadius: '28px',
      opacity: 0.72,
    };
  }

  return (
    <div
      className="case-study-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} case study`}
      data-testid="case-study-modal"
      data-project-slug={project.slug}
    >
      <div
        className="case-study-backdrop"
        onClick={onClose}
        aria-hidden="true"
      />

      <article
        className={`case-study-shell ${phase === 'expanded' ? 'is-expanded' : 'is-from-card'}`}
        style={shellStyle}
      >
        {/* Sticky Top Navigation Bar */}
        <header className="case-study-topbar">
          <div className="case-study-topbar__left">
            <button
              type="button"
              className="lego-brick-btn lego-brick-btn--back"
              onClick={onClose}
              data-testid="case-study-back-btn"
            >
              <span aria-hidden="true">←</span>
              <span>Back to portfolio</span>
            </button>
            <div className="case-study-breadcrumb">
              <span className="case-study-breadcrumb__code">PROJECT {project.code} / 10</span>
              <span className="case-study-breadcrumb__sep">//</span>
              <span className="case-study-breadcrumb__cat">{project.category}</span>
            </div>
          </div>

          <div className="case-study-topbar__actions">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="lego-brick-btn lego-brick-btn--yellow"
                data-testid="case-study-live-link"
              >
                <span>{project.liveLabel || 'Visit Live Website'}</span>
                <span aria-hidden="true">↗</span>
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="lego-brick-btn lego-brick-btn--dark"
                data-testid="case-study-repo-link"
              >
                <span>{project.repoLabel || 'View GitHub Repo'}</span>
                <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
        </header>

        <div className="case-study-scroll">
          {/* Hero Header */}
          <section className="case-study-hero">
            <div className="case-study-hero__meta">
              <span className="case-study-pill case-study-pill--code">#{project.code}</span>
              <span className="case-study-pill">{project.category}</span>
              <span className="case-study-pill">{project.year}</span>
              <span className="case-study-pill case-study-pill--status">{project.status}</span>
            </div>

            <h1 className="case-study-hero__title">{project.title}</h1>
            <p className="case-study-hero__tagline">{project.tagline}</p>

            {/* Key Metrics Grid */}
            <div className="case-study-metrics">
              <div className="case-study-metric-card">
                <span className="case-study-metric-card__label">ROLE & OWNERSHIP</span>
                <strong className="case-study-metric-card__value">{project.role}</strong>
              </div>
              {(project.metrics || []).map((metric) => (
                <div key={metric.label} className="case-study-metric-card">
                  <span className="case-study-metric-card__label">{metric.label}</span>
                  <strong className="case-study-metric-card__value">{metric.value}</strong>
                </div>
              ))}
            </div>
          </section>

          {/* Visual Showcase Stage */}
          <section className="case-study-showcase" aria-label="Project visual gallery">
            <div className="case-study-showcase__header">
              <div>
                <span className="case-study-showcase__step">{currentSlide.step} // VISUAL SHOWCASE</span>
                <h2 className="case-study-showcase__title">{currentSlide.title}</h2>
                <p className="case-study-showcase__caption">{currentSlide.caption}</p>
              </div>

              {slides.length > 1 && (
                <div className="case-study-slide-tabs" role="tablist" aria-label="Slide selector">
                  {slides.map((slide, idx) => (
                    <button
                      key={slide.step}
                      type="button"
                      role="tab"
                      aria-selected={idx === activeSlideIdx}
                      className={`case-study-slide-tab ${idx === activeSlideIdx ? 'is-active' : ''}`}
                      onClick={() => setActiveSlideIdx(idx)}
                    >
                      <span className="case-study-slide-tab__num">{idx + 1}</span>
                      <span className="case-study-slide-tab__label">{slide.step}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div
              className={`case-study-stage ${
                currentSlide.mobileImage ? 'has-mobile-frame' : 'is-desktop-only'
              }`}
            >
              {/* Desktop Browser Frame */}
              <div className="case-study-browser">
                <div className="case-study-browser__bar">
                  <div className="case-study-browser__dots" aria-hidden="true">
                    <span className="dot dot--red" />
                    <span className="dot dot--yellow" />
                    <span className="dot dot--green" />
                  </div>
                  <div className="case-study-browser__url">
                    {project.liveUrl || project.repoUrl || `https://avichalgoyal.me/work/${project.slug}`}
                  </div>
                  <span className="case-study-browser__badge">
                    {provenanceDesktop?.kind === 'conceptual-illustration'
                      ? '2K STUDIO ARCHITECTURE'
                      : provenanceDesktop?.kind === 'product-interface'
                        ? 'AUTHENTIC PRODUCT UI'
                        : 'LIVE WEBSITE CAPTURE'}
                  </span>
                </div>
                <div className="case-study-browser__viewport">
                  <img
                    src={currentSlide.desktopImage}
                    alt={`${project.title} — ${currentSlide.title}`}
                    className="case-study-browser__img"
                    loading="eager"
                  />
                </div>
              </div>

              {/* Mobile Device Frame (when authentic mobile capture exists) */}
              {currentSlide.mobileImage && (
                <div className="case-study-phone">
                  <div className="case-study-phone__notch" aria-hidden="true" />
                  <div className="case-study-phone__viewport">
                    <img
                      src={currentSlide.mobileImage}
                      alt={`${project.title} mobile view — ${currentSlide.title}`}
                      className="case-study-phone__img"
                      loading="eager"
                    />
                  </div>
                  <div className="case-study-phone__caption">MOBILE VIEW · 390×844</div>
                </div>
              )}
            </div>

            {/* Interactive Phoney Audio Emoji Soundboard inside Phoney Case Study */}
            {project.hasAudioEmojiTray && (
              <div className="phoney-tray phoney-tray--case-study">
                <div className="phoney-tray__header">
                  <span className="phoney-tray__title">
                    PHONEY QUICK TRAY · 6 DEFAULT AUDIO EMOJIS (CLICK TO TEST LIVE)
                  </span>
                  <span className="phoney-tray__hint">
                    Explicit user-triggered WebAudio / WAV playback
                  </span>
                </div>
                <div className="phoney-tray__buttons">
                  {PHONEY_AUDIO_EMOJIS.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      className={`phoney-emoji-btn ${
                        activeAudioEmoji === item.id ? 'is-playing' : ''
                      }`}
                      onClick={() => onPlayAudioEmoji?.(item)}
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

            {/* Thumbnail Strip */}
            {slides.length > 1 && (
              <div className="case-study-thumbs">
                {slides.map((slide, idx) => (
                  <button
                    key={slide.step}
                    type="button"
                    className={`case-study-thumb ${idx === activeSlideIdx ? 'is-active' : ''}`}
                    onClick={() => setActiveSlideIdx(idx)}
                  >
                    <img src={slide.desktopImage} alt={slide.title} loading="lazy" />
                    <div className="case-study-thumb__meta">
                      <span>{slide.step}</span>
                      <strong>{slide.title}</strong>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </section>

          {/* Engineering Deep-Dive Grid: Problem, Solution, Implementation & Stack */}
          <section className="case-study-body">
            <div className="case-study-grid">
              <div className="case-study-card">
                <span className="case-study-card__eyebrow">01 // THE PROBLEM</span>
                <h3 className="case-study-card__heading">Context & Operational Challenge</h3>
                <p className="case-study-card__text">{project.problem}</p>
              </div>

              <div className="case-study-card">
                <span className="case-study-card__eyebrow">02 // THE SOLUTION</span>
                <h3 className="case-study-card__heading">Product & Engineering Architecture</h3>
                <p className="case-study-card__text">{project.solution}</p>
              </div>
            </div>

            <div className="case-study-grid case-study-grid--bottom">
              <div className="case-study-card case-study-card--wide">
                <span className="case-study-card__eyebrow">03 // IMPLEMENTATION HIGHLIGHTS</span>
                <h3 className="case-study-card__heading">How It Was Built & Verified</h3>
                <ul className="case-study-list">
                  {(project.implementation || []).map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>

              <div className="case-study-card">
                <span className="case-study-card__eyebrow">04 // TECHNOLOGY STACK & LINKS</span>
                <h3 className="case-study-card__heading">Tools, Runtime & Verification</h3>
                <div className="case-study-stack-tags">
                  {(project.stack || []).map((tech) => (
                    <span key={tech} className="case-study-stack-tag">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="case-study-card__links">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="lego-brick-btn lego-brick-btn--yellow"
                    >
                      <span>{project.liveLabel || 'Open Live Site'}</span>
                      <span aria-hidden="true">↗</span>
                    </a>
                  )}
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="lego-brick-btn lego-brick-btn--dark"
                    >
                      <span>{project.repoLabel || 'Inspect Repository'}</span>
                      <span aria-hidden="true">↗</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Sequential Case-Study Footer Navigation */}
          <footer className="case-study-footer-nav">
            <button
              type="button"
              className="case-study-nav-card"
              onClick={() => onSelectProject?.(prevProject)}
            >
              <span className="case-study-nav-card__dir">← PREVIOUS PROJECT ({prevProject.code})</span>
              <strong className="case-study-nav-card__title">{prevProject.title}</strong>
              <span className="case-study-nav-card__cat">{prevProject.category}</span>
            </button>

            <button
              type="button"
              className="lego-brick-btn lego-brick-btn--back"
              onClick={onClose}
            >
              ← All 10 Projects
            </button>

            <button
              type="button"
              className="case-study-nav-card case-study-nav-card--next"
              onClick={() => onSelectProject?.(nextProject)}
            >
              <span className="case-study-nav-card__dir">NEXT PROJECT ({nextProject.code}) →</span>
              <strong className="case-study-nav-card__title">{nextProject.title}</strong>
              <span className="case-study-nav-card__cat">{nextProject.category}</span>
            </button>
          </footer>
        </div>
      </article>
    </div>
  );
}

export function CertificationModal({ certification, onClose }) {
  if (!certification) return null;

  return (
    <div
      className="case-study-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={`${certification.title} credential`}
      data-testid="certification-modal"
    >
      <div className="case-study-backdrop" onClick={onClose} aria-hidden="true" />
      <article className="case-study-shell is-expanded case-study-shell--cert">
        <header className="case-study-topbar">
          <div className="case-study-topbar__left">
            <button
              type="button"
              className="lego-brick-btn lego-brick-btn--back"
              onClick={onClose}
            >
              ← Back to credentials
            </button>
            <div className="case-study-breadcrumb">
              <span className="case-study-breadcrumb__code">{certification.issuer}</span>
              <span className="case-study-breadcrumb__sep">//</span>
              <span className="case-study-breadcrumb__cat">{certification.date}</span>
            </div>
          </div>
          <div className="case-study-topbar__actions">
            <a
              href={certification.verifyUrl || certification.preview}
              target="_blank"
              rel="noopener noreferrer"
              className="lego-brick-btn lego-brick-btn--yellow"
            >
              Open Full Certificate ↗
            </a>
          </div>
        </header>

        <div className="case-study-scroll">
          <section className="case-study-hero">
            <div className="case-study-hero__meta">
              <span className="case-study-pill case-study-pill--code">VERIFIED CREDENTIAL</span>
              <span className="case-study-pill">{certification.credentialType}</span>
              <span className="case-study-pill">{certification.date}</span>
            </div>
            <h1 className="case-study-hero__title">{certification.title}</h1>
            <p className="case-study-hero__tagline">{certification.summary}</p>
            <div className="case-study-stack-tags">
              {(certification.skills || []).map((skill) => (
                <span key={skill} className="case-study-stack-tag">
                  {skill}
                </span>
              ))}
            </div>
          </section>

          <section className="case-study-showcase">
            <div className="case-study-browser">
              <div className="case-study-browser__bar">
                <div className="case-study-browser__dots" aria-hidden="true">
                  <span className="dot dot--red" />
                  <span className="dot dot--yellow" />
                  <span className="dot dot--green" />
                </div>
                <div className="case-study-browser__url">{certification.issuer}</div>
              </div>
              <div className="case-study-browser__viewport">
                <img
                  src={certification.preview}
                  alt={certification.title}
                  className="case-study-browser__img"
                />
              </div>
            </div>
          </section>
        </div>
      </article>
    </div>
  );
}
