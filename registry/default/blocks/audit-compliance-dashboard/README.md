# Audit Compliance Dashboard

An enterprise regulatory readiness dashboard showing SOC2, ISO 27001, and HIPAA control checks with evidence logs.

## Install

```bash
openui add audit-compliance-dashboard
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `blocks` → subcategory `compliance`
- Interaction model: `compliance-controls-checklist-tracker`
- Visual model: `audit-readiness-assurance-gauge`
- Motion model: `none`
- Semantic purpose: `enterprise-security-compliance`

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
