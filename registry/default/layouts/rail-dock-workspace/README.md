# Rail Dock Workspace

Slim icon navigation rail, secondary tool drawer, and central canvas workspace (IDE shell).

## Install

```bash
openui add rail-dock-workspace
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `layouts` → subcategory `shells`
- Interaction model: `icon-rail-and-drawer-workspace`
- Visual model: `ide-three-tier-shell`
- Motion model: `none`
- Semantic purpose: `ide-workspace-layout`

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
