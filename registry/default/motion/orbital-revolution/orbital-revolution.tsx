"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

export interface OrbitalRevolutionProps {
  /** Orbiting bodies with their own radius, period and phase. */
  bodies: Array<{ label: string; radius: number; periodSeconds: number; phase: number }>;
  size?: number;
  className?: string;
}

export function OrbitalRevolution({ bodies, size = 260, className }: OrbitalRevolutionProps) {
  const refs = useRef<Array<HTMLDivElement | null>>([]);
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (reduced) return;
    let raf: number | null = null;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = (now - start) / 1000;
      bodies.forEach((body, index) => {
        const node = refs.current[index];
        if (!node) return;
        const angle = body.phase + (elapsed / body.periodSeconds) * Math.PI * 2;
        const x = Math.cos(angle) * body.radius;
        const y = Math.sin(angle) * body.radius * 0.42; // elliptical
        const depth = (Math.sin(angle) + 1) / 2; // 0 back, 1 front
        node.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${0.7 + depth * 0.5})`;
        node.style.opacity = String(0.45 + depth * 0.55);
        node.style.zIndex = String(Math.round(depth * 10));
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, [bodies, reduced]);

  return (
    <div className={cn("relative", className)} style={{ width: size, height: size / 1.6 }} role="img" aria-label="Orbiting bodies">
      <span aria-hidden className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink" />
      {bodies.map((body, index) => (
        <div
          key={body.label}
          ref={(node) => {
            refs.current[index] = node;
          }}
          aria-hidden
          className="absolute left-1/2 top-1/2 flex items-center justify-center rounded-full border border-line bg-paper font-mono text-[10px] text-ink shadow-md will-change-transform"
          style={{ width: 34, height: 34 }}
        >
          {body.label}
        </div>
      ))}
    </div>
  );
}

export default OrbitalRevolution;
