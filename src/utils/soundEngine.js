// Procedural WebAudio Synthesizer inspired by Sebastien Graf (sebg.ch)
// Includes:
// 1. Per-word vocal syllable synthesizer (sebg.ch style) for normal character reading
// 2. Deep gravelly Dark Knight baritone vocal synthesizer for LEGO Batman mode
// 3. 13 bespoke multi-layered procedural sound effects for every character trick
// 4. Phoney's 6 Default In-Call Audio Emojis (Cheer, Faaah, Fart, Womp Womp, Wow, Yay!)

const BATMAN_PITCH_RATIO = Math.pow(2, -4 / 12); // ~0.7937005 (-4 semitones)

class SoundEngine {
  constructor() {
    this.ctx = null;
    // Enabled by default so speaking, Batman voice, and trick sounds play immediately once browser audio unlocks
    this.enabled = true;
    this.volume = 0.88;
    this.isBatmanMode = false;
    this.audioCache = {};
    this.activeAudio = null;
    this.lastBlipAt = 0;
    this.wordCounter = 0;

    if (typeof window !== 'undefined') {
      const unlock = () => {
        if (this.enabled) {
          this.ensureContext();
        }
      };
      window.addEventListener('pointerdown', unlock, { passive: true });
      window.addEventListener('keydown', unlock, { passive: true });
      window.addEventListener('wheel', unlock, { passive: true });
      window.addEventListener('touchstart', unlock, { passive: true });
      window.addEventListener('click', unlock, { passive: true });
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

  // ============================================================================
  // PER-WORD VOCAL SYNTHESIS (SEBG.CH WORD READER + LEGO BATMAN GRAVELLY VOICE)
  // Triggered every time the character reads/highlights a word while lips move
  // ============================================================================
  speakWord(word = '', wordIndex = 0) {
    if (!this.enabled) return;
    const nowPerf = performance.now();
    if (nowPerf - this.lastBlipAt < 42) return;
    this.lastBlipAt = nowPerf;

    const ctx = this.ensureContext();
    if (!ctx) return;

    const rawStr = String(word || 'a').trim();
    if (!rawStr) return;

    // Compute deterministic hash & prosody features from the word
    let hash = 0;
    for (let i = 0; i < rawStr.length; i += 1) {
      hash = (hash * 31 + rawStr.charCodeAt(i)) & 0xffff;
    }
    const isQuestion = rawStr.includes('?');
    const isExclaim = rawStr.includes('!');
    const isLongWord = rawStr.replace(/[^a-zA-Z]/g, '').length >= 6;
    const stepIndex = Number.isFinite(wordIndex) ? wordIndex : this.wordCounter++;

    if (this.isBatmanMode) {
      this.synthesizeBatmanWord(ctx, hash, stepIndex, isQuestion, isExclaim, isLongWord);
    } else {
      this.synthesizeNormalWord(ctx, hash, stepIndex, isQuestion, isExclaim, isLongWord);
    }
  }

  // Normal character voice: sebg.ch / Animal-Crossing style warm formant syllable blip
  synthesizeNormalWord(ctx, hash, stepIndex, isQuestion, isExclaim, isLongWord) {
    const now = ctx.currentTime;
    // Melodic pentatonic-inflected speech prosody around 330Hz - 480Hz
    const prosodyOffsets = [0, 22, -14, 34, -8, 18, -20, 28];
    const baseFreq =
      340 +
      (hash % 115) +
      prosodyOffsets[Math.abs(stepIndex) % prosodyOffsets.length] +
      (isExclaim ? 35 : 0);

    const endMultiplier = isQuestion ? 1.24 : isExclaim ? 1.15 : 1.08 + ((hash % 7) - 3) * 0.015;
    const dur = isLongWord ? 0.068 : 0.052;

    const playSyllable = (startFreq, endFreq, startOffset, syllableDur, gainPeak) => {
      const t0 = now + startOffset;
      const oscMain = ctx.createOscillator();
      const oscHarm = ctx.createOscillator();
      const formant = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      oscMain.type = 'triangle';
      oscMain.frequency.setValueAtTime(startFreq, t0);
      oscMain.frequency.exponentialRampToValueAtTime(
        Math.max(80, endFreq),
        t0 + syllableDur
      );

      oscHarm.type = 'sine';
      oscHarm.frequency.setValueAtTime(startFreq * 2, t0);
      oscHarm.frequency.exponentialRampToValueAtTime(
        Math.max(160, endFreq * 1.95),
        t0 + syllableDur
      );

      // Vocal vowel formant resonance
      formant.type = 'bandpass';
      formant.Q.setValueAtTime(2.2, t0);
      const formantFreq = 1150 + (hash % 550);
      formant.frequency.setValueAtTime(formantFreq, t0);
      formant.frequency.exponentialRampToValueAtTime(formantFreq * 1.18, t0 + syllableDur);

      const harmGain = ctx.createGain();
      harmGain.gain.setValueAtTime(0.32, t0);

      gain.gain.setValueAtTime(0.0001, t0);
      gain.gain.linearRampToValueAtTime(gainPeak, t0 + 0.009);
      gain.gain.exponentialRampToValueAtTime(0.0001, t0 + syllableDur);

      oscMain.connect(formant);
      oscHarm.connect(harmGain);
      harmGain.connect(formant);
      formant.connect(gain);
      gain.connect(ctx.destination);

      oscMain.start(t0);
      oscHarm.start(t0);
      oscMain.stop(t0 + syllableDur + 0.01);
      oscHarm.stop(t0 + syllableDur + 0.01);
    };

    playSyllable(baseFreq, baseFreq * endMultiplier, 0, dur, 0.14);

    // Give longer words a natural second micro-syllable articulation
    if (isLongWord) {
      const secondFreq = baseFreq * (isQuestion ? 1.16 : 0.94);
      playSyllable(
        secondFreq,
        secondFreq * (isQuestion ? 1.22 : 1.06),
        dur * 0.78,
        0.044,
        0.11
      );
    }
  }

  // LEGO Batman voice: Deep, raspy, gravelly Dark Knight baritone growl
  synthesizeBatmanWord(ctx, hash, stepIndex, isQuestion, isExclaim, isLongWord) {
    const now = ctx.currentTime;
    // Deep sub-baritone fundamental (82Hz - 114Hz)
    const prosodyOffsets = [0, -4, 3, -6, 2, -5, 4, -3];
    const baseFreq =
      88 +
      (hash % 24) +
      prosodyOffsets[Math.abs(stepIndex) % prosodyOffsets.length] +
      (isExclaim ? 8 : 0);

    const endMultiplier = isQuestion ? 1.12 : isExclaim ? 0.92 : 0.95;
    const dur = isLongWord ? 0.082 : 0.066;

    const playGrowlSyllable = (startFreq, endFreq, startOffset, syllableDur, gainPeak) => {
      const t0 = now + startOffset;
      const sawOsc = ctx.createOscillator();
      const subOsc = ctx.createOscillator();
      const raspOsc = ctx.createOscillator();
      const throatFilter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      // Gravelly sawtooth vocal cords
      sawOsc.type = 'sawtooth';
      sawOsc.frequency.setValueAtTime(startFreq, t0);
      sawOsc.frequency.exponentialRampToValueAtTime(Math.max(45, endFreq), t0 + syllableDur);

      // Sub-octave chest resonance
      subOsc.type = 'square';
      subOsc.frequency.setValueAtTime(startFreq * 0.5, t0);
      subOsc.frequency.exponentialRampToValueAtTime(
        Math.max(28, endFreq * 0.5),
        t0 + syllableDur
      );

      // Slight detuned rasp oscillator for gravelly Batman texture
      raspOsc.type = 'sawtooth';
      raspOsc.frequency.setValueAtTime(startFreq * 1.035, t0);
      raspOsc.frequency.exponentialRampToValueAtTime(
        Math.max(45, endFreq * 0.98),
        t0 + syllableDur
      );

      const subGain = ctx.createGain();
      subGain.gain.setValueAtTime(0.55, t0);

      const raspGain = ctx.createGain();
      raspGain.gain.setValueAtTime(0.45, t0);

      // Dark throat-formant filter (320Hz - 520Hz)
      throatFilter.type = 'bandpass';
      throatFilter.Q.setValueAtTime(3.2, t0);
      const formantFreq = 310 + (hash % 160);
      throatFilter.frequency.setValueAtTime(formantFreq, t0);
      throatFilter.frequency.exponentialRampToValueAtTime(
        formantFreq * 0.86,
        t0 + syllableDur
      );

      gain.gain.setValueAtTime(0.0001, t0);
      gain.gain.linearRampToValueAtTime(gainPeak, t0 + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, t0 + syllableDur);

      sawOsc.connect(throatFilter);
      subOsc.connect(subGain);
      subGain.connect(throatFilter);
      raspOsc.connect(raspGain);
      raspGain.connect(throatFilter);

      throatFilter.connect(gain);
      gain.connect(ctx.destination);

      sawOsc.start(t0);
      subOsc.start(t0);
      raspOsc.start(t0);
      sawOsc.stop(t0 + syllableDur + 0.01);
      subOsc.stop(t0 + syllableDur + 0.01);
      raspOsc.stop(t0 + syllableDur + 0.01);

      // Subtle gravelly breath rasp
      this.noise(syllableDur * 0.75, gainPeak * 0.25, startOffset, 280 + (hash % 120), 'bandpass');
    };

    playGrowlSyllable(baseFreq, baseFreq * endMultiplier, 0, dur, 0.19);

    if (isLongWord) {
      const secondFreq = baseFreq * 0.94;
      playGrowlSyllable(secondFreq, secondFreq * 0.9, dur * 0.78, 0.056, 0.15);
    }
  }

  blip(char = 'a') {
    this.speakWord(String(char || 'a'), this.wordCounter++);
  }

  click() {
    this.tone(540, 0.036, 'triangle', 0.075, 0, 780);
  }

  wake() {
    this.tone(440, 0.09, 'sine', 0.08, 0, 587.33);
    this.tone(587.33, 0.14, 'triangle', 0.075, 0.06, 880);
  }

  sleep() {
    this.tone(523.25, 0.12, 'sine', 0.075, 0, 392);
    this.tone(392, 0.18, 'triangle', 0.07, 0.08, 261.63);
  }

  pop() {
    this.tone(420, 0.06, 'triangle', 0.09, 0, 680);
  }

  Sparkle() {
    [523.25, 659.25, 783.99, 1046.5].forEach((f, idx) => {
      this.tone(f, 0.09, 'sine', 0.08, idx * 0.045, f * 1.06);
    });
  }

  openWindow() {
    this.whoosh();
    this.tone(330, 0.14, 'triangle', 0.085, 0.02, 660);
  }

  closeWindow() {
    this.whoosh();
    this.tone(580, 0.14, 'triangle', 0.085, 0.02, 260);
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
      brassOsc.frequency.setValueAtTime(75, now);
      brassOsc.frequency.exponentialRampToValueAtTime(146.83, now + 0.58);

      subOsc.type = 'triangle';
      subOsc.frequency.setValueAtTime(37.5, now);
      subOsc.frequency.exponentialRampToValueAtTime(73.42, now + 0.58);

      brassFilter.type = 'lowpass';
      brassFilter.Q.setValueAtTime(3.6, now);
      brassFilter.frequency.setValueAtTime(160, now);
      brassFilter.frequency.exponentialRampToValueAtTime(1050, now + 0.58);

      brassGain.gain.setValueAtTime(0.0001, now);
      brassGain.gain.linearRampToValueAtTime(0.16, now + 0.08);
      brassGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);

      brassOsc.connect(brassFilter);
      subOsc.connect(brassFilter);
      brassFilter.connect(brassGain);
      brassGain.connect(ctx.destination);

      brassOsc.start(now);
      subOsc.start(now);
      brassOsc.stop(now + 0.62);
      subOsc.stop(now + 0.62);

      // LEGO armor plate click-assembly burst
      for (let i = 0; i < 6; i += 1) {
        const clickDelay = i * 0.052;
        const baseFreq = 920 + i * 115;
        this.tone(baseFreq, 0.032, 'square', 0.075, clickDelay, baseFreq * 1.45, true);
        this.noise(0.026, 0.065, clickDelay, 2400 + i * 220, 'bandpass');
      }

      // Cape billow swoosh
      this.noise(0.42, 0.11, 0.14, 680, 'bandpass');
    } else {
      this.bell();
    }
  }

