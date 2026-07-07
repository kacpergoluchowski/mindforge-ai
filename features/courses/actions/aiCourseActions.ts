"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { generateRoadmapCourse } from "@/features/learning-paths/api/generateRoadmapCourse";
import { saveAiGeneratedCourse } from "@/features/courses/api/saveAiGeneratedCourse";
import { createClient } from "@/lib/supabase/server";

const MIN_GOAL_LENGTH = 2;
const MAX_GOAL_LENGTH = 160;

type CreateAiCourseState = {
  error?: string;
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
    const savedCourse = await saveAiGeneratedCourse(supabase, course);
    courseSlug = savedCourse.courseSlug;

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
