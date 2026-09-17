"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function SystemHealthStatusPage({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const services = [
    { name: "Registry API Distribution", uptime: "99.99%" },
    { name: "Static Asset CDN Edge", uptime: "100.00%" },
    { name: "CLI Mirror Synchronization", uptime: "99.98%" },
  ];

  return (
    <div className={cn("w-full max-w-3xl mx-auto p-6 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl font-mono text-xs shadow-sm", className)} {...props}>
      <div className="flex items-center justify-between pb-4 border-b border-neutral-200 dark:border-neutral-800 mb-4">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-bold text-neutral-900 dark:text-white">All Systems Operational</span>
        </div>
        <span className="text-neutral-400">90-Day SLA</span>
      </div>

      <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
        {services.map((s) => (
          <div key={s.name} className="py-3 flex items-center justify-between">
            <span className="text-neutral-800 dark:text-neutral-200">{s.name}</span>
            <span className="text-emerald-500 font-bold">{s.uptime}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
