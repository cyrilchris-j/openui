"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface FluidTabIndicatorProps {
  tabs?: string[];
  className?: string;
}

export function FluidTabIndicator({
  tabs = ["Overview", "Metrics", "Audit Log", "Settings"],
  className,
}: FluidTabIndicatorProps) {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <div className={cn("inline-flex items-center rounded-xl border border-line bg-paper p-1.5 shadow-sm", className)}>
      <div className="relative flex items-center">
        {tabs.map((tab, idx) => {
          const isActive = idx === activeIdx;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveIdx(idx)}
              className={cn(
                "relative z-10 px-4 py-2 text-sm font-medium transition-colors duration-200",
                isActive ? "text-paper" : "text-ink/70 hover:text-ink"
              )}
            >
              {tab}
            </button>
          );
        })}

        {/* Sliding Pill Indicator */}
        <div
          className="absolute inset-y-0 rounded-lg bg-ink transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
          style={{
            width: `${100 / tabs.length}%`,
            left: `${(activeIdx * 100) / tabs.length}%`,
          }}
        />
      </div>
    </div>
  );
}

export default FluidTabIndicator;
