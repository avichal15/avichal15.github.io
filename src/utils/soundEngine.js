// Procedural WebAudio Synthesizer inspired by Sebastien Graf (sebg.ch)
// + Phoney's 6 Default In-Call Audio Emojis (Cheer, Faaah, Fart, Womp Womp, Wow, Yay!)

const BATMAN_PITCH_RATIO = Math.pow(2, -4 / 12); // ~0.7937005 (-4 semitones)

class SoundEngine {
  constructor() {
    this.ctx = null;
    // Strictly muted by default; never autoplay until explicit user interaction
    this.enabled = false;
    this.volume = 0.85;
    this.isBatmanMode = false;
    this.audioCache = {};
    this.activeAudio = null;
    this.lastBlipAt = 0;

    if (typeof window !== 'undefined') {
      const unlock = () => {
        if (this.enabled) {
          this.ensureContext();
        }
      };
      window.addEventListener('pointerdown', unlock, { passive: true });
      window.addEventListener('keydown', unlock, { passive: true });
    }
  }

  setBatmanMode(isBatman) {
    this.isBatmanMode = Boolean(isBatman);
  }

  setEnabled(flag) {
    const next = Boolean(flag);
    const wasEnabled = this.enabled;
    this.enabled = next;
    if (!next) {
      this.stopActiveAudio();
    } else if (!wasEnabled) {
      this.ensureContext();
    }
    return this.enabled;
  }

  stopActiveAudio() {
    if (this.activeAudio) {
      try {
        this.activeAudio.pause();
        this.activeAudio.currentTime = 0;
      } catch {
        // Ignore audio reset errors
      }
      this.activeAudio = null;
    }
  }

  ensureContext() {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return null;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  toggle() {
    this.setEnabled(!this.enabled);
    if (this.enabled) {
      this.bell();
    }
    return this.enabled;
  }

  toggleMute() {
    const enabled = this.toggle();
    return !enabled;
  }

  click() {
    this.tone(540, 0.032, 'triangle', 0.048, 0, 780);
  }

  wake() {
    this.tone(440, 0.09, 'sine', 0.055, 0, 587.33);
    this.tone(587.33, 0.14, 'triangle', 0.05, 0.06, 880);
  }

  sleep() {
    this.tone(523.25, 0.12, 'sine', 0.05, 0, 392);
    this.tone(392, 0.18, 'triangle', 0.045, 0.08, 261.63);
  }

  pop() {
    this.tone(420, 0.055, 'triangle', 0.06, 0, 660);
  }

  Sparkle() {
    [523.25, 659.25, 783.99, 1046.5].forEach((f, idx) => {
      this.tone(f, 0.09, 'sine', 0.055, idx * 0.045, f * 1.06);
    });
  }

  openWindow() {
    this.whoosh();
    this.tone(330, 0.14, 'triangle', 0.06, 0.02, 660);
  }

  closeWindow() {
    this.whoosh();
    this.tone(580, 0.14, 'triangle', 0.06, 0.02, 260);
  }

  batmanTransform(isBatman = true) {
    this.isBatmanMode = Boolean(isBatman);
    if (!this.enabled) return;

    if (isBatman) {
      const ctx = this.ensureContext();
      if (!ctx) return;

      const now = ctx.currentTime;

      const brassOsc = ctx.createOscillator();
      const subOsc = ctx.createOscillator();
      const brassFilter = ctx.createBiquadFilter();
      const brassGain = ctx.createGain();

      brassOsc.type = 'sawtooth';
      brassOsc.frequency.setValueAtTime(80, now);
      brassOsc.frequency.exponentialRampToValueAtTime(150, now + 0.55);

      subOsc.type = 'triangle';
      subOsc.frequency.setValueAtTime(40, now);
      subOsc.frequency.exponentialRampToValueAtTime(75, now + 0.55);

      brassFilter.type = 'lowpass';
      brassFilter.Q.setValueAtTime(3.2, now);
      brassFilter.frequency.setValueAtTime(160, now);
      brassFilter.frequency.exponentialRampToValueAtTime(950, now + 0.55);

      brassGain.gain.setValueAtTime(0.0001, now);
      brassGain.gain.linearRampToValueAtTime(0.11, now + 0.08);
      brassGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.55);

      brassOsc.connect(brassFilter);
      subOsc.connect(brassFilter);
      brassFilter.connect(brassGain);
      brassGain.connect(ctx.destination);

      brassOsc.start(now);
      subOsc.start(now);
      brassOsc.stop(now + 0.56);
      subOsc.stop(now + 0.56);

      for (let i = 0; i < 6; i += 1) {
        const clickDelay = i * 0.055;
        const baseFreq = 920 + i * 115;
        this.tone(baseFreq, 0.028, 'square', 0.055, clickDelay, baseFreq * 1.45, true);
        this.noise(0.022, 0.045, clickDelay, 2400 + i * 220, 'bandpass');
      }

      const swooshDelay = 0.14;
      const swooshDur = 0.42;
      const swooshStart = now + swooshDelay;
      const swooshLen = Math.max(1, Math.floor(ctx.sampleRate * swooshDur));
      const swooshBuf = ctx.createBuffer(1, swooshLen, ctx.sampleRate);
      const swooshData = swooshBuf.getChannelData(0);
      for (let i = 0; i < swooshLen; i += 1) {
        swooshData[i] = Math.random() * 2 - 1;
      }

      const swooshSrc = ctx.createBufferSource();
      swooshSrc.buffer = swooshBuf;

      const swooshFilter = ctx.createBiquadFilter();
      swooshFilter.type = 'bandpass';
      swooshFilter.Q.setValueAtTime(1.8, swooshStart);
      swooshFilter.frequency.setValueAtTime(320, swooshStart);
      swooshFilter.frequency.exponentialRampToValueAtTime(1850, swooshStart + swooshDur * 0.45);
      swooshFilter.frequency.exponentialRampToValueAtTime(420, swooshStart + swooshDur);

      const swooshGain = ctx.createGain();
      swooshGain.gain.setValueAtTime(0.0001, swooshStart);
      swooshGain.gain.linearRampToValueAtTime(0.09, swooshStart + 0.09);
      swooshGain.gain.exponentialRampToValueAtTime(0.0001, swooshStart + swooshDur);

      swooshSrc.connect(swooshFilter);
      swooshFilter.connect(swooshGain);
      swooshGain.connect(ctx.destination);
      swooshSrc.start(swooshStart);
      swooshSrc.stop(swooshStart + swooshDur + 0.01);
    } else {
      this.bell();
    }
  }

