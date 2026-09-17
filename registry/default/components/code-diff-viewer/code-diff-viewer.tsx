"use client";

import { cn } from "@/lib/cn";

export interface CodeDiffViewerProps {
  className?: string;
}

export function CodeDiffViewer({ className }: CodeDiffViewerProps) {
  const lines = [
    { type: "del", text: "- const registry = fetchRegistrySync();" },
    { type: "add", text: "+ const registry = await fetchRegistry();" },
    { type: "same", text: "  return validate(registry);" },
  ];

  return (
    <div className={cn("w-full max-w-sm rounded-xl border border-line bg-paper p-4 font-mono text-xs shadow-sm space-y-1", className)}>
      {lines.map((l, idx) => (
        <div
          key={idx}
          className={cn(
            "p-1 rounded",
            l.type === "del" && "bg-red-500/10 text-red-600",
            l.type === "add" && "bg-emerald-500/10 text-emerald-600",
            l.type === "same" && "text-ink/60"
          )}
        >
          {l.text}
        </div>
      ))}
    </div>
  );
}

export default CodeDiffViewer;
