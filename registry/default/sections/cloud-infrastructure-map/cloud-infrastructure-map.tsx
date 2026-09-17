"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export interface RegionPoP {
  city: string;
  region: string;
  ping: string;
}

export interface CloudInfrastructureMapProps extends React.HTMLAttributes<HTMLElement> {
  regions?: RegionPoP[];
}

const DEFAULT_POPS: RegionPoP[] = [
  { city: "San Francisco", region: "us-west-1", ping: "2ms" },
  { city: "Frankfurt", region: "eu-central-1", ping: "4ms" },
  { city: "Tokyo", region: "ap-northeast-1", ping: "6ms" },
  { city: "Singapore", region: "ap-southeast-1", ping: "5ms" },
  { city: "London", region: "eu-west-2", ping: "3ms" },
  { city: "Sydney", region: "ap-southeast-2", ping: "8ms" },
];

export function CloudInfrastructureMap({
  regions = DEFAULT_POPS,
  className,
  ...props
}: CloudInfrastructureMapProps) {
  return (
    <section className={cn("w-full py-16 px-4 md:px-8 max-w-5xl mx-auto", className)} {...props}>
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-mono uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-bold">
          Global Backbone
        </span>
        <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mt-1">
          Deploy within 10ms of your users
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {regions.map((pop) => (
          <div
            key={pop.region}
            className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 font-mono"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-neutral-900 dark:text-neutral-100">{pop.city}</span>
              <span className="text-xs text-emerald-500 font-bold">{pop.ping}</span>
            </div>
            <div className="text-[11px] text-neutral-400 mt-1">{pop.region}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
