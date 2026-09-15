import * as RadixTabs from "@radix-ui/react-tabs";

/**
 * Tabs.
 *
 * Tabs *replace* content in place, which is exactly what the platform needs on
 * resource pages (Preview / Code / Install) and exactly what it must not use for
 * navigation between routes — those are links, and making them tabs breaks
 * middle-click, history and deep linking.
 *
 * Radix gives arrows/Home/End navigation and the correct `aria-controls`
 * relationship. The platform's `<Tabs>` in `@openui/ui` requires a visible
 * `List`, because a tab set with no visible affordance is a menu in disguise.
 */
export const Root = RadixTabs.Root;
export const List = RadixTabs.List;
export const Trigger = RadixTabs.Trigger;
export const Content = RadixTabs.Content;

export type RootProps = RadixTabs.TabsProps;
