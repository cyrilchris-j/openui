import { BreathingLoader } from "./breathing-loader";

export default function Demo() {
  return (
    <div className="flex min-h-[14rem] items-center justify-center bg-paper p-10">
      <BreathingLoader label="Validating registry" />
    </div>
  );
}
