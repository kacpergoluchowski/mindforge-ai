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
  id: number | string;
  slug?: string;
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
  id: number | string;
  slug?: string;
  firstLessonSlug?: string;
  nextLessonSlug?: string;
  title: string;
  description: string;
  rating: number;
  students: string;
  lessons: number;
  level: string;
  icon: LucideIcon;
  color: PopularCourseColor;
  status?: string;
  progress?: number;
};

export type TopicCardProps = {
  id: number;
  title: string;
  courses: number;
  icon: LucideIcon;
  color: TopicColor;
};

export type CourseListItem = {
  id: string;
  slug: string;
  firstLessonSlug: string | null;
  nextLessonSlug: string | null;
  title: string;
  description: string;
  category: string;
  level: string;
  duration: string;
  lessons: number;
  xpReward: number;
  rating: number;
  students: string;
  icon: string;
  color: string;
  status: string | null;
  progress: number;
};

export type CourseLesson = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  position: number;
  duration: string;
  xpReward: number;
  isPreview: boolean;
  completed: boolean;
};

export type CourseModule = {
  id: string;
  title: string;
  description: string | null;
  position: number;
  lessons: CourseLesson[];
};

export type CourseDetail = CourseListItem & {
  modules: CourseModule[];
  userProgress: CourseProgressSummary | null;
};

export type CourseProgressSummary = {
  status: string;
  progressPercent: number;
  startedAt: string | null;
  completedAt: string | null;
  completedLessonIds: string[];
};

export type ContinueLearningCourse = {
  id: string;
  slug: string;
  title: string;
  progress: number;
  duration: string;
  level: string;
  status: string;
  icon: string;
  color: string;
};
