import { useEffect, useMemo, useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OUTFITS } from '../data/portfolioData';

const OUTFIT_MAP = new Map(OUTFITS.map((outfit) => [outfit.id, outfit]));

function dampValue(current, target, lambda, delta) {
  return THREE.MathUtils.damp(current, target, lambda, delta);
}

function configureTexture(texture) {
  texture.flipY = false;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  texture.needsUpdate = true;
}

function getCharacterPose({
  mood,
  elapsed,
  pointer,
  trickKind,
  trickProgress,
  isBatman,
  walkBlend = 0,
  walkCycle = 0,
  walkDirection,
  isGrabbed,
}) {
  const idleWave = Math.sin(elapsed * 2.2);
  const idleBounce = Math.abs(Math.sin(elapsed * 2.2));

  const pose = {
    rootX: 0,
    rootY: idleBounce * 0.015,
    rootZ: 0,
    rootRotX: pointer.y * -0.05,
    rootRotY: pointer.x * 0.28,
    rootRotZ: pointer.x * -0.02,
    scaleMult: 1,
    torsoX: pointer.y * -0.06,
    torsoY: pointer.x * 0.16,
    torsoZ: 0,
    headX: -pointer.y * 0.22,
    headY: pointer.x * 0.38,
    headZ: pointer.x * -0.04,
    leftArmX: idleWave * 0.05,
    leftArmZ: 0.04,
    rightArmX: -idleWave * 0.05,
    rightArmZ: -0.04,
    leftLegX: 0,
    rightLegX: 0,
    capeX: 0.14 + idleBounce * 0.04,
  };

  // Grabbed in mid-air: dangling legs & flailing arms
  if (isGrabbed) {
    const flail = Math.sin(elapsed * 16);
    pose.rootY += 0.12;
    pose.rootRotZ = flail * 0.08;
    pose.leftArmX = -1.35 + flail * 0.35;
    pose.rightArmX = -1.35 - flail * 0.35;
    pose.leftArmZ = 0.25;
    pose.rightArmZ = -0.25;
    pose.leftLegX = flail * 0.32;
    pose.rightLegX = -flail * 0.32;
    pose.capeX = 0.35 + Math.abs(flail) * 0.18;
    return pose;
  }

  // Contextual Mood Poses (idle gestures)
  if (mood === 'wave') {
    pose.rightArmX = -2.1 + Math.sin(elapsed * 5.2) * 0.14;
    pose.rightArmZ = -0.22 + Math.cos(elapsed * 5.2) * 0.16;
  } else if (mood === 'pointRight') {
    // Character is on the left, pointing toward text/stage on the right
    const pointBeat = Math.sin(elapsed * 4.8);
    pose.rootRotY = 0.24 + pointer.x * 0.12;
    pose.headY = 0.18 + pointer.x * 0.15;
    pose.headX = pointBeat * 0.04 - pointer.y * 0.1;
    pose.leftArmX = -1.32 + pointBeat * 0.08;
    pose.leftArmZ = 0.34;
    pose.rightArmX = 0.12;
  } else if (mood === 'pointLeft') {
    // Character is on the right, pointing toward text/stage on the left
    const pointBeat = Math.sin(elapsed * 4.8);
    pose.rootRotY = -0.24 + pointer.x * 0.12;
    pose.headY = -0.18 + pointer.x * 0.15;
    pose.headX = pointBeat * 0.04 - pointer.y * 0.1;
    pose.rightArmX = -1.32 + pointBeat * 0.08;
    pose.rightArmZ = -0.34;
    pose.leftArmX = 0.12;
  } else if (mood === 'caller') {
    pose.rightArmX = -1.55 + Math.sin(elapsed * 3.4) * 0.06;
    pose.rightArmZ = -0.15;
    pose.leftArmX = -0.45 + Math.cos(elapsed * 3.4) * 0.08;
  } else if (mood === 'champion' || mood === 'thumbsup') {
    pose.rightArmX = -1.65 + Math.sin(elapsed * 3.6) * 0.08;
    pose.leftArmX = -0.35;
  }

  if (isBatman) {
    pose.capeX = 0.16 + Math.sin(elapsed * 2.8) * 0.05;
  }

  // Real Walk / Run Cycle — smoothly blended via walkBlend (0 -> 1)
  if (walkBlend > 0.001) {
    const stride = Math.sin(walkCycle);
    const bob = Math.abs(Math.cos(walkCycle));
    const dir = walkDirection < 0 ? -1 : 1; // -1 = right-to-left, 1 = left-to-right

    const walkRootY = bob * 0.075;
    const walkRootRotY = dir * 0.62;
    const walkRootRotX = 0.12;
    const walkTorsoX = 0.08;
    const walkTorsoY = dir * 0.12;
    const walkHeadY = -dir * 0.22 + pointer.x * 0.15;
    const walkLeftLegX = stride * 0.72;
    const walkRightLegX = -stride * 0.72;
    const walkLeftArmX = -stride * 0.62;
    const walkRightArmX = stride * 0.62;
    const walkLeftArmZ = 0.08;
    const walkRightArmZ = -0.08;
    const walkCapeX = 0.42 + bob * 0.16;

    pose.rootY = THREE.MathUtils.lerp(pose.rootY, walkRootY, walkBlend);
    pose.rootRotY = THREE.MathUtils.lerp(pose.rootRotY, walkRootRotY, walkBlend);
    pose.rootRotX = THREE.MathUtils.lerp(pose.rootRotX, walkRootRotX, walkBlend);
    pose.torsoX = THREE.MathUtils.lerp(pose.torsoX, walkTorsoX, walkBlend);
    pose.torsoY = THREE.MathUtils.lerp(pose.torsoY, walkTorsoY, walkBlend);
    pose.headY = THREE.MathUtils.lerp(pose.headY, walkHeadY, walkBlend);
    pose.leftLegX = THREE.MathUtils.lerp(pose.leftLegX, walkLeftLegX, walkBlend);
    pose.rightLegX = THREE.MathUtils.lerp(pose.rightLegX, walkRightLegX, walkBlend);
    pose.leftArmX = THREE.MathUtils.lerp(pose.leftArmX, walkLeftArmX, walkBlend);
    pose.rightArmX = THREE.MathUtils.lerp(pose.rightArmX, walkRightArmX, walkBlend);
    pose.leftArmZ = THREE.MathUtils.lerp(pose.leftArmZ, walkLeftArmZ, walkBlend);
    pose.rightArmZ = THREE.MathUtils.lerp(pose.rightArmZ, walkRightArmZ, walkBlend);
    pose.capeX = THREE.MathUtils.lerp(pose.capeX, walkCapeX, walkBlend);
  }

  // Active Trick / Reaction Override
  if (trickProgress > 0 && trickKind) {
    const arc = Math.sin(trickProgress * Math.PI);
    switch (trickKind) {
      case 'backflip':
        pose.rootY += arc * 0.38;
        pose.rootRotX = -trickProgress * Math.PI * 2;
        pose.leftArmX = -2.1;
        pose.rightArmX = -2.1;
        pose.leftLegX = -0.32 * arc;
        pose.rightLegX = 0.32 * arc;
        break;
      case 'spin':
        pose.rootY += arc * 0.24;
        pose.rootRotY += trickProgress * Math.PI * 2;
        pose.leftArmZ = 0.32;
        pose.rightArmZ = -0.32;
        break;
      case 'superhero': {
        // Dramatic superhero leap & 3-point superhero ground-punch landing
        if (trickProgress < 0.42) {
          const leap = Math.sin((trickProgress / 0.42) * Math.PI);
          pose.rootY += leap * 0.48;
          pose.headX = -0.35 * leap;
          pose.rightArmX = -2.4 * leap;
          pose.leftArmX = -2.4 * leap;
          pose.capeX = 0.52 * leap;
        } else {
          const landProg = (trickProgress - 0.42) / 0.58;
          const punch = Math.sin(landProg * Math.PI);
          pose.rootY -= 0.14 * punch;
          pose.torsoX = 0.35 * punch;
          pose.headX = -0.42 * punch; // Head looks up fiercely at viewer!
          pose.headY = pointer.x * 0.15;
          pose.rightArmX = -0.75 * punch; // Right fist hits ground!
          pose.rightArmZ = 0.18 * punch;
          pose.leftArmX = -1.95 * punch; // Left arm swept back!
          pose.leftArmZ = 0.35 * punch;
          pose.leftLegX = 0.58 * punch; // Hero crouch
          pose.rightLegX = -0.62 * punch;
          pose.capeX = 0.45 * punch;
        }
        break;
      }
      case 'dance': {
        const beat = Math.sin(trickProgress * Math.PI * 8);
        pose.rootY += Math.abs(beat) * 0.16;
        pose.rootRotY += beat * 0.45;
        pose.torsoZ = beat * 0.15;
        pose.leftArmX = -1.6 + beat * 0.65;
        pose.rightArmX = -1.6 - beat * 0.65;
        pose.leftLegX = beat * 0.45;
        pose.rightLegX = -beat * 0.45;
        break;
      }
      case 'panic': {
        const shake = Math.sin(trickProgress * Math.PI * 14);
        pose.rootY += Math.abs(shake) * 0.12;
        pose.rootRotY += shake * 0.35;
        pose.leftArmX = -2.4 + shake * 0.25;
        pose.rightArmX = -2.4 - shake * 0.25;
        pose.leftLegX = shake * 0.5;
        pose.rightLegX = -shake * 0.5;
        break;
      }
      case 'fly':
        pose.rootY += arc * 0.52;
        pose.rootRotX = 0.28 * arc;
        pose.rootRotY += Math.sin(trickProgress * Math.PI * 2) * 0.35;
        pose.leftArmX = -2.45 * arc;
        pose.rightArmX = -2.45 * arc;
        pose.capeX = 0.55 * arc;
        break;
      case 'vanish':
        pose.scaleMult = Math.max(0.06, 1 - arc * 0.94);
        pose.rootRotY += trickProgress * Math.PI * 4;
        break;
      case 'hiccup': {
        const jolt = Math.sin(trickProgress * Math.PI * 4);
        pose.rootY += Math.max(0, jolt) * 0.22;
        pose.torsoX = -Math.max(0, jolt) * 0.25;
        pose.leftArmX = -0.8 * Math.max(0, jolt);
        pose.rightArmX = -0.8 * Math.max(0, jolt);
        break;
      }
      case 'peekaboo':
        pose.headY = Math.sin(trickProgress * Math.PI * 2) * 0.55;
        pose.leftArmX = -1.95 * arc;
        pose.rightArmX = -1.95 * arc;
        pose.leftArmZ = -0.25 * arc;
        pose.rightArmZ = 0.25 * arc;
        break;
      case 'selfie':
        pose.rootRotY = -0.28 * arc;
        pose.headZ = 0.16 * arc;
        pose.rightArmX = -1.75 * arc;
        pose.rightArmZ = -0.25 * arc;
        pose.leftArmX = -1.2 * arc;
        break;
      case 'dizzy': {
        const wobble = Math.sin(trickProgress * Math.PI * 6);
        pose.rootRotZ = wobble * 0.22;
        pose.rootRotY += trickProgress * Math.PI * 2;
        pose.headZ = -wobble * 0.28;
        pose.headX = Math.cos(trickProgress * Math.PI * 6) * 0.22;
        pose.leftArmX = -0.9 + wobble * 0.35;
        pose.rightArmX = -0.9 - wobble * 0.35;
        break;
      }
      case 'tickle': {
        const wiggle = Math.sin(trickProgress * Math.PI * 12);
        pose.rootY += Math.abs(wiggle) * 0.1;
        pose.torsoZ = wiggle * 0.16;
        pose.headZ = -wiggle * 0.18;
        pose.leftArmX = -1.2 + wiggle * 0.4;
        pose.rightArmX = -1.2 - wiggle * 0.4;
        break;
      }
      case 'sneeze': {
        if (trickProgress < 0.45) {
          const windup = trickProgress / 0.45;
          pose.torsoX = -0.32 * windup;
          pose.headX = -0.38 * windup;
          pose.rootY += 0.06 * windup;
        } else {
          const snap = Math.sin(((trickProgress - 0.45) / 0.55) * Math.PI);
          pose.torsoX = 0.42 * snap;
          pose.headX = 0.48 * snap;
          pose.leftArmX = -0.9 * snap;
          pose.rightArmX = -0.9 * snap;
        }
        break;
      }
      case 'sulk':
        pose.torsoX = 0.28 * arc;
        pose.headX = 0.36 * arc;
        pose.headY = -0.25 * arc;
        pose.leftArmX = 0.15 * arc;
        pose.rightArmX = 0.15 * arc;
        break;
      default:
        pose.rootY += arc * 0.18;
        pose.rightArmX = -2.15;
        pose.rightArmZ = -0.22 + Math.sin(trickProgress * Math.PI * 6) * 0.22;
        break;
    }
  }

  return pose;
}

