"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function CouponDiscountManager({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const coupons = [
    { code: "LAUNCH800", discount: "20% OFF", used: 142, status: "Active" },
    { code: "STUDENT50", discount: "50% OFF", used: 890, status: "Active" },
  ];

  return (
    <div className={cn("w-full max-w-3xl mx-auto p-6 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl font-mono text-xs shadow-sm", className)} {...props}>
      <div className="flex justify-between items-center pb-4 border-b border-neutral-200 dark:border-neutral-800 mb-4">
        <h3 className="font-bold text-neutral-900 dark:text-white">Active Promo Discounts</h3>
        <button type="button" className="px-3 py-1 bg-emerald-600 text-white rounded font-bold text-[11px]">
          Create Code
        </button>
      </div>
      <div className="divide-y divide-neutral-200 dark:divide-neutral-800 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden">
        {coupons.map((c) => (
          <div key={c.code} className="p-3 flex items-center justify-between">
            <div>
              <span className="font-bold text-neutral-900 dark:text-white">{c.code}</span>
              <span className="text-emerald-600 dark:text-emerald-400 ml-3 font-semibold">{c.discount}</span>
            </div>
            <span className="text-neutral-400">{c.used} redemptions</span>
          </div>
        ))}
      </div>
    </div>
  );
}
