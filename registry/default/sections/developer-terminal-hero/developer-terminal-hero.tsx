"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export interface DeveloperTerminalHeroProps extends React.HTMLAttributes<HTMLElement> {
  cmd?: string;
}

export function DeveloperTerminalHero({
  cmd = "pnpm dlx @openui/cli add holy-grail-layout",
  className,
  ...props
}: DeveloperTerminalHeroProps) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(cmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className={cn("py-16 px-6 max-w-5xl mx-auto font-sans bg-paper text-ink grid grid-cols-1 lg:grid-cols-2 gap-8 items-center", className)} {...props}>
      <div>
        <span className="font-mono text-xs text-accent font-bold uppercase">Developer First</span>
        <h1 className="text-3xl font-bold tracking-tight text-ink my-2">Deploy directly into your codebase.</h1>
        <p className="text-xs text-ink/70 leading-relaxed">Single command imports. No remote runtime blackboxes.</p>
      </div>

      <div className="p-4 rounded-2xl border border-line bg-slate-950 text-white font-mono text-xs shadow-xl">
        <div className="flex items-center justify-between pb-3 border-b border-white/10 text-white/50 text-[10px]">
          <span>bash terminal</span>
          <button type="button" onClick={copy} className="hover:text-white transition-colors">
            {copied ? "✓ Copied" : "Copy"}
          </button>
        </div>
        <div className="pt-3 text-emerald-400">
          <span className="text-white/40">$ </span>
          {cmd}
        </div>
      </div>
    </section>
  );
}
