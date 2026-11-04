import * as THREE from 'three';

/**
 * Configures the Three.js renderer and tunes minifigure materials to a warm
 * matte-satin designer vinyl finish without harsh glossy clearcoat glare.
 */
export function upgradeLegoThreeScene({ renderer, scene, minifigureRoot }) {
  if (!renderer || !scene) return;

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.04;
  if ('outputColorSpace' in renderer) {
    renderer.outputColorSpace = THREE.SRGBColorSpace;
  }

  scene.environment = null;

  if (minifigureRoot) {
    upgradeCharacterMaterialsToABS(minifigureRoot);
  }
}

/**
 * Tunes minifigure materials in-place for a warm matte-satin vinyl look
 * (no harsh clearcoat specular glare) while preserving all textures and UVs.
 */
export function upgradeCharacterMaterialsToABS(rootObject) {
  if (!rootObject) return;

  rootObject.traverse((child) => {
    if (!child.isMesh) return;

    child.castShadow = true;
    child.receiveShadow = true;

    const tuneMaterial = (mat) => {
      if (!mat) return mat;
      const matName = (mat.name || child.name || '').toLowerCase();
      const isCape = matName.includes('cape');
      const isHair = matName.includes('hair') || matName.includes('beard');
      const isHelmet = matName.includes('helmet');

      mat.roughness = isCape ? 0.68 : isHair ? 0.64 : isHelmet ? 0.48 : 0.56;
      mat.metalness = isCape ? 0.01 : isHelmet ? 0.08 : 0.02;
      if ('clearcoat' in mat) {
        mat.clearcoat = 0.0;
      }
      if ('envMapIntensity' in mat) {
        mat.envMapIntensity = 0.5;
      }
      if (mat.map) {
        mat.map.colorSpace = THREE.SRGBColorSpace;
        mat.map.anisotropy = 16;
        mat.map.needsUpdate = true;
      }
      mat.needsUpdate = true;
      return mat;
    };

    if (Array.isArray(child.material)) {
      child.material = child.material.map(tuneMaterial);
    } else {
      child.material = tuneMaterial(child.material);
    }
  });
}
