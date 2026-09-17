import { ReadingLevelTinter } from "./reading-level-tinter";

export default function Demo() {
  return (
    <div className="flex min-h-[14rem] items-center justify-center bg-paper p-10">
      <ReadingLevelTinter className="w-full max-w-lg">
        Keep it short. Short sentences read fast and land hard. Longer sentences with subordinate clauses, parenthetical asides, and enumerated qualifications demand more of the reader and fade into the background noise of the page.
      </ReadingLevelTinter>
    </div>
  );
}
