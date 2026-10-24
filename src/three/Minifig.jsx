import { useEffect, useMemo, useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OUTFITS } from '../data/portfolioData';

const OUTFIT_MAP = new Map(OUTFITS.map((outfit) => [outfit.id, outfit]));
const VIEW_ROTATION_OFFSETS = [0, 0.68, Math.PI * 0.5, Math.PI];

function dampValue(current, target, lambda, delta) {
  return THREE.MathUtils.damp(current, target, lambda, delta);
}

function configureTexture(texture) {
  texture.flipY = false;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  texture.needsUpdate = true;
}

function getMoodPose(mood, elapsed, pointer, trickKind, trickProgress, isBatman, isJumpingAcross) {
  const wave = Math.sin(elapsed * 2.5);
  const bounce = Math.abs(Math.sin(elapsed * 2.5));
  const pose = {
    rootY: bounce * 0.022,
    rootZ: 0,
    rootRotX: isJumpingAcross ? -0.12 : 0,
    rootRotY: pointer.x * 0.28 + (isJumpingAcross ? 0.35 : 0),
    rootRotZ: pointer.x * -0.025,
    torsoX: 0,
    torsoY: 0,
    torsoZ: 0,
    headX: -pointer.y * 0.14,
    headY: pointer.x * 0.26,
    headZ: wave * 0.02,
    leftArmX: -0.14 + wave * 0.08,
    leftArmZ: 0.12,
    rightArmX: 0.14 - wave * 0.08,
    rightArmZ: -0.12,
    leftLegX: isJumpingAcross ? -0.18 : 0,
    rightLegX: isJumpingAcross ? 0.18 : 0,
    capeX: 0.12 + bounce * 0.05 + (isJumpingAcross ? 0.28 : 0),
  };

  if (mood === 'wave') {
    pose.rightArmX = -2.28 + Math.sin(elapsed * 6.4) * 0.14;
    pose.rightArmZ = -0.24 + Math.sin(elapsed * 6.4) * 0.2;
    pose.leftArmX = -0.14;
    pose.leftArmZ = 0.12;
    pose.headY += 0.06;
  } else if (mood === 'builder') {
    pose.rightArmX = -0.95 + Math.sin(elapsed * 4.2) * 0.18;
    pose.leftArmX = -0.58 - Math.sin(elapsed * 4.2) * 0.14;
  } else if (mood === 'caller') {
    pose.rightArmX = -1.45;
    pose.rightArmZ = -0.22;
    pose.leftArmX = 0.18 + Math.sin(elapsed * 3.4) * 0.12;
    pose.headZ = -0.06;
  } else if (mood === 'commerce') {
    pose.leftArmX = -0.82;
    pose.rightArmX = -0.68 + Math.sin(elapsed * 3.8) * 0.12;
  } else if (mood === 'architect') {
    pose.leftArmX = -0.62;
    pose.rightArmX = -0.62;
    pose.headX -= 0.04;
  } else if (mood === 'champion') {
    pose.leftArmX = -2.35 + Math.sin(elapsed * 4.5) * 0.12;
    pose.rightArmX = -2.35 - Math.sin(elapsed * 4.5) * 0.12;
    pose.leftArmZ = 0.24;
    pose.rightArmZ = -0.24;
    pose.rootY += 0.03;
  }

  if (isBatman) {
    pose.capeX = 0.18 + Math.sin(elapsed * 3.2) * 0.07;
  }

  if (trickProgress > 0) {
    const arc = Math.sin(trickProgress * Math.PI);
    if (trickKind === 'backflip') {
      pose.rootY += arc * 0.34;
      pose.rootRotX = -trickProgress * Math.PI * 2;
      pose.leftArmX = -2.1;
      pose.rightArmX = -2.1;
      pose.leftLegX = -0.28 * arc;
      pose.rightLegX = 0.28 * arc;
    } else if (trickKind === 'spin') {
      pose.rootY += arc * 0.24;
      pose.rootRotY += trickProgress * Math.PI * 2;
      pose.leftArmZ = 0.34;
      pose.rightArmZ = -0.34;
    } else if (trickKind === 'superhero') {
      pose.rootY += arc * 0.3;
      pose.leftLegX = 0.36 * arc;
      pose.rightLegX = -0.42 * arc;
      pose.rightArmX = -2.25 * arc;
      pose.leftArmX = 0.38 * arc;
    } else {
      pose.rootY += arc * 0.22;
      pose.rightArmX = -2.32;
      pose.rightArmZ = -0.26 + Math.sin(trickProgress * Math.PI * 6) * 0.22;
    }
  }

  return pose;
}

