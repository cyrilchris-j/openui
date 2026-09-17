"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface ExpandableLogTileProps {
  className?: string;
}

export function ExpandableLogTile({ className }: ExpandableLogTileProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("w-full max-w-md rounded-xl border border-line bg-paper overflow-hidden font-mono text-xs shadow-sm", className)}>
      <div
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-between p-3.5 cursor-pointer hover:bg-line/10"
      >
        <span className="text-emerald-600 font-bold">[INFO] 200 OK</span>
        <span className="text-ink/60">GET /r/components/button.json</span>
        <span>{open ? "▲" : "▼"}</span>
      </div>
      {open && (
        <div className="border-t border-line bg-ink text-paper p-3 text-[10px] space-y-0.5">
          <div>timestamp: 2026-09-17T23:59:00Z</div>
          <div>latency: 18ms</div>
          <div>region: fra1</div>
        </div>
      )}
    </div>
  );
}

export default ExpandableLogTile;
