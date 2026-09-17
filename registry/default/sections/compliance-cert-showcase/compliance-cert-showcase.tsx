"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function ComplianceCertShowcase({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const certs = ["SOC 2 Type II", "ISO / IEC 27001", "HIPAA Compliant", "GDPR Ready"];

  return (
    <section className={cn("w-full py-12 px-4 max-w-4xl mx-auto text-center", className)} {...props}>
      <div className="flex flex-wrap justify-center gap-4">
        {certs.map((c) => (
          <div key={c} className="px-4 py-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 text-xs font-semibold text-neutral-700 dark:text-neutral-300">
            ✓ {c}
          </div>
        ))}
      </div>
    </section>
  );
}
