"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export interface BreathingLoaderProps {
  rings?: number;
  label?: string;
  className?: string;
}

export function BreathingLoader({ rings = 3, label = "Working", className }: BreathingLoaderProps) {
  const refs = useRef<Array<HTMLSpanElement | null>>([]);
  const [elapsed, setElapsed] = useState(0);
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    const timer = window.setInterval(() => setElapsed((value) => value + 1), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (reduced) return;
    let raf: number | null = null;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = (now - start) / 1000;
      refs.current.forEach((node, index) => {
        if (!node) return;
        const phase = elapsed * 1.4 + index * 0.9;
        const scale = 0.7 + Math.sin(phase) * 0.25;
        const opacity = 0.25 + Math.sin(phase) * 0.2;
        node.style.transform = `scale(${scale.toFixed(3)})`;
        node.style.opacity = String(Math.max(0.05, opacity).toFixed(3));
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return (
    <div className={cn("relative flex h-32 w-32 items-center justify-center", className)} role="status" aria-label={`${label}. ${elapsed} seconds elapsed`}>
      {Array.from({ length: rings }, (_, index) => (
        <span
          key={index}
          ref={(node) => {
            refs.current[index] = node;
          }}
          aria-hidden
          className="absolute rounded-full border-2 border-ink/60"
          style={{ width: 80 + index * 22, height: 80 + index * 22, opacity: 0.3 }}
        />
      ))}
      <span className="relative z-10 font-mono text-xs tabular-nums text-ink/60">{elapsed}s</span>
    </div>
  );
}

export default BreathingLoader;
