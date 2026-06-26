import { cache } from "react";
import {
  Atom,
  BookOpen,
  CheckCircle,
  Code2,
  Database,
  Flame,
  Layers3,
  ShieldCheck,
  Star,
  Trophy,
} from "lucide-react";

import { createClient } from "@/lib/supabase/server";

import type {
  AchievementItem,
  CourseProgressItem,
  LearningCalendarDay,
  LearningInsightItem,
  ProgressSummary,
  RecentActivityItem,
  TimeSpentItem,
  TopicProgressItem,
  XpOverviewItem,
} from "../types/progress.types";

type ActivityLogRow = {
  id: string;
  type: string;
  title: string;
  description: string | null;
  metadata: {
    xp_reward?: number;
  } | null;
  created_at: string;
};

type CourseRelation = {
  id: string;
  title: string;
  category: string;
  duration_minutes: number;
  lessons_count: number;
};

type UserCourseRow = {
  id: string;
  status: string;
  progress_percent: number;
  updated_at: string;
  courses: CourseRelation | CourseRelation[] | null;
};

type LessonProgressRow = {
  id: string;
  course_id: string;
  completed_at: string;
  courses: Pick<CourseRelation, "category"> | Pick<CourseRelation, "category">[] | null;
};

type UserAchievementRow = {
  id: string;
  unlocked_at: string;
  achievements:
    | {
        title: string;
        description: string | null;
      }
    | {
        title: string;
        description: string | null;
      }[]
    | null;
};

const activityIcons = {
  achievement_unlocked: Trophy,
  course_started: BookOpen,
  lesson_completed: CheckCircle,
  xp_earned: Star,
};

const activityColors: Record<string, RecentActivityItem["color"]> = {
  achievement_unlocked: "yellow",
  course_started: "violet",
  lesson_completed: "emerald",
  xp_earned: "yellow",
};

const topicIcons = {
  "AI & ML": Atom,
  Backend: Code2,
  Database,
  Frontend: Code2,
  Fullstack: Layers3,
};

const topicColors = ["blue", "sky", "green", "yellow"] as const;
const categoryColors = ["violet", "emerald", "blue", "orange"] as const;

export const getProgressSummary = cache(
  async (): Promise<ProgressSummary | null> => {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return null;
    }

    const [
      userCoursesResult,
      lessonProgressResult,
      recentActivityResult,
      activityRangeResult,
      achievementsResult,
    ] = await Promise.all([
      supabase
        .from("user_courses")
        .select(
          `
          id,
          status,
          progress_percent,
          updated_at,
          courses (
            id,
            title,
            category,
            duration_minutes,
            lessons_count
          )
        `
        )
        .eq("profile_id", user.id)
        .order("updated_at", { ascending: false }),
      supabase
        .from("user_lesson_progress")
        .select(
          `
          id,
          course_id,
          completed_at,
          courses (
            category
          )
        `
        )
        .eq("profile_id", user.id),
      supabase
        .from("activity_logs")
        .select("id, type, title, description, metadata, created_at")
        .eq("profile_id", user.id)
        .order("created_at", { ascending: false })
        .limit(5),
      supabase
        .from("activity_logs")
        .select("id, type, title, description, metadata, created_at")
        .eq("profile_id", user.id)
        .gte("created_at", getDateDaysAgo(27).toISOString())
        .order("created_at", { ascending: true }),
      supabase
        .from("user_achievements")
        .select(
          `
          id,
          unlocked_at,
          achievements (
            title,
            description
          )
        `
        )
        .eq("profile_id", user.id)
        .order("unlocked_at", { ascending: false })
        .limit(3),
    ]);

    const userCourses = (userCoursesResult.data ?? []) as UserCourseRow[];
    const completedLessons = (lessonProgressResult.data ?? []) as LessonProgressRow[];
    const thisWeekLessons = completedLessons.filter((lesson) => {
      return new Date(lesson.completed_at) >= getDateDaysAgo(6);
    }).length;
    const activityRange = (activityRangeResult.data ?? []) as ActivityLogRow[];
    const xpOverview = buildXpOverview(activityRange);
    const thisWeekXp = xpOverview.reduce((total, day) => total + day.xp, 0);

    return {
      startedCourses: userCourses.length,
      completedCourses: userCourses.filter((course) => course.status === "completed")
        .length,
      completedLessons: completedLessons.length,
      thisWeekLessons,
      thisWeekXp,
      dailyAverageXp: Math.round(thisWeekXp / 7),
      weeklyLessonGoal: 5,
      xpOverview,
      categoryBreakdown: buildCategoryBreakdown(userCourses),
      topicProgress: buildTopicProgress(userCourses, completedLessons),
      learningCalendar: buildLearningCalendar(activityRange),
      achievements: ((achievementsResult.data ?? []) as UserAchievementRow[]).map(
        mapAchievement
      ),
      insights: buildInsights(userCourses, completedLessons, thisWeekXp),
      courseProgress: userCourses.flatMap(mapCourseProgress),
      recentActivities: ((recentActivityResult.data ?? []) as ActivityLogRow[]).map(
        mapActivity
      ),
    };
  }
);

