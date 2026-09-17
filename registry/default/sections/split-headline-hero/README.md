# Split Headline Hero

High-impact landing hero with uppercase eyebrow, asymmetric headline, primary action buttons, and live stats badge.

## Install

```bash
openui add split-headline-hero
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `sections` → subcategory `heroes`
- Interaction model: `hero-action-dispatch`
- Visual model: `asymmetric-headline-block`
- Motion model: `none`
- Semantic purpose: `landing-hero-section`

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
