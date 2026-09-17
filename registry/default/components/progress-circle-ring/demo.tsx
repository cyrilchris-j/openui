import { ProgressCircleRing } from "./progress-circle-ring";

export default function Demo() {
  return (
    <div className="flex min-h-[14rem] items-center justify-center bg-paper p-8">
      <ProgressCircleRing percent={82} />
    </div>
  );
}
