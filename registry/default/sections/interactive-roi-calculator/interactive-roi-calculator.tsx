"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export interface InteractiveRoiCalculatorProps extends React.HTMLAttributes<HTMLElement> {
  defaultEngineers?: number;
  defaultHourlyRate?: number;
}

export function InteractiveRoiCalculator({
  defaultEngineers = 12,
  defaultHourlyRate = 95,
  className,
  ...props
}: InteractiveRoiCalculatorProps) {
  const [engineers, setEngineers] = React.useState(defaultEngineers);
  const [hourlyRate, setHourlyRate] = React.useState(defaultHourlyRate);

  // Assumptions: Each engineer saves ~6 hours per week on boilerplate UI and maintenance
  const hoursSavedPerYear = engineers * 6 * 48;
  const annualSavings = Math.round(hoursSavedPerYear * hourlyRate);
  const sprintDaysSaved = Math.round((hoursSavedPerYear / 8) / 10);

  return (
    <section className={cn("w-full py-16 px-4 md:px-8 max-w-5xl mx-auto", className)} {...props}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 md:p-10 shadow-sm">
        {/* Controls */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-bold">
              Engineering Velocity
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 mt-1">
              Calculate team savings
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
              Adjust team size and average loaded engineering cost to see projected annual returns.
            </p>
          </div>

          <div className="space-y-4 font-mono text-xs">
            <div>
              <div className="flex justify-between text-neutral-700 dark:text-neutral-300 mb-1">
                <span>Frontend / Fullstack Engineers</span>
                <span className="font-bold text-neutral-900 dark:text-neutral-100">{engineers} engineers</span>
              </div>
              <input
                type="range"
                min="1"
                max="100"
                value={engineers}
                onChange={(e) => setEngineers(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-neutral-700 dark:text-neutral-300 mb-1">
                <span>Average Loaded Rate ($/hr)</span>
                <span className="font-bold text-neutral-900 dark:text-neutral-100">${hourlyRate}/hr</span>
              </div>
              <input
                type="range"
                min="40"
                max="250"
                step="5"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Projections */}
        <div className="lg:col-span-6 bg-neutral-50 dark:bg-neutral-900 p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 text-center font-mono">
          <div className="text-xs uppercase text-neutral-500 tracking-wider">
            Estimated Annual Dollar Savings
          </div>
          <div className="text-4xl md:text-5xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-2">
            ${annualSavings.toLocaleString()}
          </div>
          <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-800 text-xs">
            <div>
              <div className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                {hoursSavedPerYear.toLocaleString()} hrs
              </div>
              <div className="text-[11px] text-neutral-500 mt-0.5">Dev time unlocked</div>
            </div>
            <div>
              <div className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
                {sprintDaysSaved} sprints
              </div>
              <div className="text-[11px] text-neutral-500 mt-0.5">Velocity gained</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
