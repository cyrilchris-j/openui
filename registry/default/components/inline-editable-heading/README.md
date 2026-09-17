# Inline Editable Heading

Double-click or click-to-edit heading component with live input switch, escape-to-cancel, and blur commit.

## Install

```bash
openui add inline-editable-heading
```

Dependencies: lucide-react.

## What makes it distinct

- Category: `components` → subcategory `forms`
- Interaction model: `inline-double-click-edit`
- Visual model: `seamless-text-to-input`
- Motion model: `none`
- Semantic purpose: `inline-title-mutator`

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
