"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export interface ScrollMaskWipeProps {
  children: string;
  /** Scroll distance over which the wipe completes, in px. */
  travel?: number;
  className?: string;
}

export function ScrollMaskWipe({ children, travel = 480, className }: ScrollMaskWipeProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setProgress(1);
      return;
    }

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      // Map the element's travel through the viewport onto 0..1.
      const start = viewportHeight * 0.9;
      const end = viewportHeight * 0.25;
      const raw = (start - rect.top) / (start - end);
      setProgress(Math.max(0, Math.min(1, raw)));
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [travel]);

  return (
    <span
      ref={ref}
      className={cn("inline-block", className)}
      role="text"
      aria-label={children}
      style={{
        clipPath: `inset(0 ${(1 - progress) * 100}% 0 0)`,
        transition: "clip-path 60ms linear",
      }}
      aria-hidden
    >
      {children}
      <span className="sr-only">{children}</span>
    </span>
  );
}

export default ScrollMaskWipe;
