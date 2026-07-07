import { cache } from "react";

import { createClient } from "@/lib/supabase/server";
import type { GlobalSearchItem } from "../types/layoutTypes.types";

type CourseSearchRow = {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  level: string;
};

type LearningPathSearchRow = {
  id: string;
  slug: string;
  title: string;
  description: string;
  level: string;
};

type ChallengeSearchRow = {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
};

const staticSearchItems: GlobalSearchItem[] = [
  {
    id: "page-dashboard",
    title: "Dashboard",
    description: "Overview, stats, activity and continue learning.",
    href: "/dashboard",
    type: "page",
    keywords: ["home", "overview", "stats", "activity"],
  },
  {
    id: "page-courses",
    title: "Courses",
    description: "Browse courses and continue learning.",
    href: "/learn/courses",
    type: "page",
    keywords: ["learn", "lessons", "course catalog"],
  },
  {
    id: "page-learning-paths",
    title: "Learning Paths",
    description: "Roadmaps, AI paths and learning trees.",
    href: "/learn/learning-paths",
    type: "page",
    keywords: ["roadmap", "roadmaps", "paths", "tree"],
  },
  {
    id: "page-challenges",
    title: "Challenges",
    description: "Coding challenges, verification and XP.",
    href: "/learn/challenges",
    type: "page",
    keywords: ["tasks", "coding", "xp", "verify"],
  },
  {
    id: "page-progress",
    title: "Progress",
    description: "XP, time spent, topics and learning activity.",
    href: "/learn/progress",
    type: "page",
    keywords: ["stats", "xp", "time", "activity"],
  },
  {
    id: "page-ai-chat",
    title: "AI Mentor",
    description: "Chat with AI about programming and career growth.",
    href: "/ai-mentor/chat",
    type: "page",
    keywords: ["chat", "assistant", "mentor", "ai"],
  },
  {
    id: "page-code-review",
    title: "Code Review",
    description: "Review code quality, structure and suggestions.",
    href: "/ai-mentor/code-review",
    type: "page",
    keywords: ["review", "clean code", "refactor"],
  },
  {
    id: "page-profile",
    title: "Profile",
    description: "Profile, skills, achievements and account details.",
    href: "/account/profile",
    type: "page",
    keywords: ["account", "skills", "achievements"],
  },
  {
    id: "setting-billing",
    title: "Billing",
    description: "Plan, subscription and AI usage limits.",
    href: "/account/billing",
    type: "setting",
    keywords: ["payments", "plan", "subscription", "limits"],
  },
];

export const getGlobalSearchItems = cache(async (): Promise<GlobalSearchItem[]> => {
  const supabase = await createClient();

  const [coursesResult, pathsResult, challengesResult] = await Promise.all([
    supabase
      .from("courses")
      .select("id, slug, title, description, category, level")
      .eq("is_published", true)
      .order("created_at", { ascending: true })
      .limit(80),
    supabase
      .from("learning_paths")
      .select("id, slug, title, description, level")
      .eq("is_published", true)
      .order("created_at", { ascending: true })
      .limit(80),
    supabase
      .from("challenges")
      .select("id, slug, title, description, category, difficulty")
      .eq("is_published", true)
      .order("created_at", { ascending: true })
      .limit(80),
  ]);

  return [
    ...staticSearchItems,
    ...mapCourses((coursesResult.data ?? []) as CourseSearchRow[]),
    ...mapLearningPaths((pathsResult.data ?? []) as LearningPathSearchRow[]),
    ...mapChallenges((challengesResult.data ?? []) as ChallengeSearchRow[]),
  ];
});

function mapCourses(courses: CourseSearchRow[]): GlobalSearchItem[] {
  return courses.map((course) => ({
    id: `course-${course.id}`,
    title: course.title,
    description: course.description,
    href: `/learn/courses/${course.slug}`,
    type: "course",
    keywords: [course.category, course.level, "course", "lesson"],
  }));
}

function mapLearningPaths(paths: LearningPathSearchRow[]): GlobalSearchItem[] {
  return paths.map((path) => ({
    id: `learning-path-${path.id}`,
    title: path.title,
    description: path.description,
    href: `/learn/learning-paths/${path.slug}`,
    type: "learningPath",
    keywords: [path.level, "learning path", "roadmap", "tree"],
  }));
}

function mapChallenges(challenges: ChallengeSearchRow[]): GlobalSearchItem[] {
  return challenges.map((challenge) => ({
    id: `challenge-${challenge.id}`,
    title: challenge.title,
    description: challenge.description,
    href: `/learn/challenges/${challenge.slug}`,
    type: "challenge",
    keywords: [challenge.category, challenge.difficulty, "challenge", "task"],
  }));
}
