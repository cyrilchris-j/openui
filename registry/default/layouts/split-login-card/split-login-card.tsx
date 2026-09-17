"use client";

import { cn } from "@/lib/cn";

export interface SplitLoginCardProps extends React.HTMLAttributes<HTMLDivElement> {
  graphic?: React.ReactNode;
  form?: React.ReactNode;
}

export function SplitLoginCard({ graphic, form, className, ...props }: SplitLoginCardProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 max-w-xl mx-auto rounded-3xl border border-line bg-paper overflow-hidden font-sans shadow-lg", className)} {...props}>
      <div className="p-6 bg-surface/50 border-b md:border-b-0 md:border-r border-line flex items-center justify-center">{graphic}</div>
      <div className="p-6 space-y-3">{form}</div>
    </div>
  );
}
