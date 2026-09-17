"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface ScrollSpyTableOfContentsProps {
  className?: string;
}

export function ScrollSpyTableOfContents({ className }: ScrollSpyTableOfContentsProps) {
  const [active, setActive] = useState("overview");
  const items = [
    { id: "overview", label: "System Overview" },
    { id: "architecture", label: "Registry Architecture" },
    { id: "validation", label: "Catalog Validation" },
    { id: "deployment", label: "Deployment Pipeline" },
  ];

  return (
    <div className={cn("w-full max-w-xs rounded-xl border border-line bg-paper p-4 shadow-sm", className)}>
      <span className="font-mono text-xs text-ink/50 uppercase mb-3 block">DOCUMENT INDEX</span>
      <div className="space-y-1 border-l-2 border-line">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActive(item.id)}
            className={cn(
              "-ml-[2px] block border-l-2 py-1 pl-3 text-left font-mono text-xs transition-colors",
              active === item.id ? "border-ink font-bold text-ink" : "border-transparent text-ink/60 hover:text-ink"
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ScrollSpyTableOfContents;
