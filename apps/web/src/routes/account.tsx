import { Github, Lock, Globe, Trash2 } from "lucide-react";
import * as React from "react";
import { Link } from "react-router";

import {
  Badge,
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  EmptyState,
  Input,
  SegmentedControl,
  Skeleton,
  StatusPill,
  SUBMISSION_STATUS_TONE,
} from "@openui/ui";
import { formatDate } from "@openui/utils";

import { ResourceTile, categorySegmentFor } from "../components/ResourceTile.js";
import { Section, SectionHeader } from "../components/SectionHeader.js";
import { useDocumentTitle } from "../hooks/use-document-title.js";
import * as api from "../lib/api.js";
import { useAuth } from "../lib/auth.js";
import { useApiResource } from "../lib/use-api-resource.js";

/**
 * Account pages.
 *
 * The layout already guarantees a session, so these pages assume one and use the
 * token from context for every call. Ownership is enforced by the API — every
 * mutation is scoped by `user_id` in its `where` clause — so these pages never
 * send a user id at all. There is nothing here for a client to tamper with.
 */

export function ProfilePage(): React.JSX.Element {
  const { user } = useAuth();
  useDocumentTitle("Profile — OpenUI");

  return (
    <>
      <SectionHeader
        eyebrow="Profile"
        title="Your public identity in the registry."
        description="A username is what appears on a published resource and a public collection. It is read from the database, never from a token claim."
      />

      <Section label="Account" className="mt-10">
        <dl>
          {[
            ["Username", user?.username ? `@${user.username}` : "Not set"],
            ["Display name", user?.displayName ?? "Not set"],
            ["Email", user?.email ?? "Unknown"],
            ["Role", user?.role ?? "user"],
            ["User id", user?.id ?? "Unknown"],
          ].map(([label, value]) => (
            <div
              key={label}
              className="flex flex-col gap-1 border-b border-line py-3 sm:flex-row sm:items-baseline sm:gap-6"
            >
              <dt className="eyebrow w-[9rem] shrink-0">{label}</dt>
              <dd className="break-all font-mono text-[0.82rem] text-ink">{value}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-6 max-w-[62ch] text-[0.85rem] leading-relaxed text-graphite">
          Your role is read from the database on every request. A token that claims a higher role
          changes nothing: the API looks the role up, and the row-level security policies enforce the
          same rule again for any direct database access.
        </p>
      </Section>

      <Section label="Contributing" className="mt-12">
        <div className="flex flex-wrap gap-2">
          <Button asChild>
            <Link to="/submit">Submit a resource</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/docs/contributing">Contributing guide</Link>
          </Button>
        </div>
      </Section>
    </>
  );
}

export function FavoritesPage(): React.JSX.Element {
  const { token } = useAuth();
  const { data, error, isLoading } = useApiResource(
    () => api.listMyFavorites(token),
    "favorites",
    token,
  );
  useDocumentTitle("Favourites — OpenUI");

  return (
    <>
      <SectionHeader
        eyebrow="Favourites"
        title="Resources you have saved."
        description="Saving a resource adds it to this list and increments its favourite count atomically in the database — two simultaneous saves cannot produce a duplicate or a lost count."
      />

      <div className="mt-10">
        {isLoading ? (
          <Skeleton lines={6} />
        ) : error ? (
          <EmptyState
            eyebrow="Unavailable"
            title="Your favourites could not be loaded."
            description={error.message}
          />
        ) : !data || data.items.length === 0 ? (
          <EmptyState
            eyebrow="Nothing saved"
            title="You have not saved any resources yet."
            description="Open any resource and use Save. Favourites are private — nobody else can see this list."
            action={
              <Button asChild>
                <Link to="/explore">Browse the catalogue</Link>
              </Button>
            }
          />
        ) : (
          <>
            <p className="eyebrow mb-6">{data.total} saved</p>
            <ul>
              {data.items.map((resource) => (
                <li key={resource.id} className="border-b border-line">
                  <Link
                    to={`/${categorySegmentFor(resource.categorySlug ?? "components")}/${resource.slug}`}
                    className="flex flex-col gap-1 py-4 transition-colors duration-fast hover:bg-ink/[0.02]"
                  >
                    <span className="eyebrow">{resource.resourceType}</span>
                    <span className="font-display text-step-1 tracking-tight text-ink">
                      {resource.title}
                    </span>
                    <span className="max-w-[68ch] text-[0.85rem] text-graphite">
                      {resource.description}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
}

export function AccountCollectionsPage(): React.JSX.Element {
  const { token } = useAuth();
  const { data, error, isLoading, reload } = useApiResource(
    () => api.listCollections({ owner: "me", perPage: 48 }, token),
    "my-collections",
    token,
  );

  const [creating, setCreating] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [isPublic, setIsPublic] = React.useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [formError, setFormError] = React.useState<string | null>(null);
  const [pendingDelete, setPendingDelete] = React.useState<string | null>(null);

  useDocumentTitle("Collections — OpenUI");

  const create = async (event: React.FormEvent) => {
    event.preventDefault();
    setCreating(true);
    setFormError(null);
    try {
      await api.createCollection(
        { title, description: description || undefined, isPublic },
        token,
      );
      setDialogOpen(false);
      setTitle("");
      setDescription("");
      setIsPublic(false);
      reload();
    } catch (cause) {
      setFormError(cause instanceof Error ? cause.message : "Could not create the collection.");
    } finally {
      setCreating(false);
    }
  };

  return (
    <>
      <SectionHeader
        eyebrow="Collections"
        title="Your saved compositions."
        description="A collection is an ordered list of resources. Public collections appear in the catalogue; private ones are visible only to you."
        actions={
          <Button size="sm" onClick={() => setDialogOpen(true)}>
            New collection
          </Button>
        }
      />

      <div className="mt-10">
        {isLoading ? (
          <Skeleton lines={6} />
        ) : error ? (
          <EmptyState
            eyebrow="Unavailable"
            title="Your collections could not be loaded."
            description={error.message}
          />
        ) : !data || data.items.length === 0 ? (
          <EmptyState
            eyebrow="Nothing saved"
            title="You have no collections yet."
            description="A collection is how you keep an arrangement: a hero, a heading, a background and the interactions that go with them."
            action={<Button onClick={() => setDialogOpen(true)}>Create your first collection</Button>}
          />
        ) : (
          <ul>
            {data.items.map((collection) => (
              <li
                key={collection.id}
                className="flex flex-wrap items-center justify-between gap-4 border-b border-line py-4"
              >
                <Link to={`/collections/${collection.id}`} className="flex flex-col">
                  <span className="font-display text-step-1 tracking-tight text-ink">
                    {collection.title}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-graphite">
                    {collection.itemCount} resources · updated {formatDate(collection.updatedAt)}
                  </span>
                </Link>
                <span className="flex items-center gap-2">
                  <StatusPill tone={collection.isPublic ? "positive" : "neutral"} bare>
                    {collection.isPublic ? (
                      <>
                        <Globe aria-hidden className="h-3 w-3" /> public
                      </>
                    ) : (
                      <>
                        <Lock aria-hidden className="h-3 w-3" /> private
                      </>
                    )}
                  </StatusPill>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setPendingDelete(collection.id)}
                    aria-label={`Delete ${collection.title}`}
                  >
                    <Trash2 aria-hidden className="h-3.5 w-3.5" />
                  </Button>
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogTitle>New collection</DialogTitle>
          <DialogDescription>
            Give it a name you will recognise later. You can add resources from any resource page.
          </DialogDescription>
          <form onSubmit={create} className="flex flex-col gap-4">
            <Input
              label="Title"
              required
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Editorial Portfolio"
            />
            <Input
              label="Description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="What this arrangement is for."
              hint="Optional. Shown in the public catalogue when the collection is public."
            />
            <SegmentedControl
              label="Visibility"
              value={isPublic ? "public" : "private"}
              onValueChange={(value) => setIsPublic(value === "public")}
              options={[
                { value: "private", label: "Private" },
                { value: "public", label: "Public" },
              ]}
            />
            {formError ? (
              <p role="alert" className="text-[0.82rem] text-oxide">
                {formError}
              </p>
            ) : null}
            <DialogFooter>
              <Button variant="ghost" type="button" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" loading={creating}>
                Create
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={pendingDelete !== null} onOpenChange={() => setPendingDelete(null)}>
        <DialogContent>
          <DialogTitle>Delete this collection?</DialogTitle>
          <DialogDescription>
            The collection is removed. The resources in it are not — they belong to the registry and
            were never yours to delete.
          </DialogDescription>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setPendingDelete(null)}>
              Keep it
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                const id = pendingDelete;
                setPendingDelete(null);
                if (id) void api.deleteCollection(id, token).then(reload);
              }}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function AccountSubmissionsPage(): React.JSX.Element {
  const { token } = useAuth();
  const { data, error, isLoading } = useApiResource(
    () => api.listMySubmissions(token),
    "my-submissions",
    token,
  );
  useDocumentTitle("Submissions — OpenUI");

  return (
    <>
      <SectionHeader
        eyebrow="Submissions"
        title="Resources you have proposed."
        description="A submission is a proposal, not a publication. It stays pending until a moderator reviews it, and only an administrator can approve — which is what stops a contribution from becoming production state on its own."
        actions={
          <Button size="sm" asChild>
            <Link to="/submit">Submit a resource</Link>
          </Button>
        }
      />

      <div className="mt-10">
        {isLoading ? (
          <Skeleton lines={5} />
        ) : error ? (
          <EmptyState
            eyebrow="Unavailable"
            title="Your submissions could not be loaded."
            description={error.message}
          />
        ) : !data || data.items.length === 0 ? (
          <EmptyState
            eyebrow="No submissions"
            title="You have not submitted anything yet."
            description="Read the contributing guide first: it explains the directory layout, the design.md and what validation will check."
            action={
              <Button asChild>
                <Link to="/docs/contributing">Read the contributing guide</Link>
              </Button>
            }
          />
        ) : (
          <ul>
            {data.items.map((submission) => (
              <li
                key={submission.id}
                className="flex flex-wrap items-start justify-between gap-4 border-b border-line py-4"
              >
                <span className="flex flex-col gap-1">
                  <span className="font-display text-step-1 tracking-tight text-ink">
                    {submission.title}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-graphite">
                    {submission.slug} · submitted {formatDate(submission.created_at)}
                  </span>
                </span>
                <StatusPill tone={SUBMISSION_STATUS_TONE[submission.status] ?? "neutral"}>
                  {submission.status.replace("_", " ")}
                </StatusPill>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Section label="What the statuses mean" className="mt-12">
        <ul className="flex flex-col">
          {[
            ["pending", "Received. Waiting for a moderator to pick it up."],
            ["reviewing", "A moderator is looking at it, usually alongside CI."],
            ["changes_requested", "Something needs to change before it can be approved."],
            ["approved", "An administrator approved it; it is published and immutable."],
            ["rejected", "It will not be published. The review notes say why."],
          ].map(([status, meaning]) => (
            <li key={status} className="flex flex-wrap items-baseline gap-4 border-b border-line py-3">
              <span className="w-[10rem] shrink-0">
                <StatusPill tone={SUBMISSION_STATUS_TONE[status] ?? "neutral"}>
                  {status.replace("_", " ")}
                </StatusPill>
              </span>
              <span className="flex-1 text-[0.85rem] leading-relaxed text-graphite">{meaning}</span>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}

export { Badge, Github, ResourceTile };
