import React, { useState } from 'react';
import { Sparkles, Shield, Sun, Menu, X, ArrowUpRight } from 'lucide-react';
import { OWNER_PROFILE } from '../data/portfolioData';

export default function Header({
  currentPath = '/',
  onNavigate,
  gothamMode = false,
  onToggleGotham,
  onTriggerTrick,
  activeOutfit = 'base',
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLink = (e, targetPath, hash = null) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(targetPath, hash);
    }
  };

  const outfitBadgeNames = {
    base: 'Studio Black',
    doctor: '01 · MediStudyGo Doctor',
    techy: '02/03 · Tech & AI Dev',
    masterplayer: '04 · Print Atelier',
    gotham: 'Gotham Brick Vigilante',
  };

  const effectiveOutfit = gothamMode ? 'gotham' : activeOutfit;

  return (
    <header className="site-header" role="banner">
      <div className="site-header-inner">
        {/* Brand Identity */}
        <a
          href="/"
          className="brand-pill"
          onClick={(e) => handleLink(e, '/')}
          aria-label="Avichal Goyal — Home"
        >
          <span className="brand-stud" aria-hidden="true" />
          <span className="brand-name">{OWNER_PROFILE.name}</span>
          <span className="brand-outfit-chip" title="Current 3D Minifigure Outfit">
            {outfitBadgeNames[effectiveOutfit] || 'Studio'}
          </span>
        </a>

        {/* Primary Desktop Navigation */}
        <nav className="site-nav-desktop" aria-label="Main Navigation">
          <a
            href="/#stories"
            className={`nav-link ${currentPath === '/' ? 'is-active' : ''}`}
            onClick={(e) => handleLink(e, '/', 'stories')}
          >
            Featured Stories
          </a>
          <a
            href="/work"
            className={`nav-link ${currentPath.startsWith('/work') ? 'is-active' : ''}`}
            onClick={(e) => handleLink(e, '/work')}
          >
            All Work (15)
          </a>
          <a
            href="/#open-source"
            className="nav-link"
            onClick={(e) => handleLink(e, '/', 'open-source')}
          >
            Open Source
          </a>
          <a
            href="/certifications"
            className={`nav-link ${currentPath.startsWith('/certifications') ? 'is-active' : ''}`}
            onClick={(e) => handleLink(e, '/certifications')}
          >
            Credentials
          </a>
          <a
            href="/#contact"
            className="nav-link"
            onClick={(e) => handleLink(e, '/', 'contact')}
          >
            Contact
          </a>
        </nav>

        {/* Action Controls: Do a Trick + Go Gotham Toggle */}
        <div className="header-actions">
          <button
            type="button"
            className="header-pill-btn header-trick-btn"
            onClick={onTriggerTrick}
            title="Make the 3D minifigure perform a physical trick"
          >
            <Sparkles size={15} aria-hidden="true" />
            <span>Do a trick</span>
          </button>

          <button
            type="button"
            className={`header-pill-btn header-gotham-btn ${gothamMode ? 'is-gotham-active' : ''}`}
            onClick={onToggleGotham}
            aria-pressed={gothamMode}
            title={
              gothamMode
                ? 'Return to daylight brick studio mode'
                : 'Transform into original brick-built nocturnal vigilante mode'
            }
          >
            {gothamMode ? (
              <>
                <Sun size={15} aria-hidden="true" />
                <span>Studio Mode</span>
              </>
            ) : (
              <>
                <Shield size={15} aria-hidden="true" />
                <span>Go Gotham</span>
              </>
            )}
          </button>

          <button
            type="button"
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <nav className="site-nav-mobile" aria-label="Mobile Navigation">
          <a href="/#stories" onClick={(e) => handleLink(e, '/', 'stories')}>
            01–04 · Featured Product Stories
          </a>
          <a href="/work" onClick={(e) => handleLink(e, '/work')}>
            All Work & Archive (15 Projects)
          </a>
          <a href="/#open-source" onClick={(e) => handleLink(e, '/', 'open-source')}>
            Open Source & Developer Tools
          </a>
          <a href="/certifications" onClick={(e) => handleLink(e, '/certifications')}>
            Certifications & Credentials
          </a>
          <a href="/#contact" onClick={(e) => handleLink(e, '/', 'contact')}>
            Contact & Copy Email
          </a>
          <div className="mobile-nav-footer">
            <a
              href={OWNER_PROFILE.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="neo-btn neo-btn-secondary"
            >
              <span>Resume PDF</span>
              <ArrowUpRight size={14} />
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
