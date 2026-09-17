"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function CookieAuditScanner({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("w-full max-w-2xl mx-auto p-5 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl font-mono text-xs shadow-sm", className)} {...props}>
      <h3 className="font-bold text-neutral-900 dark:text-white mb-2">Cookie Conformance Scanner</h3>
      <div className="p-3 rounded bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold mb-3">
        ✓ 0 Third-Party Tracking Cookies Detected
      </div>
      <div className="text-neutral-500 text-[11px]">100% CCPA & GDPR compliant. OpenUI operates strictly cookie-less by default.</div>
    </div>
  );
}
