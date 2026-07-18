"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function OrbitRing({
  radius,
  tilt,
  speed,
  opacity = 0.35,
}: {
  radius: number;
  tilt: [number, number, number];
  speed: number;
  opacity?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.z = state.clock.elapsedTime * speed;
  });

  return (
    <mesh ref={ref} rotation={tilt}>
      <torusGeometry args={[radius, 0.012, 12, 128]} />
      <meshBasicMaterial color="#3B82F6" transparent opacity={opacity} />
    </mesh>
  );
}

function FloatingParticle({
  position,
  size,
  speed,
}: {
  position: [number, number, number];
  size: number;
  speed: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed;
    ref.current.position.y = position[1] + Math.sin(t) * 0.06;
    ref.current.position.x = position[0] + Math.cos(t * 0.7) * 0.04;
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[size, 8, 8]} />
      <meshBasicMaterial color="#60A5FA" transparent opacity={0.75} />
    </mesh>
  );
}

function GlobeScene() {
  const groupRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  const surfaceParticles = useMemo(() => {
    const count = 120;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = 2 * Math.PI * Math.random();
      const r = 1.03;
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  }, []);

  const orbitParticles = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => {
        const angle = (i / 18) * Math.PI * 2;
        const r = 1.45 + (i % 3) * 0.12;
        return {
          position: [Math.cos(angle) * r, Math.sin(angle * 0.6) * 0.3, Math.sin(angle) * r] as [
            number,
            number,
            number,
          ],
          size: 0.018 + (i % 4) * 0.004,
          speed: 0.4 + (i % 5) * 0.1,
        };
      }),
    [],
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.06;
      groupRef.current.rotation.x = 0.12;
    }
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1 + Math.sin(t * 0.8) * 0.02);
    }
  });

  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[5, 4, 6]} intensity={1.1} color="#ffffff" />
      <directionalLight position={[-4, -2, 3]} intensity={0.45} color="#93C5FD" />
      <pointLight position={[0, 0, 4]} intensity={0.9} color="#2563EB" />
      <pointLight position={[-3, 2, 2]} intensity={0.35} color="#60A5FA" />

      <group ref={groupRef}>
        {/* Atmospheric glow */}
        <mesh ref={glowRef}>
          <sphereGeometry args={[1.28, 32, 32]} />
          <meshBasicMaterial color="#2563EB" transparent opacity={0.06} side={THREE.BackSide} />
        </mesh>

        {/* Core globe */}
        <Sphere args={[1, 48, 48]}>
          <MeshDistortMaterial
            color="#0F172A"
            metalness={0.55}
            roughness={0.28}
            distort={0.08}
            speed={1.2}
            transparent
            opacity={0.97}
          />
        </Sphere>

        {/* Wireframe overlay */}
        <mesh>
          <sphereGeometry args={[1.015, 40, 40]} />
          <meshBasicMaterial color="#2563EB" wireframe transparent opacity={0.22} />
        </mesh>

        {/* Inner rim glow */}
        <mesh>
          <sphereGeometry args={[1.06, 48, 48]} />
          <meshBasicMaterial color="#3B82F6" transparent opacity={0.05} side={THREE.BackSide} />
        </mesh>

        {/* Surface particles */}
        <points>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[surfaceParticles, 3]} />
          </bufferGeometry>
          <pointsMaterial color="#60A5FA" size={0.022} transparent opacity={0.9} depthWrite={false} />
        </points>
      </group>

      {/* Orbit rings */}
      <OrbitRing radius={1.38} tilt={[Math.PI / 2.2, 0.4, 0]} speed={0.12} opacity={0.28} />
      <OrbitRing radius={1.55} tilt={[Math.PI / 2.6, -0.6, 0.3]} speed={-0.08} opacity={0.2} />
      <OrbitRing radius={1.72} tilt={[Math.PI / 2.1, 0.9, -0.2]} speed={0.05} opacity={0.14} />

      {/* Floating orbit particles */}
      {orbitParticles.map((p, i) => (
        <FloatingParticle key={i} position={p.position} size={p.size} speed={p.speed} />
      ))}
    </>
  );
}

export function PremiumGlobe() {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2563EB]/[0.12] blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[45%] w-[45%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#3B82F6]/[0.08] blur-2xl"
        aria-hidden="true"
      />
      <Canvas
        camera={{ position: [0, 0, 3.8], fov: 36 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
        className="!h-full !w-full !touch-none"
      >
        <GlobeScene />
      </Canvas>
    </div>
  );
}
