"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function CustomerInvoiceDisputeCard({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("w-full max-w-xl mx-auto p-6 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm text-xs", className)} {...props}>
      <div className="flex justify-between items-center pb-3 border-b border-neutral-200 dark:border-neutral-800 mb-4">
        <div>
          <h3 className="font-bold text-base text-neutral-900 dark:text-white">Dispute #DSP-9842</h3>
          <div className="text-neutral-500 text-[11px]">Invoice: $49.00 (Pro Monthly)</div>
        </div>
        <span className="px-2 py-0.5 rounded font-mono text-[10px] bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 font-bold">
          Under Review
        </span>
      </div>
      <p className="text-neutral-600 dark:text-neutral-400 mb-6">
        Customer requested refund stating accidental renewal charge prior to cancellation.
      </p>
      <div className="flex gap-3">
        <button type="button" className="flex-1 py-2 bg-emerald-600 text-white font-semibold rounded-lg">
          Approve Full Refund
        </button>
        <button type="button" className="flex-1 py-2 border border-neutral-200 dark:border-neutral-800 rounded-lg">
          Decline Request
        </button>
      </div>
    </div>
  );
}
