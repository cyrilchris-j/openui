import { cn } from "@/lib/cn";

export interface KickerOverlinePairProps {
  kicker: string;
  headline: string;
  /** Rule colour between kicker and headline. */
  rule?: string;
  className?: string;
}

export function KickerOverlinePair({ kicker, headline, rule = "currentColor", className }: KickerOverlinePairProps) {
  return (
    <header className={cn("flex flex-col", className)}>
      <p className="font-mono text-xs uppercase tracking-[0.28em] text-ink/60">{kicker}</p>
      <span aria-hidden className="my-3 h-px w-16" style={{ background: rule, opacity: 0.5 }} />
      <h2 className="font-display text-step-4 leading-[1.04] text-ink">{headline}</h2>
    </header>
  );
}

export default KickerOverlinePair;
