alter table public.ai_chats
add column if not exists type text not null default 'general',
add column if not exists source_id uuid,
add column if not exists source_title text;

alter table public.ai_chats
drop constraint if exists ai_chats_type_check;

alter table public.ai_chats
add constraint ai_chats_type_check check (
  type in ('general', 'lesson', 'challenge', 'roadmap')
);

create index if not exists ai_chats_profile_type_updated_idx
on public.ai_chats (profile_id, type, updated_at desc);
