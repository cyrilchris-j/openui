import { JustifyHyphenProof } from "./justify-hyphen-proof";

export default function Demo() {
  return (
    <div className="flex min-h-[16rem] items-center justify-center bg-paper p-10">
      <JustifyHyphenProof className="w-full max-w-lg">
        Justified text trades even edges for uneven spacing. Set well, it reads like print; set poorly, white rivers run down the paragraph and the measure collapses into noise.
      </JustifyHyphenProof>
    </div>
  );
}
