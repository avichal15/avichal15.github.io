import React from 'react';
import { CERTIFICATIONS } from '../data/portfolioData';

export default function Certifications({ onSelectCertification }) {
  return (
    <section id="certifications" className="bento-section bg-grid">
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
              onClick={() => onSelectCertification && onSelectCertification(cert.slug)}
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
                  <span>{cert.issueDate}</span>
                  <span>·</span>
                  <span>ID: {cert.credentialId}</span>
                </div>
                <h3 className="bento-card__title">{cert.title}</h3>
                <p className="bento-card__summary">{cert.summary}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
