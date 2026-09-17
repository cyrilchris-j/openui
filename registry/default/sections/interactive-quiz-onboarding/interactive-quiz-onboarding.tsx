"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export interface QuizQuestion {
  id: string;
  title: string;
  options: { label: string; tag: string }[];
}

export interface InteractiveQuizOnboardingProps extends React.HTMLAttributes<HTMLElement> {
  questions?: QuizQuestion[];
}

const DEFAULT_QUESTIONS: QuizQuestion[] = [
  {
    id: "q1",
    title: "What framework is your team targeting?",
    options: [
      { label: "Next.js 15 (App Router)", tag: "nextjs" },
      { label: "Vite + React 19", tag: "vite" },
      { label: "Remix / React Router v7", tag: "remix" },
      { label: "Astro / Static SSG", tag: "astro" },
    ],
  },
  {
    id: "q2",
    title: "What is your primary design aesthetic?",
    options: [
      { label: "Minimal & Clean Grotesk", tag: "minimal" },
      { label: "High-Contrast Brutalist", tag: "brutalist" },
      { label: "Refined Swiss Editorial", tag: "editorial" },
      { label: "High-Density Technical", tag: "technical" },
    ],
  },
];

export function InteractiveQuizOnboarding({
  questions = DEFAULT_QUESTIONS,
  className,
  ...props
}: InteractiveQuizOnboardingProps) {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [answers, setAnswers] = React.useState<Record<string, string>>({});

  const question = questions[currentStep];
  const isFinished = currentStep >= questions.length;

  const handleSelect = (tag: string) => {
    if (!question) return;
    setAnswers((prev) => ({ ...prev, [question.id]: tag }));
    setCurrentStep((prev) => prev + 1);
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentStep(0);
  };

  return (
    <section className={cn("w-full py-16 px-4 md:px-8 max-w-3xl mx-auto", className)} {...props}>
      <div className="bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 md:p-8 shadow-sm">
        {!isFinished && question ? (
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-4">
              <span>Step {currentStep + 1} of {questions.length}</span>
              <span>Stack Configurator</span>
            </div>
            <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
              {question.title}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {question.options.map((opt) => (
                <button
                  key={opt.tag}
                  type="button"
                  onClick={() => handleSelect(opt.tag)}
                  className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 text-left hover:border-emerald-500 hover:bg-emerald-50/20 dark:hover:bg-emerald-950/20 transition-all text-xs font-medium text-neutral-800 dark:text-neutral-200"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-4">
            <span className="text-3xl">✨</span>
            <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mt-2">
              Configuration Tailored!
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-2">
              Based on your stack selections, your recommended starter command is ready:
            </p>
            <div className="mt-4 p-3 bg-neutral-100 dark:bg-neutral-900 rounded font-mono text-xs text-emerald-600 dark:text-emerald-400">
              npx openui@latest init --stack={answers.q1 || "nextjs"} --style={answers.q2 || "minimal"}
            </div>
            <button
              type="button"
              onClick={handleReset}
              className="mt-6 px-4 py-2 rounded-lg text-xs font-semibold bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900"
            >
              Start Over
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
