"use client";

import { cn } from "@/lib/cn";

export interface MasterDetailSplitProps extends React.HTMLAttributes<HTMLDivElement> {
  master?: React.ReactNode;
  detail?: React.ReactNode;
}

export function MasterDetailSplit({ master, detail, className, ...props }: MasterDetailSplitProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-12 min-h-[360px] w-full border border-line rounded-xl overflow-hidden font-sans", className)} {...props}>
      <div className="md:col-span-4 border-b md:border-b-0 md:border-r border-line p-3 bg-surface/20">{master}</div>
      <div className="md:col-span-8 p-6 bg-paper">{detail}</div>
    </div>
  );
}
