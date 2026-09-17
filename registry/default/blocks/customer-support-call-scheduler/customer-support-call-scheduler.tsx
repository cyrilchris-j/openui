"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function CustomerSupportCallScheduler({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("w-full max-w-md mx-auto p-6 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm text-xs text-center", className)} {...props}>
      <h3 className="font-bold text-base text-neutral-900 dark:text-white mb-2">Book an Architecture Call</h3>
      <p className="text-neutral-500 mb-6">Schedule 30 minutes with an OpenUI core maintainer.</p>
      <button type="button" className="w-full py-2 bg-emerald-600 text-white font-semibold rounded-lg">
        Choose Date & Time →
      </button>
    </div>
  );
}
