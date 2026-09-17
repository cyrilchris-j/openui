"use client";

import { TwoColumnFormMatrix } from "./two-column-form-matrix";

export default function TwoColumnFormMatrixDemo() {
  return (
    <TwoColumnFormMatrix>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 py-4 items-start">
        <div className="md:col-span-4">
          <h4 className="text-xs font-bold text-ink">Public Identifier</h4>
          <p className="text-[11px] text-ink/60">This name will appear on published registry packages.</p>
        </div>
        <div className="md:col-span-8">
          <input type="text" defaultValue="@openui/registry" className="w-full px-3 py-1.5 rounded border border-line text-xs font-mono bg-paper" />
        </div>
      </div>
    </TwoColumnFormMatrix>
  );
}
