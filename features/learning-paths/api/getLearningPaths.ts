import { cache } from "react";

import { createClient } from "@/lib/supabase/server";

import type {
  LearningPathDetails,
  LearningPath,
  PopularLearningPath,
  RoadmapStep,
} from "../types/learningPaths.types";

type LearningPathRow = {
  id: string;
  slug: string;
  title: string;
  description: string;
  level: string;
  estimated_hours: number;
  rating: number;
  students_count: number;
  icon: string;
  color: string;
  learning_path_steps: LearningPathStepRow[] | null;
};

type LearningPathStepRow = {
  id: string;
  course_id: string | null;
  courses: CourseStepRow | CourseStepRow[] | null;
  title: string;
  description: string;
  position: number;
};

type CourseStepRow = {
  slug: string;
};

type UserLearningPathRow = {
  learning_path_id: string;
  status: string;
};

type UserCourseRow = {
  course_id: string;
  status: string;
  progress_percent: number;
};

type LearningPathProgress = {
  started: boolean;
  progress: number;
  completedCourses: number;
  totalCourses: number;
  status: string | null;
};

export const getLearningPaths = cache(async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("learning_paths")
    .select(
      `
      id,
      slug,
      title,
      description,
      level,
      estimated_hours,
      rating,
      students_count,
      icon,
      color,
      learning_path_steps (
        id,
        course_id,
        courses (
          slug
        ),
        title,
        description,
        position
      )
    `
    )
    .eq("is_published", true)
    .order("created_at", { ascending: true });

  if (error || !data) {
    return {
      myPaths: [],
      popularPaths: [],
      currentPath: null,
    };
  }

  const paths = data as LearningPathRow[];
  const pathIds = paths.map((path) => path.id);
  const courseIds = paths.flatMap((path) =>
    (path.learning_path_steps ?? []).flatMap((step) =>
      step.course_id ? [step.course_id] : []
    )
  );

  const [userPathsResult, userCoursesResult] = user && pathIds.length
    ? await Promise.all([
        supabase
          .from("user_learning_paths")
          .select("learning_path_id, status")
          .eq("profile_id", user.id)
          .in("learning_path_id", pathIds),
        supabase
          .from("user_courses")
          .select("course_id, status, progress_percent")
          .eq("profile_id", user.id)
          .in(
            "course_id",
            courseIds.length
              ? courseIds
              : ["00000000-0000-0000-0000-000000000000"]
          ),
      ])
    : [null, null];

  const userPaths = new Map(
    ((userPathsResult?.data ?? []) as UserLearningPathRow[]).map((path) => [
      path.learning_path_id,
      path,
    ])
  );
  const userCourses = new Map(
    ((userCoursesResult?.data ?? []) as UserCourseRow[]).map((course) => [
      course.course_id,
      course,
    ])
  );

  const mappedPaths = paths.map((path) =>
    mapLearningPath(path, getPathProgress(path, userPaths, userCourses))
  );
  const popularPaths = paths
    .filter((path) => !userPaths.has(path.id))
    .map(mapPopularLearningPath);

  return {
    myPaths: mappedPaths.filter((path) => path.started),
    popularPaths,
  };
});

export const getLearningPathBySlug = cache(
  async (slug: string): Promise<LearningPathDetails | null> => {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("learning_paths")
      .select(
        `
        id,
        slug,
        title,
        description,
        level,
        estimated_hours,
        rating,
        students_count,
        icon,
        color,
        learning_path_steps (
          id,
          course_id,
          courses (
            slug
          ),
          title,
          description,
          position
        )
      `
      )
      .eq("slug", slug)
      .eq("is_published", true)
      .maybeSingle();

    if (error || !data) {
      return null;
    }

    const path = data as LearningPathRow;
    const courseIds = (path.learning_path_steps ?? []).flatMap((step) =>
      step.course_id ? [step.course_id] : []
    );

    const [userPathResult, userCoursesResult] = user
      ? await Promise.all([
          supabase
            .from("user_learning_paths")
            .select("learning_path_id, status")
            .eq("profile_id", user.id)
            .eq("learning_path_id", path.id)
            .maybeSingle(),
          supabase
            .from("user_courses")
            .select("course_id, status, progress_percent")
            .eq("profile_id", user.id)
            .in(
              "course_id",
              courseIds.length
                ? courseIds
                : ["00000000-0000-0000-0000-000000000000"]
            ),
        ])
      : [null, null];

    const userPaths = new Map(
      userPathResult?.data
        ? [
            [
              (userPathResult.data as UserLearningPathRow).learning_path_id,
              userPathResult.data as UserLearningPathRow,
            ],
          ]
        : []
    );
    const userCourses = new Map(
      ((userCoursesResult?.data ?? []) as UserCourseRow[]).map((course) => [
        course.course_id,
        course,
      ])
    );
    const progress = getPathProgress(path, userPaths, userCourses);

    return {
      id: path.id,
      slug: path.slug,
      title: path.title,
      description: path.description,
      level: path.level,
      estimatedHours: path.estimated_hours,
      progress: progress.progress,
      coursesCompleted: progress.completedCourses,
      totalCourses: progress.totalCourses,
      started: progress.started,
      steps: mapRoadmapSteps(path, userPaths, userCourses),
    };
  }
);

