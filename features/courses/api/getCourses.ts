import { cache } from "react";

import { createClient } from "@/lib/supabase/server";

import type {
  CourseDetail,
  CourseLesson,
  CourseListItem,
  CourseModule,
  CourseProgressSummary,
  ContinueLearningCourse,
} from "../types/courses.types";

type CourseRow = {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  level: string;
  duration_minutes: number;
  lessons_count: number;
  xp_reward: number;
  rating: number;
  students_count: number;
  icon: string;
  color: string;
};

type CourseListLessonRow = {
  id: string;
  slug: string;
  position: number;
};

type CourseListModuleRow = {
  position: number;
  course_lessons: CourseListLessonRow[] | null;
};

type CourseListRow = CourseRow & {
  course_modules: CourseListModuleRow[] | null;
};

type CourseLessonRow = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  position: number;
  duration_minutes: number;
  xp_reward: number;
  is_preview: boolean;
};

type CourseModuleRow = {
  id: string;
  title: string;
  description: string | null;
  position: number;
  course_lessons: CourseLessonRow[] | null;
};

type CourseDetailRow = CourseRow & {
  course_modules: CourseModuleRow[] | null;
};

type UserCourseRow = {
  status: string;
  progress_percent: number;
  started_at: string | null;
  completed_at: string | null;
};

type ContinueLearningRow = {
  status: string;
  progress_percent: number;
  courses: CourseRow | CourseRow[] | null;
};

export const getPublishedCourses = cache(
  async (
    category = "All Courses",
    options: { excludeStarted?: boolean } = {}
  ): Promise<CourseListItem[]> => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let query = supabase
    .from("courses")
    .select(
      `
      id,
      slug,
      title,
      description,
      category,
      level,
      duration_minutes,
      lessons_count,
      xp_reward,
      rating,
      students_count,
      icon,
      color,
      course_modules (
        position,
        course_lessons (
          id,
          slug,
          position
        )
      )
    `
    )
    .eq("is_published", true)
    .order("created_at", { ascending: true });

  if (category !== "All Courses") {
    query = query.eq("category", category);
  }

  const { data, error } = await query;

  if (error || !data) {
    return [];
  }

  const courseRows = data as CourseListRow[];
  const courseIds = courseRows.map((course) => course.id);

  if (!courseRows.length) {
    return [];
  }

  const [userCoursesResult, lessonProgressResult] = user
    ? await Promise.all([
        supabase
          .from("user_courses")
          .select("course_id, status, progress_percent")
          .eq("profile_id", user.id)
          .in("course_id", courseIds),
        supabase
          .from("user_lesson_progress")
          .select("lesson_id, course_id")
          .eq("profile_id", user.id)
          .in("course_id", courseIds),
      ])
    : [null, null];

  const progressByCourse = new Map(
    (userCoursesResult?.data ?? []).map((item) => [
      item.course_id,
      {
        status: item.status as string,
        progress: item.progress_percent as number,
      },
    ])
  );
  const completedLessons = new Set(
    (lessonProgressResult?.data ?? []).map((item) => item.lesson_id as string)
  );

  return courseRows
    .filter((course) => {
      return !options.excludeStarted || !progressByCourse.has(course.id);
    })
    .map((course) =>
      mapCourseListItem(course, progressByCourse.get(course.id), completedLessons)
    );
  }
);

export const getCourseBySlug = cache(
  async (slug: string): Promise<CourseDetail | null> => {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("courses")
      .select(
        `
        id,
        slug,
        title,
        description,
        category,
        level,
        duration_minutes,
        lessons_count,
        xp_reward,
        rating,
        students_count,
        icon,
        color,
        course_modules (
          id,
          title,
          description,
          position,
          course_lessons (
            id,
            slug,
            title,
            summary,
            content,
            position,
            duration_minutes,
            xp_reward,
            is_preview
          )
        )
      `
      )
      .eq("slug", slug)
      .eq("is_published", true)
      .maybeSingle();

    if (error || !data) {
      return null;
    }

    const course = data as CourseDetailRow;
    const [userCourseResult, lessonProgressResult] = user
      ? await Promise.all([
          supabase
            .from("user_courses")
            .select("status, progress_percent, started_at, completed_at")
            .eq("profile_id", user.id)
            .eq("course_id", course.id)
            .maybeSingle(),
          supabase
            .from("user_lesson_progress")
            .select("lesson_id")
            .eq("profile_id", user.id)
            .eq("course_id", course.id),
        ])
      : [null, null];

    return mapCourseDetail(
      course,
      mapCourseProgress(
        userCourseResult?.data as UserCourseRow | null,
        (lessonProgressResult?.data ?? []).map((item) => item.lesson_id)
      )
    );
  }
);

