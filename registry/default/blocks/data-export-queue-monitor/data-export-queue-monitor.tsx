"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function DataExportQueueMonitor({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("w-full max-w-xl mx-auto p-5 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl font-mono text-xs shadow-sm", className)} {...props}>
      <h3 className="font-bold text-neutral-900 dark:text-white mb-3">Background Job Queue</h3>
      <div className="p-3 rounded bg-neutral-50 dark:bg-neutral-900 flex justify-between items-center">
        <div>
          <div className="font-bold text-neutral-900 dark:text-white">export_catalog_800.json</div>
          <div className="text-neutral-400 text-[10px]">Completed in 1.4s</div>
        </div>
        <button type="button" className="text-emerald-500 font-bold hover:underline">
          Download ↓
        </button>
      </div>
    </div>
  );
}
