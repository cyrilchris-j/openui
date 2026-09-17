"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function InteractiveTerminalPlayground({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const [history, setHistory] = React.useState<string[]>([
    "OpenUI v2.4.0 Interactive Playground",
    "Type 'help' to inspect available simulation commands.",
  ]);
  const [input, setInput] = React.useState("");

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    let output = "";
    switch (cmd) {
      case "help":
        output = "Available commands: 'catalog', 'status', 'fingerprint', 'clear'";
        break;
      case "catalog":
        output = "Catalog tally: components (100), text (100), motion (100), interactions (100), backgrounds (100), layouts (100), sections (100), blocks (100). Total: 800.";
        break;
      case "status":
        output = "All 800 registry manifests verified. 0 missing metadata, 0 TypeScript errors.";
        break;
      case "fingerprint":
        output = "Deterministic schema fingerprint verified: 100% unique across all 800 entries.";
        break;
      case "clear":
        setHistory([]);
        setInput("");
        return;
      default:
        output = `Command not recognized: '${cmd}'. Type 'help' for options.`;
    }

    setHistory((prev) => [...prev, `$ ${input}`, output]);
    setInput("");
  };

  return (
    <section className={cn("w-full py-16 px-4 md:px-8 max-w-4xl mx-auto", className)} {...props}>
      <div className="bg-neutral-950 text-neutral-100 rounded-xl border border-neutral-800 p-4 font-mono text-xs shadow-2xl">
        <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </div>
          <span className="text-neutral-500 text-[10px]">openui-shell ~ zsh</span>
        </div>

        <div className="mt-3 space-y-1 max-h-60 overflow-y-auto">
          {history.map((line, idx) => (
            <div key={idx} className={line.startsWith("$") ? "text-emerald-400 font-bold" : "text-neutral-300"}>
              {line}
            </div>
          ))}
        </div>

        <form onSubmit={handleCommand} className="mt-3 pt-2 border-t border-neutral-800 flex items-center gap-2">
          <span className="text-emerald-400 font-bold">$</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="type 'catalog', 'status' or 'help'..."
            className="flex-1 bg-transparent text-neutral-100 focus:outline-none text-xs"
          />
        </form>
      </div>
    </section>
  );
}
