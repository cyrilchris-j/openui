"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

export interface VelocityFadeListProps {
  rows: string[];
  className?: string;
}

export function VelocityFadeList({ rows, className }: VelocityFadeListProps) {
  const containerRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const node = containerRef.current;
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
      velocity += ((dy / dt) * 16 - velocity) * 0.25;

      const intensity = Math.min(Math.abs(velocity) / 40, 1);
      node.style.opacity = String(1 - intensity * 0.7);
      node.style.filter = `blur(${(intensity * 4).toFixed(1)}px)`;

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <ul ref={containerRef} className={cn("flex flex-col divide-y divide-line", className)}>
      {rows.map((row, index) => (
        <li key={index} className="py-4 text-lg text-ink">
          {row}
        </li>
      ))}
    </ul>
  );
}

export default VelocityFadeList;
