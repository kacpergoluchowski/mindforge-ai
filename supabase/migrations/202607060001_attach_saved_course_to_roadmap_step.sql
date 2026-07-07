drop function if exists public.attach_existing_course_to_roadmap_step(
  uuid,
  uuid,
  boolean
);

create or replace function public.attach_existing_course_to_roadmap_step(
  p_step_id uuid,
  p_course_id uuid,
  p_log_activity boolean default true
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  current_user_id uuid := auth.uid();
  v_path_id uuid;
  v_path_slug text;
  v_step_title text;
  v_course_slug text;
  v_course_title text;
begin
  if current_user_id is null then
    raise exception 'Not authenticated';
  end if;

  select
    lps.learning_path_id,
    lp.slug,
    lps.title
  into
    v_path_id,
    v_path_slug,
    v_step_title
  from public.learning_path_steps lps
  join public.learning_paths lp
    on lp.id = lps.learning_path_id
  join public.user_learning_paths ulp
    on ulp.learning_path_id = lp.id
   and ulp.profile_id = current_user_id
  where lps.id = p_step_id
    and lp.is_published = true
  limit 1;

  if v_path_id is null then
    raise exception 'Roadmap step not found or not started';
  end if;

  select c.slug, c.title
  into v_course_slug, v_course_title
  from public.courses c
  where c.id = p_course_id
    and c.is_published = true
  limit 1;

  if v_course_slug is null then
    raise exception 'Course not found';
  end if;

  update public.learning_path_steps
  set course_id = p_course_id
  where id = p_step_id;

  insert into public.user_courses (
    profile_id,
    course_id,
    status,
    progress_percent,
    started_at,
    updated_at
  )
  values (
    current_user_id,
    p_course_id,
    'in_progress',
    0,
    now(),
    now()
  )
  on conflict (profile_id, course_id)
  do update set
    status = excluded.status,
    updated_at = now();

  if p_log_activity then
    insert into public.activity_logs (
      profile_id,
      type,
      title,
      description,
      metadata
    )
    values (
      current_user_id,
      'course_started',
      'Started "' || v_course_title || '"',
      'Course attached from roadmap step',
      jsonb_build_object(
        'course_id', p_course_id,
        'course_slug', v_course_slug,
        'learning_path_id', v_path_id,
        'learning_path_slug', v_path_slug,
        'source', 'roadmap_step_course'
      )
    );
  end if;

  return jsonb_build_object(
    'course_id', p_course_id,
    'course_slug', v_course_slug
  );
end;
$$;

grant execute on function public.attach_existing_course_to_roadmap_step(
  uuid,
  uuid,
  boolean
) to authenticated;
