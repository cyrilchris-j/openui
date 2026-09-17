"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

export interface CountUpSpringProps {
  value: number;
  stiffness?: number;
  /** Decimal places to display. */
  decimals?: number;
  className?: string;
}

export function CountUpSpring({ value, stiffness = 90, decimals = 0, className }: CountUpSpringProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const state = useRef({ current: value, velocity: 0, target: value, raf: null as number | null });

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      node.textContent = value.toFixed(decimals);
      return;
    }

    const s = state.current;
    s.target = value;

    const tick = () => {
      const force = -stiffness * (s.current - s.target);
      s.velocity = (s.velocity + force * 0.016) * 0.88;
      s.current += s.velocity * 0.016;

      if (node) node.textContent = s.current.toFixed(decimals);

      if (Math.abs(s.current - s.target) > 0.001 || Math.abs(s.velocity) > 0.01) {
        s.raf = requestAnimationFrame(tick);
      } else {
        s.current = s.target;
        if (node) node.textContent = s.target.toFixed(decimals);
        s.raf = null;
      }
    };
    if (s.raf === null) s.raf = requestAnimationFrame(tick);

    return () => {
      if (s.raf !== null) {
        cancelAnimationFrame(s.raf);
        s.raf = null;
      }
    };
  }, [value, stiffness, decimals]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {value.toFixed(decimals)}
    </span>
  );
}

export default CountUpSpring;
