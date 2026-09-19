/**
 * OpenUI Visual Engine — Spring Physics & Math Primitives
 *
 * Independent analytical and numerical spring integrators,
 * interpolation helpers, and velocity estimators.
 */

export interface SpringConfig {
  stiffness?: number; // k
  damping?: number;   // c
  mass?: number;      // m
  precision?: number;
}

export interface SpringState {
  current: number;
  target: number;
  velocity: number;
}

/**
 * Standard linear interpolation
 */
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/**
 * Clamp a value between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Map a number from one range to another
 */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
  shouldClamp = false,
): number {
  const mapped = outMin + ((value - inMin) / (inMax - inMin)) * (outMax - outMin);
  return shouldClamp ? clamp(mapped, Math.min(outMin, outMax), Math.max(outMin, outMax)) : mapped;
}

/**
 * Frame-rate independent exponential damping
 */
export function damp(current: number, target: number, lambda: number, delta: number): number {
  return lerp(current, target, 1 - Math.exp(-lambda * delta));
}

/**
 * Analytical spring step (calculates next position and velocity given delta time in seconds)
 */
export function stepSpring(
  state: SpringState,
  config: SpringConfig = {},
  dtSeconds: number,
): SpringState {
  const stiffness = config.stiffness ?? 180;
  const damping = config.damping ?? 16;
  const mass = config.mass ?? 1;
  const precision = config.precision ?? 0.001;

  // Spring differential equation: m*x'' + c*x' + k*(x - target) = 0
  const displacement = state.current - state.target;
  const springForce = -stiffness * displacement;
  const dampingForce = -damping * state.velocity;
  const acceleration = (springForce + dampingForce) / mass;

  const nextVelocity = state.velocity + acceleration * dtSeconds;
  const nextCurrent = state.current + nextVelocity * dtSeconds;

  // Settle check
  if (
    Math.abs(nextVelocity) < precision &&
    Math.abs(nextCurrent - state.target) < precision
  ) {
    return {
      current: state.target,
      target: state.target,
      velocity: 0,
    };
  }

  return {
    current: nextCurrent,
    target: state.target,
    velocity: nextVelocity,
  };
}
