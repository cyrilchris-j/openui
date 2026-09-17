"use client";

import { cn } from "@/lib/cn";

export interface SplitAuthLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  mural?: React.ReactNode;
  form?: React.ReactNode;
}

export function SplitAuthLayout({ mural, form, className, ...props }: SplitAuthLayoutProps) {
  return (
    <div className={cn("grid grid-cols-1 lg:grid-cols-2 min-h-[380px] w-full border border-line rounded-2xl overflow-hidden font-sans", className)} {...props}>
      <div className="p-8 bg-surface/50 border-b lg:border-b-0 lg:border-r border-line flex items-center justify-center">{mural}</div>
      <div className="p-8 flex items-center justify-center bg-paper">{form}</div>
    </div>
  );
}
