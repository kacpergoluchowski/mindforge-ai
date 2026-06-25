create table if not exists public.activity_logs (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  type text not null,
  title text not null,
  description text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists activity_logs_profile_id_created_at_idx
on public.activity_logs (profile_id, created_at desc);

alter table public.activity_logs enable row level security;

drop policy if exists "Users can view own activity logs" on public.activity_logs;
create policy "Users can view own activity logs"
on public.activity_logs for select
to authenticated
using ((select auth.uid()) = profile_id);

drop policy if exists "Users can create own activity logs" on public.activity_logs;
create policy "Users can create own activity logs"
on public.activity_logs for insert
to authenticated
with check ((select auth.uid()) = profile_id);
