"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export interface WorkflowStep {
  step: string;
  title: string;
  summary: string;
  details: string[];
}

export interface InteractiveWorkflowStepperProps extends React.HTMLAttributes<HTMLElement> {
  steps?: WorkflowStep[];
}

const DEFAULT_STEPS: WorkflowStep[] = [
  {
    step: "01",
    title: "Instrument Client SDK",
    summary: "Add a 2-line client snippet to your React or Next.js app root.",
    details: ["Zero bundle impact with sub-2kb dynamic loader", "Automatic session ID stitching and cookie-less attribution"],
  },
  {
    step: "02",
    title: "Declare Invariants",
    summary: "Define schema rules, rate limits, and egress constraints in openui.config.ts.",
    details: ["Type-checked configuration validated at build time", "Automated GitHub Action validation against pull requests"],
  },
  {
    step: "03",
    title: "Edge Provisioning",
    summary: "Global nodes sync within 200ms of any Git push.",
    details: ["Zero cold starts on V8 isolates worldwide", "Automatic rollback on HTTP 5xx error spikes over 1%"],
  },
  {
    step: "04",
    title: "Real-time Verification",
    summary: "Inspect live request telemetry and visual state diffs directly in your terminal.",
    details: ["CLI tail streaming directly from production edge", "Export sanitized HAR traces for post-mortems"],
  },
];

export function InteractiveWorkflowStepper({
  steps = DEFAULT_STEPS,
  className,
  ...props
}: InteractiveWorkflowStepperProps) {
  const [activeStepIndex, setActiveStepIndex] = React.useState(0);
  const current = steps[activeStepIndex];

  return (
    <section className={cn("w-full py-16 px-4 md:px-8 max-w-6xl mx-auto", className)} {...props}>
      <div className="mb-10">
        <span className="text-xs font-mono font-bold tracking-wider text-neutral-400 uppercase">
          Continuous Pipeline
        </span>
        <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mt-1">
          From zero to global distribution in minutes
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Steps list */}
        <div className="lg:col-span-6 space-y-3">
          {steps.map((s, idx) => {
            const isActive = idx === activeStepIndex;
            return (
              <button
                key={s.step}
                type="button"
                onClick={() => setActiveStepIndex(idx)}
                className={cn(
                  "w-full text-left p-4 rounded-xl border transition-all flex items-start gap-4",
                  isActive
                    ? "border-neutral-900 dark:border-neutral-100 bg-neutral-100/70 dark:bg-neutral-900 shadow-sm"
                    : "border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 bg-white dark:bg-neutral-950"
                )}
              >
                <span
                  className={cn(
                    "text-sm font-mono font-bold px-2 py-1 rounded",
                    isActive ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900" : "text-neutral-400 bg-neutral-100 dark:bg-neutral-800"
                  )}
                >
                  {s.step}
                </span>
                <div>
                  <div className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                    {s.title}
                  </div>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                    {s.summary}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Detail view */}
        <div className="lg:col-span-6 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 bg-white dark:bg-neutral-950">
          <div className="flex items-center justify-between pb-4 border-b border-neutral-200 dark:border-neutral-800">
            <span className="text-xs font-mono font-semibold text-neutral-400 uppercase">
              Phase {current?.step} Deep Dive
            </span>
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 mt-4">
            {current?.title}
          </h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">
            {current?.summary}
          </p>
          <div className="mt-6 space-y-3">
            {current?.details.map((detail, i) => (
              <div key={i} className="flex items-start gap-2.5 text-xs text-neutral-700 dark:text-neutral-300">
                <span className="text-emerald-500 font-bold">→</span>
                <span>{detail}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
