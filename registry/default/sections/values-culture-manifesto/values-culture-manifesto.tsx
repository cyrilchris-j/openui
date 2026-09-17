"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function ValuesCultureManifesto({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const principles = [
    { title: "Zero Dependency Invariants", body: "Third-party runtime bloat is a liability. Every primitive compiles to clean, vanilla standard React." },
    { title: "Deterministic Verification", body: "If it cannot be type-checked, schema-validated, or automatically tested, it does not ship." },
    { title: "Local Ownership", body: "Engineers should own their code. Never surrender styling flexibility to sealed vendor modules." },
  ];

  return (
    <section className={cn("w-full py-16 px-4 max-w-5xl mx-auto", className)} {...props}>
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="text-3xl font-serif text-neutral-900 dark:text-neutral-100">Our Engineering Creed</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {principles.map((p) => (
          <div key={p.title} className="p-6 rounded-2xl bg-stone-50 dark:bg-neutral-900 border border-stone-200 dark:border-neutral-800">
            <h3 className="font-serif font-bold text-neutral-900 dark:text-neutral-100">{p.title}</h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-2 leading-relaxed">{p.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
