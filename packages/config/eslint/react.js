import base from "./base.js";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import tseslint from "typescript-eslint";

/**
 * ESLint flat config for browser React packages and applications.
 */
export default tseslint.config(...base, {
  files: ["**/*.{ts,tsx}"],
  languageOptions: {
    globals: {
      ...globals.browser,
      ...globals.node,
    },
  },
  plugins: {
    "react-hooks": reactHooks,
    "react-refresh": reactRefresh,
  },
  rules: {
    ...reactHooks.configs.recommended.rules,
    "react-refresh/only-export-components": "off",
    "react-hooks/exhaustive-deps": "warn",
  },
});
