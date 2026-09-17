"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function CookiePreferencesDialog({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("w-full max-w-lg mx-auto p-6 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xl text-xs", className)} {...props}>
      <h3 className="font-bold text-base text-neutral-900 dark:text-white mb-2">Privacy & Cookie Settings</h3>
      <p className="text-neutral-500 mb-6">Manage how telemetry and performance cookies are processed.</p>
      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <div className="font-semibold text-neutral-900 dark:text-white">Strictly Necessary</div>
            <div className="text-[11px] text-neutral-400">Required for authentication and security tokens.</div>
          </div>
          <span className="font-mono text-neutral-400 text-[10px]">Always On</span>
        </div>
      </div>
      <button type="button" className="w-full py-2 bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 rounded-lg font-semibold">
        Save Preferences
      </button>
    </div>
  );
}
