"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function SystemLoadStressTester({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [vus, setVus] = React.useState(500);

  return (
    <div className={cn("w-full max-w-xl mx-auto p-5 bg-neutral-950 text-neutral-100 border border-neutral-800 rounded-xl font-mono text-xs shadow-sm", className)} {...props}>
      <h3 className="font-bold text-white mb-3">Cluster Stress Simulator</h3>
      <div className="space-y-3">
        <div className="flex justify-between text-neutral-400">
          <span>Concurrent VUs</span>
          <span className="text-emerald-400 font-bold">{vus} virtual users</span>
        </div>
        <input
          type="range"
          min="50"
          max="5000"
          value={vus}
          onChange={(e) => setVus(Number(e.target.value))}
          className="w-full accent-emerald-500 cursor-pointer"
        />
        <div className="p-3 rounded bg-neutral-900 text-neutral-300">
          Estimated p99 Latency: <strong>{Math.round(vus * 0.02 + 8)}ms</strong> (Zero dropouts)
        </div>
      </div>
    </div>
  );
}
