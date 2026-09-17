"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

export interface KineticMarqueeProps {
  text: string;
  /** Base speed in px/s when the page is idle. */
  baseSpeed?: number;
  /** Multiplier applied at peak scroll velocity. */
  velocityGain?: number;
  className?: string;
}

export function KineticMarquee({
  text,
  baseSpeed = 60,
  velocityGain = 6,
  className,
}: KineticMarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const state = useRef({ offset: 0, velocity: 0, lastScrollY: 0, lastTime: 0, raf: 0, halfWidth: 0 });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const s = state.current;

    const measure = () => {
      s.halfWidth = track.scrollWidth / 2;
    };
    measure();

    const onScroll = () => {
      const now = performance.now();
      if (s.lastTime > 0) {
        const dy = window.scrollY - s.lastScrollY;
        const dt = Math.max(1, now - s.lastTime);
        s.velocity = s.velocity * 0.8 + (dy / dt) * 200 * 0.2;
      }
      s.lastScrollY = window.scrollY;
      s.lastTime = now;
    };

    const step = (now: number) => {
      const dt = Math.min(64, now - (s.lastTime || now));
      s.lastTime = now;
      // Scroll velocity adds to base speed and decays exponentially.
      const speed = baseSpeed + Math.abs(s.velocity) * velocityGain;
      s.velocity *= 0.92;
      s.offset = (s.offset + (speed * dt) / 1000) % Math.max(1, s.halfWidth);
      const skew = Math.max(-14, Math.min(14, s.velocity * velocityGain * 0.25));
      track.style.transform = `translateX(-${s.offset}px) skewX(${skew}deg)`;
      s.raf = requestAnimationFrame(step);
    };

    if (reduced) {
      // Static band: content is still fully readable.
      track.style.transform = "none";
      return;
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    s.raf = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(s.raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
    };
  }, [baseSpeed, velocityGain]);

  return (
    <div className={cn("overflow-hidden border-y border-line py-3", className)} aria-label={text}>
      <div ref={trackRef} className="flex w-max whitespace-nowrap will-change-transform">
        {[0, 1, 2, 3].map((copy) => (
          <span
            key={copy}
            aria-hidden={copy > 0}
            className="px-6 font-mono text-[0.85rem] uppercase tracking-[0.3em] text-ink"
          >
            {text} ·
          </span>
        ))}
      </div>
    </div>
  );
}

export default KineticMarquee;