export const getContinueLearningCourses = cache(
  async (): Promise<ContinueLearningCourse[]> => {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return [];
    }

    const { data, error } = await supabase
      .from("user_courses")
      .select(
        `
        status,
        progress_percent,
        courses (
          id,
          slug,
          title,
          description,
          category,
          level,
          duration_minutes,
          lessons_count,
          xp_reward,
          rating,
          students_count,
          icon,
          color
        )
      `
      )
      .eq("profile_id", user.id)
      .order("updated_at", { ascending: false });

    if (error || !data) {
      return [];
    }

    return (data as ContinueLearningRow[]).flatMap((item) => {
      const course = getRelation(item.courses);

      return course
        ? [
            {
              id: course.id,
              slug: course.slug,
              title: course.title,
              progress: item.progress_percent,
              duration: formatDuration(course.duration_minutes),
              level: course.level,
              status: formatCourseStatus(item.status),
              icon: course.icon,
              color: course.color,
            },
          ]
        : [];
    });
  }
);

export const getRecommendedCourses = cache(
  async (): Promise<CourseListItem[]> => {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return [];
    }

    const [coursesResult, userCoursesResult] = await Promise.all([
      supabase
        .from("courses")
        .select(
          "id, slug, title, description, category, level, duration_minutes, lessons_count, xp_reward, rating, students_count, icon, color"
        )
        .eq("is_published", true)
        .order("rating", { ascending: false })
        .limit(6),
      supabase
        .from("user_courses")
        .select("course_id")
        .eq("profile_id", user.id),
    ]);

    if (coursesResult.error || !coursesResult.data) {
      return [];
    }

    const startedCourseIds = new Set(
      (userCoursesResult.data ?? []).map((course) => course.course_id)
    );

    return (coursesResult.data as CourseRow[])
      .filter((course) => !startedCourseIds.has(course.id))
      .map((course) => mapCourseListItem(course));
  }
);

function mapCourseListItem(
  course: CourseRow | CourseListRow,
  progress?: { status: string; progress: number },
  completedLessons = new Set<string>()
): CourseListItem {
  const lessons =
    "course_modules" in course
      ? sortCourseListLessons(course.course_modules)
      : [];
  const nextLesson = lessons.find((lesson) => !completedLessons.has(lesson.id));

  return {
    id: course.id,
    slug: course.slug,
    firstLessonSlug: lessons[0]?.slug ?? null,
    nextLessonSlug: nextLesson?.slug ?? lessons[0]?.slug ?? null,
    title: course.title,
    description: course.description,
    category: course.category,
    level: course.level,
    duration: formatDuration(course.duration_minutes),
    lessons: course.lessons_count,
    xpReward: course.xp_reward,
    rating: Number(course.rating),
    students: formatStudents(course.students_count),
    icon: course.icon,
    color: course.color,
    status: progress?.status ?? null,
    progress: progress?.progress ?? 0,
  };
}

function sortCourseListLessons(
  modules: CourseListModuleRow[] | null
): CourseListLessonRow[] {
  return [...(modules ?? [])]
    .sort((firstModule, secondModule) => {
      return firstModule.position - secondModule.position;
    })
    .flatMap((module) => sortByPosition(module.course_lessons));
}

function mapCourseDetail(
  course: CourseDetailRow,
  userProgress: CourseProgressSummary | null
): CourseDetail {
  return {
    ...mapCourseListItem(course),
    modules: sortByPosition(course.course_modules).map((module) =>
      mapCourseModule(module, userProgress?.completedLessonIds ?? [])
    ),
    userProgress,
  };
}

function mapCourseModule(
  module: CourseModuleRow,
  completedLessonIds: string[]
): CourseModule {
  return {
    id: module.id,
    title: module.title,
    description: module.description,
    position: module.position,
    lessons: sortByPosition(module.course_lessons).map((lesson) =>
      mapCourseLesson(lesson, completedLessonIds)
    ),
  };
}

function mapCourseLesson(
  lesson: CourseLessonRow,
  completedLessonIds: string[]
): CourseLesson {
  return {
    id: lesson.id,
    slug: lesson.slug,
    title: lesson.title,
    summary: lesson.summary,
    content: lesson.content,
    position: lesson.position,
    duration: formatDuration(lesson.duration_minutes),
    xpReward: lesson.xp_reward,
    isPreview: lesson.is_preview,
    completed: completedLessonIds.includes(lesson.id),
  };
}

function mapCourseProgress(
  userCourse: UserCourseRow | null,
  completedLessonIds: string[]
): CourseProgressSummary | null {
  if (!userCourse && !completedLessonIds.length) {
    return null;
  }

  return {
    status: userCourse?.status ?? "in_progress",
    progressPercent: userCourse?.progress_percent ?? 0,
    startedAt: userCourse?.started_at ?? null,
    completedAt: userCourse?.completed_at ?? null,
    completedLessonIds,
  };
}

function getRelation<T>(relation: T | T[] | null) {
  return Array.isArray(relation) ? relation[0] ?? null : relation;
}

function formatCourseStatus(status: string): string {
  if (status === "completed") {
    return "Completed";
  }

  return "In Progress";
}

function sortByPosition<T extends { position: number }>(
  items: T[] | null
): T[] {
  return [...(items ?? [])].sort((firstItem, secondItem) => {
    return firstItem.position - secondItem.position;
  });
}

function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (!hours) {
    return `${remainingMinutes}m`;
  }

  return remainingMinutes ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
}

function formatStudents(students: number): string {
  if (students >= 1000) {
    return `${(students / 1000).toFixed(1)}k`;
  }

  return String(students);
}
