"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface RubberbandPullRefreshProps {
  className?: string;
}

export function RubberbandPullRefresh({ className }: RubberbandPullRefreshProps) {
  const [pull, setPull] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const triggerRefresh = () => {
    setRefreshing(true);
    setPull(40);
    setTimeout(() => {
      setRefreshing(false);
      setPull(0);
    }, 1000);
  };

  return (
    <div className={cn("relative h-64 w-full max-w-sm overflow-hidden rounded-xl border border-line bg-paper p-4 shadow-sm", className)}>
      <div className="flex justify-between items-center pb-3 border-b border-line">
        <span className="font-mono text-xs text-ink/60">FEED REFRESH</span>
        <button
          type="button"
          onClick={triggerRefresh}
          className="rounded border border-line px-2 py-0.5 font-mono text-[10px] text-ink hover:bg-line/20"
        >
          {refreshing ? "Syncing..." : "Simulate Pull"}
        </button>
      </div>

      <div
        className="mt-4 space-y-2 transition-transform duration-200"
        style={{ transform: `translateY(${pull}px)` }}
      >
        <div className="rounded border border-line bg-line/10 p-3 font-mono text-xs text-ink">
          Feed item #1092 - Realtime status verified
        </div>
        <div className="rounded border border-line bg-line/10 p-3 font-mono text-xs text-ink">
          Feed item #1093 - Block signature accepted
        </div>
      </div>
    </div>
  );
}

export default RubberbandPullRefresh;
