import { cn } from "@/lib/cn";

export interface DictionarySense {
  definition: string;
  example?: string;
}

export interface DictionaryHeadwordProps {
  headword: string;
  /** Pronunciation, e.g. /ˈrɛdʒɪstri/. */
  ipa: string;
  partOfSpeech: string;
  senses: DictionarySense[];
  etymology?: string;
  className?: string;
}

export function DictionaryHeadword({
  headword,
  ipa,
  partOfSpeech,
  senses,
  etymology,
  className,
}: DictionaryHeadwordProps) {
  return (
    <article className={cn("max-w-prose font-display", className)}>
      <header className="flex flex-wrap items-baseline gap-x-3 border-b border-line pb-2">
        <h2 className="text-2xl font-semibold text-ink">{headword}</h2>
        <span className="font-mono text-sm text-ink/60">{ipa}</span>
        <span className="text-sm italic text-ink/70">{partOfSpeech}</span>
      </header>
      <ol className="mt-3 space-y-2 text-base leading-relaxed text-ink">
        {senses.map((sense, index) => (
          <li key={index} className="pl-6 relative">
            <span aria-hidden className="absolute left-0 font-semibold text-ink/50">{index + 1}.</span>
            {sense.definition}
            {sense.example && (
              <span className="block pl-4 text-ink/60 italic">“{sense.example}”</span>
            )}
          </li>
        ))}
      </ol>
      {etymology && (
        <p className="mt-4 border-t border-line pt-2 text-sm text-ink/60">
          <strong className="font-semibold">Origin.</strong> {etymology}
        </p>
      )}
    </article>
  );
}

export default DictionaryHeadword;
