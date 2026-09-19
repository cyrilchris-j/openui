import * as React from "react";

export interface TactileJellyToggleProps {
  label?: string;
  defaultChecked?: boolean;
}

/**
 * OpenUI Tactile Jelly Toggle
 *
 * Viscoelastic gooey switch that squishes and rebounds
 * with fluid deformation on state change.
 */
export function TactileJellyToggle({
  label = "Jelly Switch",
  defaultChecked = true,
}: TactileJellyToggleProps): React.JSX.Element {
  const [checked, setChecked] = React.useState(defaultChecked);
  const [squishing, setSquishing] = React.useState(false);

  const toggle = () => {
    setSquishing(true);
    setChecked(!checked);
    setTimeout(() => setSquishing(false), 400);
  };

  return (
    <div className="flex items-center gap-3 select-none cursor-pointer" onClick={toggle}>
      <div
        className={`relative w-14 h-8 rounded-full p-1 transition-colors duration-300 ${
          checked ? "bg-oxide" : "bg-line"
        }`}
      >
        <div
          className={`w-6 h-6 rounded-full bg-white shadow-md transform transition-all duration-300 flex items-center justify-center text-[10px] ${
            checked ? "translate-x-6" : "translate-x-0"
          } ${squishing ? "scale-x-125 scale-y-80" : "scale-100"}`}
        >
          {checked ? "✓" : ""}
        </div>
      </div>
      <span className="font-mono text-xs text-ink uppercase tracking-wider">{label}</span>
    </div>
  );
}
