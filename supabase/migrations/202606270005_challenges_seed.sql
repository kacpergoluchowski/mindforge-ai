create table if not exists public.challenges (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text not null,
  category text not null,
  difficulty text not null,
  duration_minutes integer not null default 0,
  xp_reward integer not null default 0,
  rating numeric(2, 1) not null default 0,
  participants_count integer not null default 0,
  success_rate integer not null default 0,
  icon text not null default 'code',
  color text not null default 'violet',
  requirements text[] not null default '{}'::text[],
  checklist text[] not null default '{}'::text[],
  starter_code text,
  solution_notes text,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint challenges_difficulty_check check (
    difficulty in ('Beginner', 'Easy', 'Medium', 'Hard')
  ),
  constraint challenges_success_rate_check check (
    success_rate >= 0 and success_rate <= 100
  )
);

create table if not exists public.user_challenges (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  challenge_id uuid not null references public.challenges(id) on delete cascade,
  status text not null default 'not_started',
  progress_percent integer not null default 0,
  solution_text text,
  solution_url text,
  started_at timestamptz,
  submitted_at timestamptz,
  completed_at timestamptz,
  updated_at timestamptz not null default now(),
  unique (profile_id, challenge_id),
  constraint user_challenges_status_check check (
    status in ('not_started', 'in_progress', 'submitted', 'completed')
  ),
  constraint user_challenges_progress_check check (
    progress_percent >= 0 and progress_percent <= 100
  )
);

create index if not exists challenges_published_category_idx
on public.challenges (is_published, category, created_at);

create index if not exists user_challenges_profile_id_updated_at_idx
on public.user_challenges (profile_id, updated_at desc);

alter table public.challenges enable row level security;
alter table public.user_challenges enable row level security;

drop policy if exists "Authenticated users can view published challenges" on public.challenges;
create policy "Authenticated users can view published challenges"
on public.challenges for select
to authenticated
using (is_published = true);

drop policy if exists "Users can view own challenge progress" on public.user_challenges;
create policy "Users can view own challenge progress"
on public.user_challenges for select
to authenticated
using ((select auth.uid()) = profile_id);

drop policy if exists "Users can start own challenges" on public.user_challenges;
create policy "Users can start own challenges"
on public.user_challenges for insert
to authenticated
with check ((select auth.uid()) = profile_id);

drop policy if exists "Users can update own challenge progress" on public.user_challenges;
create policy "Users can update own challenge progress"
on public.user_challenges for update
to authenticated
using ((select auth.uid()) = profile_id)
with check ((select auth.uid()) = profile_id);

insert into public.challenges (
  id,
  slug,
  title,
  description,
  category,
  difficulty,
  duration_minutes,
  xp_reward,
  rating,
  participants_count,
  success_rate,
  icon,
  color,
  requirements,
  checklist,
  starter_code,
  solution_notes,
  is_published
)
values (
  '40000000-0000-4000-8000-000000000001',
  'responsive-profile-card',
  'Build a Responsive Profile Card',
  'Create a clean profile card component with semantic HTML, modern CSS and responsive layout behavior.',
  'Frontend',
  'Beginner',
  90,
  120,
  4.8,
  0,
  0,
  'layout',
  'violet',
  array[
    'Use semantic HTML for the card content',
    'Create a visible profile image area',
    'Add name, role, short bio and social links',
    'Style the card with spacing, border, radius and hover state',
    'Make the card work on mobile and desktop'
  ],
  array[
    'HTML structure is readable and semantic',
    'CSS is separated from HTML',
    'Card is centered and responsive',
    'Text spacing and typography are consistent',
    'Links and buttons have hover and focus states'
  ],
  '<article class="profile-card">
  <img src="avatar.jpg" alt="Profile photo of Alex Developer" />
  <h1>Alex Developer</h1>
  <p>Junior Frontend Developer</p>
  <p>I build accessible and responsive web interfaces.</p>
</article>',
  'Focus on clean structure first. Then improve spacing, typography and responsive behavior. The final result should look like a real UI component, not only a plain HTML exercise.',
  true
)
on conflict (slug) do update
set
  title = excluded.title,
  description = excluded.description,
  category = excluded.category,
  difficulty = excluded.difficulty,
  duration_minutes = excluded.duration_minutes,
  xp_reward = excluded.xp_reward,
  rating = excluded.rating,
  participants_count = excluded.participants_count,
  success_rate = excluded.success_rate,
  icon = excluded.icon,
  color = excluded.color,
  requirements = excluded.requirements,
  checklist = excluded.checklist,
  starter_code = excluded.starter_code,
  solution_notes = excluded.solution_notes,
  is_published = excluded.is_published,
  updated_at = now();
