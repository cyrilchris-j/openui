"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface FeatureTabbedWalkthroughProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
}

export function FeatureTabbedWalkthrough({
  title = "Explore the Component Anatomy",
  className,
  ...props
}: FeatureTabbedWalkthroughProps) {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ["Design DNA", "TypeScript Props", "Registry Bundle"];

  return (
    <section className={cn("py-16 px-6 max-w-4xl mx-auto font-sans bg-paper text-ink", className)} {...props}>
      <h2 className="text-2xl font-bold text-center text-ink mb-6">{title}</h2>
      <div className="flex justify-center gap-2 mb-6">
        {tabs.map((tab, idx) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(idx)}
            className={cn(
              "px-4 py-1.5 rounded-full text-xs font-mono transition-colors",
              activeTab === idx ? "bg-accent text-white font-bold" : "border border-line bg-surface text-ink/70 hover:bg-surface/80"
            )}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="p-6 rounded-2xl border border-line bg-surface/30 font-mono text-xs">
        {activeTab === 0 && <div>macrostructure: 'split' • motion: 'subtle' • typography: 'grotesk'</div>}
        {activeTab === 1 && <div>interface ComponentProps extends HTMLAttributes&lt;HTMLDivElement&gt;</div>}
        {activeTab === 2 && <div>// 800 JSON bundles published to apps/web/public/r/</div>}
      </div>
    </section>
  );
}
