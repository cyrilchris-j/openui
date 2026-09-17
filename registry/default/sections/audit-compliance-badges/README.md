# Audit Compliance Badges

Enterprise compliance certifications rack displaying SOC 2 Type II, ISO 27001, GDPR, and HIPAA compliance.

## Install

```bash
openui add audit-compliance-badges
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `sections` → subcategory `trust`
- Interaction model: `security-badge-verification`
- Visual model: `four-badge-compliance-rack`
- Motion model: `none`
- Semantic purpose: `enterprise-compliance-display`

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
