"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function BillingSubscriptionManager({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const invoices = [
    { id: "INV-2026-09", date: "Sep 01, 2026", amount: "$49.00", status: "Paid" },
    { id: "INV-2026-08", date: "Aug 01, 2026", amount: "$49.00", status: "Paid" },
    { id: "INV-2026-07", date: "Jul 01, 2026", amount: "$49.00", status: "Paid" },
  ];

  return (
    <div className={cn("w-full max-w-4xl mx-auto p-6 space-y-6 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl", className)} {...props}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200 dark:border-neutral-800">
        <div>
          <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">Subscription & Billing</h3>
          <p className="text-xs text-neutral-500">Manage payment methods, tiers, and tax identifiers.</p>
        </div>
        <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
          ● Pro Plan Active
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30">
          <div className="text-xs font-mono text-neutral-400">Current Cycle</div>
          <div className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mt-1">$49.00 / month</div>
          <div className="text-xs text-neutral-500 mt-1">Renews automatically on October 1, 2026</div>
        </div>
        <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/30">
          <div className="text-xs font-mono text-neutral-400">Payment Method</div>
          <div className="text-sm font-bold text-neutral-900 dark:text-neutral-100 mt-1">Visa ending in 4242</div>
          <div className="text-xs text-neutral-500 mt-1">Expires 12/28 • Default billing card</div>
        </div>
      </div>

      <div>
        <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-bold mb-3">Invoice Receipts</h4>
        <div className="divide-y divide-neutral-200 dark:divide-neutral-800 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden text-xs">
          {invoices.map((inv) => (
            <div key={inv.id} className="p-3 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="font-mono font-medium text-neutral-900 dark:text-neutral-100">{inv.id}</span>
                <span className="text-neutral-400">{inv.date}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono font-bold">{inv.amount}</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">✓ {inv.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
