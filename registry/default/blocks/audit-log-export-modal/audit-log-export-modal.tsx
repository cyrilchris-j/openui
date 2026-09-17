"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function AuditLogExportModal({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [format, setFormat] = React.useState<"json" | "csv">("json");
  const [exported, setExported] = React.useState(false);

  return (
    <div className={cn("w-full max-w-md mx-auto p-6 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xl text-xs", className)} {...props}>
      <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-2">Export Audit Trail</h3>
      <p className="text-neutral-500 mb-4">Generate cryptographically verified compliance logs for external auditors.</p>

      <div className="space-y-3 mb-6 font-mono">
        <label className="block text-neutral-400 text-[11px]">Format</label>
        <div className="flex gap-2">
          {(["json", "csv"] as const).map((fmt) => (
            <button
              key={fmt}
              type="button"
              onClick={() => setFormat(fmt)}
              className={cn("px-4 py-2 rounded-lg border uppercase font-bold", format === fmt ? "border-emerald-600 bg-emerald-50/20 text-emerald-600 dark:text-emerald-400" : "border-neutral-200 dark:border-neutral-800")}
            >
              {fmt}
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={() => setExported(true)}
        className="w-full py-2.5 bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 rounded-lg font-semibold"
      >
        {exported ? "Download Ready! (1.4 MB) ↓" : "Generate Export Bundle"}
      </button>
    </div>
  );
}
