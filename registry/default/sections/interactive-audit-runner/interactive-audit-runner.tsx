"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function InteractiveAuditRunner({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const [running, setRunning] = React.useState(false);
  const [done, setDone] = React.useState(false);

  const runAudit = () => {
    setRunning(true);
    setDone(false);
    setTimeout(() => {
      setRunning(false);
      setDone(true);
    }, 1200);
  };

  return (
    <section className={cn("w-full py-16 px-4 max-w-3xl mx-auto text-center font-mono text-xs", className)} {...props}>
      <div className="border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 bg-white dark:bg-neutral-950">
        <h3 className="text-sm font-bold text-neutral-900 dark:text-white">Live Verification Pipeline</h3>
        <p className="text-neutral-500 mt-1">Run continuous conformance tests against 800 catalog resources.</p>

        <button
          type="button"
          onClick={runAudit}
          disabled={running}
          className="mt-6 px-4 py-2 rounded-lg bg-emerald-600 text-white font-semibold disabled:opacity-50"
        >
          {running ? "Analyzing 800 manifests..." : "Execute Automated Audit"}
        </button>

        {done && (
          <div className="mt-4 p-3 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 rounded">
            ✓ 800 / 800 resources verified. Zero schema violations.
          </div>
        )}
      </div>
    </section>
  );
}
