// ---------------------------------------------------------------------------
// Scroll-choreographed camera. Reads the shared scroll-progress ref + intro
// progress ref, interpolates CAMERA_PATH, and damps toward the target with
// maath/easing. Zero per-frame allocations: all temporaries at module scope.
// ---------------------------------------------------------------------------
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { damp3 } from 'maath/easing';
import { CAMERA_PATH, CAMERA_INTRO_POS } from '../components/lego/content.js';

// Module-scoped temporaries — preallocated once.
const _targetPos = new THREE.Vector3();
const _targetLook = new THREE.Vector3();
const _introPos = new THREE.Vector3(...CAMERA_INTRO_POS);
// Persistent damped lookAt point (camera.lookAt source of truth).
const _currentLook = new THREE.Vector3(0, 6, 0);

const KEYS = CAMERA_PATH.length;
const SMOOTH_TIME = 0.32; // damping smooth-time (seconds)

function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
}

/** Piecewise-smooth interpolation across the camera keyframes. */
function samplePath(t, outPos, outLook) {
    const f = Math.min(Math.max(t, 0), 1) * (KEYS - 1);
    const i = Math.min(Math.floor(f), KEYS - 2);
    const u = f - i;
    const s = u * u * (3 - 2 * u); // smoothstep between keys
    const a = CAMERA_PATH[i];
    const b = CAMERA_PATH[i + 1];
    outPos.set(
        a.pos[0] + (b.pos[0] - a.pos[0]) * s,
        a.pos[1] + (b.pos[1] - a.pos[1]) * s,
        a.pos[2] + (b.pos[2] - a.pos[2]) * s
    );
    outLook.set(
        a.lookAt[0] + (b.lookAt[0] - a.lookAt[0]) * s,
        a.lookAt[1] + (b.lookAt[1] - a.lookAt[1]) * s,
        a.lookAt[2] + (b.lookAt[2] - a.lookAt[2]) * s
    );
}

export default function CameraRig({ progressRef, introRef, snap = false }) {
    useFrame((state, delta) => {
        samplePath(progressRef.current, _targetPos, _targetLook);

        // Intro dolly: glide from the far establishing position toward
        // keyframe 0 before scroll takes over.
        const ip = introRef.current.p;
        if (ip < 1) {
            _targetPos.lerp(_introPos, 1 - easeOutCubic(ip));
        }

        if (snap) {
            // Static / demand-mode tiers: damping never converges in ~2
            // frames, so land exactly on the designed composition.
            state.camera.position.copy(_targetPos);
            _currentLook.copy(_targetLook);
        } else {
            damp3(state.camera.position, _targetPos, SMOOTH_TIME, delta);
            damp3(_currentLook, _targetLook, SMOOTH_TIME, delta);
        }
        state.camera.lookAt(_currentLook);
    });

    return null;
}
