# Copy Button

Genre: Technical
Macrostructure: Stack
Density: Compact
Shape: Sharp
Motion: Subtle
Typography: Monospace
Color: Accent Only

## Motion

Fast: 140ms
Normal: 200ms
Slow: 320ms

## Rules

- State changes are textual as well as visual; never colour-only.
- Failure is a first-class state with its own label.
- Keep the control one line high so it can sit inside a code header.

## Avoid

- Toasts for a copy result; announce in place instead.
- Claiming success when the clipboard write failed.
- Icon-only buttons without an accessible name.
