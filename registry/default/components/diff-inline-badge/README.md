# Diff Inline Badge

Side-by-side or stacked code change metrics badge with addition and deletion count pills.

## Install

```bash
openui add diff-inline-badge
```

Dependencies: lucide-react.

## What makes it distinct

- Category: `components` → subcategory `data-display`
- Interaction model: `diff-summary-presentation`
- Visual model: `split-colored-tag-pill`
- Motion model: `none`
- Semantic purpose: `git-diff-delta-display`

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
