"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function SystemIncidentDeclarationModal({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("w-full max-w-md mx-auto p-6 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xl text-xs", className)} {...props}>
      <h3 className="font-bold text-base text-rose-600 mb-2">Declare Operational Incident</h3>
      <p className="text-neutral-500 mb-4">This action broadcasts a pager alert to the on-call SRE squad.</p>
      <div className="space-y-3 mb-6">
        <div>
          <label className="block text-neutral-600 dark:text-neutral-400 mb-1">Severity Level</label>
          <select className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900">
            <option>P0 — Catastrophic Outage</option>
            <option>P1 — Degraded Performance</option>
            <option>P2 — Minor Edge Latency</option>
          </select>
        </div>
      </div>
      <button type="button" className="w-full py-2 bg-rose-600 text-white font-bold rounded-lg">
        Trigger Incident Alert 🚨
      </button>
    </div>
  );
}
