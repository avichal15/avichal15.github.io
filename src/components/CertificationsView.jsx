import React, { useEffect } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Award,
  CheckCircle2,
  ExternalLink,
  Mail,
} from 'lucide-react';
import {
  CERTIFICATIONS,
  CERTIFICATIONS_BY_SLUG,
  getAdjacentCertifications,
} from '../data/portfolioData';

export default function CertificationsView({ slug = null, onNavigate }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [slug]);

  if (slug) {
    const cert = CERTIFICATIONS_BY_SLUG.get(slug);
    const { prev, next } = getAdjacentCertifications(slug);

    if (!cert) {
      return (
        <div className="detail-page-shell">
          <div className="detail-top-bar">
            <button
              type="button"
              className="neo-pill-back"
              onClick={() => onNavigate('/certifications')}
            >
              <ArrowLeft size={16} />
              <span>All certifications</span>
            </button>
          </div>
          <div className="not-found-card">
            <h1>Credential not found</h1>
            <button
              type="button"
              className="neo-btn neo-btn-primary"
              onClick={() => onNavigate('/certifications')}
            >
              View All Certifications
            </button>
          </div>
        </div>
      );
    }

    return (
      <article className="detail-page-shell" aria-labelledby="cert-detail-title">
        <div className="detail-top-bar">
          <div className="detail-top-left">
            <a
              href="/certifications"
              className="neo-pill-back"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/certifications');
              }}
            >
              <ArrowLeft size={16} />
              <span>All credentials</span>
            </a>
            <a
              href="/"
              className="neo-pill-back neo-pill-subtle"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/');
              }}
            >
              <span>Home</span>
            </a>
          </div>

          <div className="detail-top-right">
            {cert.verifyUrl && (
              <a href={cert.verifyUrl} className="neo-btn neo-btn-primary">
                <Mail size={15} aria-hidden="true" />
                <span>{cert.verifyLabel || 'Verify Credential'}</span>
                <ExternalLink size={14} aria-hidden="true" />
              </a>
            )}
          </div>
        </div>

        <header className="detail-header-block">
          <div className="detail-kicker-row">
            <span className="story-number-pill">VERIFIED CREDENTIAL</span>
            <span className="story-relationship-pill">{cert.category}</span>
          </div>
          <h1 id="cert-detail-title" className="detail-main-title">
            {cert.title}
          </h1>
          <p className="detail-subtitle">{cert.summary}</p>

          <div className="detail-meta-grid">
            <div className="detail-meta-cell">
              <span className="meta-label">ISSUING ORGANIZATION</span>
              <strong className="meta-value">{cert.issuer}</strong>
            </div>
            <div className="detail-meta-cell">
              <span className="meta-label">ISSUED DATE</span>
              <strong className="meta-value">{cert.issueDate}</strong>
            </div>
            <div className="detail-meta-cell">
              <span className="meta-label">CORE COMPETENCIES</span>
              <div className="meta-stack-tags">
                {cert.skills.map((s) => (
                  <span key={s} className="stack-chip">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </header>

        <div className="detail-narrative-grid">
          <section className="narrative-card">
            <h2>How I Apply This in Production Work</h2>
            <p>{cert.appliedInWork}</p>
          </section>

          <section className="narrative-card">
            <h2>Credential Verification & Evidence</h2>
            <p>{cert.verificationNote}</p>
          </section>
        </div>

        <nav className="adjacent-nav-section" aria-label="Adjacent Certifications">
          <a
            href={`/certifications/${prev.slug}`}
            className="adjacent-preview-card"
            onClick={(e) => {
              e.preventDefault();
              onNavigate(`/certifications/${prev.slug}`);
            }}
          >
            <span className="adjacent-direction">
              <ArrowLeft size={15} />
              <span>Previous Credential</span>
            </span>
            <strong className="adjacent-title">{prev.title}</strong>
            <span className="adjacent-badge">{prev.issuer}</span>
          </a>

          <a
            href={`/certifications/${next.slug}`}
            className="adjacent-preview-card adjacent-preview-next"
            onClick={(e) => {
              e.preventDefault();
              onNavigate(`/certifications/${next.slug}`);
            }}
          >
            <span className="adjacent-direction">
              <span>Next Credential</span>
              <ArrowRight size={15} />
            </span>
            <strong className="adjacent-title">{next.title}</strong>
            <span className="adjacent-badge">{next.issuer}</span>
          </a>
        </nav>
      </article>
    );
  }

  return (
    <div className="detail-page-shell" aria-labelledby="certs-index-title">
      <div className="detail-top-bar">
        <a
          href="/"
          className="neo-pill-back"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('/');
          }}
        >
          <ArrowLeft size={16} />
          <span>Back to Story Home</span>
        </a>
      </div>

      <header className="detail-header-block">
        <span className="section-kicker">
          <span className="stud-dot" />
          <span>CERTIFICATIONS & TECHNICAL TRAINING</span>
        </span>
        <h1 id="certs-index-title" className="detail-main-title">
          Verified Credentials & Foundations
        </h1>
        <p className="detail-subtitle">
          Formal coursework and certifications in Business Intelligence, Full-Stack MERN Engineering, and Data Structures & Algorithms.
        </p>
      </header>

      <div className="certs-grid">
        {CERTIFICATIONS.map((cert) => (
          <article key={cert.slug} className="cert-card">
            <div className="cert-card-top">
              <span className="cert-issuer-pill">
                <Award size={15} aria-hidden="true" />
                <span>{cert.issuer}</span>
              </span>
              <span className="cert-date-pill">{cert.issueDate}</span>
            </div>

            <h2 className="cert-card-title">
              <a
                href={`/certifications/${cert.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(`/certifications/${cert.slug}`);
                }}
              >
                {cert.title}
              </a>
            </h2>

            <p className="cert-card-summary">{cert.summary}</p>

            <ul className="cert-skills-list">
              {cert.skills.map((skill) => (
                <li key={skill}>
                  <CheckCircle2 size={14} aria-hidden="true" />
                  <span>{skill}</span>
                </li>
              ))}
            </ul>

            <div className="cert-card-actions">
              <a
                href={`/certifications/${cert.slug}`}
                className="neo-btn neo-btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(`/certifications/${cert.slug}`);
                }}
              >
                <span>Credential Details</span>
                <ArrowRight size={15} />
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
