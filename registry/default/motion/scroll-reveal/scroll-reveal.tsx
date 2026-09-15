"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/cn";

/**
 * Scroll Reveal
 *
 * Reveals once, then stops observing. Reveal animations that re-trigger on
 * every scroll direction change are the reason people disable animations.
 *
 * - One `IntersectionObserver` per instance, disconnected after the first hit.
 * - Children stagger through a CSS variable, so no JavaScript animates.
 * - Content is visible by default and animation is additive: if the observer
 *   never fires (no JS, ancient browser), nothing stays hidden.
 */

export interface ScrollRevealProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Stagger between direct children in ms. */
  stagger?: number;
  duration?: number;
  /** Translate distance in px. */
  distance?: number;
  /** Fraction of the element that must be visible. */
  threshold?: number;
  /** Reveal as `individual` children or as one `block`. */
  mode?: "block" | "children";
}

export function ScrollReveal({
  stagger = 80,
  duration = 560,
  distance = 18,
  threshold = 0.2,
  mode = "block",
  className,
  children,
  ...props
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof window === "undefined") return;

    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !("IntersectionObserver" in window)) {
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      data-revealed={revealed ? "true" : "false"}
      className={cn(mode === "children" && "openui-reveal-children", className)}
      style={
        {
          "--reveal-duration": `${duration}ms`,
          "--reveal-stagger": `${stagger}ms`,
          "--reveal-distance": `${distance}px`,
        } as React.CSSProperties
      }
      {...props}
    >
      <style>{`[data-reveal-target]{opacity:0;transform:translate3d(0,var(--reveal-distance,18px),0);transition:opacity var(--reveal-duration,560ms) cubic-bezier(0.2,0,0,1),transform var(--reveal-duration,560ms) cubic-bezier(0.2,0,0,1)}[data-revealed="true"][data-reveal-target],[data-revealed="true"]>[data-reveal-target],[data-revealed="true"] [data-reveal-item]{opacity:1;transform:none}.openui-reveal-children>[data-reveal-item]{opacity:0;transform:translate3d(0,var(--reveal-distance,18px),0);transition:opacity var(--reveal-duration,560ms) cubic-bezier(0.2,0,0,1),transform var(--reveal-duration,560ms) cubic-bezier(0.2,0,0,1);transition-delay:calc(var(--reveal-index,0) * var(--reveal-stagger,80ms))}@media (prefers-reduced-motion: reduce){[data-reveal-target],.openui-reveal-children>[data-reveal-item]{opacity:1;transform:none;transition:none}}`}</style>
      {children}
    </div>
  );
}

/** Marks a child for staggered reveal. */
export function ScrollRevealItem({
  index = 0,
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { index?: number }) {
  return (
    <div
      data-reveal-item=""
      style={{ "--reveal-index": index } as React.CSSProperties}
      className={className}
      {...props}
    >
      {children}
    </div>
  );
}

export default ScrollReveal;
