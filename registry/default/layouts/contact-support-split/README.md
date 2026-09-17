# Contact Support Split

Support contact layout with office headquarters location and dispatch inquiry form side-by-side.

## Install

```bash
openui add contact-support-split
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `layouts` → subcategory `splits`
- Interaction model: `contact-dispatch-inquiry`
- Visual model: `office-info-and-support-form`
- Motion model: `none`
- Semantic purpose: `support-contact-shell`

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
