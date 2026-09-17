"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function SystemResourceMonitor({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("w-full max-w-4xl mx-auto p-5 bg-neutral-950 text-neutral-100 border border-neutral-800 rounded-xl font-mono text-xs", className)} {...props}>
      <div className="flex items-center justify-between pb-3 border-b border-neutral-800 mb-4">
        <span className="font-bold text-white">Edge Node Cluster US-EAST</span>
        <span className="text-emerald-400">● 100% Operational</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded bg-neutral-900 border border-neutral-800">
          <div className="text-neutral-400 text-[10px]">CPU USAGE</div>
          <div className="text-2xl font-bold text-white mt-1">14.2%</div>
          <div className="w-full h-1.5 bg-neutral-800 rounded-full mt-2 overflow-hidden">
            <div className="h-full bg-emerald-500 w-[14%]" />
          </div>
        </div>
        <div className="p-4 rounded bg-neutral-900 border border-neutral-800">
          <div className="text-neutral-400 text-[10px]">RAM ISOLATES</div>
          <div className="text-2xl font-bold text-white mt-1">42.8 GB</div>
          <div className="w-full h-1.5 bg-neutral-800 rounded-full mt-2 overflow-hidden">
            <div className="h-full bg-blue-500 w-[42%]" />
          </div>
        </div>
        <div className="p-4 rounded bg-neutral-900 border border-neutral-800">
          <div className="text-neutral-400 text-[10px]">EGRESS BANDWIDTH</div>
          <div className="text-2xl font-bold text-white mt-1">4.2 Gbps</div>
          <div className="w-full h-1.5 bg-neutral-800 rounded-full mt-2 overflow-hidden">
            <div className="h-full bg-purple-500 w-[28%]" />
          </div>
        </div>
      </div>
    </div>
  );
}
