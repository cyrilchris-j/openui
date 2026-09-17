# Values Culture Manifesto

An architectural engineering principles board articulating rigor, speed, open-source stewardship, and craft.

## Install

```bash
openui add values-culture-manifesto
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `sections` → subcategory `culture`
- Interaction model: `values-culture-manifesto-interaction`
- Visual model: `values-culture-manifesto-visual`
- Motion model: `subtle`
- Semantic purpose: `values-culture-manifesto-section`

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
