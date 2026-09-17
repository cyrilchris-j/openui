"use client";

import { SplitInvoiceLedger } from "./split-invoice-ledger";

export default function SplitInvoiceLedgerDemo() {
  return (
    <SplitInvoiceLedger
      clientInfo={
        <div>
          <div className="font-bold text-ink mb-1">INVOICE #08492</div>
          <div className="text-ink/60">Client: DeepMind Core</div>
          <div className="text-ink/60">Date: 2026-09-18</div>
        </div>
      }
      lineItems={
        <div>
          <div className="flex justify-between border-b border-line pb-2 font-bold">
            <span>Item Description</span>
            <span>Amount</span>
          </div>
          <div className="flex justify-between py-2 text-ink/80 border-b border-line/50">
            <span>Registry Automation Infrastructure</span>
            <span>$12,500.00</span>
          </div>
        </div>
      }
    />
  );
}