  // ============================================================================
  // BESPOKE PROCEDURAL SOUND EFFECTS FOR ALL 13 CHARACTER TRICKS
  // ============================================================================
  trick(trickId = 'dance') {
    this.ensureContext();
    if (trickId === 'superhero') {
      this.superhero();
      return;
    }
    if (typeof this[trickId] === 'function') {
      this[trickId]();
    } else {
      this.surprise();
    }
  }

  playTrickSound(trickId) {
    this.ensureContext();
    return this.trick(trickId);
  }

  // 1. DANCE — Upbeat funky synth bass + chiptune lead groove + rhythmic shaker
  dance() {
    const melody = [330, 392, 493.88, 523.25, 659.25, 523.25, 659.25, 783.99];
    const bass = [164.81, 164.81, 196.0, 261.63];
    melody.forEach((f, i) => {
      const t = i * 0.095;
      this.tone(f, 0.085, 'square', 0.085, t, f * 1.04);
      this.tone(f * 0.5, 0.085, 'triangle', 0.09, t, f * 0.52);
      if (i % 2 === 1) {
        this.noise(0.035, 0.06, t, 3800, 'highpass');
      }
    });
    bass.forEach((b, i) => {
      this.tone(b, 0.16, 'sawtooth', 0.08, i * 0.19, b * 0.98);
    });
  }

