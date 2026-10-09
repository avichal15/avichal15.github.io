import React, { useState } from 'react';
import { Eye, Smartphone, Monitor } from 'lucide-react';

export default function DeviceMockupShowcase({
  desktopSrc,
  desktopAlt,
  mobileSrc,
  mobileAlt,
  liveUrl,
  characterSheetImg,
  outfitLabel,
  accentColor = '#141619',
}) {
  const [showTurnaround, setShowTurnaround] = useState(false);

  return (
    <div className="device-showcase-wrap" style={{ '--showcase-accent': accentColor }}>
      <div className="device-showcase-stage">
        {/* Desktop Browser Frame */}
        <div className="mockup-browser-frame">
          <div className="mockup-browser-bar">
            <div className="mockup-browser-dots" aria-hidden="true">
              <span className="dot-red" />
              <span className="dot-yellow" />
              <span className="dot-green" />
            </div>
            <div className="mockup-browser-url">
              <Monitor size={12} aria-hidden="true" />
              <span>{liveUrl ? liveUrl.replace(/^https?:\/\//, '') : 'live-preview'}</span>
            </div>
          </div>
          <div className="mockup-browser-screen">
            <img src={desktopSrc} alt={desktopAlt} loading="lazy" />
          </div>
        </div>

        {/* Overlapping Art-Directed Mobile Phone Frame */}
        {mobileSrc && (
          <div className="mockup-phone-frame">
            <div className="mockup-phone-notch" aria-hidden="true">
              <span className="mockup-phone-speaker" />
            </div>
            <div className="mockup-phone-screen">
              <img src={mobileSrc} alt={mobileAlt} loading="lazy" />
            </div>
            <div className="mockup-phone-footer" aria-hidden="true">
              <Smartphone size={11} />
              <span>Mobile View</span>
            </div>
          </div>
        )}
      </div>

      {/* Optional Character Turnaround Reference Drawer */}
      {characterSheetImg && (
        <div className="turnaround-drawer-bar">
          <button
            type="button"
            className="turnaround-toggle-btn"
            onClick={() => setShowTurnaround((prev) => !prev)}
            aria-expanded={showTurnaround}
          >
            <Eye size={15} aria-hidden="true" />
            <span>
              {showTurnaround
                ? 'Hide Chapter Minifigure Turnaround Sheet'
                : `Inspect Chapter Outfit Sheet: ${outfitLabel}`}
            </span>
          </button>

          {showTurnaround && (
            <div className="turnaround-sheet-preview">
              <img
                src={characterSheetImg}
                alt={`Character turnaround reference sheet for ${outfitLabel}`}
                loading="lazy"
              />
              <p className="turnaround-sheet-caption">
                Source 4-view turnaround sheet used to build this chapter’s 3D minifigure outfit (`{outfitLabel}`).
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
