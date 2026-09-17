# Elastic Pull Card

A tethered specimen card that stretches from its anchor point with rubberband tension before snapping back.

## Install

```bash
openui add elastic-pull-card
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `interactions` → subcategory `gestures`
- Interaction model: `tethered-pull-rebound`
- Visual model: `taut-elastic-slab`
- Motion model: `hookean-spring-restitution`
- Semantic purpose: `tactile-pull-card`

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
