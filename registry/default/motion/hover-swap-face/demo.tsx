import { HoverSwapFace } from "./hover-swap-face";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center bg-paper p-10">
      <HoverSwapFace
        front={
          <div>
            <p className="font-display text-xl text-ink">Hover me</p>
            <p className="mt-2 text-sm text-ink/60">A real rotation, not a crossfade.</p>
          </div>
        }
        back={
          <div>
            <p className="font-display text-xl">You saw the anticipation</p>
            <p className="mt-2 text-sm opacity-70">The front dimmed before the flip began.</p>
          </div>
        }
      />
    </div>
  );
}
