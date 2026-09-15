import { SpotlightFollow } from "./spotlight-follow";

export default function Demo() {
  return (
    <div className="grid gap-4 bg-ink p-10 sm:grid-cols-3">
      {["Components", "Text", "Motion"].map((title) => (
        <SpotlightFollow key={title} className="border border-paper/15 p-6">
          <h3 className="font-[family-name:var(--font-display)] text-2xl text-paper">{title}</h3>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-paper/50">
            Hover or tab
          </p>
        </SpotlightFollow>
      ))}
    </div>
  );
}
