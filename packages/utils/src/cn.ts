import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges conditional class names and de-duplicates conflicting Tailwind
 * utilities (later wins). Every UI component uses this so consumers can always
 * override styling through `className`.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
