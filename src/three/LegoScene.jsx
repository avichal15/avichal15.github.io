import { Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import Minifig from './Minifig';

function BrickPedestal({ accent = '#F5C518', isBatman = false, badgeMode = false }) {
  const studs = useMemo(() => {
    const items = [];
    for (let x = -1.5; x <= 1.5; x += 1) {
      for (let z = -0.5; z <= 0.5; z += 1) {
        items.push([x * 0.42, -1.01, z * 0.42]);
      }
    }
    return items;
  }, []);

  if (badgeMode) {
    return null;
  }

  const plateColor = isBatman ? '#1E293B' : '#FFFFFF';
  const rimColor = isBatman ? '#F5C518' : accent;

  return (
    <group>
      {/* Floating LEGO 4x2 Baseplate under the Minifigure */}
      <mesh position={[0, -1.14, 0]} receiveShadow castShadow>
        <boxGeometry args={[2.05, 0.22, 1.28]} />
        <meshStandardMaterial color={plateColor} roughness={0.28} metalness={0.05} />
      </mesh>

      {/* Accent trim under plate */}
      <mesh position={[0, -1.27, 0]} receiveShadow>
        <boxGeometry args={[2.12, 0.08, 1.34]} />
        <meshStandardMaterial color={rimColor} roughness={0.32} metalness={0.08} />
      </mesh>

      {studs.map(([x, y, z]) => (
        <mesh key={`${x}-${z}`} position={[x, y, z]} castShadow receiveShadow>
          <cylinderGeometry args={[0.13, 0.13, 0.08, 24]} />
          <meshStandardMaterial color={rimColor} roughness={0.25} metalness={0.08} />
        </mesh>
      ))}
    </group>
  );
}

export default function LegoScene({
  outfitId,
  mood,
  accent,
  trickState,
  onCycleOutfit,
  angleIndex = 0,
  isJumpingAcross = false,
  badgeMode = false,
}) {
  const isBatman = outfitId === 'gotham';

  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 0.26, 3.35], fov: 31 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={isBatman ? 1.15 : 1.55} />
      <directionalLight
        position={[3.4, 5.2, 4.2]}
        intensity={isBatman ? 2.2 : 2.5}
        color={isBatman ? '#fef08a' : '#fff7ed'}
        castShadow
      />
      <directionalLight
        position={[-3.2, 2.2, 2.5]}
        intensity={isBatman ? 1.1 : 0.95}
        color={isBatman ? '#60a5fa' : '#e0f2fe'}
      />
      <pointLight
        position={[0, 1.4, -2.1]}
        intensity={isBatman ? 1.65 : 0.9}
        color={isBatman ? '#facc15' : accent}
      />

      <Suspense fallback={null}>
        <BrickPedestal accent={accent} isBatman={isBatman} badgeMode={badgeMode} />
        <Minifig
          outfitId={outfitId}
          mood={mood}
          trickState={trickState}
          onCycleOutfit={onCycleOutfit}
          angleIndex={angleIndex}
          isJumpingAcross={isJumpingAcross}
          badgeMode={badgeMode}
        />
      </Suspense>
    </Canvas>
  );
}
