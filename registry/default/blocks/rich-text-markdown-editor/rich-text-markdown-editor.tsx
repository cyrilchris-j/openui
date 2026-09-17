"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function RichTextMarkdownEditor({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [content, setContent] = React.useState("# OpenUI Design Registry\n\nZero external runtime dependencies.");

  return (
    <div className={cn("w-full max-w-4xl mx-auto p-5 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm text-xs", className)} {...props}>
      <h3 className="font-bold text-base text-neutral-900 dark:text-white mb-3">Markdown Editor</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={6}
          className="w-full p-3 font-mono rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 focus:outline-none"
        />
        <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 prose prose-xs dark:prose-invert">
          <div className="font-bold text-sm text-neutral-900 dark:text-white mb-2">Live Preview</div>
          <div className="text-neutral-600 dark:text-neutral-400">{content}</div>
        </div>
      </div>
    </div>
  );
}
