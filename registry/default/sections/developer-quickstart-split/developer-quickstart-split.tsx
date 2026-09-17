"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export interface DeveloperQuickstartSplitProps extends React.HTMLAttributes<HTMLElement> {
  command?: string;
  tabs?: { label: string; code: string }[];
}

const DEFAULT_TABS = [
  { label: "pnpm", code: "pnpm dlx openui@latest add split-headline-hero" },
  { label: "npm", code: "npx openui@latest add split-headline-hero" },
  { label: "yarn", code: "yarn dlx openui add split-headline-hero" },
  { label: "bun", code: "bunx openui@latest add split-headline-hero" },
];

export function DeveloperQuickstartSplit({
  tabs = DEFAULT_TABS,
  className,
  ...props
}: DeveloperQuickstartSplitProps) {
  const [activeTab, setActiveTab] = React.useState(0);
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    const text = tabs[activeTab]?.code || "";
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section className={cn("w-full py-16 px-4 md:px-8 max-w-6xl mx-auto", className)} {...props}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-5">
          <span className="text-xs font-mono font-semibold tracking-wider text-emerald-600 dark:text-emerald-400 uppercase">
            Quickstart
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mt-2">
            One command, zero boilerplate
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-3 leading-relaxed">
            Copy self-contained, typed components directly into your codebase. No lock-in, no runtime wrapper, complete design ownership.
          </p>
          <div className="mt-6 flex items-center gap-4 text-xs font-mono text-neutral-500">
            <div>✓ TypeScript Strict</div>
            <div>✓ Tailwind v4 Ready</div>
            <div>✓ Zero Dependencies</div>
          </div>
        </div>

        <div className="lg:col-span-7 bg-neutral-950 text-neutral-100 rounded-xl border border-neutral-800 p-4 shadow-xl font-mono text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
            <div className="flex items-center gap-2">
              {tabs.map((tab, idx) => (
                <button
                  key={tab.label}
                  type="button"
                  onClick={() => setActiveTab(idx)}
                  className={cn(
                    "px-2.5 py-1 rounded text-[11px] transition-colors",
                    activeTab === idx ? "bg-neutral-800 text-white font-bold" : "text-neutral-400 hover:text-neutral-200"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={handleCopy}
              className="text-[11px] text-neutral-400 hover:text-white px-2 py-1 bg-neutral-900 rounded border border-neutral-800"
            >
              {copied ? "Copied! ✓" : "Copy"}
            </button>
          </div>

          <div className="pt-4 pb-2 px-2 overflow-x-auto text-emerald-400 flex items-center gap-2">
            <span className="text-neutral-500 select-none">$</span>
            <span>{tabs[activeTab]?.code}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
