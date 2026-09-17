import { cn } from "@/lib/cn";

export interface ReadingLevelTinterProps {
  children: string;
  className?: string;
}

/** Cheap complexity proxy: mean word length × clause count. */
function complexity(sentence: string): number {
  const words = sentence.split(/\s+/).filter(Boolean);
  const meanLength = words.reduce((sum, word) => sum + word.length, 0) / Math.max(words.length, 1);
  const clauses = (sentence.match(/[,;:—-]/g) ?? []).length + 1;
  return meanLength * clauses;
}

export function ReadingLevelTinter({ children, className }: ReadingLevelTinterProps) {
  const sentences = children.match(/[^.!?]+[.!?]+/g) ?? [children];
  const scores = sentences.map((sentence) => complexity(sentence));
  const max = Math.max(...scores, 1);

  return (
    <p className={cn("max-w-prose text-base leading-relaxed", className)}>
      {sentences.map((sentence, index) => {
        const density = scores[index]! / max;
        return (
          <span
            key={index}
            title={`complexity ${(density * 100).toFixed(0)}%`}
            style={{ color: `color-mix(in oklab, currentColor, transparent ${Math.round((1 - density) * 55)}%)` }}
          >
            {sentence.trim()}{" "}
          </span>
        );
      })}
    </p>
  );
}

export default ReadingLevelTinter;
