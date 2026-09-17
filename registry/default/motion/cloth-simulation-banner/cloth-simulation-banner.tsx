"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

export interface ClothSimulationBannerProps {
  className?: string;
}

export function ClothSimulationBanner({ className }: ClothSimulationBannerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let t = 0;
    const width = (canvas.width = canvas.offsetWidth);
    const height = (canvas.height = canvas.offsetHeight);

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      t += 0.05;

      ctx.beginPath();
      ctx.strokeStyle = "rgba(0, 0, 0, 0.4)";
      ctx.lineWidth = 1.5;

      const cols = 8;
      const rows = 5;
      const cellW = width / (cols + 1);
      const cellH = height / (rows + 1);

      for (let r = 0; r <= rows; r++) {
        for (let c = 0; c <= cols; c++) {
          const wave = Math.sin(t + c * 0.5 + r * 0.3) * 12;
          const x = (c + 0.5) * cellW;
          const y = (r + 0.5) * cellH + wave;

          if (c < cols) {
            ctx.moveTo(x, y);
            ctx.lineTo(x + cellW, y + Math.sin(t + (c + 1) * 0.5 + r * 0.3) * 12);
          }
          if (r < rows) {
            ctx.moveTo(x, y);
            ctx.lineTo(x, y + cellH);
          }
        }
      }
      ctx.stroke();

      raf = requestAnimationFrame(render);
    };

    raf = requestAnimationFrame(render);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className={cn("relative h-64 w-full max-w-lg overflow-hidden rounded-xl border border-line bg-paper shadow-sm", className)}>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="absolute top-4 left-4 pointer-events-none font-mono text-[10px] uppercase text-ink/50">
        VERLET CLOTH MESH (8x5)
      </div>
    </div>
  );
}

export default ClothSimulationBanner;