function mapActivity(activity: ActivityLogRow): RecentActivityItem {
  return {
    id: activity.id,
    title: activity.title,
    description: `${activity.description ?? "Activity"} / ${formatRelativeTime(
      activity.created_at
    )}`,
    xp: activity.metadata?.xp_reward ? `+${activity.metadata.xp_reward} XP` : "",
    icon: activityIcons[activity.type as keyof typeof activityIcons] ?? BookOpen,
    color: activityColors[activity.type] ?? "violet",
  };
}

function mapAchievement(achievementRow: UserAchievementRow): AchievementItem {
  const achievement = getRelation(achievementRow.achievements);

  return {
    id: achievementRow.id,
    title: achievement?.title ?? "Achievement unlocked",
    description: achievement?.description ?? "Learning milestone completed.",
    date: formatDate(achievementRow.unlocked_at),
    icon: Trophy,
    color: "yellow",
  };
}

function mapCourseProgress(courseRow: UserCourseRow): CourseProgressItem[] {
  const course = getRelation(courseRow.courses);

  if (!course) {
    return [];
  }

  return [
    {
      id: course.id,
      title: course.title,
      category: course.category,
      status: formatCourseStatus(courseRow.status),
      progress: courseRow.progress_percent,
      lessons: course.lessons_count,
      duration: formatDuration(course.duration_minutes),
    },
  ];
}

function buildXpOverview(activities: ActivityLogRow[]): XpOverviewItem[] {
  const days = getLastSevenDays();

  return days.map((date) => {
    const xp = activities
      .filter((activity) => isSameDay(activity.created_at, date))
      .reduce((total, activity) => total + (activity.metadata?.xp_reward ?? 0), 0);

    return {
      day: date.toLocaleDateString("en-US", { weekday: "short" }),
      xp,
    };
  });
}

function buildCategoryBreakdown(userCourses: UserCourseRow[]): TimeSpentItem[] {
  const counts = new Map<string, number>();

  userCourses.forEach((courseRow) => {
    const course = getRelation(courseRow.courses);

    if (!course) {
      return;
    }

    counts.set(course.category, (counts.get(course.category) ?? 0) + 1);
  });

  const total = Math.max(userCourses.length, 1);

  return [...counts.entries()].map(([label, count], index) => ({
    id: index + 1,
    label,
    value: Math.round((count / total) * 100),
    color: categoryColors[index % categoryColors.length],
  }));
}

function buildTopicProgress(
  userCourses: UserCourseRow[],
  completedLessons: LessonProgressRow[]
): TopicProgressItem[] {
  const coursesByCategory = new Map<string, UserCourseRow[]>();
  const completedByCategory = new Map<string, number>();

  userCourses.forEach((courseRow) => {
    const course = getRelation(courseRow.courses);

    if (!course) {
      return;
    }

    coursesByCategory.set(course.category, [
      ...(coursesByCategory.get(course.category) ?? []),
      courseRow,
    ]);
  });

  completedLessons.forEach((lesson) => {
    const course = getRelation(lesson.courses);
    const category = course?.category;

    if (!category) {
      return;
    }

    completedByCategory.set(category, (completedByCategory.get(category) ?? 0) + 1);
  });

  return [...coursesByCategory.entries()].map(([category, courses], index) => {
    const lessons = courses.reduce((total, courseRow) => {
      return total + (getRelation(courseRow.courses)?.lessons_count ?? 0);
    }, 0);
    const completed = completedByCategory.get(category) ?? 0;

    return {
      id: category,
      title: category,
      progress: lessons ? Math.round((completed / lessons) * 100) : 0,
      icon: topicIcons[category as keyof typeof topicIcons] ?? BookOpen,
      color: topicColors[index % topicColors.length],
    };
  });
}

