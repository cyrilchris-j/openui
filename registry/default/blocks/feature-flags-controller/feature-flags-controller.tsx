"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function FeatureFlagsController({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [flags, setFlags] = React.useState([
    { key: "experimental_canvas_v2", enabled: true, rollout: 100 },
    { key: "airgapped_mirror_sync", enabled: false, rollout: 0 },
    { key: "css_token_color_math", enabled: true, rollout: 50 },
  ]);

  const toggleFlag = (key: string) => {
    setFlags((prev) => prev.map((f) => (f.key === key ? { ...f, enabled: !f.enabled } : f)));
  };

  return (
    <div className={cn("w-full max-w-3xl mx-auto p-6 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl font-mono text-xs shadow-sm", className)} {...props}>
      <h3 className="text-sm font-bold text-neutral-900 dark:text-white mb-4">Production Feature Gates</h3>
      <div className="divide-y divide-neutral-200 dark:divide-neutral-800 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden">
        {flags.map((f) => (
          <div key={f.key} className="p-4 flex items-center justify-between">
            <div>
              <div className="font-bold text-neutral-900 dark:text-white">{f.key}</div>
              <div className="text-neutral-400 text-[11px] mt-0.5">Rollout: {f.rollout}% of traffic</div>
            </div>
            <button
              type="button"
              onClick={() => toggleFlag(f.key)}
              className={cn("px-3 py-1 rounded font-bold transition-colors", f.enabled ? "bg-emerald-600 text-white" : "bg-neutral-200 dark:bg-neutral-800 text-neutral-500")}
            >
              {f.enabled ? "ENABLED" : "DISABLED"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
