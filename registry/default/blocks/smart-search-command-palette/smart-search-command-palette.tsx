"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function SmartSearchCommandPalette({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [query, setQuery] = React.useState("");

  const actions = [
    { label: "Browse 800 Catalog Resources", category: "Navigation", key: "G C" },
    { label: "Run Validation: pnpm validate:catalog", category: "DevOps", key: "⌘ V" },
    { label: "Create New API Secret", category: "Security", key: "⌘ K" },
  ];

  const filtered = actions.filter((a) => a.label.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className={cn("w-full max-w-xl mx-auto p-4 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl font-mono text-xs", className)} {...props}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Type a command or search resource..."
        className="w-full px-3 py-2.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 mb-3 focus:outline-none"
      />
      <div className="space-y-1">
        {filtered.map((a) => (
          <div key={a.label} className="p-2.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center justify-between cursor-pointer">
            <span className="text-neutral-900 dark:text-white">{a.label}</span>
            <span className="px-2 py-0.5 rounded bg-neutral-200 dark:bg-neutral-800 text-[10px] text-neutral-500">{a.key}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
