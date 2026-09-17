"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function EdgeCachePurgeConsole({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [purged, setPurged] = React.useState(false);

  return (
    <div className={cn("w-full max-w-xl mx-auto p-6 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl font-mono text-xs shadow-sm", className)} {...props}>
      <h3 className="font-bold text-base text-neutral-900 dark:text-white mb-3">Edge CDN Cache Purge</h3>
      <input
        type="text"
        defaultValue="/r/components/*"
        className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 mb-3"
      />
      <button
        type="button"
        onClick={() => setPurged(true)}
        className="w-full py-2 bg-rose-600 text-white font-bold rounded-lg"
      >
        Purge Global Edge Cache
      </button>
      {purged && (
        <div className="mt-3 p-3 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 rounded">
          ✓ Invalidated 284 global points of presence in 420ms.
        </div>
      )}
    </div>
  );
}
