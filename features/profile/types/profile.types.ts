import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export type ProfileStatColor = "violet" | "emerald" | "blue" | "orange";

export type ProfileStat = {
  title: ReactNode;
  subtitle: ReactNode;
  icon: LucideIcon;
  progress: number;
  color: ProfileStatColor;
};

export type ProfileActivity = {
  id: number;
  title: string;
  subtitle: string;
  time: string;
  icon: LucideIcon;
};

export type CurrentProfileSkill = {
  id: string;
  name: string;
};

export type CurrentProfileAchievement = {
  id: string;
  title: string;
  description: string | null;
  icon: string | null;
  unlockedAt: string;
};

export type CurrentProfile = {
  id: string;
  email: string;
  fullName: string;
  username: string;
  role: string | null;
  location: string | null;
  bio: string | null;
  avatarUrl: string | null;
  level: number;
  xp: number;
  xpGoal: number;
  streakDays: number;
  plan: string;
  createdAt: string;
  skills: CurrentProfileSkill[];
  achievements: CurrentProfileAchievement[];
};
