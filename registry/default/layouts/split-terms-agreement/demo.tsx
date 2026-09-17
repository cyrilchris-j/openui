"use client";

import { SplitTermsAgreement } from "./split-terms-agreement";

export default function SplitTermsAgreementDemo() {
  return (
    <SplitTermsAgreement
      terms={
        <div className="text-ink/80 leading-relaxed font-serif">
          <h4 className="font-bold text-sm mb-1">OpenUI Open Source License</h4>
          <p>Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files to deal in the Software without restriction.</p>
        </div>
      }
      consent={
        <div>
          <button type="button" className="w-full py-2 rounded bg-accent text-white font-mono">I Agree</button>
        </div>
      }
    />
  );
}
