"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function SupportTicketDispatcher({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const [submitted, setSubmitted] = React.useState(false);

  return (
    <section className={cn("w-full py-16 px-4 md:px-8 max-w-5xl mx-auto", className)} {...props}>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-5">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-bold">
            Assistance
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mt-1">
            Talk to engineering support
          </h2>
          <p className="text-xs text-neutral-500 mt-2 leading-relaxed">
            Our core team responds directly to technical inquiries, architecture reviews, and registry bugs.
          </p>
          <div className="mt-6 space-y-2 text-xs font-mono text-neutral-600 dark:text-neutral-400">
            <div>✉ support@openui.dev</div>
            <div>⚡ Discord: #registry-support</div>
          </div>
        </div>

        <div className="md:col-span-7 bg-white dark:bg-neutral-950 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800">
          {!submitted ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="space-y-4 text-xs"
            >
              <div>
                <label className="block font-medium text-neutral-700 dark:text-neutral-300 mb-1">Email</label>
                <input
                  type="email"
                  required
                  placeholder="engineer@company.com"
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block font-medium text-neutral-700 dark:text-neutral-300 mb-1">Topic</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Design DNA schema question"
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 font-semibold"
              >
                Send Request
              </button>
            </form>
          ) : (
            <div className="text-center py-8 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
              Thank you! An engineer will reply within 4 hours.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
