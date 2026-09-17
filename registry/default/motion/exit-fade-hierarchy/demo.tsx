import { ExitFadeHierarchy } from "./exit-fade-hierarchy";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center bg-paper p-10">
      <ExitFadeHierarchy className="w-80">
        <p className="font-display text-xl text-ink">The headline holds</p>
        <p className="text-sm text-ink/70">Supporting copy follows it out.</p>
        <p className="text-xs text-ink/50">Footnotes dissolve first.</p>
      </ExitFadeHierarchy>
    </div>
  );
}
