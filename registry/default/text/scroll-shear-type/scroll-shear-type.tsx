"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

export interface ScrollShearTypeProps {
  children: string;
  /** Max skew in degrees at full velocity. */
  maxShear?: number;
  className?: string;
}

export function ScrollShearType({ children, maxShear = 8, className }: ScrollShearTypeProps) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    let lastY = window.scrollY;
    let lastT = performance.now();
    let velocity = 0;
    let shear = 0;
    let frame: number | null = null;

    const tick = () => {
      const now = performance.now();
      const dt = Math.max(1, now - lastT);
      const dy = window.scrollY - lastY;
      lastY = window.scrollY;
      lastT = now;

      const instant = (dy / dt) * 16; // px per frame-equivalent
      velocity += (instant - velocity) * 0.2;

      const target = Math.max(-maxShear, Math.min(maxShear, velocity * 0.6));
      shear += (target - shear) * 0.25;

      const node = ref.current;
      if (node) node.style.transform = `skewY(${shear.toFixed(3)}deg)`;

      if (Math.abs(shear) > 0.01 || Math.abs(velocity) > 0.05) {
        frame = requestAnimationFrame(tick);
      } else {
        frame = null;
        if (node) node.style.transform = "";
      }
    };

    const kick = () => {
      if (frame === null) frame = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", kick, { passive: true });
    return () => {
      window.removeEventListener("scroll", kick);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, [maxShear]);

  return (
    <h2 ref={ref} className={cn("font-display will-change-transform", className)} aria-label={children}>
      <span aria-hidden>{children}</span>
    </h2>
  );
}

export default ScrollShearType;
