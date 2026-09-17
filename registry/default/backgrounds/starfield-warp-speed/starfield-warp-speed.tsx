"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

export interface StarfieldWarpSpeedProps extends React.HTMLAttributes<HTMLDivElement> {
  starCount?: number;
  speed?: number;
  children?: React.ReactNode;
}

export function StarfieldWarpSpeed({
  starCount = 120,
  speed = 4,
  className,
  children,
  ...props
}: StarfieldWarpSpeedProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let w = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let h = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const stars = Array.from({ length: starCount }, () => ({
      x: (Math.random() - 0.5) * w,
      y: (Math.random() - 0.5) * h,
      z: Math.random() * w,
    }));

    const render = () => {
      ctx.fillStyle = "rgba(10, 10, 15, 0.25)";
      ctx.fillRect(0, 0, w, h);
      const cx = w / 2;
      const cy = h / 2;

      ctx.fillStyle = "#ffffff";
      for (const s of stars) {
        s.z -= speed;
        if (s.z <= 0) {
          s.z = w;
          s.x = (Math.random() - 0.5) * w;
          s.y = (Math.random() - 0.5) * h;
        }
        const k = 128 / s.z;
        const px = s.x * k + cx;
        const py = s.y * k + cy;
        if (px >= 0 && px <= w && py >= 0 && py <= h) {
          const sz = Math.max(1, (1 - s.z / w) * 2.5);
          ctx.beginPath();
          ctx.arc(px, py, sz, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [starCount, speed]);

  return (
    <div className={cn("relative isolate w-full min-h-full bg-slate-950 text-white overflow-hidden", className)} {...props}>
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none -z-10" />
      {children}
    </div>
  );
}
