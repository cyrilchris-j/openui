"use client";

import { cn } from "@/lib/cn";

export interface ComparisonVersusMatrixProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
}

export function ComparisonVersusMatrix({
  title = "Why OpenUI Differs",
  className,
  ...props
}: ComparisonVersusMatrixProps) {
  const rows = [
    { metric: "Unique Real Resources", us: "800 Verified", them: "30-50 Generic" },
    { metric: "Design DNA Closed Types", us: "Enforced by AST", them: "Ad-hoc Strings" },
    { metric: "Behavioral Fingerprints", us: "Math Contract", them: "None" },
    { metric: "Zero Dependency Copy", us: "Yes (Standalone)", them: "Peer Dependency Chains" },
  ];

  return (
    <section className={cn("py-16 px-6 max-w-4xl mx-auto font-sans bg-paper text-ink", className)} {...props}>
      <h2 className="text-2xl font-bold text-center text-ink mb-8">{title}</h2>
      <div className="border border-line rounded-2xl overflow-hidden shadow-xs bg-paper text-xs">
        <div className="grid grid-cols-3 p-4 border-b border-line bg-surface/40 font-mono font-bold">
          <span>Capability</span>
          <span className="text-accent">OpenUI Registry</span>
          <span className="text-ink/60">Generic Libraries</span>
        </div>
        <div className="divide-y divide-line/60 font-mono">
          {rows.map((r) => (
            <div key={r.metric} className="grid grid-cols-3 p-4 items-center">
              <span className="font-sans font-medium text-ink">{r.metric}</span>
              <span className="text-accent font-bold">{r.us}</span>
              <span className="text-ink/60">{r.them}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
