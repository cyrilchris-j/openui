"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function EmailTemplateComposer({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [subject, setSubject] = React.useState("OpenUI Release v2.4.0 — 800 Certified Primitives");

  return (
    <div className={cn("w-full max-w-3xl mx-auto p-6 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm text-xs", className)} {...props}>
      <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-4">Email Campaign Composer</h3>
      <div className="space-y-3">
        <div>
          <label className="block text-neutral-500 mb-1">Subject Line</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 font-semibold"
          />
        </div>
        <div>
          <label className="block text-neutral-500 mb-1">Body Preview</label>
          <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50">
            <h4 className="font-bold text-neutral-900 dark:text-white">Hi Team,</h4>
            <p className="text-neutral-600 dark:text-neutral-400 mt-2 leading-relaxed">
              We are excited to announce that all 800 registry resources across 8 categories have passed 100% automated verification.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
