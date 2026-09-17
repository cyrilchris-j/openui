"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function PricingEnterpriseInquiry({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section className={cn("w-full py-16 px-4 max-w-4xl mx-auto text-center", className)} {...props}>
      <div className="border border-neutral-200 dark:border-neutral-800 rounded-2xl p-8 bg-neutral-50 dark:bg-neutral-900/50">
        <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">Need a private registry mirror?</h3>
        <p className="text-xs text-neutral-500 mt-2 max-w-xl mx-auto">
          We offer on-premises air-gapped registry distribution with custom security assertions for regulated industries.
        </p>
        <button type="button" className="mt-6 px-6 py-2.5 rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 text-xs font-semibold">
          Contact Enterprise Sales →
        </button>
      </div>
    </section>
  );
}
