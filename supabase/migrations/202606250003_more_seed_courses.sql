insert into public.courses (
  id,
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
  is_published
) values
  (
    '11111111-1111-4111-8111-111111111112',
    'typescript-essentials',
    'TypeScript Essentials',
    'Learn types, interfaces and safer frontend development with TypeScript.',
    'Frontend',
    'Beginner',
    80,
    2,
    300,
    4.7,
    860,
    'file-code',
    'violet',
    true
  ),
  (
    '11111111-1111-4111-8111-111111111113',
    'react-basics',
    'React Basics',
    'Build reusable UI with components, props, state and events.',
    'Frontend',
    'Beginner',
    110,
    2,
    400,
    4.8,
    1320,
    'atom',
    'blue',
    true
  ),
  (
    '11111111-1111-4111-8111-111111111114',
    'supabase-auth-basics',
    'Supabase Auth Basics',
    'Understand authentication, profiles and protected routes with Supabase.',
    'Backend',
    'Intermediate',
    90,
    2,
    350,
    4.6,
    540,
    'database',
    'emerald',
    true
  )
on conflict (slug) do update set
  title = excluded.title,
  description = excluded.description,
  category = excluded.category,
  level = excluded.level,
  duration_minutes = excluded.duration_minutes,
  lessons_count = excluded.lessons_count,
  xp_reward = excluded.xp_reward,
  rating = excluded.rating,
  students_count = excluded.students_count,
  icon = excluded.icon,
  color = excluded.color,
  is_published = excluded.is_published,
  updated_at = now();

insert into public.course_modules (
  id,
  course_id,
  title,
  description,
  position
) values
  (
    '22222222-2222-4222-8222-222222222231',
    '11111111-1111-4111-8111-111111111112',
    'TypeScript Foundations',
    'Core syntax and type safety basics.',
    1
  ),
  (
    '22222222-2222-4222-8222-222222222232',
    '11111111-1111-4111-8111-111111111113',
    'React Fundamentals',
    'Components, props and state.',
    1
  ),
  (
    '22222222-2222-4222-8222-222222222233',
    '11111111-1111-4111-8111-111111111114',
    'Supabase Auth Flow',
    'Sign up, login and profile basics.',
    1
  )
on conflict (course_id, position) do update set
  title = excluded.title,
  description = excluded.description;

insert into public.course_lessons (
  id,
  course_id,
  module_id,
  title,
  slug,
  summary,
  content,
  position,
  duration_minutes,
  xp_reward,
  is_preview
) values
  (
    '33333333-3333-4333-8333-333333333341',
    '11111111-1111-4111-8111-111111111112',
    '22222222-2222-4222-8222-222222222231',
    'Types and Inference',
    'types-and-inference',
    'Learn how TypeScript understands values.',
    'TypeScript can infer many types automatically. You will learn when inference is enough and when explicit types are useful.',
    1,
    20,
    75,
    true
  ),
  (
    '33333333-3333-4333-8333-333333333342',
    '11111111-1111-4111-8111-111111111112',
    '22222222-2222-4222-8222-222222222231',
    'Interfaces',
    'interfaces',
    'Describe object shapes with interfaces.',
    'Interfaces help you model data passed through your application and make component props easier to reason about.',
    2,
    20,
    75,
    false
  ),
  (
    '33333333-3333-4333-8333-333333333343',
    '11111111-1111-4111-8111-111111111113',
    '22222222-2222-4222-8222-222222222232',
    'Components and Props',
    'components-and-props',
    'Build your first reusable React components.',
    'Components split UI into reusable pieces. Props let you pass data into those pieces.',
    1,
    25,
    75,
    true
  ),
  (
    '33333333-3333-4333-8333-333333333344',
    '11111111-1111-4111-8111-111111111113',
    '22222222-2222-4222-8222-222222222232',
    'State and Events',
    'state-and-events',
    'Make components interactive with state.',
    'State stores values that change over time. Events let users trigger those changes.',
    2,
    25,
    75,
    false
  ),
  (
    '33333333-3333-4333-8333-333333333345',
    '11111111-1111-4111-8111-111111111114',
    '22222222-2222-4222-8222-222222222233',
    'Auth Users and Profiles',
    'auth-users-and-profiles',
    'Connect Supabase users with app profiles.',
    'Supabase Auth handles identity. A profiles table lets your app store public user data and learning progress.',
    1,
    25,
    100,
    true
  ),
  (
    '33333333-3333-4333-8333-333333333346',
    '11111111-1111-4111-8111-111111111114',
    '22222222-2222-4222-8222-222222222233',
    'Protected Routes',
    'protected-routes',
    'Protect app pages for authenticated users.',
    'Protected routes make sure only logged-in users can access dashboard and learning pages.',
    2,
    25,
    100,
    false
  )
on conflict (module_id, position) do update set
  title = excluded.title,
  slug = excluded.slug,
  summary = excluded.summary,
  content = excluded.content,
  duration_minutes = excluded.duration_minutes,
  xp_reward = excluded.xp_reward,
  is_preview = excluded.is_preview;
