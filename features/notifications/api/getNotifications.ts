import { cache } from "react";

import { createClient } from "@/lib/supabase/server";

import type {
  NotificationIconType,
  NotificationItem,
} from "../types/notification.types";

type ActivityLogRow = {
  id: string;
  type: string;
  title: string;
  description: string | null;
  created_at: string;
};

const notificationIcons: Record<string, NotificationIconType> = {
  achievement_unlocked: "achievement",
  challenge_completed: "challenge",
  challenge_started: "challenge",
  course_started: "course",
  lesson_completed: "lesson",
  xp_earned: "xp",
};

export const getNotifications = cache(async (): Promise<NotificationItem[]> => {
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
    .limit(6);

  if (error || !data) {
    return [];
  }

  return (data as ActivityLogRow[]).map((log) => ({
    id: log.id,
    type: log.type,
    title: log.title,
    description: log.description ?? undefined,
    time: formatRelativeTime(log.created_at),
    icon: notificationIcons[log.type] ?? "course",
  }));
});

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
