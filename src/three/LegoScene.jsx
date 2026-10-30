import { Suspense, useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import Minifig from './Minifig';

function StudioEnvironment({ isBatman = false }) {
  const gl = useThree((state) => state.gl);

  const envTarget = useMemo(() => {
    const pmremGenerator = new THREE.PMREMGenerator(gl);
    pmremGenerator.compileEquirectangularShader();

    const envScene = new THREE.Scene();
    envScene.background = new THREE.Color(isBatman ? '#0b0f19' : '#1e2430');

    // Overhead main studio softbox
    const topBoxGeo = new THREE.PlaneGeometry(10, 10);
    const topBoxMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(isBatman ? 3.2 : 3.3, isBatman ? 3.3 : 3.7, isBatman ? 3.8 : 3.5),
      side: THREE.DoubleSide,
    });
    const topBox = new THREE.Mesh(topBoxGeo, topBoxMat);
    topBox.position.set(0, 7, 0);
    topBox.rotation.x = Math.PI / 2;
    envScene.add(topBox);

    // Top-left 45-degree key light reflector panel for crisp ABS plastic specular highlights
    const keyPanelGeo = new THREE.PlaneGeometry(7.5, 7.5);
    const keyPanelMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(4.5, 4.4, 4.1),
      side: THREE.DoubleSide,
    });
    const keyPanel = new THREE.Mesh(keyPanelGeo, keyPanelMat);
    keyPanel.position.set(-5.5, 5.2, 5.5);
    keyPanel.lookAt(0, 0, 0);
    envScene.add(keyPanel);

    // Right studio fill strip
    const fillStripGeo = new THREE.PlaneGeometry(4.5, 8.5);
    const fillStripMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(isBatman ? 1.6 : 2.2, isBatman ? 2.1 : 2.3, isBatman ? 3.2 : 2.6),
      side: THREE.DoubleSide,
    });
    const fillStrip = new THREE.Mesh(fillStripGeo, fillStripMat);
    fillStrip.position.set(6.5, 1.8, 3.2);
    fillStrip.lookAt(0, 0, 0);
    envScene.add(fillStrip);

    // Warm rim card behind the minifigure
    const rimCardGeo = new THREE.PlaneGeometry(8, 5);
    const rimCardMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(isBatman ? 3.6 : 2.6, isBatman ? 2.9 : 2.2, isBatman ? 0.8 : 1.6),
      side: THREE.DoubleSide,
    });
    const rimCard = new THREE.Mesh(rimCardGeo, rimCardMat);
    rimCard.position.set(0, 2.5, -6.5);
    rimCard.lookAt(0, 0, 0);
    envScene.add(rimCard);

    // Soft studio floor bounce
    const floorGeo = new THREE.PlaneGeometry(14, 14);
    const floorMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(isBatman ? 0.35 : 0.95, isBatman ? 0.4 : 0.92, isBatman ? 0.55 : 0.88),
      side: THREE.DoubleSide,
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.position.set(0, -4.5, 0);
    floorMesh.rotation.x = -Math.PI / 2;
    envScene.add(floorMesh);

    const renderTarget = pmremGenerator.fromScene(envScene, 0.04);

    pmremGenerator.dispose();
    topBoxGeo.dispose();
    topBoxMat.dispose();
    keyPanelGeo.dispose();
    keyPanelMat.dispose();
    fillStripGeo.dispose();
    fillStripMat.dispose();
    rimCardGeo.dispose();
    rimCardMat.dispose();
    floorGeo.dispose();
    floorMat.dispose();

    return renderTarget;
  }, [gl, isBatman]);

  useEffect(() => {
    return () => {
      envTarget.dispose();
    };
  }, [envTarget]);

  return <primitive object={envTarget.texture} attach="environment" />;
}

function SoftContactShadow({ badgeMode = false, isWalking = false }) {
  const meshRef = useRef(null);
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

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const targetX = isWalking ? 1.35 : 1.22;
    const targetY = isWalking ? 0.85 : 0.78;
    meshRef.current.scale.x = THREE.MathUtils.damp(meshRef.current.scale.x, targetX, 10, delta);
    meshRef.current.scale.y = THREE.MathUtils.damp(meshRef.current.scale.y, targetY, 10, delta);
  });

  if (badgeMode || !shadowTexture) {
    return null;
  }

  return (
    <mesh
      ref={meshRef}
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

  return (
    <Canvas
      shadows={{ type: THREE.PCFSoftShadowMap }}
      dpr={[1, 2]}
      resize={{ scroll: false, debounce: { scroll: 0, resize: 0 } }}
      camera={{ position: [0, -0.02, 6.75], fov: 22 }}
      gl={{
        antialias: true,
        alpha: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.06,
      }}
    >
      <StudioEnvironment isBatman={isBatman} />

      {/* Studio Lighting for Injection-Molded ABS Plastic Specular Clarity */}
      <hemisphereLight
        skyColor={isBatman ? '#e2e8f0' : '#fffbeb'}
        groundColor={isBatman ? '#1e293b' : '#d6d3d1'}
        intensity={isBatman ? 1.25 : 1.55}
      />

      {/* Top-Left 45deg Directional Key Light */}
      <directionalLight
        position={[-3.6, 5.2, 4.8]}
        intensity={isBatman ? 1.45 : 1.25}
        color={isBatman ? '#fef08a' : '#fffdf7'}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0005}
      />

      {/* Studio Fill Light */}
      <directionalLight
        position={[3.2, 2.6, 4.2]}
        intensity={isBatman ? 0.75 : 0.58}
        color={isBatman ? '#60a5fa' : '#f1f5f9'}
      />

      {/* Back Rim Light */}
      <pointLight
        position={[0, 1.6, -2.6]}
        intensity={isBatman ? 1.25 : 0.48}
        color={isBatman ? '#FFD000' : accent}
      />

      {/* Transparent Shadow-Receiving Baseplate Floor Plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.03, 0]} receiveShadow>
        <planeGeometry args={[3.2, 3.2]} />
        <shadowMaterial transparent opacity={isBatman ? 0.45 : 0.24} />
      </mesh>

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
  );
}
