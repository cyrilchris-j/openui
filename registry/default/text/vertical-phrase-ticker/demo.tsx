import { VerticalPhraseTicker } from "./vertical-phrase-ticker";

export default function Demo() {
  return (
    <div className="flex min-h-[12rem] items-center justify-center bg-paper p-10">
      <p className="text-step-3 text-ink">
        Build it{" "}
        <VerticalPhraseTicker phrases={["once.", "well.", "yours."]} className="font-semibold text-accent" />
      </p>
    </div>
  );
}
