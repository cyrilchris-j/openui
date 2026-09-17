"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function InvoiceGeneratorPreview({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("w-full max-w-2xl mx-auto p-8 bg-white dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-xl font-mono text-xs shadow-sm", className)} {...props}>
      <div className="flex justify-between items-start pb-6 border-b border-neutral-300 dark:border-neutral-800">
        <div>
          <h2 className="text-lg font-bold text-neutral-900 dark:text-white">INVOICE</h2>
          <div className="text-neutral-500">INV-2026-09-800</div>
        </div>
        <div className="text-right text-neutral-500">
          <div>Date: 2026-09-18</div>
          <div>Due: Upon Receipt</div>
        </div>
      </div>

      <div className="py-6 border-b border-neutral-200 dark:border-neutral-800 space-y-2">
        <div className="flex justify-between font-bold">
          <span>Item</span>
          <span>Amount</span>
        </div>
        <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
          <span>OpenUI Enterprise License (Annual)</span>
          <span>$1,908.00</span>
        </div>
      </div>

      <div className="pt-4 flex justify-between text-base font-bold text-neutral-900 dark:text-white">
        <span>Total Due</span>
        <span>$1,908.00</span>
      </div>
    </div>
  );
}
