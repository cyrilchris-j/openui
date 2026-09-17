"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/cn";

export interface StaggerCascadeProps {
  children: React.ReactNode[];
  /** Base duration per child, ms; delays chain from actual completion. */
  childDurationMs?: number;
  className?: string;
}

export function StaggerCascade({ children, childDurationMs = 420, className }: StaggerCascadeProps) {
  const { ref, inView } = useInView<HTMLUListElement>({ once: true });
  const [visibleCount, setVisibleCount] = useState(0);
  const timeouts = useRef<number[]>([]);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setVisibleCount(children.length);
      return;
    }
    // Chain: child i starts when child i-1 has half-finished — the cascade
    // overlaps like dominoes rather than marching metronomically.
    let elapsed = 0;
    children.forEach((_, index) => {
      elapsed += index === 0 ? 0 : childDurationMs * 0.45;
      timeouts.current.push(
        window.setTimeout(() => setVisibleCount(index + 1), elapsed),
      );
    });
    return () => {
      timeouts.current.forEach((timer) => window.clearTimeout(timer));
      timeouts.current = [];
    };
  }, [inView, children.length, childDurationMs]);

  return (
    <ul ref={ref} className={cn("flex flex-col gap-3", className)}>
      {children.map((child, index) => (
        <li
          key={index}
          className="will-change-transform"
          style={{
            opacity: index < visibleCount ? 1 : 0,
            transform: index < visibleCount ? "translateX(0)" : "translateX(-16px)",
            transition: "opacity 300ms ease, transform 420ms cubic-bezier(0.2, 0, 0, 1)",
          }}
        >
          {child}
        </li>
      ))}
    </ul>
  );
}

export default StaggerCascade;
