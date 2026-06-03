import { LucideIcon } from "lucide-react";

export type LearningPathCardProps = {
  title: string;
  progress: number;
  coursesCompleted: number;
  totalCourses: number;
  color: "violet" | "emerald" | "orange";
  icon: LucideIcon;
};

export type PopularLearningPathCardProps = {
  title: string;
  icon: LucideIcon;
  technologies: readonly string[];
  rating: string;
  students: string;
  courses: number;
  color: "blue" | "green" | "violet" | "yellow";
};

export type RoadmapStepProps = {
  title: string;
  description: string;
  status: "completed" | "current" | "locked";
};