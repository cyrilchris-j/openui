"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/cn";

/**
 * Spotlight Follow
 *
 * Writes `--spot-x` and `--spot-y` once per animation frame; the radial gradient
 * itself lives in CSS. That keeps the effect off the main-thread layout path —
 * only a composited layer changes.
 *
 * Because a pointer-only affordance is invisible to keyboard users, the
 * spotlight recentres on the focused element when the pointer has not moved,
 * so the effect still communicates which card is active while tabbing.
 */

export interface SpotlightFollowProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Radius of the highlight, in px. */
  radius?: number;
  /** Highlight colour. Use a low-alpha value so text stays legible. */
  color?: string;
  children: React.ReactNode;
}

export function SpotlightFollow({
  radius = 260,
  color = "rgba(200,69,43,0.16)",
  className,
  children,
  ...props
}: SpotlightFollowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef<number | null>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const set = useCallback((x: number, y: number) => {
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const element = ref.current;
      if (!element) return;
      element.style.setProperty("--spot-x", `${x}px`);
      element.style.setProperty("--spot-y", `${y}px`);
    });
  }, []);

  return (
    <div
      ref={ref}
      onPointerMove={(event) => {
        if (reduced || event.pointerType !== "mouse") return;
        const rect = event.currentTarget.getBoundingClientRect();
        set(event.clientX - rect.left, event.clientY - rect.top);
      }}
      onFocus={(event) => {
        if (reduced) return;
        const target = event.target as HTMLElement;
        const rect = target.getBoundingClientRect();
        const parent = event.currentTarget.getBoundingClientRect();
        set(rect.left - parent.left + rect.width / 2, rect.top - parent.top + rect.height / 2);
      }}
      data-spotlight="on"
      className={cn("relative isolate", className)}
      style={
        {
          "--spot-radius": `${radius}px`,
          "--spot-color": color,
        } as React.CSSProperties
      }
      {...props}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 [background:radial-gradient(var(--spot-radius)_circle_at_var(--spot-x,50%)_var(--spot-y,50%),var(--spot-color),transparent_70%)] motion-reduce:transition-none data-[on]:opacity-100"
        data-on=""
      />
      {children}
    </div>
  );
}

export default SpotlightFollow;
