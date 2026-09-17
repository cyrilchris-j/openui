"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function AiPromptTuningWorkbench({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [temp, setTemp] = React.useState(0.7);
  const [output, setOutput] = React.useState<string | null>(null);

  const generate = () => {
    setOutput("OpenUI is a decentralized design system registry providing 800 certified open-source components with zero runtime dependencies.");
  };

  return (
    <div className={cn("w-full max-w-4xl mx-auto p-6 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm text-xs", className)} {...props}>
      <h3 className="font-bold text-base text-neutral-900 dark:text-white mb-4">Prompt Engineering Workbench</h3>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-7 space-y-3">
          <div>
            <label className="block text-neutral-500 mb-1">System Prompt</label>
            <textarea
              defaultValue="You are an expert design systems engineer specializing in zero-dependency React 19 architecture."
              rows={4}
              className="w-full p-3 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 focus:outline-none"
            />
          </div>
          <button type="button" onClick={generate} className="px-4 py-2 bg-emerald-600 text-white font-semibold rounded-lg">
            Generate Response ▶
          </button>
          {output && (
            <div className="mt-4 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 leading-relaxed">
              {output}
            </div>
          )}
        </div>
        <div className="md:col-span-5 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 space-y-4">
          <div>
            <div className="flex justify-between font-mono text-neutral-500 mb-1">
              <span>Temperature</span>
              <span>{temp}</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={temp}
              onChange={(e) => setTemp(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
