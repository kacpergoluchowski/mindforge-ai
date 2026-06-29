import { cache } from "react";
import { BookOpen, CheckCircle, Star } from "lucide-react";

import { createClient } from "@/lib/supabase/server";

import type { ActivityItem } from "../types/dashboard.types";

type ActivityLogRow = {
  id: string;
  type: string;
  title: string;
  description: string | null;
  created_at: string;
};

const activityIcons = {
  course_started: BookOpen,
  lesson_completed: CheckCircle,
  xp_earned: Star,
  achievement_unlocked: Star,
};

const activityColors: Record<string, ActivityItem["color"]> = {
  course_started: "blue",
  lesson_completed: "emerald",
  xp_earned: "yellow",
  achievement_unlocked: "yellow",
};

export const getActivityLogs = cache(async (): Promise<ActivityItem[]> => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return [];
  }

  const { data, error } = await supabase
    .from("activity_logs")
    .select("id, type, title, description, created_at")
    .eq("profile_id", user.id)
    .order("created_at", { ascending: false })
    .limit(5);

  if (error || !data) {
    return [];
  }

  return (data as ActivityLogRow[]).map(mapActivityLog);
});

function mapActivityLog(log: ActivityLogRow): ActivityItem {
  return {
    id: log.id,
    type: log.type,
    title: log.title,
    description: log.description ?? undefined,
    time: formatRelativeTime(log.created_at),
    icon: activityIcons[log.type as keyof typeof activityIcons] ?? BookOpen,
    color: activityColors[log.type] ?? "blue",
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

  if (diffInDays === 1) {
    return "Yesterday";
  }

  return `${diffInDays}d ago`;
}
