"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

/** Quantise to a 2px grid so jitter reads as typeset, not shaky-cam. */
function seededOffset(seed: number): { x: number; y: number } {
  const value = Math.sin(seed * 91.7) * 10_000;
  const fraction = value - Math.floor(value);
  const angle = fraction * Math.PI * 2;
  return {
    x: Math.round(Math.cos(angle) * 4),
    y: Math.round(Math.sin(angle) * 3),
  };
}

export interface JitterTypeProps {
  children: string;
  /** Milliseconds between jitter re-rolls. */
  interval?: number;
  className?: string;
}

export function JitterType({ children, interval = 900, className }: JitterTypeProps) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setTick((value) => value + 1), interval);
    return () => window.clearInterval(timer);
  }, [interval]);

  return (
    <span className={cn("inline-block", className)} role="text" aria-label={children}>
      {[...children].map((char, index) => {
        const offset = tick === 0 ? { x: 0, y: 0 } : seededOffset(index * 13.7 + tick * 7.3);
        return (
          <span
            key={`${index}-${char}`}
            aria-hidden
            className="inline-block will-change-transform motion-reduce:transform-none"
            style={{
              transform: `translate(${offset.x}px, ${offset.y}px)`,
              transition: "transform 120ms steps(3)",
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        );
      })}
    </span>
  );
}

export default JitterType;
