# Compliance GDPR Consent Strip

A regulatory privacy consent banner supporting essential, analytical, and marketing preference toggles.

## Install

```bash
openui add compliance-gdpr-consent-strip
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `sections` → subcategory `privacy`
- Interaction model: `compliance-gdpr-consent-strip-interaction`
- Visual model: `compliance-gdpr-consent-strip-visual`
- Motion model: `subtle`
- Semantic purpose: `compliance-gdpr-consent-strip-section`

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
