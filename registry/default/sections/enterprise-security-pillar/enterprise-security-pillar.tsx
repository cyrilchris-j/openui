"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export interface SecurityPillarItem {
  code: string;
  name: string;
  auditPeriod: string;
  status: "Certified" | "Verified" | "Compliant";
}

export interface EnterpriseSecurityPillarProps extends React.HTMLAttributes<HTMLElement> {
  headline?: string;
  description?: string;
  pillars?: SecurityPillarItem[];
}

const DEFAULT_PILLARS: SecurityPillarItem[] = [
  { code: "SOC-2-TYPE-II", name: "Security & Confidentiality", auditPeriod: "2025 Annual Audit", status: "Certified" },
  { code: "ISO-27001", name: "Information Security Management", auditPeriod: "Accredited Bureau", status: "Certified" },
  { code: "HIPAA-BAA", name: "Health Data Protection", auditPeriod: "End-to-End Encrypted", status: "Compliant" },
  { code: "GDPR-APPR", name: "Data Sovereignty & EU Storage", auditPeriod: "Frankfurt / Dublin", status: "Verified" },
];

export function EnterpriseSecurityPillar({
  headline = "Bank-grade enterprise security by default",
  description = "Every line of code and packet stream adheres to strict zero-trust operational protocols audited by third parties.",
  pillars = DEFAULT_PILLARS,
  className,
  ...props
}: EnterpriseSecurityPillarProps) {
  return (
    <section className={cn("w-full py-16 px-4 md:px-8 max-w-6xl mx-auto", className)} {...props}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-5">
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 font-bold">
            Assurance & Governance
          </span>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mt-2">
            {headline}
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-4 leading-relaxed">
            {description}
          </p>
          <div className="mt-6 flex items-center gap-3 text-xs font-mono text-neutral-500">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Live penetration test results updated daily
          </div>
        </div>

        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {pillars.map((pillar) => (
            <div
              key={pillar.code}
              className="p-5 border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 rounded-lg flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-neutral-900 dark:text-neutral-100">
                    {pillar.code}
                  </span>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded">
                    {pillar.status}
                  </span>
                </div>
                <div className="text-xs text-neutral-600 dark:text-neutral-400 mt-2 font-medium">
                  {pillar.name}
                </div>
              </div>
              <div className="text-[10px] font-mono text-neutral-400 mt-4 pt-3 border-t border-neutral-200 dark:border-neutral-800">
                {pillar.auditPeriod}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
