"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

export interface FloatChild {
  content: React.ReactNode;
  /** Vertical amplitude, px. */
  amplitude?: number;
  /** Seconds per bob. */
  periodSeconds?: number;
  /** Phase offset in radians. */
  phase?: number;
}

export interface IdleFloatLoopProps {
  children: FloatChild[];
  className?: string;
}

export function IdleFloatLoop({ children, className }: IdleFloatLoopProps) {
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
      children.forEach((child, index) => {
        const node = refs.current[index];
        if (!node) return;
        const amplitude = child.amplitude ?? 10;
        const period = child.periodSeconds ?? 4;
        const phase = child.phase ?? index * 1.3;
        const y = Math.sin((elapsed / period) * Math.PI * 2 + phase) * amplitude;
        const tilt = Math.cos((elapsed / period) * Math.PI * 2 + phase) * 1.5;
        node.style.transform = `translateY(${y.toFixed(2)}px) rotate(${tilt.toFixed(2)}deg)`;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, [children, reduced]);

  return (
    <div className={cn("flex items-center justify-center gap-8", className)}>
      {children.map((child, index) => (
        <div
          key={index}
          ref={(node) => {
            refs.current[index] = node;
          }}
          aria-hidden={typeof child.content === "string"}
          className="will-change-transform"
        >
          {child.content}
        </div>
      ))}
    </div>
  );
}

export default IdleFloatLoop;
