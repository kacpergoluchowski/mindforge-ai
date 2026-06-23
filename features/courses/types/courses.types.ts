import type { LucideIcon } from "lucide-react";

export type CourseCategory =
  | "All Courses"
  | "Frontend"
  | "Backend"
  | "Fullstack"
  | "AI & ML"
  | "DevOps"
  | "Mobile"
  | "Design"
  | "Database";

export type CourseColor = "blue" | "green" | "violet";
export type PopularCourseColor = "blue" | "violet" | "emerald" | "orange";
export type TopicColor =
  | "blue"
  | "green"
  | "violet"
  | "orange"
  | "sky"
  | "pink"
  | "yellow"
  | "emerald";

export type ContinueLearningCardProps = {
  id: number;
  title: string;
  instructor: string;
  progress: number;
  duration: string;
  level: string;
  status: string;
  icon: LucideIcon;
  color: CourseColor;
};

export type PopularCourseCardProps = {
  id: number;
  title: string;
  description: string;
  rating: number;
  students: string;
  lessons: number;
  level: string;
  icon: LucideIcon;
  color: PopularCourseColor;
};

export type TopicCardProps = {
  id: number;
  title: string;
  courses: number;
  icon: LucideIcon;
  color: TopicColor;
};
