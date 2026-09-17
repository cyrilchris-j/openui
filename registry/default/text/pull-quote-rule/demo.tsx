import { PullQuoteRule } from "./pull-quote-rule";

export default function Demo() {
  return (
    <div className="flex min-h-[14rem] items-center justify-center bg-paper p-10">
      <PullQuoteRule
        heavy="A component without metadata is a rumour."
        light="The registry is how the rumour becomes a fact."
        attribution="OpenUI Manifesto, §2"
      />
    </div>
  );
}
