"use client";

import { ContactSupportSplit } from "./contact-support-split";

export default function ContactSupportSplitDemo() {
  return (
    <ContactSupportSplit
      info={
        <div>
          <h2 className="text-lg font-bold text-ink">Connect with Architecture Lead</h2>
          <p className="text-xs text-ink/60 mt-1">Direct inquiries to the OpenUI core systems team.</p>
        </div>
      }
      form={
        <div className="space-y-3 text-xs">
          <input type="text" placeholder="Your Name" className="w-full px-3 py-1.5 rounded border border-line bg-paper" />
          <textarea rows={3} placeholder="Message" className="w-full px-3 py-1.5 rounded border border-line bg-paper resize-none" />
          <button type="button" className="w-full py-1.5 rounded bg-accent text-white font-mono">Send</button>
        </div>
      }
    />
  );
}
