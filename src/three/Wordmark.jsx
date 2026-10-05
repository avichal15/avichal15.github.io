// ---------------------------------------------------------------------------
// Brick-built "AVICHAL GOYAL" wordmark — single instancedMesh (~210 bricks),
// one plastic material, per-brick color via instanceColor. Intro assembly is
// a per-instance staggered drop-in driven by the shared intro progress ref.
// Once assembled, matrix updates stop entirely (needsUpdate = false).
// ---------------------------------------------------------------------------
import React, { useLayoutEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { brickGeometry, wordmarkPlastic } from './assets';
import { getWordmarkBricks, backOut } from './wordmark';

// Module-scoped temporaries — zero allocations inside the frame loop.
const dummy = new THREE.Object3D();
const tempColor = new THREE.Color();

// Layout in world space: floating above/behind the minifig.
const WORDMARK_POSITION = [0, 8.2, -2];
const WORDMARK_SCALE = 0.26;

// Stagger layout (normalised intro-progress units): bricks cascade left→right.
// Spread × 1.7s ≈ 480ms — inside the 500ms stagger budget.
const STAGGER_SPAN = 0.28;  // first→last brick start spread
const BRICK_SPAN = 0.17;    // each brick's snap ≈ 290ms of the 1.7s timeline
const DROP_HEIGHT = 4;      // local units each brick falls from

export default function Wordmark({ introRef }) {
    const meshRef = useRef(null);
    const doneRef = useRef(false);
    const bricks = useMemo(() => getWordmarkBricks(), []);
    const count = bricks.length;

    const writeMatrices = (p) => {
        const mesh = meshRef.current;
        if (!mesh) return;
        for (let i = 0; i < count; i += 1) {
            const b = bricks[i];
            const start = (i / count) * STAGGER_SPAN;
            const t = Math.min(Math.max((p - start) / BRICK_SPAN, 0), 1);
            const e = backOut(t);
            dummy.position.set(b.x, b.y + (1 - e) * DROP_HEIGHT, 0);
            dummy.scale.setScalar(Math.max(0.001, 0.4 + 0.6 * e));
            dummy.updateMatrix();
            mesh.setMatrixAt(i, dummy.matrix);
        }
        mesh.instanceMatrix.needsUpdate = true;
    };

    // One-time setup: instance colors + initial matrix state.
    useLayoutEffect(() => {
        const mesh = meshRef.current;
        if (!mesh) return;
        for (let i = 0; i < count; i += 1) {
            mesh.setColorAt(i, tempColor.set(bricks[i].color));
        }
        if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
        writeMatrices(introRef.current.p);
        if (introRef.current.p >= 1) {
            doneRef.current = true;
            mesh.instanceMatrix.needsUpdate = false;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useFrame(() => {
        if (doneRef.current) return;
        const p = introRef.current.p;
        writeMatrices(p);
        if (p >= 1) {
            doneRef.current = true;
            const mesh = meshRef.current;
            if (mesh) mesh.instanceMatrix.needsUpdate = false;
        }
    });

    return (
        <group position={WORDMARK_POSITION} scale={WORDMARK_SCALE}>
            <instancedMesh
                ref={meshRef}
                args={[brickGeometry, wordmarkPlastic, count]}
                frustumCulled={false}
            />
        </group>
    );
}
