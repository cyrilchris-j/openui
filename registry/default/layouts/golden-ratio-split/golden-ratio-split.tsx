"use client";

import { cn } from "@/lib/cn";

export interface GoldenRatioSplitProps extends React.HTMLAttributes<HTMLDivElement> {
  major?: React.ReactNode;
  minor?: React.ReactNode;
}

export function GoldenRatioSplit({ major, minor, className, ...props }: GoldenRatioSplitProps) {
  return (
    <div className={cn("grid grid-cols-1 lg:grid-cols-[1.618fr_1fr] gap-8 max-w-5xl mx-auto p-6 font-sans items-start", className)} {...props}>
      <div className="min-w-0">{major}</div>
      <div className="border-t lg:border-t-0 lg:border-l border-line pt-6 lg:pt-0 lg:pl-8">{minor}</div>
    </div>
  );
}
