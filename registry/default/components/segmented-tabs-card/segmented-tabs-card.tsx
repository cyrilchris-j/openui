"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface SegmentedTabsCardProps {
  className?: string;
}

export function SegmentedTabsCard({ className }: SegmentedTabsCardProps) {
  const [tab, setTab] = useState(0);
  const tabs = ["Metrics", "Logs"];

  return (
    <div className={cn("w-full max-w-sm rounded-xl border border-line bg-paper shadow-sm overflow-hidden font-mono text-xs", className)}>
      <div className="flex justify-between items-center p-3 border-b border-line bg-line/10">
        <span className="font-bold text-ink uppercase">PANEL VIEW</span>
        <div className="flex rounded-lg border border-line bg-paper p-0.5">
          {tabs.map((t, idx) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(idx)}
              className={cn("px-2.5 py-0.5 rounded text-[11px] font-semibold", tab === idx && "bg-ink text-paper")}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 text-ink/70">
        {tab === 0 ? "Throughput: 4,200 req/sec | Latency: 12ms" : "02:14:09 [INFO] Cluster sync verified."}
      </div>
    </div>
  );
}

export default SegmentedTabsCard;
