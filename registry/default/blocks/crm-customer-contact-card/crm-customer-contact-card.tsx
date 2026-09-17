"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function CrmCustomerContactCard({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [stage, setStage] = React.useState("Qualified Opportunity");

  return (
    <div className={cn("w-full max-w-2xl mx-auto p-6 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm text-xs", className)} {...props}>
      <div className="flex justify-between items-start pb-4 border-b border-neutral-200 dark:border-neutral-800 mb-4">
        <div>
          <h3 className="text-base font-bold text-neutral-900 dark:text-white">Alex Rivera</h3>
          <div className="text-neutral-500">VP Architecture • Acme Cloud Systems</div>
        </div>
        <div className="text-right font-mono">
          <div className="text-base font-bold text-emerald-600 dark:text-emerald-400">$120,000 ARR</div>
          <div className="text-[10px] text-neutral-400">Annual Contract Value</div>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <label className="block text-neutral-500 mb-1">Deal Pipeline Stage</label>
          <select
            value={stage}
            onChange={(e) => setStage(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900"
          >
            <option>Discovery Call</option>
            <option>Qualified Opportunity</option>
            <option>Security Review</option>
            <option>Closed Won</option>
          </select>
        </div>
      </div>
    </div>
  );
}
