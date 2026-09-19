import * as React from "react";
import { useSpringValue } from "../motion/use-motion.js";

export interface AnimatedCounterProps extends React.HTMLAttributes<HTMLSpanElement> {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

/**
 * OpenUI Animated Counter
 *
 * Spring-driven rolling digits counter with numeric formatting.
 */
export function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  className = "",
  ...rest
}: AnimatedCounterProps): React.JSX.Element {
  const animatedValue = useSpringValue(value, { stiffness: 140, damping: 18 });

  const formatted = animatedValue.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span className={`font-mono tabular-nums tracking-tight ${className}`} {...rest}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
