# Tracked Changes Accept

A paragraph with tracked insertions and deletions (like a legal review) plus per-change Accept/Reject controls — accepting morphs the text in place with a colour fade, rejecting strikes it out permanently.

## Install

```bash
openui add tracked-changes-accept
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `text` → subcategory `data`
- Interaction model: `per-change-accept`
- Visual model: `inline-edit-marks`
- Motion model: `colour-fade-morph`
- Semantic purpose: `document-review`

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
