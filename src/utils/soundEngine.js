// Procedural WebAudio Synthesizer inspired by Sebastien Graf (sebg.ch)
// + Phoney's 6 Default In-Call Audio Emojis (Cheer, Faaah, Fart, Womp Womp, Wow, Yay!)

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.enabled = true;
    this.lastBlipAt = 0;

    if (typeof window !== 'undefined') {
      const saved = window.localStorage?.getItem('avichal-sound');
      if (saved === '0') {
        this.enabled = false;
      }
      const unlock = () => {
        if (this.enabled) {
          this.ensureContext();
        }
      };
      window.addEventListener('pointerdown', unlock, { passive: true });
      window.addEventListener('keydown', unlock, { passive: true });
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
    this.enabled = !this.enabled;
    if (typeof window !== 'undefined') {
      try {
        window.localStorage?.setItem('avichal-sound', this.enabled ? '1' : '0');
      } catch {
        // ignore storage errors
      }
    }
    if (this.enabled) {
      this.ensureContext();
      this.bell();
    }
    return this.enabled;
  }

  toggleMute() {
    const enabled = this.toggle();
    return !enabled;
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
    if (isBatman) {
      // Deep Gotham bass drop + bat-sonar shimmer
      this.tone(110, 0.45, 'sawtooth', 0.08, 0, 55);
      this.tone(220, 0.38, 'triangle', 0.06, 0.04, 110);
      this.tone(880, 0.18, 'sine', 0.05, 0.18, 1320);
    } else {
      this.bell();
    }
  }

  trick(trickId = 'dance') {
    if (typeof this[trickId] === 'function') {
      this[trickId]();
    } else {
      this.surprise();
    }
  }

  tone(freq, duration, type = 'sine', volume = 0.08, delay = 0, freqEnd = null) {
    if (!this.enabled) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    const start = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, start);
    if (freqEnd) {
      osc.frequency.exponentialRampToValueAtTime(Math.max(20, freqEnd), start + duration);
    }

    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.linearRampToValueAtTime(volume, start + Math.min(0.012, duration * 0.25));
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(start);
    osc.stop(start + duration + 0.01);
  }

  noise(duration, volume = 0.06, delay = 0, filterFreq = 1200, filterType = 'bandpass') {
    if (!this.enabled) return;
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

  // Character speech blip (plays as words highlight on scroll or in speech bubbles)
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
    // "Ah... choo!"
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
  // 1: Cheer 👏 | 2: Faaah 😱 | 3: Fart 💨 | 4: Womp Womp 😑 | 5: Wow 🤩 | 6: Yay! 🙌
  // ============================================================================
  playPhoneyEmoji(id) {
    if (!this.enabled) {
      this.enabled = true;
    }
    this.ensureContext();

    switch (id) {
      case 'cheer': {
        // 1: 👏 Cheer — warm crowd applause claps + bright celebration chord
        for (let i = 0; i < 9; i += 1) {
          this.noise(0.055, 0.075, i * 0.048, 1500 + (i % 3) * 350, 'bandpass');
        }
        [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
          this.tone(freq, 0.28, 'triangle', 0.055, 0.06 + idx * 0.045, freq * 1.03);
        });
        break;
      }
      case 'faaah': {
        // 2: 😱 Faaah — dramatic reverberant vocal-like descending "FAAAAH!"
        this.noise(0.12, 0.08, 0, 1800, 'highpass'); // initial "Fff"
        this.tone(620, 0.52, 'sawtooth', 0.065, 0.05, 290);
        this.tone(930, 0.48, 'triangle', 0.05, 0.06, 435);
        this.tone(310, 0.55, 'sine', 0.07, 0.05, 165);
        break;
      }
      case 'fart': {
        // 3: 💨 Fart — cheeky low-frequency brassy raspberry flutter
        this.tone(135, 0.36, 'sawtooth', 0.095, 0, 62);
        for (let i = 0; i < 7; i += 1) {
          this.tone(115 - i * 6, 0.045, 'square', 0.06, i * 0.045, 72);
        }
        this.noise(0.32, 0.065, 0.02, 260, 'lowpass');
        break;
      }
      case 'wompwomp': {
        // 4: 😑 Womp Womp — classic sad trombone 4-note descending slide (Bb -> A -> Ab -> G)
        const notes = [
          { f1: 466.16, f2: 446.0, d: 0.22, t: 0 },
          { f1: 440.0, f2: 420.0, d: 0.22, t: 0.24 },
          { f1: 415.3, f2: 396.0, d: 0.22, t: 0.48 },
          { f1: 392.0, f2: 330.0, d: 0.46, t: 0.72 },
        ];
        notes.forEach((n) => {
          this.tone(n.f1, n.d, 'sawtooth', 0.065, n.t, n.f2);
          this.tone(n.f1 * 0.5, n.d, 'triangle', 0.055, n.t, n.f2 * 0.5);
        });
        break;
      }
      case 'wow': {
        // 5: 🤩 Wow — expressive upward-then-downward vocal formant sweep + sparkle
        this.tone(260, 0.22, 'triangle', 0.085, 0, 680);
        this.tone(680, 0.26, 'triangle', 0.08, 0.2, 340);
        this.tone(1046.5, 0.14, 'sine', 0.055, 0.15, 1318.5);
        this.tone(1318.5, 0.18, 'sine', 0.05, 0.25, 1567.98);
        break;
      }
      case 'yay':
      default: {
        // 6: 🙌 Yay! — jubilant ascending fanfare + confetti shimmer
        const arp = [523.25, 659.25, 783.99, 1046.5, 1318.5];
        arp.forEach((f, idx) => {
          this.tone(f, 0.16, 'triangle', 0.075, idx * 0.055, f * 1.06);
        });
        this.noise(0.18, 0.05, 0.22, 2200, 'highpass');
        break;
      }
    }
  }
}

export const soundEngine = new SoundEngine();
export default soundEngine;
