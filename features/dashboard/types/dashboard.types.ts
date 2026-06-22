import { LucideIcon } from "lucide-react";

export type StatsCardItem = {
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

export type RecommendedCourse = {
  title: string;
  category: string;
  duration: string;
  level: string;
  rating: number;
  image: string;
};

export type ActivityItem = {
  title: string;
  description?: string;
  time: string;
  icon: LucideIcon;
  color: "emerald" | "yellow" | "blue";
};