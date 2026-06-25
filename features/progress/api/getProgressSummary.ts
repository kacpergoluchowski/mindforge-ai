import { cache } from "react";
import { BookOpen, CheckCircle, Star } from "lucide-react";

import { createClient } from "@/lib/supabase/server";

import type {
  ProgressSummary,
  RecentActivityItem,
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

const activityIcons = {
  course_started: BookOpen,
  lesson_completed: CheckCircle,
  xp_earned: Star,
};

const activityColors: Record<string, RecentActivityItem["color"]> = {
  course_started: "violet",
  lesson_completed: "emerald",
  xp_earned: "yellow",
};

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
      startedCoursesResult,
      completedCoursesResult,
      completedLessonsResult,
      activityLogsResult,
    ] = await Promise.all([
      supabase
        .from("user_courses")
        .select("id", { count: "exact", head: true })
        .eq("profile_id", user.id),
      supabase
        .from("user_courses")
        .select("id", { count: "exact", head: true })
        .eq("profile_id", user.id)
        .eq("status", "completed"),
      supabase
        .from("user_lesson_progress")
        .select("id", { count: "exact", head: true })
        .eq("profile_id", user.id),
      supabase
        .from("activity_logs")
        .select("id, type, title, description, metadata, created_at")
        .eq("profile_id", user.id)
        .order("created_at", { ascending: false })
        .limit(5),
    ]);

    return {
      startedCourses: startedCoursesResult.count ?? 0,
      completedCourses: completedCoursesResult.count ?? 0,
      completedLessons: completedLessonsResult.count ?? 0,
      recentActivities: ((activityLogsResult.data ?? []) as ActivityLogRow[]).map(
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
    icon:
      activityIcons[activity.type as keyof typeof activityIcons] ?? BookOpen,
    color: activityColors[activity.type] ?? "violet",
  };
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
