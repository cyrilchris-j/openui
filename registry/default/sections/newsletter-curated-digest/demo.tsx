"use client";

import { NewsletterCuratedDigest } from "./newsletter-curated-digest";

export default function Demo() {
  return (
    <div className="w-full min-h-[250px] flex items-center justify-center p-4 bg-neutral-50 dark:bg-neutral-900/40">
      <NewsletterCuratedDigest />
    </div>
  );
}
