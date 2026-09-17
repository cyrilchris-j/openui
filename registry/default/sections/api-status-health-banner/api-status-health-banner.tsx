"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export interface RegionStatus {
  region: string;
  status: "Operational" | "Degraded" | "Maintenance";
  latency: string;
}

export interface ApiStatusHealthBannerProps extends React.HTMLAttributes<HTMLElement> {
  systemUptime?: string;
  regions?: RegionStatus[];
}

const DEFAULT_REGIONS: RegionStatus[] = [
  { region: "US-East (N. Virginia)", status: "Operational", latency: "14ms" },
  { region: "EU-West (Frankfurt)", status: "Operational", latency: "18ms" },
  { region: "AP-East (Tokyo)", status: "Operational", latency: "22ms" },
  { region: "SA-East (São Paulo)", status: "Operational", latency: "38ms" },
];

export function ApiStatusHealthBanner({
  systemUptime = "99.998%",
  regions = DEFAULT_REGIONS,
  className,
  ...props
}: ApiStatusHealthBannerProps) {
  return (
    <section className={cn("w-full py-8 px-4 md:px-8 max-w-5xl mx-auto", className)} {...props}>
      <div className="border border-neutral-800 bg-neutral-950 rounded-xl p-5 text-neutral-100 font-mono">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
            </span>
            <span className="text-sm font-bold text-white tracking-wide">
              All Systems Operational
            </span>
          </div>
          <div className="text-xs text-neutral-400">
            90-Day Rolling Uptime: <span className="text-emerald-400 font-bold">{systemUptime}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-xs">
          {regions.map((r) => (
            <div key={r.region} className="p-3 rounded bg-neutral-900/60 border border-neutral-800/80">
              <div className="text-[10px] text-neutral-400 uppercase tracking-wider">{r.region}</div>
              <div className="text-emerald-400 font-semibold mt-1">{r.status}</div>
              <div className="text-[10px] text-neutral-500 mt-0.5 font-mono">{r.latency} p95</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
