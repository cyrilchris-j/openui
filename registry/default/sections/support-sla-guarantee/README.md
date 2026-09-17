# Support SLA Guarantee

An operational commitment banner detailing response times, ticket severity levels, and on-call escalation.

## Install

```bash
openui add support-sla-guarantee
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `sections` → subcategory `support`
- Interaction model: `support-sla-guarantee-interaction`
- Visual model: `support-sla-guarantee-visual`
- Motion model: `subtle`
- Semantic purpose: `support-sla-guarantee-section`

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
