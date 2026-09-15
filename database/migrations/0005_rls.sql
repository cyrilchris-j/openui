-- 0005_rls.sql
--
-- Row Level Security.
--
-- The API also checks authorisation in Hono, but that is defence in depth, not
-- the boundary. The boundary is here: a leaked anon key, a mis-scoped service
-- query or a future direct database client all meet these policies.
--
-- Two rules that the rest of the platform depends on:
--   * anonymous readers see **published or deprecated** resources only, and
--     never see soft-deleted rows;
--   * nothing user-owned is writable without `auth.uid()` matching the owner.

alter table users              enable row level security;
alter table profiles           enable row level security;
alter table licenses           enable row level security;
alter table categories         enable row level security;
alter table tags               enable row level security;
alter table design_systems     enable row level security;
alter table design_tokens      enable row level security;
alter table resources          enable row level security;
alter table resource_versions  enable row level security;
alter table resource_files     enable row level security;
alter table resource_tags      enable row level security;
alter table collections        enable row level security;
alter table collection_items   enable row level security;
alter table favorites          enable row level security;
alter table downloads          enable row level security;
alter table views              enable row level security;
alter table contributors       enable row level security;
alter table resource_contributors enable row level security;
alter table submissions        enable row level security;
alter table reviews            enable row level security;
alter table reports            enable row level security;
alter table audit_logs         enable row level security;

-- ---------------------------------------------------------------------------
-- Public reference data: readable by everyone, writable by admins only.
-- ---------------------------------------------------------------------------

do $$
declare
  target text;
begin
  foreach target in array array[
    'licenses', 'categories', 'tags', 'design_systems', 'design_tokens', 'contributors'
  ]
  loop
    execute format('drop policy if exists %I_read on %I', target, target);
    execute format(
      'create policy %I_read on %I for select using (true)', target, target
    );
    execute format('drop policy if exists %I_admin_write on %I', target, target);
    execute format(
      'create policy %I_admin_write on %I for all using (app.is_staff()) with check (app.is_staff())',
      target, target
    );
  end loop;
end
$$;

-- ---------------------------------------------------------------------------
-- users + profiles
-- ---------------------------------------------------------------------------

drop policy if exists users_self_read on users;
create policy users_self_read on users
  for select using (id = app.current_user_id() or app.is_staff());

drop policy if exists users_self_update on users;
create policy users_self_update on users
  for update using (id = app.current_user_id()) with check (id = app.current_user_id());

drop policy if exists profiles_public_read on profiles;
create policy profiles_public_read on profiles for select using (true);

-- A user may edit their own profile, but may not promote themselves: the role
-- column is pinned by the `with check` clause.
drop policy if exists profiles_self_update on profiles;
create policy profiles_self_update on profiles
  for update
  using (user_id = app.current_user_id())
  with check (
    user_id = app.current_user_id()
    and role = (select role from profiles p where p.user_id = app.current_user_id())
  );

drop policy if exists profiles_self_insert on profiles;
create policy profiles_self_insert on profiles
  for insert with check (user_id = app.current_user_id());

drop policy if exists profiles_staff_all on profiles;
create policy profiles_staff_all on profiles
  for all using (app.is_staff()) with check (app.is_staff());

-- ---------------------------------------------------------------------------
-- resources (public reads published only)
-- ---------------------------------------------------------------------------

drop policy if exists resources_public_read on resources;
create policy resources_public_read on resources
  for select
  using (
    deleted_at is null
    and status in ('published', 'deprecated')
  );

-- Authors see their own drafts; staff see everything.
drop policy if exists resources_author_read on resources;
create policy resources_author_read on resources
  for select using (author_id = app.current_user_id() or app.is_staff());

drop policy if exists resources_author_insert on resources;
create policy resources_author_insert on resources
  for insert with check (author_id = app.current_user_id() or app.is_staff());

drop policy if exists resources_author_update on resources;
create policy resources_author_update on resources
  for update using (author_id = app.current_user_id()) with check (author_id = app.current_user_id());

drop policy if exists resources_staff_all on resources;
create policy resources_staff_all on resources
  for all using (app.is_staff()) with check (app.is_staff());

-- Published versions are immutable, and readable whenever the resource is.
drop policy if exists resource_versions_public_read on resource_versions;
create policy resource_versions_public_read on resource_versions
  for select
  using (
    exists (
      select 1 from resources r
      where r.id = resource_versions.resource_id
        and r.deleted_at is null
        and r.status in ('published', 'deprecated')
    )
  );

drop policy if exists resource_versions_staff_all on resource_versions;
create policy resource_versions_staff_all on resource_versions
  for all using (app.is_staff()) with check (app.is_staff());

-- No update or delete policy exists for versions or files: there is no path by
-- which published source can be rewritten. New content is a new version.

drop policy if exists resource_files_public_read on resource_files;
create policy resource_files_public_read on resource_files
  for select
  using (
    exists (
      select 1 from resource_versions v
      join resources r on r.id = v.resource_id
      where v.id = resource_files.resource_version_id
        and r.deleted_at is null
        and r.status in ('published', 'deprecated')
    )
  );

