// ---------------------------------------------------------------------------
// Module-scoped singleton geometries + shared plastic material factory.
// Everything three.js-heavy is created ONCE and reused across components.
// ---------------------------------------------------------------------------
import * as THREE from 'three';

// -- Wordmark brick ---------------------------------------------------------
// Unit brick with a hair of margin so adjacent bricks read as separate pieces.
export const brickGeometry = new THREE.BoxGeometry(0.94, 0.88, 0.94);

// -- Baseplate stud (12 segments keeps polycount low on big grids) ----------
export const studGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.18, 12);

// -- Minifig primitives (unit-ish, scaled per usage) -------------------------
export const capsuleGeometry = new THREE.CapsuleGeometry(0.5, 0.6, 4, 12);
export const cylinderGeometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 24);
export const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
export const sphereGeometry = new THREE.SphereGeometry(0.5, 20, 16);

// Torso: 4-segment tapered cylinder rotated 45° reads as the classic
// trapezoid minifig torso silhouette.
export const torsoGeometry = new THREE.CylinderGeometry(0.55, 0.86, 1.5, 4);

// Beard half-shell: partial sphere covering the lower face.
export const beardGeometry = new THREE.SphereGeometry(
    0.5, 20, 12, 0, Math.PI * 2, Math.PI * 0.42, Math.PI * 0.58
);

// -- Plastic material factory ------------------------------------------------
// One material per finish; per-instance color handled via instanceColor.
export function createPlasticMaterial(color) {
    return new THREE.MeshPhysicalMaterial({
        color,
        clearcoat: 1,
        clearcoatRoughness: 0.15,
        roughness: 0.25,
        metalness: 0,
    });
}

// Shared finishes reused across meshes (avoid material churn).
export const blackPlastic = createPlasticMaterial('#101010');
export const skinPlastic = createPlasticMaterial('#E0AC69');
export const grayPlastic = createPlasticMaterial('#D7D7D9');
// White base for instanced wordmark bricks — instanceColor multiplies it.
export const wordmarkPlastic = createPlasticMaterial('#ffffff');

// Explicit disposal hook if the scene ever needs to be torn down fully.
export function disposeSharedAssets() {
    [
        brickGeometry, studGeometry, capsuleGeometry, cylinderGeometry,
        boxGeometry, sphereGeometry, torsoGeometry, beardGeometry,
    ].forEach((g) => g.dispose());
    [blackPlastic, skinPlastic, grayPlastic, wordmarkPlastic].forEach((m) => m.dispose());
}
