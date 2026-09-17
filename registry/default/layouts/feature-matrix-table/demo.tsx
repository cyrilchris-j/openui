"use client";

import { FeatureMatrixTable } from "./feature-matrix-table";

export default function FeatureMatrixTableDemo() {
  return (
    <FeatureMatrixTable>
      <div className="grid grid-cols-4 p-3 border-b border-line bg-surface/30 font-bold font-mono text-[11px]">
        <span>Feature</span>
        <span className="text-center">Community</span>
        <span className="text-center text-accent">Pro</span>
        <span className="text-center">Enterprise</span>
      </div>
      <div className="grid grid-cols-4 p-3 border-b border-line/60">
        <span className="font-medium">800 Registry Components</span>
        <span className="text-center">✓</span>
        <span className="text-center text-accent font-bold">✓</span>
        <span className="text-center">✓</span>
      </div>
    </FeatureMatrixTable>
  );
}
