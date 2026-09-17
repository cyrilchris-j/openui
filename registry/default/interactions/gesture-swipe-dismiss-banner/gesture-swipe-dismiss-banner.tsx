"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface GestureSwipeDismissBannerProps {
  className?: string;
}

export function GestureSwipeDismissBanner({ className }: GestureSwipeDismissBannerProps) {
  const [dismissed, setDismissed] = useState(false);

  return (
    <div className={cn("w-full max-w-sm", className)}>
      {!dismissed ? (
        <div className="flex items-center justify-between rounded-xl border border-line bg-line/20 p-4 shadow-sm">
          <span className="font-mono text-xs text-ink">System maintenance scheduled for 02:00 UTC</span>
          <button
            type="button"
            onClick={() => setDismissed(true)}
            className="font-mono text-xs font-bold text-ink/60 hover:text-ink ml-2"
          >
            ✕
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setDismissed(false)}
          className="font-mono text-xs text-ink/50 hover:underline text-center w-full block"
        >
          Restore Banner
        </button>
      )}
    </div>
  );
}

export default GestureSwipeDismissBanner;
