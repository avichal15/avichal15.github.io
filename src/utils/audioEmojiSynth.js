let sharedAudioCtx = null;

function getAudioContext() {
  if (typeof window === 'undefined') return null;
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) return null;
  if (!sharedAudioCtx) {
    sharedAudioCtx = new AudioCtx();
  }
  if (sharedAudioCtx.state === 'suspended') {
    sharedAudioCtx.resume().catch(() => {});
  }
  return sharedAudioCtx;
}

export function playAudioEmojiSound(item) {
  const ctx = getAudioContext();
  if (!ctx || !item) return false;

  const now = ctx.currentTime;
  const dur = item.duration || 0.35;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = item.type || 'sine';
  osc.frequency.setValueAtTime(item.freqStart || 440, now);
  osc.frequency.exponentialRampToValueAtTime(Math.max(40, item.freqEnd || 880), now + dur);

  gain.gain.setValueAtTime(0.001, now);
  gain.gain.exponentialRampToValueAtTime(0.22, now + 0.03);
  gain.gain.exponentialRampToValueAtTime(0.001, now + dur);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + dur + 0.02);

  // Add harmonic overtone for sparkle/tada/chime
  if (item.id === 'sparkle' || item.id === 'tada' || item.id === 'chime') {
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime((item.freqStart || 523) * 1.25, now + 0.06);
    osc2.frequency.exponentialRampToValueAtTime((item.freqEnd || 1046) * 1.5, now + dur);
    gain2.gain.setValueAtTime(0.001, now + 0.06);
    gain2.gain.exponentialRampToValueAtTime(0.14, now + 0.1);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + dur);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.06);
    osc2.stop(now + dur + 0.03);
  }

  return true;
}
