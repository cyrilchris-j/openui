-- 0001_reference_data.sql
--
-- Reference data: the categories that drive navigation and the licenses a
-- resource can declare. Both are idempotent upserts, so re-seeding is safe.
--
-- Resource and design-system rows are *not* seeded here: they are generated from
-- the registry itself by `scripts/seed.ts`, which guarantees the database and the
-- published artifacts cannot disagree.

insert into licenses (spdx_id, name, url, osi_approved) values
  ('MIT',            'MIT License',                            'https://spdx.org/licenses/MIT.html',            true),
  ('Apache-2.0',     'Apache License 2.0',                     'https://spdx.org/licenses/Apache-2.0.html',     true),
  ('BSD-3-Clause',   'BSD 3-Clause "New" or "Revised" License','https://spdx.org/licenses/BSD-3-Clause.html',   true),
  ('BSD-2-Clause',   'BSD 2-Clause "Simplified" License',      'https://spdx.org/licenses/BSD-2-Clause.html',   true),
  ('ISC',            'ISC License',                            'https://spdx.org/licenses/ISC.html',            true),
  ('MPL-2.0',        'Mozilla Public License 2.0',             'https://spdx.org/licenses/MPL-2.0.html',        true),
  ('LGPL-3.0-only',  'GNU Lesser General Public License v3.0', 'https://spdx.org/licenses/LGPL-3.0-only.html',  true),
  ('GPL-3.0-only',   'GNU General Public License v3.0',        'https://spdx.org/licenses/GPL-3.0-only.html',    true),
  ('AGPL-3.0-only',  'GNU Affero General Public License v3.0', 'https://spdx.org/licenses/AGPL-3.0-only.html',   true),
  ('Unlicense',      'The Unlicense',                          'https://spdx.org/licenses/Unlicense.html',      true),
  ('CC0-1.0',        'Creative Commons Zero v1.0 Universal',   'https://spdx.org/licenses/CC0-1.0.html',        false),
  ('CC-BY-4.0',      'Creative Commons Attribution 4.0',       'https://spdx.org/licenses/CC-BY-4.0.html',      false)
on conflict (spdx_id) do update
  set name = excluded.name, url = excluded.url, osi_approved = excluded.osi_approved;

-- Categories mirror `packages/types/src/categories.ts`. `resource_type` is set
-- where a category maps to exactly one resource type, so the API can filter
-- cheaply without a join to the taxonomy table.
insert into categories (slug, name, description, resource_type, sort_order) values
  ('components',   'Components',   'Composable interface elements with real interaction behaviour.', null,       10),
  ('text',         'Text',         'Typographic treatments: headings, kinetic type, split text, tickers.', 'text',    20),
  ('motion',       'Motion',       'Entrances, reveals, transitions and scroll-linked movement.', 'motion',  30),
  ('interactions', 'Interactions', 'Pointer, cursor and gesture-driven behaviour.', 'interaction',            40),
  ('backgrounds',  'Backgrounds',  'Surfaces, grain, grids, noise and atmospheric layers.', 'background',    50),
  ('layouts',      'Layouts',      'Structural shells and composition primitives.', 'layout',                  60),
  ('sections',     'Sections',     'Page-level sections: heroes, footers, navigation, editorial intros.', 'section', 70),
  ('blocks',       'Blocks',       'Larger functional assemblies: dashboards, pricing, data surfaces.', 'block',  80),
  ('themes',       'Themes',       'Token sets that repaint an interface without touching its code.', 'theme',  90),
  ('patterns',     'Patterns',     'Documented, repeatable composition recipes.', 'pattern',                 100),
  ('templates',    'Templates',    'Whole pages built from registry resources.', 'template',                 110),
  ('design-systems','Design Systems','Persistent identity: DNA, tokens and rules AI must follow.', 'theme',  120),
  ('ai',           'AI',           'Design rules, skills, agents and prompts that consume the registry.', 'ai', 130)
on conflict (slug) do update
  set name = excluded.name,
      description = excluded.description,
      resource_type = excluded.resource_type,
      sort_order = excluded.sort_order;

-- Tags used by the first-party registry. Contributors may add tags through
-- submissions; these are the ones the platform itself relies on.
insert into tags (slug, name) values
  ('pointer', 'Pointer'), ('button', 'Button'), ('physics', 'Physics'),
  ('typography', 'Typography'), ('editorial', 'Editorial'), ('display', 'Display'),
  ('scroll', 'Scroll'), ('reveal', 'Reveal'), ('intersection-observer', 'IntersectionObserver'),
  ('surface', 'Surface'), ('grain', 'Grain'), ('noise', 'Noise'),
  ('grid', 'Grid'), ('technical', 'Technical'), ('layout', 'Layout'),
  ('asymmetric', 'Asymmetric'), ('hero', 'Hero'), ('section', 'Section'),
  ('table', 'Table'), ('data', 'Data'), ('dashboard', 'Dashboard'),
  ('theme', 'Theme'), ('design-system', 'Design System'), ('tokens', 'Tokens'),
  ('ai', 'AI'), ('rules', 'Rules'), ('skill', 'Skill'), ('agent', 'Agent'), ('prompt', 'Prompt')
on conflict (slug) do update set name = excluded.name;
