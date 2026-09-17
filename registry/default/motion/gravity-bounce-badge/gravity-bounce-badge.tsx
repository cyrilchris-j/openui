"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface GravityBounceBadgeProps {
  className?: string;
}

export function GravityBounceBadge({ className }: GravityBounceBadgeProps) {
  const [bouncing, setBouncing] = useState(false);

  const drop = () => {
    setBouncing(true);
    setTimeout(() => setBouncing(false), 600);
  };

  return (
    <div className={cn("inline-flex flex-col items-center gap-4 rounded-xl border border-line bg-paper p-6 shadow-sm", className)}>
      <div className="h-16 flex items-end">
        <span
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-full bg-red-500 font-mono text-xs font-bold text-white shadow-lg",
            bouncing && "animate-bounce"
          )}
        >
          1
        </span>
      </div>

      <button
        type="button"
        onClick={drop}
        className="rounded border border-line px-3 py-1 font-mono text-xs text-ink hover:bg-line/20"
      >
        Trigger Drop
      </button>
    </div>
  );
}

export default GravityBounceBadge;
