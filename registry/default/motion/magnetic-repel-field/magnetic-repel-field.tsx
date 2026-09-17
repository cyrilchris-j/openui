"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

export interface MagneticRepelFieldProps {
  /** Number of tiles (rows × cols auto-derived). */
  count?: number;
  /** Repel radius, px. */
  radius?: number;
  className?: string;
}

export function MagneticRepelField({ count = 36, radius = 110, className }: MagneticRepelFieldProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const tileRefs = useRef<Array<HTMLDivElement | null>>([]);
  const springs = useRef<Array<{ x: number; y: number; vx: number; vy: number; hx: number; hy: number }>>([]);
  const raf = useRef<number | null>(null);
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    springs.current = Array.from({ length: count }, () => ({ x: 0, y: 0, vx: 0, vy: 0, hx: 0, hy: 0 }));
  }, [count]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || reduced) return;
    const fine = window.matchMedia?.("(pointer: fine)");
    if (!fine?.matches) return;

    let pointer: { x: number; y: number } | null = null;

    const tick = () => {
      const p = pointer;
      springs.current.forEach((spring, index) => {
        if (p) {
          const node = tileRefs.current[index];
          if (!node) return;
          const rect = node.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const dx = cx - p.x;
          const dy = cy - p.y;
          const distance = Math.hypot(dx, dy);
          if (distance < radius && distance > 0.01) {
            const strength = (1 - distance / radius) * 26;
            spring.hx = (dx / distance) * strength;
            spring.hy = (dy / distance) * strength;
          } else {
            spring.hx = 0;
            spring.hy = 0;
          }
        } else {
          spring.hx = 0;
          spring.hy = 0;
        }

        // Damped spring toward home offset.
        spring.vx += (-0.16 * (spring.x - spring.hx)) * 1;
        spring.vy += (-0.16 * (spring.y - spring.hy)) * 1;
        spring.vx *= 0.86;
        spring.vy *= 0.86;
        spring.x += spring.vx;
        spring.y += spring.vy;

        const node = tileRefs.current[index];
        if (node) {
          node.style.transform = `translate(${spring.x.toFixed(2)}px, ${spring.y.toFixed(2)}px)`;
        }
      });
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    const onMove = (event: PointerEvent) => {
      pointer = { x: event.clientX, y: event.clientY };
    };
    const onLeave = () => {
      pointer = null;
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      if (raf.current !== null) cancelAnimationFrame(raf.current);
    };
  }, [count, radius, reduced]);

  return (
    <div
      ref={hostRef}
      className={cn("grid w-fit grid-cols-6 gap-1.5", className)}
      aria-hidden
    >
      {Array.from({ length: count }, (_, index) => (
        <div
          key={index}
          ref={(node) => {
            tileRefs.current[index] = node;
          }}
          className="h-9 w-9 rounded-lg bg-line/50 will-change-transform"
        />
      ))}
    </div>
  );
}

export default MagneticRepelField;