export default function Minifig({
  outfitId = 'classic',
  mood = 'wave',
  trickState,
  onCycleOutfit,
  angleIndex = 0,
  isJumpingAcross = false,
  badgeMode = false,
}) {
  const gltf = useLoader(GLTFLoader, '/models/vince_lego_rig.glb');

  const textures = useLoader(THREE.TextureLoader, [
    '/media/characters/atlas-base.png',
    '/media/characters/atlas-doctor.png',
    '/media/characters/atlas-techy.png',
    '/media/characters/atlas-masterplayer.png',
    '/media/characters/atlas-gotham.png',
    '/media/characters/cape-gotham.png',
  ]);

  const [
    baseAtlas,
    doctorAtlas,
    techyAtlas,
    masterplayerAtlas,
    gothamAtlas,
    gothamCape,
  ] = useMemo(() => {
    textures.forEach(configureTexture);
    return textures;
  }, [textures]);

  const atlasByKey = useMemo(
    () => ({
      base: baseAtlas,
      doctor: doctorAtlas,
      techy: techyAtlas,
      masterplayer: masterplayerAtlas,
      gotham: gothamAtlas,
    }),
    [baseAtlas, doctorAtlas, techyAtlas, masterplayerAtlas, gothamAtlas]
  );

  const rig = useMemo(() => {
    const root = gltf.scene.clone(true);
    const nodes = {};
    const bodyMaterials = [];
    let hairMaterial = null;
    let helmetMaterial = null;
    let capeMaterial = null;

    root.traverse((child) => {
      if (child.name) {
        nodes[child.name] = child;
      }

      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        child.material = child.material.clone();
        child.material.roughness = 0.28;
        child.material.metalness = 0.04;

        if (child.name === 'Hair') {
          hairMaterial = child.material;
        } else if (child.name === 'BatmanHelmet') {
          helmetMaterial = child.material;
        } else if (child.name === 'BatmanCape') {
          capeMaterial = child.material;
          capeMaterial.side = THREE.DoubleSide;
        } else {
          bodyMaterials.push(child.material);
        }
      }
    });

    const rest = {};
    ['Hips', 'LegL', 'LegR', 'Torso', 'ArmL', 'ArmR', 'Head', 'Hair', 'BatmanHelmet', 'BatmanCape'].forEach((name) => {
      const node = nodes[name];
      if (node) {
        rest[name] = {
          position: node.position.clone(),
          rotation: node.rotation.clone(),
        };
      }
    });

    return {
      root,
      nodes,
      rest,
      bodyMaterials,
      hairMaterial,
      helmetMaterial,
      capeMaterial,
    };
  }, [gltf]);

  const outerGroup = useRef(null);
  const scalePulse = useRef(1);

  useEffect(() => {
    const outfit = OUTFIT_MAP.get(outfitId) ?? OUTFITS[0];
    const selectedAtlas = atlasByKey[outfit.atlasKey] ?? baseAtlas;

    rig.bodyMaterials.forEach((material) => {
      material.map = selectedAtlas;
      material.color.set('#ffffff');
      material.needsUpdate = true;
    });

    if (rig.hairMaterial) {
      rig.hairMaterial.map = null;
      rig.hairMaterial.color.set(outfit.hairColor);
      rig.hairMaterial.roughness = 0.34;
      rig.hairMaterial.needsUpdate = true;
    }

    if (rig.helmetMaterial) {
      rig.helmetMaterial.map = null;
      rig.helmetMaterial.color.set('#141821');
      rig.helmetMaterial.roughness = 0.24;
      rig.helmetMaterial.metalness = 0.16;
      rig.helmetMaterial.needsUpdate = true;
    }

    if (rig.capeMaterial) {
      rig.capeMaterial.map = gothamCape;
      rig.capeMaterial.color.set('#1b2230');
      rig.capeMaterial.roughness = 0.48;
      rig.capeMaterial.needsUpdate = true;
    }

    if (rig.nodes.Hair) {
      rig.nodes.Hair.visible = !outfit.showHelmet;
    }
    if (rig.nodes.BatmanHelmet) {
      rig.nodes.BatmanHelmet.visible = Boolean(outfit.showHelmet);
    }
    if (rig.nodes.BatmanCape) {
      rig.nodes.BatmanCape.visible = Boolean(outfit.showCape);
    }

    scalePulse.current = 1.09;
  }, [outfitId, atlasByKey, baseAtlas, gothamCape, rig]);

  useFrame((state, delta) => {
    const elapsed = state.clock.getElapsedTime();
    const outfit = OUTFIT_MAP.get(outfitId) ?? OUTFITS[0];
    const isBatman = Boolean(outfit.showHelmet);

    let trickProgress = 0;
    let trickKind = 'wave';
    if (trickState?.startedAt) {
      const duration = 0.95;
      const raw = (performance.now() - trickState.startedAt) / (duration * 1000);
      if (raw >= 0 && raw <= 1) {
        trickProgress = raw;
        trickKind = trickState.kind;
      }
    }

    const viewOffset = VIEW_ROTATION_OFFSETS[angleIndex % VIEW_ROTATION_OFFSETS.length] || 0;
    const pose = getMoodPose(
      mood,
      elapsed,
      state.pointer,
      trickKind,
      trickProgress,
      isBatman,
      isJumpingAcross
    );
    scalePulse.current = dampValue(scalePulse.current, 1, 9, delta);

    if (outerGroup.current) {
      const targetY = (badgeMode ? -1.42 : -1.03) + pose.rootY;
      const targetScale = (badgeMode ? 0.94 : 0.68) * scalePulse.current;
      outerGroup.current.position.y = dampValue(outerGroup.current.position.y, targetY, 8, delta);
      outerGroup.current.position.z = dampValue(outerGroup.current.position.z, pose.rootZ, 8, delta);
      outerGroup.current.rotation.x = dampValue(outerGroup.current.rotation.x, pose.rootRotX, 10, delta);
      outerGroup.current.rotation.y = dampValue(
        outerGroup.current.rotation.y,
        pose.rootRotY + viewOffset,
        9,
        delta
      );
      outerGroup.current.rotation.z = dampValue(outerGroup.current.rotation.z, pose.rootRotZ, 8, delta);
      outerGroup.current.scale.setScalar(targetScale);
    }

    const { nodes, rest } = rig;
    if (nodes.Torso && rest.Torso) {
      nodes.Torso.rotation.x = dampValue(nodes.Torso.rotation.x, rest.Torso.rotation.x + pose.torsoX, 8, delta);
      nodes.Torso.rotation.y = dampValue(nodes.Torso.rotation.y, rest.Torso.rotation.y + pose.torsoY, 8, delta);
      nodes.Torso.rotation.z = dampValue(nodes.Torso.rotation.z, rest.Torso.rotation.z + pose.torsoZ, 8, delta);
    }

    if (nodes.Head && rest.Head) {
      nodes.Head.rotation.x = dampValue(nodes.Head.rotation.x, rest.Head.rotation.x + pose.headX, 9, delta);
      nodes.Head.rotation.y = dampValue(nodes.Head.rotation.y, rest.Head.rotation.y + pose.headY, 9, delta);
      nodes.Head.rotation.z = dampValue(nodes.Head.rotation.z, rest.Head.rotation.z + pose.headZ, 9, delta);
    }

    if (nodes.Hair && rest.Hair && nodes.Head) {
      nodes.Hair.rotation.copy(nodes.Head.rotation);
    }

    if (nodes.BatmanHelmet && rest.BatmanHelmet && nodes.Head) {
      nodes.BatmanHelmet.rotation.copy(nodes.Head.rotation);
    }

    if (nodes.ArmL && rest.ArmL) {
      nodes.ArmL.rotation.x = dampValue(nodes.ArmL.rotation.x, rest.ArmL.rotation.x + pose.leftArmX, 10, delta);
      nodes.ArmL.rotation.z = dampValue(nodes.ArmL.rotation.z, rest.ArmL.rotation.z + pose.leftArmZ, 10, delta);
    }

    if (nodes.ArmR && rest.ArmR) {
      nodes.ArmR.rotation.x = dampValue(nodes.ArmR.rotation.x, rest.ArmR.rotation.x + pose.rightArmX, 10, delta);
      nodes.ArmR.rotation.z = dampValue(nodes.ArmR.rotation.z, rest.ArmR.rotation.z + pose.rightArmZ, 10, delta);
    }

    if (nodes.LegL && rest.LegL) {
      nodes.LegL.rotation.x = dampValue(nodes.LegL.rotation.x, rest.LegL.rotation.x + pose.leftLegX, 9, delta);
    }

    if (nodes.LegR && rest.LegR) {
      nodes.LegR.rotation.x = dampValue(nodes.LegR.rotation.x, rest.LegR.rotation.x + pose.rightLegX, 9, delta);
    }

    if (nodes.BatmanCape && rest.BatmanCape) {
      nodes.BatmanCape.rotation.x = dampValue(
        nodes.BatmanCape.rotation.x,
        rest.BatmanCape.rotation.x + pose.capeX,
        8,
        delta
      );
    }
  });

  return (
    <group
      ref={outerGroup}
      position={[0, -1.03, 0]}
      scale={0.68}
      onClick={(event) => {
        event.stopPropagation();
        onCycleOutfit?.();
      }}
    >
      <primitive object={rig.root} />
    </group>
  );
}
