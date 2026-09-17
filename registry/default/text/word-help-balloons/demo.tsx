import { WordHelpBalloons } from "./word-help-balloons";

export default function Demo() {
  return (
    <div className="flex min-h-[14rem] items-center justify-center bg-paper p-10">
      <WordHelpBalloons
        segments={[
          "Every registry item ships with a",
          { term: "fingerprint", definition: "Five axes describing interaction, rendering, motion, layout and purpose." },
          "so near-duplicates are refused at validation time.",
        ]}
        className="text-ink"
      />
    </div>
  );
}
