import { defineConfig } from "vitest/config";

/**
 * Shared Vitest defaults.
 *
 * `unit` runs in a Node environment with no network; `jsdom` variants opt in
 * per package. Tests must be deterministic — no test may depend on wall-clock
 * ordering or on a live database unless it is explicitly gated behind
 * `OPENUI_TEST_DATABASE_URL`.
 */
export const baseTestConfig = defineConfig({
  test: {
    environment: "node",
    globals: false,
    include: ["src/**/*.test.ts", "src/**/*.test.tsx", "tests/**/*.test.ts"],
    exclude: ["**/node_modules/**", "**/dist/**", "**/tests/e2e/**"],
    reporters: ["default"],
    testTimeout: 15_000,
    hookTimeout: 15_000,
  },
});

export default baseTestConfig;
