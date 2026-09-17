import { CounterTypography } from "./counter-typography";

export default function Demo() {
  return (
    <div className="flex min-h-[10rem] items-center justify-center gap-10 bg-paper p-10">
      <CounterTypography value={800} className="font-display text-step-4 text-ink" />
      <CounterTypography value={99.7} decimals={1} suffix="%" className="font-display text-step-3 text-oxide" />
      <CounterTypography value={126400} className="font-display text-step-3 text-moss" />
    </div>
  );
}