  // 2. BACKFLIP — Springy jump boing -> mid-air 360° wind spin -> LEGO brick landing snap + fanfare
  backflip() {
    // Launch boing
    this.tone(210, 0.18, 'triangle', 0.13, 0, 740);
    this.tone(315, 0.16, 'sine', 0.09, 0.02, 920);
    // Mid-air 360° somersault wind whoosh
    this.noise(0.24, 0.11, 0.14, 1100, 'bandpass');
    this.tone(680, 0.16, 'sine', 0.08, 0.18, 340);
    // Solid LEGO plastic landing snap + chord
    this.tone(150, 0.09, 'triangle', 0.15, 0.42, 55, true);
    this.noise(0.04, 0.11, 0.42, 2200, 'bandpass');
    this.tone(523.25, 0.16, 'triangle', 0.09, 0.46, 659.25);
    this.tone(783.99, 0.2, 'sine', 0.09, 0.52, 1046.5);
  }

  // 3. 360° SPIN — Accelerating vortex Doppler whoosh + ascending harmonic arpeggio
  spin() {
    for (let i = 0; i < 7; i += 1) {
      const delay = i * 0.055;
      const startF = 300 + i * 95;
      this.tone(startF, 0.075, 'triangle', 0.095, delay, startF * 1.32);
      this.noise(0.06, 0.065, delay, 700 + i * 280, 'bandpass');
    }
    this.tone(1046.5, 0.18, 'sine', 0.1, 0.4, 1318.5);
  }

