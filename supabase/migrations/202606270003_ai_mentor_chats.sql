create table if not exists public.ai_chats (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  title text not null default 'New chat',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.ai_chat_messages (
  id uuid primary key default gen_random_uuid(),
  chat_id uuid not null references public.ai_chats(id) on delete cascade,
  profile_id uuid not null references public.profiles(id) on delete cascade,
  role text not null,
  content text not null,
  created_at timestamptz not null default now(),
  constraint ai_chat_messages_role_check check (role in ('user', 'assistant'))
);

create index if not exists ai_chats_profile_updated_idx
on public.ai_chats (profile_id, updated_at desc);

create index if not exists ai_chat_messages_chat_created_idx
on public.ai_chat_messages (chat_id, created_at asc);

alter table public.ai_chats enable row level security;
alter table public.ai_chat_messages enable row level security;

drop policy if exists "Users can view own AI chats" on public.ai_chats;
create policy "Users can view own AI chats"
on public.ai_chats for select
to authenticated
using ((select auth.uid()) = profile_id);

drop policy if exists "Users can create own AI chats" on public.ai_chats;
create policy "Users can create own AI chats"
on public.ai_chats for insert
to authenticated
with check ((select auth.uid()) = profile_id);

drop policy if exists "Users can update own AI chats" on public.ai_chats;
create policy "Users can update own AI chats"
on public.ai_chats for update
to authenticated
using ((select auth.uid()) = profile_id)
with check ((select auth.uid()) = profile_id);

drop policy if exists "Users can view own AI messages" on public.ai_chat_messages;
create policy "Users can view own AI messages"
on public.ai_chat_messages for select
to authenticated
using ((select auth.uid()) = profile_id);

drop policy if exists "Users can create own AI messages" on public.ai_chat_messages;
create policy "Users can create own AI messages"
on public.ai_chat_messages for insert
to authenticated
with check ((select auth.uid()) = profile_id);
