"use client";

import { cn } from "@/lib/cn";

export interface SplitReadingDictionaryProps extends React.HTMLAttributes<HTMLDivElement> {
  terms?: React.ReactNode;
  definition?: React.ReactNode;
}

export function SplitReadingDictionary({ terms, definition, className, ...props }: SplitReadingDictionaryProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-12 min-h-[320px] w-full border border-line rounded-xl overflow-hidden font-serif", className)} {...props}>
      <div className="md:col-span-4 border-b md:border-b-0 md:border-r border-line p-4 bg-surface/30 space-y-2">{terms}</div>
      <div className="md:col-span-8 p-6 bg-paper">{definition}</div>
    </div>
  );
}
