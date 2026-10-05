import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { ContactShadows, RoundedBox } from '@react-three/drei';
import Minifig from './Minifig';

function BrickPedestal({ activeOutfit = 'base', gothamMode = false }) {
  const accentMap = {
    base: '#E3000B',
    doctor: '#1A7F8E',
    techy: '#2563EB',
    masterplayer: '#C42828',
    gotham: '#FACC15',
  };
  const accent = gothamMode ? '#FACC15' : accentMap[activeOutfit] || '#E3000B';
  const baseColor = gothamMode ? '#0F1420' : '#181B22';

  const studs = [];
  for (let x = -1.2; x <= 1.2; x += 0.6) {
    for (let z = -0.9; z <= 0.9; z += 0.6) {
      studs.push([Number(x.toFixed(2)), Number(z.toFixed(2))]);
    }
  }

  return (
    <group position={[0, -0.14, 0]}>
      {/* Main LEGO Baseplate Plinth */}
      <RoundedBox args={[3.2, 0.28, 2.5]} radius={0.05} smoothness={4} receiveShadow castShadow>
        <meshPhysicalMaterial color={baseColor} roughness={0.26} clearcoat={0.7} />
      </RoundedBox>

      {/* Accent Trim Brick Plate */}
      <RoundedBox args={[3.04, 0.1, 2.34]} radius={0.03} position={[0, 0.16, 0]} receiveShadow>
        <meshPhysicalMaterial color={accent} roughness={0.22} clearcoat={0.8} />
      </RoundedBox>

      {/* Tactile Top Stud Grid */}
      {studs.map(([sx, sz], i) => (
        <mesh key={i} position={[sx, 0.24, sz]} receiveShadow castShadow>
          <cylinderGeometry args={[0.14, 0.14, 0.08, 20]} />
          <meshPhysicalMaterial color={i % 4 === 0 ? accent : baseColor} roughness={0.24} clearcoat={0.75} />
        </mesh>
      ))}

      {/* Back Brick Wall / Gotham Rooftop Silhouette */}
      <group position={[0, 1.85, -1.15]}>
        <RoundedBox args={[3.1, 3.6, 0.24]} radius={0.05} receiveShadow castShadow>
          <meshPhysicalMaterial color={gothamMode ? '#090C14' : '#F3EDE0'} roughness={0.28} clearcoat={0.5} />
        </RoundedBox>

        {/* Glowing Windows in Gotham Mode or Decorative Brick Relief in Studio Mode */}
        {gothamMode ? (
          <group position={[0, 0.25, 0.14]}>
            {[
              [-0.85, 0.95],
              [-0.35, 0.95],
              [0.35, 0.95],
              [0.85, 0.95],
              [-0.85, 0.35],
              [0.85, 0.35],
              [-0.35, -0.25],
              [0.35, -0.25],
            ].map(([wx, wy], idx) => (
              <mesh key={idx} position={[wx, wy, 0]}>
                <planeGeometry args={[0.26, 0.36]} />
                <meshBasicMaterial color={idx % 2 === 0 ? '#FACC15' : '#38BDF8'} />
              </mesh>
            ))}
          </group>
        ) : (
          <group position={[0, 0.45, 0.13]}>
            {[-0.82, 0, 0.82].map((bx, idx) => (
              <RoundedBox key={idx} args={[0.68, 0.34, 0.08]} radius={0.02} position={[bx, idx % 2 === 0 ? 0.55 : -0.1, 0]}>
                <meshPhysicalMaterial color={idx === 1 ? accent : '#E5DEC9'} roughness={0.25} clearcoat={0.7} />
              </RoundedBox>
            ))}
          </group>
        )}
      </group>
    </group>
  );
}

