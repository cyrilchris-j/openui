# Beta Waitlist Card

An early-access invite card with real-time waitlist counter and instant confirmation state.

## Install

```bash
openui add beta-waitlist-card
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `sections` → subcategory `forms`
- Interaction model: `beta-waitlist-card-interaction`
- Visual model: `beta-waitlist-card-visual`
- Motion model: `subtle`
- Semantic purpose: `beta-waitlist-card-section`

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
