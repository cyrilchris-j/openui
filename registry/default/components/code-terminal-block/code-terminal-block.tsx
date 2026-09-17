"use client";

import { cn } from "@/lib/cn";

export interface CodeTerminalBlockProps {
  command?: string;
  output?: string;
  className?: string;
}

export function CodeTerminalBlock({
  command = "openui add metric-stat-card",
  output = "✓ Materialized 5 files to registry/default/components/metric-stat-card",
  className,
}: CodeTerminalBlockProps) {
  return (
    <div className={cn("w-full max-w-md rounded-xl border border-line bg-ink text-paper p-4 font-mono text-xs shadow-md space-y-2", className)}>
      <div className="flex items-center gap-2">
        <span className="text-emerald-400 font-bold">$</span>
        <span>{command}</span>
      </div>
      <div className="text-paper/60 text-[11px] leading-relaxed">{output}</div>
    </div>
  );
}

export default CodeTerminalBlock;
