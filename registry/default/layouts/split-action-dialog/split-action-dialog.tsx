"use client";

import { cn } from "@/lib/cn";

export interface SplitActionDialogProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "content"> {
  visual?: React.ReactNode;
  content?: React.ReactNode;
}

export function SplitActionDialog({ visual, content, className, ...props }: SplitActionDialogProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 max-w-xl mx-auto rounded-2xl border border-line bg-paper overflow-hidden shadow-xl font-sans", className)} {...props}>
      <div className="p-6 bg-surface/50 border-b md:border-b-0 md:border-r border-line flex items-center justify-center">{visual}</div>
      <div className="p-6 flex flex-col justify-between space-y-4">{content}</div>
    </div>
  );
}
