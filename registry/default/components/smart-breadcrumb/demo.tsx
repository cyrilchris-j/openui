import { SmartBreadcrumb } from "./smart-breadcrumb";

export default function Demo() {
  return (
    <div className="bg-paper p-10">
      <div className="mx-auto max-w-sm border border-line p-6">
        <SmartBreadcrumb
          entries={[
            { label: "Registry", href: "#" },
            { label: "Components", href: "#" },
            { label: "Navigation", href: "#" },
            { label: "Breadcrumbs", href: "#" },
            { label: "Smart Breadcrumb" },
          ]}
        />
      </div>
    </div>
  );
}
