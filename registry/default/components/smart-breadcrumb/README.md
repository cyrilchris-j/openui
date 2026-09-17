# Smart Breadcrumb

A breadcrumb that collapses its middle entries into a disclosure menu once the trail overflows, measured with a ResizeObserver so truncation adapts to the container rather than a fixed item count.

## Install

```bash
openui add smart-breadcrumb
```

Dependencies: lucide-react.

## What makes it distinct

- Category: `components` → subcategory `navigation`
- Interaction model: `overflow-collapse`
- Visual model: `path-rail`
- Motion model: `none`
- Semantic purpose: `wayfinding`

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
