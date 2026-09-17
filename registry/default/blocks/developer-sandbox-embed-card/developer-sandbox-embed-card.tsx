"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function DeveloperSandboxEmbedCard({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("w-full max-w-md mx-auto p-5 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm text-xs", className)} {...props}>
      <h3 className="font-bold text-neutral-900 dark:text-white mb-2">Embed Sandbox</h3>
      <p className="text-neutral-500 mb-4">Paste this iframe to embed this live primitive into your documentation.</p>
      <div className="p-3 rounded-lg bg-neutral-100 dark:bg-neutral-900 font-mono text-[10px] text-neutral-700 dark:text-neutral-300 break-all mb-4">
        &lt;iframe src="https://openui.dev/embed/hero" width="100%" height="400" /&gt;
      </div>
      <button type="button" className="w-full py-2 bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-semibold rounded-lg">
        Copy Embed Code
      </button>
    </div>
  );
}
