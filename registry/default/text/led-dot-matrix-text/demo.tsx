import { LedDotMatrixText } from "./led-dot-matrix-text";

export default function Demo() {
  return (
    <div className="flex min-h-[13rem] items-center justify-center bg-paper p-10">
      <LedDotMatrixText scroll={0}>OPEN 24/7</LedDotMatrixText>
    </div>
  );
}
