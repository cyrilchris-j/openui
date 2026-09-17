"use client";

import { HolyGrailLayout } from "./holy-grail-layout";

export default function HolyGrailLayoutDemo() {
  return (
    <div className="w-full border border-line rounded-xl overflow-hidden shadow-sm">
      <HolyGrailLayout
        header={<div className="font-mono text-xs font-bold">Header System Bar</div>}
        nav={<div className="font-mono text-xs text-ink/70">Navigation Drawer</div>}
        main={
          <div>
            <h2 className="text-sm font-bold text-ink mb-1">Primary Article Viewport</h2>
            <p className="text-xs text-ink/60">Fluid responsive central layout column.</p>
          </div>
        }
        aside={<div className="font-mono text-xs text-ink/70">Context Aside</div>}
        footer={<div className="font-mono text-xs">Footer Navigation & Copyright</div>}
      />
    </div>
  );
}
