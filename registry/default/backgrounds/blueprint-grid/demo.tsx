import { BlueprintGrid } from "./blueprint-grid";

export default function Demo() {
  return (
    <BlueprintGrid className="p-10">
      <div className="max-w-xl border border-ink bg-paper/85 p-6 backdrop-blur-none">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-graphite">cell 24 · module 96</p>
        <p className="mt-3 font-[family-name:var(--font-display)] text-3xl leading-tight">
          Show the grid, then break it on purpose.
        </p>
      </div>
    </BlueprintGrid>
  );
}
