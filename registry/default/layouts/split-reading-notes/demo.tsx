"use client";

import { SplitReadingNotes } from "./split-reading-notes";

export default function SplitReadingNotesDemo() {
  return (
    <SplitReadingNotes>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        <div className="md:col-span-8 text-sm leading-relaxed text-ink/90">
          The fundamental purpose of marginalia is to enrich the primary narrative without interrupting the reader’s cognitive rhythm.
        </div>
        <aside className="md:col-span-4 text-xs font-mono text-ink/60 border-l border-line pl-3">
          Note 1: Refer to Edward Tufte’s Beautiful Evidence (2006) for seminal guidelines.
        </aside>
      </div>
    </SplitReadingNotes>
  );
}
