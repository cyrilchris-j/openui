"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function MigrationGuideMatrix({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const steps = [
    { from: "npm install @legacy/ui", to: "pnpm dlx openui add <component>" },
    { from: "Theme Context Provider", to: "Native CSS variables in globals.css" },
    { from: "Client-only Wrappers", to: "React 19 Server Actions compatible" },
  ];

  return (
    <section className={cn("w-full py-16 px-4 max-w-4xl mx-auto font-mono text-xs", className)} {...props}>
      <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 mb-6">Migration Path</h3>
      <div className="divide-y divide-neutral-200 dark:divide-neutral-800 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden bg-white dark:bg-neutral-950">
        {steps.map((s, idx) => (
          <div key={idx} className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="text-rose-500">✕ Legacy: {s.from}</div>
            <div className="text-emerald-500 font-bold">✓ Modern: {s.to}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
