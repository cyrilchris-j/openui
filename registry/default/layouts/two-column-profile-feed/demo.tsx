"use client";

import { TwoColumnProfileFeed } from "./two-column-profile-feed";

export default function TwoColumnProfileFeedDemo() {
  return (
    <TwoColumnProfileFeed
      bio={
        <div>
          <h3 className="text-sm font-bold text-ink">Cyril Chris</h3>
          <p className="text-xs text-ink/60 mt-1">Lead Design Systems Architect</p>
        </div>
      }
    >
      <div className="p-4 rounded-xl border border-line bg-paper text-xs">Activity update from architect.</div>
    </TwoColumnProfileFeed>
  );
}
