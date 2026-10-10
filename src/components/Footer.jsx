import React, { useState } from 'react';
import { Copy, Check, ArrowUpRight, Mail, FileText, Shield } from 'lucide-react';
import { OWNER_PROFILE, FEATURED_STORIES } from '../data/portfolioData';

export default function Footer({ onNavigate, gothamMode = false, onToggleGotham }) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(OWNER_PROFILE.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2600);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = OWNER_PROFILE.email;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2600);
    }
  };

  return (
    <footer id="contact" className="site-footer" role="contentinfo">
      <div className="footer-container">
        {/* Main Contact Callout Card */}
        <div className="contact-hero-card">
          <div className="contact-card-left">
            <span className="section-kicker">
              <span className="stud-dot" aria-hidden="true" />
              <span>LET’S BUILD SOMETHING REAL</span>
            </span>
            <h2 className="contact-headline">
              Need a product-minded engineer for a web app, AI workflow, or 3D commerce experience?
            </h2>
            <p className="contact-subcopy">
              I’m available for full-time product/software engineering roles and select technical collaborations. Reach out directly by email or LinkedIn — no agency middlemen.
            </p>

            <div className="contact-primary-actions">
              <button
                type="button"
                className="neo-btn neo-btn-primary copy-email-btn"
                onClick={handleCopyEmail}
                aria-live="polite"
              >
                {copied ? <Check size={17} aria-hidden="true" /> : <Copy size={17} aria-hidden="true" />}
                <span>{copied ? `Copied: ${OWNER_PROFILE.email}` : `Copy email (${OWNER_PROFILE.email})`}</span>
              </button>

              <a href={`mailto:${OWNER_PROFILE.email}`} className="neo-btn neo-btn-secondary">
                <Mail size={16} aria-hidden="true" />
                <span>Open in Email App</span>
              </a>

              <a
                href={OWNER_PROFILE.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="neo-btn neo-btn-secondary"
              >
                <FileText size={16} aria-hidden="true" />
                <span>Resume (PDF)</span>
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="contact-card-right">
            <div className="contact-direct-box">
              <span className="direct-box-label">DIRECT CHANNELS</span>
              <ul className="direct-links-list">
                <li>
                  <a href={OWNER_PROFILE.githubUrl} target="_blank" rel="noopener noreferrer">
                    <span>GitHub (@avichal15)</span>
                    <ArrowUpRight size={15} />
                  </a>
                </li>
                <li>
                  <a href={OWNER_PROFILE.linkedinUrl} target="_blank" rel="noopener noreferrer">
                    <span>LinkedIn (avichalgoyal007)</span>
                    <ArrowUpRight size={15} />
                  </a>
                </li>
                <li>
                  <a href={`mailto:${OWNER_PROFILE.email}`}>
                    <span>{OWNER_PROFILE.email}</span>
                    <ArrowUpRight size={15} />
                  </a>
                </li>
              </ul>
              <button
                type="button"
                className="footer-gotham-switch"
                onClick={onToggleGotham}
                aria-pressed={gothamMode}
              >
                <Shield size={14} aria-hidden="true" />
                <span>
                  {gothamMode ? 'Switch back to Daylight Studio' : 'Try "Go Gotham" Transformation'}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Sitemap & Legal/Attribution Bar */}
        <div className="footer-bottom-grid">
          <div className="footer-col">
            <span className="footer-col-title">FLAGSHIP STORIES</span>
            <ul>
              {FEATURED_STORIES.map((story) => (
                <li key={story.slug}>
                  <a
                    href={`/work/${story.slug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(`/work/${story.slug}`);
                    }}
                  >
                    {story.number} · {story.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <span className="footer-col-title">PORTFOLIO ROUTES</span>
            <ul>
              <li>
                <a
                  href="/work"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/work');
                  }}
                >
                  All Work & Archive (/work)
                </a>
              </li>
              <li>
                <a
                  href="/certifications"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/certifications');
                  }}
                >
                  Certifications & Credentials (/certifications)
                </a>
              </li>
              <li>
                <a href={OWNER_PROFILE.resumeUrl} target="_blank" rel="noopener noreferrer">
                  Download Resume (/resume.pdf)
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <span className="footer-col-title">COLOPHON & IP NOTE</span>
            <p className="footer-colophon">
              Built with React 19, Three.js, React Three Fiber, and a custom Khronos glTF 2.0 minifigure rig. {OWNER_PROFILE.gothamModeNote}
            </p>
            <p className="footer-copyright">
              © {new Date().getFullYear()} {OWNER_PROFILE.name}. All product names and trademarks belong to their respective owners.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
