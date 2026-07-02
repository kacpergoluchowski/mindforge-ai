alter table public.learning_paths
add column if not exists source text not null default 'manual',
add column if not exists created_by uuid references public.profiles(id) on delete set null;

drop function if exists public.save_ai_generated_learning_path(
  text,
  text,
  text,
  text,
  integer,
  jsonb
);

create or replace function public.save_ai_generated_learning_path(
  p_slug text,
  p_title text,
  p_description text,
  p_level text,
  p_estimated_hours integer,
  p_modules jsonb
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  current_user_id uuid := auth.uid();
  v_learning_path_id uuid;
  v_learning_path_slug text;
  existing_path record;
  inserted_path record;
  module_item jsonb;
  module_position integer := 1;
begin
  if current_user_id is null then
    raise exception 'Not authenticated';
  end if;

  select id, slug
  into existing_path
  from public.learning_paths
  where slug = p_slug
    and is_published = true
  limit 1;

  if existing_path.id is null then
    insert into public.learning_paths (
      slug,
      title,
      description,
      level,
      estimated_hours,
      rating,
      students_count,
      icon,
      color,
      is_published,
      source,
      created_by,
      updated_at
    )
    values (
      p_slug,
      p_title,
      p_description,
      p_level,
      greatest(p_estimated_hours, 1),
      0,
      0,
      'brain',
      'violet',
      true,
      'ai_generated',
      current_user_id,
      now()
    )
    returning public.learning_paths.id, public.learning_paths.slug into inserted_path;

    for module_item in
      select value from jsonb_array_elements(coalesce(p_modules, '[]'::jsonb))
    loop
      insert into public.learning_path_steps (
        learning_path_id,
        course_id,
        title,
        description,
        position
      )
      values (
        inserted_path.id,
        null,
        coalesce(nullif(module_item ->> 'title', ''), 'Roadmap step'),
        coalesce(nullif(module_item ->> 'description', ''), 'Complete this roadmap step.'),
        module_position
      );

      module_position := module_position + 1;
    end loop;

    v_learning_path_id := inserted_path.id;
    v_learning_path_slug := inserted_path.slug;
  else
    v_learning_path_id := existing_path.id;
    v_learning_path_slug := existing_path.slug;
  end if;

  insert into public.user_learning_paths (
    profile_id,
    learning_path_id,
    status,
    started_at,
    updated_at
  )
  values (
    current_user_id,
    v_learning_path_id,
    'in_progress',
    now(),
    now()
  )
  on conflict (profile_id, learning_path_id)
  do update set
    status = excluded.status,
    updated_at = now();

  insert into public.activity_logs (
    profile_id,
    type,
    title,
    description,
    metadata
  )
  values (
    current_user_id,
    'learning_path_started',
    'Started "' || p_title || '"',
    'AI roadmap added to your learning paths',
    jsonb_build_object(
      'learning_path_id', v_learning_path_id,
      'learning_path_slug', v_learning_path_slug,
      'source', 'ai_generated'
    )
  );

  return jsonb_build_object(
    'learning_path_id', v_learning_path_id,
    'learning_path_slug', v_learning_path_slug
  );
end;
$$;

grant execute on function public.save_ai_generated_learning_path(
  text,
  text,
  text,
  text,
  integer,
  jsonb
) to authenticated;
