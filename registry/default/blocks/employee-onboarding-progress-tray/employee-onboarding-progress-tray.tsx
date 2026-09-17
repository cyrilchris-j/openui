"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function EmployeeOnboardingProgressTray({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("w-full max-w-md mx-auto p-5 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm text-xs", className)} {...props}>
      <h3 className="font-bold text-neutral-900 dark:text-white mb-3">Provisioning Status</h3>
      <div className="space-y-2">
        <div className="flex justify-between p-2 rounded bg-neutral-50 dark:bg-neutral-900">
          <span>GitHub Org Access</span>
          <span className="text-emerald-500 font-bold">✓ Active</span>
        </div>
        <div className="flex justify-between p-2 rounded bg-neutral-50 dark:bg-neutral-900">
          <span>Hardware Laptop</span>
          <span className="text-emerald-500 font-bold">✓ Delivered</span>
        </div>
      </div>
    </div>
  );
}
