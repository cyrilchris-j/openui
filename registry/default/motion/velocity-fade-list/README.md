# Velocity Fade List

List items whose opacity and vertical blur respond to scroll velocity — scrolling fast dissolves the rows into streaks, slowing down brings them back into focus — motion feedback that measures impatience.

## Install

```bash
openui add velocity-fade-list
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `motion` → subcategory `scroll`
- Interaction model: `scroll-velocity-trigger`
- Visual model: `velocity-blurred-rows`
- Motion model: `speed-coupled-dissolve`
- Semantic purpose: `scroll-feedback`

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
