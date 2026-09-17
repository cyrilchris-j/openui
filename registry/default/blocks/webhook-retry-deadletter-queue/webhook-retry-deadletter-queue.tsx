"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function WebhookRetryDeadletterQueue({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [cleared, setCleared] = React.useState(false);

  return (
    <div className={cn("w-full max-w-xl mx-auto p-5 bg-neutral-950 text-neutral-100 border border-neutral-800 rounded-xl font-mono text-xs shadow-sm", className)} {...props}>
      <div className="flex justify-between items-center pb-3 border-b border-neutral-800 mb-3">
        <span className="font-bold text-white">Dead Letter Queue (DLQ)</span>
        <button type="button" onClick={() => setCleared(true)} className="px-3 py-1 bg-emerald-600 text-white rounded font-bold text-[11px]">
          Retry All Events
        </button>
      </div>
      {!cleared ? (
        <div className="p-3 rounded bg-neutral-900 text-rose-400">
          1 failed event: HTTP 504 Gateway Timeout (partner endpoint)
        </div>
      ) : (
        <div className="p-3 rounded bg-emerald-950 text-emerald-400">
          ✓ All events redelivered successfully.
        </div>
      )}
    </div>
  );
}
