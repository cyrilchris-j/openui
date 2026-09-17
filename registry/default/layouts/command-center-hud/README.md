# Command Center HUD

Cyberpunk operational network operations center (NOC) HUD with six synchronized telemetry widgets.

## Install

```bash
openui add command-center-hud
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `layouts` → subcategory `grids`
- Interaction model: `noc-multi-tile-monitoring`
- Visual model: `six-cell-hud-cluster`
- Motion model: `none`
- Semantic purpose: `network-operations-hud`

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
