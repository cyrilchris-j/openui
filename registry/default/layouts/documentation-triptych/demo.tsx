"use client";

import { DocumentationTriptych } from "./documentation-triptych";

export default function DocumentationTriptychDemo() {
  return (
    <div className="w-full border border-line rounded-xl overflow-hidden shadow-sm">
      <DocumentationTriptych
        sidebar={
          <div className="space-y-2 text-xs font-mono text-ink/70">
            <div className="font-bold text-ink">Getting Started</div>
            <div>Installation</div>
            <div>Architecture</div>
            <div>Registry API</div>
          </div>
        }
        content={
          <div>
            <h1 className="text-xl font-bold text-ink mb-2">Registry Architecture</h1>
            <p className="text-xs text-ink/70 leading-relaxed">
              OpenUI registers self-contained resources with distinct behavioral fingerprints, strict TypeScript definitions, and reproducible demos.
            </p>
          </div>
        }
        toc={
          <div className="space-y-1 text-ink/60">
            <div className="font-semibold text-ink uppercase mb-2">On This Page</div>
            <div className="text-accent">Overview</div>
            <div>Fingerprinting</div>
            <div>Validation</div>
          </div>
        }
      />
    </div>
  );
}
