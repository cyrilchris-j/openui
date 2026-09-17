"use client";

import { ChangelogReleaseFeed } from "./changelog-release-feed";

export default function Demo() {
  return (
    <div className="w-full min-h-[400px] flex items-center justify-center p-4 bg-white dark:bg-neutral-950">
      <ChangelogReleaseFeed />
    </div>
  );
}
