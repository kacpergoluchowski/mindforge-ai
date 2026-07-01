import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export type ProgressStatColor = "violet" | "emerald" | "orange" | "blue";

export type ProgressStat = {
  id: number;
  title: ReactNode;
  value: string;
  subtitle: ReactNode;
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
  id: number | string;
  title: string;
  progress: number;
  icon: LucideIcon;
  color: TopicProgressColor;
};

export type LearningCalendarDay = {
  id: number | string;
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
  id: number | string;
  title: string;
  description: string;
  xp: string;
  icon: LucideIcon;
  color: RecentActivityColor;
};

export type AchievementColor = "violet" | "emerald" | "yellow";

export type AchievementItem = {
  id: number | string;
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
  id: number | string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: LearningInsightColor;
};

export type CourseProgressItem = {
  id: string;
  title: string;
  category: string;
  status: string;
  progress: number;
  lessons: number;
  duration: string;
};

export type ProgressSummary = {
  startedCourses: number;
  completedCourses: number;
  completedLessons: number;
  thisWeekLessons: number;
  thisWeekXp: number;
  dailyAverageXp: number;
  weeklyLessonGoal: number;
  xpOverview: XpOverviewItem[];
  categoryBreakdown: TimeSpentItem[];
  topicProgress: TopicProgressItem[];
  learningCalendar: LearningCalendarDay[];
  achievements: AchievementItem[];
  insights: LearningInsightItem[];
  courseProgress: CourseProgressItem[];
  recentActivities: RecentActivityItem[];
};
