"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function HolographicGlobe() {
  const groupRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const pointer = useRef({ x: 0, y: 0 });

  const particles = useMemo(() => {
    const count = 100;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = 2 * Math.PI * Math.random();
      const r = 1.04 + Math.random() * 0.06;
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.y = t * 0.08 + pointer.current.x * 0.35;
    groupRef.current.rotation.x = 0.1 + pointer.current.y * 0.15;
    if (innerRef.current) {
      innerRef.current.rotation.y = -t * 0.05;
    }
  });

  return (
    <group
      ref={groupRef}
      onPointerMove={(e) => {
        pointer.current.x = e.pointer.x ?? 0;
        pointer.current.y = e.pointer.y ?? 0;
      }}
    >
      <Sphere args={[1, 56, 56]}>
        <MeshDistortMaterial
          color="#081224"
          metalness={0.65}
          roughness={0.3}
          distort={0.1}
          speed={1.4}
          transparent
          opacity={0.94}
        />
      </Sphere>

      <mesh ref={innerRef}>
        <sphereGeometry args={[1.012, 48, 48]} />
        <meshBasicMaterial color="#2563eb" wireframe transparent opacity={0.18} />
      </mesh>

      <mesh>
        <sphereGeometry args={[1.025, 36, 36]} />
        <meshBasicMaterial color="#2563eb" wireframe transparent opacity={0.08} />
      </mesh>

      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particles, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color="#2563eb"
          size={0.016}
          transparent
          opacity={0.75}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

function GlobeLights() {
  return (
    <>
      <ambientLight intensity={0.45} />
      <directionalLight position={[4, 3, 5]} intensity={1} color="#ffffff" />
      <directionalLight position={[-3, -1, 2]} intensity={0.35} color="#F8FAFC" />
      <pointLight position={[-2, 2, 3]} intensity={0.5} color="#2563eb" />
    </>
  );
}

export function CommandCenterGlobe() {
  return (
    <div className="relative h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 3.2], fov: 38 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        className="!touch-none"
      >
        <GlobeLights />
        <HolographicGlobe />
      </Canvas>
    </div>
  );
}
