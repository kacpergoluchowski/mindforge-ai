"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

import {
  getLessonQuiz,
  getQuizScore,
  passingQuizScore,
} from "../utils/lessonQuiz";

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

export async function submitLessonQuiz(formData: FormData) {
  const courseId = String(formData.get("courseId") ?? "");
  const courseSlug = String(formData.get("courseSlug") ?? "");
  const lessonId = String(formData.get("lessonId") ?? "");
  const lessonSlug = String(formData.get("lessonSlug") ?? "");
  const nextLessonSlug = String(formData.get("nextLessonSlug") ?? "");

  if (!courseId || !courseSlug || !lessonId || !lessonSlug) {
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
    .select("id, title, type, summary, objective, checklist, quiz_questions, xp_reward")
    .eq("id", lessonId)
    .eq("course_id", courseId)
    .maybeSingle();

  if (!lesson) {
    throw new Error("Lesson not found.");
  }

  await assertPreviousLessonsCompleted(supabase, {
    courseId,
    lessonId,
    profileId: user.id,
  });

  const quizQuestions = getLessonQuiz({
    id: lesson.id,
    title: lesson.title,
    type: lesson.type,
    summary: lesson.summary,
    objective: lesson.objective,
    checklist: lesson.checklist ?? [],
    xpReward: lesson.xp_reward,
    quizQuestions: lesson.quiz_questions,
  });
  const score = getQuizScore(quizQuestions, formData);

  if (score < passingQuizScore) {
    redirect(
      `/learn/courses/${courseSlug}/lessons/${lessonSlug}?quiz=retry&score=${score}`
    );
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

  if (!existingProgress && progressPercent >= 100 && courseSlug === "html-css-foundations") {
    await awardHtmlCssCompletionRewards(user.id);
  }

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

async function assertPreviousLessonsCompleted(
  supabase: Awaited<ReturnType<typeof createClient>>,
  {
    courseId,
    lessonId,
    profileId,
  }: {
    courseId: string;
    lessonId: string;
    profileId: string;
  }
) {
  const { data: modules } = await supabase
    .from("course_modules")
    .select(
      `
      id,
      position,
      course_lessons (
        id,
        position
      )
    `
    )
    .eq("course_id", courseId);

  const orderedLessonIds = [...(modules ?? [])]
    .sort((firstModule, secondModule) => {
      return firstModule.position - secondModule.position;
    })
    .flatMap((module) =>
      [...(module.course_lessons ?? [])]
        .sort((firstLesson, secondLesson) => {
          return firstLesson.position - secondLesson.position;
        })
        .map((courseLesson) => courseLesson.id as string)
    );
  const lessonIndex = orderedLessonIds.indexOf(lessonId);

  if (lessonIndex === -1) {
    throw new Error("Lesson order not found.");
  }

  const previousLessonIds = orderedLessonIds.slice(0, lessonIndex);

  if (!previousLessonIds.length) {
    return;
  }

  const { data: completedPreviousLessons } = await supabase
    .from("user_lesson_progress")
    .select("lesson_id")
    .eq("profile_id", profileId)
    .eq("course_id", courseId)
    .in("lesson_id", previousLessonIds);

  const completedPreviousIds = new Set(
    (completedPreviousLessons ?? []).map((item) => item.lesson_id as string)
  );
  const allPreviousLessonsCompleted = previousLessonIds.every(
    (previousLessonId) => completedPreviousIds.has(previousLessonId)
  );

  if (!allPreviousLessonsCompleted) {
    throw new Error("Complete previous lessons first.");
  }
}

async function awardHtmlCssCompletionRewards(profileId: string) {
  const supabase = await createClient();
  const achievementId = "90000000-0000-4000-8000-000000000001";
  const skillIds = [
    "91000000-0000-4000-8000-000000000001",
    "91000000-0000-4000-8000-000000000002",
  ];

  const { data: existingAchievement } = await supabase
    .from("user_achievements")
    .select("id")
    .eq("profile_id", profileId)
    .eq("achievement_id", achievementId)
    .maybeSingle();

  if (!existingAchievement) {
    await supabase.from("user_achievements").insert({
      profile_id: profileId,
      achievement_id: achievementId,
      unlocked_at: new Date().toISOString(),
    });

    await supabase.from("activity_logs").insert({
      profile_id: profileId,
      type: "achievement_unlocked",
      title: 'Unlocked "HTML & CSS Foundation Builder"',
      description: "Course achievement earned",
      metadata: {
        achievement_id: achievementId,
        course_slug: "html-css-foundations",
      },
    });
  }

  const { data: existingSkills } = await supabase
    .from("profile_skills")
    .select("skill_id")
    .eq("profile_id", profileId)
    .in("skill_id", skillIds);

  const existingSkillIds = new Set(
    (existingSkills ?? []).map((skill) => skill.skill_id as string)
  );
  const skillsToInsert = skillIds
    .filter((skillId) => !existingSkillIds.has(skillId))
    .map((skillId) => ({
      profile_id: profileId,
      skill_id: skillId,
    }));

  if (skillsToInsert.length) {
    await supabase.from("profile_skills").insert(skillsToInsert);
  }
}
