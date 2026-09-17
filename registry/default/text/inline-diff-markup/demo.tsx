import { InlineDiffMarkup } from "./inline-diff-markup";

export default function Demo() {
  return (
    <div className="flex min-h-[13rem] items-center justify-center bg-paper p-10">
      <InlineDiffMarkup
        before="the quick brown fox jumps over the lazy dog"
        after="the quick red fox leaps over the sleepy dog"
      />
    </div>
  );
}
