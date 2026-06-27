"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export async function startLearningPath(formData: FormData) {
  const pathId = String(formData.get("pathId") ?? "");
  const pathSlug = String(formData.get("pathSlug") ?? "");

  if (!pathId || !pathSlug) {
    throw new Error("Missing learning path data.");
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: path } = await supabase
    .from("learning_paths")
    .select(
      `
      id,
      title,
      learning_path_steps (
        course_id,
        position,
        courses (
          title,
          slug
        )
      )
    `
    )
    .eq("id", pathId)
    .eq("slug", pathSlug)
    .eq("is_published", true)
    .maybeSingle();

  if (!path) {
    throw new Error("Learning path not found.");
  }

  const firstStep = [...(path.learning_path_steps ?? [])].sort(
    (firstStepItem, secondStepItem) => {
      return firstStepItem.position - secondStepItem.position;
    }
  )[0];
  const firstCourse = getRelation(firstStep?.courses ?? null);

  const { data: existingPath } = await supabase
    .from("user_learning_paths")
    .select("id")
    .eq("profile_id", user.id)
    .eq("learning_path_id", pathId)
    .maybeSingle();

  if (!existingPath) {
    const { error } = await supabase.from("user_learning_paths").insert({
      profile_id: user.id,
      learning_path_id: pathId,
      status: "in_progress",
      started_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    if (error) {
      throw new Error("Could not start learning path.");
    }

    await supabase.from("activity_logs").insert({
      profile_id: user.id,
      type: "learning_path_started",
      title: `Started "${path.title}"`,
      description: "Learning path added to your roadmap",
      metadata: {
        learning_path_id: pathId,
        learning_path_slug: pathSlug,
      },
    });
  }

  if (firstStep?.course_id) {
    const { data: existingCourse } = await supabase
      .from("user_courses")
      .select("id")
      .eq("profile_id", user.id)
      .eq("course_id", firstStep.course_id)
      .maybeSingle();

    if (!existingCourse) {
      await supabase.from("user_courses").insert({
        profile_id: user.id,
        course_id: firstStep.course_id,
        status: "in_progress",
        progress_percent: 0,
        started_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

      await supabase.from("activity_logs").insert({
        profile_id: user.id,
        type: "course_started",
        title: `Started "${firstCourse?.title ?? "First path course"}"`,
        description: "Course added from learning path",
        metadata: {
          course_id: firstStep.course_id,
          course_slug: firstCourse?.slug,
          learning_path_id: pathId,
          learning_path_slug: pathSlug,
        },
      });
    }
  }

  revalidatePath("/dashboard");
  revalidatePath("/learn/courses");
  revalidatePath("/learn/learning-paths");
  revalidatePath(`/learn/learning-paths/${pathSlug}`);
  redirect(`/learn/learning-paths/${pathSlug}`);
}

function getRelation<T>(relation: T | T[] | null) {
  return Array.isArray(relation) ? relation[0] ?? null : relation;
}
