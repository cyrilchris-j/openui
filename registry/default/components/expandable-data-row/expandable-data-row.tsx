"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface ExpandableDataRowProps {
  id?: string;
  status?: string;
  latency?: string;
  className?: string;
}

export function ExpandableDataRow({
  id = "REQ_80912_AF",
  status = "200 OK",
  latency = "24ms",
  className,
}: ExpandableDataRowProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("w-full max-w-md rounded-xl border border-line bg-paper overflow-hidden shadow-sm", className)}>
      <div
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-line/10 transition-colors font-mono text-xs"
      >
        <span className="font-bold text-ink">{id}</span>
        <div className="flex items-center gap-3">
          <span className="text-emerald-600 font-semibold">{status}</span>
          <span className="text-ink/50">{latency}</span>
          <span>{open ? "▲" : "▼"}</span>
        </div>
      </div>

      {open && (
        <div className="border-t border-line bg-line/10 p-4 font-mono text-[11px] text-ink/70 space-y-1">
          <div>content-type: application/json</div>
          <div>cache-control: public, max-age=31536000, immutable</div>
          <div>x-openui-worker-id: worker-fra-09</div>
        </div>
      )}
    </div>
  );
}

export default ExpandableDataRow;
