-- 0001_extensions_and_enums.sql
--
-- Foundations: extensions, the `app` schema for helper functions, and every
-- enum that constrains a column. Enums are used instead of free text wherever a
-- value is part of the product taxonomy: a typo in a resource type should fail
-- at write time, not silently produce an unfaceted row.
--
-- Every migration in this directory is written to apply to plain PostgreSQL 15+
-- as well as to Supabase. Supabase-specific objects (`auth.users`) are never
-- referenced directly; see `app.current_user_id()` in 0004.

create extension if not exists "pgcrypto";      -- gen_random_uuid()
create extension if not exists "citext";        -- case-insensitive slugs/usernames
create extension if not exists "pg_trgm";       -- fuzzy fallback for search

-- pgvector is optional: it is created when the extension is available so that a
-- local Postgres without it still applies every migration.
do $$
begin
  create extension if not exists "vector";
exception
  when others then
    raise notice 'pgvector is not available in this database; vector search stays disabled.';
end
$$;

create schema if not exists app;

-- ---------------------------------------------------------------------------
-- Enums. Ordering matters for `has_role`, which compares enum values.
-- ---------------------------------------------------------------------------

do $$ begin
  create type user_role as enum ('user', 'contributor', 'moderator', 'admin');
exception when duplicate_object then null; end $$;

do $$ begin
  create type resource_type as enum (
    'component', 'text', 'motion', 'interaction', 'background', 'layout',
    'section', 'block', 'theme', 'pattern', 'template', 'ai', 'hook',
    'utility', 'config'
  );
exception when duplicate_object then null; end $$;

do $$ begin
  create type resource_status as enum (
    'draft', 'reviewing', 'published', 'deprecated', 'rejected', 'archived'
  );
exception when duplicate_object then null; end $$;

do $$ begin
  create type submission_status as enum (
    'pending', 'reviewing', 'approved', 'rejected', 'changes_requested'
  );
exception when duplicate_object then null; end $$;

do $$ begin
  create type report_status as enum ('open', 'triaged', 'resolved', 'dismissed');
exception when duplicate_object then null; end $$;

do $$ begin
  create type report_reason as enum (
    'malicious_code', 'license_violation', 'stolen_work', 'spam',
    'broken_preview', 'inaccessible', 'other'
  );
exception when duplicate_object then null; end $$;

do $$ begin
  create type design_genre as enum (
    'editorial', 'brutalist', 'swiss', 'industrial', 'organic', 'retro',
    'technical', 'luxury', 'playful', 'minimal'
  );
exception when duplicate_object then null; end $$;

do $$ begin
  create type macrostructure as enum (
    'symmetric', 'asymmetric', 'split', 'stack', 'mosaic', 'rail', 'scatter', 'full-bleed'
  );
exception when duplicate_object then null; end $$;

do $$ begin
  create type density as enum ('airy', 'medium', 'compact', 'dense');
exception when duplicate_object then null; end $$;

do $$ begin
  create type shape_language as enum ('sharp', 'soft', 'rounded', 'cut', 'pill', 'mixed');
exception when duplicate_object then null; end $$;

do $$ begin
  create type motion_language as enum ('none', 'subtle', 'expressive', 'kinetic', 'mechanical');
exception when duplicate_object then null; end $$;

do $$ begin
  create type typography_style as enum (
    'grotesk', 'serif-display', 'monospace', 'humanist', 'geometric', 'condensed', 'variable-poster'
  );
exception when duplicate_object then null; end $$;

do $$ begin
  create type color_strategy as enum (
    'monochrome', 'duotone', 'accent-only', 'high-contrast', 'muted-earth', 'neon-on-dark', 'pastel'
  );
exception when duplicate_object then null; end $$;

do $$ begin
  create type design_token_type as enum (
    'font', 'color', 'spacing', 'radius', 'shadow', 'motion', 'breakpoint'
  );
exception when duplicate_object then null; end $$;

do $$ begin
  create type difficulty as enum ('starter', 'intermediate', 'advanced');
exception when duplicate_object then null; end $$;

do $$ begin
  create type contributor_role as enum ('author', 'maintainer', 'designer', 'porter');
exception when duplicate_object then null; end $$;

-- ---------------------------------------------------------------------------
-- Shared trigger: keep `updated_at` honest without application discipline.
-- ---------------------------------------------------------------------------

create or replace function app.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;
