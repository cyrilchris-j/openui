"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function HardwareIsolateTelemetryTile({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("w-full max-w-sm mx-auto p-5 bg-neutral-950 text-neutral-100 border border-neutral-800 rounded-xl font-mono text-xs shadow-sm", className)} {...props}>
      <div className="text-neutral-400 text-[10px]">V8 ISOLATE POOL</div>
      <div className="text-2xl font-bold text-white mt-1">28.4 MB / 128 MB</div>
      <div className="text-emerald-400 text-[11px] mt-1">GC Pause: 0.12ms (Optimal)</div>
    </div>
  );
}
