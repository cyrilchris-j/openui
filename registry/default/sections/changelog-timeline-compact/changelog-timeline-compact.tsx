"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export interface CompactRelease {
  version: string;
  date: string;
  summary: string;
}

export interface ChangelogTimelineCompactProps extends React.HTMLAttributes<HTMLElement> {
  releases?: CompactRelease[];
}

const DEFAULT_RELEASES: CompactRelease[] = [
  { version: "v2.4.1", date: "Today", summary: "Patched slot property collision on HTMLDivElement wrappers." },
  { version: "v2.4.0", date: "Yesterday", summary: "Added full 800-resource automated verification pipeline." },
  { version: "v2.3.9", date: "Sep 12", summary: "Added air-gapped registry bundle tarball export command." },
];

export function ChangelogTimelineCompact({
  releases = DEFAULT_RELEASES,
  className,
  ...props
}: ChangelogTimelineCompactProps) {
  return (
    <section className={cn("w-full py-12 px-4 max-w-2xl mx-auto", className)} {...props}>
      <h3 className="text-sm font-mono uppercase tracking-widest text-neutral-400 font-bold mb-6">
        Recent Builds
      </h3>
      <div className="border-l border-neutral-200 dark:border-neutral-800 pl-4 space-y-6">
        {releases.map((r) => (
          <div key={r.version} className="relative">
            <div className="absolute -left-[21px] top-1.5 h-2.5 w-2.5 rounded-full bg-neutral-900 dark:bg-neutral-100" />
            <div className="flex items-baseline gap-2">
              <span className="text-xs font-mono font-bold text-neutral-900 dark:text-neutral-100">{r.version}</span>
              <span className="text-[10px] font-mono text-neutral-400">{r.date}</span>
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">{r.summary}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
