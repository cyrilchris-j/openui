"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function CookieConsentScriptBlocker({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("w-full max-w-lg mx-auto p-5 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl font-mono text-xs shadow-sm", className)} {...props}>
      <h3 className="font-bold text-neutral-900 dark:text-white mb-2">Client Script Gatekeeper</h3>
      <div className="text-neutral-500 text-[11px] mb-3">All third-party scripts blocked prior to consent grant.</div>
      <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 rounded font-bold">
        Zero external scripts loaded. 100% clean isolate.
      </div>
    </div>
  );
}
