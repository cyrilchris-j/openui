import { ChordLyricSheet } from "./chord-lyric-sheet";

export default function Demo() {
  return (
    <div className="flex min-h-[18rem] items-center justify-center bg-paper p-10">
      <ChordLyricSheet
        title="Registry Blues"
        fingerings={{ G: "3-2-0-0-0-3", C: "x-3-2-0-1-0", D: "x-x-0-2-3-2" }}
        lines={[
          { chords: [{ name: "G", column: 0 }], lyric: "Woke up this morning, opened up the repo" },
          { chords: [{ name: "C", column: 8 }], lyric: "eight hundred components staring back at me" },
          { chords: [{ name: "D", column: 4 }, { name: "G", column: 14 }], lyric: "  said one schema to rule them all" },
        ]}
      />
    </div>
  );
}
