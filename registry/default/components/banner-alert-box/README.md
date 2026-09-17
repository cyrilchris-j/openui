# Banner Alert Box

A system warning alert banner with contextual icon, status description, and dismissal button.

## Install

```bash
openui add banner-alert-box
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `components` → subcategory `feedback`
- Interaction model: `dismissible-alert-inspection`
- Visual model: `bordered-alert-callout`
- Motion model: `none`
- Semantic purpose: `system-status-alert`

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
