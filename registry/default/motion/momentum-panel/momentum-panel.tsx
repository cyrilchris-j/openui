"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

export interface MomentumPanelProps {
  children?: React.ReactNode;
  /** Friction per frame (lower = slides further). */
  friction?: number;
  /** Bounce energy retained on wall hits. */
  restitution?: number;
  className?: string;
}

export function MomentumPanel({
  children,
  friction = 0.94,
  restitution = 0.7,
  className,
}: MomentumPanelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const state = useRef({ x: 0, y: 0, vx: 0, vy: 0, dragging: false, lastX: 0, lastY: 0, raf: null as number | null });

  useEffect(() => {
    const container = containerRef.current;
    const panel = panelRef.current;
    if (!container || !panel) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const s = state.current;

    const tick = () => {
      const rect = container.getBoundingClientRect();
      const panelRect = panel.getBoundingClientRect();
      const maxX = (rect.width - panelRect.width) / 2;
      const maxY = (rect.height - panelRect.height) / 2;

      if (!s.dragging) {
        s.x += s.vx;
        s.y += s.vy;
        s.vx *= friction;
        s.vy *= friction;

        if (s.x > maxX) {
          s.x = maxX;
          s.vx = -s.vx * restitution;
        } else if (s.x < -maxX) {
          s.x = -maxX;
          s.vx = -s.vx * restitution;
        }
        if (s.y > maxY) {
          s.y = maxY;
          s.vy = -s.vy * restitution;
        } else if (s.y < -maxY) {
          s.y = -maxY;
          s.vy = -s.vy * restitution;
        }

        if (Math.abs(s.vx) > 0.1 || Math.abs(s.vy) > 0.1) {
          s.raf = requestAnimationFrame(tick);
        } else {
          s.raf = null;
        }
      }

      panel.style.transform = `translate(${s.x}px, ${s.y}px)`;
    };

    const kick = () => {
      if (s.raf === null && !s.dragging) s.raf = requestAnimationFrame(tick);
    };

    const onPointerDown = (event: PointerEvent) => {
      s.dragging = true;
      s.lastX = event.clientX;
      s.lastY = event.clientY;
      s.vx = 0;
      s.vy = 0;
      panel.setPointerCapture(event.pointerId);
    };
    const onPointerMove = (event: PointerEvent) => {
      if (!s.dragging) return;
      const dx = event.clientX - s.lastX;
      const dy = event.clientY - s.lastY;
      s.x += dx;
      s.y += dy;
      s.vx = dx;
      s.vy = dy;
      s.lastX = event.clientX;
      s.lastY = event.clientY;
      panel.style.transform = `translate(${s.x}px, ${s.y}px)`;
    };
    const onPointerUp = () => {
      s.dragging = false;
      kick();
    };

    panel.addEventListener("pointerdown", onPointerDown);
    panel.addEventListener("pointermove", onPointerMove);
    panel.addEventListener("pointerup", onPointerUp);
    return () => {
      panel.removeEventListener("pointerdown", onPointerDown);
      panel.removeEventListener("pointermove", onPointerMove);
      panel.removeEventListener("pointerup", onPointerUp);
      if (s.raf !== null) cancelAnimationFrame(s.raf);
    };
  }, [friction, restitution]);

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden rounded-xl border border-line bg-line/20", className)}
      style={{ height: 320 }}
    >
      <div
        ref={panelRef}
        className="absolute left-1/2 top-1/2 -ml-20 -mt-14 w-40 cursor-grab touch-none rounded-xl bg-ink p-4 text-paper shadow-2xl active:cursor-grabbing"
      >
        <p className="font-display text-sm">Throw me</p>
        <p className="mt-1 text-xs opacity-70">I keep your momentum</p>
      </div>
      <p className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 font-mono text-xs text-ink/50">
        drag & release
      </p>
    </div>
  );
}

export default MomentumPanel;
