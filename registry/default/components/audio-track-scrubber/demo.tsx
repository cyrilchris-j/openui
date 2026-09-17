"use client";

import { AudioTrackScrubber } from "./audio-track-scrubber";

export default function AudioTrackScrubberDemo() {
  return (
    <div className="flex items-center justify-center p-8 bg-surface/20 min-h-[220px]">
      <AudioTrackScrubber />
    </div>
  );
}
