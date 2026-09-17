"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

export interface PhysicsPendulumDialProps {
  length?: number;
  className?: string;
}

export function PhysicsPendulumDial({ length = 140, className }: PhysicsPendulumDialProps) {
  const [angle, setAngle] = useState(0.45);
  const isDragging = useRef(false);
  const state = useRef({ theta: 0.45, omega: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf: number;
    const g = 9.8;
    const l = length / 100;
    const damping = 0.985;

    const tick = () => {
      if (!isDragging.current) {
        // d²θ/dt² = -(g/l) * sin(θ)
        const alpha = -(g / l) * Math.sin(state.current.theta) * 0.015;
        state.current.omega = (state.current.omega + alpha) * damping;
        state.current.theta += state.current.omega;
        setAngle(state.current.theta);
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [length]);

  return (
    <div
      ref={containerRef}
      className={cn("relative flex flex-col items-center justify-start h-64 w-64 select-none p-4", className)}
      onPointerDown={(e) => {
        isDragging.current = true;
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
      }}
      onPointerMove={(e) => {
        if (!isDragging.current || !containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const pivotX = rect.left + rect.width / 2;
        const pivotY = rect.top + 30;
        const dx = e.clientX - pivotX;
        const dy = e.clientY - pivotY;
        const rad = Math.atan2(dx, dy);
        state.current.theta = Math.max(-1.4, Math.min(1.4, rad));
        state.current.omega = 0;
        setAngle(state.current.theta);
      }}
      onPointerUp={(e) => {
        isDragging.current = false;
        try {
          (e.target as HTMLElement).releasePointerCapture(e.pointerId);
        } catch {}
      }}
    >
      {/* Pivot mount */}
      <div className="h-4 w-4 rounded-full border-2 border-ink bg-paper z-10" />

      {/* Pendulum rod and bob */}
      <div
        style={{
          height: `${length}px`,
          transform: `rotate(${-angle}rad)`,
          transformOrigin: "top center",
        }}
        className="absolute top-[38px] w-0.5 bg-ink cursor-grab active:cursor-grabbing flex flex-col items-center justify-end"
      >
        <div className="h-9 w-9 rounded-full border border-ink bg-paper shadow-md flex items-center justify-center font-mono text-[9px] text-ink font-bold">
          {(angle * (180 / Math.PI)).toFixed(0)}°
        </div>
      </div>

      <span className="mt-48 font-mono text-[10px] text-graphite tracking-widest uppercase">
        Drag Bob & Release
      </span>
    </div>
  );
}
