import type { createClient } from "@/lib/supabase/server";
import type { GeneratedRoadmapCourse } from "@/features/learning-paths/types/learningPaths.types";

type SupabaseClient = Awaited<ReturnType<typeof createClient>>;

type SavedAiCourseResult = {
  course_id?: string;
  course_slug?: string;
};

type SaveAiGeneratedCourseResult = {
  courseId: string;
  courseSlug: string;
};

export async function saveAiGeneratedCourse(
  supabase: SupabaseClient,
  course: GeneratedRoadmapCourse
): Promise<SaveAiGeneratedCourseResult> {
  const { data, error } = await supabase.rpc("save_ai_generated_course", {
    p_course: course,
  });
  const savedCourse = (Array.isArray(data) ? data[0] : data) as
    | SavedAiCourseResult
    | null;
  const courseId = savedCourse?.course_id;
  const courseSlug = savedCourse?.course_slug;

  if (error || !courseId || !courseSlug) {
    throw new Error(
      error?.message
        ? `Could not save generated course: ${error.message}`
        : "Could not save generated course."
    );
  }

  return {
    courseId,
    courseSlug,
  };
}
