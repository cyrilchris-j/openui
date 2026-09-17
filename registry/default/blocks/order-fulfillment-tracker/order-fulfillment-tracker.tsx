"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function OrderFulfillmentTracker({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("w-full max-w-2xl mx-auto p-6 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm font-mono text-xs", className)} {...props}>
      <div className="flex justify-between items-center pb-4 border-b border-neutral-200 dark:border-neutral-800">
        <div>
          <div className="font-bold text-neutral-900 dark:text-white">Order #OPUI-9842</div>
          <div className="text-neutral-400 text-[11px]">Carrier: DHL Express (Track: 894204812)</div>
        </div>
        <span className="text-emerald-500 font-bold">In Transit</span>
      </div>
      <div className="mt-6 space-y-4">
        <div className="flex gap-3">
          <span className="text-emerald-500 font-bold">✓</span>
          <div>
            <div className="font-bold text-neutral-900 dark:text-white">Order Received & Paid</div>
            <div className="text-neutral-400 text-[11px]">Sep 16, 14:00 UTC</div>
          </div>
        </div>
        <div className="flex gap-3">
          <span className="text-emerald-500 font-bold">✓</span>
          <div>
            <div className="font-bold text-neutral-900 dark:text-white">Dispatched from Hub</div>
            <div className="text-neutral-400 text-[11px]">Sep 17, 09:30 UTC</div>
          </div>
        </div>
        <div className="flex gap-3">
          <span className="text-amber-500 font-bold">●</span>
          <div>
            <div className="font-bold text-neutral-900 dark:text-white">Out for Delivery</div>
            <div className="text-neutral-400 text-[11px]">Expected Today before 18:00</div>
          </div>
        </div>
      </div>
    </div>
  );
}
