"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function IntegrationsMarketplaceGrid({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [apps, setApps] = React.useState([
    { name: "GitHub Sync", desc: "Automate pull request validation on push", connected: true },
    { name: "Slack Connect", desc: "Broadcast build alerts to engineering channel", connected: true },
    { name: "Figma Variables", desc: "Export design tokens to theme CSS files", connected: false },
    { name: "Sentry Telemetry", desc: "Pipe client component crashes to Sentry", connected: false },
  ]);

  const toggle = (name: string) => {
    setApps((prev) => prev.map((a) => (a.name === name ? { ...a, connected: !a.connected } : a)));
  };

  return (
    <div className={cn("w-full max-w-4xl mx-auto p-6 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm text-xs", className)} {...props}>
      <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-4">Connected Integrations</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {apps.map((a) => (
          <div key={a.name} className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 flex items-start justify-between gap-4">
            <div>
              <div className="font-bold text-neutral-900 dark:text-white">{a.name}</div>
              <div className="text-neutral-500 mt-1">{a.desc}</div>
            </div>
            <button
              type="button"
              onClick={() => toggle(a.name)}
              className={cn("px-3 py-1 rounded text-[11px] font-semibold transition-colors shrink-0", a.connected ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50" : "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900")}
            >
              {a.connected ? "Connected" : "Install"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
