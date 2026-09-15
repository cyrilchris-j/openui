# Sticky Stack

Genre: Industrial
Macrostructure: Stack
Density: Medium
Shape: Sharp
Motion: Mechanical
Typography: Monospace
Color: High Contrast

## Motion

Fast: 140ms
Normal: 240ms
Slow: 420ms

## Rules

- Each card pins a step further down so the previous edge stays visible.
- Keep the offset step under 20px; larger steps read as drift.
- Collapse to a normal list under 640px and under reduced motion.
- Zero JavaScript: sticky is a layout property, not an animation.

## Avoid

- Scale-down transforms on the pinned cards.
- More than five cards in one stack.
- Stacks inside a container with its own scroll.
