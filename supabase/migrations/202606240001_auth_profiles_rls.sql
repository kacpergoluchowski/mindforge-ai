create unique index if not exists profiles_username_unique
on public.profiles (lower(username))
where username is not null;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (
    id,
    full_name,
    username,
    level,
    xp,
    xp_goal,
    streak_days,
    plan
  )
  values (
    new.id,
    coalesce(
      new.raw_user_meta_data ->> 'full_name',
      new.raw_user_meta_data ->> 'name',
      split_part(new.email, '@', 1),
      'MindForge User'
    ),
    new.raw_user_meta_data ->> 'username',
    1,
    0,
    1000,
    0,
    'free'
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

insert into public.profiles (
  id,
  full_name,
  username,
  level,
  xp,
  xp_goal,
  streak_days,
  plan
)
select
  users.id,
  coalesce(
    users.raw_user_meta_data ->> 'full_name',
    users.raw_user_meta_data ->> 'name',
    split_part(users.email, '@', 1),
    'MindForge User'
  ),
  users.raw_user_meta_data ->> 'username',
  1,
  0,
  1000,
  0,
  'free'
from auth.users as users
where not exists (
  select 1 from public.profiles where profiles.id = users.id
)
on conflict (id) do nothing;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.skills enable row level security;
alter table public.profile_skills enable row level security;
alter table public.achievements enable row level security;
alter table public.user_achievements enable row level security;

drop policy if exists "Users can view own profile" on public.profiles;
create policy "Users can view own profile"
on public.profiles for select
to authenticated
using ((select auth.uid()) = id);

drop policy if exists "Users can insert own profile" on public.profiles;
create policy "Users can insert own profile"
on public.profiles for insert
to authenticated
with check ((select auth.uid()) = id);

drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile"
on public.profiles for update
to authenticated
using ((select auth.uid()) = id)
with check ((select auth.uid()) = id);

drop policy if exists "Authenticated users can view skills" on public.skills;
create policy "Authenticated users can view skills"
on public.skills for select
to authenticated
using (true);

drop policy if exists "Users can view own profile skills" on public.profile_skills;
create policy "Users can view own profile skills"
on public.profile_skills for select
to authenticated
using ((select auth.uid()) = profile_id);

drop policy if exists "Users can add own profile skills" on public.profile_skills;
create policy "Users can add own profile skills"
on public.profile_skills for insert
to authenticated
with check ((select auth.uid()) = profile_id);

drop policy if exists "Users can delete own profile skills" on public.profile_skills;
create policy "Users can delete own profile skills"
on public.profile_skills for delete
to authenticated
using ((select auth.uid()) = profile_id);

drop policy if exists "Authenticated users can view achievements" on public.achievements;
create policy "Authenticated users can view achievements"
on public.achievements for select
to authenticated
using (true);

drop policy if exists "Users can view own achievements" on public.user_achievements;
create policy "Users can view own achievements"
on public.user_achievements for select
to authenticated
using ((select auth.uid()) = profile_id);
