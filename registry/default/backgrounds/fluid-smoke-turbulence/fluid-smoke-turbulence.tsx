"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

export interface FluidSmokeTurbulenceProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function FluidSmokeTurbulence({ className, children, ...props }: FluidSmokeTurbulenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let w = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let h = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    let t = 0;
    const render = () => {
      ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
      ctx.fillRect(0, 0, w, h);

      ctx.strokeStyle = "rgba(100, 116, 139, 0.15)";
      ctx.lineWidth = 1.5;

      for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        for (let x = 0; x < w; x += 15) {
          const y = h * 0.5 + Math.sin(x * 0.008 + t + i) * 50 * Math.cos(t * 0.5);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      t += 0.015;
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className={cn("relative isolate w-full min-h-full bg-paper text-ink overflow-hidden", className)} {...props}>
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none -z-10" />
      {children}
    </div>
  );
}
