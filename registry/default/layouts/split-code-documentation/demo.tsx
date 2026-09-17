"use client";

import { SplitCodeDocumentation } from "./split-code-documentation";

export default function SplitCodeDocumentationDemo() {
  return (
    <SplitCodeDocumentation
      prose={
        <div>
          <h3 className="text-sm font-bold text-ink">Fetch Registry Item</h3>
          <p className="text-xs text-ink/60 mt-1">Retrieves JSON manifest and source payload.</p>
        </div>
      }
      code={<div>curl -s https://openui.design/r/holy-grail-layout.json</div>}
    />
  );
}
