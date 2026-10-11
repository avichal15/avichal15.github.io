import React, { useEffect } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  GitBranch,
  CheckCircle2,
  Clock,
  Info,
  Sparkles,
} from 'lucide-react';
import { ALL_WORK_BY_SLUG, getAdjacentWorkItems } from '../data/portfolioData';
import DeviceMockupShowcase from './DeviceMockupShowcase';
import PhoneyAudioWidget from './PhoneyAudioWidget';
import SpeechBubble from './SpeechBubble';

export default function WorkDetailView({
  slug,
  onNavigate,
  onOutfitChange,
  onTriggerTrick,
}) {
  const item = ALL_WORK_BY_SLUG.get(slug);
  const { prev, next } = getAdjacentWorkItems(slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (item && onOutfitChange) {
      onOutfitChange(item.outfit || 'base');
    }
  }, [slug, item, onOutfitChange]);

  if (!item) {
    return (
      <div className="detail-page-shell">
        <div className="detail-top-bar">
          <button
            type="button"
            className="neo-pill-back"
            onClick={() => onNavigate('/work')}
          >
            <ArrowLeft size={16} />
            <span>All work</span>
          </button>
        </div>
        <div className="not-found-card">
          <h1>Project not found</h1>
          <p>The requested project route (`/work/{slug}`) does not match a known slug.</p>
          <button
            type="button"
            className="neo-btn neo-btn-primary"
            onClick={() => onNavigate('/work')}
          >
            Browse All 15 Projects
          </button>
        </div>
      </div>
    );
  }

  return (
    <article className="detail-page-shell" aria-labelledby="case-study-title">
      {/* Top Action Bar (sebg.ch-inspired left back pill + right verified external links) */}
      <div className="detail-top-bar">
        <div className="detail-top-left">
          <a
            href="/work"
            className="neo-pill-back"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/work');
            }}
          >
            <ArrowLeft size={16} aria-hidden="true" />
            <span>All work</span>
          </a>
          <a
            href="/"
            className="neo-pill-back neo-pill-subtle"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/');
            }}
          >
            <span>Home story</span>
          </a>
        </div>

        <div className="detail-top-right">
          {item.liveUrl && (
            <a
              href={item.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="neo-btn neo-btn-primary"
            >
              <span>{item.liveLabel || 'Visit live site'}</span>
              <ExternalLink size={15} aria-hidden="true" />
            </a>
          )}
          {item.repoUrl && (
            <a
              href={item.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="neo-btn neo-btn-secondary"
            >
              <GitBranch size={15} aria-hidden="true" />
              <span>{item.repoLabel || 'View source'}</span>
              <ExternalLink size={14} aria-hidden="true" />
            </a>
          )}
          {item.betaCtaUrl && (
            <a href={item.betaCtaUrl} className="neo-btn neo-btn-accent">
              <Sparkles size={15} aria-hidden="true" />
              <span>{item.betaCtaLabel || 'Join Beta'}</span>
            </a>
          )}
        </div>
      </div>

      {/* Case Study Header */}
      <header className="detail-header-block">
        <div className="detail-kicker-row">
          {item.number && <span className="story-number-pill">STORY {item.number}</span>}
          <span className="story-relationship-pill">
            {item.relationshipBadge || item.category}
          </span>
        </div>

        <h1 id="case-study-title" className="detail-main-title">
          {item.title}
        </h1>
        <p className="detail-subtitle">{item.subtitle || item.summary}</p>

        {/* 3-Column Metadata Strip */}
        <div className="detail-meta-grid">
          <div className="detail-meta-cell">
            <span className="meta-label">YEAR / TIMELINE</span>
            <strong className="meta-value">{item.year || item.period || '2025 – 2026'}</strong>
          </div>
          <div className="detail-meta-cell">
            <span className="meta-label">ROLE & OWNERSHIP</span>
            <strong className="meta-value">
              {item.role || 'Software Engineer & Product Builder'}
            </strong>
          </div>
          <div className="detail-meta-cell">
            <span className="meta-label">STACK & TOOLS</span>
            <div className="meta-stack-tags">
              {(item.stack || []).map((tech) => (
                <span key={tech} className="stack-chip">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Speech Beats if Featured Story */}
      {item.speechBeats && item.speechBeats.length > 0 && (
        <div className="detail-speech-row">
          <SpeechBubble
            speaker="Avichal"
            badge={item.outfitLabel || 'Story Context'}
            text={item.speechBeats.join(' ')}
            progress={1}
            accentColor={item.accentColor || '#E3000B'}
          />
        </div>
      )}

      {/* Disclaimer Banner (e.g., OmniRoute third-party companion or Recruitment synthetic data) */}
      {item.disclaimer && (
        <div className="detail-disclaimer-box" role="note">
          <Info size={18} aria-hidden="true" />
          <p>{item.disclaimer}</p>
        </div>
      )}

      {/* Art-Directed Device Mockup Showcase */}
      {item.media && typeof item.media === 'object' && item.media.desktop && (
        <DeviceMockupShowcase
          desktopSrc={item.media.desktop}
          desktopAlt={item.media.desktopAlt}
          mobileSrc={item.media.mobile}
          mobileAlt={item.media.mobileAlt}
          liveUrl={item.liveUrl}
          characterSheetImg={item.characterSheetImg}
          outfitLabel={item.outfitLabel}
          accentColor={item.accentColor}
        />
      )}

      {/* Single Media Screenshot for Archive Projects */}
      {typeof item.media === 'string' && (
        <div className="archive-single-media-card">
          <img src={item.media} alt={`${item.title} screenshot`} loading="lazy" />
        </div>
      )}

      {/* Interactive Phoney Audio Emoji Tray on /work/phoney */}
      {item.slug === 'phoney' && (
        <PhoneyAudioWidget
          betaCtaUrl={item.betaCtaUrl}
          liveUrl={item.liveUrl}
          onReactionTrigger={onTriggerTrick}
        />
      )}

      {/* Deep-Dive Narrative Grid */}
      <div className="detail-narrative-grid">
        {item.problem && (
          <section className="narrative-card">
            <h2>The Problem & Context</h2>
            <p>{item.problem}</p>
          </section>
        )}

        {item.solution && (
          <section className="narrative-card">
            <h2>Engineering Approach</h2>
            <p>{item.solution}</p>
          </section>
        )}

        {item.whatIBuiltAndOwned && (
          <section className="narrative-card narrative-card-wide">
            <h2>What I Built & Owned</h2>
            <ul className="narrative-bullet-list">
              {item.whatIBuiltAndOwned.map((point, idx) => (
                <li key={idx}>
                  <CheckCircle2 size={17} className="bullet-icon" aria-hidden="true" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {item.shippedStatus && (
          <section className="narrative-card narrative-card-wide shipped-status-grid">
            <div className="status-column">
              <h3>
                <CheckCircle2 size={17} aria-hidden="true" />
                <span>Shipped & Verified Live</span>
              </h3>
              <ul>
                {(item.shippedStatus.live || []).map((liveItem, idx) => (
                  <li key={idx}>{liveItem}</li>
                ))}
              </ul>
            </div>

            {item.shippedStatus.inProgress && item.shippedStatus.inProgress.length > 0 && (
              <div className="status-column status-column-wip">
                <h3>
                  <Clock size={17} aria-hidden="true" />
                  <span>Work in Progress / Active Roadmap</span>
                </h3>
                <ul>
                  {item.shippedStatus.inProgress.map((wipItem, idx) => (
                    <li key={idx}>{wipItem}</li>
                  ))}
                </ul>
              </div>
            )}

            {item.shippedStatus.privacyAndConsentNote && (
              <div className="status-privacy-note">
                <Info size={16} aria-hidden="true" />
                <p>{item.shippedStatus.privacyAndConsentNote}</p>
              </div>
            )}
          </section>
        )}
      </div>

      {/* Additional Screenshot Gallery if Available */}
      {((item.media && item.media.gallery && item.media.gallery.length > 1) ||
        (item.gallery && item.gallery.length > 0)) && (
        <section className="detail-gallery-section" aria-label="Verified Product Screenshots">
          <h2 className="gallery-heading">Verified Product Screens & Evidence</h2>
          <div className="detail-gallery-grid">
            {(item.media?.gallery || item.gallery || []).map((imgObj, idx) => (
              <figure key={idx} className="gallery-figure-card">
                <img src={imgObj.src} alt={imgObj.caption} loading="lazy" />
                <figcaption>{imgObj.caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      {/* Bottom Previous / Next Internal Preview Cards */}
      <nav className="adjacent-nav-section" aria-label="Previous and Next Projects">
        <a
          href={`/work/${prev.slug}`}
          className="adjacent-preview-card"
          onClick={(e) => {
            e.preventDefault();
            onNavigate(`/work/${prev.slug}`);
          }}
        >
          <span className="adjacent-direction">
            <ArrowLeft size={15} aria-hidden="true" />
            <span>Previous Project</span>
          </span>
          <strong className="adjacent-title">{prev.title}</strong>
          <span className="adjacent-badge">{prev.badge}</span>
        </a>

        <a
          href={`/work/${next.slug}`}
          className="adjacent-preview-card adjacent-preview-next"
          onClick={(e) => {
            e.preventDefault();
            onNavigate(`/work/${next.slug}`);
          }}
        >
          <span className="adjacent-direction">
            <span>Next Project</span>
            <ArrowRight size={15} aria-hidden="true" />
          </span>
          <strong className="adjacent-title">{next.title}</strong>
          <span className="adjacent-badge">{next.badge}</span>
        </a>
      </nav>
    </article>
  );
}
