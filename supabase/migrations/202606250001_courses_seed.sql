create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text not null,
  category text not null,
  level text not null,
  duration_minutes integer not null default 0,
  lessons_count integer not null default 0,
  xp_reward integer not null default 0,
  rating numeric(2, 1) not null default 0,
  students_count integer not null default 0,
  icon text not null default 'code',
  color text not null default 'blue',
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.course_modules (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  title text not null,
  description text,
  position integer not null,
  created_at timestamptz not null default now(),
  unique (course_id, position)
);

create table if not exists public.course_lessons (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  module_id uuid not null references public.course_modules(id) on delete cascade,
  title text not null,
  slug text,
  summary text not null,
  content text not null,
  position integer not null,
  duration_minutes integer not null default 0,
  xp_reward integer not null default 0,
  is_preview boolean not null default false,
  created_at timestamptz not null default now(),
  unique (module_id, position)
);

create table if not exists public.user_courses (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  course_id uuid not null references public.courses(id) on delete cascade,
  status text not null default 'not_started',
  progress_percent integer not null default 0,
  started_at timestamptz,
  completed_at timestamptz,
  updated_at timestamptz not null default now(),
  unique (profile_id, course_id),
  constraint user_courses_progress_check check (
    progress_percent >= 0 and progress_percent <= 100
  )
);

create table if not exists public.user_lesson_progress (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  course_id uuid not null references public.courses(id) on delete cascade,
  lesson_id uuid not null references public.course_lessons(id) on delete cascade,
  completed_at timestamptz not null default now(),
  unique (profile_id, lesson_id)
);

alter table public.courses enable row level security;
alter table public.course_modules enable row level security;
alter table public.course_lessons enable row level security;
alter table public.user_courses enable row level security;
alter table public.user_lesson_progress enable row level security;

drop policy if exists "Authenticated users can view published courses" on public.courses;
create policy "Authenticated users can view published courses"
on public.courses for select
to authenticated
using (is_published = true);

drop policy if exists "Authenticated users can view published modules" on public.course_modules;
create policy "Authenticated users can view published modules"
on public.course_modules for select
to authenticated
using (
  exists (
    select 1
    from public.courses
    where courses.id = course_modules.course_id
      and courses.is_published = true
  )
);

drop policy if exists "Authenticated users can view published lessons" on public.course_lessons;
create policy "Authenticated users can view published lessons"
on public.course_lessons for select
to authenticated
using (
  exists (
    select 1
    from public.courses
    where courses.id = course_lessons.course_id
      and courses.is_published = true
  )
);

drop policy if exists "Users can view own course progress" on public.user_courses;
create policy "Users can view own course progress"
on public.user_courses for select
to authenticated
using ((select auth.uid()) = profile_id);

drop policy if exists "Users can start own courses" on public.user_courses;
create policy "Users can start own courses"
on public.user_courses for insert
to authenticated
with check ((select auth.uid()) = profile_id);

drop policy if exists "Users can update own course progress" on public.user_courses;
create policy "Users can update own course progress"
on public.user_courses for update
to authenticated
using ((select auth.uid()) = profile_id)
with check ((select auth.uid()) = profile_id);

drop policy if exists "Users can view own lesson progress" on public.user_lesson_progress;
create policy "Users can view own lesson progress"
on public.user_lesson_progress for select
to authenticated
using ((select auth.uid()) = profile_id);

drop policy if exists "Users can complete own lessons" on public.user_lesson_progress;
create policy "Users can complete own lessons"
on public.user_lesson_progress for insert
to authenticated
with check ((select auth.uid()) = profile_id);

insert into public.courses (
  id,
  slug,
  title,
  description,
  category,
  level,
  duration_minutes,
  lessons_count,
  xp_reward,
  rating,
  students_count,
  icon,
  color,
  is_published
) values (
  '11111111-1111-4111-8111-111111111111',
  'javascript-fundamentals',
  'JavaScript Fundamentals',
  'Learn the core JavaScript concepts needed to build interactive web apps.',
  'Frontend',
  'Beginner',
  95,
  5,
  350,
  4.8,
  1240,
  'file-code',
  'blue',
  true
) on conflict (slug) do update set
  title = excluded.title,
  description = excluded.description,
  category = excluded.category,
  level = excluded.level,
  duration_minutes = excluded.duration_minutes,
  lessons_count = excluded.lessons_count,
  xp_reward = excluded.xp_reward,
  rating = excluded.rating,
  students_count = excluded.students_count,
  icon = excluded.icon,
  color = excluded.color,
  is_published = excluded.is_published,
  updated_at = now();

insert into public.course_modules (
  id,
  course_id,
  title,
  description,
  position
) values
  (
    '22222222-2222-4222-8222-222222222221',
    '11111111-1111-4111-8111-111111111111',
    'JavaScript Basics',
    'Start with variables, values and simple program flow.',
    1
  ),
  (
    '22222222-2222-4222-8222-222222222222',
    '11111111-1111-4111-8111-111111111111',
    'Functions and Arrays',
    'Learn how to organize logic and work with lists of data.',
    2
  )
on conflict (course_id, position) do update set
  title = excluded.title,
  description = excluded.description;

insert into public.course_lessons (
  id,
  course_id,
  module_id,
  title,
  slug,
  summary,
  content,
  position,
  duration_minutes,
  xp_reward,
  is_preview
) values
  (
    '33333333-3333-4333-8333-333333333331',
    '11111111-1111-4111-8111-111111111111',
    '22222222-2222-4222-8222-222222222221',
    'Variables and Values',
    'variables-and-values',
    'Understand let, const and basic JavaScript values.',
    'In this lesson you learn how JavaScript stores data in variables. Use const for values that should not be reassigned and let when the value can change.',
    1,
    15,
    50,
    true
  ),
  (
    '33333333-3333-4333-8333-333333333332',
    '11111111-1111-4111-8111-111111111111',
    '22222222-2222-4222-8222-222222222221',
    'Conditions',
    'conditions',
    'Use if statements to make decisions in your code.',
    'Conditions let your program react to different situations. You will use if, else if and else to control what happens next.',
    2,
    20,
    75,
    false
  ),
  (
    '33333333-3333-4333-8333-333333333333',
    '11111111-1111-4111-8111-111111111111',
    '22222222-2222-4222-8222-222222222221',
    'Loops',
    'loops',
    'Repeat actions with for loops and array loops.',
    'Loops help you avoid repeated code. You will learn when to use for loops and how to iterate over arrays.',
    3,
    20,
    75,
    false
  ),
  (
    '33333333-3333-4333-8333-333333333334',
    '11111111-1111-4111-8111-111111111111',
    '22222222-2222-4222-8222-222222222222',
    'Functions',
    'functions',
    'Create reusable blocks of logic.',
    'Functions keep your code organized. You will define functions, pass arguments and return values.',
    1,
    20,
    75,
    false
  ),
  (
    '33333333-3333-4333-8333-333333333335',
    '11111111-1111-4111-8111-111111111111',
    '22222222-2222-4222-8222-222222222222',
    'Arrays',
    'arrays',
    'Store and transform lists of values.',
    'Arrays are one of the most common data structures in JavaScript. You will add, read and transform array items.',
    2,
    20,
    75,
    false
  )
on conflict (module_id, position) do update set
  title = excluded.title,
  slug = excluded.slug,
  summary = excluded.summary,
  content = excluded.content,
  duration_minutes = excluded.duration_minutes,
  xp_reward = excluded.xp_reward,
  is_preview = excluded.is_preview;
