"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface TabPillStripProps {
  tabs?: string[];
  className?: string;
}

export function TabPillStrip({
  tabs = ["Endpoints", "Schemas", "Security", "Logs"],
  className,
}: TabPillStripProps) {
  const [active, setActive] = useState(0);

  return (
    <div className={cn("inline-flex gap-1.5 rounded-full border border-line bg-paper p-1.5 shadow-sm", className)}>
      {tabs.map((tab, idx) => (
        <button
          key={tab}
          type="button"
          onClick={() => setActive(idx)}
          className={cn(
            "rounded-full px-4 py-1.5 font-mono text-xs font-semibold transition-all",
            active === idx ? "bg-ink text-paper shadow-sm" : "text-ink/60 hover:text-ink"
          )}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

export default TabPillStrip;
