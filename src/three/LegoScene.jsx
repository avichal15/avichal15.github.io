import { Component, Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import Minifig from './Minifig';
import { downgradeTier, probeWebGL, resolveTier } from './quality';
import { useFpsGovernor } from './useFpsGovernor';

const POSTER_FALLBACK = (
  <img
    src="/poster.jpg"
    alt="Avichal Goyal 3D LEGO Minifigure"
    style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block', pointerEvents: 'none' }}
  />
);

class CanvasErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

function FpsGovernor({ onDowngrade }) {
  useFpsGovernor(onDowngrade);
  return null;
}

function SoftContactShadow({ badgeMode = false, isWalking = false }) {
  const meshRef = useRef(null);
  const shadowTexture = useMemo(() => {
    if (typeof document === 'undefined') return null;
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');

    // Directional 45-deg ground contact shadow falloff
    const grad = ctx.createRadialGradient(66, 66, 6, 66, 66, 58);
    grad.addColorStop(0, 'rgba(10, 12, 18, 0.62)');
    grad.addColorStop(0.38, 'rgba(10, 12, 18, 0.36)');
    grad.addColorStop(0.72, 'rgba(10, 12, 18, 0.12)');
    grad.addColorStop(1, 'rgba(10, 12, 18, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 128, 128);

    // Direct physical foot-to-baseplate contact occlusion patches
    ctx.fillStyle = 'rgba(8, 10, 16, 0.52)';
    ctx.beginPath();
    ctx.ellipse(48, 64, 14, 8.5, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.ellipse(80, 64, 14, 8.5, 0, 0, Math.PI * 2);
    ctx.fill();

    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, []);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const targetX = isWalking ? 1.32 : 1.2;
    const targetY = isWalking ? 0.84 : 0.76;
    meshRef.current.scale.x = THREE.MathUtils.damp(meshRef.current.scale.x, targetX, 10, delta);
    meshRef.current.scale.y = THREE.MathUtils.damp(meshRef.current.scale.y, targetY, 10, delta);
  });

  if (badgeMode || !shadowTexture) {
    return null;
  }

  return (
    <mesh
      ref={meshRef}
      position={[0.04, -1.03, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      scale={isWalking ? [1.32, 0.84, 1] : [1.2, 0.76, 1]}
    >
      <planeGeometry args={[1.55, 1.55]} />
      <meshBasicMaterial map={shadowTexture} transparent depthWrite={false} />
    </mesh>
  );
}

export default function LegoScene({
  outfitId,
  mood,
  emotion,
  isReading = false,
  scrollVelocity = 0,
  accent = '#FFD000',
  trickState,
  onCharacterClick,
  isWalking = false,
  walkDirection = -1,
  isGrabbed = false,
  badgeMode = false,
  globalPointerRef,
}) {
  const isBatman = outfitId === 'gotham';
  const [webglSupported] = useState(() => Boolean(probeWebGL()));
  const [tier, setTier] = useState(() => resolveTier(webglSupported));
  const [contextLost, setContextLost] = useState(false);
  const [canvasEl, setCanvasEl] = useState(null);

  const handleDowngrade = useCallback(() => {
    setTier((prev) => downgradeTier(prev));
  }, []);

  useEffect(() => {
    if (!canvasEl) return undefined;

    const handleContextLost = (e) => {
      e.preventDefault();
      setContextLost(true);
    };

    const handleContextRestored = () => {
      setContextLost(false);
    };

    canvasEl.addEventListener('webglcontextlost', handleContextLost);
    canvasEl.addEventListener('webglcontextrestored', handleContextRestored);

    return () => {
      canvasEl.removeEventListener('webglcontextlost', handleContextLost);
      canvasEl.removeEventListener('webglcontextrestored', handleContextRestored);
    };
  }, [canvasEl]);

  if (!webglSupported || tier.level === 0) {
    return POSTER_FALLBACK;
  }

  return (
    <CanvasErrorBoundary fallback={POSTER_FALLBACK}>
      {contextLost && POSTER_FALLBACK}
      <Canvas
        shadows={{ type: THREE.PCFSoftShadowMap }}
        dpr={tier.dpr}
        resize={{ scroll: false, debounce: { scroll: 0, resize: 0 } }}
        camera={{ position: [0, -0.02, 6.75], fov: 22 }}
        style={contextLost ? { display: 'none' } : undefined}
        gl={{
          antialias: true,
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.08,
        }}
        onCreated={({ gl, scene }) => {
          scene.environment = null;
          setCanvasEl(gl.domElement);
        }}
      >
        <FpsGovernor onDowngrade={handleDowngrade} />
      {/* 3c. Soft Fill Bounce Light */}
      <hemisphereLight
        name="LegoStudioFillLight"
        skyColor={isBatman ? '#e2e8f0' : '#ffffff'}
        groundColor={isBatman ? '#1e293b' : '#d8d2c5'}
        intensity={isBatman ? 0.95 : 1.15}
      />

      {/* 3a. 45-degree Top-Left Warm Key Light */}
      <directionalLight
        name="LegoStudioKeyLight"
        position={[-6, 10, 8]}
        intensity={isBatman ? 2.1 : 2.2}
        color={isBatman ? '#fef08a' : '#fff7e8'}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-near={0.5}
        shadow-camera-far={35}
        shadow-camera-left={-6}
        shadow-camera-right={6}
        shadow-camera-top={6}
        shadow-camera-bottom={-6}
        shadow-bias={-0.0005}
        shadow-normalBias={0.02}
        shadow-radius={3.5}
      />

      {/* 3b. Cool Back-Right Rim Light (Separates dark hair & black torso from baseplates) */}
      <directionalLight
        name="LegoStudioRimLight"
        position={[7, 8, -6]}
        intensity={1.45}
        color={isBatman ? '#93c5fd' : '#cce2ff'}
      />

      {/* Subtle Warm Accent Rim */}
      <pointLight
        position={[0, 1.6, -2.8]}
        intensity={isBatman ? 1.15 : 0.42}
        color={isBatman ? '#FFD000' : accent}
      />

      {/* 4. Invisible Shadow-Catcher Ground Plane */}
      {!badgeMode && (
        <mesh
          name="LegoGroundShadowCatcher"
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -1.03, 0]}
          receiveShadow
        >
          <planeGeometry args={[6, 6]} />
          <shadowMaterial transparent opacity={isBatman ? 0.42 : 0.26} color="#0a0a0a" />
        </mesh>
      )}

      <Suspense fallback={null}>
        <SoftContactShadow badgeMode={badgeMode} isWalking={isWalking} />
        <Minifig
          outfitId={outfitId}
          mood={mood}
          emotion={emotion}
          isReading={isReading}
          scrollVelocity={scrollVelocity}
          accent={accent}
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
    </CanvasErrorBoundary>
  );
}
