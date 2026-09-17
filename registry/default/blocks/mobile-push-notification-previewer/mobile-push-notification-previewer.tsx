"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function MobilePushNotificationPreviewer({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("w-full max-w-sm mx-auto p-6 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-xl text-xs", className)} {...props}>
      <div className="p-3.5 rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm">
        <div className="flex items-center justify-between text-[10px] text-neutral-400 mb-1">
          <span className="font-bold text-neutral-900 dark:text-white">OPENUI REGISTRY</span>
          <span>Now</span>
        </div>
        <div className="font-bold text-neutral-900 dark:text-white">Release v2.4 Verified</div>
        <div className="text-neutral-600 dark:text-neutral-400 mt-0.5">800 components passing all automated tests.</div>
      </div>
    </div>
  );
}
