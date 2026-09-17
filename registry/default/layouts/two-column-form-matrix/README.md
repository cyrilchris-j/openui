# Two Column Form Matrix

Enterprise form layout with instructional labels on left and matching input groups on right.

## Install

```bash
openui add two-column-form-matrix
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `layouts` → subcategory `splits`
- Interaction model: `instructional-label-field-pair`
- Visual model: `enterprise-form-matrix`
- Motion model: `none`
- Semantic purpose: `enterprise-configuration-form`

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
