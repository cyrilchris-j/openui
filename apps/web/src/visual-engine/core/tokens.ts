/**
 * OpenUI Visual Engine — Motion Tokens
 *
 * OpenUI's distinct motion fingerprint:
 *   - Fast, damped reactions for micro-interactions
 *   - Editorial ease curves for smooth reveals
 *   - Spring physics parameters calibrated for tactile responsiveness
 */

export const MOTION_DURATIONS = {
  instant: 0,
  micro: 120,
  fast: 200,
  normal: 340,
  slow: 540,
  deliberate: 780,
} as const;

export const MOTION_EASINGS = {
  // OpenUI Editorial: fast out, gentle decel
  editorial: [0.16, 1, 0.3, 1] as [number, number, number, number],
  editorialCSS: "cubic-bezier(0.16, 1, 0.3, 1)",
  // Snappy spring-like acceleration
  snappy: [0.25, 1, 0.5, 1] as [number, number, number, number],
  snappyCSS: "cubic-bezier(0.25, 1, 0.5, 1)",
  // Smooth symmetric curve
  smooth: [0.4, 0, 0.2, 1] as [number, number, number, number],
  smoothCSS: "cubic-bezier(0.4, 0, 0.2, 1)",
  // Organic bounce-out deceleration
  organic: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
  organicCSS: "cubic-bezier(0.34, 1.56, 0.64, 1)",
} as const;

export const SPRING_PRESETS = {
  gentle: { stiffness: 120, damping: 14, mass: 1 },
  natural: { stiffness: 180, damping: 16, mass: 0.9 },
  snappy: { stiffness: 280, damping: 20, mass: 0.8 },
  bouncy: { stiffness: 320, damping: 12, mass: 0.8 },
  stiff: { stiffness: 400, damping: 28, mass: 0.7 },
  wobbly: { stiffness: 160, damping: 8, mass: 1 },
} as const;

export const OPENUI_SPRING_PRESETS = SPRING_PRESETS;
export const OPENUI_EASINGS = MOTION_EASINGS;
export const OPENUI_MOTION_TOKENS = {
  durations: MOTION_DURATIONS,
  easings: MOTION_EASINGS,
  springs: SPRING_PRESETS,
} as const;

