"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line, Sphere } from "@react-three/drei";
import * as THREE from "three";

type Location = {
  name: string;
  lat: number;
  lon: number;
  hq?: boolean;
};

const LOCATIONS: Location[] = [
  { name: "Bhopal", lat: 23.2599, lon: 77.4126, hq: true },
  { name: "Delhi", lat: 28.6139, lon: 77.209 },
  { name: "Mumbai", lat: 19.076, lon: 72.8777 },
  { name: "Bangalore", lat: 12.9716, lon: 77.5946 },
  { name: "Hyderabad", lat: 17.385, lon: 78.4867 },
  { name: "Pune", lat: 18.5204, lon: 73.8567 },
  { name: "Dubai", lat: 25.2048, lon: 55.2708 },
  { name: "Singapore", lat: 1.3521, lon: 103.8198 },
  { name: "London", lat: 51.5074, lon: -0.1278 },
];

const INDIA = { lat: 20.5937, lon: 78.9629 };

function latLonToVec3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

function arcPoints(
  from: THREE.Vector3,
  to: THREE.Vector3,
  radius: number,
  segments = 48,
): THREE.Vector3[] {
  const start = from.clone().normalize().multiplyScalar(radius);
  const end = to.clone().normalize().multiplyScalar(radius);
  const points: THREE.Vector3[] = [];

  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const v = new THREE.Vector3().lerpVectors(start, end, t);
    const lift = 1 + 0.12 * Math.sin(Math.PI * t);
    points.push(v.normalize().multiplyScalar(radius * lift));
  }

  return points;
}

function NetworkLines({ hqPos, locations }: { hqPos: THREE.Vector3; locations: THREE.Vector3[] }) {
  const linesRef = useRef<THREE.Group>(null);

  const arcs = useMemo(() => {
    return locations.map((loc) => arcPoints(hqPos, loc, 1.04));
  }, [hqPos, locations]);

  useFrame((state) => {
    if (!linesRef.current) return;
    linesRef.current.children.forEach((child, i) => {
      const line = child as THREE.Object3D & { material?: THREE.LineBasicMaterial };
      if (line.material) {
        line.material.opacity = 0.25 + Math.sin(state.clock.elapsedTime * 1.5 + i * 0.8) * 0.15;
      }
    });
  });

  return (
    <group ref={linesRef}>
      {arcs.map((points, i) => (
        <Line
          key={i}
          points={points}
          color="#2563EB"
          transparent
          opacity={0.35}
          lineWidth={1}
        />
      ))}
    </group>
  );
}

function CityPin({
  position,
  hq = false,
  pulseOffset = 0,
}: {
  position: THREE.Vector3;
  hq?: boolean;
  pulseOffset?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const pulse = 1 + Math.sin(t * 2 + pulseOffset) * 0.2;
    if (ref.current) ref.current.scale.setScalar(pulse);
    if (glowRef.current) {
      glowRef.current.scale.setScalar(pulse * (hq ? 2.2 : 1.6));
      const mat = glowRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = hq ? 0.35 + Math.sin(t * 2) * 0.15 : 0.2 + Math.sin(t * 2 + pulseOffset) * 0.1;
    }
  });

  const size = hq ? 0.045 : 0.028;

  return (
    <group position={position.toArray()}>
      <mesh ref={glowRef}>
        <sphereGeometry args={[size * 2.5, 12, 12]} />
        <meshBasicMaterial color="#2563EB" transparent opacity={0.3} depthWrite={false} />
      </mesh>
      <mesh ref={ref}>
        <sphereGeometry args={[size, 12, 12]} />
        <meshStandardMaterial
          color={hq ? "#2563EB" : "#3B82F6"}
          emissive={hq ? "#2563EB" : "#3B82F6"}
          emissiveIntensity={hq ? 1.2 : 0.8}
          metalness={0.3}
          roughness={0.4}
        />
      </mesh>
    </group>
  );
}

function IndiaHighlight() {
  const ref = useRef<THREE.Mesh>(null);
  const pos = latLonToVec3(INDIA.lat, INDIA.lon, 1.02);

  useFrame((state) => {
    if (!ref.current) return;
    const mat = ref.current.material as THREE.MeshBasicMaterial;
    mat.opacity = 0.18 + Math.sin(state.clock.elapsedTime * 1.2) * 0.06;
  });

  return (
    <mesh ref={ref} position={pos.toArray()}>
      <sphereGeometry args={[0.22, 24, 24]} />
      <meshBasicMaterial color="#2563EB" transparent opacity={0.2} depthWrite={false} />
    </mesh>
  );
}

function EnterpriseGlobeScene() {
  const groupRef = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });

  const particles = useMemo(() => {
    const count = 120;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = 2 * Math.PI * Math.random();
      const r = 1.05 + Math.random() * 0.04;
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  }, []);

  const locationVectors = useMemo(
    () =>
      LOCATIONS.map((loc) => ({
        ...loc,
        pos: latLonToVec3(loc.lat, loc.lon, 1.03),
      })),
    [],
  );

  const hqPos = locationVectors.find((l) => l.hq)!.pos;
  const clientPositions = locationVectors.filter((l) => !l.hq).map((l) => l.pos);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.y = t * 0.06 + pointer.current.x * 0.3;
    groupRef.current.rotation.x = 0.08 + pointer.current.y * 0.12;
  });

  return (
    <group
      ref={groupRef}
      onPointerMove={(e) => {
        pointer.current.x = e.pointer.x ?? 0;
        pointer.current.y = e.pointer.y ?? 0;
      }}
    >
      <Sphere args={[1, 64, 64]}>
        <meshStandardMaterial
          color="#E2E8F0"
          metalness={0.15}
          roughness={0.65}
          transparent
          opacity={0.95}
        />
      </Sphere>

      <mesh>
        <sphereGeometry args={[1.008, 48, 48]} />
        <meshBasicMaterial color="#2563EB" wireframe transparent opacity={0.14} />
      </mesh>

      <mesh>
        <sphereGeometry args={[1.015, 32, 32]} />
        <meshBasicMaterial color="#3B82F6" wireframe transparent opacity={0.06} />
      </mesh>

      <mesh>
        <sphereGeometry args={[1.12, 48, 48]} />
        <meshBasicMaterial color="#2563EB" transparent opacity={0.04} side={THREE.BackSide} />
      </mesh>

      <IndiaHighlight />

      <NetworkLines hqPos={hqPos} locations={clientPositions} />

      {locationVectors.map((loc, i) => (
        <CityPin key={loc.name} position={loc.pos} hq={loc.hq} pulseOffset={i * 0.7} />
      ))}

      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particles, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color="#2563EB"
          size={0.014}
          transparent
          opacity={0.6}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

function GlobeLights() {
  return (
    <>
      <ambientLight intensity={0.85} />
      <directionalLight position={[5, 4, 6]} intensity={1.1} color="#ffffff" />
      <directionalLight position={[-4, -2, 3]} intensity={0.4} color="#DBEAFE" />
      <pointLight position={[-2, 2, 4]} intensity={0.6} color="#2563EB" />
      <pointLight position={[3, -1, 2]} intensity={0.3} color="#93C5FD" />
    </>
  );
}

export function EnterpriseGlobe() {
  return (
    <div className="relative h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 3.15], fov: 36 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        className="!touch-none"
      >
        <GlobeLights />
        <EnterpriseGlobeScene />
      </Canvas>
    </div>
  );
}
