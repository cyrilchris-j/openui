import { Monitor, Moon, Sun } from "lucide-react";
import * as React from "react";

import { SegmentedControl, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@openui/ui";

import { useTheme, type Theme } from "../hooks/use-theme.js";

/**
 * Theme control.
 *
 * A three-way segmented control rather than a two-state switch, because
 * "follow the system" is a real preference that a binary toggle silently
 * destroys the first time it is used.
 *
 * The options carry icons *and* labels at larger sizes: an icon-only control
 * for a three-state setting is a guessing game.
 */
export function ThemeToggle(): React.JSX.Element {
  const { theme, setTheme } = useTheme();

  const cycleTheme = () => {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("system");
    else setTheme("light");
  };

  return (
    <>
      {/* Mobile icon-only theme toggle (< lg) */}
      <button
        type="button"
        onClick={cycleTheme}
        aria-label={`Current theme: ${theme}. Tap to switch theme.`}
        title={`Theme: ${theme} (tap to cycle)`}
        className="grid h-8 w-8 sm:h-9 sm:w-9 place-items-center border border-line text-graphite transition-colors duration-fast hover:border-ink hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oxide lg:hidden"
      >
        {theme === "light" ? (
          <Sun aria-hidden className="h-4 w-4 text-ink" />
        ) : theme === "dark" ? (
          <Moon aria-hidden className="h-4 w-4 text-ink" />
        ) : (
          <Monitor aria-hidden className="h-4 w-4 text-graphite" />
        )}
      </button>

      {/* Desktop segmented control (>= lg) */}
      <TooltipProvider delayDuration={400}>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="hidden lg:block">
              <SegmentedControl
                label="Colour theme"
                hideLabel
                value={theme}
                onValueChange={(value) => setTheme(value as Theme)}
                options={[
                  {
                    value: "light",
                    label: "Light",
                    icon: <Sun aria-hidden className="h-3.5 w-3.5" />,
                  },
                  {
                    value: "dark",
                    label: "Dark",
                    icon: <Moon aria-hidden className="h-3.5 w-3.5" />,
                  },
                  {
                    value: "system",
                    label: "System",
                    icon: <Monitor aria-hidden className="h-3.5 w-3.5" />,
                  },
                ]}
              />
            </div>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            Theme — light, dark, or follow the system
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
}
