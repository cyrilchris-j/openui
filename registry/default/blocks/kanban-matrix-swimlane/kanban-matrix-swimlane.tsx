"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function KanbanMatrixSwimlane({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("w-full max-w-4xl mx-auto p-5 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl text-xs shadow-sm", className)} {...props}>
      <h3 className="font-bold text-sm text-neutral-900 dark:text-white mb-3">Release 2.4 Swimlanes</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-3 rounded-lg bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
          <div className="font-bold text-neutral-900 dark:text-white mb-2">Milestone: 800 Catalog Total</div>
          <div className="p-2 bg-white dark:bg-neutral-950 rounded border border-neutral-200 dark:border-neutral-800">
            ✓ 100% categories verified
          </div>
        </div>
        <div className="p-3 rounded-lg bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
          <div className="font-bold text-neutral-900 dark:text-white mb-2">Milestone: Registry Zero Errors</div>
          <div className="p-2 bg-white dark:bg-neutral-950 rounded border border-neutral-200 dark:border-neutral-800">
            ✓ Zero TypeScript compilation errors
          </div>
        </div>
      </div>
    </div>
  );
}
