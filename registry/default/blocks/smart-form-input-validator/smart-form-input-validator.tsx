"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function SmartFormInputValidator({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [slug, setSlug] = React.useState("valid-component-slug");
  const isValid = /^[a-z0-9-]+$/.test(slug);

  return (
    <div className={cn("w-full max-w-md mx-auto p-5 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm text-xs", className)} {...props}>
      <h3 className="font-bold text-neutral-900 dark:text-white mb-3">Slug Syntax Validator</h3>
      <input
        type="text"
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
        className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 font-mono mb-2"
      />
      <div className={cn("font-mono text-[11px]", isValid ? "text-emerald-500" : "text-rose-500")}>
        {isValid ? "✓ Valid registry item slug format" : "✕ Must match /^[a-z0-9-]+$/"}
      </div>
    </div>
  );
}
