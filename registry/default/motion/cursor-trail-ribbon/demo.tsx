import { CursorTrailRibbon } from "./cursor-trail-ribbon";

export default function Demo() {
  return (
    <div className="relative min-h-[20rem] overflow-hidden rounded-xl bg-ink p-10">
      <p className="relative z-10 font-display text-2xl text-paper">Move your pointer</p>
      <p className="relative z-10 mt-2 text-sm text-paper/60">The ribbon remembers where you have been.</p>
      <CursorTrailRibbon />
    </div>
  );
}
