"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { generateRoadmapCourse } from "../api/generateRoadmapCourse";

type LearningPathStepRow = {
  id: string;
  title: string;
  description: string;
  course_id: string | null;
  courses: CourseRelation | CourseRelation[] | null;
  learning_paths: LearningPathRelation | LearningPathRelation[] | null;
};

type CourseRelation = {
  slug: string;
};

type LearningPathRelation = {
  id: string;
  slug: string;
  title: string;
};

type CourseSearchRow = {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  level: string;
};

type SavedGeneratedCourseResult = {
  course_id?: string;
  course_slug?: string;
};

export async function generateCourseForRoadmapStep(formData: FormData) {
  const stepId = String(formData.get("stepId") ?? "");
  const pathSlug = String(formData.get("pathSlug") ?? "");

  if (!stepId || !pathSlug) {
    throw new Error("Missing roadmap step data.");
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: stepData, error: stepError } = await supabase
    .from("learning_path_steps")
    .select(
      `
      id,
      title,
      description,
      course_id,
      courses (
        slug
      ),
      learning_paths (
        id,
        slug,
        title
      )
    `
    )
    .eq("id", stepId)
    .maybeSingle();

  if (stepError || !stepData) {
    throw new Error("Roadmap step not found.");
  }

  const step = stepData as LearningPathStepRow;
  const path = getRelation(step.learning_paths);

  if (!path || path.slug !== pathSlug) {
    throw new Error("Roadmap step does not belong to this path.");
  }

  const existingStepCourse = getRelation(step.courses);

  if (step.course_id && existingStepCourse?.slug) {
    redirect(`/learn/courses/${existingStepCourse.slug}`);
  }

  const matchedCourse = await findSimilarCourse({
    description: step.description,
    title: step.title,
  });
  const generatedCourse = matchedCourse
    ? null
    : await generateRoadmapCourse({
        pathTitle: path.title,
        stepTitle: step.title,
        stepDescription: step.description,
      });

  const { data, error } = await supabase.rpc(
    "attach_or_create_roadmap_step_course",
    {
      p_course: generatedCourse,
      p_existing_course_id: matchedCourse?.id ?? null,
      p_step_id: step.id,
    }
  );
  const savedCourse = (Array.isArray(data) ? data[0] : data) as
    | SavedGeneratedCourseResult
    | null;
  const courseSlug = savedCourse?.course_slug;

  if (error || !courseSlug) {
    console.error("Generate roadmap course failed:", error);
    throw new Error(
      error?.message
        ? `Could not generate course: ${error.message}`
        : "Could not generate course."
    );
  }

  revalidatePath("/dashboard");
  revalidatePath("/learn/courses");
  revalidatePath(`/learn/courses/${courseSlug}`);
  revalidatePath("/learn/learning-paths");
  revalidatePath(`/learn/learning-paths/${pathSlug}`);
  redirect(`/learn/courses/${courseSlug}`);
}

async function findSimilarCourse({
  description,
  title,
}: {
  description: string;
  title: string;
}): Promise<CourseSearchRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("courses")
    .select("id, slug, title, description, category, level")
    .eq("is_published", true)
    .limit(80);

  if (error || !data) {
    return null;
  }

  const sourceWords = getKeywords(`${title} ${description}`);

  if (!sourceWords.size) {
    return null;
  }

  const scoredCourses = (data as CourseSearchRow[])
    .map((course) => ({
      course,
      score: getMatchScore(sourceWords, `${course.title} ${course.description}`),
    }))
    .sort((firstCourse, secondCourse) => secondCourse.score - firstCourse.score);
  const bestMatch = scoredCourses[0];

  return bestMatch && bestMatch.score >= 2 ? bestMatch.course : null;
}

function getMatchScore(sourceWords: Set<string>, target: string): number {
  const targetWords = getKeywords(target);
  let score = 0;

  sourceWords.forEach((word) => {
    if (targetWords.has(word)) {
      score += 1;
    }
  });

  return score;
}

function getKeywords(value: string): Set<string> {
  const ignoredWords = new Set([
    "and",
    "the",
    "for",
    "with",
    "from",
    "into",
    "your",
    "learn",
    "build",
    "course",
    "module",
    "roadmap",
  ]);

  return new Set(
    value
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .split(/\s+/)
      .filter((word) => word.length >= 3 && !ignoredWords.has(word))
      .slice(0, 20)
  );
}

function getRelation<T>(relation: T | T[] | null) {
  return Array.isArray(relation) ? relation[0] ?? null : relation;
}
