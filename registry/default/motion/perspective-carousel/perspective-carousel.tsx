"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface PerspectiveCarouselProps {
  className?: string;
}

export function PerspectiveCarousel({ className }: PerspectiveCarouselProps) {
  const [angle, setAngle] = useState(0);
  const items = ["Alpha", "Beta", "Gamma", "Delta"];

  return (
    <div className={cn("relative h-80 w-full max-w-md overflow-hidden rounded-xl border border-line bg-paper p-6", className)}>
      <div className="flex h-full flex-col items-center justify-between">
        <span className="font-mono text-xs text-ink/50">3D CYLINDRICAL STAGE</span>

        <div className="relative h-40 w-40" style={{ perspective: 600 }}>
          {items.map((item, idx) => {
            const itemAngle = (idx * 360) / items.length + angle;
            const rad = (itemAngle * Math.PI) / 180;
            const z = Math.cos(rad) * 90;
            const x = Math.sin(rad) * 90;
            const opacity = (z + 90) / 180;

            return (
              <div
                key={item}
                className="absolute left-1/2 top-1/2 -ml-14 -mt-10 flex h-20 w-28 items-center justify-center rounded-xl border border-line bg-paper shadow-lg font-display text-sm font-bold text-ink transition-all duration-300"
                style={{
                  transform: `translate3d(${x}px, 0, ${z}px)`,
                  opacity: Math.max(0.2, opacity),
                  zIndex: Math.round(z),
                }}
              >
                {item}
              </div>
            );
          })}
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setAngle((a) => a - 90)}
            className="rounded border border-line px-3 py-1 font-mono text-xs text-ink hover:bg-line/20"
          >
            ← Prev
          </button>
          <button
            type="button"
            onClick={() => setAngle((a) => a + 90)}
            className="rounded border border-line px-3 py-1 font-mono text-xs text-ink hover:bg-line/20"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}

export default PerspectiveCarousel;
