import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useTexture } from '@react-three/drei';

const MODEL_PATH = '/models/vince_lego_rig.glb';

const ATLAS_PATHS = {
  base: '/media/characters/atlas-base.png',
  doctor: '/media/characters/atlas-doctor.png',
  techy: '/media/characters/atlas-techy.png',
  masterplayer: '/media/characters/atlas-masterplayer.png',
  gotham: '/media/characters/atlas-gotham.png',
  capeGotham: '/media/characters/cape-gotham.png',
};

export default function Minifig({
  scrollProgressRef,
  pointerRef,
  activeOutfit = 'base',
  trickState = null,
  userSpinOffsetRef,
  onCharacterClick,
  reducedMotion = false,
}) {
  const root = useRef();
  const hips = useRef();
  const torso = useRef();
  const head = useRef();
  const armL = useRef();
  const armR = useRef();
  const legL = useRef();
  const legR = useRef();

  const { nodes } = useGLTF(MODEL_PATH);
  const loadedTextures = useTexture(ATLAS_PATHS);

  const configuredTextures = useMemo(() => {
    const out = {};
    Object.entries(loadedTextures).forEach(([key, tex]) => {
      if (!tex) return;
      tex.flipY = false;
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = 8;
      tex.needsUpdate = true;
      out[key] = tex;
    });
    return out;
  }, [loadedTextures]);

  const activeAtlas = configuredTextures[activeOutfit] || configuredTextures.base;

  const materials = useMemo(() => {
    const bodyMat = new THREE.MeshPhysicalMaterial({
      map: activeAtlas,
      roughness: activeOutfit === 'gotham' ? 0.22 : 0.25,
      metalness: 0.02,
      clearcoat: 0.72,
      clearcoatRoughness: 0.16,
    });

    const hairMat = new THREE.MeshPhysicalMaterial({
      color: '#17181C',
      roughness: 0.32,
      metalness: 0.02,
      clearcoat: 0.55,
      clearcoatRoughness: 0.22,
    });

    const helmetMat = new THREE.MeshPhysicalMaterial({
      color: '#151619',
      roughness: 0.24,
      metalness: 0.04,
      clearcoat: 0.78,
      clearcoatRoughness: 0.15,
    });

    const capeMat = new THREE.MeshStandardMaterial({
      map: configuredTextures.capeGotham,
      roughness: 0.78,
      metalness: 0.02,
      side: THREE.DoubleSide,
    });

    return { bodyMat, hairMat, helmetMat, capeMat };
  }, [activeAtlas, activeOutfit, configuredTextures.capeGotham]);

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    const s = scrollProgressRef?.current ?? 0;
    const p = pointerRef?.current ?? { x: 0, y: 0 };
    const spinOffset = userSpinOffsetRef?.current ?? 0;

    if (!root.current || !head.current || !armR.current || !armL.current || !legL.current || !legR.current) {
      return;
    }

    let trickJumpY = 0;
    let trickSpinY = 0;
    let trickArmR = null;
    let trickArmL = null;
    let trickLegSwing = 0;

    if (trickState && trickState.until > Date.now()) {
      const progress = 1 - (trickState.until - Date.now()) / trickState.duration;
      const phase = Math.sin(progress * Math.PI);
      if (trickState.type === 'jump' || trickState.type === 'grapple') {
        trickJumpY = Math.sin(progress * Math.PI) * 0.55;
        trickSpinY = progress * Math.PI * 2;
        trickArmR = -2.25 * phase;
        trickArmL = -1.65 * phase;
        trickLegSwing = 0.42 * phase;
      } else if (trickState.type === 'wave') {
        trickArmR = -2.15 + Math.sin(progress * Math.PI * 6) * 0.22;
        trickArmL = 0.2 * Math.sin(progress * Math.PI * 4);
      } else if (trickState.type === 'point') {
        trickArmR = -1.35;
        trickSpinY = -0.26 * phase;
      }
    }

    const breath = reducedMotion ? 0 : Math.sin(t * 2.1) * 0.02;
    const walkCycle = reducedMotion ? 0 : Math.sin(s * Math.PI * 10) * 0.34;

    // Stand squarely on top of the LEGO baseplate pedestal (y = 0.07)
    root.current.position.y = 0.07 + breath + trickJumpY;
    root.current.rotation.y = THREE.MathUtils.lerp(
      root.current.rotation.y,
      -0.22 + spinOffset + trickSpinY + p.x * 0.22 + Math.sin(s * Math.PI * 2) * 0.16,
      Math.min(1, dt * 8)
    );

    // Head tracks pointer & gentle idle nod around neck pivot
    const targetHeadY = p.x * 0.35 + (reducedMotion ? 0 : Math.sin(t * 0.9) * 0.07);
    const targetHeadX = -p.y * 0.16 + (reducedMotion ? 0 : Math.cos(t * 1.1) * 0.035);
    head.current.rotation.y = THREE.MathUtils.lerp(head.current.rotation.y, targetHeadY, Math.min(1, dt * 8));
    head.current.rotation.x = THREE.MathUtils.lerp(head.current.rotation.x, targetHeadX, Math.min(1, dt * 8));

    // Character's right arm (armR, on viewer's left): friendly wave at Hero top or walk swing
    const heroGreetingWeight = Math.max(0, 1 - s * 4.5);
    const waveOsc = reducedMotion ? 0 : Math.sin(t * 5.6) * 0.18;
    const defaultArmRX =
      heroGreetingWeight > 0.1
        ? (-2.05 + waveOsc) * heroGreetingWeight
        : -walkCycle * 0.7 + (reducedMotion ? 0 : Math.sin(t * 1.6) * 0.05);

    armR.current.rotation.x = THREE.MathUtils.lerp(
      armR.current.rotation.x,
      trickArmR !== null ? trickArmR : defaultArmRX,
      Math.min(1, dt * 10)
    );
    armR.current.rotation.z = THREE.MathUtils.lerp(
      armR.current.rotation.z,
      heroGreetingWeight > 0.1 || trickState?.type === 'wave' ? -0.06 + waveOsc * 0.25 : 0,
      Math.min(1, dt * 10)
    );

    // Character's left arm (armL, on viewer's right): counter-swing during walk
    armL.current.rotation.x = THREE.MathUtils.lerp(
      armL.current.rotation.x,
      trickArmL !== null ? trickArmL : walkCycle * 0.7 + (reducedMotion ? 0 : Math.cos(t * 1.6) * 0.05),
      Math.min(1, dt * 10)
    );
    armL.current.rotation.z = 0;

    // Legs swing around hip axle with scroll progression or jump
    legL.current.rotation.x = THREE.MathUtils.lerp(
      legL.current.rotation.x,
      trickLegSwing ? trickLegSwing : -walkCycle,
      Math.min(1, dt * 10)
    );
    legR.current.rotation.x = THREE.MathUtils.lerp(
      legR.current.rotation.x,
      trickLegSwing ? -trickLegSwing * 0.6 : walkCycle,
      Math.min(1, dt * 10)
    );
  });

  const isGotham = activeOutfit === 'gotham';

  return (
    <group
      ref={root}
      position={[0, 0.07, 0]}
      onClick={(e) => {
        e.stopPropagation();
        if (onCharacterClick) onCharacterClick();
      }}
    >
      {/* HIPS & PELVIS */}
      <group ref={hips} position={nodes.Hips.position}>
        <mesh geometry={nodes.Hips.geometry} material={materials.bodyMat} castShadow receiveShadow />
      </group>

      {/* LEFT LEG */}
      <group ref={legL} position={nodes.LegL.position}>
        <mesh geometry={nodes.LegL.geometry} material={materials.bodyMat} castShadow receiveShadow />
      </group>

      {/* RIGHT LEG */}
      <group ref={legR} position={nodes.LegR.position}>
        <mesh geometry={nodes.LegR.geometry} material={materials.bodyMat} castShadow receiveShadow />
      </group>

      {/* TORSO & CAPE */}
      <group ref={torso} position={nodes.Torso.position}>
        <mesh geometry={nodes.Torso.geometry} material={materials.bodyMat} castShadow receiveShadow />
      </group>

      {isGotham && nodes.BatmanCape && (
        <group position={nodes.BatmanCape.position}>
          <mesh geometry={nodes.BatmanCape.geometry} material={materials.capeMat} castShadow receiveShadow />
        </group>
      )}

      {/* LEFT ARM */}
      <group ref={armL} position={nodes.ArmL.position}>
        <mesh geometry={nodes.ArmL.geometry} material={materials.bodyMat} castShadow receiveShadow />
      </group>

      {/* RIGHT ARM */}
      <group ref={armR} position={nodes.ArmR.position}>
        <mesh geometry={nodes.ArmR.geometry} material={materials.bodyMat} castShadow receiveShadow />
      </group>

      {/* HEAD + SCULPTED HAIR OR BATMAN COWL */}
      <group ref={head} position={nodes.Head.position}>
        <mesh geometry={nodes.Head.geometry} material={materials.bodyMat} castShadow receiveShadow />
        {isGotham ? (
          <mesh geometry={nodes.BatmanHelmet.geometry} material={materials.helmetMat} castShadow receiveShadow />
        ) : (
          <mesh geometry={nodes.Hair.geometry} material={materials.hairMat} castShadow receiveShadow />
        )}
      </group>
    </group>
  );
}

useGLTF.preload(MODEL_PATH);
