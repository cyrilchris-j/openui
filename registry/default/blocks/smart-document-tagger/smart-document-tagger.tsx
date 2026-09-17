"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function SmartDocumentTagger({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [tags, setTags] = React.useState(["react-19", "tailwind-v4", "zero-dependency"]);

  const removeTag = (t: string) => {
    setTags((prev) => prev.filter((x) => x !== t));
  };

  return (
    <div className={cn("w-full max-w-md mx-auto p-5 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm text-xs", className)} {...props}>
      <h3 className="font-bold text-neutral-900 dark:text-white mb-3">Resource Tags</h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((t) => (
          <span key={t} className="px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-mono text-[11px] flex items-center gap-1.5">
            <span>{t}</span>
            <button type="button" onClick={() => removeTag(t)} className="text-neutral-400 hover:text-neutral-900 dark:hover:text-white">
              ✕
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
