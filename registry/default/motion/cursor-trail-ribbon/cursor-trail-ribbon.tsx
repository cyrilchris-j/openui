"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

export interface CursorTrailRibbonProps {
  /** Trail length in tracked points. */
  length?: number;
  /** Max ribbon width, px. */
  width?: number;
  colour?: string;
  className?: string;
}

export function CursorTrailRibbon({
  length = 28,
  width = 14,
  colour = "#41ead4",
  className,
}: CursorTrailRibbonProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia?.("(pointer: coarse)").matches) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const points: Array<{ x: number; y: number; t: number }> = [];
    let raf: number | null = null;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      const now = performance.now();

      for (let i = 1; i < points.length; i++) {
        const p0 = points[i - 1]!;
        const p1 = points[i]!;
        const age = (now - p1.t) / 700;
        if (age > 1) continue;
        const falloff = 1 - age;
        const positionAlong = i / points.length;

        ctx.strokeStyle = colour;
        ctx.globalAlpha = falloff * 0.7;
        ctx.lineWidth = Math.max(0.5, width * positionAlong * falloff);
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.lineTo(p1.x, p1.y);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      while (points.length > 0 && now - points[0]!.t > 700) points.shift();
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    const onMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      points.push({ x: event.clientX - rect.left, y: event.clientY - rect.top, t: performance.now() });
      if (points.length > length) points.shift();
    };
    window.addEventListener("pointermove", onMove);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, [length, width, colour]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("pointer-events-none absolute inset-0", className)}
      aria-hidden
    />
  );
}

export default CursorTrailRibbon;
