"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface MultiTargetFocusRingProps {
  className?: string;
}

export function MultiTargetFocusRing({ className }: MultiTargetFocusRingProps) {
  const [active, setActive] = useState(0);
  const targets = ["Alpha", "Bravo", "Charlie", "Delta"];

  return (
    <div className={cn("inline-flex items-center gap-2 rounded-xl border border-line bg-paper p-3 shadow-sm", className)}>
      {targets.map((t, i) => (
        <button
          key={t}
          type="button"
          onClick={() => setActive(i)}
          className={cn(
            "rounded-lg px-4 py-2 font-mono text-xs font-bold transition-all duration-200",
            active === i ? "bg-ink text-paper shadow" : "text-ink/60 hover:text-ink"
          )}
        >
          {t}
        </button>
      ))}
    </div>
  );
}

export default MultiTargetFocusRing;
