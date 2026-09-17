"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface CollapsibleDetailsCardProps {
  className?: string;
}

export function CollapsibleDetailsCard({ className }: CollapsibleDetailsCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("w-full max-w-xs rounded-xl border border-line bg-paper p-4 shadow-sm font-mono text-xs", className)}>
      <div className="flex justify-between items-center cursor-pointer" onClick={() => setOpen((o) => !o)}>
        <span className="font-bold text-ink">Package Artifacts</span>
        <span>{open ? "▲" : "▼"}</span>
      </div>
      {open && (
        <div className="mt-3 border-t border-line pt-2 text-[10px] text-ink/70 space-y-1">
          <div>• index.js (1.4 kB)</div>
          <div>• index.d.ts (820 B)</div>
        </div>
      )}
    </div>
  );
}

export default CollapsibleDetailsCard;
