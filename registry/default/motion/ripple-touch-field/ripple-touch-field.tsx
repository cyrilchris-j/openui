"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface RippleTouchFieldProps {
  className?: string;
}

export function RippleTouchField({ className }: RippleTouchFieldProps) {
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const newRipple = {
      id: Date.now(),
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    setRipples((prev) => [...prev.slice(-8), newRipple]);
  };

  return (
    <div
      onClick={handleClick}
      className={cn(
        "relative h-72 w-full max-w-md cursor-pointer overflow-hidden rounded-xl border border-line bg-paper p-6 select-none",
        className
      )}
    >
      <div className="pointer-events-none flex h-full flex-col items-center justify-center text-center">
        <span className="font-mono text-xs text-ink/50">CLICK ANYWHERE</span>
        <h4 className="font-display text-lg font-bold text-ink">Kinetic Shockwave Field</h4>
      </div>

      {ripples.map((r) => (
        <span
          key={r.id}
          className="pointer-events-none absolute -ml-16 -mt-16 h-32 w-32 rounded-full border border-ink/40 animate-ping"
          style={{ left: r.x, top: r.y }}
        />
      ))}
    </div>
  );
}

export default RippleTouchField;
