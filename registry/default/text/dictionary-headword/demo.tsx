import { DictionaryHeadword } from "./dictionary-headword";

export default function Demo() {
  return (
    <div className="flex min-h-[18rem] items-center justify-center bg-paper p-10">
      <DictionaryHeadword
        headword="reg·is·try"
        ipa="/ˈrɛdʒɪstri/"
        partOfSpeech="noun"
        senses={[
          { definition: "A place where things are officially recorded.", example: "the registry of open-source resources" },
          { definition: "The metadata contract that makes recorded things installable.", example: "check the registry before you ship" },
        ]}
        etymology="From register (Latin regesta, 'things recorded') + -y."
      />
    </div>
  );
}
