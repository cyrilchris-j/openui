"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface ReorderableTabStripProps {
  className?: string;
}

export function ReorderableTabStrip({ className }: ReorderableTabStripProps) {
  const [tabs, setTabs] = useState(["index.tsx", "styles.css", "schema.json"]);
  const [active, setActive] = useState(0);

  const swap = (i1: number, i2: number) => {
    const next = [...tabs];
    const item1 = next[i1];
    const item2 = next[i2];
    if (!item1 || !item2) return;
    next[i1] = item2;
    next[i2] = item1;
    setTabs(next);
  };

  return (
    <div className={cn("inline-flex items-center gap-1.5 rounded-xl border border-line bg-line/10 p-1.5 shadow-sm", className)}>
      {tabs.map((tab, idx) => (
        <div
          key={tab}
          onClick={() => setActive(idx)}
          className={cn(
            "flex items-center gap-2 rounded-lg px-3 py-1.5 font-mono text-xs font-semibold transition-all cursor-pointer",
            active === idx ? "bg-paper text-ink shadow-sm" : "text-ink/60 hover:text-ink"
          )}
        >
          <span>{tab}</span>
          {idx > 0 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                swap(idx, idx - 1);
              }}
              className="text-[9px] text-ink/30 hover:text-ink"
            >
              ◀
            </button>
          )}
          {idx < tabs.length - 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                swap(idx, idx + 1);
              }}
              className="text-[9px] text-ink/30 hover:text-ink"
            >
              ▶
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default ReorderableTabStrip;