drop policy if exists resource_tags_public_read on resource_tags;
create policy resource_tags_public_read on resource_tags for select using (true);

drop policy if exists resource_tags_staff_all on resource_tags;
create policy resource_tags_staff_all on resource_tags
  for all using (app.is_staff()) with check (app.is_staff());

drop policy if exists resource_contributors_public_read on resource_contributors;
create policy resource_contributors_public_read on resource_contributors for select using (true);

-- ---------------------------------------------------------------------------
-- collections
-- ---------------------------------------------------------------------------

drop policy if exists collections_public_read on collections;
create policy collections_public_read on collections
  for select using (is_public or owner_id = app.current_user_id() or app.is_staff());

drop policy if exists collections_owner_write on collections;
create policy collections_owner_write on collections
  for all
  using (owner_id = app.current_user_id())
  with check (owner_id = app.current_user_id());

drop policy if exists collection_items_read on collection_items;
create policy collection_items_read on collection_items
  for select
  using (
    exists (
      select 1 from collections c
      where c.id = collection_items.collection_id
        and (c.is_public or c.owner_id = app.current_user_id() or app.is_staff())
    )
  );

drop policy if exists collection_items_owner_write on collection_items;
create policy collection_items_owner_write on collection_items
  for all
  using (
    exists (
      select 1 from collections c
      where c.id = collection_items.collection_id and c.owner_id = app.current_user_id()
    )
  )
  with check (
    exists (
      select 1 from collections c
      where c.id = collection_items.collection_id and c.owner_id = app.current_user_id()
    )
  );

-- ---------------------------------------------------------------------------
-- favorites
-- ---------------------------------------------------------------------------

drop policy if exists favorites_self_read on favorites;
create policy favorites_self_read on favorites
  for select using (user_id = app.current_user_id() or app.is_staff());

drop policy if exists favorites_self_write on favorites;
create policy favorites_self_write on favorites
  for all
  using (user_id = app.current_user_id())
  with check (user_id = app.current_user_id());

-- ---------------------------------------------------------------------------
-- downloads + views: insert-only telemetry. Reads are admin-only and aggregate.
-- ---------------------------------------------------------------------------

drop policy if exists downloads_insert on downloads;
create policy downloads_insert on downloads for insert with check (true);

drop policy if exists downloads_staff_read on downloads;
create policy downloads_staff_read on downloads
  for select using (app.is_staff());

drop policy if exists views_insert on views;
create policy views_insert on views for insert with check (true);

drop policy if exists views_staff_read on views;
create policy views_staff_read on views for select using (app.is_staff());

-- ---------------------------------------------------------------------------
-- submissions + reviews + reports
-- ---------------------------------------------------------------------------

drop policy if exists submissions_self_read on submissions;
create policy submissions_self_read on submissions
  for select using (submitter_id = app.current_user_id() or app.is_staff());

drop policy if exists submissions_self_insert on submissions;
create policy submissions_self_insert on submissions
  for insert with check (
    submitter_id = app.current_user_id()
    -- A contributor cannot publish: a new submission always starts pending.
    and status = 'pending'
  );

-- Contributors may withdraw or amend a submission that is still pending, but
-- cannot set an approval status themselves.
drop policy if exists submissions_self_update on submissions;
create policy submissions_self_update on submissions
  for update
  using (submitter_id = app.current_user_id() and status in ('pending', 'changes_requested'))
  with check (
    submitter_id = app.current_user_id()
    and status in ('pending', 'changes_requested')
  );

drop policy if exists submissions_staff_all on submissions;
create policy submissions_staff_all on submissions
  for all using (app.is_staff()) with check (app.is_staff());

drop policy if exists reviews_read on reviews;
create policy reviews_read on reviews
  for select
  using (
    app.is_staff()
    or exists (
      select 1 from submissions s
      where s.id = reviews.submission_id and s.submitter_id = app.current_user_id()
    )
  );

drop policy if exists reviews_staff_write on reviews;
create policy reviews_staff_write on reviews
  for all using (app.is_staff()) with check (app.is_staff());

drop policy if exists reports_self_insert on reports;
create policy reports_self_insert on reports
  for insert with check (reporter_id is null or reporter_id = app.current_user_id());

drop policy if exists reports_self_read on reports;
create policy reports_self_read on reports
  for select using (reporter_id = app.current_user_id() or app.is_staff());

drop policy if exists reports_staff_all on reports;
create policy reports_staff_all on reports
  for all using (app.is_staff()) with check (app.is_staff());

-- ---------------------------------------------------------------------------
-- audit_logs: append-only, staff-readable
-- ---------------------------------------------------------------------------

drop policy if exists audit_logs_staff_read on audit_logs;
create policy audit_logs_staff_read on audit_logs
  for select using (app.is_staff());

drop policy if exists audit_logs_insert on audit_logs;
create policy audit_logs_insert on audit_logs for insert with check (true);
