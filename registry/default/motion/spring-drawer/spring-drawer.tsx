"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export interface SpringDrawerProps {
  children: React.ReactNode;
  /** Drawer width, px. */
  width?: number;
  className?: string;
}

export function SpringDrawer({ children, width = 280, className }: SpringDrawerProps) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const state = useRef({ x: 0, dragging: false, startX: 0, lastX: 0, velocity: 0, raf: null as number | null });
  const [openState, setOpenState] = useState(open);
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const settle = (target: number) => {
    const s = state.current;
    const tick = () => {
      const force = -0.2 * (s.x - target);
      s.velocity = (s.velocity + force) * 0.8;
      s.x += s.velocity;
      const panel = panelRef.current;
      if (panel) panel.style.transform = `translateX(${s.x - width}px)`;

      if (Math.abs(s.x - target) > 0.5 || Math.abs(s.velocity) > 0.5) {
        s.raf = requestAnimationFrame(tick);
      } else {
        s.x = target;
        s.raf = null;
        setOpenState(target === 0);
      }
    };
    if (s.raf === null) s.raf = requestAnimationFrame(tick);
  };

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel || reduced) return;
    const s = state.current;

    const onDown = (event: PointerEvent) => {
      s.dragging = true;
      s.startX = event.clientX;
      s.lastX = event.clientX;
      s.velocity = 0;
      panel.setPointerCapture(event.pointerId);
    };
    const onMove = (event: PointerEvent) => {
      if (!s.dragging) return;
      const dx = event.clientX - s.lastX;
      s.lastX = event.clientX;
      s.x = Math.max(-width, Math.min(0, s.x + (openState ? dx : dx)));
      panel.style.transform = `translateX(${s.x - width}px)`;
    };
    const onUp = () => {
      if (!s.dragging) return;
      s.dragging = false;
      const flick = s.velocity * 16;
      const projected = s.x + flick;
      const shouldOpen = openState ? projected > -width * 0.4 : projected > -width * 0.6;
      settle(shouldOpen ? 0 : -width);
    };

    panel.addEventListener("pointerdown", onDown);
    panel.addEventListener("pointermove", onMove);
    panel.addEventListener("pointerup", onUp);
    return () => {
      panel.removeEventListener("pointerdown", onDown);
      panel.removeEventListener("pointermove", onMove);
      panel.removeEventListener("pointerup", onUp);
    };
  }, [width, openState, reduced]);

  useEffect(() => {
    if (reduced) {
      const panel = panelRef.current;
      if (panel) panel.style.transform = open ? "translateX(0)" : `translateX(-${width}px)`;
      return;
    }
    settle(open ? 0 : -width);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, width, reduced]);

  return (
    <div className={cn("relative overflow-hidden rounded-xl border border-line bg-line/20", className)} style={{ height: 260 }}>
      <p className="absolute inset-x-0 top-4 text-center font-mono text-xs text-ink/50">drag the panel →</p>
      <div
        ref={panelRef}
        className="absolute bottom-0 left-0 top-0 w-72 touch-none cursor-grab overflow-y-auto rounded-r-xl border-r border-line bg-paper p-5 shadow-2xl active:cursor-grabbing"
        style={{ transform: `translateX(-${width}px)` }}
        onClick={() => setOpen(true)}
        role="dialog"
        aria-label="Spring drawer"
        aria-hidden={!openState}
      >
        {children}
      </div>
    </div>
  );
}

export default SpringDrawer;
