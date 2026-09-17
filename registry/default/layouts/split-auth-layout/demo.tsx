"use client";

import { SplitAuthLayout } from "./split-auth-layout";

export default function SplitAuthLayoutDemo() {
  return (
    <SplitAuthLayout
      mural={<div className="font-mono text-xs text-ink/60">OpenUI Design Ecosystem</div>}
      form={
        <div className="w-full max-w-xs space-y-3">
          <div className="text-sm font-bold text-ink">Welcome back</div>
          <input type="email" placeholder="name@company.com" className="w-full px-3 py-1.5 rounded border border-line text-xs font-mono bg-paper" />
          <button type="button" className="w-full py-1.5 rounded bg-accent text-white font-mono text-xs">Sign In</button>
        </div>
      }
    />
  );
}
