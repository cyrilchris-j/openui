import { CursorTrail } from "./cursor-trail";

export default function Demo() {
  return (
    <div className="relative bg-ink p-10 text-paper">
      <CursorTrail count={22} ease={0.34} />
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-paper/60">Move the pointer</p>
      <p className="mt-4 max-w-lg font-[family-name:var(--font-display)] text-3xl leading-tight">
        The trail follows with easing, not with a listener per dot.
      </p>
    </div>
  );
}