function buildLearningCalendar(activities: ActivityLogRow[]): LearningCalendarDay[] {
  const days = getLastTwentyEightDays();

  return days.map((date) => {
    const value = activities.filter((activity) =>
      isSameDay(activity.created_at, date)
    ).length;

    return {
      id: date.toISOString(),
      day: date.toLocaleDateString("en-US", { weekday: "short" }),
      value,
    };
  });
}

function buildInsights(
  userCourses: UserCourseRow[],
  completedLessons: LessonProgressRow[],
  thisWeekXp: number
): LearningInsightItem[] {
  const activeCourse = userCourses.find((course) => course.status !== "completed");
  const strongestCategory = getStrongestCategory(userCourses);

  return [
    {
      id: "weekly-xp",
      title: "This week",
      description: thisWeekXp
        ? `You earned ${thisWeekXp.toLocaleString()} XP in the last 7 days.`
        : "Complete a lesson quiz to start building weekly XP.",
      icon: Star,
      color: "violet",
    },
    {
      id: "course-focus",
      title: activeCourse ? "Current focus" : "Next step",
      description: activeCourse
        ? `Continue ${getRelation(activeCourse.courses)?.title ?? "your current course"}.`
        : "Start a course to generate focused progress insights.",
      icon: BookOpen,
      color: "blue",
    },
    {
      id: "strongest-topic",
      title: strongestCategory ? "Strongest topic" : "Learning base",
      description: strongestCategory
        ? `${strongestCategory} has the highest course progress right now.`
        : `${completedLessons.length} lessons completed so far.`,
      icon: strongestCategory ? Flame : ShieldCheck,
      color: "emerald",
    },
  ];
}

function getStrongestCategory(userCourses: UserCourseRow[]): string | null {
  const progressByCategory = new Map<string, { total: number; count: number }>();

  userCourses.forEach((courseRow) => {
    const course = getRelation(courseRow.courses);

    if (!course) {
      return;
    }

    const current = progressByCategory.get(course.category) ?? { total: 0, count: 0 };
    progressByCategory.set(course.category, {
      total: current.total + courseRow.progress_percent,
      count: current.count + 1,
    });
  });

  return [...progressByCategory.entries()]
    .sort((first, second) => {
      return second[1].total / second[1].count - first[1].total / first[1].count;
    })
    .at(0)?.[0] ?? null;
}

function getLastSevenDays(): Date[] {
  return Array.from({ length: 7 }, (_, index) => getDateDaysAgo(6 - index));
}

function getLastTwentyEightDays(): Date[] {
  return Array.from({ length: 28 }, (_, index) => getDateDaysAgo(27 - index));
}

function getDateDaysAgo(days: number): Date {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() - days);

  return date;
}

function isSameDay(date: string, day: Date): boolean {
  const activityDate = new Date(date);

  return (
    activityDate.getFullYear() === day.getFullYear() &&
    activityDate.getMonth() === day.getMonth() &&
    activityDate.getDate() === day.getDate()
  );
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

function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (!hours) {
    return `${remainingMinutes}m`;
  }

  return remainingMinutes ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
}

function formatDate(date: string): string {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

function formatRelativeTime(date: string): string {
  const diffInMs = Date.now() - new Date(date).getTime();
  const diffInMinutes = Math.max(Math.floor(diffInMs / 60000), 0);

  if (diffInMinutes < 1) {
    return "Just now";
  }

  if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);

  if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);

  return diffInDays === 1 ? "Yesterday" : `${diffInDays}d ago`;
}
