import { LucideIcon } from "lucide-react";

export type ContinueLearningCardProps = {
  title: string;
  instructor: string;
  progress: number;
  duration: string;
  level: string;
  status: string;
  icon: LucideIcon;
  color: "blue" | "green" | "violet";
};

export type PopularCourseCardProps = {
  title: string;
  description: string;
  rating: number;
  students: string;
  lessons: number;
  level: string;
  icon: LucideIcon;
  color: "blue" | "violet" | "emerald" | "orange";
};

export type TopicCardProps = {
  title: string;
  courses: number;
  icon: LucideIcon;
  color:
    | "blue"
    | "green"
    | "violet"
    | "orange"
    | "sky"
    | "pink"
    | "yellow"
    | "emerald";
};