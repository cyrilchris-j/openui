import typography from "@tailwindcss/typography";
import { openuiPreset } from "@openui/ui/tailwind-preset";
import type { Config } from "tailwindcss";

/**
 * The web app's Tailwind configuration.
 *
 * Everything visual comes from the shared preset — this file only says *what to
 * scan*. If a utility is needed that the preset does not have, add it there so
 * the docs and admin console stay in step.
 */
export default {
  presets: [openuiPreset as Config],
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
    // The registry sources are rendered verbatim in the playground, so their
    // utilities have to be generated too.
    "../../registry/**/*.{ts,tsx}",
    "../../packages/ui/src/**/*.{ts,tsx}",
  ],
  plugins: [typography],
} satisfies Config;
