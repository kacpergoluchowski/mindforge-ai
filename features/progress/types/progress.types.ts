import type { LucideIcon } from "lucide-react";

export type ProgressStatColor = "violet" | "emerald" | "orange" | "blue";

export type ProgressStat = {
  id: number;
  title: string;
  value: string;
  subtitle: string;
  icon: LucideIcon;
  color: ProgressStatColor;
  progress?: number;
};

export type XpOverviewItem = {
  day: string;
  xp: number;
};

export type TimeSpentColor = "violet" | "emerald" | "blue" | "orange";

export type TimeSpentItem = {
  id: number;
  label: string;
  value: number;
  color: TimeSpentColor;
};

export type TopicProgressColor = "yellow" | "blue" | "sky" | "green";

export type TopicProgressItem = {
  id: number;
  title: string;
  progress: number;
  icon: LucideIcon;
  color: TopicProgressColor;
};

export type LearningCalendarDay = {
  id: number;
  day: string;
  value: number;
};

export type CalendarSummaryItem = {
  id: number;
  label: string;
  value: string;
};

export type RecentActivityColor = "violet" | "emerald" | "yellow";

export type RecentActivityItem = {
  id: number;
  title: string;
  description: string;
  xp: string;
  icon: LucideIcon;
  color: RecentActivityColor;
};

export type AchievementColor = "violet" | "emerald" | "yellow";

export type AchievementItem = {
  id: number;
  title: string;
  description: string;
  date: string;
  icon: LucideIcon;
  color: AchievementColor;
};

export type WeeklyGoalData = {
  current: number;
  target: number;
  remaining: string;
  daysLeft: string;
};

export type LearningInsightColor = "blue" | "emerald" | "violet";

export type LearningInsightItem = {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
  color: LearningInsightColor;
};
