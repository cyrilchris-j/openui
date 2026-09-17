"use client";

import { InteractiveRatingCollector } from "./interactive-rating-collector";

export default function Demo() {
  return (
    <div className="w-full min-h-[250px] flex items-center justify-center p-4 bg-neutral-50 dark:bg-neutral-900/40">
      <InteractiveRatingCollector />
    </div>
  );
}
