import { AsymmetricSplit } from "./asymmetric-split";

export default function Demo() {
  return (
    <div className="bg-paper p-10 text-ink">
      <AsymmetricSplit
        ratio={5}
        gap="lg"
        main={
          <>
            <h2 className="font-[family-name:var(--font-display)] text-4xl leading-tight">
              The 7/5 split is an argument about what matters.
            </h2>
            <p className="mt-4 max-w-prose text-[15px] leading-relaxed text-graphite">
              A fifty-fifty two-column layout says both halves matter equally, which is almost never
              true. Choosing a ratio is a design decision; the default should not make it for you.
            </p>
          </>
        }
        aside={
          <dl className="space-y-4 border-t border-line pt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-graphite">
            <div>
              <dt>Ratio</dt>
              <dd className="text-ink">7 / 5</dd>
            </div>
            <div>
              <dt>Breakpoint</dt>
              <dd className="text-ink">1024px</dd>
            </div>
            <div>
              <dt>Mobile</dt>
              <dd className="text-ink">Recomposed, not hidden</dd>
            </div>
          </dl>
        }
      />
    </div>
  );
}
