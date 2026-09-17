"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface HoverMagnifyDockProps {
  className?: string;
}

export function HoverMagnifyDock({ className }: HoverMagnifyDockProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const icons = ["⌘", "⌥", "⇧", "⌃", "⏎"];

  return (
    <div className={cn("inline-flex items-end gap-2 rounded-2xl border border-line bg-paper p-3 shadow-lg", className)}>
      {icons.map((icon, idx) => {
        const isHover = hoveredIdx === idx;
        const isNeighbor = hoveredIdx !== null && Math.abs(hoveredIdx - idx) === 1;

        return (
          <div
            key={idx}
            onPointerEnter={() => setHoveredIdx(idx)}
            onPointerLeave={() => setHoveredIdx(null)}
            className={cn(
              "flex items-center justify-center rounded-xl border border-line bg-paper font-mono text-sm font-bold text-ink shadow-sm transition-all duration-100",
              isHover ? "h-14 w-14 -translate-y-2 text-base" : isNeighbor ? "h-12 w-12 -translate-y-1" : "h-10 w-10"
            )}
          >
            {icon}
          </div>
        );
      })}
    </div>
  );
}

export default HoverMagnifyDock;