  // 4. SUPERHERO LANDING — Supersonic dive whistle -> seismic ground impact boom + Dark Knight brass
  superhero() {
    // High-altitude dive whistle
    this.tone(920, 0.24, 'sine', 0.1, 0, 140, true);
    this.noise(0.22, 0.09, 0.02, 1400, 'bandpass');
    // Heavy ground impact thud at t = 0.24s
    this.tone(110, 0.28, 'sawtooth', 0.16, 0.23, 34, true);
    this.tone(75, 0.32, 'triangle', 0.18, 0.23, 28, true);
    this.noise(0.18, 0.14, 0.23, 420, 'lowpass');
    // Heroic brass swell
    this.batmanTransform(true);
  }

  // 5. PANIC — Urgent dual-tone cartoon klaxon siren + rapid skittering footsteps
  panic() {
    for (let i = 0; i < 8; i += 1) {
      const t = i * 0.072;
      const isHigh = i % 2 === 0;
      this.tone(isHigh ? 780 : 540, 0.068, 'sawtooth', 0.09, t, isHigh ? 920 : 480);
      this.tone(1100 + (i % 3) * 180, 0.028, 'square', 0.055, t + 0.02, 1450);
    }
  }

  // 6. FLY — Jet-thruster ignition whoosh + soaring anti-gravity harmonic shimmer
  fly() {
    this.noise(0.48, 0.1, 0, 950, 'bandpass');
    this.tone(196, 0.52, 'sawtooth', 0.08, 0, 783.99);
    this.tone(293.66, 0.5, 'triangle', 0.11, 0.04, 1174.66);
    [587.33, 783.99, 987.77, 1174.66].forEach((f, idx) => {
      this.tone(f, 0.12, 'sine', 0.075, 0.26 + idx * 0.06, f * 1.08);
    });
  }

