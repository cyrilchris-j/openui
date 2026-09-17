"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface KineticPanCanvasProps {
  className?: string;
}

export function KineticPanCanvas({ className }: KineticPanCanvasProps) {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  return (
    <div className={cn("relative h-72 w-full max-w-md overflow-hidden rounded-xl border border-line bg-paper p-4 select-none", className)}>
      <div className="flex justify-between items-center pb-2 border-b border-line mb-2">
        <span className="font-mono text-xs text-ink/60">PAN STAGE</span>
        <span className="font-mono text-xs font-bold text-ink">X:{pos.x} Y:{pos.y}</span>
      </div>

      <div className="relative h-52 w-full overflow-hidden rounded-lg bg-line/10 cursor-grab active:cursor-grabbing flex items-center justify-center">
        <div
          className="transition-transform duration-75"
          style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
        >
          <div className="h-28 w-44 rounded-xl border border-line bg-paper p-4 shadow flex flex-col justify-between">
            <span className="font-mono text-xs font-bold text-ink">Target Node</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setPos((p) => ({ ...p, x: p.x - 20 }))}
                className="rounded border px-2 py-0.5 text-xs font-mono"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => setPos((p) => ({ ...p, x: p.x + 20 }))}
                className="rounded border px-2 py-0.5 text-xs font-mono"
              >
                →
              </button>
              <button
                type="button"
                onClick={() => setPos({ x: 0, y: 0 })}
                className="rounded border px-2 py-0.5 text-xs font-mono"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default KineticPanCanvas;
