"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

export interface GravityWellCardProps {
  className?: string;
  particleCount?: number;
}

export function GravityWellCard({ className, particleCount = 40 }: GravityWellCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    const width = (canvas.width = canvas.offsetWidth);
    const height = (canvas.height = canvas.offsetHeight);

    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5,
      radius: Math.random() * 2 + 1,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const targetX = mouseRef.current.active ? mouseRef.current.x : width / 2;
      const targetY = mouseRef.current.active ? mouseRef.current.y : height / 2;

      for (const p of particles) {
        const dx = targetX - p.x;
        const dy = targetY - p.y;
        const dist = Math.max(Math.sqrt(dx * dx + dy * dy), 30);
        const force = 40 / (dist * dist);

        p.vx += (dx / dist) * force;
        p.vy += (dy / dist) * force;
        p.vx *= 0.98;
        p.vy *= 0.98;
        p.x += p.vx;
        p.y += p.vy;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fill();
      }

      raf = requestAnimationFrame(render);
    };

    raf = requestAnimationFrame(render);
    return () => cancelAnimationFrame(raf);
  }, [particleCount]);

  return (
    <div
      className={cn("relative h-80 w-full overflow-hidden rounded-xl border border-line bg-paper/60 p-6 shadow-sm", className)}
      onPointerMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top, active: true };
      }}
      onPointerLeave={() => {
        mouseRef.current.active = false;
      }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="relative z-10 pointer-events-none">
        <span className="font-mono text-xs uppercase tracking-wider text-ink/60">Newtonian Field</span>
        <h4 className="mt-1 font-display text-lg font-bold text-ink">Gravitational Well</h4>
        <p className="mt-1 max-w-xs text-xs text-ink/70">Hover anywhere to shift the gravitational centroid.</p>
      </div>
    </div>
  );
}

export default GravityWellCard;
