# Compliance Cert Showcase

A trust badge showcase presenting verified audit credentials, security seals, and data compliance marks.

## Install

```bash
openui add compliance-cert-showcase
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `sections` → subcategory `trust`
- Interaction model: `compliance-cert-showcase-interaction`
- Visual model: `compliance-cert-showcase-visual`
- Motion model: `subtle`
- Semantic purpose: `compliance-cert-showcase-section`

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
