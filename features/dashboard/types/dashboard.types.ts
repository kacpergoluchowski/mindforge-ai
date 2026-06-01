import type { LucideIcon } from "lucide-react";

export type StatCard = {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
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

export type StatsCardProps = {
  stat: StatCard;
};