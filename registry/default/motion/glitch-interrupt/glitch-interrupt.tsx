"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export interface GlitchInterruptProps {
  children: string;
  /** Average seconds between glitches. */
  intervalSeconds?: number;
  className?: string;
}

export function GlitchInterrupt({ children, intervalSeconds = 4, className }: GlitchInterruptProps) {
  const [glitching, setGlitching] = useState(false);
  const timeout = useRef<number | undefined>(undefined);
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (reduced) return;
    const schedule = () => {
      const wait = intervalSeconds * 1000 * (0.5 + Math.random());
      timeout.current = window.setTimeout(() => {
        setGlitching(true);
        window.setTimeout(() => setGlitching(false), 160 + Math.random() * 140);
        schedule();
      }, wait);
    };
    schedule();
    return () => window.clearTimeout(timeout.current);
  }, [intervalSeconds, reduced]);

  return (
    <span
      className={cn("relative inline-block select-none font-display", className)}
      role="text"
      aria-label={children}
      style={
        glitching
          ? {
              textShadow:
                "2px 0 rgba(255,0,80,0.8), -2px 0 rgba(0,220,255,0.8)",
              transform: `translateX(${(Math.random() * 4 - 2).toFixed(1)}px)`,
              clipPath: `inset(${(Math.random() * 30).toFixed(0)}% 0 ${(Math.random() * 30).toFixed(0)}% 0)`,
            }
          : undefined
      }
      aria-hidden
    >
      {children}
      <span className="sr-only">{children}</span>
    </span>
  );
}

export default GlitchInterrupt;
