"use client";

import { cn } from "@/lib/cn";

export interface ValuesManifestoGridProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
}

export function ValuesManifestoGrid({
  title = "Our Core Architectural Axioms",
  className,
  ...props
}: ValuesManifestoGridProps) {
  const axioms = [
    { num: "01", title: "Autonomy", desc: "No runtime dependency handcuffs. You own every line of emitted code." },
    { num: "02", title: "Mathematical Rigor", desc: "Closed type schemas that eliminate subjective runtime regressions." },
    { num: "03", title: "Character", desc: "Interfaces should carry a distinct fingerprint rather than corporate blandness." },
  ];

  return (
    <section className={cn("py-16 px-6 max-w-5xl mx-auto font-sans bg-paper text-ink", className)} {...props}>
      <h2 className="text-2xl sm:text-3xl font-bold font-serif text-center text-ink mb-12">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {axioms.map((a) => (
          <div key={a.num} className="p-6 rounded-2xl border border-line bg-surface/30 space-y-3">
            <div className="font-mono text-2xl font-bold text-accent">{a.num}</div>
            <div className="font-serif text-lg font-bold text-ink">{a.title}</div>
            <p className="text-xs text-ink/70 leading-relaxed font-sans">{a.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
