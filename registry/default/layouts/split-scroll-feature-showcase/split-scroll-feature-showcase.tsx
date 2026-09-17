"use client";

import { cn } from "@/lib/cn";

export interface SplitScrollFeatureShowcaseProps extends React.HTMLAttributes<HTMLDivElement> {
  canvas?: React.ReactNode;
  children?: React.ReactNode;
}

export function SplitScrollFeatureShowcase({ canvas, children, className, ...props }: SplitScrollFeatureShowcaseProps) {
  return (
    <div className={cn("grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto p-6 font-sans items-start", className)} {...props}>
      <div className="lg:sticky lg:top-8 h-64 lg:h-80 rounded-2xl border border-line bg-surface/40 flex items-center justify-center p-6">{canvas}</div>
      <div className="space-y-12 py-6">{children}</div>
    </div>
  );
}
