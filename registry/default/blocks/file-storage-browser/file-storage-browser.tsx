"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export interface FileItem {
  name: string;
  size: string;
  type: "folder" | "file";
  updated: string;
}

const FILES: FileItem[] = [
  { name: "components/", size: "100 items", type: "folder", updated: "2m ago" },
  { name: "sections/", size: "100 items", type: "folder", updated: "Just now" },
  { name: "registry.json", size: "2.4 MB", type: "file", updated: "1m ago" },
  { name: "openui.config.ts", size: "1.2 KB", type: "file", updated: "1h ago" },
];

export function FileStorageBrowser({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("w-full max-w-4xl mx-auto p-5 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl font-mono text-xs shadow-sm", className)} {...props}>
      <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-800">
        <span className="font-bold text-neutral-900 dark:text-neutral-100">Root / registry / default</span>
        <button type="button" className="px-3 py-1 rounded bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 text-[11px] font-bold">
          Upload File
        </button>
      </div>
      <div className="divide-y divide-neutral-100 dark:divide-neutral-800 mt-2">
        {FILES.map((f) => (
          <div key={f.name} className="py-2.5 flex items-center justify-between hover:bg-neutral-50 dark:hover:bg-neutral-900 px-2 rounded">
            <div className="flex items-center gap-2">
              <span>{f.type === "folder" ? "📁" : "📄"}</span>
              <span className="font-medium text-neutral-900 dark:text-neutral-100">{f.name}</span>
            </div>
            <div className="flex items-center gap-6 text-neutral-400 text-[11px]">
              <span>{f.size}</span>
              <span>{f.updated}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
