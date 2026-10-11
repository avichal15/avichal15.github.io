import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowUpRight, ExternalLink, GitBranch, Info } from 'lucide-react';
import { FEATURED_STORIES, ARCHIVE_PROJECTS } from '../data/portfolioData';

export default function WorkIndexView({ onNavigate, onOutfitChange }) {
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (onOutfitChange) onOutfitChange('base');
  }, [onOutfitChange]);

  const filteredArchive = ARCHIVE_PROJECTS.filter((proj) => {
    if (filter === 'all') return true;
    if (filter === 'open-source') return proj.featuredInOpenSource;
    if (filter === 'apps') return !proj.featuredInOpenSource;
    return true;
  });

  return (
    <div className="detail-page-shell" aria-labelledby="all-work-heading">
      <div className="detail-top-bar">
        <a
          href="/"
          className="neo-pill-back"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('/');
          }}
        >
          <ArrowLeft size={16} aria-hidden="true" />
          <span>Back to Story Home</span>
        </a>
      </div>

      <header className="detail-header-block">
        <span className="section-kicker">
          <span className="stud-dot" aria-hidden="true" />
          <span>COMPLETE WORK ARCHIVE · 15 PROJECTS</span>
        </span>
        <h1 id="all-work-heading" className="detail-main-title">
          Featured Product Stories & Engineering Catalogue
        </h1>
        <p className="detail-subtitle">
          Every shipped product, ongoing collaboration, open-source developer tool, and earlier technical build — preserved with verified links and case studies.
        </p>
      </header>

      {/* Flagship 4 Stories */}
      <section className="work-index-section" aria-label="Featured Product Stories">
        <h2 className="work-index-subheading">01–04 · Flagship Product Stories</h2>
        <div className="flagship-index-grid">
          {FEATURED_STORIES.map((story) => (
            <article key={story.slug} className="flagship-index-card">
              <div className="flagship-card-media">
                <img
                  src={story.media.desktop}
                  alt={story.media.desktopAlt}
                  loading="lazy"
                />
                <span className="flagship-card-num">STORY {story.number}</span>
              </div>
              <div className="flagship-card-body">
                <span className="flagship-card-badge">{story.relationshipBadge}</span>
                <h3>{story.title}</h3>
                <p>{story.summary}</p>
                <div className="flagship-card-actions">
                  <a
                    href={`/work/${story.slug}`}
                    className="neo-btn neo-btn-primary"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(`/work/${story.slug}`);
                    }}
                  >
                    <span>Read Case Study</span>
                    <ArrowUpRight size={15} />
                  </a>
                  {story.liveUrl && (
                    <a
                      href={story.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="neo-btn neo-btn-secondary"
                    >
                      <span>Live Site</span>
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Archive & Open Source Projects */}
      <section className="work-index-section" aria-label="Archive and Open Source">
        <div className="archive-filter-header">
          <h2 className="work-index-subheading">
            Open Source, Automation & Earlier Builds ({filteredArchive.length})
          </h2>
          <div className="archive-filter-pills" role="tablist" aria-label="Filter archive projects">
            {[
              { id: 'all', label: 'All Archive (11)' },
              { id: 'open-source', label: 'Open Source Repos (4)' },
              { id: 'apps', label: 'Web, AI & Ops Builds (7)' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={filter === tab.id}
                className={`filter-pill-btn ${filter === tab.id ? 'is-active' : ''}`}
                onClick={() => setFilter(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="archive-grid">
          {filteredArchive.map((proj) => (
            <article key={proj.slug} className="archive-card">
              <div className="archive-card-top">
                <span className="archive-category-tag">{proj.category}</span>
                <span className="archive-period-tag">{proj.period}</span>
              </div>

              <h3 className="archive-card-title">
                <a
                  href={`/work/${proj.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(`/work/${proj.slug}`);
                  }}
                >
                  {proj.title}
                </a>
              </h3>

              <p className="archive-card-summary">{proj.summary}</p>

              {proj.disclaimer && (
                <div className="archive-mini-disclaimer">
                  <Info size={14} aria-hidden="true" />
                  <span>{proj.disclaimer}</span>
                </div>
              )}

              <div className="archive-stack-row">
                {(proj.stack || []).map((t) => (
                  <span key={t} className="stack-chip">
                    {t}
                  </span>
                ))}
              </div>

              <div className="archive-card-actions">
                <a
                  href={`/work/${proj.slug}`}
                  className="neo-btn neo-btn-secondary"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(`/work/${proj.slug}`);
                  }}
                >
                  <span>Project Details</span>
                  <ArrowUpRight size={14} />
                </a>
                {proj.liveUrl && (
                  <a
                    href={proj.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="neo-btn neo-btn-primary"
                  >
                    <span>Live Demo</span>
                    <ExternalLink size={14} />
                  </a>
                )}
                {proj.repoUrl && (
                  <a
                    href={proj.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="neo-btn neo-btn-secondary"
                  >
                    <GitBranch size={14} />
                    <span>{proj.repoLabel || 'GitHub'}</span>
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
