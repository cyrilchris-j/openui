"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

export interface MetaballLavaLampProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function MetaballLavaLamp({ className, children, ...props }: MetaballLavaLampProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let w = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let h = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const blobs = Array.from({ length: 8 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 40 + 30,
      vy: (Math.random() - 0.5) * 0.8,
    }));

    const render = () => {
      ctx.fillStyle = "#090d16";
      ctx.fillRect(0, 0, w, h);

      for (const b of blobs) {
        b.y += b.vy;
        if (b.y < -50) b.y = h + 50;
        if (b.y > h + 50) b.y = -50;

        const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
        grad.addColorStop(0, "rgba(244, 63, 94, 0.4)");
        grad.addColorStop(1, "rgba(244, 63, 94, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fill();
      }
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className={cn("relative isolate w-full min-h-full bg-slate-950 text-white overflow-hidden", className)} {...props}>
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none -z-10" />
      {children}
    </div>
  );
}
