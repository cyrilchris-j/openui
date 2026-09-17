"use client";

import { InteractiveTerminalPlayground } from "./interactive-terminal-playground";

export default function Demo() {
  return (
    <div className="w-full min-h-[350px] flex items-center justify-center p-4 bg-neutral-900">
      <InteractiveTerminalPlayground />
    </div>
  );
}
