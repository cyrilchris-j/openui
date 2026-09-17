"use client";

import { cn } from "@/lib/cn";

export interface InteractiveAuditScorecardProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
}

export function InteractiveAuditScorecard({
  title = "Lighthouse Audit Scorecard",
  className,
  ...props
}: InteractiveAuditScorecardProps) {
  const scores = [
    { label: "Performance", score: 100 },
    { label: "Accessibility", score: 100 },
    { label: "Best Practices", score: 100 },
    { label: "SEO / Semantic", score: 100 },
  ];

  return (
    <section className={cn("py-12 px-6 max-w-4xl mx-auto font-mono text-xs bg-paper text-ink text-center", className)} {...props}>
      <h2 className="font-bold text-sm text-ink mb-6">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {scores.map((s) => (
          <div key={s.label} className="p-4 rounded-2xl border border-line bg-surface/30 flex flex-col items-center">
            <div className="w-14 h-14 rounded-full border-4 border-emerald-500 text-emerald-600 font-bold flex items-center justify-center text-base mb-2">
              {s.score}
            </div>
            <div className="font-semibold text-ink font-sans text-xs">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
