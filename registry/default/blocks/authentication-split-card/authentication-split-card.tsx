"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export function AuthenticationSplitCard({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [isSignUp, setIsSignUp] = React.useState(false);
  const [email, setEmail] = React.useState("");

  return (
    <div className={cn("w-full max-w-md mx-auto p-6 sm:p-8 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-lg", className)} {...props}>
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
          {isSignUp ? "Create your workspace" : "Welcome back to OpenUI"}
        </h3>
        <p className="text-xs text-neutral-500 mt-1">
          {isSignUp ? "Join 10,000+ teams building zero-dependency web apps" : "Enter your credentials or continue with OAuth"}
        </p>
      </div>

      <div className="space-y-3">
        <button
          type="button"
          className="w-full py-2.5 px-4 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-xs font-semibold text-neutral-800 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
        >
          <span>Continue with GitHub</span>
        </button>
        <button
          type="button"
          className="w-full py-2.5 px-4 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-xs font-semibold text-neutral-800 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
        >
          <span>Continue with Google</span>
        </button>
      </div>

      <div className="relative my-6 text-center">
        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-neutral-200 dark:border-neutral-800" /></div>
        <span className="relative px-3 bg-white dark:bg-neutral-950 text-[11px] font-mono text-neutral-400 uppercase">Or email</span>
      </div>

      <form onSubmit={(e) => e.preventDefault()} className="space-y-3 text-xs">
        <div>
          <label className="block font-medium text-neutral-700 dark:text-neutral-300 mb-1">Work Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            required
            className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:ring-1 focus:ring-emerald-500"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2.5 rounded-lg bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 font-semibold hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
        >
          {isSignUp ? "Sign Up with Email" : "Sign In with Magic Link"}
        </button>
      </form>

      <div className="mt-6 text-center text-xs text-neutral-500">
        {isSignUp ? "Already have an account? " : "Don't have an account? "}
        <button
          type="button"
          onClick={() => setIsSignUp(!isSignUp)}
          className="font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
        >
          {isSignUp ? "Sign In" : "Sign Up"}
        </button>
      </div>
    </div>
  );
}
