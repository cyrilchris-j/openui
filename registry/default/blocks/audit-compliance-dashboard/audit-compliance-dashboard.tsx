"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function AuditComplianceDashboard({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const controls = [
    { code: "CC6.1", name: "Logical Perimeter Security", status: "Passed", auditor: "Verified" },
    { code: "CC7.2", name: "Automated Vulnerability Scans", status: "Passed", auditor: "Verified" },
    { code: "CC8.1", name: "Tamper-Evident Change Logs", status: "Passed", auditor: "Verified" },
  ];

  return (
    <div className={cn("w-full max-w-4xl mx-auto p-6 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl font-mono text-xs shadow-sm", className)} {...props}>
      <div className="flex items-center justify-between pb-4 border-b border-neutral-200 dark:border-neutral-800">
        <div>
          <h3 className="text-base font-bold text-neutral-900 dark:text-white">SOC 2 Type II Conformance</h3>
          <p className="text-neutral-500 text-[11px] mt-0.5">38 of 38 audit controls certified.</p>
        </div>
        <span className="px-3 py-1 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold">
          100% AUDIT READY
        </span>
      </div>

      <div className="divide-y divide-neutral-100 dark:divide-neutral-800 mt-3">
        {controls.map((c) => (
          <div key={c.code} className="py-3 flex items-center justify-between">
            <div>
              <span className="font-bold text-neutral-900 dark:text-white">{c.code}</span>
              <span className="text-neutral-600 dark:text-neutral-400 ml-3">{c.name}</span>
            </div>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">✓ {c.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
