"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export interface MatrixRow {
  name: string;
  starter: boolean | string;
  pro: boolean | string;
  enterprise: boolean | string;
}

export interface ProductFeatureMatrixProps extends React.HTMLAttributes<HTMLElement> {
  rows?: MatrixRow[];
}

const DEFAULT_ROWS: MatrixRow[] = [
  { name: "Full 800 Catalog Access", starter: true, pro: true, enterprise: true },
  { name: "CLI Generator Tooling", starter: true, pro: true, enterprise: true },
  { name: "Zero-bundle CSS Engine", starter: true, pro: true, enterprise: true },
  { name: "Private Air-gapped Mirror", starter: false, pro: true, enterprise: true },
  { name: "Dedicated Slack Support", starter: false, pro: "Business Hours", enterprise: "24/7/365 Dedicated" },
  { name: "Custom SSO & SAML Provisioning", starter: false, pro: false, enterprise: true },
  { name: "Custom Component Audits", starter: false, pro: false, enterprise: "Quarterly Review" },
];

export function ProductFeatureMatrix({
  rows = DEFAULT_ROWS,
  className,
  ...props
}: ProductFeatureMatrixProps) {
  return (
    <section className={cn("w-full py-16 px-4 md:px-8 max-w-5xl mx-auto", className)} {...props}>
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
          Feature Matrix by Plan
        </h2>
        <p className="text-xs text-neutral-500 mt-2">
          Compare core capabilities and SLA guarantees across all plan tiers.
        </p>
      </div>

      <div className="border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden bg-white dark:bg-neutral-950">
        <div className="grid grid-cols-12 bg-neutral-50 dark:bg-neutral-900 p-4 font-mono text-xs font-bold border-b border-neutral-200 dark:border-neutral-800">
          <div className="col-span-6 text-neutral-500 uppercase">Capability</div>
          <div className="col-span-2 text-center text-neutral-600 dark:text-neutral-400">Starter</div>
          <div className="col-span-2 text-center text-emerald-600 dark:text-emerald-400">Pro</div>
          <div className="col-span-2 text-center text-neutral-900 dark:text-neutral-100">Enterprise</div>
        </div>

        <div className="divide-y divide-neutral-100 dark:divide-neutral-800 text-xs">
          {rows.map((row, idx) => (
            <div key={idx} className="grid grid-cols-12 p-3.5 items-center">
              <div className="col-span-6 font-medium text-neutral-800 dark:text-neutral-200">
                {row.name}
              </div>
              <div className="col-span-2 text-center text-neutral-500">
                {typeof row.starter === "boolean" ? (row.starter ? "✓" : "—") : row.starter}
              </div>
              <div className="col-span-2 text-center font-semibold text-emerald-600 dark:text-emerald-400">
                {typeof row.pro === "boolean" ? (row.pro ? "✓" : "—") : row.pro}
              </div>
              <div className="col-span-2 text-center font-bold text-neutral-900 dark:text-neutral-100">
                {typeof row.enterprise === "boolean" ? (row.enterprise ? "✓" : "—") : row.enterprise}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
