"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function IncidentPostmortemReport({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("w-full max-w-3xl mx-auto p-6 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl font-mono text-xs shadow-sm", className)} {...props}>
      <div className="flex justify-between items-center pb-3 border-b border-neutral-200 dark:border-neutral-800 mb-3">
        <span className="font-bold text-neutral-900 dark:text-white">INCIDENT #2026-08-A</span>
        <span className="text-emerald-500 font-bold">Resolved (MTTR: 8m)</span>
      </div>
      <div className="space-y-2 text-neutral-700 dark:text-neutral-300">
        <div><strong className="text-neutral-900 dark:text-white">Impact:</strong> Temporary 1.2s latency spike on EU-Frankfurt edge node.</div>
        <div><strong className="text-neutral-900 dark:text-white">Root Cause:</strong> Memory isolate GC compaction contention under 25k simultaneous requests.</div>
        <div><strong className="text-neutral-900 dark:text-white">Action Taken:</strong> Increased V8 isolate memory ceiling to 256MB.</div>
      </div>
    </div>
  );
}
