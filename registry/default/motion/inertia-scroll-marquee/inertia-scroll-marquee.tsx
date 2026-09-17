"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export interface InertiaScrollMarqueeProps {
  items?: string[];
  baseVelocity?: number;
  className?: string;
}

export function InertiaScrollMarquee({
  items = ["REVERBERATION", "KINETICS", "SUPERPOSITION", "EQUILIBRIUM", "DAMPING", "WAVELENGTH"],
  baseVelocity = 1.2,
  className,
}: InertiaScrollMarqueeProps) {
  const [offset, setOffset] = useState(0);
  const state = useRef({ offset: 0, velocity: baseVelocity, isDown: false, lastX: 0 });

  useEffect(() => {
    let raf: number;
    const loop = () => {
      if (!state.current.isDown) {
        // Decelerate toward base velocity
        state.current.velocity += (baseVelocity - state.current.velocity) * 0.04;
      }
      state.current.offset = (state.current.offset - state.current.velocity) % 1200;
      setOffset(state.current.offset);
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [baseVelocity]);

  return (
    <div
      onPointerDown={(e) => {
        state.current.isDown = true;
        state.current.lastX = e.clientX;
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      }}
      onPointerMove={(e) => {
        if (!state.current.isDown) return;
        const dx = e.clientX - state.current.lastX;
        state.current.lastX = e.clientX;
        state.current.velocity = -dx * 0.6;
      }}
      onPointerUp={(e) => {
        state.current.isDown = false;
        try {
          (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
        } catch {}
      }}
      className={cn("overflow-hidden border-y border-line bg-ink py-4 text-paper cursor-grab active:cursor-grabbing select-none", className)}
    >
      <div
        style={{ transform: `translateX(${offset}px)` }}
        className="flex gap-12 whitespace-nowrap font-mono text-sm uppercase tracking-widest"
      >
        {[...items, ...items, ...items, ...items].map((word, i) => (
          <span key={i} className="flex items-center gap-6">
            <span>{word}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
        ))}
      </div>
    </div>
  );
}
