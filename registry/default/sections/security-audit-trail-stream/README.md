# Security Audit Trail Stream

An immutable telemetry log stream tracking access controls, key rotations, and compliance checks.

## Install

```bash
openui add security-audit-trail-stream
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `sections` → subcategory `security`
- Interaction model: `security-audit-trail-stream-interaction`
- Visual model: `security-audit-trail-stream-visual`
- Motion model: `subtle`
- Semantic purpose: `security-audit-trail-stream-section`

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
