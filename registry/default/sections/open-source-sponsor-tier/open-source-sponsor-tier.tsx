"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function OpenSourceSponsorTier({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const tiers = [
    { name: "Backer", price: "$10/mo", desc: "Support ongoing maintenance" },
    { name: "Sponsor", price: "$50/mo", desc: "Logo on README & docs" },
    { name: "Enterprise Partner", price: "$500/mo", desc: "Direct priority issue triage" },
  ];

  return (
    <section className={cn("w-full py-16 px-4 max-w-4xl mx-auto text-center", className)} {...props}>
      <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">Support Open Source</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tiers.map((t) => (
          <div key={t.name} className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
            <h4 className="text-sm font-bold text-neutral-900 dark:text-white">{t.name}</h4>
            <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">{t.price}</div>
            <p className="text-xs text-neutral-500 mt-2">{t.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
