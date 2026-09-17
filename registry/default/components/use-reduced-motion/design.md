# Design System

Genre: Technical
Macrostructure: Stack
Density: Compact
Shape: Sharp
Motion: None
Typography: Monospace
Color: Monochrome

## Rules

- Consumers must replace animation with a state change, not merely shorten it.
- The hook never throws during SSR; it reports `false` until mounted.
- Prefer this hook over ad-hoc `matchMedia` calls so the subscription pattern
  stays consistent across the registry.

## Avoid

- Using the flag to render *different content* for reduced-motion users; the
  content stays, only the motion changes.
