"use client";

import { cn } from "@/lib/cn";

export interface SplitRecipeCardProps extends React.HTMLAttributes<HTMLDivElement> {
  ingredients?: React.ReactNode;
  instructions?: React.ReactNode;
}

export function SplitRecipeCard({ ingredients, instructions, className, ...props }: SplitRecipeCardProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-12 gap-6 max-w-4xl mx-auto p-6 rounded-2xl border border-line bg-paper font-serif shadow-sm", className)} {...props}>
      <div className="md:col-span-4 border-b md:border-b-0 md:border-r border-line pb-4 md:pb-0 md:pr-4">{ingredients}</div>
      <div className="md:col-span-8 space-y-4">{instructions}</div>
    </div>
  );
}
