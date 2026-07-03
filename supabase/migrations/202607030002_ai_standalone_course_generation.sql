drop function if exists public.save_ai_generated_course(jsonb);

create or replace function public.save_ai_generated_course(
  p_course jsonb
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  current_user_id uuid := auth.uid();
  v_course_id uuid;
  v_course_slug text;
  v_base_slug text;
  v_module_id uuid;
  v_module_item jsonb;
  v_lesson_item jsonb;
  v_module_position integer := 1;
  v_lesson_position integer;
begin
  if current_user_id is null then
    raise exception 'Not authenticated';
  end if;

  if p_course is null then
    raise exception 'Generated course payload is missing';
  end if;

  v_base_slug := coalesce(nullif(p_course ->> 'slug', ''), 'ai-generated-course');
  v_course_slug := v_base_slug;

  while exists (
    select 1
    from public.courses c
    where c.slug = v_course_slug
  ) loop
    v_course_slug := v_base_slug || '-' || lower(substr(replace(gen_random_uuid()::text, '-', ''), 1, 6));
  end loop;

  insert into public.courses (
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
    is_published,
    updated_at
  )
  values (
    v_course_slug,
    coalesce(nullif(p_course ->> 'title', ''), 'AI Generated Course'),
    coalesce(nullif(p_course ->> 'description', ''), 'AI-generated course.'),
    coalesce(nullif(p_course ->> 'category', ''), 'Frontend'),
    coalesce(nullif(p_course ->> 'level', ''), 'Beginner'),
    greatest(coalesce((p_course ->> 'durationMinutes')::integer, 1200), 30),
    greatest(
      (
        select coalesce(sum(jsonb_array_length(module_item.value -> 'lessons')), 0)
        from jsonb_array_elements(coalesce(p_course -> 'modules', '[]'::jsonb)) as module_item(value)
      ),
      1
    ),
    greatest(coalesce((p_course ->> 'xpReward')::integer, 900), 30),
    0,
    0,
    'brain',
    'violet',
    true,
    now()
  )
  returning public.courses.id, public.courses.slug
  into v_course_id, v_course_slug;

  for v_module_item in
    select value from jsonb_array_elements(coalesce(p_course -> 'modules', '[]'::jsonb))
  loop
    insert into public.course_modules (
      course_id,
      title,
      description,
      position
    )
    values (
      v_course_id,
      coalesce(nullif(v_module_item ->> 'title', ''), 'Course module'),
      coalesce(nullif(v_module_item ->> 'description', ''), 'Learn and practice this part of the course.'),
      v_module_position
    )
    returning public.course_modules.id into v_module_id;

    v_lesson_position := 1;

    for v_lesson_item in
      select value from jsonb_array_elements(coalesce(v_module_item -> 'lessons', '[]'::jsonb))
    loop
      insert into public.course_lessons (
        course_id,
        module_id,
        title,
        slug,
        summary,
        content,
        type,
        objective,
        checklist,
        quiz_questions,
        position,
        duration_minutes,
        xp_reward,
        is_preview
      )
      values (
        v_course_id,
        v_module_id,
        coalesce(nullif(v_lesson_item ->> 'title', ''), 'Course lesson'),
        coalesce(nullif(v_lesson_item ->> 'slug', ''), 'course-lesson-' || v_module_position || '-' || v_lesson_position),
        coalesce(nullif(v_lesson_item ->> 'summary', ''), 'Learn this lesson topic.'),
        coalesce(nullif(v_lesson_item ->> 'content', ''), 'Read the lesson and complete the practice task.'),
        coalesce(nullif(v_lesson_item ->> 'type', ''), 'lesson'),
        coalesce(nullif(v_lesson_item ->> 'objective', ''), 'Understand the main concept and apply it in practice.'),
        array(
          select jsonb_array_elements_text(coalesce(v_lesson_item -> 'checklist', '[]'::jsonb))
        ),
        coalesce(v_lesson_item -> 'quizQuestions', '[]'::jsonb),
        v_lesson_position,
        greatest(coalesce((v_lesson_item ->> 'durationMinutes')::integer, 30), 5),
        greatest(coalesce((v_lesson_item ->> 'xpReward')::integer, 30), 5),
        v_module_position = 1 and v_lesson_position = 1
      );

      v_lesson_position := v_lesson_position + 1;
    end loop;

    v_module_position := v_module_position + 1;
  end loop;

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
    v_course_id,
    'in_progress',
    0,
    now(),
    now()
  )
  on conflict (profile_id, course_id)
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
    'course_started',
    'Started "' || coalesce(nullif(p_course ->> 'title', ''), 'AI Generated Course') || '"',
    'AI-generated course created from goal',
    jsonb_build_object(
      'course_id', v_course_id,
      'course_slug', v_course_slug,
      'source', 'ai_generated_course'
    )
  );

  return jsonb_build_object(
    'course_id', v_course_id,
    'course_slug', v_course_slug
  );
end;
$$;

grant execute on function public.save_ai_generated_course(jsonb) to authenticated;
