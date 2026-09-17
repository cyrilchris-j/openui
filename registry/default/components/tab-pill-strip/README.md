# Tab Pill Strip

A compact navigation tab pill strip with sliding background selection highlights.

## Install

```bash
openui add tab-pill-strip
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `components` → subcategory `navigation`
- Interaction model: `tab-strip-view-switch`
- Visual model: `pill-tab-array`
- Motion model: `none`
- Semantic purpose: `view-navigation-strip`

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
