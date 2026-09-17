# Design System

Genre: Technical
Macrostructure: Stack
Density: Compact
Shape: Sharp
Motion: None
Typography: Monospace
Color: Monochrome

## Rules

- Default to `once: true` for expensive children; the observer exists to stop
  offscreen work, not add it.
- Disconnect on unmount is mandatory; a leaked observer keeps every observed
  element alive.

## Avoid

- Polling `getBoundingClientRect` on scroll when this hook gives the same
  answer for free.
