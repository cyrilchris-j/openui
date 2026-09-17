"use client";

import { SplitReadingDictionary } from "./split-reading-dictionary";

export default function SplitReadingDictionaryDemo() {
  return (
    <SplitReadingDictionary
      terms={
        <div className="text-xs space-y-1">
          <div className="font-bold text-accent">Macrostructure</div>
          <div className="text-ink/70">Motion Language</div>
          <div className="text-ink/70">Density Matrix</div>
        </div>
      }
      definition={
        <div>
          <h3 className="text-lg font-bold text-ink">Macrostructure</h3>
          <p className="text-xs text-ink/70 mt-1 leading-relaxed">
            The fundamental architectural topology of an interface (e.g. split, stack, mosaic, rail, full-bleed).
          </p>
        </div>
      }
    />
  );
}
