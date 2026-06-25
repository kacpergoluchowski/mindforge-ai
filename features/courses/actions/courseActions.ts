"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export async function startCourse(formData: FormData) {
  const courseId = String(formData.get("courseId") ?? "");
  const courseSlug = String(formData.get("courseSlug") ?? "");
  const lessonSlug = String(formData.get("lessonSlug") ?? "");

  if (!courseId || !courseSlug || !lessonSlug) {
    throw new Error("Missing course data.");
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: course } = await supabase
    .from("courses")
    .select("id, title")
    .eq("id", courseId)
    .eq("slug", courseSlug)
    .eq("is_published", true)
    .maybeSingle();

  if (!course) {
    throw new Error("Course not found.");
  }

  const { data: lesson } = await supabase
    .from("course_lessons")
    .select("id")
    .eq("course_id", courseId)
    .eq("slug", lessonSlug)
    .maybeSingle();

  if (!lesson) {
    throw new Error("Lesson not found.");
  }

  const { data: existingCourse } = await supabase
    .from("user_courses")
    .select("id")
    .eq("profile_id", user.id)
    .eq("course_id", courseId)
    .maybeSingle();

  if (!existingCourse) {
    const { error } = await supabase.from("user_courses").insert({
      profile_id: user.id,
      course_id: courseId,
      status: "in_progress",
      progress_percent: 0,
      started_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    if (error) {
      throw new Error("Could not start course.");
    }

    await supabase.from("activity_logs").insert({
      profile_id: user.id,
      type: "course_started",
      title: `Started "${course.title}"`,
      description: "Course added to Continue Learning",
      metadata: {
        course_id: courseId,
        course_slug: courseSlug,
      },
    });
  }

  revalidatePath("/dashboard");
  revalidatePath("/learn/courses");
  revalidatePath(`/learn/courses/${courseSlug}`);
  redirect(`/learn/courses/${courseSlug}/lessons/${lessonSlug}`);
}

export async function completeLesson(formData: FormData) {
  const courseId = String(formData.get("courseId") ?? "");
  const courseSlug = String(formData.get("courseSlug") ?? "");
  const lessonId = String(formData.get("lessonId") ?? "");
  const nextLessonSlug = String(formData.get("nextLessonSlug") ?? "");

  if (!courseId || !courseSlug || !lessonId) {
    throw new Error("Missing lesson data.");
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: lesson } = await supabase
    .from("course_lessons")
    .select("id, title, xp_reward")
    .eq("id", lessonId)
    .eq("course_id", courseId)
    .maybeSingle();

  if (!lesson) {
    throw new Error("Lesson not found.");
  }

  const { data: existingProgress } = await supabase
    .from("user_lesson_progress")
    .select("id")
    .eq("profile_id", user.id)
    .eq("lesson_id", lessonId)
    .maybeSingle();

  if (!existingProgress) {
    const { error: progressError } = await supabase
      .from("user_lesson_progress")
      .insert({
        profile_id: user.id,
        course_id: courseId,
        lesson_id: lessonId,
      });

    if (progressError) {
      throw new Error("Could not complete lesson.");
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("xp")
      .eq("id", user.id)
      .maybeSingle();

    await supabase
      .from("profiles")
      .update({
        xp: (profile?.xp ?? 0) + lesson.xp_reward,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id);

    await supabase.from("activity_logs").insert([
      {
        profile_id: user.id,
        type: "lesson_completed",
        title: `Completed "${lesson.title}"`,
        description: "Lesson completed",
        metadata: {
          course_id: courseId,
          course_slug: courseSlug,
          lesson_id: lessonId,
          xp_reward: lesson.xp_reward,
        },
      },
      {
        profile_id: user.id,
        type: "xp_earned",
        title: `Earned ${lesson.xp_reward} XP`,
        description: "for completing a lesson",
        metadata: {
          course_id: courseId,
          course_slug: courseSlug,
          lesson_id: lessonId,
          xp_reward: lesson.xp_reward,
        },
      },
    ]);
  }

  const [{ count: totalLessons }, { count: completedLessons }] =
    await Promise.all([
      supabase
        .from("course_lessons")
        .select("id", { count: "exact", head: true })
        .eq("course_id", courseId),
      supabase
        .from("user_lesson_progress")
        .select("id", { count: "exact", head: true })
        .eq("profile_id", user.id)
        .eq("course_id", courseId),
    ]);

  const progressPercent =
    totalLessons && completedLessons
      ? Math.round((completedLessons / totalLessons) * 100)
      : 0;

  await supabase.from("user_courses").upsert(
    {
      profile_id: user.id,
      course_id: courseId,
      status: progressPercent >= 100 ? "completed" : "in_progress",
      progress_percent: progressPercent,
      completed_at: progressPercent >= 100 ? new Date().toISOString() : null,
      updated_at: new Date().toISOString(),
    },
    {
      onConflict: "profile_id,course_id",
      ignoreDuplicates: false,
    }
  );

  revalidatePath("/dashboard");
  revalidatePath("/learn/progress");
  revalidatePath("/account/profile");
  revalidatePath("/learn/courses");
  revalidatePath(`/learn/courses/${courseSlug}`);
  redirect(
    nextLessonSlug
      ? `/learn/courses/${courseSlug}/lessons/${nextLessonSlug}`
      : `/learn/courses/${courseSlug}`
  );
}
