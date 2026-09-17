"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

/** Deterministic slice values so bursts look composed, not random noise. */
const SLICES = [
  { top: "12%", shift: -6 },
  { top: "38%", shift: 5 },
  { top: "64%", shift: -3 },
  { top: "86%", shift: 8 },
];

export interface GlitchTypeProps {
  children: string;
  /** Average rest time between bursts in ms. */
  everyMs?: number;
  className?: string;
}

export function GlitchType({ children, everyMs = 4200, className }: GlitchTypeProps) {
  const [bursting, setBursting] = useState(false);

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    let timeout: number | undefined;
    let reset: number | undefined;

    const schedule = () => {
      timeout = window.setTimeout(() => {
        setBursting(true);
        reset = window.setTimeout(() => {
          setBursting(false);
          schedule();
        }, 180);
      }, everyMs + Math.random() * everyMs * 0.6);
    };

    schedule();
    return () => {
      window.clearTimeout(timeout);
      window.clearTimeout(reset);
    };
  }, [everyMs]);

  return (
    <span className={cn("relative inline-block select-none", className)} role="text" aria-label={children}>
      <span aria-hidden className="relative inline-block">
        {children}
        {bursting
          ? SLICES.map((slice, index) => (
              <span
                key={index}
                className="absolute inset-0"
                style={{
                  clipPath: `polygon(0 ${slice.top}, 100% ${slice.top}, 100% calc(${slice.top} + 14%), 0 calc(${slice.top} + 14%))`,
                  transform: `translateX(${slice.shift}px)`,
                  color: index % 2 === 0 ? "#ff2d55" : "#00e5ff",
                  mixBlendMode: "screen",
                }}
              >
                {children}
              </span>
            ))
          : null}
      </span>
      <span className="sr-only">{children}</span>
    </span>
  );
}

export default GlitchType;
