"use client";

import { CenteredReadingProse } from "./centered-reading-prose";

export default function CenteredReadingProseDemo() {
  return (
    <CenteredReadingProse>
      <h1 className="text-2xl font-bold tracking-tight text-ink font-serif">On the Architecture of Clean Web APIs</h1>
      <p className="text-ink/80 text-sm">
        Simplicity is not the lack of clutter, that’s a consequence of simplicity. Simplicity somehow essentially describes the purpose and place of an object and product.
      </p>
      <p className="text-ink/80 text-sm">
        When an API is crafted with distinct boundary contracts, maintaining and evolving systems over time becomes an act of deliberate refinement.
      </p>
    </CenteredReadingProse>
  );
}
