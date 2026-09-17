"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface KeyboardListNavigationProps {
  className?: string;
}

export function KeyboardListNavigation({ className }: KeyboardListNavigationProps) {
  const [active, setActive] = useState(0);
  const rows = ["Build package graph", "Generate schema artifacts", "Sync public CDN", "Prune cache layers"];

  return (
    <div className={cn("w-full max-w-sm rounded-xl border border-line bg-paper p-4 font-mono text-xs shadow-sm", className)}>
      <span className="text-ink/60 uppercase mb-3 block">KEYBOARD SELECTOR (ACTIVE: {active + 1})</span>

      <div className="space-y-1">
        {rows.map((row, idx) => (
          <div
            key={row}
            onClick={() => setActive(idx)}
            className={cn(
              "flex items-center justify-between rounded px-3 py-2 cursor-pointer transition-colors",
              active === idx ? "bg-ink text-paper font-bold" : "hover:bg-line/20 text-ink"
            )}
          >
            <span>{row}</span>
            <span className="text-[10px] opacity-60">ROW {idx + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default KeyboardListNavigation;
