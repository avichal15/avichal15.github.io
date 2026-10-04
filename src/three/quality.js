// ---------------------------------------------------------------------------
// Device capability tiers (pure module — safe to import from the main chunk).
// T0: no WebGL          → poster fallback only (no Canvas)
// T1: reduced motion / very weak device → static assembled frame
// T2: mobile            → low dpr, 24×24 studs, no idle motion
// T3: desktop           → full dpr, 48×48 studs, idle motion
// NOTE: the runtime FPS governor lives in ./useFpsGovernor.js so this module
// never pulls @react-three/fiber into the main bundle.
// ---------------------------------------------------------------------------

const TIERS = {
    0: { level: 0, dpr: [1, 1], studGrid: 0, idle: false, static: true },
    1: { level: 1, dpr: [1, 1], studGrid: 16, idle: false, static: true },
    2: { level: 2, dpr: [1, 1.5], studGrid: 24, idle: false, static: false },
    3: { level: 3, dpr: [1, 2], studGrid: 48, idle: true, static: false },
};

/** Probe WebGL support once. Returns the context or null. */
export function probeWebGL() {
    try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('webgl2') || canvas.getContext('webgl') || null;
        // Release the probed context immediately so it can't occupy a GPU
        // slot before the real Canvas mounts.
        ctx?.getExtension('WEBGL_lose_context')?.loseContext();
        return ctx;
    } catch {
        return null;
    }
}

function prefersReducedMotion() {
    return typeof window !== 'undefined'
        && typeof window.matchMedia === 'function'
        && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function isMobile() {
    if (typeof window === 'undefined') return false;
    if (window.innerWidth < 768) return true;
    return /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent || '');
}

/** Resolve the quality tier for the current device. */
export function resolveTier() {
    if (typeof window === 'undefined' || !probeWebGL()) return TIERS[0];

    const cores = navigator.hardwareConcurrency ?? 8;
    const memory = navigator.deviceMemory ?? 8;

    if (prefersReducedMotion() || cores <= 2 || memory <= 2) return TIERS[1];
    if (isMobile()) return TIERS[2];
    return TIERS[3];
}

/** Step one tier down (never below T1 — a static frame always works). */
export function downgradeTier(tier) {
    const next = Math.max(1, tier.level - 1);
    return next === tier.level ? tier : TIERS[next];
}
