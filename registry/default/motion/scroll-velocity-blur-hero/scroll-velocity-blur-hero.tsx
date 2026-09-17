"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

export interface ScrollVelocityBlurHeroProps {
  children: string;
  className?: string;
}

export function ScrollVelocityBlurHero({ children, className }: ScrollVelocityBlurHeroProps) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    let lastY = window.scrollY;
    let lastT = performance.now();
    let raf: number | null = null;
    let velocity = 0;

    const tick = () => {
      const now = performance.now();
      const dy = window.scrollY - lastY;
      const dt = Math.max(1, now - lastT);
      lastY = window.scrollY;
      lastT = now;
      velocity += ((dy / dt) * 16 - velocity) * 0.2;

      const intensity = Math.min(Math.abs(velocity) / 30, 1);
      const direction = velocity >= 0 ? 1 : -1;
      const spread = intensity * 6;
      // Directional ghosting via stacked shadows — no filter, no repaint storm.
      node.style.textShadow =
        spread > 0.2
          ? Array.from({ length: 5 }, (_, index) => {
              const offset = (index + 1) * spread * 0.6 * direction;
              return `0 ${offset.toFixed(1)}px 2px rgba(28,28,30,${(0.25 - index * 0.05).toFixed(2)})`;
            }).join(", ")
          : "none";

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <h1 ref={ref} className={cn("font-display", className)}>
      {children}
    </h1>
  );
}

export default ScrollVelocityBlurHero;
