"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function DownloadCliInstaller({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section className={cn("w-full py-12 px-4 max-w-xl mx-auto font-mono text-xs", className)} {...props}>
      <div className="p-4 rounded-xl bg-neutral-950 text-neutral-100 border border-neutral-800 flex items-center justify-between">
        <div className="flex items-center gap-2 overflow-x-auto">
          <span className="text-neutral-500">$</span>
          <span className="text-emerald-400">curl -fsSL https://openui.dev/install.sh | sh</span>
        </div>
      </div>
    </section>
  );
}
