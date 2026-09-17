# Docked Action Toolbar

A floating bottom pill toolbar with action icons, badge counters, and keyboard shortcut indicators.

## Install

```bash
openui add docked-action-toolbar
```

Dependencies: lucide-react.

## What makes it distinct

- Category: `components` → subcategory `actions`
- Interaction model: `floating-toolbar-quick-action`
- Visual model: `glass-pill-dock`
- Motion model: `none`
- Semantic purpose: `viewport-action-dock`

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
