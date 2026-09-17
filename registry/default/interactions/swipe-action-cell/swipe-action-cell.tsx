"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface SwipeActionCellProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

export function SwipeActionCell({
  title = "Database Migration Script",
  subtitle = "Pending validation in production cluster",
  className,
}: SwipeActionCellProps) {
  const [offset, setOffset] = useState(0);

  return (
    <div className={cn("relative w-full max-w-md overflow-hidden rounded-xl border border-line bg-red-500", className)}>
      {/* Underlying Actions */}
      <div className="absolute inset-y-0 right-0 flex items-center justify-end px-5 font-mono text-xs font-bold text-white">
        DELETE
      </div>

      {/* Foreground Swipeable Surface */}
      <div
        className="relative bg-paper p-4 transition-transform duration-200 ease-out"
        style={{ transform: `translateX(${offset}px)` }}
      >
        <div className="flex justify-between items-center">
          <div>
            <h5 className="font-display text-sm font-semibold text-ink">{title}</h5>
            <p className="mt-0.5 font-mono text-xs text-ink/60">{subtitle}</p>
          </div>
          <button
            type="button"
            onClick={() => setOffset((o) => (o === -80 ? 0 : -80))}
            className="rounded border border-line px-2 py-1 font-mono text-[10px] text-ink hover:bg-line/20"
          >
            {offset === -80 ? "Close" : "Swipe"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SwipeActionCell;
