import * as React from "react";

/**
 * Sets `document.title` for the current route.
 *
 * React Router does not manage the document head, and a single-page app that
 * never updates its title is unusable with a screen reader: a route change is
 * silent, and the browser history becomes a list of identical entries. Every
 * route sets a title through this hook.
 */
export function useDocumentTitle(title: string): void {
  React.useEffect(() => {
    const previous = document.title;
    document.title = title;
    return () => {
      document.title = previous;
    };
  }, [title]);
}

/**
 * Sets the meta description.
 *
 * A tag is created on first use if the document does not already have one —
 * `index.html` ships a default, so normally it is only updated.
 */
export function useMetaDescription(description: string | undefined): void {
  React.useEffect(() => {
    if (!description) return;

    let tag = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!tag) {
      tag = document.createElement("meta");
      tag.name = "description";
      document.head.appendChild(tag);
    }

    const previous = tag.content;
    tag.content = description;
    return () => {
      tag.content = previous;
    };
  }, [description]);
}
