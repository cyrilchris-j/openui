"use client";

import { CustomerStoryMasonry } from "./customer-story-masonry";

export default function Demo() {
  return (
    <div className="w-full min-h-[400px] flex items-center justify-center p-4 bg-stone-100/50 dark:bg-neutral-950">
      <CustomerStoryMasonry />
    </div>
  );
}
