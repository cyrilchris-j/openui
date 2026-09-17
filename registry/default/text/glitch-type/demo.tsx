import { GlitchType } from "./glitch-type";

export default function Demo() {
  return (
    <div className="flex min-h-[12rem] items-center justify-center bg-ink p-10">
      <GlitchType className="font-mono text-step-3 uppercase tracking-[0.2em] text-paper">
        Signal Lost
      </GlitchType>
    </div>
  );
}
