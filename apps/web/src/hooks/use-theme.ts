import * as React from "react";

/**
 * Light/dark theme.
 *
 * The initial class is applied by an inline script in `index.html`, before React
 * mounts, so there is no flash of the wrong theme. This hook only reads that
 * state and changes it — it never owns the source of truth, because a React
 * effect would be too late on first paint.
 *
 * `system` is a real option, not a third colour: it means "follow the OS", and
 * it is stored as the *absence* of a preference. A user who has never chosen
 * gets the OS setting now and after an OS change; a user who has chosen keeps
 * their choice.
 */

export type Theme = "light" | "dark" | "system";

const STORAGE_KEY = "openui-theme";

function readStored(): Theme {
  if (typeof window === "undefined") return "system";
  const value = window.localStorage.getItem(STORAGE_KEY);
  return value === "light" || value === "dark" ? value : "system";
}

function systemPrefersDark(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function useTheme(): {
  theme: Theme;
  resolved: "light" | "dark";
  setTheme: (theme: Theme) => void;
} {
  const [theme, setThemeState] = React.useState<Theme>(readStored);
  const [systemDark, setSystemDark] = React.useState(systemPrefersDark);

  // Following the OS means reacting to a change while the page is open.
  React.useEffect(() => {
    const list = window.matchMedia("(prefers-color-scheme: dark)");
    const update = () => setSystemDark(list.matches);
    list.addEventListener("change", update);
    return () => list.removeEventListener("change", update);
  }, []);

  const resolved: "light" | "dark" = theme === "system" ? (systemDark ? "dark" : "light") : theme;

  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", resolved === "dark");
  }, [resolved]);

  const setTheme = React.useCallback((next: Theme) => {
    setThemeState(next);
    try {
      if (next === "system") window.localStorage.removeItem(STORAGE_KEY);
      else window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // A blocked localStorage means the choice lasts for this session only,
      // which is a reasonable degradation rather than an error.
    }
  }, []);

  return { theme, resolved, setTheme };
}
