import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export type StatsCardItem = {
  id: "completedLessons" | "completedCourses" | "currentStreak" | "xpEarned";
  title: ReactNode;
  value: ReactNode;
  change: ReactNode;
  icon: LucideIcon;
};

export type LearningCategory = {
  label: string;
  time: string;
  percentage: number;
  color: LearningCategoryColor;
};

export type LearningCategoryColor =
  | "violet"
  | "emerald"
  | "orange"
  | "blue";

export type ContinueLearningCourse = {
  id?: string;
  slug?: string;
  title: string;
  progress: number;
  icon: LucideIcon;
};

export type RecommendedCourse = {
  id?: string;
  slug?: string;
  title: string;
  category: string;
  duration: string;
  level: string;
  rating: number;
  image: string;
};

export type ActivityItem = {
  id?: string;
  type?: string;
  title: string;
  description?: string;
  time: string;
  icon: LucideIcon;
  color: ActivityColor;
};

export type ActivityColor = "emerald" | "yellow" | "blue";
