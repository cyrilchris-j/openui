"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function CodeSnippetNotebook({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [output, setOutput] = React.useState<string | null>(null);

  const runCode = () => {
    setOutput("=> 800 items validated: 0 missing metadata, 0 duplicates.");
  };

  return (
    <div className={cn("w-full max-w-3xl mx-auto p-5 bg-neutral-950 text-neutral-100 border border-neutral-800 rounded-xl font-mono text-xs shadow-sm", className)} {...props}>
      <div className="flex items-center justify-between pb-3 border-b border-neutral-800 mb-3">
        <span className="text-neutral-400">Notebook cell [1]</span>
        <button type="button" onClick={runCode} className="px-3 py-1 bg-emerald-600 text-white rounded font-bold text-[11px]">
          Run Cell ▶
        </button>
      </div>
      <div className="p-3 bg-neutral-900 rounded text-emerald-400">
        import &#123; validateCatalog &#125; from "@openui/registry-schema";<br />
        const report = await validateCatalog();<br />
        console.log(report.summary);
      </div>
      {output && (
        <div className="mt-3 p-3 bg-neutral-900/60 border border-neutral-800 text-neutral-300 rounded">
          {output}
        </div>
      )}
    </div>
  );
}
