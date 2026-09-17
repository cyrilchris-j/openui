"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

export interface GlitchCyberMosaicProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function GlitchCyberMosaic({ className, children, ...props }: GlitchCyberMosaicProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let w = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let h = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const render = () => {
      ctx.fillStyle = "rgba(15, 23, 42, 0.2)";
      ctx.fillRect(0, 0, w, h);

      if (Math.random() > 0.4) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        const bw = Math.random() * 80 + 20;
        const bh = Math.random() * 8 + 2;
        ctx.fillStyle = Math.random() > 0.5 ? "rgba(56, 189, 248, 0.4)" : "rgba(236, 72, 153, 0.4)";
        ctx.fillRect(x, y, bw, bh);
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
