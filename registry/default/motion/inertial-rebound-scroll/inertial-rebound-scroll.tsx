"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface InertialReboundScrollProps {
  className?: string;
}

export function InertialReboundScroll({ className }: InertialReboundScrollProps) {
  const [bounce, setBounce] = useState(0);

  const triggerBounce = () => {
    setBounce(-30);
    setTimeout(() => setBounce(15), 150);
    setTimeout(() => setBounce(0), 300);
  };

  return (
    <div className={cn("relative h-72 w-full max-w-sm rounded-xl border border-line bg-paper p-4 shadow-sm", className)}>
      <div className="flex justify-between items-center pb-3 border-b border-line">
        <span className="font-mono text-xs text-ink/60">INERTIAL FEED</span>
        <button
          type="button"
          onClick={triggerBounce}
          className="rounded border border-line px-2 py-0.5 font-mono text-[10px] text-ink hover:bg-line/20"
        >
          Overscroll
        </button>
      </div>

      <div
        className="mt-3 space-y-2 transition-transform duration-200 ease-out"
        style={{ transform: `translateY(${bounce}px)` }}
      >
        {["Transaction #8901 - Verified", "Block #14209 - Confirmed", "Peer Heartbeat - Active", "State Sync - 100%"].map((item, i) => (
          <div key={i} className="rounded-lg border border-line bg-line/10 p-3 font-mono text-xs text-ink">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export default InertialReboundScroll;
