"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/cn";

/**
 * Cursor Trail
 *
 * A trail is the easiest way to make a page feel broken, so this one is
 * deliberately constrained:
 *
 * - **Fixed pool.** N nodes are created once and recycled. No allocation while
 *   the pointer moves, no unbounded growth.
 * - **One frame loop.** The rAF loop only runs while the pointer has moved
 *   recently and stops when idle or when the tab is hidden.
 * - **Never on touch.** Coarse pointers and reduced-motion users get nothing.
 * - **Inert to input.** `pointer-events: none` on the layer, and the trail is
 *   `aria-hidden`: it must never intercept a click or be announced.
 */

export interface CursorTrailProps {
  /** Number of recycled dots. 12–30 is the usable range. */
  count?: number;
  /** Easing factor, 0–1. Higher follows the pointer more tightly. */
  ease?: number;
  size?: number;
  className?: string;
}

export function CursorTrail({ count = 18, ease = 0.32, size = 6, className }: CursorTrailProps) {
  const layer = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const fine = window.matchMedia("(pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(fine.matches && !reduced.matches);
    update();
    fine.addEventListener("change", update);
    reduced.addEventListener("change", update);
    return () => {
      fine.removeEventListener("change", update);
      reduced.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    const element = layer.current;
    if (!enabled || !element) return;

    const nodes = Array.from(element.children) as HTMLElement[];
    const points = nodes.map(() => ({ x: window.innerWidth / 2, y: window.innerHeight / 2 }));
    const target = { x: points[0]!.x, y: points[0]!.y };
    let frame: number | null = null;
    let idleFrames = 0;

    function onPointerMove(event: PointerEvent) {
      if (event.pointerType !== "mouse") return;
      target.x = event.clientX;
      target.y = event.clientY;
      idleFrames = 0;
      if (frame === null) frame = requestAnimationFrame(tick);
    }

    function tick() {
      frame = null;
      let previous = { x: target.x, y: target.y };

      for (let index = 0; index < points.length; index += 1) {
        const point = points[index]!;
        point.x += (previous.x - point.x) * ease;
        point.y += (previous.y - point.y) * ease;
        const node = nodes[index]!;
        const scale = 1 - index / (points.length + 2);
        node.style.transform = `translate3d(${point.x.toFixed(1)}px, ${point.y.toFixed(1)}px, 0) translate(-50%, -50%) scale(${scale.toFixed(2)})`;
        node.style.opacity = String(0.14 + (1 - index / points.length) * 0.5);
        previous = { x: point.x, y: point.y };
      }

      const stillMoving = Math.hypot(previous.x - target.x, previous.y - target.y) > 0.4;
      idleFrames = stillMoving ? 0 : idleFrames + 1;
      if (idleFrames < 40 && !document.hidden) frame = requestAnimationFrame(tick);
    }

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, [ease, enabled]);

  return (
    <div
      ref={layer}
      aria-hidden="true"
      data-enabled={enabled ? "true" : "false"}
      className={cn("pointer-events-none fixed inset-0 z-[60] overflow-hidden", !enabled && "hidden", className)}
    >
      {Array.from({ length: count }).map((_, index) => (
        <span
          key={index}
          className="absolute top-0 left-0 rounded-full bg-oxide"
          style={{ width: size, height: size, willChange: "transform, opacity" }}
        />
      ))}
    </div>
  );
}

export default CursorTrail;
