"use client";

import { cn } from "@/lib/cn";

export interface CommandSearchPillProps {
  placeholder?: string;
  className?: string;
}

export function CommandSearchPill({
  placeholder = "Search resources...",
  className,
}: CommandSearchPillProps) {
  return (
    <div className={cn("flex items-center justify-between rounded-full border border-line bg-paper px-4 py-2 w-64 shadow-sm cursor-pointer hover:border-ink transition-colors font-mono text-xs", className)}>
      <div className="flex items-center gap-2 text-ink/60">
        <span>🔍</span>
        <span>{placeholder}</span>
      </div>
      <span className="rounded bg-line/30 px-1.5 py-0.5 text-[9px] text-ink/50 font-bold">⌘K</span>
    </div>
  );
}

export default CommandSearchPill;
