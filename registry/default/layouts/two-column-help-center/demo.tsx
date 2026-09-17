"use client";

import { TwoColumnHelpCenter } from "./two-column-help-center";

export default function TwoColumnHelpCenterDemo() {
  return (
    <TwoColumnHelpCenter
      categories={
        <div className="text-xs space-y-1">
          <div className="font-bold mb-2">Help Topics</div>
          <div className="p-2 rounded bg-accent/15 text-accent font-semibold">Account & API Keys</div>
          <div className="p-2 rounded text-ink/70">CLI & Automation</div>
        </div>
      }
      articles={
        <div className="space-y-3">
          <div className="p-4 rounded-xl border border-line bg-paper text-xs">
            <h4 className="font-bold text-ink">How to generate registry bundles</h4>
            <p className="text-ink/60 mt-1">Detailed guide to building JSON artifacts.</p>
          </div>
        </div>
      }
    />
  );
}
