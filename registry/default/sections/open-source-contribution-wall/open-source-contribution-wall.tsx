"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export interface Contributor {
  handle: string;
  contributions: number;
  avatarLetter: string;
}

export interface OpenSourceContributionWallProps extends React.HTMLAttributes<HTMLElement> {
  stars?: string;
  forks?: string;
  contributors?: Contributor[];
}

const DEFAULT_CONTRIBUTORS: Contributor[] = [
  { handle: "cyrilchris", contributions: 420, avatarLetter: "C" },
  { handle: "elena-r", contributions: 184, avatarLetter: "E" },
  { handle: "marcus_v", contributions: 98, avatarLetter: "M" },
  { handle: "devon_dev", contributions: 74, avatarLetter: "D" },
  { handle: "alex_cloud", contributions: 52, avatarLetter: "A" },
  { handle: "sara_design", contributions: 41, avatarLetter: "S" },
];

export function OpenSourceContributionWall({
  stars = "14.2k",
  forks = "1.8k",
  contributors = DEFAULT_CONTRIBUTORS,
  className,
  ...props
}: OpenSourceContributionWallProps) {
  return (
    <section className={cn("w-full py-16 px-4 md:px-8 max-w-5xl mx-auto", className)} {...props}>
      <div className="bg-neutral-950 text-neutral-100 border border-neutral-800 rounded-2xl p-6 md:p-10 font-mono">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-neutral-800">
          <div>
            <div className="text-xs uppercase tracking-widest text-emerald-400 font-bold">
              Community Driven
            </div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mt-1">
              Built in public by 200+ contributors
            </h2>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <div className="p-3 bg-neutral-900 border border-neutral-800 rounded text-center">
              <div className="text-lg font-bold text-white">{stars}</div>
              <div className="text-[10px] text-neutral-400">GitHub Stars</div>
            </div>
            <div className="p-3 bg-neutral-900 border border-neutral-800 rounded text-center">
              <div className="text-lg font-bold text-white">{forks}</div>
              <div className="text-[10px] text-neutral-400">Forks</div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="text-xs text-neutral-400 uppercase tracking-wider mb-4">
            Recent Code Contributors
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {contributors.map((c) => (
              <div
                key={c.handle}
                className="p-3 rounded bg-neutral-900/60 border border-neutral-800 flex items-center gap-3"
              >
                <div className="h-7 w-7 rounded-full bg-emerald-950 border border-emerald-500 text-emerald-300 flex items-center justify-center text-xs font-bold">
                  {c.avatarLetter}
                </div>
                <div className="overflow-hidden">
                  <div className="text-xs font-bold truncate text-neutral-200">@{c.handle}</div>
                  <div className="text-[10px] text-neutral-500">{c.contributions} commits</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
