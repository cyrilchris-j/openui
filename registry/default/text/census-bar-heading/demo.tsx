import { CensusBarHeading } from "./census-bar-heading";

export default function Demo() {
  return (
    <div className="flex min-h-[13rem] items-center justify-center bg-paper p-10">
      <CensusBarHeading
        words={[
          { word: "Fast", value: 92 },
          { word: "small", value: 41 },
          { word: "proven", value: 78 },
        ]}
        className="text-step-3 text-ink"
      />
    </div>
  );
}
