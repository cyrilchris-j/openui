-- maintenance.sql
--
-- Operational functions that are not migrations: they are run on a schedule
-- (pg_cron, a Vercel cron, or `pnpm db:maintain`). Each is idempotent and safe to
-- run twice.

-- ---------------------------------------------------------------------------
-- Privacy: telemetry is anonymised on a schedule, not kept forever.
--
-- Raw client hashes are the only quasi-identifying value the platform stores.
-- They exist to make view counts unique-per-day, and they stop being useful —
-- and start being a liability — after a few weeks.
-- ---------------------------------------------------------------------------

create or replace function app.anonymize_telemetry(p_older_than interval default '30 days')
returns table (views_anonymized bigint, downloads_anonymized bigint)
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  view_count bigint;
  download_count bigint;
begin
  update views
     set client_hash = null
   where client_hash is not null
     and viewed_at < now() - p_older_than;
  get diagnostics view_count = row_count;

  update downloads
     set client_hash = null
   where client_hash is not null
     and occurred_at < now() - p_older_than;
  get diagnostics download_count = row_count;

  -- Old per-view rows stop earning their keep once they are aggregated by day.
  delete from views where viewed_at < now() - interval '180 days';

  return query select view_count, download_count;
end;
$$;

-- ---------------------------------------------------------------------------
-- Audit log retention. Security-relevant actions are kept far longer than
-- telemetry, but not indefinitely.
-- ---------------------------------------------------------------------------

create or replace function app.prune_audit_logs(p_keep interval default '2 years')
returns bigint
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  removed bigint;
begin
  delete from audit_logs where created_at < now() - p_keep;
  get diagnostics removed = row_count;
  return removed;
end;
$$;

-- ---------------------------------------------------------------------------
-- Analytics aggregates for the admin dashboard: one row per resource per day.
-- Kept as a materialised view so the dashboard never scans the raw tables.
-- ---------------------------------------------------------------------------

create materialized view if not exists resource_daily_stats as
select
  r.id as resource_id,
  r.slug,
  coalesce(v.day, d.day) as day,
  coalesce(v.views, 0) as views,
  coalesce(d.downloads, 0) as downloads
from resources r
left join (
  select resource_id, day, count(*) as views
  from views group by resource_id, day
) v on v.resource_id = r.id
left join (
  select resource_id, occurred_at::date as day, count(*) as downloads
  from downloads group by resource_id, occurred_at::date
) d on d.resource_id = r.id
where r.deleted_at is null;

create unique index if not exists resource_daily_stats_key
  on resource_daily_stats (resource_id, day);

create or replace function app.refresh_analytics()
returns void
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  refresh materialized view concurrently resource_daily_stats;
end;
$$;

-- ---------------------------------------------------------------------------
-- Contributor aggregates (resource count and total downloads), refreshed on
-- the same schedule.
-- ---------------------------------------------------------------------------

create or replace function app.refresh_contributor_stats()
returns bigint
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  updated bigint;
begin
  with stats as (
    select
      c.id as contributor_id,
      count(distinct rc.resource_id) as resource_count,
      coalesce(sum(r.download_count), 0) as total_downloads
    from contributors c
    left join resource_contributors rc on rc.contributor_id = c.id
    left join resources r on r.id = rc.resource_id and r.deleted_at is null
    group by c.id
  )
  update contributors c
     set resource_count = stats.resource_count,
         total_downloads = stats.total_downloads
    from stats
   where c.id = stats.contributor_id
     and (c.resource_count is distinct from stats.resource_count
          or c.total_downloads is distinct from stats.total_downloads);
  get diagnostics updated = row_count;
  return updated;
end;
$$;

-- Statistics columns live on `contributors`; add them if an older database
-- predates them.
alter table contributors add column if not exists resource_count integer not null default 0;
alter table contributors add column if not exists total_downloads bigint not null default 0;
