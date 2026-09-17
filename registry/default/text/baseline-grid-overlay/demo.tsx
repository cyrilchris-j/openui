import { BaselineGridOverlay } from "./baseline-grid-overlay";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center bg-paper p-10">
      <BaselineGridOverlay className="w-full max-w-lg">
        Vertical rhythm is the quiet part of typography. When every line lands on the same grid, the page reads calmer before anyone can say why.
      </BaselineGridOverlay>
    </div>
  );
}
