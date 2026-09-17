"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface FollowPathCursorProps {
  className?: string;
}

export function FollowPathCursor({ className }: FollowPathCursorProps) {
  const [t, setT] = useState(0.5);

  const x = t * 240 + 20;
  const y = 50 + Math.sin(t * Math.PI * 2) * 30;

  return (
    <div className={cn("inline-flex flex-col items-center gap-4 rounded-xl border border-line bg-paper p-6 shadow-sm", className)}>
      <span className="font-mono text-xs text-ink/60">PARAMETRIC RAIL TRACKER</span>
      <div className="relative h-28 w-72">
        <svg className="h-full w-full overflow-visible">
          <path
            d="M 20 50 Q 80 10 140 50 T 260 50"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-line"
          />
        </svg>
        <div
          className="absolute -ml-3 -mt-3 h-6 w-6 rounded-full border-2 border-paper bg-ink shadow-md transition-all duration-75"
          style={{ left: x, top: y }}
        />
      </div>

      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={t}
        onChange={(e) => setT(parseFloat(e.target.value))}
        className="w-48 cursor-pointer accent-ink"
      />
    </div>
  );
}

export default FollowPathCursor;
