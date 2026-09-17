"use client";

import { StickyTabBarLayout } from "./sticky-tab-bar-layout";

export default function StickyTabBarLayoutDemo() {
  return (
    <StickyTabBarLayout
      tabs={
        <>
          <span className="font-bold text-accent">Design Tokens</span>
          <span className="text-ink/60">Source AST</span>
          <span className="text-ink/60">Documentation</span>
        </>
      }
    >
      <div className="p-4 rounded-xl border border-line bg-surface/30 text-xs">Section panel content viewport.</div>
    </StickyTabBarLayout>
  );
}
