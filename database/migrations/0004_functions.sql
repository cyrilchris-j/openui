-- 0004_functions.sql
--
-- The database owns: identity resolution, counters, publishing and search.
-- Moving these into functions is not ceremony — it is what makes them atomic.
-- A publishing flow that spans three HTTP handlers can fail between the version
-- insert and the pointer update; a function cannot.

-- ---------------------------------------------------------------------------
-- Identity
-- ---------------------------------------------------------------------------

-- Resolves the caller's user id from either Supabase's JWT claim or the
-- `app.user_id` session setting the API sets for service-role requests. Returns
-- null for anonymous callers, which is what the RLS policies test against.
create or replace function app.current_user_id()
returns uuid
language sql
stable
as $$
  select coalesce(
    nullif(current_setting('request.jwt.claim.sub', true), '')::uuid,
    nullif(current_setting('app.user_id', true), '')::uuid
  );
$$;

-- Role lookups are `security definer` so that reading `profiles.role` inside a
-- policy on `profiles` does not recurse into the same policy.
create or replace function app.current_role()
returns user_role
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select coalesce(
    (select role from profiles where user_id = app.current_user_id()),
    'user'::user_role
  );
$$;

-- Enum order is user < contributor < moderator < admin, so `>=` is meaningful.
create or replace function app.has_role(minimum user_role)
returns boolean
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select app.current_role() >= minimum;
$$;

create or replace function app.is_staff()
returns boolean
language sql
stable
as $$
  select app.current_role() in ('moderator', 'admin');
$$;

-- ---------------------------------------------------------------------------
-- Counters
-- ---------------------------------------------------------------------------

-- Counters are updated with `set x = x + 1` inside the database. No read,
-- no application-side increment, no lost updates under concurrency.

create or replace function app.record_view(
  p_resource_id uuid,
  p_client_hash text default null,
  p_user_id uuid default null
)
returns void
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  -- One view per client per day: a refresh is not a new reader.
  insert into views (resource_id, user_id, client_hash, day)
  values (p_resource_id, p_user_id, p_client_hash, current_date)
  on conflict do nothing;

  update resources
     set view_count = view_count + 1
   where id = p_resource_id
     and (p_client_hash is null or not exists (
       select 1 from views
        where resource_id = p_resource_id
          and client_hash = p_client_hash
          and day = current_date
          and viewed_at < now() - interval '1 second'
     ));
end;
$$;

create or replace function app.record_download(
  p_resource_id uuid,
  p_version_id uuid default null,
  p_user_id uuid default null,
  p_client_hash text default null
)
returns integer
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  total integer;
begin
  insert into downloads (resource_id, resource_version_id, user_id, client_hash)
  values (p_resource_id, p_version_id, p_user_id, p_client_hash);

  update resources
     set download_count = download_count + 1
   where id = p_resource_id
  returning download_count into total;

  return total;
end;
$$;

-- Favourite count is derived, never incremented by the client.
create or replace function app.sync_favorite_count()
returns trigger
language plpgsql
as $$
begin
  if tg_op = 'INSERT' then
    update resources set favorite_count = favorite_count + 1 where id = new.resource_id;
    return new;
  elsif tg_op = 'DELETE' then
    update resources
       set favorite_count = greatest(favorite_count - 1, 0)
     where id = old.resource_id;
    return old;
  end if;
  return null;
end;
$$;

drop trigger if exists favorites_sync_count on favorites;
create trigger favorites_sync_count
after insert or delete on favorites
for each row execute function app.sync_favorite_count();

-- ---------------------------------------------------------------------------
-- Publishing
-- ---------------------------------------------------------------------------

-- Publishes a version transactionally.
--
-- Guarantees:
--   * the whole publish is one transaction: version, files, pointer, audit log
--   * the client passes the version it believes is current; a mismatch raises
--     `version_conflict` instead of silently overwriting a newer release
--   * published source is never mutated: a new release is a new row
create or replace function app.publish_resource(
  p_resource_id uuid,
  p_version text,
  p_files jsonb,
  p_commit_sha text default null,
  p_changelog text default null,
  p_integrity text default null,
  p_expected_latest_version text default null,
  p_actor uuid default null,
  p_npm_dependencies text[] default '{}',
  p_registry_dependencies text[] default '{}'
)
returns uuid
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  current_version text;
  new_version_id uuid;
  file jsonb;
