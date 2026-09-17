"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export interface ForumThread {
  id: string;
  title: string;
  author: string;
  category: string;
  replies: number;
  likes: number;
}

export interface CommunityForumDigestProps extends React.HTMLAttributes<HTMLElement> {
  threads?: ForumThread[];
}

const DEFAULT_THREADS: ForumThread[] = [
  { id: "t1", title: "How we migrated 40 micro-frontends to OpenUI zero-dependency components", author: "marcus_v", category: "Architecture", replies: 28, likes: 142 },
  { id: "t2", title: "RFC: Adding deterministic CSS color token math to design.md generator", author: "elena_design", category: "RFC", replies: 44, likes: 210 },
  { id: "t3", title: "Showcase: Real-time telemetry dashboard using layouts/grid-bento", author: "devon_codes", category: "Showcase", replies: 19, likes: 98 },
];

export function CommunityForumDigest({
  threads = DEFAULT_THREADS,
  className,
  ...props
}: CommunityForumDigestProps) {
  return (
    <section className={cn("w-full py-16 px-4 md:px-8 max-w-4xl mx-auto", className)} {...props}>
      <div className="flex items-center justify-between mb-8">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-bold">
            Community Discussions
          </span>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mt-1">
            Trending on OpenUI Forum
          </h2>
        </div>
        <button
          type="button"
          className="text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:text-emerald-500"
        >
          View All Discussions →
        </button>
      </div>

      <div className="space-y-3">
        {threads.map((thread) => (
          <div
            key={thread.id}
            className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                  {thread.category}
                </span>
                <span className="text-xs text-neutral-400">by @{thread.author}</span>
              </div>
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mt-1">
                {thread.title}
              </h3>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono text-neutral-500 shrink-0">
              <div>💬 {thread.replies}</div>
              <div>▲ {thread.likes}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
