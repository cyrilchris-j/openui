"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function EcommerceDiscountRuleBuilder({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("w-full max-w-md mx-auto p-5 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm text-xs", className)} {...props}>
      <h3 className="font-bold text-neutral-900 dark:text-white mb-2">Automatic Order Rule</h3>
      <p className="text-neutral-500 mb-4">IF cart total &gt; $100 THEN apply free priority shipping.</p>
      <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 font-semibold font-mono">
        Active in Production ✓
      </div>
    </div>
  );
}
