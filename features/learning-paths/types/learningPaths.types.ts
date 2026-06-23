import type { LucideIcon } from "lucide-react";

export type LearningPath = {
  id: number;
  title: string;
  progress: number;
  coursesCompleted: number;
  totalCourses: number;
  color: "violet" | "emerald" | "orange";
  icon: LucideIcon;
};

export type PopularLearningPath = {
  id: number;
  title: string;
  icon: LucideIcon;
  technologies: readonly string[];
  rating: string;
  students: string;
  courses: number;
  color: "blue" | "green" | "violet" | "yellow";
};

export type RoadmapStep = {
  id: number;
  title: string;
  description: string;
  status: "completed" | "current" | "locked";
};