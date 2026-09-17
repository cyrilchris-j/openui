# System Incident Declaration Modal

An emergency incident declaration modal with severity tiers (P0, P1, P2), impact scope, and status broadcast checkbox.

## Install

```bash
openui add system-incident-declaration-modal
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `blocks` → subcategory `devops`
- Interaction model: `incident-declaration-dispatch`
- Visual model: `emergency-response-declaration-modal`
- Motion model: `subtle`
- Semantic purpose: `emergency-incident-declaration`

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
