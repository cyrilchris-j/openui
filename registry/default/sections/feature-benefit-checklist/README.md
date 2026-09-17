# Feature Benefit Checklist

A bulleted value proposition section highlighting zero-lock-in, strict TypeScript, and accessibility.

## Install

```bash
openui add feature-benefit-checklist
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `sections` → subcategory `feature`
- Interaction model: `feature-benefit-checklist-interaction`
- Visual model: `feature-benefit-checklist-visual`
- Motion model: `subtle`
- Semantic purpose: `feature-benefit-checklist-section`

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
