"use client";

import { cn } from "@/lib/cn";

export interface SplitFeatureChecklistProps extends React.HTMLAttributes<HTMLDivElement> {
  pitch?: React.ReactNode;
  checks?: string[];
}

export function SplitFeatureChecklist({
  pitch,
  checks = [
    "Zero external UI framework dependencies",
    "Verified against closed design DNA types",
    "Pre-computed behavioural fingerprints",
  ],
  className,
  ...props
}: SplitFeatureChecklistProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto p-6 font-sans items-center", className)} {...props}>
      <div>{pitch}</div>
      <ul className="space-y-3 font-mono text-xs">
        {checks.map((c) => (
          <li key={c} className="flex items-center gap-2 text-ink/80">
            <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-600 flex items-center justify-center font-bold text-[10px]">✓</span>
            <span>{c}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
