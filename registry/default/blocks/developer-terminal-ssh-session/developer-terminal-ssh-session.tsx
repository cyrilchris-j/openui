"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function DeveloperTerminalSshSession({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("w-full max-w-2xl mx-auto p-5 bg-neutral-950 text-neutral-100 border border-neutral-800 rounded-xl font-mono text-xs shadow-xl", className)} {...props}>
      <div className="text-emerald-400 font-bold mb-2">ssh deploy@edge.openui.dev (mTLS verified)</div>
      <div className="text-neutral-300">
        Last login: Thu Sep 17 23:42:10 UTC from 192.0.2.4<br />
        openui-node-01:~$ pnpm validate:catalog<br />
        <span className="text-emerald-400">TOTAL 800/800 ✓ All checks passed.</span>
      </div>
    </div>
  );
}
