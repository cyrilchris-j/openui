# Agent: UI Designer

An agent definition for design work that starts from a position.

## Install

```bash
openui add ui-designer
```

Installs its registry dependencies too: `anti-slop`, `editorial-rules`,
`compose-page`, `audit-ui` — all written into `.openui/`.

## Why an agent definition

Models default to the most common layout they have seen. This file changes the
default in three ways: it requires a design system before any layout work, it
requires a plan before any code, and it grants explicit permission to refuse a
brief that cannot produce anything but generic output.

## Usage

Point your coding agent at `.openui/ui-designer.md` as its role prompt, and keep
the design rules files in context.
