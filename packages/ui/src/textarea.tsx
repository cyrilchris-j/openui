/**
 * `Textarea` lives beside `Input` in `./input.tsx` because the two share their
 * label, hint and error wiring — splitting them would mean duplicating that
 * logic or extracting a third module for four lines of JSX.
 *
 * This module exists so that `import { Textarea } from "@openui/ui"` resolves
 * from a predictable path without callers needing to know that.
 */
export { Textarea, type TextareaProps } from "./input.js";
