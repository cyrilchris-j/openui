"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface TabUnderlineStripProps {
  className?: string;
}

export function TabUnderlineStrip({ className }: TabUnderlineStripProps) {
  const [active, setActive] = useState(0);
  const tabs = ["Overview", "Code", "Reviews"];

  return (
    <div className={cn("flex border-b border-line font-mono text-xs", className)}>
      {tabs.map((t, idx) => (
        <button
          key={t}
          type="button"
          onClick={() => setActive(idx)}
          className={cn(
            "px-4 py-2 border-b-2 font-semibold transition-colors",
            active === idx ? "border-ink text-ink" : "border-transparent text-ink/60 hover:text-ink"
          )}
        >
          {t}
        </button>
      ))}
    </div>
  );
}

export default TabUnderlineStrip;