begin
  -- Serialise concurrent publishes of the same resource.
  perform 1 from resources where id = p_resource_id for update;
  if not found then
    raise exception 'resource_not_found' using errcode = 'P0002';
  end if;

  select v.version
    into current_version
    from resources r
    join resource_versions v on v.id = r.latest_version_id
   where r.id = p_resource_id;

  -- Optimistic concurrency: a reviewer or publisher working from stale state
  -- must not win the race.
  if p_expected_latest_version is not null
     and current_version is distinct from p_expected_latest_version then
    raise exception 'version_conflict: expected % but % is current',
      p_expected_latest_version, coalesce(current_version, 'none')
      using errcode = 'P0001';
  end if;

  if exists (select 1 from resource_versions where resource_id = p_resource_id and version = p_version) then
    raise exception 'version_exists: % already published for this resource', p_version
      using errcode = 'P0001';
  end if;

  if jsonb_typeof(p_files) <> 'array' or jsonb_array_length(p_files) = 0 then
    raise exception 'invalid_files: at least one file is required' using errcode = '22023';
  end if;

  insert into resource_versions (
    resource_id, version, commit_sha, changelog, integrity, is_latest, published_at,
    npm_dependencies, registry_dependencies
  )
  values (
    p_resource_id, p_version, p_commit_sha, p_changelog, p_integrity, true, now(),
    coalesce(p_npm_dependencies, '{}'), coalesce(p_registry_dependencies, '{}')
  )
  returning id into new_version_id;

  for file in select * from jsonb_array_elements(p_files)
  loop
    insert into resource_files (
      resource_version_id, path, file_type, target, content, content_hash, size_bytes, source_url
    ) values (
      new_version_id,
      file ->> 'path',
      coalesce(file ->> 'type', 'file'),
      file ->> 'target',
      coalesce(file ->> 'content', ''),
      coalesce(file ->> 'contentHash', ''),
      coalesce((file ->> 'sizeBytes')::integer, 0),
      file ->> 'sourceUrl'
    );
  end loop;

  update resource_versions set is_latest = false where resource_id = p_resource_id and id <> new_version_id;

  update resources
     set latest_version_id = new_version_id,
         status = 'published',
         published_at = coalesce(published_at, now())
   where id = p_resource_id;

  insert into audit_logs (actor_id, action, entity_type, entity_id, diff)
  values (
    p_actor, 'resource.publish', 'resource', p_resource_id,
    jsonb_build_object('version', p_version, 'previousVersion', current_version,
                       'files', jsonb_array_length(p_files))
  );

  return new_version_id;
end;
$$;

-- ---------------------------------------------------------------------------
-- Search
-- ---------------------------------------------------------------------------

