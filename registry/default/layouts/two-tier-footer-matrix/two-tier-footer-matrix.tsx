"use client";

import { cn } from "@/lib/cn";

export interface TwoTierFooterMatrixProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: React.ReactNode;
  legal?: React.ReactNode;
}

export function TwoTierFooterMatrix({ columns, legal, className, ...props }: TwoTierFooterMatrixProps) {
  return (
    <footer className={cn("w-full border-t border-line bg-paper text-ink font-sans", className)} {...props}>
      <div className="max-w-5xl mx-auto p-8 border-b border-line/60 grid grid-cols-2 md:grid-cols-4 gap-6 text-xs">{columns}</div>
      <div className="max-w-5xl mx-auto px-8 py-4 flex flex-col sm:flex-row justify-between text-[11px] text-ink/60 font-mono">{legal}</div>
    </footer>
  );
}
