"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface ChipToggleClusterProps {
  className?: string;
}

export function ChipToggleCluster({ className }: ChipToggleClusterProps) {
  const [active, setActive] = useState<string[]>(["Components"]);
  const items = ["Components", "Motion", "Text", "Layouts"];

  const toggle = (it: string) => {
    setActive((prev) => (prev.includes(it) ? prev.filter((i) => i !== it) : [...prev, it]));
  };

  return (
    <div className={cn("inline-flex flex-wrap gap-2", className)}>
      {items.map((it) => {
        const isSel = active.includes(it);
        return (
          <button
            key={it}
            type="button"
            onClick={() => toggle(it)}
            className={cn(
              "rounded-full border px-3.5 py-1 font-mono text-xs font-semibold transition-all",
              isSel ? "border-ink bg-ink text-paper shadow-sm" : "border-line bg-paper text-ink hover:border-ink"
            )}
          >
            {it}
          </button>
        );
      })}
    </div>
  );
}

export default ChipToggleCluster;
