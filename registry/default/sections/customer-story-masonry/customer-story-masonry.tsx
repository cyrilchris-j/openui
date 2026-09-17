"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export interface StoryCard {
  quote: string;
  author: string;
  role: string;
  company: string;
  stat: string;
  statLabel: string;
}

export interface CustomerStoryMasonryProps extends React.HTMLAttributes<HTMLElement> {
  stories?: StoryCard[];
}

const DEFAULT_STORIES: StoryCard[] = [
  {
    quote: "Migrating our core telemetry pipeline to OpenUI cut our infrastructure overhead by 68% within the first financial quarter.",
    author: "Elena Vasquez",
    role: "VP of Engineering",
    company: "HyperScale Cloud",
    stat: "68%",
    statLabel: "Cloud egress reduction",
  },
  {
    quote: "Our frontend velocity doubled. Engineers are no longer re-implementing accessible form controls or fighting CSS specificity wars.",
    author: "Liam K.",
    role: "Staff Product Engineer",
    company: "FinPoint Technologies",
    stat: "2.4x",
    statLabel: "Sprint release velocity",
  },
  {
    quote: "The zero-dependency architecture gave our compliance auditor complete peace of mind. We shipped SOC2 compliance two months early.",
    author: "Sarah Chen",
    role: "Chief Information Security Officer",
    company: "AeroData Global",
    stat: "2 mo",
    statLabel: "Time-to-compliance accelerated",
  },
];

export function CustomerStoryMasonry({
  stories = DEFAULT_STORIES,
  className,
  ...props
}: CustomerStoryMasonryProps) {
  return (
    <section className={cn("w-full py-16 px-4 md:px-8 max-w-6xl mx-auto", className)} {...props}>
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-mono uppercase tracking-widest text-amber-700 dark:text-amber-400 font-semibold">
          Proven Outcomes
        </span>
        <h2 className="text-3xl md:text-4xl font-serif font-normal tracking-tight text-neutral-900 dark:text-neutral-100 mt-2">
          Trusted by technical leaders building next-generation products
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stories.map((story, i) => (
          <div
            key={i}
            className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-stone-50/50 dark:bg-neutral-900/40 flex flex-col justify-between"
          >
            <div>
              <div className="border-b border-neutral-200 dark:border-neutral-800 pb-4 mb-4">
                <div className="text-3xl font-serif font-bold text-neutral-900 dark:text-neutral-100">
                  {story.stat}
                </div>
                <div className="text-xs font-mono text-neutral-500 uppercase tracking-wider mt-0.5">
                  {story.statLabel}
                </div>
              </div>
              <p className="text-sm font-serif italic text-neutral-700 dark:text-neutral-300 leading-relaxed">
                "{story.quote}"
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-200 dark:border-neutral-800">
              <div className="text-xs font-semibold text-neutral-900 dark:text-neutral-100">
                {story.author}
              </div>
              <div className="text-[11px] text-neutral-500">
                {story.role}, {story.company}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
