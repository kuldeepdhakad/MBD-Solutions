"use client";

import { useEffect, useRef, useState } from "react";

export function PremiumBackground() {
  const [useCanvas, setUseCanvas] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isDesktop = window.matchMedia("(min-width: 1024px) and (pointer: fine)").matches;
    setUseCanvas(!prefersReduced && isDesktop);
  }, []);

  if (!useCanvas) {
    return (
      <div
        className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,rgba(37,99,235,0.06),transparent_50%),radial-gradient(ellipse_at_bottom_right,rgba(15,23,42,0.04),transparent_50%)]"
        aria-hidden
      />
    );
  }

  return <PremiumBackgroundCanvas />;
}

function PremiumBackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    let visible = true;

    const orbs = Array.from({ length: 3 }, (_, i) => ({
      x: 0.2 + i * 0.25,
      y: 0.15 + (i % 2) * 0.4,
      r: 0.22 + i * 0.04,
      speed: 0.00012 + i * 0.00004,
      phase: i * 1.7,
    }));

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    };

    const draw = (t: number) => {
      if (!ctx || !visible) return;
      ctx.clearRect(0, 0, w, h);
      const isDark = document.documentElement.classList.contains("dark");

      for (const orb of orbs) {
        const ox = w * (orb.x + Math.sin(t * orb.speed + orb.phase) * 0.03);
        const oy = h * (orb.y + Math.cos(t * orb.speed * 1.2 + orb.phase) * 0.02);
        const radius = Math.min(w, h) * orb.r;
        const grad = ctx.createRadialGradient(ox, oy, 0, ox, oy, radius);
        grad.addColorStop(0, `rgba(37, 99, 235, ${isDark ? 0.07 : 0.04})`);
        grad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      }
      raf = requestAnimationFrame(draw);
    };

    const onVis = () => {
      visible = document.visibilityState === "visible";
      if (visible) raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVis);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full opacity-70"
      aria-hidden
    />
  );
}
