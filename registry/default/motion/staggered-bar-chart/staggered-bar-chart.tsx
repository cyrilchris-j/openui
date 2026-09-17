"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface StaggeredBarChartProps {
  values?: number[];
  className?: string;
}

export function StaggeredBarChart({
  values = [42, 68, 90, 54, 76, 88, 95, 60],
  className,
}: StaggeredBarChartProps) {
  const [animated, setAnimated] = useState(true);

  return (
    <div className={cn("w-full max-w-md rounded-xl border border-line bg-paper p-6 shadow-sm", className)}>
      <div className="flex items-center justify-between pb-4">
        <div>
          <span className="font-mono text-xs text-ink/60">THROUGHPUT</span>
          <h4 className="font-display text-base font-bold text-ink">Request Velocity</h4>
        </div>
        <button
          type="button"
          onClick={() => setAnimated((prev) => !prev)}
          className="rounded border border-line px-2.5 py-1 font-mono text-xs text-ink hover:bg-line/20"
        >
          Replay
        </button>
      </div>

      <div className="flex h-40 items-end gap-3 pt-6">
        {values.map((val, idx) => (
          <div key={idx} className="group relative flex flex-1 flex-col items-center h-full justify-end">
            <div
              className="w-full rounded-t bg-ink transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
              style={{
                height: animated ? `${val}%` : "0%",
                transitionDelay: `${idx * 60}ms`,
              }}
            />
            <span className="mt-2 font-mono text-[10px] text-ink/50">{idx + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StaggeredBarChart;
