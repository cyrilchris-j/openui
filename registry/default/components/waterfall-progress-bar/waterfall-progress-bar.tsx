"use client";

import { CheckCircle2, Clock } from "lucide-react";
import { cn } from "@/lib/cn";

export function WaterfallProgressBar({ className }: { className?: string }) {
  const stages = [
    { label: "DNS Resolution", ms: 42, pct: 15 },
    { label: "TLS Handshake", ms: 88, pct: 30 },
    { label: "First Byte (TTFB)", ms: 120, pct: 45 },
    { label: "Content Download", ms: 35, pct: 10 },
  ];

  return (
    <div className={cn("p-4 rounded-xl border border-line bg-paper max-w-sm w-full font-mono text-xs shadow-sm", className)}>
      <div className="flex items-center justify-between mb-3 text-ink">
        <span className="font-semibold">Network Latency</span>
        <span className="text-accent font-bold">285ms Total</span>
      </div>

      <div className="space-y-2">
        {stages.map((st) => (
          <div key={st.label}>
            <div className="flex items-center justify-between text-[11px] text-ink/70 mb-1">
              <span>{st.label}</span>
              <span>{st.ms}ms</span>
            </div>
            <div className="w-full h-1.5 bg-line rounded-full overflow-hidden">
              <div
                className="h-full bg-accent rounded-full"
                style={{ width: `${st.pct * 2}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
