"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export interface MobileAppSyncFeatureProps extends React.HTMLAttributes<HTMLElement> {
  headline?: string;
  description?: string;
}

export function MobileAppSyncFeature({
  headline = "Your workspace synced everywhere, offline-first",
  description = "Review telemetry, approve pull requests, and monitor production health checks straight from your pocket with native biometric access.",
  className,
  ...props
}: MobileAppSyncFeatureProps) {
  return (
    <section className={cn("w-full py-16 px-4 md:px-8 max-w-5xl mx-auto", className)} {...props}>
      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 p-8 md:p-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-7">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-bold">
            Companion Apps
          </span>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mt-2">
            {headline}
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-3 leading-relaxed">
            {description}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              className="px-4 py-2.5 rounded-xl bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 text-xs font-semibold"
            >
              Download on App Store
            </button>
            <button
              type="button"
              className="px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 text-xs font-semibold"
            >
              Get it on Google Play
            </button>
          </div>
        </div>

        <div className="md:col-span-5 flex justify-center">
          <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-center shadow-md">
            <div className="h-32 w-32 mx-auto bg-neutral-100 dark:bg-neutral-800 rounded-lg flex items-center justify-center font-mono text-[10px] text-neutral-400">
              [QR CODE SYNC]
            </div>
            <div className="text-xs font-mono text-neutral-500 mt-3">Scan to instant install</div>
          </div>
        </div>
      </div>
    </section>
  );
}