-- Full-text search with a trigram fallback, in one round trip.
--
-- The `strategy` column tells the caller which path produced the rows, so the
-- UI can be honest about a fuzzy match ("did you mean …") instead of presenting
-- it as an exact hit.
create or replace function app.search_resources(
  p_query text default null,
  p_types resource_type[] default null,
  p_categories text[] default null,
  p_genres design_genre[] default null,
  p_densities density[] default null,
  p_shapes shape_language[] default null,
  p_motions motion_language[] default null,
  p_typographies typography_style[] default null,
  p_macrostructures macrostructure[] default null,
  p_design_system text default null,
  p_licenses text[] default null,
  p_difficulties difficulty[] default null,
  p_zero_dependency boolean default null,
  p_sort text default 'relevance',
  p_limit integer default 24,
  p_offset integer default 0
)
returns table (
  resource_id uuid,
  slug citext,
  title text,
  rank real,
  strategy text,
  total bigint
)
language sql
stable
as $$
  with base as (
    select
      r.id,
      r.slug,
      r.title,
      r.download_count,
      r.published_at,
      r.search_vector,
      coalesce(tag_agg.tags, array[]::text[]) as tags
    from resources r
    left join lateral (
      select array_agg(t.slug::text) as tags
      from resource_tags rt
      join tags t on t.id = rt.tag_id
      where rt.resource_id = r.id
    ) tag_agg on true
    left join categories c on c.id = r.category_id
    left join design_systems ds on ds.id = r.design_system_id
    left join licenses l on l.id = r.license_id
    where r.deleted_at is null
      and r.status in ('published', 'deprecated')
      and (p_types is null or r.resource_type = any (p_types))
      and (p_categories is null or c.slug = any (p_categories))
      and (p_genres is null or ds.genre = any (p_genres))
      and (p_densities is null or ds.density = any (p_densities))
      and (p_shapes is null or ds.shape_language = any (p_shapes))
      and (p_motions is null or ds.motion_language = any (p_motions))
      and (p_typographies is null or ds.typography_style = any (p_typographies))
      and (p_macrostructures is null or ds.macrostructure = any (p_macrostructures))
      and (p_design_system is null or ds.slug = p_design_system)
      and (p_licenses is null or l.spdx_id = any (p_licenses))
      and (p_difficulties is null or r.difficulty = any (p_difficulties))
      and (
        p_zero_dependency is not true
        or not exists (
          select 1 from resource_versions v
          join resource_files f on f.resource_version_id = v.id
          where v.resource_id = r.id and f.file_type = 'dependency'
        )
      )
  ),
  scored as (
    select
      b.*,
      case
        when p_query is null or length(trim(p_query)) = 0 then 0::real
        else ts_rank_cd(b.search_vector, websearch_to_tsquery('english', p_query))
      end as fts_rank,
      case
        when p_query is null or length(trim(p_query)) = 0 then 0::real
        else greatest(
          similarity(b.title, p_query),
          similarity(b.slug::text, p_query)
        )
      end as trgm_rank,
      (b.tags && string_to_array(coalesce(lower(p_query), ''), ' ')) as tag_hit
    from base b
  ),
  filtered as (
    select *,
      case
        when p_query is null or length(trim(p_query)) = 0 then 'browse'
        when fts_rank > 0 then 'full_text'
        else 'trigram'
      end as strategy,
      (fts_rank * 4 + trgm_rank * 2 + case when tag_hit then 1 else 0 end)::real as score
    from scored
    where p_query is null
       or length(trim(p_query)) = 0
       or fts_rank > 0
       or trgm_rank > 0.18
       or tag_hit
  )
  select
    f.id,
    f.slug,
    f.title,
    f.score,
    f.strategy,
    count(*) over () as total
  from filtered f
  order by
    case when p_sort = 'name' then lower(f.title) end asc nulls last,
    case when p_sort = 'popular' then f.download_count end desc nulls last,
    case when p_sort = 'recent' then f.published_at end desc nulls last,
    case when p_sort not in ('name', 'popular', 'recent') then f.score end desc nulls last,
    f.published_at desc nulls last,
    f.id
  limit least(greatest(p_limit, 1), 100)
  offset greatest(p_offset, 0);
$$;

-- ---------------------------------------------------------------------------
-- Extension point: maintain `public.users` from Supabase Auth, when present.
-- ---------------------------------------------------------------------------

do $$
begin
  if exists (select 1 from information_schema.schemata where schema_name = 'auth') then
    execute $fn$
      create or replace function app.handle_new_auth_user()
      returns trigger
      language plpgsql
      security definer
      set search_path = public, pg_temp
      as $body$
      begin
        insert into public.users (id, email, created_at)
        values (new.id, new.email, coalesce(new.created_at, now()))
        on conflict (id) do nothing;
        return new;
      end;
      $body$;
    $fn$;

    execute 'drop trigger if exists on_auth_user_created on auth.users';
    execute $trg$
      create trigger on_auth_user_created
      after insert on auth.users
      for each row execute function app.handle_new_auth_user()
    $trg$;
  end if;
end
$$;
