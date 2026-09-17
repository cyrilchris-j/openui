"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function EcommerceCheckoutWizard({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [step, setStep] = React.useState<1 | 2 | 3>(1);

  return (
    <div className={cn("w-full max-w-4xl mx-auto p-6 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm text-xs", className)} {...props}>
      <div className="flex justify-between items-center pb-4 border-b border-neutral-200 dark:border-neutral-800 mb-6">
        <h3 className="text-base font-bold text-neutral-900 dark:text-white">Secure Checkout</h3>
        <div className="flex gap-2 font-mono">
          {[1, 2, 3].map((s) => (
            <span key={s} className={cn("h-6 w-6 rounded-full flex items-center justify-center font-bold", step === s ? "bg-emerald-600 text-white" : "bg-neutral-100 dark:bg-neutral-800 text-neutral-400")}>
              {s}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-7 space-y-4">
          {step === 1 && (
            <div>
              <h4 className="font-bold text-sm text-neutral-900 dark:text-white mb-3">1. Shipping Details</h4>
              <input type="text" placeholder="Full Address" className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 mb-2" />
              <button type="button" onClick={() => setStep(2)} className="px-4 py-2 bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 rounded-lg font-semibold">
                Continue to Payment →
              </button>
            </div>
          )}
          {step === 2 && (
            <div>
              <h4 className="font-bold text-sm text-neutral-900 dark:text-white mb-3">2. Payment Method</h4>
              <div className="p-3 border border-emerald-500 rounded-lg bg-emerald-50/20 mb-3">Credit Card (Stripe Checkout Verified)</div>
              <button type="button" onClick={() => setStep(3)} className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-semibold">
                Review Order →
              </button>
            </div>
          )}
          {step === 3 && (
            <div>
              <h4 className="font-bold text-sm text-neutral-900 dark:text-white mb-3">3. Final Confirmation</h4>
              <p className="text-neutral-500 mb-4">Click below to authorize $199.00 payment.</p>
              <button type="button" onClick={() => alert("Order placed!")} className="w-full py-2.5 bg-emerald-600 text-white font-bold rounded-lg">
                Complete Purchase ($199.00)
              </button>
            </div>
          )}
        </div>

        <div className="md:col-span-5 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 font-mono">
          <div className="font-bold text-neutral-900 dark:text-white mb-2">Order Summary</div>
          <div className="flex justify-between py-1 border-b border-neutral-200 dark:border-neutral-800">
            <span>OpenUI Pro License</span>
            <span className="font-bold">$199.00</span>
          </div>
          <div className="flex justify-between pt-3 font-bold text-neutral-900 dark:text-white">
            <span>Total</span>
            <span>$199.00</span>
          </div>
        </div>
      </div>
    </div>
  );
}