function mapLearningPath(
  path: LearningPathRow,
  progress: LearningPathProgress
): LearningPath {
  return {
    id: path.id,
    slug: path.slug,
    description: path.description,
    estimatedHours: path.estimated_hours,
    level: path.level,
    title: path.title,
    progress: progress.progress,
    coursesCompleted: progress.completedCourses,
    totalCourses: progress.totalCourses,
    color: mapPathColor(path.color),
    iconName: path.icon,
    started: progress.started,
  };
}

function mapPopularLearningPath(path: LearningPathRow): PopularLearningPath {
  const steps = sortSteps(path.learning_path_steps);

  return {
    id: path.id,
    slug: path.slug,
    title: path.title,
    iconName: path.icon,
    technologies: steps.slice(0, 3).map((step) => step.title),
    rating: String(Number(path.rating).toFixed(1)),
    students: formatStudents(path.students_count),
    courses: steps.length,
    color: mapPopularPathColor(path.color),
  };
}

function mapRoadmapSteps(
  path: LearningPathRow,
  userPaths: Map<string, UserLearningPathRow>,
  userCourses: Map<string, UserCourseRow>
): RoadmapStep[] {
  const started = userPaths.has(path.id);
  const steps = sortSteps(path.learning_path_steps);
  const firstOpenStepIndex = steps.findIndex((step) => {
    const course = step.course_id ? userCourses.get(step.course_id) : null;
    return course?.status !== "completed";
  });

  return steps.map((step, index) => {
    const course = step.course_id ? userCourses.get(step.course_id) : null;
    const courseDetails = getRelation(step.courses);
    const completed = course?.status === "completed";
    const current =
      started && !completed && index === Math.max(firstOpenStepIndex, 0);

    return {
      id: step.id,
      title: step.title,
      description: step.description,
      courseSlug: courseDetails?.slug ?? null,
      courseProgress: course?.progress_percent ?? 0,
      status: completed ? "completed" : current ? "current" : "locked",
    };
  });
}

function getPathProgress(
  path: LearningPathRow,
  userPaths: Map<string, UserLearningPathRow>,
  userCourses: Map<string, UserCourseRow>
): LearningPathProgress {
  const steps = sortSteps(path.learning_path_steps);
  const totalCourses = steps.length;
  const completedCourses = steps.filter((step) => {
    return step.course_id
      ? userCourses.get(step.course_id)?.status === "completed"
      : false;
  }).length;
  const progressPoints = steps.reduce((total, step) => {
    if (!step.course_id) {
      return total;
    }

    return total + (userCourses.get(step.course_id)?.progress_percent ?? 0);
  }, 0);
  const progress = totalCourses
    ? Math.round(progressPoints / totalCourses)
    : 0;
  const userPath = userPaths.get(path.id);

  return {
    started: Boolean(userPath),
    progress,
    completedCourses,
    totalCourses,
    status: userPath?.status ?? null,
  };
}

function sortSteps(steps: LearningPathStepRow[] | null) {
  return [...(steps ?? [])].sort((firstStep, secondStep) => {
    return firstStep.position - secondStep.position;
  });
}

function getRelation<T>(relation: T | T[] | null) {
  return Array.isArray(relation) ? relation[0] ?? null : relation;
}

function mapPathColor(color: string): LearningPath["color"] {
  if (color === "emerald" || color === "orange") {
    return color;
  }

  return "violet";
}

function mapPopularPathColor(color: string): PopularLearningPath["color"] {
  if (color === "green" || color === "yellow" || color === "violet") {
    return color;
  }

  return "blue";
}

function formatStudents(students: number): string {
  if (students >= 1000) {
    return `${(students / 1000).toFixed(1)}k`;
  }

  return String(students);
}
