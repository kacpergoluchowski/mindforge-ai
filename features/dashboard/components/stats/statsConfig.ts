import { BookOpen, Flame, TrendingUp, Trophy } from "lucide-react";

import type { StatsCardItem } from "../../types/dashboard.types";

export const statsConfig = [
  {
    id: "completedLessons",
    title: "Lessons Completed",
    value: "0",
    change: "0 this week",
    icon: BookOpen,
  },
  {
    id: "completedCourses",
    title: "Courses Completed",
    value: "0",
    change: "0 started",
    icon: TrendingUp,
  },
  {
    id: "currentStreak",
    title: "Current Streak",
    value: "0 days",
    change: "Keep it up!",
    icon: Flame,
  },
  {
    id: "xpEarned",
    title: "XP Earned",
    value: "0",
    change: "+0 this week",
    icon: Trophy,
  },
] satisfies StatsCardItem[];
