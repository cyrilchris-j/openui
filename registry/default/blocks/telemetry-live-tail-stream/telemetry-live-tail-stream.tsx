"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function TelemetryLiveTailStream({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [paused, setPaused] = React.useState(false);

  const lines = [
    "[INFO] 18:42:01 edge-fra: GET /r/components/button.json 200 1.2ms",
    "[INFO] 18:42:02 edge-iad: GET /r/sections/hero.json 200 0.8ms",
    "[WARN] 18:42:04 edge-hnd: Memory pressure spike 42% (mitigated)",
    "[INFO] 18:42:05 edge-sfo: Invariant verification PASS (800 items)",
  ];

  return (
    <div className={cn("w-full max-w-4xl mx-auto p-5 bg-neutral-950 text-neutral-100 border border-neutral-800 rounded-xl font-mono text-xs", className)} {...props}>
      <div className="flex justify-between items-center pb-3 border-b border-neutral-800 mb-3">
        <span className="text-white font-bold">Edge Request Stream Tail</span>
        <button
          type="button"
          onClick={() => setPaused(!paused)}
          className={cn("px-3 py-1 rounded font-bold text-[11px]", paused ? "bg-amber-600 text-white" : "bg-neutral-800 text-neutral-300")}
        >
          {paused ? "Stream Paused ❚❚" : "Streaming Live ●"}
        </button>
      </div>
      <div className="space-y-1.5 max-h-48 overflow-y-auto">
        {lines.map((l, idx) => (
          <div key={idx} className={l.includes("WARN") ? "text-amber-400" : "text-emerald-400"}>
            {l}
          </div>
        ))}
      </div>
    </div>
  );
}
