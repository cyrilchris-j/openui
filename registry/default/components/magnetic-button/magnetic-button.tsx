"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/cn";

/**
 * Magnetic Button
 *
 * The pointer drags the button toward it, but the movement is *bounded* and the
 * hit area never moves. That distinction matters: an unbounded magnet makes the
 * target feel slippery and breaks pointer-disabled users. Here the transform is
 * clamped to `strength` pixels, and the element that receives the click stays
 * exactly where it was.
 *
 * Behaviour by input type:
 *  - pointer: magnetises while hovering, releases on leave/blur
 *  - keyboard: identical to a plain button; the magnet never engages
 *  - reduced motion: magnetisation is disabled entirely
 *  - touch: engages on press only (`pointer:coarse`), never on hover
 */

export interface MagneticButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  children: React.ReactNode;
  /** Maximum travel in pixels. Above ~24px the control starts to feel broken. */
  strength?: number;
  /** Fraction of the distance to the pointer the button covers, 0–1. */
  follow?: number;
  /** Scale applied while engaged. */
  scale?: number;
}

export function MagneticButton({
  children,
  strength = 16,
  follow = 0.22,
  scale = 1.015,
  className,
  onPointerMove,
  onPointerLeave,
  onPointerEnter,
  onBlur,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const frame = useRef<number | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  // Respect `prefers-reduced-motion` and disable the magnet on coarse pointers.
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarse = window.matchMedia("(pointer: coarse)");
    const update = () => setEnabled(!reduced.matches && !coarse.matches);
    update();
    reduced.addEventListener("change", update);
    coarse.addEventListener("change", update);
    return () => {
      reduced.removeEventListener("change", update);
      coarse.removeEventListener("change", update);
    };
  }, []);

  useEffect(
    () => () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    },
    [],
  );

  const trackPointer = useCallback(
    (clientX: number, clientY: number) => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        const dx = (clientX - (rect.left + rect.width / 2)) * follow;
        const dy = (clientY - (rect.top + rect.height / 2)) * follow;
        const length = Math.hypot(dx, dy);
        // Clamp: beyond `strength` px the hit area would start to feel detached.
        const clamp = length > strength ? strength / length : 1;
        setOffset({ x: dx * clamp, y: dy * clamp });
      });
    },
    [follow, strength],
  );

  return (
    <button
      ref={ref}
      data-magnetic={enabled ? "on" : "off"}
      className={cn(
        "relative inline-flex items-center justify-center gap-2 px-5 py-3",
        "rounded-none border border-ink bg-transparent text-ink",
        "font-sans text-sm uppercase tracking-[0.14em]",
        "transition-colors duration-200 ease-out",
        "hover:bg-ink hover:text-paper",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oxide",
        "will-change-transform motion-reduce:transition-none",
        className,
      )}
      style={{
        transform: enabled
          ? `translate3d(${offset.x.toFixed(2)}px, ${offset.y.toFixed(2)}px, 0) scale(${offset.x || offset.y ? scale : 1})`
          : undefined,
        transition: enabled ? "transform 220ms cubic-bezier(0.2, 0, 0, 1)" : undefined,
      }}
      onPointerEnter={(event) => {
        if (enabled && event.pointerType === "mouse") trackPointer(event.clientX, event.clientY);
        onPointerEnter?.(event);
      }}
      onPointerMove={(event) => {
        if (enabled && event.pointerType === "mouse") trackPointer(event.clientX, event.clientY);
        onPointerMove?.(event);
      }}
      onPointerLeave={(event) => {
        setOffset({ x: 0, y: 0 });
        onPointerLeave?.(event);
      }}
      onBlur={(event) => {
        setOffset({ x: 0, y: 0 });
        onBlur?.(event);
      }}
      {...props}
    >
      {children}
    </button>
  );
}

export default MagneticButton;