export default function Minifig({
  outfitId = 'classic',
  mood = 'wave',
  trickState,
  onCharacterClick,
  isWalking = false,
  walkDirection = -1,
  isGrabbed = false,
  badgeMode = false,
  globalPointerRef,
}) {
  const gltf = useLoader(GLTFLoader, '/models/vince_lego_rig.glb');

  const textures = useLoader(THREE.TextureLoader, [
    '/media/characters/atlas-base.png',
    '/media/characters/atlas-doctor.png',
    '/media/characters/atlas-techy.png',
    '/media/characters/atlas-masterplayer.png',
    '/media/characters/atlas-gotham.png',
    '/media/characters/cape-gotham.png',
    '/media/characters/hair-atlas.png',
  ]);

  const [
    baseAtlas,
    doctorAtlas,
    techyAtlas,
    masterplayerAtlas,
    gothamAtlas,
    gothamCape,
    hairAtlas,
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
        // High-craft designer vinyl / matte-satin studio finish (no cheap glossy glare)
        child.material.roughness = 0.56;
        child.material.metalness = 0.02;
        if ('envMapIntensity' in child.material) {
          child.material.envMapIntensity = 0.55;
        }

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

  const rigRef = useRef(rig);
  const outerGroup = useRef(null);
  const scalePulse = useRef(1);
  const walkBlendRef = useRef(0);
  const walkCycleRef = useRef(0);
  const activeTrickRef = useRef({ nonce: 0, startedAt: 0, kind: null, duration: 1.35 });

  // Initialize trick start time in effect to avoid calling performance.now() during render
  useEffect(() => {
    if (trickState && trickState.nonce !== activeTrickRef.current.nonce && (trickState.kind || trickState.name)) {
      activeTrickRef.current = {
        nonce: trickState.nonce,
        startedAt: trickState.startedAt || performance.now(),
        kind: trickState.kind || trickState.name,
        duration: trickState.duration || 1.35,
      };
    }
  }, [trickState]);

  useEffect(() => {
    rigRef.current = rig;
    const currentRig = rigRef.current;
    const outfit = OUTFIT_MAP.get(outfitId) ?? OUTFITS[0];
    const selectedAtlas = atlasByKey[outfit.atlasKey] ?? baseAtlas;

    currentRig.bodyMaterials.forEach((material) => {
      material.map = selectedAtlas;
      material.color.set('#ffffff');
      material.roughness = 0.56;
      material.metalness = 0.02;
      material.needsUpdate = true;
    });

    if (currentRig.hairMaterial) {
      currentRig.hairMaterial.map = hairAtlas;
      currentRig.hairMaterial.color.set('#ffffff');
      currentRig.hairMaterial.roughness = 0.64;
      currentRig.hairMaterial.metalness = 0.02;
      currentRig.hairMaterial.needsUpdate = true;
    }

    if (currentRig.helmetMaterial) {
      currentRig.helmetMaterial.map = null;
      currentRig.helmetMaterial.color.set('#181c26');
      currentRig.helmetMaterial.roughness = 0.48;
      currentRig.helmetMaterial.metalness = 0.08;
      currentRig.helmetMaterial.needsUpdate = true;
    }

    if (currentRig.capeMaterial) {
      currentRig.capeMaterial.map = gothamCape;
      currentRig.capeMaterial.color.set('#1b2230');
      currentRig.capeMaterial.roughness = 0.68;
      currentRig.capeMaterial.metalness = 0.01;
      currentRig.capeMaterial.needsUpdate = true;
    }

    if (currentRig.nodes.Hair) {
      currentRig.nodes.Hair.visible = !outfit.showHelmet;
    }
    if (currentRig.nodes.BatmanHelmet) {
      currentRig.nodes.BatmanHelmet.visible = Boolean(outfit.showHelmet);
    }
    if (currentRig.nodes.BatmanCape) {
      currentRig.nodes.BatmanCape.visible = Boolean(outfit.showCape);
    }

    scalePulse.current = 1.07;
  }, [outfitId, atlasByKey, baseAtlas, gothamCape, hairAtlas, rig]);

  useFrame((state, delta) => {
    const elapsed = state.clock.getElapsedTime();
    const outfit = OUTFIT_MAP.get(outfitId) ?? OUTFITS[0];
    const isBatman = Boolean(outfit.showHelmet);

    let trickProgress = 0;
    let trickKind = null;
    const curTrick = activeTrickRef.current;
    if (curTrick.kind && curTrick.startedAt > 0) {
      const raw = (performance.now() - curTrick.startedAt) / (curTrick.duration * 1000);
      if (raw >= 0 && raw <= 1) {
        trickProgress = raw;
        trickKind = curTrick.kind;
      }
    }

    const pointer = globalPointerRef?.current ?? state.pointer;

    const targetWalk = isWalking && !isGrabbed ? 1 : 0;
    walkBlendRef.current = dampValue(walkBlendRef.current, targetWalk, 14, delta);
    if (walkBlendRef.current > 0.001) {
      walkCycleRef.current += delta * 15.5 * walkBlendRef.current;
    }

    const pose = getCharacterPose({
      mood,
      elapsed,
      pointer,
      trickKind,
      trickProgress,
      isBatman,
      walkBlend: walkBlendRef.current,
      walkCycle: walkCycleRef.current,
      walkDirection,
      isGrabbed,
    });

    scalePulse.current = dampValue(scalePulse.current, 1, 9, delta);

    if (outerGroup.current) {
      const targetY = (badgeMode ? -1.35 : -1.02) + pose.rootY;
      const targetScale = (badgeMode ? 0.96 : 0.72) * scalePulse.current * pose.scaleMult;
      outerGroup.current.position.y = dampValue(outerGroup.current.position.y, targetY, 10, delta);
      outerGroup.current.position.z = dampValue(outerGroup.current.position.z, pose.rootZ, 10, delta);
      outerGroup.current.rotation.x = dampValue(outerGroup.current.rotation.x, pose.rootRotX, 10, delta);
      outerGroup.current.rotation.y = dampValue(outerGroup.current.rotation.y, pose.rootRotY, 10, delta);
      outerGroup.current.rotation.z = dampValue(outerGroup.current.rotation.z, pose.rootRotZ, 10, delta);
      outerGroup.current.scale.setScalar(targetScale);
    }

    const { nodes, rest } = rigRef.current;
    if (nodes.Torso && rest.Torso) {
      nodes.Torso.rotation.x = dampValue(nodes.Torso.rotation.x, rest.Torso.rotation.x + pose.torsoX, 9, delta);
      nodes.Torso.rotation.y = dampValue(nodes.Torso.rotation.y, rest.Torso.rotation.y + pose.torsoY, 9, delta);
      nodes.Torso.rotation.z = dampValue(nodes.Torso.rotation.z, rest.Torso.rotation.z + pose.torsoZ, 9, delta);
    }

    if (nodes.Head && rest.Head) {
      nodes.Head.rotation.x = dampValue(nodes.Head.rotation.x, rest.Head.rotation.x + pose.headX, 11, delta);
      nodes.Head.rotation.y = dampValue(nodes.Head.rotation.y, rest.Head.rotation.y + pose.headY, 11, delta);
      nodes.Head.rotation.z = dampValue(nodes.Head.rotation.z, rest.Head.rotation.z + pose.headZ, 11, delta);
    }

    if (nodes.Hair && rest.Hair && nodes.Head) {
      nodes.Hair.rotation.copy(nodes.Head.rotation);
    }

    if (nodes.BatmanHelmet && rest.BatmanHelmet && nodes.Head) {
      nodes.BatmanHelmet.rotation.copy(nodes.Head.rotation);
    }

    if (nodes.ArmL && rest.ArmL) {
      nodes.ArmL.rotation.x = dampValue(nodes.ArmL.rotation.x, rest.ArmL.rotation.x + pose.leftArmX, 12, delta);
      nodes.ArmL.rotation.z = dampValue(nodes.ArmL.rotation.z, rest.ArmL.rotation.z + pose.leftArmZ, 12, delta);
    }

    if (nodes.ArmR && rest.ArmR) {
      nodes.ArmR.rotation.x = dampValue(nodes.ArmR.rotation.x, rest.ArmR.rotation.x + pose.rightArmX, 12, delta);
      nodes.ArmR.rotation.z = dampValue(nodes.ArmR.rotation.z, rest.ArmR.rotation.z + pose.rightArmZ, 12, delta);
    }

    if (nodes.LegL && rest.LegL) {
      nodes.LegL.rotation.x = dampValue(nodes.LegL.rotation.x, rest.LegL.rotation.x + pose.leftLegX, 12, delta);
    }

    if (nodes.LegR && rest.LegR) {
      nodes.LegR.rotation.x = dampValue(nodes.LegR.rotation.x, rest.LegR.rotation.x + pose.rightLegX, 12, delta);
    }

    if (nodes.BatmanCape && rest.BatmanCape) {
      nodes.BatmanCape.rotation.x = dampValue(
        nodes.BatmanCape.rotation.x,
        rest.BatmanCape.rotation.x + pose.capeX,
        9,
        delta
      );
    }
  });

  return (
    <group
      ref={outerGroup}
      position={[0, -1.02, 0]}
      scale={0.72}
      onClick={(event) => {
        event.stopPropagation();
        onCharacterClick?.();
      }}
    >
      <primitive object={rig.root} />
    </group>
  );
}
