"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function ActivityAuditFeed({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const events = [
    { user: "Cyril Chris", action: "Published v2.4.0 registry manifests", time: "10m ago" },
    { user: "Elena Rostova", action: "Merged Pull Request #800: Master Catalog", time: "1h ago" },
    { user: "Marcus Vance", action: "Executed automated typecheck verification", time: "2h ago" },
  ];

  return (
    <div className={cn("w-full max-w-3xl mx-auto p-6 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm text-xs", className)} {...props}>
      <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-4">Activity Ledger</h3>
      <div className="space-y-3">
        {events.map((e, idx) => (
          <div key={idx} className="p-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/40 dark:bg-neutral-900/30 flex items-center justify-between">
            <div>
              <span className="font-semibold text-neutral-900 dark:text-white">{e.user}</span>{" "}
              <span className="text-neutral-600 dark:text-neutral-400">{e.action}</span>
            </div>
            <span className="text-neutral-400 font-mono text-[11px] shrink-0 ml-4">{e.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