  // 7. VANISH — Ninja smoke-bomb "POOF!" + descending teleport chime + reappear sparkle
  vanish() {
    // Smoke-bomb pop & poof
    this.tone(480, 0.06, 'triangle', 0.12, 0, 160);
    this.noise(0.22, 0.12, 0.02, 1400, 'bandpass');
    // Descending mystery notes
    [880, 698.46, 587.33, 440, 329.63].forEach((f, i) => {
      this.tone(f, 0.07, 'sine', 0.085, 0.04 + i * 0.048, f * 0.88);
    });
    // Reappear sparkle chime
    [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => {
      this.tone(f, 0.08, 'triangle', 0.075, 0.55 + i * 0.04, f * 1.06);
    });
  }

  // 8. HICCUP — Classic cartoon "HIC-cup!" sharp glottal pitch jump + cute secondary squeak
  hiccup() {
    this.tone(240, 0.055, 'triangle', 0.14, 0, 820);
    this.tone(680, 0.045, 'sine', 0.1, 0.055, 420);
    // Second tiny hiccup
    this.tone(290, 0.05, 'triangle', 0.11, 0.38, 920);
    this.tone(740, 0.04, 'sine', 0.08, 0.43, 480);
  }

  // 9. PEEKABOO — Hand-cover rustle -> suspense pause -> playful "Peek-a-BOO!" reveal
  peekaboo() {
    // Cover eyes ("Peek-a...")
    this.tone(440, 0.08, 'triangle', 0.095, 0, 330);
    this.tone(330, 0.08, 'triangle', 0.095, 0.09, 392);
    // "...BOO!" reveal
    this.tone(587.33, 0.14, 'triangle', 0.13, 0.25, 880);
    this.tone(880, 0.18, 'sine', 0.11, 0.31, 1174.66);
  }

  // 10. TAKE A SELFIE — Autofocus double-beep -> crisp mechanical camera shutter + flash whine
  selfie() {
    // Autofocus lock double-beep
    this.tone(1480, 0.038, 'sine', 0.085, 0, 1480, true);
    this.tone(1480, 0.038, 'sine', 0.085, 0.06, 1480, true);
    // Mechanical shutter click + mirror slap
    this.noise(0.045, 0.15, 0.14, 2600, 'highpass');
    this.tone(920, 0.035, 'square', 0.09, 0.14, 340, true);
    this.noise(0.04, 0.12, 0.19, 1800, 'bandpass');
    // Xenon flash capacitor charge whine
    this.tone(620, 0.24, 'sine', 0.06, 0.21, 1760, true);
  }

  // 11. GET DIZZY — Swirling cartoon cuckoo-stars vibrato loop
  dizzy() {
    const notes = [440, 554.37, 392, 523.25, 466.16, 622.25, 415.3, 587.33];
    notes.forEach((f, i) => {
      this.tone(f, 0.095, 'sine', 0.095, i * 0.072, f * (i % 2 === 0 ? 1.18 : 0.85));
      this.tone(f * 1.5, 0.08, 'triangle', 0.05, i * 0.072 + 0.02, f * 1.35);
    });
  }

  // 12. SNEEZE — Two-stage "Ah... AHHH... ACHOO!" inhale build-up + explosive sneeze burst
  sneeze() {
    // "Ah..."
    this.tone(320, 0.11, 'triangle', 0.09, 0, 480);
    // "...AHHH..."
    this.tone(420, 0.14, 'triangle', 0.11, 0.14, 680);
    // "...ACHOO!"
    this.noise(0.22, 0.16, 0.3, 1500, 'bandpass');
    this.tone(640, 0.18, 'sawtooth', 0.11, 0.3, 190);
    this.tone(320, 0.16, 'triangle', 0.1, 0.32, 130);
  }

  // 13. SULK — Expressive sad trombone ("Wah, wah, wah, waaaah...")
  sulk() {
    const notes = [
      { f1: 392.0, f2: 370.0, d: 0.16, t: 0 },
      { f1: 369.99, f2: 349.23, d: 0.16, t: 0.18 },
      { f1: 349.23, f2: 329.63, d: 0.16, t: 0.36 },
      { f1: 329.63, f2: 246.94, d: 0.38, t: 0.54 },
    ];
    notes.forEach((n) => {
      this.tone(n.f1, n.d, 'sawtooth', 0.085, n.t, n.f2);
      this.tone(n.f1 * 0.5, n.d, 'triangle', 0.09, n.t, n.f2 * 0.5);
    });
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

    const scaledVol = Math.min(0.35, volume * (this.volume ?? 0.88));
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.linearRampToValueAtTime(scaledVol, start + Math.min(0.012, duration * 0.25));
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

    const scaledVol = Math.min(0.35, volume * (this.volume ?? 0.88));
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(scaledVol, start);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);

