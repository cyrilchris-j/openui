"use client";

import { cn } from "@/lib/cn";

export interface CommandMenuBarProps {
  className?: string;
}

export function CommandMenuBar({ className }: CommandMenuBarProps) {
  const actions = [
    { label: "Cut", key: "⌘X" },
    { label: "Copy", key: "⌘C" },
    { label: "Paste", key: "⌘V" },
    { label: "Format", key: "⌥F" },
  ];

  return (
    <div className={cn("inline-flex items-center gap-1 rounded-xl border border-line bg-paper p-1.5 shadow-sm", className)}>
      {actions.map((act) => (
        <button
          key={act.label}
          type="button"
          className="flex items-center gap-2 rounded-lg px-3 py-1.5 font-mono text-xs text-ink hover:bg-line/20 transition-colors"
        >
          <span>{act.label}</span>
          <span className="rounded bg-line/30 px-1 py-0.5 text-[9px] text-ink/50">{act.key}</span>
        </button>
      ))}
    </div>
  );
}

export default CommandMenuBar;
