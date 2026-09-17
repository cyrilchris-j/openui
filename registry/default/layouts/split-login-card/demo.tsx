"use client";

import { SplitLoginCard } from "./split-login-card";

export default function SplitLoginCardDemo() {
  return (
    <SplitLoginCard
      graphic={<div className="font-mono text-xs font-bold text-accent">OpenUI Core</div>}
      form={
        <div>
          <h3 className="text-sm font-bold text-ink mb-1">Sign In</h3>
          <input type="text" placeholder="Username" className="w-full px-3 py-1.5 rounded border border-line text-xs bg-paper mb-2" />
          <button type="button" className="w-full py-1.5 rounded bg-accent text-white font-mono text-xs">Enter</button>
        </div>
      }
    />
  );
}
