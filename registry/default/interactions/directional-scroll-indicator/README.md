# Directional Scroll Indicator

An animated navigational arrow cue indicating the axis and distance remaining in an active viewport section.

## Install

```bash
openui add directional-scroll-indicator
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `interactions` → subcategory `scroll`
- Interaction model: `viewport-direction-cue`
- Visual model: `pulsing-chevron-arrow`
- Motion model: `vertical-bounce-oscillation`
- Semantic purpose: `scroll-affordance-cue`

## Accessibility

- Keyboard reachable; visible focus ring.
- Honours `prefers-reduced-motion`: animation is disabled or replaced with a
  static state change.
- Semantic HTML first; ARIA only where the semantics need help.

## When to use

When the interface needs exactly this behaviour — check the fingerprint above
against the composition you are building.

## When not to use

When a simpler resource meets the need. Do not stack decorative motion on top
of a surface that already carries motion.
