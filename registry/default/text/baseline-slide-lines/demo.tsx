import { BaselineSlideLines } from "./baseline-slide-lines";

export default function Demo() {
  return (
    <div className="flex min-h-[14rem] items-center justify-center bg-paper p-10">
      <BaselineSlideLines
        lines={["Interfaces should", "have a fingerprint."]}
        className="font-display text-step-4 text-ink"
      />
    </div>
  );
}