export default function LegoScene({
  scrollProgressRef,
  activeOutfit = 'base',
  gothamMode = false,
  trickState = null,
  onTriggerTrick,
  reducedMotion = false,
}) {
  const pointerRef = useRef({ x: 0, y: 0 });
  const userSpinOffsetRef = useRef(0);
  const dragStateRef = useRef({ dragging: false, lastX: 0 });
  const [webglSupported] = useState(() => {
    if (typeof document === 'undefined') return true;
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      return Boolean(gl);
    } catch {
      return false;
    }
  });
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const onPointerMove = (e) => {
      const nx = (e.clientX / Math.max(1, window.innerWidth)) * 2 - 1;
      const ny = (e.clientY / Math.max(1, window.innerHeight)) * 2 - 1;
      pointerRef.current.x = nx;
      pointerRef.current.y = ny;

      if (dragStateRef.current.dragging) {
        const dx = e.clientX - dragStateRef.current.lastX;
        dragStateRef.current.lastX = e.clientX;
        userSpinOffsetRef.current += dx * 0.014;
      }
    };

    const onPointerUp = () => {
      if (dragStateRef.current.dragging) {
        dragStateRef.current.dragging = false;
        setIsDragging(false);
      }
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerup', onPointerUp, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, []);

  const effectiveOutfit = gothamMode ? 'gotham' : activeOutfit;

  const fallbackImageMap = {
    base: '/media/characters/sheet-base.png',
    doctor: '/media/characters/sheet-doctor.jpg',
    techy: '/media/characters/sheet-techy.png',
    masterplayer: '/media/characters/sheet-masterplayer.jpg',
    gotham: '/poster.jpg',
  };

  if (!webglSupported) {
    return (
      <div className="character-fallback-card" role="img" aria-label={`Avichal Goyal minifigure in ${effectiveOutfit} outfit`}>
        <img
          src={fallbackImageMap[effectiveOutfit] || '/poster.jpg'}
          alt={`Avichal Goyal minifigure reference (${effectiveOutfit})`}
          className="character-fallback-img"
        />
        <div className="character-fallback-caption">
          <span>Static 3D Preview ({effectiveOutfit.toUpperCase()} Outfit)</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`character-stage-canvas-wrap ${isDragging ? 'is-grabbing' : ''}`}
      onPointerDown={(e) => {
        dragStateRef.current.dragging = true;
        dragStateRef.current.lastX = e.clientX;
        setIsDragging(true);
      }}
      role="region"
      aria-label="Interactive 3D minifigure of Avichal Goyal. Drag horizontally to rotate or click to perform a trick."
    >
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0.35, 6.5], fov: 38, near: 0.1, far: 40 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={gothamMode ? 0.55 : 0.95} color={gothamMode ? '#93C5FD' : '#FFFBEB'} />
        <directionalLight
          castShadow
          position={[3.5, 6.2, 4.5]}
          intensity={gothamMode ? 1.65 : 2.1}
          color={gothamMode ? '#E0F2FE' : '#FFFDF9'}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight
          position={[-3.2, 2.8, 2.5]}
          intensity={gothamMode ? 1.8 : 0.8}
          color={gothamMode ? '#38BDF8' : '#FDE68A'}
        />
        {gothamMode && (
          <pointLight position={[2.2, 3.4, -0.5]} intensity={2.2} color="#FACC15" />
        )}

        <hemisphereLight
          skyColor={gothamMode ? '#60A5FA' : '#FFFDF9'}
          groundColor={gothamMode ? '#090D16' : '#D6D0C4'}
          intensity={gothamMode ? 0.65 : 0.85}
        />
        <directionalLight
          position={[-3.8, 4.5, -3.2]}
          intensity={gothamMode ? 1.3 : 1.0}
          color={gothamMode ? '#38BDF8' : '#E2E8F0'}
        />

        <Suspense fallback={null}>
          <group position={[0, -1.78, 0]}>
            <BrickPedestal activeOutfit={effectiveOutfit} gothamMode={gothamMode} />
            <Minifig
              scrollProgressRef={scrollProgressRef}
              pointerRef={pointerRef}
              activeOutfit={effectiveOutfit}
              trickState={trickState}
              userSpinOffsetRef={userSpinOffsetRef}
              onCharacterClick={onTriggerTrick}
              reducedMotion={reducedMotion}
            />
            <ContactShadows
              position={[0, 0.02, 0]}
              opacity={gothamMode ? 0.65 : 0.45}
              scale={6}
              blur={1.8}
              far={3.5}
            />
          </group>
        </Suspense>
      </Canvas>
    </div>
  );
}
