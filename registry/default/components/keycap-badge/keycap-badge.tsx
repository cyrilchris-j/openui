"use client";

import { cn } from "@/lib/cn";

export interface KeycapBadgeProps {
  keyLabel?: string;
  className?: string;
}

export function KeycapBadge({ keyLabel = "ESC", className }: KeycapBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded border border-line bg-paper px-2.5 py-1 font-mono text-xs font-bold text-ink shadow-[0_3px_0_0_rgba(0,0,0,0.15)] active:translate-y-0.5 active:shadow-none select-none",
        className
      )}
    >
      {keyLabel}
    </span>
  );
}

export default KeycapBadge;
