import { cn } from "@/lib/cn";

export interface TfAutoEmphasisProps {
  children: string;
  className?: string;
}

export function TfAutoEmphasis({ children, className }: TfAutoEmphasisProps) {
  const words = children.split(/\s+/);
  const counts = new Map<string, number>();
  for (const word of words) {
    const key = word.toLowerCase().replace(/[^\p{L}\p{N}'-]/gu, "");
    if (key.length > 3) counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  const max = Math.max(...counts.values(), 1);

  return (
    <p className={cn("max-w-prose text-lg leading-relaxed", className)}>
      {words.map((word, index) => {
        const key = word.toLowerCase().replace(/[^\p{L}\p{N}'-]/gu, "");
        const count = key.length > 3 ? counts.get(key) ?? 0 : 0;
        const weight = count / max;
        return (
          <span
            key={index}
            style={{
              fontWeight: count > 1 ? 400 + Math.round(weight * 300) : 400,
              color: count > 1 ? undefined : "color-mix(in oklab, currentColor, transparent 25%)",
            }}
          >
            {word}{" "}
          </span>
        );
      })}
    </p>
  );
}

export default TfAutoEmphasis;
