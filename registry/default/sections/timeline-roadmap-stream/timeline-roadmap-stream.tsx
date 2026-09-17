"use client";

import { cn } from "@/lib/cn";

export interface RoadmapMilestone {
  quarter: string;
  status: "shipped" | "in-progress" | "planned";
  title: string;
  desc: string;
}

export interface TimelineRoadmapStreamProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  milestones?: RoadmapMilestone[];
}

export function TimelineRoadmapStream({
  title = "Public Architecture Roadmap",
  milestones = [
    { quarter: "Q1 2026", status: "shipped", title: "Catalogue Bootstrap", desc: "Core schema, test harness, and AST validators." },
    { quarter: "Q2 2026", status: "shipped", title: "800 Resource Master Build", desc: "100 components in each of 8 countable categories." },
    { quarter: "Q3 2026", status: "in-progress", title: "Autonomous Design Synthesizer", desc: "AI agent registry compiler and real-time variant generator." },
  ],
  className,
  ...props
}: TimelineRoadmapStreamProps) {
  return (
    <section className={cn("py-16 px-6 max-w-3xl mx-auto font-sans bg-paper text-ink", className)} {...props}>
      <h2 className="text-2xl font-bold text-center text-ink mb-10">{title}</h2>
      <div className="space-y-6 relative pl-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-line">
        {milestones.map((m) => (
          <div key={m.quarter} className="relative">
            <div className={cn(
              "absolute -left-6 top-1.5 w-3.5 h-3.5 rounded-full border-2 border-paper",
              m.status === "shipped" ? "bg-emerald-500" : m.status === "in-progress" ? "bg-accent" : "bg-line"
            )} />
            <div className="p-4 rounded-xl border border-line bg-surface/30">
              <div className="flex items-center justify-between text-xs font-mono mb-1">
                <span className="font-bold text-ink">{m.quarter}</span>
                <span className={cn("uppercase text-[10px] font-bold px-2 py-0.5 rounded-full", m.status === "shipped" ? "bg-emerald-500/15 text-emerald-600" : "bg-accent/15 text-accent")}>
                  {m.status}
                </span>
              </div>
              <div className="font-bold text-sm text-ink">{m.title}</div>
              <p className="text-xs text-ink/60 mt-1">{m.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
