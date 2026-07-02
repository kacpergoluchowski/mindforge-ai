export type LearningPath = {
  id: number | string;
  slug?: string;
  description?: string;
  estimatedHours?: number;
  level?: string;
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
  courseProgress?: number;
  courseSlug?: string | null;
  title: string;
  description: string;
  status: "completed" | "current" | "locked";
};

export type LearningPathDetails = {
  id: string;
  slug: string;
  title: string;
  description: string;
  level: string;
  estimatedHours: number;
  progress: number;
  coursesCompleted: number;
  totalCourses: number;
  started: boolean;
  steps: RoadmapStep[];
};

export type RoadmapSuggestion = {
  id: string;
  title: string;
  description: string;
  level: string;
  focus: string;
};

export type RoadmapSuggestionState = {
  error?: string;
  normalizedGoal?: string;
  suggestions?: RoadmapSuggestion[];
};

export type GeneratedRoadmapPreview = {
  title: string;
  description: string;
  level: string;
  estimatedWeeks: string;
  milestones: string[];
  modules: {
    title: string;
    description: string;
    topics: string[];
  }[];
};

export type RoadmapPreviewState = {
  error?: string;
  preview?: GeneratedRoadmapPreview;
  suggestionId?: string;
};
