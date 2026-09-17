"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface KeyboardSpatialGridProps {
  className?: string;
}

export function KeyboardSpatialGrid({ className }: KeyboardSpatialGridProps) {
  const [selected, setSelected] = useState({ r: 0, c: 0 });

  const move = (dr: number, dc: number) => {
    setSelected((prev) => ({
      r: Math.max(0, Math.min(2, prev.r + dr)),
      c: Math.max(0, Math.min(2, prev.c + dc)),
    }));
  };

  return (
    <div className={cn("inline-flex flex-col items-center gap-4 rounded-xl border border-line bg-paper p-6 shadow-sm", className)}>
      <span className="font-mono text-xs text-ink/60">SPATIAL GRID (ROW {selected.r}, COL {selected.c})</span>

      <div className="grid grid-cols-3 gap-2">
        {Array.from({ length: 3 }).map((_, r) =>
          Array.from({ length: 3 }).map((_, c) => {
            const isSel = selected.r === r && selected.c === c;
            return (
              <div
                key={`${r}-${c}`}
                onClick={() => setSelected({ r, c })}
                className={cn(
                  "flex h-12 w-12 cursor-pointer items-center justify-center rounded border font-mono text-xs font-bold transition-all",
                  isSel ? "border-ink bg-ink text-paper shadow" : "border-line bg-line/10 text-ink"
                )}
              >
                {r},{c}
              </div>
            );
          })
        )}
      </div>

      <div className="flex gap-1.5">
        <button
          type="button"
          onClick={() => move(0, -1)}
          className="rounded border border-line px-2 py-1 font-mono text-xs hover:bg-line/20"
        >
          ←
        </button>
        <button
          type="button"
          onClick={() => move(-1, 0)}
          className="rounded border border-line px-2 py-1 font-mono text-xs hover:bg-line/20"
        >
          ↑
        </button>
        <button
          type="button"
          onClick={() => move(1, 0)}
          className="rounded border border-line px-2 py-1 font-mono text-xs hover:bg-line/20"
        >
          ↓
        </button>
        <button
          type="button"
          onClick={() => move(0, 1)}
          className="rounded border border-line px-2 py-1 font-mono text-xs hover:bg-line/20"
        >
          →
        </button>
      </div>
    </div>
  );
}

export default KeyboardSpatialGrid;
