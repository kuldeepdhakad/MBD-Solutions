"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function HeroGlobe() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.z = 3.55;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const geometry = new THREE.SphereGeometry(1, 64, 64);
    const material = new THREE.MeshStandardMaterial({
      color: "#1E293B",
      metalness: 0.35,
      roughness: 0.38,
      transparent: true,
      opacity: 0.96,
    });
    const globe = new THREE.Mesh(geometry, material);
    group.add(globe);

    const wire = new THREE.Mesh(
      new THREE.SphereGeometry(1.015, 36, 36),
      new THREE.MeshBasicMaterial({
        color: "#2563EB",
        wireframe: true,
        transparent: true,
        opacity: 0.2,
      }),
    );
    group.add(wire);

    const atmosphere = new THREE.Mesh(
      new THREE.SphereGeometry(1.08, 48, 48),
      new THREE.MeshBasicMaterial({
        color: "#2563EB",
        transparent: true,
        opacity: 0.07,
        side: THREE.BackSide,
      }),
    );
    group.add(atmosphere);

    const pointsCount = 220;
    const positions = new Float32Array(pointsCount * 3);
    for (let i = 0; i < pointsCount; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = 2 * Math.PI * Math.random();
      const r = 1.03;
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    const pointsGeo = new THREE.BufferGeometry();
    pointsGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const points = new THREE.Points(
      pointsGeo,
      new THREE.PointsMaterial({
        color: "#60A5FA",
        size: 0.022,
        transparent: true,
        opacity: 0.9,
        depthWrite: false,
      }),
    );
    group.add(points);

    const ambient = new THREE.AmbientLight("#ffffff", 0.55);
    const key = new THREE.DirectionalLight("#ffffff", 1.05);
    key.position.set(3.2, 2.4, 4);
    const fill = new THREE.DirectionalLight("#93C5FD", 0.35);
    fill.position.set(-2.5, -1, 2);
    const rim = new THREE.PointLight("#2563EB", 0.55, 8);
    rim.position.set(-2, 1.5, 2.5);
    scene.add(ambient, key, fill, rim);

    const pointer = { x: 0, y: 0 };
    const targetRot = { x: 0.12, y: 0 };
    let baseY = 0;
    let raf = 0;

    const onPointerMove = (event: PointerEvent) => {
      const rect = mount.getBoundingClientRect();
      const nx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((event.clientY - rect.top) / rect.height) * 2 - 1;
      pointer.x = nx;
      pointer.y = ny;
    };

    const animate = () => {
      baseY += 0.0035;
      targetRot.y += (pointer.x * 0.35 - targetRot.y) * 0.05;
      targetRot.x += (pointer.y * 0.2 - targetRot.x) * 0.05;

      group.rotation.y = baseY + targetRot.y;
      group.rotation.x = 0.12 + targetRot.x * 0.4;
      points.rotation.y = baseY * 0.25;
      atmosphere.scale.setScalar(1 + Math.sin(baseY * 2) * 0.008);

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    mount.addEventListener("pointermove", onPointerMove);
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      mount.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", onResize);
      geometry.dispose();
      material.dispose();
      pointsGeo.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="mx-auto h-[240px] w-full max-w-[280px] cursor-grab md:h-[280px] md:max-w-[320px] lg:h-[300px]"
      aria-hidden="true"
    />
  );
}
