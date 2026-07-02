alter table public.learning_paths
add column if not exists source text not null default 'manual',
add column if not exists created_by uuid references public.profiles(id) on delete set null;

drop policy if exists "Users can create AI generated learning paths" on public.learning_paths;
create policy "Users can create AI generated learning paths"
on public.learning_paths for insert
to authenticated
with check (
  source = 'ai_generated'
  and created_by = (select auth.uid())
  and is_published = true
);

drop policy if exists "Users can create steps for own AI generated paths" on public.learning_path_steps;
create policy "Users can create steps for own AI generated paths"
on public.learning_path_steps for insert
to authenticated
with check (
  exists (
    select 1
    from public.learning_paths
    where learning_paths.id = learning_path_steps.learning_path_id
      and learning_paths.source = 'ai_generated'
      and learning_paths.created_by = (select auth.uid())
  )
);
