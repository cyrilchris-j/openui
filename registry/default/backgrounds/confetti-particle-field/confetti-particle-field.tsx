"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

export interface ConfettiParticleFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  count?: number;
  children?: React.ReactNode;
}

export function ConfettiParticleField({ count = 40, className, children, ...props }: ConfettiParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let w = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let h = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const colors = ["#ef4444", "#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899"];
    const flakes = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      size: Math.random() * 6 + 4,
      color: colors[Math.floor(Math.random() * colors.length)] ?? "#3b82f6",
      speedY: Math.random() * 1.5 + 0.5,
      tilt: Math.random() * 10,
      tiltSpeed: Math.random() * 0.05 + 0.02,
    }));

    const render = () => {
      ctx.clearRect(0, 0, w, h);
      for (const f of flakes) {
        f.y += f.speedY;
        f.tilt += f.tiltSpeed;
        if (f.y > h) {
          f.y = -10;
          f.x = Math.random() * w;
        }

        ctx.fillStyle = f.color;
        ctx.fillRect(f.x, f.y, f.size, f.size * Math.sin(f.tilt));
      }
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [count]);

  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-50 -z-10" />
      {children}
    </div>
  );
}
