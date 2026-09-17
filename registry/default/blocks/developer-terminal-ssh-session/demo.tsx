"use client";

import { DeveloperTerminalSshSession } from "./developer-terminal-ssh-session";

export default function Demo() {
  return (
    <div className="w-full min-h-[250px] p-4 flex items-center justify-center bg-neutral-900">
      <DeveloperTerminalSshSession />
    </div>
  );
}
