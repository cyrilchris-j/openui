# Team Culture Photo Strip

An organizational culture overview displaying collaborative principles and distributed squad values.

## Install

```bash
openui add team-culture-photo-strip
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `sections` → subcategory `culture`
- Interaction model: `team-culture-photo-strip-interaction`
- Visual model: `team-culture-photo-strip-visual`
- Motion model: `subtle`
- Semantic purpose: `team-culture-photo-strip-section`

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
