"use client";

import { TelemetryLiveTailStream } from "./telemetry-live-tail-stream";

export default function Demo() {
  return (
    <div className="w-full min-h-[300px] p-4 flex items-center justify-center bg-neutral-900">
      <TelemetryLiveTailStream />
    </div>
  );
}
