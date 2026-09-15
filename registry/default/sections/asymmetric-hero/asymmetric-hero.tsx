import { cn } from "@/lib/cn";

/**
 * Asymmetric Hero
 *
 * What this hero deliberately does **not** do: centre a headline, stack three
 * feature cards under it, and lay a purple-to-blue gradient behind both.
 *
 * Instead the composition is: a narrow index rail on the left (numbers, key
 * facts, hairlines), a wide statement on the right, and a ticker along the
 * bottom edge. The eye enters at the top-right and exits along the rail, so the
 * headline is read rather than scanned past.
 *
 * Everything is present in the DOM in reading order: the rail's contents are not
 * "mobile content", they are simply placed first.
 */

export interface HeroFact {
  label: string;
  value: string;
}

export interface AsymmetricHeroProps {
  eyebrow?: string;
  statement: React.ReactNode;
  supporting?: React.ReactNode;
  facts?: HeroFact[];
  actions?: React.ReactNode;
  rail?: React.ReactNode;
  className?: string;
}

export function AsymmetricHero({
  eyebrow,
  statement,
  supporting,
  facts,
  actions,
  rail,
  className,
}: AsymmetricHeroProps) {
  return (
    <section
      aria-labelledby="hero-statement"
      className={cn("relative border-b border-line bg-paper text-ink", className)}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className="order-2 border-line px-0 lg:order-1 lg:col-span-5 lg:border-r xl:col-span-4">
          {rail ?? (
            <dl className="divide-y divide-line border-t border-line lg:border-t-0">
              {(facts ?? []).map((fact) => (
                <div key={fact.label} className="flex items-baseline justify-between gap-6 px-6 py-4">
                  <dt className="font-mono text-[11px] uppercase tracking-[0.24em] text-graphite">
                    {fact.label}
                  </dt>
                  <dd className="font-[family-name:var(--font-display)] text-xl tabular-nums">{fact.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>

        <div className="order-1 px-6 pt-14 pb-12 lg:order-2 lg:col-span-7 lg:px-12 lg:pt-24 xl:col-span-8">
          {eyebrow ? (
            <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.32em] text-oxide">{eyebrow}</p>
          ) : null}
          <h1
            id="hero-statement"
            className="max-w-[24ch] font-[family-name:var(--font-display)] text-[clamp(2.6rem,7vw,5.6rem)] leading-[0.94] tracking-[-0.03em] text-balance"
          >
            {statement}
          </h1>
          {supporting ? (
            <div className="mt-8 max-w-[52ch] text-[15px] leading-relaxed text-graphite">{supporting}</div>
          ) : null}
          {actions ? <div className="mt-10 flex flex-wrap items-center gap-4">{actions}</div> : null}
        </div>
      </div>
    </section>
  );
}

export default AsymmetricHero;
