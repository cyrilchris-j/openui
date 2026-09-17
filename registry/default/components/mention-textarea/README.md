# Mention Textarea

Smart text input with @ mention trigger popover, member lookup, and automatic pill replacement.

## Install

```bash
openui add mention-textarea
```

Dependencies: lucide-react.

## What makes it distinct

- Category: `components` → subcategory `forms`
- Interaction model: `character-triggered-popover-lookup`
- Visual model: `anchored-suggestion-popover`
- Motion model: `none`
- Semantic purpose: `member-mention-input`

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
