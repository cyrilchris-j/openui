import { GlitchInterrupt } from "./glitch-interrupt";

export default function Demo() {
  return (
    <div className="flex min-h-[13rem] items-center justify-center bg-ink p-10">
      <GlitchInterrupt className="text-step-3 text-paper">signal / lost</GlitchInterrupt>
    </div>
  );
}
