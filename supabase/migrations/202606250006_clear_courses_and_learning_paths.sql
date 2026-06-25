delete from public.activity_logs
where type in (
  'course_started',
  'lesson_completed',
  'xp_earned',
  'learning_path_started'
);

delete from public.user_learning_paths;
delete from public.learning_path_steps;
delete from public.learning_paths;

delete from public.user_lesson_progress;
delete from public.user_courses;
delete from public.course_lessons;
delete from public.course_modules;
delete from public.courses;
