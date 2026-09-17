# Multi Panel Dock

IDE layout with main coding editor above and collapsible developer console drawer docked below.

## Install

```bash
openui add multi-panel-dock
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `layouts` → subcategory `shells`
- Interaction model: `dockable-console-drawer`
- Visual model: `editor-with-bottom-dock`
- Motion model: `none`
- Semantic purpose: `docked-developer-console`

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
