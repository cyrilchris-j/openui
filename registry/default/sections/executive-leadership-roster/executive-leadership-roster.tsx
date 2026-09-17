"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export interface Leader {
  name: string;
  role: string;
  bio: string;
  avatarLetter: string;
}

export interface ExecutiveLeadershipRosterProps extends React.HTMLAttributes<HTMLElement> {
  leaders?: Leader[];
}

const DEFAULT_LEADERS: Leader[] = [
  { name: "Cyril Chris", role: "Principal Architect", bio: "Former distributed systems engineer building zero-dependency web infrastructure.", avatarLetter: "C" },
  { name: "Elena Rostova", role: "Lead Design Systems", bio: "Pioneered automated mathematical token contracts and accessible UI primitives.", avatarLetter: "E" },
  { name: "Marcus Vance", role: "Verification & Rigor", bio: "Specialized in compiler validation, property testing, and deterministic schemas.", avatarLetter: "M" },
];

export function ExecutiveLeadershipRoster({
  leaders = DEFAULT_LEADERS,
  className,
  ...props
}: ExecutiveLeadershipRosterProps) {
  return (
    <section className={cn("w-full py-16 px-4 md:px-8 max-w-5xl mx-auto", className)} {...props}>
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 font-bold">
          Leadership Team
        </span>
        <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mt-1">
          Guiding OpenUI's architectural standard
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {leaders.map((leader) => (
          <div
            key={leader.name}
            className="p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 flex flex-col justify-between text-center"
          >
            <div>
              <div className="h-16 w-16 mx-auto rounded-full bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 flex items-center justify-center text-xl font-bold mb-4">
                {leader.avatarLetter}
              </div>
              <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                {leader.name}
              </h3>
              <div className="text-xs font-mono text-neutral-500 mt-0.5">
                {leader.role}
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-3 leading-relaxed">
                {leader.bio}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
