"use client";

import { cn } from "@/lib/cn";

export interface TeamMember {
  name: string;
  role: string;
  handle: string;
}

export interface TeamCollaboratorRosterProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  members?: TeamMember[];
}

export function TeamCollaboratorRoster({
  title = "Core Architecture Team",
  members = [
    { name: "Cyril Chris", role: "Principal Architect", handle: "@cyrilchris" },
    { name: "Elena Rostova", role: "Lead Design Systems", handle: "@elena_design" },
    { name: "Marcus Vance", role: "Verification & Rigor", handle: "@marcus_v" },
    { name: "Devon Reed", role: "Developer Experience", handle: "@devonreed" },
  ],
  className,
  ...props
}: TeamCollaboratorRosterProps) {
  return (
    <section className={cn("py-16 px-6 max-w-5xl mx-auto font-sans bg-paper text-ink", className)} {...props}>
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink text-center mb-10">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {members.map((m) => (
          <div key={m.name} className="p-6 rounded-2xl border border-line bg-paper text-center shadow-xs">
            <div className="w-16 h-16 rounded-full bg-accent/20 text-accent font-mono font-bold text-base flex items-center justify-center mx-auto mb-4">
              {m.name.slice(0, 2).toUpperCase()}
            </div>
            <div className="font-bold text-sm text-ink">{m.name}</div>
            <div className="text-xs text-ink/60 mt-0.5">{m.role}</div>
            <div className="text-[11px] font-mono text-accent mt-2">{m.handle}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
