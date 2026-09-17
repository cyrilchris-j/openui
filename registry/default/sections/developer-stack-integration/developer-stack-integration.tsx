"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function DeveloperStackIntegration({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const frameworks = [
    { name: "Next.js 15+", status: "App Router Native" },
    { name: "Vite 6+", status: "HMR Optimized" },
    { name: "Tailwind CSS v4", status: "Token Compatible" },
    { name: "TypeScript 5.8+", status: "Strict Zero-Any" },
  ];

  return (
    <section className={cn("w-full py-16 px-4 max-w-4xl mx-auto", className)} {...props}>
      <h3 className="text-xl font-bold text-center text-neutral-900 dark:text-neutral-100 mb-8">
        Works with your existing framework
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {frameworks.map((f) => (
          <div key={f.name} className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-center">
            <div className="text-sm font-bold text-neutral-900 dark:text-neutral-100">{f.name}</div>
            <div className="text-[10px] font-mono text-neutral-500 mt-1">{f.status}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
