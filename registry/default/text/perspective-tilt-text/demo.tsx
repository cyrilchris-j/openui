import { PerspectiveTiltText } from "./perspective-tilt-text";

export default function Demo() {
  return (
    <div className="flex min-h-[14rem] items-center justify-center bg-paper p-10">
      <PerspectiveTiltText className="font-display text-step-5 tracking-tight text-ink">
        DEPTH
      </PerspectiveTiltText>
    </div>
  );
}
