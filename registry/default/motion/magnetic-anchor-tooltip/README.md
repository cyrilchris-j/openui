# Magnetic Anchor Tooltip

A contextual tooltip balloon anchored via invisible elastic tether that leans smoothly toward pointer cursor.

## Install

```bash
openui add magnetic-anchor-tooltip
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `motion` → subcategory `feedback`
- Interaction model: `tethered-hover-lean`
- Visual model: `elastic-speech-bubble`
- Motion model: `spring-tether-displacement`
- Semantic purpose: `contextual-help-balloon`

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
