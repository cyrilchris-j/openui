# Breadcrumbs Slash Trail

An accessible trail of hierarchy waypoints separated by slash delimiters indicating current route depth.

## Install

```bash
openui add breadcrumbs-slash-trail
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `components` → subcategory `navigation`
- Interaction model: `hierarchical-wayfinding`
- Visual model: `slash-separated-trail`
- Motion model: `none`
- Semantic purpose: `route-breadcrumb-trail`

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
