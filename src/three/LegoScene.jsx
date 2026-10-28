import { Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import Minifig from './Minifig';

function SoftContactShadow({ badgeMode = false, isWalking = false }) {
  const shadowTexture = useMemo(() => {
    if (typeof document === 'undefined') return null;
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(64, 64, 8, 64, 64, 60);
    grad.addColorStop(0, 'rgba(15, 23, 42, 0.34)');
    grad.addColorStop(0.55, 'rgba(15, 23, 42, 0.14)');
    grad.addColorStop(1, 'rgba(15, 23, 42, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 128, 128);
    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, []);

  if (badgeMode || !shadowTexture) {
    return null;
  }

  return (
    <mesh
      position={[0, -1.03, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      scale={isWalking ? [1.35, 0.85, 1] : [1.22, 0.78, 1]}
    >
      <planeGeometry args={[1.55, 1.55]} />
      <meshBasicMaterial map={shadowTexture} transparent depthWrite={false} />
    </mesh>
  );
}

export default function LegoScene({
  outfitId,
  mood,
  accent = '#F5C518',
  trickState,
  onCharacterClick,
  isWalking = false,
  walkDirection = -1,
  isGrabbed = false,
  badgeMode = false,
  globalPointerRef,
}) {
  const isBatman = outfitId === 'gotham';

  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      resize={{ scroll: false, debounce: { scroll: 0, resize: 0 } }}
      camera={{ position: [0, -0.02, 6.75], fov: 22 }}
      gl={{
        antialias: true,
        alpha: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.04,
      }}
    >
      {/* Balanced Studio Lighting for Matte-Satin Designer Vinyl Finish */}
      <hemisphereLight
        skyColor={isBatman ? '#e2e8f0' : '#fffbeb'}
        groundColor={isBatman ? '#1e293b' : '#d6d3d1'}
        intensity={isBatman ? 1.35 : 1.75}
      />
      <directionalLight
        position={[2.8, 4.2, 5.4]}
        intensity={isBatman ? 1.35 : 1.05}
        color={isBatman ? '#fef08a' : '#fffdf7'}
        castShadow
      />
      <directionalLight
        position={[-3.2, 2.2, 3.6]}
        intensity={isBatman ? 0.75 : 0.48}
        color={isBatman ? '#60a5fa' : '#f1f5f9'}
      />
      <pointLight
        position={[0, 1.6, -2.6]}
        intensity={isBatman ? 1.1 : 0.42}
        color={isBatman ? '#facc15' : accent}
      />

      <Suspense fallback={null}>
        <SoftContactShadow badgeMode={badgeMode} isWalking={isWalking} />
        <Minifig
          outfitId={outfitId}
          mood={mood}
          trickState={trickState}
          onCharacterClick={onCharacterClick}
          isWalking={isWalking}
          walkDirection={walkDirection}
          isGrabbed={isGrabbed}
          badgeMode={badgeMode}
          globalPointerRef={globalPointerRef}
        />
      </Suspense>
    </Canvas>
  );
}
