# Stagger Cascade

Child elements enter in sequence where each successive delay is computed from the previous child's actual animation end (not a fixed step) — cascades that stay correct even when children have different durations.

## Install

```bash
openui add stagger-cascade
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `motion` → subcategory `entrance`
- Interaction model: `in-view-trigger`
- Visual model: `child-sequence-entrance`
- Motion model: `measured-chained-delays`
- Semantic purpose: `list-entrance`

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
