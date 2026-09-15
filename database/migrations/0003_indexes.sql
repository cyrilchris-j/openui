-- 0003_indexes.sql
--
-- Indexes are written against the queries in `apps/registry-api`, not against a
-- list of columns. Each index below is annotated with the query it serves. An
-- index nobody reads from is a write cost with no benefit.

-- Public browsing: `where status in ('published','deprecated') and deleted_at is null
-- order by published_at desc`.
create index if not exists resources_public_recent_idx
  on resources (published_at desc)
  where deleted_at is null and status in ('published', 'deprecated');

-- Category pages, ordered the same way as the index above.
create index if not exists resources_category_idx
  on resources (category_id, published_at desc)
  where deleted_at is null and status in ('published', 'deprecated');

-- Resource type navigation (`/components`, `/motion`, ...).
create index if not exists resources_type_idx
  on resources (resource_type, published_at desc)
  where deleted_at is null and status in ('published', 'deprecated');

-- Facet filters on design DNA.
create index if not exists resources_design_system_idx on resources (design_system_id) where deleted_at is null;
create index if not exists resources_genre_idx on resources (resource_type, status) where deleted_at is null;

-- Popularity ordering. `download_count` dominates the composite score used by
-- the API, so it leads.
create index if not exists resources_popular_idx
  on resources (download_count desc, favorite_count desc)
  where deleted_at is null and status in ('published', 'deprecated');

-- Moderation queue: oldest pending first.
create index if not exists submissions_queue_idx on submissions (status, created_at);
create index if not exists submissions_submitter_idx on submissions (submitter_id, created_at desc);
create index if not exists reports_open_idx on reports (status, created_at) where status in ('open', 'triaged');

-- Versions: the latest version of a resource, and the version history page.
create index if not exists resource_versions_latest_idx on resource_versions (resource_id) where is_latest;
create index if not exists resource_versions_history_idx on resource_versions (resource_id, created_at desc);

-- Files by version (the install path reads all files of one version).
create index if not exists resource_files_version_idx on resource_files (resource_version_id);

-- Tags: both directions of the join.
create index if not exists resource_tags_tag_idx on resource_tags (tag_id);
create index if not exists tags_slug_trgm_idx on tags using gin (slug gin_trgm_ops);

-- Collections and favourites.
create index if not exists collections_owner_idx on collections (owner_id, updated_at desc);
create index if not exists collections_public_idx on collections (updated_at desc) where is_public;
create index if not exists collection_items_collection_idx on collection_items (collection_id, sort_order);
create index if not exists favorites_resource_idx on favorites (resource_id);

-- Counters read as time series in the analytics views.
create index if not exists downloads_resource_time_idx on downloads (resource_id, occurred_at desc);
create index if not exists views_resource_day_idx on views (resource_id, day desc);

-- Contributors listing.
create index if not exists contributors_name_idx on contributors (name);
create index if not exists resource_contributors_contributor_idx on resource_contributors (contributor_id);

-- Audit log lookups (admin only, but still indexed).
create index if not exists audit_logs_entity_idx on audit_logs (entity_type, entity_id, created_at desc);
create index if not exists audit_logs_actor_idx on audit_logs (actor_id, created_at desc);

-- ---------------------------------------------------------------------------
-- Full-text search
-- ---------------------------------------------------------------------------

-- A generated column can only reference its own row, which is exactly right
-- here: tags and categories are joined at query time, so the document stays
-- cheap to maintain on write.
alter table resources
  add column if not exists search_vector tsvector
  generated always as (
    setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(name, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(description, '')), 'B')
  ) stored;

create index if not exists resources_search_idx on resources using gin (search_vector);

-- Trigram indexes for the fuzzy fallback and for prefix matching on titles.
create index if not exists resources_title_trgm_idx on resources using gin (title gin_trgm_ops);
create index if not exists resources_slug_trgm_idx on resources using gin (slug gin_trgm_ops);

-- ---------------------------------------------------------------------------
-- Optional: vector search (pgvector)
-- ---------------------------------------------------------------------------

-- Created only when the extension exists. When it does, `/api/v1/search` can
-- switch its `strategy` to `vector` without a schema change.
do $$
begin
  if exists (select 1 from pg_extension where extname = 'vector') then
    alter table resources add column if not exists embedding vector(768);
    begin
      create index if not exists resources_embedding_idx
        on resources using hnsw (embedding vector_cosine_ops);
    exception when others then
      raise notice 'Skipping HNSW index creation on resources.embedding (%).', sqlerrm;
    end;
  end if;
end
$$;
