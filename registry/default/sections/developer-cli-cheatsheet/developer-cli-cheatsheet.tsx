"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function DeveloperCLICommandsCheatsheet({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const commands = [
    { cmd: "openui add <name>", desc: "Materialize item into local project src/" },
    { cmd: "openui diff <name>", desc: "Inspect local overrides vs upstream registry" },
    { cmd: "openui validate", desc: "Verify Design DNA invariants and TypeScript contracts" },
    { cmd: "openui sync", desc: "Pull latest security patches and bugfixes" },
  ];

  return (
    <section className={cn("w-full py-16 px-4 max-w-4xl mx-auto font-mono", className)} {...props}>
      <h3 className="text-xs uppercase tracking-widest text-emerald-500 font-bold mb-4">
        Command Syntax
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {commands.map((c) => (
          <div key={c.cmd} className="p-3.5 rounded bg-neutral-900 border border-neutral-800 text-xs">
            <div className="text-emerald-400 font-bold">$ {c.cmd}</div>
            <div className="text-neutral-400 text-[11px] mt-1">{c.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
