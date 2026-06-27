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
  'A practical roadmap for building junior frontend foundations with HTML, CSS, JavaScript, React and frontend backend basics.',
  'Beginner',
  90,
  4.9,
  1280,
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
    '10000000-0000-4000-8000-000000000001',
    'HTML & CSS Foundations',
    'Build the base: semantic HTML, styling, layout, responsive design and a final SaaS landing page.',
    1
  ),
  (
    '55555555-5555-4555-8555-555555555552',
    '44444444-4444-4444-8444-444444444444',
    null,
    'JavaScript Fundamentals',
    'Learn variables, functions, arrays, conditions, DOM basics and browser interaction.',
    2
  ),
  (
    '55555555-5555-4555-8555-555555555553',
    '44444444-4444-4444-8444-444444444444',
    null,
    'React UI Basics',
    'Move from static pages to reusable components, props, state and simple application screens.',
    3
  ),
  (
    '55555555-5555-4555-8555-555555555554',
    '44444444-4444-4444-8444-444444444444',
    null,
    'Frontend Backend Basics',
    'Connect the frontend to auth, profiles, protected pages and real application data.',
    4
  )
on conflict (learning_path_id, position) do update set
  course_id = excluded.course_id,
  title = excluded.title,
  description = excluded.description;
