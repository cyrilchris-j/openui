# Developer Terminal SSH Session

A browser-based remote shell console emulator displaying active connection authentication and status output.

## Install

```bash
openui add developer-terminal-ssh-session
```

Dependencies: none beyond React.

## What makes it distinct

- Category: `blocks` → subcategory `developer`
- Interaction model: `ssh-terminal-command-execution`
- Visual model: `browser-ssh-shell-window`
- Motion model: `mechanical`
- Semantic purpose: `remote-shell-terminal-session`

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
