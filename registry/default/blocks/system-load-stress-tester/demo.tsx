"use client";

import { SystemLoadStressTester } from "./system-load-stress-tester";

export default function Demo() {
  return (
    <div className="w-full min-h-[300px] p-4 flex items-center justify-center bg-neutral-900">
      <SystemLoadStressTester />
    </div>
  );
}
