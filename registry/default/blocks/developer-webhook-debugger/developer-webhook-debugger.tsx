"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function DeveloperWebhookDebugger({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("w-full max-w-2xl mx-auto p-5 bg-neutral-950 text-neutral-100 border border-neutral-800 rounded-xl font-mono text-xs shadow-sm", className)} {...props}>
      <h3 className="font-bold text-white mb-3">Payload Replay Simulator</h3>
      <div className="p-3 bg-neutral-900 rounded border border-neutral-800 text-emerald-400 mb-3">
        &#123; "event": "resource.materialized", "count": 800 &#125;
      </div>
      <button type="button" className="w-full py-2 bg-emerald-600 text-white font-bold rounded">
        Dispatch Test Event →
      </button>
    </div>
  );
}