  trick(trickId = 'dance') {
    if (trickId === 'superhero') {
      this.batmanTransform(true);
      return;
    }
    if (typeof this[trickId] === 'function') {
      this[trickId]();
    } else {
      this.surprise();
    }
  }

  playTrickSound(trickId) {
    return trickId === 'superhero' ? this.batmanTransform(true) : this.trick(trickId);
  }

  tone(freq, duration, type = 'sine', volume = 0.08, delay = 0, freqEnd = null, rawPitch = false, forcePlay = false) {
    if (!this.enabled && !forcePlay) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    const pitchScale = this.isBatmanMode && !rawPitch ? BATMAN_PITCH_RATIO : 1;
    const adjustedFreq = Math.max(20, freq * pitchScale);
    const adjustedFreqEnd =
      freqEnd !== null && freqEnd !== undefined ? Math.max(20, freqEnd * pitchScale) : null;

    const start = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(adjustedFreq, start);
    if (adjustedFreqEnd !== null) {
      osc.frequency.exponentialRampToValueAtTime(adjustedFreqEnd, start + duration);
    }

    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.linearRampToValueAtTime(volume, start + Math.min(0.012, duration * 0.25));
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(start);
    osc.stop(start + duration + 0.01);
  }

  noise(duration, volume = 0.06, delay = 0, filterFreq = 1200, filterType = 'bandpass', forcePlay = false) {
    if (!this.enabled && !forcePlay) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    const start = ctx.currentTime + delay;
    const length = Math.max(1, Math.floor(ctx.sampleRate * duration));
    const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < length; i += 1) {
      data[i] = Math.random() * 2 - 1;
    }

