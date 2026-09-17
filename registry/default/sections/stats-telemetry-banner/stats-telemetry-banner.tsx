"use client";

import { cn } from "@/lib/cn";

export interface StatItem {
  metric: string;
  label: string;
}

export interface StatsTelemetryBannerProps extends React.HTMLAttributes<HTMLElement> {
  stats?: StatItem[];
}

export function StatsTelemetryBanner({
  stats = [
    { metric: "800", label: "Unique Working Resources" },
    { metric: "100%", label: "TypeScript Strictness" },
    { metric: "0ms", label: "Runtime Dependencies" },
    { metric: "14", label: "Monorepo Packages" },
  ],
  className,
  ...props
}: StatsTelemetryBannerProps) {
  return (
    <section className={cn("py-12 px-6 max-w-5xl mx-auto font-sans bg-paper text-ink", className)} {...props}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-8 rounded-3xl border border-line bg-surface/30">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <div className="text-3xl sm:text-4xl font-bold font-mono text-ink tracking-tight">{s.metric}</div>
            <div className="text-xs text-ink/60 mt-1 font-sans">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
