"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

export interface ElasticOrbitLoaderProps {
  size?: number;
  speed?: number;
  className?: string;
}

export function ElasticOrbitLoader({ size = 160, speed = 1, className }: ElasticOrbitLoaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId: number;
    let t = 0;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const satellites = [
      { a: size * 0.38, b: size * 0.18, speed: 1.2 * speed, color: "#161616", size: 5 },
      { a: size * 0.26, b: size * 0.36, speed: -0.9 * speed, color: "#e84c3d", size: 4 },
      { a: size * 0.44, b: size * 0.28, speed: 0.7 * speed, color: "#6e6e6e", size: 3.5 },
    ];

    const draw = () => {
      ctx.clearRect(0, 0, size, size);
      const cx = size / 2;
      const cy = size / 2;

      // Draw nucleus
      ctx.beginPath();
      ctx.arc(cx, cy, 7, 0, Math.PI * 2);
      ctx.fillStyle = "#161616";
      ctx.fill();

      satellites.forEach((sat, idx) => {
        // Orbital trajectory
        ctx.beginPath();
        ctx.ellipse(cx, cy, sat.a, sat.b, idx * 0.8, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(180, 180, 180, 0.25)";
        ctx.lineWidth = 1;
        ctx.stroke();

        // Position with Keplerian variable speed
        const angle = t * sat.speed + idx * 2.1;
        const currentSpeedMult = 1 + 0.3 * Math.sin(angle);
        const effectiveAngle = reduced ? idx * 2 : angle * currentSpeedMult;

        const cosRot = Math.cos(idx * 0.8);
        const sinRot = Math.sin(idx * 0.8);
        const unrotX = sat.a * Math.cos(effectiveAngle);
        const unrotY = sat.b * Math.sin(effectiveAngle);

        const x = cx + (unrotX * cosRot - unrotY * sinRot);
        const y = cy + (unrotX * sinRot + unrotY * cosRot);

        ctx.beginPath();
        ctx.arc(x, y, sat.size, 0, Math.PI * 2);
        ctx.fillStyle = sat.color;
        ctx.fill();
      });

      if (!reduced) {
        t += 0.02;
        rafId = requestAnimationFrame(draw);
      }
    };

    draw();
    return () => cancelAnimationFrame(rafId);
  }, [size, speed]);

  return (
    <div className={cn("inline-flex items-center justify-center p-4", className)}>
      <canvas ref={canvasRef} width={size} height={size} className="block" />
    </div>
  );
}
