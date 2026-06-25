export type LearningPath = {
  id: number | string;
  slug?: string;
  title: string;
  progress: number;
  coursesCompleted: number;
  totalCourses: number;
  color: LearningPathColor;
  iconName?: string;
  started?: boolean;
};

export type LearningPathColor = "violet" | "emerald" | "orange";

export type PopularLearningPath = {
  id: number | string;
  slug?: string;
  title: string;
  iconName?: string;
  technologies: readonly string[];
  rating: string;
  students: string;
  courses: number;
  color: PopularLearningPathColor;
};

export type PopularLearningPathColor = "blue" | "green" | "violet" | "yellow";

export type RoadmapStep = {
  id: number | string;
  title: string;
  description: string;
  status: "completed" | "current" | "locked";
};
