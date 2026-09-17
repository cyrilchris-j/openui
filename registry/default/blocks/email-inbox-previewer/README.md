# Email Inbox Previewer

A dual-column webmail client displaying message threads, sender badges, and email reading pane.

## Install

```bash
openui add email-inbox-previewer
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `blocks` → subcategory `email`
- Interaction model: `email-selection-and-reading-pane`
- Visual model: `split-email-inbox-workspace`
- Motion model: `none`
- Semantic purpose: `email-inbox-navigation`

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
