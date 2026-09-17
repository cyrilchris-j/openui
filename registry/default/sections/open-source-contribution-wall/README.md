# Open Source Contribution Wall

A community recognition board displaying GitHub stars, active PR contributors, and sponsorship tiers.

## Install

```bash
openui add open-source-contribution-wall
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `sections` → subcategory `community`
- Interaction model: `open-source-contribution-wall-interaction`
- Visual model: `open-source-contribution-wall-visual`
- Motion model: `subtle`
- Semantic purpose: `open-source-contribution-wall-section`

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
