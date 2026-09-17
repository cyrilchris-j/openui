"use client";

import { TwoTierFooterMatrix } from "./two-tier-footer-matrix";

export default function TwoTierFooterMatrixDemo() {
  return (
    <TwoTierFooterMatrix
      columns={
        <>
          <div><span className="font-bold">Ecosystem</span><div className="mt-2 space-y-1 text-ink/60"><div>Components</div><div>Motion</div></div></div>
          <div><span className="font-bold">Resources</span><div className="mt-2 space-y-1 text-ink/60"><div>Documentation</div><div>Fingerprints</div></div></div>
          <div><span className="font-bold">Community</span><div className="mt-2 space-y-1 text-ink/60"><div>GitHub</div><div>Discussions</div></div></div>
          <div><span className="font-bold">Status</span><div className="mt-2 text-emerald-600 font-mono">100% Operational</div></div>
        </>
      }
      legal={
        <>
          <span>© 2026 OpenUI Project. All rights reserved.</span>
          <span>MIT License • Verified Registry</span>
        </>
      }
    />
  );
}
