import { EditorialNavigation } from "./editorial-navigation";

export default function Demo() {
  return (
    <EditorialNavigation
      wordmark={
        <span>
          Open<span className="text-oxide">UI</span>
        </span>
      }
      currentPath="/components"
      utilityLinks={[
        { href: "/docs", label: "Docs" },
        { href: "/contributors", label: "Contributors" },
        { href: "/submit", label: "Submit" },
      ]}
      links={[
        { href: "/explore", label: "Explore" },
        { href: "/components", label: "Components" },
        { href: "/text", label: "Text" },
        { href: "/motion", label: "Motion" },
        { href: "/design-systems", label: "Systems" },
        { href: "/playground", label: "Playground" },
      ]}
    />
  );
}
