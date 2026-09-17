"use client";

import { MultiColumnDirectoryList } from "./multi-column-directory-list";

export default function MultiColumnDirectoryListDemo() {
  return (
    <MultiColumnDirectoryList>
      {["Components", "Text", "Motion", "Interactions", "Backgrounds", "Layouts", "Sections", "Blocks"].map((c) => (
        <div key={c} className="p-2.5 rounded border border-line bg-surface/30">
          <div className="font-bold text-ink">{c}</div>
          <div className="text-[10px] text-ink/60 mt-0.5">100 Items (100%)</div>
        </div>
      ))}
    </MultiColumnDirectoryList>
  );
}
