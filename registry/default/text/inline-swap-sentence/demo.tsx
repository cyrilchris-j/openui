import { InlineSwapSentence } from "./inline-swap-sentence";

export default function Demo() {
  return (
    <div className="flex min-h-[11rem] items-center justify-center bg-paper p-10">
      <InlineSwapSentence
        before="Design systems should feel"
        after="to the people who use them."
        options={["inevitable", "honest", "quick", "yours"]}
        className="text-ink"
      />
    </div>
  );
}
