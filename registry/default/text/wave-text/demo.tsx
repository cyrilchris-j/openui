import { WaveText } from "./wave-text";

export default function Demo() {
  return (
    <div className="flex min-h-[10rem] items-center justify-center bg-paper p-10">
      <WaveText text="Riding the baseline" className="font-display text-step-3 text-ink" />
    </div>
  );
}
