"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

export interface StaggeredMetricCounterProps {
  className?: string;
}

export function StaggeredMetricCounter({ className }: StaggeredMetricCounterProps) {
  const [val1, setVal1] = useState(0);
  const [val2, setVal2] = useState(0);

  useEffect(() => {
    const t1 = setInterval(() => setVal1((v) => (v < 98 ? v + 2 : 98)), 30);
    const t2 = setInterval(() => setVal2((v) => (v < 412 ? v + 6 : 412)), 20);
    return () => {
      clearInterval(t1);
      clearInterval(t2);
    };
  }, []);

  return (
    <div className={cn("grid grid-cols-2 gap-4 rounded-xl border border-line bg-paper p-6 shadow-sm", className)}>
      <div className="border-r border-line pr-4">
        <span className="font-mono text-[10px] text-ink/50 uppercase">UPTIME RATIO</span>
        <div className="font-mono text-3xl font-bold text-ink">{val1}.9%</div>
      </div>
      <div className="pl-2">
        <span className="font-mono text-[10px] text-ink/50 uppercase">ACTIVE PODS</span>
        <div className="font-mono text-3xl font-bold text-ink">{val2}</div>
      </div>
    </div>
  );
}

export default StaggeredMetricCounter;
