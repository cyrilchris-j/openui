"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function SupportSLAGuarantee({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section className={cn("w-full py-16 px-4 max-w-5xl mx-auto", className)} {...props}>
      <div className="border border-neutral-300 dark:border-neutral-800 rounded-xl p-6 bg-white dark:bg-neutral-950">
        <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
          Enterprise SLA Commitments
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6 text-xs">
          <div>
            <span className="font-bold text-neutral-900 dark:text-neutral-100">P0 (Critical Outage)</span>
            <div className="text-neutral-500 mt-1">Under 15 minutes guaranteed response with warm page escalation.</div>
          </div>
          <div>
            <span className="font-bold text-neutral-900 dark:text-neutral-100">P1 (Degraded Performance)</span>
            <div className="text-neutral-500 mt-1">Under 1 hour guaranteed technical review with senior engineer.</div>
          </div>
          <div>
            <span className="font-bold text-neutral-900 dark:text-neutral-100">Scheduled Maintenance</span>
            <div className="text-neutral-500 mt-1">Zero downtime rolling edge cluster deployments with 72h advance notice.</div>
          </div>
        </div>
      </div>
    </section>
  );
}
