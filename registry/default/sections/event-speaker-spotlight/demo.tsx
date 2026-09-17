"use client";

import { EventSpeakerSpotlight } from "./event-speaker-spotlight";

export default function Demo() {
  return (
    <div className="w-full min-h-[300px] flex items-center justify-center p-4 bg-neutral-100 dark:bg-neutral-900">
      <EventSpeakerSpotlight />
    </div>
  );
}
