"use client";

import { cn } from "@/lib/cn";

export interface SplitCodeDocumentationProps extends React.HTMLAttributes<HTMLDivElement> {
  prose?: React.ReactNode;
  code?: React.ReactNode;
}

export function SplitCodeDocumentation({ prose, code, className, ...props }: SplitCodeDocumentationProps) {
  return (
    <div className={cn("grid grid-cols-1 lg:grid-cols-2 min-h-[360px] w-full border border-line rounded-xl overflow-hidden font-sans", className)} {...props}>
      <div className="p-6 bg-paper space-y-3">{prose}</div>
      <div className="p-6 bg-slate-950 text-white font-mono text-xs overflow-x-auto">{code}</div>
    </div>
  );
}
