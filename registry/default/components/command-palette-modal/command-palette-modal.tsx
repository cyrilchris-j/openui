"use client";

import { useState } from "react";
import { Search, FileText, Settings, User, Terminal } from "lucide-react";
import { cn } from "@/lib/cn";

export function CommandPaletteModal({ className }: { className?: string }) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);

  const actions = [
    { id: "docs", label: "Open Documentation", icon: FileText, cat: "Navigation" },
    { id: "settings", label: "Project Preferences", icon: Settings, cat: "Settings" },
    { id: "profile", label: "Account Profile", icon: User, cat: "Account" },
    { id: "terminal", label: "Open Cloud Terminal", icon: Terminal, cat: "Developer" },
  ];

  const filtered = actions.filter((a) => a.label.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className={cn("w-full max-w-md rounded-xl border border-line bg-paper shadow-xl font-sans overflow-hidden", className)}>
      <div className="flex items-center gap-2.5 px-3.5 py-2.5 border-b border-line">
        <Search className="w-4 h-4 text-ink/40" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSelected(0);
          }}
          placeholder="Type a command or search..."
          className="flex-1 bg-transparent text-xs text-ink focus:outline-none"
        />
        <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded border border-line bg-surface text-ink/50">ESC</kbd>
      </div>

      <div className="p-1.5 max-h-60 overflow-y-auto">
        {filtered.map((action, i) => {
          const Icon = action.icon;
          const isSel = selected === i;
          return (
            <div
              key={action.id}
              onClick={() => setSelected(i)}
              className={cn(
                "flex items-center justify-between px-2.5 py-2 rounded-lg cursor-pointer transition-colors text-xs",
                isSel ? "bg-accent text-white font-medium" : "text-ink hover:bg-surface"
              )}
            >
              <div className="flex items-center gap-2">
                <Icon className={cn("w-4 h-4", isSel ? "text-white" : "text-ink/60")} />
                <span>{action.label}</span>
              </div>
              <span className={cn("text-[10px] font-mono", isSel ? "text-white/80" : "text-ink/40")}>
                {action.cat}
              </span>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="p-4 text-center text-xs text-ink/40 font-mono">No matching commands</div>
        )}
      </div>
    </div>
  );
}
