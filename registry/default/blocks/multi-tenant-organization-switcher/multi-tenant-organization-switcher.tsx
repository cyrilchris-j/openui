"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function MultiTenantOrganizationSwitcher({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [activeOrg, setActiveOrg] = React.useState("OpenUI Core");

  const orgs = [
    { name: "OpenUI Core", plan: "Enterprise" },
    { name: "Personal Prototypes", plan: "Starter" },
  ];

  return (
    <div className={cn("w-full max-w-xs mx-auto p-4 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-lg text-xs", className)} {...props}>
      <div className="font-bold text-neutral-400 text-[10px] uppercase mb-2">Active Workspace</div>
      <div className="space-y-1">
        {orgs.map((o) => (
          <div
            key={o.name}
            onClick={() => setActiveOrg(o.name)}
            className={cn(
              "p-2.5 rounded-lg flex items-center justify-between cursor-pointer transition-colors",
              activeOrg === o.name ? "bg-neutral-100 dark:bg-neutral-800 font-bold" : "hover:bg-neutral-50 dark:hover:bg-neutral-900 text-neutral-600 dark:text-neutral-400"
            )}
          >
            <span>{o.name}</span>
            <span className="font-mono text-[10px] text-neutral-400">{o.plan}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
