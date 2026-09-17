import { BlurRevealText } from "./blur-reveal-text";

export default function Demo() {
  return (
    <div className="flex min-h-[10rem] items-center justify-center bg-paper p-10">
      <BlurRevealText
        text="Clarity arrives one word at a time."
        className="font-display text-step-2 text-ink"
      />
    </div>
  );
}
