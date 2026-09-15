import { cn } from "@/lib/cn";

/**
 * Industrial Dashboard
 *
 * The anti-card dashboard. Instead of a grid of rounded, shadowed tiles, the
 * surface is divided by hairlines into regions of different weight: a wide
 * primary region for the operational list, a narrow rail for counters. That
 * single decision removes the "every tile is equally important" problem that
 * makes dashboard work look generated.
 *
 * Figures use tabular numerals and are right-aligned so a column of numbers can
 * be compared by shape, not by reading.
 */

export interface Metric {
  label: string;
  value: string;
  delta?: string;
  /** `up` is not automatically good — this only controls the sign glyph. */
  trend?: "up" | "down" | "flat";
}

export interface DashboardPanel {
  title: string;
  content: React.ReactNode;
  /** Column span out of 12 at the `lg` breakpoint. */
  span?: 3 | 4 | 6 | 8 | 12;
}

export interface IndustrialDashboardProps {
  title: string;
  metrics: Metric[];
  panels: DashboardPanel[];
  actions?: React.ReactNode;
  className?: string;
}

const SPAN: Record<NonNullable<DashboardPanel["span"]>, string> = {
  3: "lg:col-span-3",
  4: "lg:col-span-4",
  6: "lg:col-span-6",
  8: "lg:col-span-8",
  12: "lg:col-span-12",
};

const TREND_GLYPH: Record<NonNullable<Metric["trend"]>, string> = {
  up: "▲",
  down: "▼",
  flat: "—",
};

export function IndustrialDashboard({ title, metrics, panels, actions, className }: IndustrialDashboardProps) {
  return (
    <section aria-label={title} className={cn("border border-ink bg-paper text-ink", className)}>
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-ink px-5 py-3">
        <h2 className="font-mono text-[11px] uppercase tracking-[0.28em] text-graphite">{title}</h2>
        {actions}
      </header>

      <div className="grid grid-cols-2 divide-x divide-y divide-line border-b border-ink sm:grid-cols-4 sm:divide-y-0">
        {metrics.map((metric) => (
          <div key={metric.label} className="px-5 py-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-graphite">{metric.label}</p>
            <p className="mt-2 flex items-baseline gap-2">
              <span className="font-[family-name:var(--font-display)] text-3xl tabular-nums">
                {metric.value}
              </span>
              {metric.trend ? (
                <span
                  aria-label={metric.trend === "flat" ? "no change" : `trending ${metric.trend}`}
                  className="font-mono text-[11px] text-graphite"
                >
                  <span aria-hidden="true">{TREND_GLYPH[metric.trend]}</span>
                  {metric.delta ? ` ${metric.delta}` : null}
                </span>
              ) : null}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-0 divide-line lg:grid-cols-12 lg:divide-x">
        {panels.map((panel) => (
          <div key={panel.title} className={cn("border-b border-line lg:border-b-0", SPAN[panel.span ?? 6])}>
            <h3 className="border-b border-line px-5 py-2 font-mono text-[10px] uppercase tracking-[0.24em] text-graphite">
              {panel.title}
            </h3>
            <div className="p-5">{panel.content}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default IndustrialDashboard;
