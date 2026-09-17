"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface KineticFlickCarouselProps {
  className?: string;
}

export function KineticFlickCarousel({ className }: KineticFlickCarouselProps) {
  const [offset, setOffset] = useState(0);

  const flick = (dir: number) => {
    setOffset((o) => Math.max(-120, Math.min(120, o + dir * 60)));
  };

  return (
    <div className={cn("inline-flex flex-col items-center gap-4 rounded-xl border border-line bg-paper p-6 shadow-sm", className)}>
      <span className="font-mono text-xs text-ink/60 uppercase">MOMENTUM FLICK STAGE</span>

      <div className="relative h-32 w-64 overflow-hidden rounded-lg bg-line/10 flex items-center justify-center">
        <div
          className="transition-transform duration-300 ease-out"
          style={{ transform: `translateX(${offset}px)` }}
        >
          <div className="flex gap-3">
            {["Alpha", "Bravo", "Charlie"].map((c) => (
              <div key={c} className="h-24 w-32 rounded-lg border border-line bg-paper p-3 shadow-sm flex items-center justify-center font-bold text-xs font-mono">
                {c}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => flick(1)}
          className="rounded border border-line px-3 py-1 font-mono text-xs hover:bg-line/20"
        >
          ← Flick Left
        </button>
        <button
          type="button"
          onClick={() => flick(-1)}
          className="rounded border border-line px-3 py-1 font-mono text-xs hover:bg-line/20"
        >
          Flick Right →
        </button>
      </div>
    </div>
  );
}

export default KineticFlickCarousel;
