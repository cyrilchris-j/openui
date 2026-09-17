"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function FileDropzoneUploader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [uploaded, setUploaded] = React.useState(false);

  return (
    <div className={cn("w-full max-w-xl mx-auto p-6 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm text-xs", className)} {...props}>
      <div
        onClick={() => setUploaded(true)}
        className="p-8 border-2 border-dashed border-neutral-300 dark:border-neutral-700 rounded-xl text-center cursor-pointer hover:border-emerald-500 transition-colors bg-neutral-50/50 dark:bg-neutral-900/30"
      >
        <div className="text-3xl mb-2">📥</div>
        <div className="font-semibold text-neutral-900 dark:text-white">Click or drag files here to upload</div>
        <div className="text-neutral-400 text-[11px] mt-1">Supports PNG, SVG, JSON up to 10MB</div>
      </div>
      {uploaded && (
        <div className="mt-4 p-3 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-lg flex justify-between items-center font-mono">
          <span>manifest_bundle.json (2.4 MB)</span>
          <span className="font-bold">Uploaded ✓</span>
        </div>
      )}
    </div>
  );
}
