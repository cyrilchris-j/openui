"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface ElasticBadgePopProps {
  className?: string;
  count?: number;
}

export function ElasticBadgePop({ className, count = 12 }: ElasticBadgePopProps) {
  const [val, setVal] = useState(count);
  const [popping, setPopping] = useState(false);

  const increment = () => {
    setPopping(true);
    setVal((v) => v + 1);
    setTimeout(() => setPopping(false), 300);
  };

  return (
    <div className={cn("inline-flex items-center gap-3 rounded-xl border border-line bg-paper p-4 shadow-sm", className)}>
      <button
        type="button"
        onClick={increment}
        className="rounded-lg bg-ink px-4 py-2 font-mono text-xs font-semibold text-paper hover:opacity-90"
      >
        Push Update
      </button>

      <span
        className={cn(
          "inline-flex h-7 items-center justify-center rounded-full bg-red-500 px-2.5 font-mono text-xs font-bold text-white shadow-sm transition-transform duration-300",
          popping ? "scale-125" : "scale-100"
        )}
      >
        +{val}
      </span>
    </div>
  );
}

export default ElasticBadgePop;
