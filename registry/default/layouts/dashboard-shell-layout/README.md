# Dashboard Shell Layout

Modern web application dashboard framework with collapsible sidebar, top command bar, and fluid widget grid.

## Install

```bash
openui add dashboard-shell-layout
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `layouts` → subcategory `shells`
- Interaction model: `collapsible-sidebar-workspace`
- Visual model: `dashboard-app-shell`
- Motion model: `none`
- Semantic purpose: `dashboard-application-shell`

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
