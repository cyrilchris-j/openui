"use client";

import { BottomSheetMobileShell } from "./bottom-sheet-mobile-shell";

export default function BottomSheetMobileShellDemo() {
  return (
    <BottomSheetMobileShell
      header={<span>App Viewport</span>}
      sheet={
        <div className="space-y-1 text-xs">
          <div className="font-bold">Active Drawer</div>
          <div className="text-ink/60">Swipe down to dismiss tray</div>
        </div>
      }
    >
      <p className="text-xs text-ink/70">Main mobile viewport stream content.</p>
    </BottomSheetMobileShell>
  );
}
