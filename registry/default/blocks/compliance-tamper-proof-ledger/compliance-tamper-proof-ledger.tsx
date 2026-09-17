"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function ComplianceTamperProofLedger({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("w-full max-w-3xl mx-auto p-5 bg-neutral-950 text-neutral-100 border border-neutral-800 rounded-xl font-mono text-xs shadow-sm", className)} {...props}>
      <h3 className="font-bold text-white mb-3">Tamper-Proof Merkle Ledger</h3>
      <div className="space-y-2 text-[11px]">
        <div className="p-3 bg-neutral-900 rounded border border-neutral-800 flex justify-between">
          <span>Block #48201</span>
          <span className="text-emerald-400">hash: 9a204b... Verified ✓</span>
        </div>
        <div className="p-3 bg-neutral-900 rounded border border-neutral-800 flex justify-between">
          <span>Block #48202</span>
          <span className="text-emerald-400">hash: f4810c... Verified ✓</span>
        </div>
      </div>
    </div>
  );
}
