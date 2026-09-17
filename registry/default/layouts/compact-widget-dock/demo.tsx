"use client";

import { CompactWidgetDock } from "./compact-widget-dock";

export default function CompactWidgetDockDemo() {
  return (
    <CompactWidgetDock>
      {["RAM: 42%", "CPU: 18%", "NET: 80Mbps", "TEMP: 38°C"].map((w) => (
        <div key={w} className="p-2 rounded bg-surface/50 text-center font-bold text-ink">
          {w}
        </div>
      ))}
    </CompactWidgetDock>
  );
}
