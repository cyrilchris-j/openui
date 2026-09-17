"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function DatabaseBackupRestorePanel({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("w-full max-w-2xl mx-auto p-5 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl font-mono text-xs shadow-sm", className)} {...props}>
      <div className="flex justify-between items-center pb-3 border-b border-neutral-200 dark:border-neutral-800 mb-3">
        <span className="font-bold text-neutral-900 dark:text-white">Point-In-Time Snapshots</span>
        <button type="button" className="px-3 py-1 bg-emerald-600 text-white rounded font-bold text-[11px]">
          Create Snapshot
        </button>
      </div>
      <div className="space-y-2">
        <div className="p-3 rounded bg-neutral-50 dark:bg-neutral-900 flex justify-between items-center">
          <div>
            <div className="font-bold text-neutral-900 dark:text-white">snap_auto_20260918_0000</div>
            <div className="text-neutral-400 text-[10px]">Size: 1.8 GB • Retention: 30 days</div>
          </div>
          <button type="button" className="text-emerald-500 font-bold hover:underline">
            Restore
          </button>
        </div>
      </div>
    </div>
  );
}
