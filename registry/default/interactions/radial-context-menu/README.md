# Radial Context Menu

A circular action ring that manifests instantly around pointer coordinates on context-click or trigger press.

## Install

```bash
openui add radial-context-menu
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `interactions` → subcategory `pointer`
- Interaction model: `coordinate-pie-invocation`
- Visual model: `radial-wedge-dial`
- Motion model: `instantaneous-radial-bloom`
- Semantic purpose: `radial-speed-menu`

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
