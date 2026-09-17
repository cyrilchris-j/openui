"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function CodeEditorWorkspace({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [code, setCode] = React.useState("export default function Page() {\n  return <h1>Hello OpenUI</h1>;\n}");
  const [output, setOutput] = React.useState<string | null>(null);

  const handleRun = () => {
    setOutput("Compiled successfully in 14ms (React 19 Server Component)");
  };

  return (
    <div className={cn("w-full max-w-4xl mx-auto p-5 bg-neutral-950 text-neutral-100 border border-neutral-800 rounded-xl font-mono text-xs shadow-2xl", className)} {...props}>
      <div className="flex items-center justify-between pb-3 border-b border-neutral-800 mb-3">
        <div className="flex items-center gap-2">
          <span className="text-emerald-400 font-bold">App.tsx</span>
          <span className="text-[10px] text-neutral-500">TypeScript / React 19</span>
        </div>
        <button type="button" onClick={handleRun} className="px-3 py-1 bg-emerald-600 text-white rounded font-bold text-[11px]">
          Execute ▶
        </button>
      </div>

      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        rows={6}
        className="w-full bg-neutral-900 text-emerald-300 p-3 rounded border border-neutral-800 focus:outline-none resize-none"
      />

      {output && (
        <div className="mt-3 p-3 bg-neutral-900/80 border border-neutral-800 text-neutral-300 rounded">
          <span className="text-neutral-500">console.log:</span> {output}
        </div>
      )}
    </div>
  );
}
