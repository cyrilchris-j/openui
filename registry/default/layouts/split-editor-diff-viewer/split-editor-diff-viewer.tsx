"use client";

import { cn } from "@/lib/cn";

export interface SplitEditorDiffViewerProps extends React.HTMLAttributes<HTMLDivElement> {
  original?: React.ReactNode;
  modified?: React.ReactNode;
}

export function SplitEditorDiffViewer({ original, modified, className, ...props }: SplitEditorDiffViewerProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 w-full border border-line rounded-xl overflow-hidden font-mono text-xs bg-paper", className)} {...props}>
      <div className="p-4 border-b md:border-b-0 md:border-r border-line bg-red-500/5">{original}</div>
      <div className="p-4 bg-emerald-500/5">{modified}</div>
    </div>
  );
}
