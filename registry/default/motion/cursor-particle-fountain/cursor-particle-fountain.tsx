"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

export interface CursorParticleFountainProps {
  className?: string;
}

export function CursorParticleFountain({ className }: CursorParticleFountainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<{ x: number; y: number; vx: number; vy: number; life: number }[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    const width = (canvas.width = canvas.offsetWidth);
    const height = (canvas.height = canvas.offsetHeight);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particlesRef.current = particlesRef.current.filter((p) => {
        p.vy += 0.25;
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.02;

        if (p.life <= 0) return false;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.5 * p.life, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 0, 0, ${p.life})`;
        ctx.fill();
        return true;
      });

      raf = requestAnimationFrame(render);
    };

    raf = requestAnimationFrame(render);
    return () => cancelAnimationFrame(raf);
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    for (let i = 0; i < 3; i++) {
      particlesRef.current.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 4,
        vy: -Math.random() * 5 - 2,
        life: 1,
      });
    }
  };

  return (
    <div
      onPointerMove={handlePointerMove}
      className={cn("relative h-72 w-full max-w-md overflow-hidden rounded-xl border border-line bg-paper p-6", className)}
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="pointer-events-none flex h-full flex-col items-center justify-center text-center">
        <span className="font-mono text-xs text-ink/50">MOVE POINTER TO ERUPT</span>
        <h4 className="font-display text-base font-bold text-ink">Ballistic Spark Fountain</h4>
      </div>
    </div>
  );
}

export default CursorParticleFountain;
