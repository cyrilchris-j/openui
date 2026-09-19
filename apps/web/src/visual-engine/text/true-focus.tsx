import * as React from "react";

export interface TrueFocusProps extends React.HTMLAttributes<HTMLDivElement> {
  sentence?: string;
}

/**
 * OpenUI True Focus Lens Text
 *
 * Gaussian blur text field where typography sharpens into optical clarity
 * exclusively directly beneath the active pointer focus lens.
 */
export function TrueFocus({
  sentence = "DYNAMIC MOTION DESIGN WITH SPATIAL DEPTH",
  className = "",
  ...rest
}: TrueFocusProps): React.JSX.Element {
  const [focusIndex, setFocusIndex] = React.useState<number | null>(1);
  const words = sentence.split(" ");

  return (
    <div
      className={`p-4 flex flex-wrap items-center justify-center gap-2 select-none ${className}`}
      onMouseLeave={() => setFocusIndex(1)}
      {...rest}
    >
      {words.map((word, i) => {
        const isFocused = focusIndex === i;
        return (
          <span
            key={i}
            onMouseEnter={() => setFocusIndex(i)}
            className={`cursor-pointer font-display font-bold text-lg sm:text-xl transition-all duration-300 transform ${
              isFocused
                ? "filter-none text-ink scale-105"
                : "blur-[2.5px] text-graphite/60 scale-95 opacity-60"
            }`}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
}
