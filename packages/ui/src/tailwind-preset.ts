import type { Config } from "tailwindcss";

/**
 * OpenUI Tailwind preset.
 *
 * Every app in the monorepo extends this, which is what keeps the website, the
 * docs and the admin console recognisably one product. The tokens here mirror
 * the custom properties in `styles/globals.css` — that duplication is
 * deliberate: Tailwind needs literal values at build time, and a design system
 * applied at runtime needs them as variables. When a registry theme swaps the
 * variables, the utilities below resolve to the new values, because every token
 * is defined in terms of `var(...)`.
 */
export const openuiPreset: Omit<Config, "content"> = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        paper: "hsl(var(--paper) / <alpha-value>)",
        ink: "hsl(var(--ink) / <alpha-value>)",
        graphite: "hsl(var(--graphite) / <alpha-value>)",
        line: "hsl(var(--line) / <alpha-value>)",
        oxide: "hsl(var(--oxide) / <alpha-value>)",
        moss: "hsl(var(--moss) / <alpha-value>)",
        azure: "hsl(var(--azure) / <alpha-value>)",
      },
      fontFamily: {
        display: "var(--font-display)",
        sans: "var(--font-sans)",
        mono: "var(--font-mono)",
      },
      fontSize: {
        // The modular scale from globals.css, exposed as text-* utilities.
        "step--1": "var(--step--1)",
        "step-0": "var(--step-0)",
        "step-1": "var(--step-1)",
        "step-2": "var(--step-2)",
        "step-3": "var(--step-3)",
        "step-4": "var(--step-4)",
        "step-5": "var(--step-5)",
      },
      spacing: {
        "space-1": "var(--space-1)",
        "space-2": "var(--space-2)",
        "space-3": "var(--space-3)",
        "space-4": "var(--space-4)",
        "space-6": "var(--space-6)",
        "space-8": "var(--space-8)",
        "space-12": "var(--space-12)",
        "space-16": "var(--space-16)",
        "space-24": "var(--space-24)",
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        pill: "var(--radius-pill)",
      },
      transitionDuration: {
        fast: "var(--motion-fast)",
        normal: "var(--motion-normal)",
        slow: "var(--motion-slow)",
      },
      transitionTimingFunction: {
        // One easing curve for the whole product. A second curve is a bug.
        editorial: "var(--motion-ease)",
      },
      maxWidth: {
        measure: "var(--measure)",
        shell: "var(--shell-max)",
      },
      keyframes: {
        "rule-draw": {
          from: { transform: "scaleX(0)" },
          to: { transform: "scaleX(1)" },
        },
        "ink-in": {
          from: { opacity: "0", transform: "translateY(0.4rem)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "rule-draw": "rule-draw var(--motion-slow) var(--motion-ease) both",
        "ink-in": "ink-in var(--motion-normal) var(--motion-ease) both",
        marquee: "marquee 32s linear infinite",
      },
    },
  },
  plugins: [],
};

export default openuiPreset;
