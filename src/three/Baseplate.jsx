// ---------------------------------------------------------------------------
// Baseplate: one plate mesh + one instanced stud grid = 2 draw calls total.
// Stud count comes from the resolved quality tier; each stud gets a tiny
// deterministic height jitter for a "physically imperfect" toy feel.
// ---------------------------------------------------------------------------
import React, { useMemo } from 'react';
import * as THREE from 'three';
import { Instances, Instance } from '@react-three/drei';
import { studGeometry, grayPlastic } from './assets';

const plateMaterial = new THREE.MeshPhysicalMaterial({
    color: '#c9ccd1',
    clearcoat: 0.8,
    clearcoatRoughness: 0.25,
    roughness: 0.35,
    metalness: 0,
});

// Deterministic pseudo-random in [0, 1) — stable across renders/StrictMode.
function hash(i, j) {
    const v = Math.sin(i * 127.1 + j * 311.7) * 43758.5453;
    return v - Math.floor(v);
}

export default function Baseplate({ tier }) {
    const grid = tier.studGrid;

    const plateGeometry = useMemo(
        () => new THREE.BoxGeometry(grid + 2, 0.64, grid + 2),
        [grid]
    );

    // Precompute stud transforms once per tier.
    const studs = useMemo(() => {
        const list = [];
        const half = grid / 2;
        for (let i = 0; i < grid; i += 1) {
            for (let j = 0; j < grid; j += 1) {
                list.push([
                    i - half + 0.5,
                    0.09 + (hash(i, j) - 0.5) * 0.02, // slight height jitter
                    j - half + 0.5,
                ]);
            }
        }
        return list;
    }, [grid]);

    return (
        <group>
            {/* Plate body */}
            <mesh geometry={plateGeometry} material={plateMaterial} position={[0, -0.32, 0]} receiveShadow>
                <DisposeOn geometry={plateGeometry} />
            </mesh>

            {/* Stud field — single instanced draw call */}
            <Instances
                limit={studs.length}
                geometry={studGeometry}
                material={grayPlastic}
                frustumCulled={false}
            >
                {studs.map((pos, idx) => (
                    <Instance key={idx} position={pos} />
                ))}
            </Instances>
        </group>
    );
}

// Small helper: dispose the tier-dependent plate geometry on unmount.
function DisposeOn({ geometry }) {
    React.useEffect(() => () => geometry.dispose(), [geometry]);
    return null;
}
