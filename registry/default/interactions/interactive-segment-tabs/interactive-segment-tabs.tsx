"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface InteractiveSegmentTabsProps {
  className?: string;
}

export function InteractiveSegmentTabs({ className }: InteractiveSegmentTabsProps) {
  const [active, setActive] = useState(0);
  const items = ["Daily", "Weekly", "All Time"];

  return (
    <div className={cn("inline-flex rounded-full border border-line bg-line/20 p-1", className)}>
      {items.map((item, idx) => (
        <button
          key={item}
          type="button"
          onClick={() => setActive(idx)}
          className={cn(
            "rounded-full px-4 py-1.5 font-mono text-xs font-semibold transition-all",
            active === idx ? "bg-ink text-paper shadow-sm" : "text-ink/60 hover:text-ink"
          )}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

export default InteractiveSegmentTabs;
