# Download CLI Installer

A command-line installation strip featuring curl, brew, and npm install tabs.

## Install

```bash
openui add download-cli-installer
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `sections` → subcategory `developer`
- Interaction model: `download-cli-installer-interaction`
- Visual model: `download-cli-installer-visual`
- Motion model: `subtle`
- Semantic purpose: `download-cli-installer-section`

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
