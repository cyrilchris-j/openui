"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function OpenuiRegistrySyncWorkbench({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("w-full max-w-2xl mx-auto p-6 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl font-mono text-xs shadow-sm", className)} {...props}>
      <div className="flex justify-between items-center pb-3 border-b border-neutral-200 dark:border-neutral-800 mb-4">
        <span className="font-bold text-neutral-900 dark:text-white">Registry Mirror Status</span>
        <span className="text-emerald-500 font-bold">In Parity (800 / 800)</span>
      </div>
      <div className="p-3 rounded bg-neutral-50 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 mb-4">
        Local mirror is synchronized with upstream openui-registry v2.4.0.
      </div>
      <button type="button" className="w-full py-2 bg-emerald-600 text-white font-bold rounded-lg">
        Trigger Mirror Verification Check
      </button>
    </div>
  );
}
