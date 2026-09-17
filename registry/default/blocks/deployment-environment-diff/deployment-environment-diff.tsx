"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function DeploymentEnvironmentDiff({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("w-full max-w-4xl mx-auto p-5 bg-neutral-950 text-neutral-100 border border-neutral-800 rounded-xl font-mono text-xs shadow-sm", className)} {...props}>
      <h3 className="font-bold text-white mb-3">Environment Config Diff</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-3 rounded bg-neutral-900 border border-neutral-800">
          <div className="font-bold text-amber-400 mb-2">Staging (Preview)</div>
          <div>DATABASE_URL=postgres://preview:5432</div>
          <div>CACHE_TTL=60s</div>
        </div>
        <div className="p-3 rounded bg-neutral-900 border border-neutral-800">
          <div className="font-bold text-emerald-400 mb-2">Production (Live)</div>
          <div>DATABASE_URL=postgres://prod:5432</div>
          <div>CACHE_TTL=86400s</div>
        </div>
      </div>
    </div>
  );
}
