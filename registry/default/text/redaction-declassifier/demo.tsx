import { RedactionDeclassifier } from "./redaction-declassifier";

export default function Demo() {
  return (
    <div className="flex min-h-[13rem] items-center justify-center bg-paper p-10">
      <RedactionDeclassifier
        className="w-full max-w-lg"
        segments={[
          "MEMO: The registry will ship",
          { secret: "800 resources" },
          "by end of quarter, pending",
          { secret: "uniqueness validation" },
          ". Distribution limited to",
          { secret: "everyone, because open source" },
          ".",
        ]}
      />
    </div>
  );
}
