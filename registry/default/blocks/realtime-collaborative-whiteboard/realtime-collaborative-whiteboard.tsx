"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function RealtimeCollaborativeWhiteboard({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("w-full max-w-4xl mx-auto h-72 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 relative overflow-hidden flex items-center justify-center font-mono text-xs", className)} {...props}>
      <div className="absolute top-4 left-4 flex gap-2">
        <span className="px-3 py-1 bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800 shadow-xs font-bold text-neutral-800 dark:text-neutral-200">
          ✏ Select Tool
        </span>
        <span className="px-3 py-1 bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800 shadow-xs text-neutral-500">
          📝 Sticky Note
        </span>
      </div>
      <div className="text-center text-neutral-400">
        [Multiplayer Whiteboard Stage — 3 Active Cursors]
      </div>
    </div>
  );
}
