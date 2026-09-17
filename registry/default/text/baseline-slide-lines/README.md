# Baseline Slide Lines

Multi-line reveal where each line is its own clipped rail and slides up from below the baseline with per-line delay; line breaks are authored, so the composition survives font substitution.

## Install

```bash
openui add baseline-slide-lines
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `text` → subcategory `reveal`
- Interaction model: `in-view-trigger`
- Visual model: `per-line-clipped-rails`
- Motion model: `baseline-rise-stagger`
- Semantic purpose: `heading-reveal`

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
