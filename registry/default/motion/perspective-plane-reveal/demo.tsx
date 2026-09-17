import { PerspectivePlaneReveal } from "./perspective-plane-reveal";

export default function Demo() {
  return (
    <div className="flex min-h-[18rem] items-center justify-center bg-paper p-10">
      <PerspectivePlaneReveal className="w-80 rounded-xl border border-line bg-paper p-8 shadow-2xl">
        <p className="font-display text-xl text-ink">Rises like a drawbridge</p>
        <p className="mt-2 text-sm text-ink/70">Hinged at its own bottom edge, not slid or faded.</p>
      </PerspectivePlaneReveal>
    </div>
  );
}
