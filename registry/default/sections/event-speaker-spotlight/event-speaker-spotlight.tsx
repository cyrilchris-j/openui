"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function EventSpeakerSpotlight({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const speakers = [
    { name: "Cyril Chris", title: "Keynote: Zero Runtime Overhead", org: "OpenUI" },
    { name: "Elena Rostova", title: "Math of Design Tokens", org: "Design Rigor" },
    { name: "Marcus Vance", title: "Deterministic Component Schemas", org: "VerifyLabs" },
  ];

  return (
    <section className={cn("w-full py-16 px-4 max-w-5xl mx-auto", className)} {...props}>
      <h3 className="text-2xl font-bold text-center text-neutral-900 dark:text-white mb-8">Featured Speakers</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {speakers.map((s) => (
          <div key={s.name} className="p-6 rounded-xl border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-neutral-950">
            <h4 className="text-base font-bold text-neutral-900 dark:text-white">{s.name}</h4>
            <div className="text-xs font-mono text-neutral-400">{s.org}</div>
            <p className="text-xs font-medium text-neutral-700 dark:text-neutral-300 mt-4">{s.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
