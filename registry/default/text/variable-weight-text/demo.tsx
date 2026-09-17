import { VariableWeightText } from "./variable-weight-text";

export default function Demo() {
  return (
    <div className="flex min-h-[10rem] items-center justify-center bg-paper p-10">
      <VariableWeightText
        text="PRESSURE"
        className="font-sans text-step-4 tracking-tight text-ink"
      />
    </div>
  );
}
