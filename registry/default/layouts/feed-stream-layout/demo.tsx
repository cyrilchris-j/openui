"use client";

import { FeedStreamLayout } from "./feed-stream-layout";

export default function FeedStreamLayoutDemo() {
  return (
    <FeedStreamLayout
      nav={<div className="font-mono text-xs text-ink/70">Feed Channels</div>}
      feed={
        <div className="space-y-3">
          <div className="p-4 rounded-xl border border-line bg-paper text-xs">Update #1 from Agent Node</div>
          <div className="p-4 rounded-xl border border-line bg-paper text-xs">Update #2 from Agent Node</div>
        </div>
      }
      aside={<div className="font-mono text-xs text-ink/70">Trending Topics</div>}
    />
  );
}
