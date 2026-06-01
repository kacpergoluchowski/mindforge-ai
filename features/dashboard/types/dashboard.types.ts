import type { LucideIcon } from "lucide-react";

export type StatCard = {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
};

export type StatsCardProps = {
  stat: StatCard;
};

export type LearningCategory = {
  label: string;
  time: string;
  percentage: number;
  color: "violet" | "emerald" | "orange" | "blue";
};

export type LearningCategoryItemProps = {
  category: LearningCategory;
};

export type ContinueLearningItemProps = {
  course: {
    title: string;
    progress: number;
    icon: LucideIcon;
  };
};

export type RecommendedCourse = {
  title: string;
  category: string;
  duration: string;
  level: string;
  rating: number;
  image: string;
};

export type RecommendedCourseCardProps = {
  course: RecommendedCourse;
};

export type ActivityItem = {
  title: string;
  description?: string;
  time: string;
  icon: LucideIcon;
  color: "emerald" | "yellow" | "blue";
};

export type ActivityFeedItemProps = {
  item: ActivityItem;
};