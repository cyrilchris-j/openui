"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export interface ReleaseEntry {
  version: string;
  date: string;
  highlight: string;
  changes: { type: "feature" | "fix" | "breaking"; text: string }[];
}

export interface ChangelogReleaseFeedProps extends React.HTMLAttributes<HTMLElement> {
  releases?: ReleaseEntry[];
}

const DEFAULT_RELEASES: ReleaseEntry[] = [
  {
    version: "v2.4.0",
    date: "September 16, 2026",
    highlight: "Zero-bundle CSS variables engine and Next.js 15.2 Server Action support.",
    changes: [
      { type: "feature", text: "Added CSS-variable color token synchronization API" },
      { type: "fix", text: "Resolved hydration mismatch in SSR popover controllers" },
      { type: "breaking", text: "Renamed macroStructure prop to macrostructure in RegistrySchema" },
    ],
  },
  {
    version: "v2.3.1",
    date: "August 28, 2026",
    highlight: "Critical patch for touch gesture panning on Safari iOS 19.",
    changes: [
      { type: "fix", text: "Fixed momentum scroll inertia lock on mobile drawer" },
      { type: "feature", text: "Added keyboard shortcut Alt+K to quick command palette" },
    ],
  },
];

export function ChangelogReleaseFeed({
  releases = DEFAULT_RELEASES,
  className,
  ...props
}: ChangelogReleaseFeedProps) {
  return (
    <section className={cn("w-full py-16 px-4 md:px-8 max-w-4xl mx-auto", className)} {...props}>
      <div className="mb-12">
        <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 font-semibold">
          Updates & Notes
        </span>
        <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mt-1">
          Product Changelog
        </h2>
      </div>

      <div className="space-y-12">
        {releases.map((rel) => (
          <div key={rel.version} className="border-l-2 border-neutral-200 dark:border-neutral-800 pl-6 relative">
            <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-white dark:bg-neutral-950 border-2 border-neutral-900 dark:border-neutral-100" />
            <div className="flex items-baseline gap-3">
              <span className="text-lg font-mono font-bold text-neutral-900 dark:text-neutral-100">
                {rel.version}
              </span>
              <span className="text-xs text-neutral-400 font-mono">{rel.date}</span>
            </div>
            <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mt-2">
              {rel.highlight}
            </p>
            <div className="mt-4 space-y-2">
              {rel.changes.map((change, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs">
                  <span
                    className={cn(
                      "px-1.5 py-0.5 rounded text-[10px] font-mono uppercase font-bold",
                      change.type === "feature" && "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300",
                      change.type === "fix" && "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300",
                      change.type === "breaking" && "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                    )}
                  >
                    {change.type}
                  </span>
                  <span className="text-neutral-600 dark:text-neutral-400">{change.text}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
