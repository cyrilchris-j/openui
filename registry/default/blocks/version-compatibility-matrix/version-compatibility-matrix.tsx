"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function VersionCompatibilityMatrix({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const versions = [
    { target: "React", version: ">=19.0.0", status: "Supported" },
    { target: "Next.js", version: ">=15.0.0", status: "Supported" },
    { target: "Vite", version: ">=6.0.0", status: "Supported" },
    { target: "Node.js", version: ">=20.0.0", status: "Supported" },
  ];

  return (
    <div className={cn("w-full max-w-2xl mx-auto p-5 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl font-mono text-xs shadow-sm", className)} {...props}>
      <h3 className="font-bold text-neutral-900 dark:text-white mb-3">Runtime Compatibility Spec</h3>
      <div className="divide-y divide-neutral-200 dark:divide-neutral-800 border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden">
        {versions.map((v) => (
          <div key={v.target} className="p-3 flex items-center justify-between">
            <span className="font-bold text-neutral-900 dark:text-white">{v.target}</span>
            <span className="text-neutral-400">{v.version}</span>
            <span className="text-emerald-500 font-bold">✓ {v.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
