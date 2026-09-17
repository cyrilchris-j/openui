"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function ServerlessFunctionLogs({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("w-full max-w-3xl mx-auto p-5 bg-neutral-950 text-neutral-100 border border-neutral-800 rounded-xl font-mono text-xs shadow-sm", className)} {...props}>
      <div className="flex justify-between items-center pb-3 border-b border-neutral-800 mb-3">
        <span className="text-white font-bold">edge-handler: GET /api/v2/items</span>
        <span className="text-emerald-400">Duration: 4.2ms</span>
      </div>
      <div className="space-y-1 text-neutral-300">
        <div>[2026-09-18T00:12:00Z] START RequestId: 8f92a10b</div>
        <div>[2026-09-18T00:12:00Z] MEMORY: 32MB / 128MB Isolate</div>
        <div>[2026-09-18T00:12:00Z] END RequestId: 8f92a10b (Cold start: 0ms)</div>
      </div>
    </div>
  );
}
