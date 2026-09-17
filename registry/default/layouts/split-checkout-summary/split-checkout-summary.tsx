"use client";

import { cn } from "@/lib/cn";

export interface SplitCheckoutSummaryProps extends React.HTMLAttributes<HTMLDivElement> {
  form?: React.ReactNode;
  summary?: React.ReactNode;
}

export function SplitCheckoutSummary({ form, summary, className, ...props }: SplitCheckoutSummaryProps) {
  return (
    <div className={cn("grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto p-6 font-sans items-start", className)} {...props}>
      <div className="lg:col-span-7 space-y-4">{form}</div>
      <div className="lg:col-span-5 p-6 rounded-2xl border border-line bg-surface/30 space-y-4">{summary}</div>
    </div>
  );
}
