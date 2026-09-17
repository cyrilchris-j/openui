"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function FileMetadataInspector({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("w-full max-w-md mx-auto p-5 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl font-mono text-xs shadow-sm", className)} {...props}>
      <h3 className="font-bold text-neutral-900 dark:text-white pb-3 border-b border-neutral-200 dark:border-neutral-800 mb-3">
        Asset Integrity Inspector
      </h3>
      <div className="space-y-2 text-[11px]">
        <div className="flex justify-between">
          <span className="text-neutral-500">File Name</span>
          <span className="font-bold text-neutral-900 dark:text-white">registry.tar.gz</span>
        </div>
        <div className="flex justify-between">
          <span className="text-neutral-500">MIME Type</span>
          <span>application/gzip</span>
        </div>
        <div className="flex justify-between">
          <span className="text-neutral-500">Byte Size</span>
          <span>4,290,140 B (4.1 MB)</span>
        </div>
        <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800">
          <span className="text-neutral-500">SHA-256 Hash</span>
          <div className="text-emerald-600 dark:text-emerald-400 font-bold truncate mt-0.5">
            8f92a10b48c2e91048f029a81234bcfe8192
          </div>
        </div>
      </div>
    </div>
  );
}
