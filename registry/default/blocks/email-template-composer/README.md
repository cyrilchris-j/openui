# Email Template Composer

A newsletter and transactional email draft composer with subject line editor and live HTML view toggle.

## Install

```bash
openui add email-template-composer
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `blocks` → subcategory `email`
- Interaction model: `email-composer-and-preview-toggle`
- Visual model: `wysiwyg-email-layout-editor`
- Motion model: `none`
- Semantic purpose: `transactional-email-authoring`

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
