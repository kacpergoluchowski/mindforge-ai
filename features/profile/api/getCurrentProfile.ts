import { cache } from "react";

import { createClient } from "@/lib/supabase/server";

import type { User } from "@supabase/supabase-js";
import type {
  CurrentProfile,
  CurrentProfileAchievement,
  CurrentProfileSkill,
} from "../types/profile.types";

type SkillRow = {
  id: string;
  name: string;
};

type AchievementRow = {
  id: string;
  title: string;
  description: string | null;
  icon: string | null;
};

type ProfileRow = {
  id: string;
  full_name: string | null;
  username: string | null;
  role: string | null;
  location: string | null;
  bio: string | null;
  avatar_url: string | null;
  level: number | null;
  xp: number | null;
  xp_goal: number | null;
  streak_days: number | null;
  last_learning_date: string | null;
  plan: string | null;
  created_at: string | null;
  profile_skills: Array<{
    skills: SkillRow | SkillRow[] | null;
  }>;
  user_achievements: Array<{
    unlocked_at: string;
    achievements: AchievementRow | AchievementRow[] | null;
  }>;
};

function getRelation<T>(relation: T | T[] | null) {
  return Array.isArray(relation) ? relation[0] ?? null : relation;
}

function mapSkills(row: ProfileRow | null): CurrentProfileSkill[] {
  return (row?.profile_skills ?? []).flatMap((item) => {
    const skill = getRelation(item.skills);
    return skill ? [{ id: skill.id, name: skill.name }] : [];
  });
}

function mapAchievements(
  row: ProfileRow | null
): CurrentProfileAchievement[] {
  return (row?.user_achievements ?? []).flatMap((item) => {
    const achievement = getRelation(item.achievements);

    return achievement
      ? [
          {
            id: achievement.id,
            title: achievement.title,
            description: achievement.description,
            icon: achievement.icon,
            unlockedAt: item.unlocked_at,
          },
        ]
      : [];
  });
}

function normalizeProfile(user: User, row: ProfileRow | null): CurrentProfile {
  const email = user.email ?? "";
  const metadata = user.user_metadata;
  const streakDays = getCurrentStreakDays({
    lastLearningDate: row?.last_learning_date ?? null,
    streakDays: row?.streak_days ?? 0,
  });

  return {
    id: user.id,
    email,
    fullName:
      row?.full_name ?? metadata.full_name ?? metadata.name ?? "MindForge User",
    username: row?.username ?? metadata.username ?? email.split("@")[0] ?? "user",
    role: row?.role ?? null,
    location: row?.location ?? null,
    bio: row?.bio ?? null,
    avatarUrl: row?.avatar_url ?? metadata.avatar_url ?? null,
    level: row?.level ?? 1,
    xp: row?.xp ?? 0,
    xpGoal: row?.xp_goal ?? 1000,
    streakDays,
    plan: row?.plan ?? "free",
    createdAt: row?.created_at ?? user.created_at,
    skills: mapSkills(row),
    achievements: mapAchievements(row),
  };
}

type CurrentStreakInput = {
  lastLearningDate: string | null;
  streakDays: number;
};

function getCurrentStreakDays({
  lastLearningDate,
  streakDays,
}: CurrentStreakInput): number {
  const today = getDateKey(new Date());
  const yesterday = getDateKey(addDays(new Date(), -1));

  if (lastLearningDate === today || lastLearningDate === yesterday) {
    return streakDays;
  }

  return 0;
}

function addDays(date: Date, days: number): Date {
  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + days);

  return nextDate;
}

function getDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export const getCurrentProfile = cache(async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data } = await supabase
    .from("profiles")
    .select(
      `
        *,
        profile_skills (
          skills (id, name)
        ),
        user_achievements (
          unlocked_at,
          achievements (id, title, description, icon)
        )
      `
    )
    .eq("id", user.id)
    .maybeSingle();

  return normalizeProfile(user, data as unknown as ProfileRow | null);
});
