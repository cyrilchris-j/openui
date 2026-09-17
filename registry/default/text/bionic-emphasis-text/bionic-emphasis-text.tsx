import { cn } from "@/lib/cn";

export interface BionicEmphasisTextProps {
  children: string;
  /** Fraction of each word to emphasise, 0–1. */
  ratio?: number;
  className?: string;
}

/**
 * Bionic Emphasis Text
 *
 * Words are split at `ceil(length * ratio)` with a floor of one character;
 * short glue words (a, the, of) stay untouched so the emphasis pattern reflects
 * information structure rather than fireing uniformly.
 */
const GLUE_WORDS = new Set(["a", "an", "the", "of", "to", "in", "on", "and", "or", "as", "at", "by", "for"]);

export function BionicEmphasisText({ children, ratio = 0.4, className }: BionicEmphasisTextProps) {
  const renderWord = (word: string, key: number) => {
    if (GLUE_WORDS.has(word.toLowerCase()) || word.length <= 2) {
      return <span key={key}>{word} </span>;
    }
    const take = Math.max(1, Math.ceil(word.length * ratio));
    return (
      <span key={key}>
        <strong className="font-semibold text-ink">{word.slice(0, take)}</strong>
        <span className="text-ink/80">{word.slice(take)}</span>{" "}
      </span>
    );
  };

  return (
    <p className={cn("max-w-prose leading-relaxed", className)}>
      {children.split(/\s+/).map((word, index) => renderWord(word, index))}
    </p>
  );
}

export default BionicEmphasisText;
