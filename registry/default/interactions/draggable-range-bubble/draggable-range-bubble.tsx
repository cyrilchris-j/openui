"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface DraggableRangeBubbleProps {
  className?: string;
}

export function DraggableRangeBubble({ className }: DraggableRangeBubbleProps) {
  const [val, setVal] = useState(50);

  return (
    <div className={cn("w-full max-w-sm rounded-xl border border-line bg-paper p-6 shadow-sm", className)}>
      <div className="relative mb-6">
        <div
          className="absolute -top-7 rounded bg-ink px-2 py-0.5 font-mono text-[10px] font-bold text-paper shadow transition-all duration-75"
          style={{ left: `calc(${val}% - 12px)` }}
        >
          {val}
        </div>
      </div>

      <input
        type="range"
        min="0"
        max="100"
        value={val}
        onChange={(e) => setVal(parseInt(e.target.value, 10))}
        className="w-full cursor-pointer accent-ink"
      />
    </div>
  );
}

export default DraggableRangeBubble;
