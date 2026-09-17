"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

export interface FallingMatrixSymbolsProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function FallingMatrixSymbols({ className, children, ...props }: FallingMatrixSymbolsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let w = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let h = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const glyphs = ["∑", "∫", "∂", "√", "π", "∆", "∞", "≈", "≠", "≤", "≥", "λ", "Ω"];
    const items = Array.from({ length: 30 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      char: glyphs[Math.floor(Math.random() * glyphs.length)] ?? "π",
      vy: Math.random() * 0.4 + 0.2,
      opacity: Math.random() * 0.25 + 0.05,
    }));

    const render = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.font = "14px monospace";

      for (const item of items) {
        item.y += item.vy;
        if (item.y > h) {
          item.y = -10;
          item.x = Math.random() * w;
        }
        ctx.fillStyle = `rgba(150, 150, 150, ${item.opacity})`;
        ctx.fillText(item.char, item.x, item.y);
      }
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
