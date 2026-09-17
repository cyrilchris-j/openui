import { SentimentColorWords } from "./sentiment-color-words";

export default function Demo() {
  return (
    <div className="flex min-h-[13rem] items-center justify-center bg-paper p-10">
      <SentimentColorWords
        words={[
          { word: "The", score: 0 },
          { word: "review", score: 0.1 },
          { word: "was", score: 0 },
          { word: "harsh", score: -0.8 },
          { word: "but", score: -0.1 },
          { word: "fair", score: 0.6 },
        ]}
      />
    </div>
  );
}
