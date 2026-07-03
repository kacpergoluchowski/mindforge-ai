update public.profiles
set
  level = floor(greatest(coalesce(xp, 0), 0) / 1000)::integer + 1,
  xp_goal = (floor(greatest(coalesce(xp, 0), 0) / 1000)::integer + 1) * 1000,
  updated_at = now();
