"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function SecurityIpGeofencingRules({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("w-full max-w-lg mx-auto p-5 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl font-mono text-xs shadow-sm", className)} {...props}>
      <h3 className="font-bold text-neutral-900 dark:text-white mb-3">Inbound Geofencing</h3>
      <div className="space-y-2">
        <div className="flex justify-between p-2.5 rounded bg-neutral-50 dark:bg-neutral-900">
          <span>United States (US)</span>
          <span className="text-emerald-500 font-bold">ALLOWED</span>
        </div>
        <div className="flex justify-between p-2.5 rounded bg-neutral-50 dark:bg-neutral-900">
          <span>European Union (EU)</span>
          <span className="text-emerald-500 font-bold">ALLOWED</span>
        </div>
      </div>
    </div>
  );
}
