"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function CloudDeploymentPipeline({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const stages = [
    { name: "Lint & Prettier", status: "Passed", duration: "12s" },
    { name: "Vitest (14 packages)", status: "Passed", duration: "24s" },
    { name: "Registry Typecheck", status: "Passed", duration: "6s" },
    { name: "Edge V8 Mirror Sync", status: "Active", duration: "running..." },
  ];

  return (
    <div className={cn("w-full max-w-4xl mx-auto p-5 bg-neutral-950 text-neutral-100 border border-neutral-800 rounded-xl font-mono text-xs", className)} {...props}>
      <div className="flex items-center justify-between pb-3 border-b border-neutral-800 mb-4">
        <span className="font-bold text-white">Pipeline #2842 • commit 8f92a1</span>
        <span className="text-emerald-400 font-bold">● Running Edge Sync</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {stages.map((st) => (
          <div key={st.name} className="p-3 rounded bg-neutral-900 border border-neutral-800">
            <div className="text-neutral-400 text-[10px] uppercase">{st.name}</div>
            <div className={cn("font-bold mt-1", st.status === "Passed" ? "text-emerald-400" : "text-amber-400 animate-pulse")}>
              {st.status}
            </div>
            <div className="text-[10px] text-neutral-500 mt-1">{st.duration}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
