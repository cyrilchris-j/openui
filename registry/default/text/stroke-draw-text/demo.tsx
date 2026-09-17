import { StrokeDrawText } from "./stroke-draw-text";

export default function Demo() {
  return (
    <div className="flex min-h-[12rem] items-center justify-center bg-paper p-10">
      <StrokeDrawText className="font-display text-ink" size={56}>
        Signature
      </StrokeDrawText>
    </div>
  );
}
