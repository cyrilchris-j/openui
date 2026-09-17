"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function ProjectRoadmapGanttChart({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("w-full max-w-3xl mx-auto p-5 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl font-mono text-xs shadow-sm", className)} {...props}>
      <h3 className="font-bold text-neutral-900 dark:text-white mb-4">Milestone Delivery Timeline</h3>
      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-[11px] mb-1">
            <span>800 Certified Catalog Resources</span>
            <span className="text-emerald-500 font-bold">100% Completed</span>
          </div>
          <div className="w-full h-2 rounded-full bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
            <div className="h-full bg-emerald-500 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
