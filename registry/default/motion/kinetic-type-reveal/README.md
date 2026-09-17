# Kinetic Type Reveal

A mechanical typewriter entrance effect featuring physical carriage returns and vibrating strike-head impressions.

## Install

```bash
openui add kinetic-type-reveal
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `motion` → subcategory `entrance`
- Interaction model: `character-carriage-advance`
- Visual model: `strikethrough-typewriter-line`
- Motion model: `stepped-character-typing`
- Semantic purpose: `teletype-heading-reveal`

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
