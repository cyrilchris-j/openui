import { GrainBackground } from "./grain-background";

export default function Demo() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <GrainBackground className="min-h-56 p-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-graphite">opacity 0.06</p>
        <p className="mt-3 font-[family-name:var(--font-display)] text-3xl leading-tight">
          Paper, not pixels.
        </p>
      </GrainBackground>
      <GrainBackground opacity={0.14} scale={1.6} blend="multiply" className="min-h-56 bg-ink p-8 text-paper">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-paper/60">opacity 0.14 · dense</p>
        <p className="mt-3 font-[family-name:var(--font-display)] text-3xl leading-tight text-paper">
          Coarse tooth for dark surfaces.
        </p>
      </GrainBackground>
    </div>
  );
}
