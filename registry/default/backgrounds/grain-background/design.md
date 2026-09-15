# Grain Background

Genre: Industrial
Macrostructure: Full Bleed
Density: Dense
Shape: Sharp
Motion: None
Typography: Monospace
Color: Monochrome

## Rules

- Grain opacity stays under 0.12 wherever text sits above it.
- One grain layer per surface; nesting two doubles the density unexpectedly.
- Use `multiply` on dark surfaces and `overlay` on light ones.
- Grain must never be the only separator between two regions.

## Avoid

- Animated grain or `.webp` noise textures that tile visibly.
- Grain behind body copy at small sizes; it reduces perceived contrast.
