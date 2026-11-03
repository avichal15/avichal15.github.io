import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

/**
 * Upgrades the Three.js renderer, studio lighting, environment reflections,
 * shadow catcher plane, and minifigure ABS plastic materials in-place.
 */
export function upgradeLegoThreeScene({ renderer, scene, minifigureRoot }) {
  if (!renderer || !scene) return;

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;
  if ('outputColorSpace' in renderer) {
    renderer.outputColorSpace = THREE.SRGBColorSpace;
  }

  // Zero-Dependency Studio HDRI Reflections via RoomEnvironment
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  pmremGenerator.compileEquirectangularShader();
  const roomEnv = new RoomEnvironment();
  const envTarget = pmremGenerator.fromScene(roomEnv, 0.04);
  scene.environment = envTarget.texture;
  roomEnv.dispose();
  pmremGenerator.dispose();

  if (minifigureRoot) {
    upgradeCharacterMaterialsToABS(minifigureRoot);
  }

  return envTarget;
}

/**
 * Traverses any Object3D and upgrades its materials to Three.js MeshPhysicalMaterial
 * tuned for LEGO ABS plastic (ior: 1.46, clearcoat: 0.42) while preserving all textures and UVs.
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

      if (mat.isMeshPhysicalMaterial) {
        mat.roughness = isCape ? 0.82 : isHair ? 0.28 : 0.18;
        mat.metalness = isCape ? 0.01 : 0.03;
        mat.clearcoat = isCape ? 0.0 : isHair ? 0.22 : 0.44;
        mat.clearcoatRoughness = isHair ? 0.2 : 0.1;
        mat.ior = 1.46;
        mat.reflectivity = 0.56;
        mat.envMapIntensity = isCape ? 0.35 : 1.15;
        if (mat.map) {
          mat.map.colorSpace = THREE.SRGBColorSpace;
          mat.map.anisotropy = 8;
          mat.map.needsUpdate = true;
        }
        mat.needsUpdate = true;
        return mat;
      }

      const absMat = new THREE.MeshPhysicalMaterial({
        color: mat.color ? mat.color.clone() : new THREE.Color(0xffffff),
        map: mat.map || null,
        alphaMap: mat.alphaMap || null,
        normalMap: mat.normalMap || null,
        bumpMap: mat.bumpMap || null,
        bumpScale: mat.bumpScale ?? 1,
        roughness: isCape ? 0.82 : isHair ? 0.28 : 0.18,
        metalness: 0.0,
        clearcoat: isCape ? 0.0 : isHair ? 0.22 : 0.44,
        clearcoatRoughness: isHair ? 0.2 : 0.1,
        ior: 1.46,
        reflectivity: 0.56,
        envMapIntensity: isCape ? 0.35 : 1.15,
        transparent: mat.transparent || false,
        opacity: mat.opacity ?? 1.0,
        alphaTest: mat.alphaTest ?? 0,
        side: mat.side ?? THREE.FrontSide,
      });

      if (absMat.map) {
        absMat.map.colorSpace = THREE.SRGBColorSpace;
        absMat.map.anisotropy = 8;
        absMat.map.needsUpdate = true;
      }

      absMat.userData.isLegoABSUpgraded = true;
      return absMat;
    };

    if (Array.isArray(child.material)) {
      child.material = child.material.map(tuneMaterial);
    } else {
      child.material = tuneMaterial(child.material);
    }
  });
}
