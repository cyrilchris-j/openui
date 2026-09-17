import { KineticStepperCounter } from "./kinetic-stepper-counter";

export default function Demo() {
  return (
    <div className="flex min-h-[18rem] items-center justify-center bg-paper p-8">
      <KineticStepperCounter initial={7} />
    </div>
  );
}
