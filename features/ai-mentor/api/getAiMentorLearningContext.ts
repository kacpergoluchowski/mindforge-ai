import { createClient } from "@/lib/supabase/server";

type CourseRelation = {
  id: string;
  slug: string;
  title: string;
  category: string;
  level: string;
  lessons_count: number;
};

type UserCourseRow = {
  course_id: string;
  status: string;
  progress_percent: number;
  updated_at: string;
  courses: CourseRelation | CourseRelation[] | null;
};

type LessonProgressRow = {
  course_id: string;
  lesson_id: string;
  completed_at: string;
};

type CourseModuleRelation = {
  title: string;
  position: number;
};

type CourseLessonRow = {
  id: string;
  course_id: string;
  slug: string | null;
  title: string;
  summary: string;
  position: number;
  course_modules: CourseModuleRelation | CourseModuleRelation[] | null;
};

const MAX_CONTEXT_COURSES = 4;

export async function getAiMentorLearningContext(
  profileId: string
): Promise<string> {
  const supabase = await createClient();

  const { data: userCoursesData, error } = await supabase
    .from("user_courses")
    .select(
      `
      course_id,
      status,
      progress_percent,
      updated_at,
      courses (
        id,
        slug,
        title,
        category,
        level,
        lessons_count
      )
    `
    )
    .eq("profile_id", profileId)
    .order("updated_at", { ascending: false })
    .limit(MAX_CONTEXT_COURSES);

  if (error || !userCoursesData?.length) {
    return "Learning context: The user has no active courses connected yet.";
  }

  const userCourses = userCoursesData as UserCourseRow[];
  const courseIds = userCourses.map((course) => course.course_id);

  const [lessonsResult, completedLessonsResult] = await Promise.all([
    supabase
      .from("course_lessons")
      .select(
        `
        id,
        course_id,
        slug,
        title,
        summary,
        position,
        course_modules (
          title,
          position
        )
      `
      )
      .in("course_id", courseIds),
    supabase
      .from("user_lesson_progress")
      .select("course_id, lesson_id, completed_at")
      .eq("profile_id", profileId)
      .in("course_id", courseIds),
  ]);

  const lessons = ((lessonsResult.data ?? []) as CourseLessonRow[]).sort(
    sortLessons
  );
  const completedLessons = (completedLessonsResult.data ??
    []) as LessonProgressRow[];
  const completedLessonIds = new Set(
    completedLessons.map((lesson) => lesson.lesson_id)
  );

  const courseLines = userCourses.flatMap((userCourse) => {
    const course = getRelation(userCourse.courses);

    if (!course) {
      return [];
    }

    const courseLessons = lessons.filter(
      (lesson) => lesson.course_id === course.id
    );
    const completedCount = courseLessons.filter((lesson) =>
      completedLessonIds.has(lesson.id)
    ).length;
    const nextLesson = courseLessons.find(
      (lesson) => !completedLessonIds.has(lesson.id)
    );
    const lastCompletedLesson = [...completedLessons]
      .filter((lesson) => lesson.course_id === course.id)
      .sort((first, second) =>
        second.completed_at.localeCompare(first.completed_at)
      )[0];
    const lastCompletedLessonDetails = lastCompletedLesson
      ? courseLessons.find((lesson) => lesson.id === lastCompletedLesson.lesson_id)
      : null;

    return [
      [
        `Course: ${course.title}`,
        `Category: ${course.category}`,
        `Level: ${course.level}`,
        `Status: ${userCourse.status}`,
        `Progress: ${userCourse.progress_percent}%`,
        `Lessons completed: ${completedCount}/${course.lessons_count}`,
        `Last completed lesson: ${
          lastCompletedLessonDetails?.title ?? "none yet"
        }`,
        `Recommended next lesson: ${nextLesson?.title ?? "course completed"}`,
        nextLesson?.summary ? `Next lesson summary: ${nextLesson.summary}` : null,
      ]
        .filter(Boolean)
        .join("; "),
    ];
  });

  if (!courseLines.length) {
    return "Learning context: The user has started courses, but course details are not available.";
  }

  return [
    "Learning context from MindForge Supabase:",
    ...courseLines.map((line, index) => `${index + 1}. ${line}`),
  ].join("\n");
}

function sortLessons(first: CourseLessonRow, second: CourseLessonRow): number {
  const firstModule = getRelation(first.course_modules);
  const secondModule = getRelation(second.course_modules);
  const moduleOrder = (firstModule?.position ?? 0) - (secondModule?.position ?? 0);

  if (moduleOrder !== 0) {
    return moduleOrder;
  }

  return first.position - second.position;
}

function getRelation<T>(relation: T | T[] | null): T | null {
  return Array.isArray(relation) ? relation[0] ?? null : relation;
}
