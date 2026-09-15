import { cn } from "@/lib/cn";

/**
 * Editorial Heading
 *
 * Composition from typography alone: a display serif at a large `clamp()` size,
 * one emphasised phrase set in italic, an optional mono index label on the
 * baseline and a hairline rule. No gradient, no blur, no glow — the hierarchy
 * is created by scale, weight, case and one change of voice.
 *
 * The emphasised phrase is rendered in the same heading element, so the
 * accessible name reads as one sentence rather than two fragments.
 */

export interface EditorialHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /** The opening words, set in roman. */
  lead: string;
  /** The closing words, set in italic to create the change of voice. */
  emphasis?: string;
  /** Optional mono label, e.g. "01 — Manifesto". */
  index?: string;
  as?: "h1" | "h2" | "h3";
  size?: "sm" | "md" | "lg";
  rule?: boolean;
}

const SIZES: Record<NonNullable<EditorialHeadingProps["size"]>, string> = {
  sm: "text-3xl sm:text-4xl",
  md: "text-4xl sm:text-5xl lg:text-6xl",
  lg: "text-5xl sm:text-6xl lg:text-8xl",
};

export function EditorialHeading({
  lead,
  emphasis,
  index,
  as: Tag = "h2",
  size = "md",
  rule = true,
  className,
  ...props
}: EditorialHeadingProps) {
  return (
    <div className={cn("w-full", className)}>
      {index ? (
        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.32em] text-graphite">{index}</p>
      ) : null}
      <Tag
        className={cn(
          "font-[family-name:var(--font-display)] font-normal text-balance text-ink",
          "leading-[0.95] tracking-[-0.02em]",
          SIZES[size],
        )}
        {...props}
      >
        <span className="block">{lead}</span>
        {emphasis ? <span className="block italic text-oxide">{emphasis}</span> : null}
      </Tag>
      {rule ? <span aria-hidden="true" className="mt-6 block h-px w-full bg-line" /> : null}
    </div>
  );
}

export default EditorialHeading;
