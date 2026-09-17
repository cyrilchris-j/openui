"use client";

import { cn } from "@/lib/cn";

export interface SplitInvoiceLedgerProps extends React.HTMLAttributes<HTMLDivElement> {
  clientInfo?: React.ReactNode;
  lineItems?: React.ReactNode;
}

export function SplitInvoiceLedger({ clientInfo, lineItems, className, ...props }: SplitInvoiceLedgerProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-12 gap-6 max-w-4xl mx-auto p-6 rounded-2xl border border-line bg-paper font-mono text-xs shadow-sm", className)} {...props}>
      <div className="md:col-span-4 border-b md:border-b-0 md:border-r border-line pb-4 md:pb-0 md:pr-6 space-y-3">{clientInfo}</div>
      <div className="md:col-span-8 space-y-4">{lineItems}</div>
    </div>
  );
}
