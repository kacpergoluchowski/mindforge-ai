drop policy if exists "Users can delete own AI chats" on public.ai_chats;
create policy "Users can delete own AI chats"
on public.ai_chats for delete
to authenticated
using ((select auth.uid()) = profile_id);