    src.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    src.start(start);
    src.stop(start + duration + 0.01);
  }

  pat() {
    this.tone(320, 0.08, 'sine', 0.085, 0, 480);
    this.tone(480, 0.1, 'sine', 0.075, 0.06, 620);
  }

  surprise() {
    this.tone(280, 0.14, 'triangle', 0.11, 0, 740);
  }

  giggle() {
    [520, 640, 560, 720, 600, 780].forEach((f, i) => {
      this.tone(f, 0.065, 'triangle', 0.09, i * 0.068, f * 1.14);
    });
  }

  grab() {
    this.tone(240, 0.09, 'sine', 0.1, 0, 520);
  }

  drop() {
    this.tone(500, 0.12, 'sine', 0.1, 0, 190);
  }

  wave() {
    this.tone(523.25, 0.09, 'sine', 0.085, 0, 659.25);
    this.tone(659.25, 0.12, 'triangle', 0.08, 0.08, 783.99);
  }

  whoosh() {
    this.noise(0.16, 0.07, 0, 800, 'bandpass');
  }

  bell() {
    this.tone(587.33, 0.14, 'sine', 0.09, 0, 880);
    this.tone(880, 0.22, 'sine', 0.08, 0.07, 1174.66);
  }

  // ============================================================================
  // PHONEY'S 6 DEFAULT QUICK TRAY AUDIO EMOJIS
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
    const targetVolume = Math.max(0, Math.min(1, this.volume ?? 0.88));

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
          this.noise(0.055, 0.085, i * 0.048, 1500 + (i % 3) * 350, 'bandpass', forcePlay);
        }
        [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
          this.tone(freq, 0.28, 'triangle', 0.07, 0.06 + idx * 0.045, freq * 1.03, false, forcePlay);
        });
        break;
      }
      case 'faaah':
      case 'faah': {
        this.noise(0.12, 0.09, 0, 1800, 'highpass', forcePlay);
        this.tone(620, 0.52, 'sawtooth', 0.08, 0.05, 290, false, forcePlay);
        this.tone(930, 0.48, 'triangle', 0.065, 0.06, 435, false, forcePlay);
        this.tone(310, 0.55, 'sine', 0.085, 0.05, 165, false, forcePlay);
        break;
      }
      case 'fart': {
        this.tone(135, 0.36, 'sawtooth', 0.11, 0, 62, false, forcePlay);
        for (let i = 0; i < 7; i += 1) {
          this.tone(115 - i * 6, 0.045, 'square', 0.075, i * 0.045, 72, false, forcePlay);
        }
        this.noise(0.32, 0.08, 0.02, 260, 'lowpass', forcePlay);
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
          this.tone(n.f1, n.d, 'sawtooth', 0.08, n.t, n.f2, false, forcePlay);
          this.tone(n.f1 * 0.5, n.d, 'triangle', 0.07, n.t, n.f2 * 0.5, false, forcePlay);
        });
        break;
      }
      case 'wow': {
        this.tone(260, 0.22, 'triangle', 0.1, 0, 680, false, forcePlay);
        this.tone(680, 0.26, 'triangle', 0.095, 0.2, 340, false, forcePlay);
        this.tone(1046.5, 0.14, 'sine', 0.07, 0.15, 1318.5, false, forcePlay);
        this.tone(1318.5, 0.18, 'sine', 0.065, 0.25, 1567.98, false, forcePlay);
        break;
      }
      case 'yay':
      default: {
        const arp = [523.25, 659.25, 783.99, 1046.5, 1318.5];
        arp.forEach((f, idx) => {
          this.tone(f, 0.16, 'triangle', 0.09, idx * 0.055, f * 1.06, false, forcePlay);
        });
        this.noise(0.18, 0.065, 0.22, 2200, 'highpass', forcePlay);
        break;
      }
    }
  }
}

export const soundEngine = new SoundEngine();
export default soundEngine;
