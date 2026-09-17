"use client";

import { HardwareAcceleratedBanner } from "./hardware-accelerated-banner";

export default function Demo() {
  return (
    <div className="w-full min-h-[150px] flex items-center justify-center bg-neutral-900">
      <HardwareAcceleratedBanner />
    </div>
  );
}