    const src = ctx.createBufferSource();
    src.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = filterType;
    filter.frequency.setValueAtTime(filterFreq, start);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(volume, start);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);

    src.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    src.start(start);
    src.stop(start + duration + 0.01);
  }

  blip(char = 'a') {
    if (!this.enabled) return;
    const now = performance.now();
    if (now - this.lastBlipAt < 38) return;
    this.lastBlipAt = now;

    const code =
      typeof char === 'number'
        ? 97 + (Math.abs(Math.round(char)) % 26)
        : typeof char === 'string' && char.length > 0
          ? char.charCodeAt(0)
          : 97;
    const base = 310 + ((code * 17) % 160);
    this.tone(base, 0.042, 'triangle', 0.045, 0, base * 1.12);
  }

  pat() {
    this.tone(320, 0.08, 'sine', 0.06, 0, 480);
    this.tone(480, 0.1, 'sine', 0.05, 0.06, 620);
  }

  surprise() {
    this.tone(280, 0.14, 'triangle', 0.09, 0, 740);
  }

  giggle() {
    [520, 640, 560, 720, 600, 780].forEach((f, i) => {
      this.tone(f, 0.065, 'triangle', 0.065, i * 0.068, f * 1.14);
    });
  }

  grab() {
    this.tone(240, 0.09, 'sine', 0.08, 0, 520);
  }

  drop() {
    this.tone(500, 0.12, 'sine', 0.08, 0, 190);
  }

  dizzy() {
    for (let i = 0; i < 8; i += 1) {
      const f = 340 + (i % 2 === 0 ? 110 : -70);
      this.tone(f, 0.09, 'sine', 0.055, i * 0.075, f * 1.15);
    }
  }

  sneeze() {
    this.tone(360, 0.14, 'triangle', 0.06, 0, 620);
    this.noise(0.18, 0.11, 0.15, 1400, 'bandpass');
    this.tone(520, 0.14, 'sawtooth', 0.06, 0.15, 210);
  }

  sulk() {
    this.tone(392, 0.18, 'triangle', 0.06, 0, 349);
    this.tone(330, 0.28, 'triangle', 0.06, 0.18, 240);
  }

  dance() {
    [330, 392, 494, 523, 659, 523, 659, 784].forEach((f, i) => {
      this.tone(f, 0.08, 'square', 0.04, i * 0.085, f * 1.04);
    });
  }

  backflip() {
    this.whoosh();
    this.tone(300, 0.22, 'triangle', 0.07, 0.04, 820);
    this.tone(660, 0.14, 'sine', 0.06, 0.28, 440);
  }

  spin() {
    for (let i = 0; i < 5; i += 1) {
      this.tone(360 + i * 90, 0.07, 'sine', 0.055, i * 0.055, 480 + i * 110);
    }
  }

  wave() {
    this.tone(523.25, 0.09, 'sine', 0.06, 0, 659.25);
    this.tone(659.25, 0.12, 'triangle', 0.055, 0.08, 783.99);
  }

  panic() {
    for (let i = 0; i < 6; i += 1) {
      this.tone(580, 0.06, 'sawtooth', 0.045, i * 0.07, 760);
    }
  }

  fly() {
    this.tone(220, 0.45, 'sine', 0.07, 0, 880);
    this.noise(0.35, 0.04, 0.05, 900, 'bandpass');
  }

  hiccup() {
    this.tone(280, 0.05, 'triangle', 0.09, 0, 680);
    this.tone(520, 0.04, 'sine', 0.05, 0.06, 420);
  }

  peekaboo() {
    this.tone(440, 0.07, 'sine', 0.06, 0, 330);
    this.tone(587, 0.11, 'triangle', 0.08, 0.22, 880);
  }

  selfie() {
    this.noise(0.045, 0.1, 0, 2400, 'highpass');
    this.tone(1200, 0.04, 'sine', 0.05, 0.03, 900);
  }

  vanish() {
    this.tone(720, 0.22, 'sine', 0.06, 0, 180);
    this.noise(0.18, 0.05, 0.02, 1600, 'bandpass');
  }

  whoosh() {
    this.noise(0.16, 0.045, 0, 800, 'bandpass');
  }

  bell() {
    this.tone(587.33, 0.14, 'sine', 0.07, 0, 880);
    this.tone(880, 0.22, 'sine', 0.06, 0.07, 1174.66);
  }

  // ============================================================================
  // PHONEY'S 6 DEFAULT QUICK TRAY AUDIO EMOJIS
  // Explicit user click on an Audio Emoji button plays that sample cleanly
  // while stopping any overlapping clip.
  // ============================================================================
  playPhoneyEmoji(id) {
    this.stopActiveAudio();
    this.ensureContext();

    const normalized = String(id || '').toLowerCase();
    const fileMap = {
      cheer: '/sounds/original/cheer.wav',
      faaah: '/sounds/original/faaah.wav',
      faah: '/sounds/original/faaah.wav',
      fart: '/sounds/original/fart.wav',
      wompwomp: '/sounds/original/womp-womp.wav',
      womp: '/sounds/original/womp-womp.wav',
      sad: '/sounds/original/womp-womp.wav',
      wow: '/sounds/original/wow.wav',
      yay: '/sounds/original/yay.wav',
    };

    const fallbackMap = {
      cheer: '/media/sounds/phoney/cheer.wav',
      faaah: '/media/sounds/phoney/faaah.wav',
      faah: '/media/sounds/phoney/faaah.wav',
      fart: '/media/sounds/phoney/fart.wav',
      wompwomp: '/media/sounds/phoney/womp-womp.wav',
      womp: '/media/sounds/phoney/womp-womp.wav',
      sad: '/media/sounds/phoney/womp-womp.wav',
      wow: '/media/sounds/phoney/wow.wav',
      yay: '/media/sounds/phoney/yay.wav',
    };

    const soundUrl = fileMap[normalized];
    const fallbackUrl = fallbackMap[normalized];
    const targetVolume = Math.max(0, Math.min(1, this.volume ?? 0.85));

    if (soundUrl && typeof Audio !== 'undefined') {
      try {
        const audio = new Audio(soundUrl);
        audio.volume = targetVolume;
        this.activeAudio = audio;
        this.audioCache[normalized] = audio;
        audio.play().catch(() => {
          if (fallbackUrl) {
            try {
              const fallbackAudio = new Audio(fallbackUrl);
              fallbackAudio.volume = targetVolume;
              this.activeAudio = fallbackAudio;
              fallbackAudio.play().catch(() => {
                this.synthesizePhoneyEmoji(normalized, true);
              });
              return;
            } catch {
              // Fall back to synthesis
            }
          }
          this.synthesizePhoneyEmoji(normalized, true);
        });
        return;
      } catch {
        // Fall back to synthesis
      }
    }
    this.synthesizePhoneyEmoji(normalized, true);
  }

  synthesizePhoneyEmoji(id, forcePlay = true) {
    switch (id) {
      case 'cheer': {
        for (let i = 0; i < 9; i += 1) {
          this.noise(0.055, 0.075, i * 0.048, 1500 + (i % 3) * 350, 'bandpass', forcePlay);
        }
        [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
          this.tone(freq, 0.28, 'triangle', 0.055, 0.06 + idx * 0.045, freq * 1.03, false, forcePlay);
        });
        break;
      }
      case 'faaah':
      case 'faah': {
        this.noise(0.12, 0.08, 0, 1800, 'highpass', forcePlay);
        this.tone(620, 0.52, 'sawtooth', 0.065, 0.05, 290, false, forcePlay);
        this.tone(930, 0.48, 'triangle', 0.05, 0.06, 435, false, forcePlay);
        this.tone(310, 0.55, 'sine', 0.07, 0.05, 165, false, forcePlay);
        break;
      }
      case 'fart': {
        this.tone(135, 0.36, 'sawtooth', 0.095, 0, 62, false, forcePlay);
        for (let i = 0; i < 7; i += 1) {
          this.tone(115 - i * 6, 0.045, 'square', 0.06, i * 0.045, 72, false, forcePlay);
        }
        this.noise(0.32, 0.065, 0.02, 260, 'lowpass', forcePlay);
        break;
      }
      case 'wompwomp':
      case 'womp':
      case 'sad': {
        const notes = [
          { f1: 466.16, f2: 446.0, d: 0.22, t: 0 },
          { f1: 440.0, f2: 420.0, d: 0.22, t: 0.24 },
          { f1: 415.3, f2: 396.0, d: 0.22, t: 0.48 },
          { f1: 392.0, f2: 330.0, d: 0.46, t: 0.72 },
        ];
        notes.forEach((n) => {
          this.tone(n.f1, n.d, 'sawtooth', 0.065, n.t, n.f2, false, forcePlay);
          this.tone(n.f1 * 0.5, n.d, 'triangle', 0.055, n.t, n.f2 * 0.5, false, forcePlay);
        });
        break;
      }
      case 'wow': {
        this.tone(260, 0.22, 'triangle', 0.085, 0, 680, false, forcePlay);
        this.tone(680, 0.26, 'triangle', 0.08, 0.2, 340, false, forcePlay);
        this.tone(1046.5, 0.14, 'sine', 0.055, 0.15, 1318.5, false, forcePlay);
        this.tone(1318.5, 0.18, 'sine', 0.05, 0.25, 1567.98, false, forcePlay);
        break;
      }
      case 'yay':
      default: {
        const arp = [523.25, 659.25, 783.99, 1046.5, 1318.5];
        arp.forEach((f, idx) => {
          this.tone(f, 0.16, 'triangle', 0.075, idx * 0.055, f * 1.06, false, forcePlay);
        });
        this.noise(0.18, 0.05, 0.22, 2200, 'highpass', forcePlay);
        break;
      }
    }
  }
}

export const soundEngine = new SoundEngine();
export default soundEngine;
