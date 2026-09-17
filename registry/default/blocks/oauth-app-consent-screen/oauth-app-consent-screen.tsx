"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function OauthAppConsentScreen({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("w-full max-w-sm mx-auto p-6 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xl text-center text-xs", className)} {...props}>
      <div className="h-12 w-12 mx-auto rounded-xl bg-neutral-900 text-white flex items-center justify-center text-xl font-bold mb-3">
        ◈
      </div>
      <h3 className="font-bold text-base text-neutral-900 dark:text-white">Authorize Figma Sync</h3>
      <p className="text-neutral-500 mt-1 mb-6">Figma Variables Sync is requesting read access to your design tokens.</p>
      <div className="space-y-2 mb-6">
        <button type="button" className="w-full py-2 bg-emerald-600 text-white font-semibold rounded-lg">
          Grant Access
        </button>
        <button type="button" className="w-full py-2 border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 rounded-lg">
          Cancel
        </button>
      </div>
    </div>
  );
}
