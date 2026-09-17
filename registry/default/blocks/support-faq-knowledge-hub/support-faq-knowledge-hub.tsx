"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function SupportFaqKnowledgeHub({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const topics = [
    { title: "Installation & CLI", count: "12 articles", icon: "⚡" },
    { title: "Design DNA Invariants", count: "8 articles", icon: "📐" },
    { title: "Custom Theme Tokens", count: "14 articles", icon: "🎨" },
    { title: "Enterprise Air-gapped Mirror", count: "6 articles", icon: "🔒" },
  ];

  return (
    <div className={cn("w-full max-w-4xl mx-auto p-6 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm text-xs", className)} {...props}>
      <div className="text-center max-w-xl mx-auto mb-8">
        <h3 className="text-xl font-bold text-neutral-900 dark:text-white">Knowledge Hub</h3>
        <p className="text-neutral-500 mt-1">Search through verified setup guides and architecture specifications.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {topics.map((t) => (
          <div key={t.title} className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-emerald-500 transition-colors cursor-pointer bg-neutral-50/40 dark:bg-neutral-900/30">
            <div className="text-2xl">{t.icon}</div>
            <h4 className="font-bold text-sm text-neutral-900 dark:text-white mt-2">{t.title}</h4>
            <div className="text-neutral-400 text-[11px] mt-1">{t.count}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
