"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

export interface MatrixHexStreamProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function MatrixHexStream({ className, children, ...props }: MatrixHexStreamProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const resize = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };
    resize();

    const hexCols = Math.floor(canvas.width / 50);
    const drops: number[] = Array.from({ length: hexCols }, () => Math.random() * -30);

    const render = () => {
      ctx.fillStyle = "rgba(10, 15, 25, 0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = "11px monospace";
      ctx.fillStyle = "#38bdf8";

      for (let i = 0; i < drops.length; i++) {
        const hex = "0x" + Math.floor(Math.random() * 65535).toString(16).toUpperCase().padStart(4, "0");
        const x = i * 50;
        const y = (drops[i] ?? 0) * 16;

        ctx.fillText(hex, x, y);
        if (y > canvas.height && Math.random() > 0.95) {
          drops[i] = 0;
        }
        drops[i] = (drops[i] ?? 0) + 1;
      }
      animId = requestAnimationFrame(render);
    };

    render();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className={cn("relative isolate w-full min-h-full bg-slate-950 text-white overflow-hidden", className)} {...props}>
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-40 -z-10" />
      {children}
    </div>
  );
}
