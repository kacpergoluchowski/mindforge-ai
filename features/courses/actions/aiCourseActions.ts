"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { generateRoadmapCourse } from "@/features/learning-paths/api/generateRoadmapCourse";
import { createClient } from "@/lib/supabase/server";

const MIN_GOAL_LENGTH = 2;
const MAX_GOAL_LENGTH = 160;

type CreateAiCourseState = {
  error?: string;
};

type SavedAiCourseResult = {
  course_id?: string;
  course_slug?: string;
};

export async function createAiCourse(
  _previousState: CreateAiCourseState,
  formData: FormData
): Promise<CreateAiCourseState> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const goal = String(formData.get("goal") ?? "").trim();

  if (goal.length < MIN_GOAL_LENGTH) {
    return {
      error: "Enter a course goal first.",
    };
  }

  if (goal.length > MAX_GOAL_LENGTH) {
    return {
      error: `Goal is too long. Limit is ${MAX_GOAL_LENGTH} characters.`,
    };
  }

  let courseSlug: string | undefined;

  try {
    const course = await generateRoadmapCourse({
      pathTitle: "MindForge AI Course",
      stepTitle: goal,
      stepDescription: `Create a complete practical programming course about: ${goal}.`,
    });
    const { data, error } = await supabase.rpc("save_ai_generated_course", {
      p_course: {
        ...course,
        slug: `${course.slug}-${Date.now().toString(36)}`,
      },
    });
    const savedCourse = (Array.isArray(data) ? data[0] : data) as
      | SavedAiCourseResult
      | null;
    courseSlug = savedCourse?.course_slug;

    if (error || !courseSlug) {
      console.error("Create AI course failed:", error);

      return {
        error: error?.message
          ? `Could not create course: ${error.message}`
          : "Could not create course.",
      };
    }

    revalidatePath("/dashboard");
    revalidatePath("/learn/courses");
    revalidatePath(`/learn/courses/${courseSlug}`);
  } catch (error) {
    console.error("Create AI course failed:", error);

    return {
      error: "AI course generation is not available right now. Try again in a moment.",
    };
  }

  redirect(`/learn/courses/${courseSlug}`);
}
