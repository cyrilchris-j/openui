# Word Help Balloons

Dotted-underline terms that open small paper balloons on focus or hover with a definition, arrow and all — real popover semantics (button + role), not a CSS-only mirage, so keyboard users get the same affordance.

## Install

```bash
openui add word-help-balloons
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `text` → subcategory `interactive`
- Interaction model: `focus-popover`
- Visual model: `annotated-terms`
- Motion model: `scale-in-pop`
- Semantic purpose: `inline-glossary`

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
