# Inertial Rebound Scroll

A scroll container featuring physical overscroll rubberbanding that snaps back to boundaries via damped spring physics.

## Install

```bash
openui add inertial-rebound-scroll
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `motion` → subcategory `scroll`
- Interaction model: `overscroll-rubberband-drag`
- Visual model: `elastic-scrollable-deck`
- Motion model: `boundary-spring-rebound`
- Semantic purpose: `tactile-list-scroller`

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
