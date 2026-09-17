# Enterprise Security Pillar

A regulatory compliance and security architecture banner showcasing audit readiness, key badges, and technical assurances.

## Install

```bash
openui add enterprise-security-pillar
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `sections` → subcategory `trust`
- Interaction model: `enterprise-security-pillar-interaction`
- Visual model: `enterprise-security-pillar-visual`
- Motion model: `subtle`
- Semantic purpose: `enterprise-security-pillar-section`

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
