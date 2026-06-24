import type { LucideIcon } from "lucide-react";

export type ProfileStatColor = "violet" | "emerald" | "blue" | "orange";

export type ProfileStat = {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  progress: number;
  color: ProfileStatColor;
};

export type ProfileSkill = {
  name: string;
  icon: LucideIcon;
};

export type ProfileActivity = {
  id: number;
  title: string;
  subtitle: string;
  time: string;
  icon: LucideIcon;
};

export type ProfileAchievement = {
  id: number;
  title: string;
  description: string;
  date: string;
  icon: LucideIcon;
};
