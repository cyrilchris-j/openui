"use client";

import { useEffect, useRef } from "react";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/cn";

export interface SpringDropInProps {
  children: React.ReactNode;
  /** Spring stiffness (higher = snappier). */
  stiffness?: number;
  /** Damping ratio below 1 overshoots. */
  damping?: number;
  /** Initial vertical offset in px. */
  from?: number;
  className?: string;
}

export function SpringDropIn({
  children,
  stiffness = 170,
  damping = 0.72,
  from = -120,
  className,
}: SpringDropInProps) {
  const { ref, inView } = useInView<HTMLDivElement>({ once: true });
  const targetRef = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;

    const node = targetRef.current;
    if (!node) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      node.style.transform = "translateY(0)";
      node.style.opacity = "1";
      return;
    }

    // Semi-implicit Euler spring integration.
    let position = from;
    let velocity = 0;
    let last = performance.now();
    let raf: number | null = null;

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 1 / 30);
      last = now;
      const force = -stiffness * (position - 0);
      const drag = -2 * damping * Math.sqrt(stiffness) * velocity;
      velocity += (force + drag) * dt;
      position += velocity * dt;

      node.style.transform = `translateY(${position.toFixed(2)}px)`;
      node.style.opacity = String(Math.min(1, 1 - position / from));

      if (Math.abs(position) > 0.4 || Math.abs(velocity) > 4) {
        raf = requestAnimationFrame(tick);
      } else {
        node.style.transform = "";
        node.style.opacity = "1";
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, [inView, from, stiffness, damping]);

  return (
    <div ref={ref}>
      <div ref={targetRef} className={cn("will-change-transform", className)} style={{ opacity: 0 }}>
        {children}
      </div>
    </div>
  );
}

export default SpringDropIn;
