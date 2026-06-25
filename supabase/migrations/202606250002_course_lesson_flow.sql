alter table public.course_lessons
add column if not exists slug text;

update public.course_lessons
set slug = case title
  when 'Variables and Values' then 'variables-and-values'
  when 'Conditions' then 'conditions'
  when 'Loops' then 'loops'
  when 'Functions' then 'functions'
  when 'Arrays' then 'arrays'
  else lower(regexp_replace(title, '[^a-zA-Z0-9]+', '-', 'g'))
end
where course_id = '11111111-1111-4111-8111-111111111111'
  and slug is null;

alter table public.course_lessons
alter column slug set not null;

create unique index if not exists course_lessons_course_id_slug_idx
on public.course_lessons (course_id, slug);
