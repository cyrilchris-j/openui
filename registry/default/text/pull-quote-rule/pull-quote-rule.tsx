import { cn } from "@/lib/cn";

export interface PullQuoteRuleProps {
  /** The full quote; the first segment gets the heavy treatment. */
  heavy: string;
  light: string;
  attribution?: string;
  className?: string;
}

export function PullQuoteRule({ heavy, light, attribution, className }: PullQuoteRuleProps) {
  return (
    <figure className={cn("max-w-prose", className)}>
      <blockquote className="font-display text-2xl leading-snug">
        <span className="font-semibold text-ink">{heavy} </span>
        <span className="font-normal text-ink/65">{light}</span>
      </blockquote>
      {attribution && (
        <figcaption className="mt-3 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-ink/50">
          <span aria-hidden className="h-px w-8 bg-line" />
          {attribution}
        </figcaption>
      )}
    </figure>
  );
}

export default PullQuoteRule;
