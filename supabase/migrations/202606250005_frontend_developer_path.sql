create table if not exists public.learning_paths (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text not null,
  level text not null,
  estimated_hours integer not null default 0,
  rating numeric(2, 1) not null default 0,
  students_count integer not null default 0,
  icon text not null default 'code',
  color text not null default 'violet',
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.learning_path_steps (
  id uuid primary key default gen_random_uuid(),
  learning_path_id uuid not null references public.learning_paths(id) on delete cascade,
  course_id uuid references public.courses(id) on delete set null,
  title text not null,
  description text not null,
  position integer not null,
  created_at timestamptz not null default now(),
  unique (learning_path_id, position)
);

create table if not exists public.user_learning_paths (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  learning_path_id uuid not null references public.learning_paths(id) on delete cascade,
  status text not null default 'in_progress',
  started_at timestamptz not null default now(),
  completed_at timestamptz,
  updated_at timestamptz not null default now(),
  unique (profile_id, learning_path_id)
);

alter table public.learning_paths enable row level security;
alter table public.learning_path_steps enable row level security;
alter table public.user_learning_paths enable row level security;

drop policy if exists "Authenticated users can view published learning paths" on public.learning_paths;
create policy "Authenticated users can view published learning paths"
on public.learning_paths for select
to authenticated
using (is_published = true);

drop policy if exists "Authenticated users can view published path steps" on public.learning_path_steps;
create policy "Authenticated users can view published path steps"
on public.learning_path_steps for select
to authenticated
using (
  exists (
    select 1
    from public.learning_paths
    where learning_paths.id = learning_path_steps.learning_path_id
      and learning_paths.is_published = true
  )
);

drop policy if exists "Users can view own learning paths" on public.user_learning_paths;
create policy "Users can view own learning paths"
on public.user_learning_paths for select
to authenticated
using ((select auth.uid()) = profile_id);

drop policy if exists "Users can start own learning paths" on public.user_learning_paths;
create policy "Users can start own learning paths"
on public.user_learning_paths for insert
to authenticated
with check ((select auth.uid()) = profile_id);

drop policy if exists "Users can update own learning paths" on public.user_learning_paths;
create policy "Users can update own learning paths"
on public.user_learning_paths for update
to authenticated
using ((select auth.uid()) = profile_id)
with check ((select auth.uid()) = profile_id);

insert into public.learning_paths (
  id,
  slug,
  title,
  description,
  level,
  estimated_hours,
  rating,
  students_count,
  icon,
  color,
  is_published
) values (
  '44444444-4444-4444-8444-444444444444',
  'frontend-developer-path',
  'Frontend Developer Path',
  'Build a strong frontend foundation with JavaScript, TypeScript, React and Supabase basics.',
  'Beginner',
  7,
  4.9,
  1260,
  'code',
  'violet',
  true
) on conflict (slug) do update set
  title = excluded.title,
  description = excluded.description,
  level = excluded.level,
  estimated_hours = excluded.estimated_hours,
  rating = excluded.rating,
  students_count = excluded.students_count,
  icon = excluded.icon,
  color = excluded.color,
  is_published = excluded.is_published,
  updated_at = now();

insert into public.learning_path_steps (
  id,
  learning_path_id,
  course_id,
  title,
  description,
  position
) values
  (
    '55555555-5555-4555-8555-555555555551',
    '44444444-4444-4444-8444-444444444444',
    '11111111-1111-4111-8111-111111111111',
    'JavaScript Fundamentals',
    'Learn variables, functions, arrays and the core language basics.',
    1
  ),
  (
    '55555555-5555-4555-8555-555555555552',
    '44444444-4444-4444-8444-444444444444',
    '11111111-1111-4111-8111-111111111112',
    'TypeScript Essentials',
    'Add types, interfaces and safer application structure.',
    2
  ),
  (
    '55555555-5555-4555-8555-555555555553',
    '44444444-4444-4444-8444-444444444444',
    '11111111-1111-4111-8111-111111111113',
    'React Basics',
    'Build reusable interfaces with components, props and state.',
    3
  ),
  (
    '55555555-5555-4555-8555-555555555554',
    '44444444-4444-4444-8444-444444444444',
    '11111111-1111-4111-8111-111111111114',
    'Supabase Auth Basics',
    'Connect frontend apps with authentication, profiles and protected routes.',
    4
  )
on conflict (learning_path_id, position) do update set
  course_id = excluded.course_id,
  title = excluded.title,
  description = excluded.description;
