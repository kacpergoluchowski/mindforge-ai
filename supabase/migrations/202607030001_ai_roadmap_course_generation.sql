drop function if exists public.attach_or_create_roadmap_step_course(
  uuid,
  uuid,
  jsonb
);

create or replace function public.attach_or_create_roadmap_step_course(
  p_step_id uuid,
  p_existing_course_id uuid,
  p_course jsonb
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
  v_course_id uuid;
  v_course_slug text;
  v_module_id uuid;
  v_module_item jsonb;
  v_lesson_item jsonb;
  v_module_position integer := 1;
  v_lesson_position integer;
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

  if p_existing_course_id is not null then
    select c.id, c.slug
    into v_course_id, v_course_slug
    from public.courses c
    where c.id = p_existing_course_id
      and c.is_published = true
    limit 1;

    if v_course_id is null then
      raise exception 'Existing course not found';
    end if;
  else
    if p_course is null then
      raise exception 'Generated course payload is missing';
    end if;

    select c.id, c.slug
    into v_course_id, v_course_slug
    from public.courses c
    where c.slug = coalesce(nullif(p_course ->> 'slug', ''), 'generated-course')
      and c.is_published = true
    limit 1;

    if v_course_id is null then
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
        coalesce(nullif(p_course ->> 'slug', ''), 'generated-course'),
        coalesce(nullif(p_course ->> 'title', ''), v_step_title),
        coalesce(nullif(p_course ->> 'description', ''), 'AI-generated course for a roadmap step.'),
        coalesce(nullif(p_course ->> 'category', ''), 'Frontend'),
        coalesce(nullif(p_course ->> 'level', ''), 'Beginner'),
        greatest(coalesce((p_course ->> 'durationMinutes')::integer, 180), 30),
        greatest(
          (
            select coalesce(sum(jsonb_array_length(module_item.value -> 'lessons')), 0)
            from jsonb_array_elements(coalesce(p_course -> 'modules', '[]'::jsonb)) as module_item(value)
          ),
          1
        ),
        greatest(coalesce((p_course ->> 'xpReward')::integer, 180), 30),
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
    end if;
  end if;

  update public.learning_path_steps
  set course_id = v_course_id
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
    'Started "' || v_step_title || '"',
    'Course generated from roadmap step',
    jsonb_build_object(
      'course_id', v_course_id,
      'course_slug', v_course_slug,
      'learning_path_id', v_path_id,
      'learning_path_slug', v_path_slug,
      'source', 'ai_generated_roadmap_step'
    )
  );

  return jsonb_build_object(
    'course_id', v_course_id,
    'course_slug', v_course_slug
  );
end;
$$;

grant execute on function public.attach_or_create_roadmap_step_course(
  uuid,
  uuid,
  jsonb
) to authenticated;
