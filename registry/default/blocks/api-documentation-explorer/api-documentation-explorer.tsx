"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function ApiDocumentationExplorer({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("w-full max-w-4xl mx-auto p-5 bg-neutral-950 text-neutral-100 border border-neutral-800 rounded-xl font-mono text-xs shadow-sm", className)} {...props}>
      <div className="flex items-center gap-3 pb-3 border-b border-neutral-800 mb-4">
        <span className="px-2 py-0.5 rounded bg-blue-600 text-white font-bold text-[10px]">GET</span>
        <span className="font-bold text-white">/api/v2/registry/item/[slug]</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-3 bg-neutral-900 rounded border border-neutral-800">
          <div className="font-bold text-neutral-400 mb-2">Request Parameters</div>
          <div className="text-emerald-400">slug: string (required)</div>
        </div>
        <div className="p-3 bg-neutral-900 rounded border border-neutral-800">
          <div className="font-bold text-neutral-400 mb-2">Response 200 OK</div>
          <div className="text-neutral-300">&#123; "name": "button", "status": "verified" &#125;</div>
        </div>
      </div>
    </div>
  );
}
