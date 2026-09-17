# Interactive Segment Tabs

A pill segment bar featuring smooth indicator gliding between active view targets on selection.

## Install

```bash
openui add interactive-segment-tabs
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `interactions` → subcategory `gestures`
- Interaction model: `segmented-view-switch`
- Visual model: `sliding-pill-indicator`
- Motion model: `lateral-pill-glide`
- Semantic purpose: `segmented-view-selector`

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
