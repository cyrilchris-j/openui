# Audit Log Export Modal

An export dialog allowing compliance administrators to bundle security event logs into CSV or JSON tarballs.

## Install

```bash
openui add audit-log-export-modal
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `blocks` → subcategory `security`
- Interaction model: `export-format-and-date-selector`
- Visual model: `modal-export-dialog-box`
- Motion model: `subtle`
- Semantic purpose: `security-audit-export`

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
