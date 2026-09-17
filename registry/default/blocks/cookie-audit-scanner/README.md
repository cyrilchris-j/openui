# Cookie Audit Scanner

A regulatory privacy compliance scanner identifying first and third-party tracking scripts and cookies.

## Install

```bash
openui add cookie-audit-scanner
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `blocks` → subcategory `privacy`
- Interaction model: `cookie-compliance-scan-action`
- Visual model: `cookie-audit-report-table`
- Motion model: `none`
- Semantic purpose: `privacy-cookie-auditing`

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
