# Version Compatibility Matrix

A framework runtime compatibility checklist validating React 19, Next.js 15, Vite, and Node.js.

## Install

```bash
openui add version-compatibility-matrix
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `blocks` → subcategory `devops`
- Interaction model: `runtime-version-check-matrix`
- Visual model: `compatibility-assurance-grid`
- Motion model: `none`
- Semantic purpose: `runtime-compatibility-verification`

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
