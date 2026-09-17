"use client";

import { useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

export interface GlyphFlockTextProps {
  children: string;
  /** Distance at which glyphs start fleeing, px. */
  influence?: number;
  /** Max displacement, px. */
  scatter?: number;
  className?: string;
}

interface Slot {
  x: number;
  y: number;
}

export function GlyphFlockText({
  children,
  influence = 90,
  scatter = 26,
  className,
}: GlyphFlockTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const slots = useRef<Slot[]>([]);
  const glyphRefs = useRef<Array<HTMLSpanElement | null>>([]);

  const register = useCallback((index: number, node: HTMLSpanElement | null) => {
    glyphRefs.current[index] = node;
  }, []);

  useEffect(() => {
    const fine = window.matchMedia?.("(pointer: fine)");
    if (!fine?.matches) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const host = ref.current;
    if (!host) return;

    const measure = () => {
      slots.current = glyphRefs.current.map((node) => {
        if (!node) return { x: 0, y: 0 };
        const rect = node.getBoundingClientRect();
        return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
      });
    };
    measure();

    let frame: number | null = null;
    let pointer: Slot | null = null;

    const steer = () => {
      frame = null;
      const p = pointer;
      if (!p) return;
      glyphRefs.current.forEach((node, index) => {
        const slot = slots.current[index];
        if (!node || !slot) return;
        const dx = slot.x - p.x;
        const dy = slot.y - p.y;
        const distance = Math.hypot(dx, dy);
        if (distance < influence && distance > 0.01) {
          const strength = (1 - distance / influence) * scatter;
          node.style.transform = `translate(${(dx / distance) * strength}px, ${(dy / distance) * strength}px) rotate(${(dx / distance) * 8}deg)`;
        } else {
          node.style.transform = "";
        }
      });
    };

    const onMove = (event: PointerEvent) => {
      pointer = { x: event.clientX, y: event.clientY };
      if (frame === null) frame = requestAnimationFrame(steer);
    };
    const onLeave = () => {
      pointer = null;
      glyphRefs.current.forEach((node) => {
        if (node) node.style.transform = "";
      });
    };

    const observer = new ResizeObserver(measure);
    observer.observe(host);
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);

    return () => {
      observer.disconnect();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, [influence, scatter]);

  return (
    <span
      ref={ref}
      className={cn("inline-block select-none", className)}
      role="text"
      aria-label={children}
    >
      {[...children].map((char, index) => (
        <span
          key={`${index}-${char}`}
          aria-hidden
          ref={(node) => register(index, node)}
          className="inline-block will-change-transform"
          style={{ transition: "transform 220ms cubic-bezier(0.2, 0, 0, 1)" }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

export default GlyphFlockText;
