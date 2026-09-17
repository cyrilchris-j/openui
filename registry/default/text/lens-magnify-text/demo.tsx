import { LensMagnifyText } from "./lens-magnify-text";

export default function Demo() {
  return (
    <div className="flex min-h-[12rem] items-center justify-center bg-paper p-10">
      <LensMagnifyText className="font-mono text-[0.85rem] text-ink">
        Inspect the fine print clause 8.4.2
      </LensMagnifyText>
    </div>
  );
}
