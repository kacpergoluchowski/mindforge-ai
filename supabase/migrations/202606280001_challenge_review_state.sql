alter table public.user_challenges
add column if not exists ai_feedback text,
add column if not exists ai_verdict text,
add column if not exists reviewed_at timestamptz;

alter table public.user_challenges
drop constraint if exists user_challenges_ai_verdict_check;

alter table public.user_challenges
add constraint user_challenges_ai_verdict_check check (
  ai_verdict is null or ai_verdict in ('passed', 'needs_work')
);
