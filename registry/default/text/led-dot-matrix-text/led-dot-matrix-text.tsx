"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

/** 5×7 bitmap font for A-Z, 0-9, space (columns, LSB top). */
const FONT: Record<string, number[]> = {
  A: [0x1f, 0x11, 0x11, 0x1f, 0x11, 0x11, 0x11],
  B: [0x1e, 0x11, 0x11, 0x1e, 0x11, 0x11, 0x1e],
  C: [0x0e, 0x11, 0x10, 0x10, 0x10, 0x11, 0x0e],
  D: [0x1e, 0x11, 0x11, 0x11, 0x11, 0x11, 0x1e],
  E: [0x1f, 0x10, 0x10, 0x1e, 0x10, 0x10, 0x1f],
  F: [0x1f, 0x10, 0x10, 0x1e, 0x10, 0x10, 0x10],
  G: [0x0e, 0x11, 0x10, 0x17, 0x11, 0x11, 0x0f],
  H: [0x11, 0x11, 0x11, 0x1f, 0x11, 0x11, 0x11],
  I: [0x0e, 0x04, 0x04, 0x04, 0x04, 0x04, 0x0e],
  J: [0x07, 0x02, 0x02, 0x02, 0x02, 0x12, 0x0c],
  K: [0x11, 0x12, 0x14, 0x18, 0x14, 0x12, 0x11],
  L: [0x10, 0x10, 0x10, 0x10, 0x10, 0x10, 0x1f],
  M: [0x11, 0x1b, 0x15, 0x15, 0x11, 0x11, 0x11],
  N: [0x11, 0x19, 0x15, 0x13, 0x11, 0x11, 0x11],
  O: [0x0e, 0x11, 0x11, 0x11, 0x11, 0x11, 0x0e],
  P: [0x1f, 0x11, 0x11, 0x1f, 0x10, 0x10, 0x10],
  Q: [0x0e, 0x11, 0x11, 0x11, 0x15, 0x12, 0x0d],
  R: [0x1f, 0x11, 0x11, 0x1f, 0x14, 0x12, 0x11],
  S: [0x0f, 0x10, 0x10, 0x0e, 0x01, 0x01, 0x1e],
  T: [0x1f, 0x04, 0x04, 0x04, 0x04, 0x04, 0x04],
  U: [0x11, 0x11, 0x11, 0x11, 0x11, 0x11, 0x0e],
  V: [0x11, 0x11, 0x11, 0x11, 0x11, 0x0a, 0x04],
  W: [0x11, 0x11, 0x11, 0x15, 0x15, 0x15, 0x0a],
  X: [0x11, 0x11, 0x0a, 0x04, 0x0a, 0x11, 0x11],
  Y: [0x11, 0x11, 0x0a, 0x04, 0x04, 0x04, 0x04],
  Z: [0x1f, 0x01, 0x02, 0x04, 0x08, 0x10, 0x1f],
  " ": [0, 0, 0, 0, 0, 0, 0],
};

export interface LedDotMatrixTextProps {
  children: string;
  /** Scroll speed in columns per second; 0 = static. */
  scroll?: number;
  className?: string;
}

export function LedDotMatrixText({ children, scroll = 14, className }: LedDotMatrixTextProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const dot = 8;
    const gap = 3;
    const rows = 7;
    const text = children.toUpperCase();
    const cols = text.length * 6;

    canvas.width = (cols * (dot + gap)) * dpr;
    canvas.height = (rows * (dot + gap)) * dpr;
    ctx.scale(dpr, dpr);

    let offset = 0;
    let raf: number | null = null;
    let last = performance.now();

    const draw = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      if (scroll > 0 && !reduced) offset = (offset + scroll * dt) % cols;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const totalCols = cols;
      for (let index = 0; index < text.length; index++) {
        const glyph = FONT[text[index] ?? " "] ?? FONT[" "]!;
        for (let col = 0; col < 5; col++) {
          const logical = (index * 6 + col - Math.floor(offset) + totalCols * 2) % totalCols;
          const bits = glyph[col] ?? 0;
          for (let row = 0; row < rows; row++) {
            if ((bits >> (rows - 1 - row)) & 1) {
              const x = logical * (dot + gap);
              const y = row * (dot + gap);
              ctx.fillStyle = "#ff5c39";
              ctx.shadowColor = "#ff5c39";
              ctx.shadowBlur = 6;
              ctx.beginPath();
              ctx.arc(x + dot / 2, y + dot / 2, dot / 2.4, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
      }
      if (scroll > 0 && !reduced) raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => {
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, [children, scroll, reduced]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("rounded-lg bg-[#140a06] p-3", className)}
      style={{ width: "100%", maxWidth: 480, imageRendering: "auto" }}
      role="img"
      aria-label={children}
    />
  );
}

export default LedDotMatrixText;
