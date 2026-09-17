"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export interface ComplianceGdprConsentStripProps extends React.HTMLAttributes<HTMLElement> {
  onAcceptAll?: () => void;
  onRejectAll?: () => void;
}

export function ComplianceGdprConsentStrip({
  onAcceptAll,
  onRejectAll,
  className,
  ...props
}: ComplianceGdprConsentStripProps) {
  const [closed, setClosed] = React.useState(false);

  if (closed) return null;

  return (
    <section
      className={cn(
        "w-full border-t border-neutral-200 dark:border-neutral-800 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-sm p-4 md:px-8",
        className
      )}
      {...props}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-xs text-neutral-600 dark:text-neutral-400 max-w-2xl">
          We adhere strictly to GDPR and CCPA guidelines. We do not sell personal telemetry. Zero third-party tracker cookies are set without your consent.
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              onRejectAll?.();
              setClosed(true);
            }}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
          >
            Essential Only
          </button>
          <button
            type="button"
            onClick={() => {
              onAcceptAll?.();
              setClosed(true);
            }}
            className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900"
          >
            Accept All Preferences
          </button>
        </div>
      </div>
    </section>
  );
}
