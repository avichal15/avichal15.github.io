import React from 'react';

export default function SpeechBubble({
  speaker = 'Avichal',
  badge = null,
  text = '',
  progress = 1,
  accentColor = '#E3000B',
}) {
  const words = text.trim().split(/\s+/);
  const activeWordCount = Math.max(
    1,
    Math.min(words.length, Math.ceil(progress * words.length))
  );

  return (
    <div
      className="speech-bubble-card"
      style={{ '--bubble-accent': accentColor }}
      aria-label={`${speaker}: ${text}`}
    >
      <div className="speech-bubble-header">
        <span className="speech-stud-dot" aria-hidden="true" />
        <span className="speech-speaker-name">{speaker}</span>
        {badge && <span className="speech-speaker-badge">{badge}</span>}
      </div>
      <p className="speech-bubble-copy">
        {words.map((word, idx) => {
          const isLit = idx < activeWordCount;
          return (
            <span
              key={idx}
              className={`speech-word ${isLit ? 'is-lit' : 'is-dim'}`}
            >
              {word}{' '}
            </span>
          );
        })}
      </p>
    </div>
  );
}
