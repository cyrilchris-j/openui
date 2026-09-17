# Pricing Enterprise Inquiry

A specialized contact banner tailored for enterprise buyers requiring custom VPC deployments and SOC2 packages.

## Install

```bash
openui add pricing-enterprise-inquiry
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `sections` → subcategory `pricing`
- Interaction model: `pricing-enterprise-inquiry-interaction`
- Visual model: `pricing-enterprise-inquiry-visual`
- Motion model: `subtle`
- Semantic purpose: `pricing-enterprise-inquiry-section`

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
