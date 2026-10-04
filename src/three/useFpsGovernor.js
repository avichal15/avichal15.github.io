// ---------------------------------------------------------------------------
// Runtime FPS governor — lives in the lazy three.js chunk only.
// Skips the first ~1s (shader compile / assembly jank), then samples frame
// deltas over a ~3s window and downgrades one tier if the average drops
// below 45 fps. Fires the callback at most once. Must be used inside an
// R3F Canvas.
// ---------------------------------------------------------------------------
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const WARMUP_SECONDS = 1;

export function useFpsGovernor(onDowngrade) {
    const sample = useRef({ warmup: 0, acc: 0, frames: 0, done: false });

    useFrame((_, delta) => {
        const s = sample.current;
        if (s.done || typeof onDowngrade !== 'function') return;
        const d = Math.min(delta, 0.25);
        // Cold-start window: shader compile / intro assembly jank is not
        // representative — burn the first second before averaging.
        if (s.warmup < WARMUP_SECONDS) {
            s.warmup += d;
            return;
        }
        s.acc += d;
        s.frames += 1;
        if (s.acc >= 3) {
            s.done = true;
            const fps = s.frames / s.acc;
            if (fps < 45) onDowngrade();
        }
    });
}
