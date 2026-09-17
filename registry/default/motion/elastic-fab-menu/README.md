# Elastic Fab Menu

A floating action button erupting into a fan of child action buttons with spring overshoot upon toggle.

## Install

```bash
openui add elastic-fab-menu
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `motion` → subcategory `gestures`
- Interaction model: `radial-fab-explosion`
- Visual model: `floating-action-cluster`
- Motion model: `spring-radial-fanout`
- Semantic purpose: `floating-action-speed-dial`

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
