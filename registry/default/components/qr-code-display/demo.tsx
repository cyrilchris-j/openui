"use client";

import { QrCodeDisplay } from "./qr-code-display";

export default function QrCodeDisplayDemo() {
  return (
    <div className="flex items-center justify-center p-8 bg-surface/20 min-h-[260px]">
      <QrCodeDisplay />
    </div>
  );
}
