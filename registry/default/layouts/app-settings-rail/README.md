# App Settings Rail

Categorical vertical navigation rail on left with scrollable configuration sections on right.

## Install

```bash
openui add app-settings-rail
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `layouts` → subcategory `shells`
- Interaction model: `settings-category-rail`
- Visual model: `left-category-nav-rail`
- Motion model: `none`
- Semantic purpose: `application-settings-shell`

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
