import type { LucideIcon } from "lucide-react";

export type LearningPath = {
  id: number;
  title: string;
  progress: number;
  coursesCompleted: number;
  totalCourses: number;
  color: LearningPathColor;
  icon: LucideIcon;
};

export type LearningPathColor = "violet" | "emerald" | "orange";

export type PopularLearningPath = {
  id: number;
  title: string;
  icon: LucideIcon;
  technologies: readonly string[];
  rating: string;
  students: string;
  courses: number;
  color: PopularLearningPathColor;
};

export type PopularLearningPathColor = "blue" | "green" | "violet" | "yellow";

export type RoadmapStep = {
  id: number;
  title: string;
  description: string;
  status: "completed" | "current" | "locked";
};
