"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export interface FeatureItem {
  id: string;
  tag: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export interface FeatureGridSpotlightProps extends React.HTMLAttributes<HTMLElement> {
  eyebrow?: string;
  headline?: string;
  description?: string;
  features?: FeatureItem[];
  columns?: 2 | 3;
}

const DEFAULT_FEATURES: FeatureItem[] = [
  { id: "f1", tag: "Speed", title: "Sub-millisecond Routing", description: "Edge-distributed request pipeline resolving cache lookups in under 1ms globally." },
  { id: "f2", tag: "Security", title: "Automated Zero Trust", description: "Per-request mutual TLS validation with hardware-backed certificate rotation." },
  { id: "f3", tag: "Analytics", title: "Real-time Telemetry", description: "Streaming event aggregation piping 500k ops/sec into your Grafana dashboards." },
  { id: "f4", tag: "Scaling", title: "Instant Elasticity", description: "Horizontal pod autoscaling triggered on memory pressure within 400ms." },
  { id: "f5", tag: "Compliance", title: "SOC2 & ISO Ready", description: "Immutable tamper-proof audit trails generated directly to cold storage." },
  { id: "f6", tag: "DX", title: "CLI First Workflow", description: "Push-to-deploy Git hooks with local preview sandboxes in under 3 seconds." },
];

export function FeatureGridSpotlight({
  eyebrow = "Core Capabilities",
  headline = "Engineered for uncompromising velocity",
  description = "A comprehensive suite of infrastructure primitives designed to scale without operational friction.",
  features = DEFAULT_FEATURES,
  columns = 3,
  className,
  ...props
}: FeatureGridSpotlightProps) {
  const [activeId, setActiveId] = React.useState<string | null>(null);

  return (
    <section className={cn("w-full py-16 px-4 md:px-8 max-w-6xl mx-auto", className)} {...props}>
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-xs font-mono tracking-widest uppercase text-emerald-600 dark:text-emerald-400 font-semibold">
          {eyebrow}
        </span>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mt-2">
          {headline}
        </h2>
        <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-400 mt-3">
          {description}
        </p>
      </div>

      <div
        className={cn(
          "grid gap-6",
          columns === 2 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        )}
      >
        {features.map((feature) => {
          const isSelected = activeId === feature.id;
          return (
            <div
              key={feature.id}
              onClick={() => setActiveId(isSelected ? null : feature.id)}
              className={cn(
                "group relative rounded-xl border p-6 transition-all duration-200 cursor-pointer",
                "bg-white dark:bg-neutral-950",
                isSelected
                  ? "border-emerald-500 shadow-md ring-1 ring-emerald-500/20"
                  : "border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700"
              )}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
                  {feature.tag}
                </span>
                <span className="text-xs font-mono text-neutral-400">
                  #{feature.id}
                </span>
              </div>
              <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                {feature.title}
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-2 leading-relaxed">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
