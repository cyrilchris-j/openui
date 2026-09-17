"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function CryptoWalletTransactionCard({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("w-full max-w-sm mx-auto p-6 bg-neutral-950 text-neutral-100 border border-neutral-800 rounded-2xl font-mono text-xs shadow-xl", className)} {...props}>
      <div className="text-neutral-400 text-[10px] uppercase">Wallet Balance</div>
      <div className="text-2xl font-bold text-white mt-1">4.8210 ETH</div>
      <div className="text-neutral-400 text-[11px] mt-0.5">≈ $12,480.20 USD</div>
      <div className="my-4 p-3 rounded bg-neutral-900 border border-neutral-800 text-[11px] text-emerald-400">
        Status: Confirmed (Block #19842010)
      </div>
      <button type="button" className="w-full py-2 bg-emerald-600 text-white font-bold rounded-lg">
        Send Transaction
      </button>
    </div>
  );
}
