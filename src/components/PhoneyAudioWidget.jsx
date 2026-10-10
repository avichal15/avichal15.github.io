import React, { useState } from 'react';
import { Volume2, Sparkles, ShieldCheck, ExternalLink } from 'lucide-react';
import { AUDIO_EMOJIS } from '../data/portfolioData';
import { playAudioEmojiSound } from '../utils/audioEmojiSynth';

export default function PhoneyAudioWidget({ betaCtaUrl, liveUrl, onReactionTrigger }) {
  const [activeSoundId, setActiveSoundId] = useState(null);
  const [lastPlayedLabel, setLastPlayedLabel] = useState(null);

  const handlePlay = (item) => {
    playAudioEmojiSound(item);
    setActiveSoundId(item.id);
    setLastPlayedLabel(item.label);
    if (onReactionTrigger) onReactionTrigger();
    window.setTimeout(() => {
      setActiveSoundId((curr) => (curr === item.id ? null : curr));
    }, 480);
  };

  return (
    <div className="phoney-audio-widget" aria-label="Phoney Interactive Audio Emoji Tray">
      <div className="phoney-widget-top">
        <div>
          <span className="phoney-widget-kicker">
            <Volume2 size={14} aria-hidden="true" />
            <span>LIVE INTERACTIVE TRAY · 6 CLEARED ORIGINAL AUDIO EMOJIS</span>
          </span>
          <h4 className="phoney-widget-title">
            Tap an Audio Emoji to hear how Phoney reacts on a call
          </h4>
        </div>
        {lastPlayedLabel && (
          <span className="phoney-playing-pill" role="status" aria-live="polite">
            <Sparkles size={13} aria-hidden="true" />
            <span>Played: {lastPlayedLabel}</span>
          </span>
        )}
      </div>

      <div className="phoney-emoji-grid">
        {AUDIO_EMOJIS.map((item) => {
          const isPlaying = activeSoundId === item.id;
          return (
            <button
              key={item.id}
              type="button"
              className={`phoney-emoji-btn ${isPlaying ? 'is-playing' : ''}`}
              onClick={() => handlePlay(item)}
            >
              <span className="phoney-emoji-icon" aria-hidden="true">
                {item.displayEmoji || item.emoji}
              </span>
              <span className="phoney-emoji-name">{item.label}</span>
              <span className="phoney-emoji-desc">{item.description}</span>
            </button>
          );
        })}
      </div>

      <div className="phoney-beta-bar">
        <div className="phoney-privacy-badge">
          <ShieldCheck size={16} aria-hidden="true" />
          <span>
            <strong>Android Early Access (India · 18+)</strong> — Opt-in beta testing active. Core calling works locally; zero covert or undisclosed call recording.
          </span>
        </div>
        <div className="phoney-beta-actions">
          {betaCtaUrl && (
            <a href={betaCtaUrl} className="neo-btn neo-btn-primary">
              <span>Request Beta Access</span>
            </a>
          )}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="neo-btn neo-btn-secondary"
            >
              <span>Explore phoney.avichalgoyal.me</span>
              <ExternalLink size={14} aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
