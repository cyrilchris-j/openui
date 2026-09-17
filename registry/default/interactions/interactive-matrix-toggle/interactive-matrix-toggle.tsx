"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface InteractiveMatrixToggleProps {
  className?: string;
}

export function InteractiveMatrixToggle({ className }: InteractiveMatrixToggleProps) {
  const [cells, setCells] = useState<boolean[]>(Array(16).fill(false));

  const toggle = (idx: number) => {
    setCells((prev) => {
      const next = [...prev];
      next[idx] = !next[idx];
      return next;
    });
  };

  return (
    <div className={cn("inline-flex flex-col items-center gap-3 rounded-xl border border-line bg-paper p-6 shadow-sm", className)}>
      <span className="font-mono text-xs text-ink/60">4x4 BITBOARD MATRIX</span>

      <div className="grid grid-cols-4 gap-1.5">
        {cells.map((active, i) => (
          <div
            key={i}
            onClick={() => toggle(i)}
            className={cn(
              "h-8 w-8 cursor-pointer rounded border font-mono text-[9px] flex items-center justify-center transition-colors",
              active ? "border-ink bg-ink text-paper" : "border-line bg-line/20 text-ink/40"
            )}
          >
            {active ? "1" : "0"}
          </div>
        ))}
      </div>
    </div>
  );
}

export default InteractiveMatrixToggle;
