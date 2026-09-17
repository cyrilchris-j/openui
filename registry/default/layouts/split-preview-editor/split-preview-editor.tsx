"use client";

import { cn } from "@/lib/cn";

export interface SplitPreviewEditorProps extends React.HTMLAttributes<HTMLDivElement> {
  editor?: React.ReactNode;
  preview?: React.ReactNode;
}

export function SplitPreviewEditor({ editor, preview, className, ...props }: SplitPreviewEditorProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 min-h-[360px] w-full border border-line rounded-xl overflow-hidden font-sans", className)} {...props}>
      <div className="p-4 border-b md:border-b-0 md:border-r border-line bg-surface/40 font-mono text-xs">{editor}</div>
      <div className="p-4 bg-paper flex items-center justify-center">{preview}</div>
    </div>
  );
}
