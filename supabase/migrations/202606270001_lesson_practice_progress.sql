create table if not exists public.user_lesson_practice (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  course_id uuid not null references public.courses(id) on delete cascade,
  lesson_id uuid not null references public.course_lessons(id) on delete cascade,
  completed_at timestamptz not null default now(),
  unique (profile_id, lesson_id)
);

alter table public.user_lesson_practice enable row level security;

drop policy if exists "Users can view own lesson practice" on public.user_lesson_practice;
create policy "Users can view own lesson practice"
on public.user_lesson_practice for select
to authenticated
using ((select auth.uid()) = profile_id);

drop policy if exists "Users can complete own lesson practice" on public.user_lesson_practice;
create policy "Users can complete own lesson practice"
on public.user_lesson_practice for insert
to authenticated
with check ((select auth.uid()) = profile_id);

drop policy if exists "Users can update own lesson practice" on public.user_lesson_practice;
create policy "Users can update own lesson practice"
on public.user_lesson_practice for update
to authenticated
using ((select auth.uid()) = profile_id)
with check ((select auth.uid()) = profile_id);
