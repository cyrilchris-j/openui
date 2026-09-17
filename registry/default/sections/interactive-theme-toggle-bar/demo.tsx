"use client";

import { InteractiveThemeToggleBar } from "./interactive-theme-toggle-bar";

export default function Demo() {
  return (
    <div className="w-full min-h-[150px] flex items-center justify-center bg-neutral-50 dark:bg-neutral-900">
      <InteractiveThemeToggleBar />
    </div>
  );
}
