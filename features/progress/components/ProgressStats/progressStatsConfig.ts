import { BookOpen, Star, Trophy, TrendingUp } from "lucide-react";

import type { ProgressStat } from "../../types/progress.types";

export const progressStatsConfig = [
  {
    id: "totalXp",
    title: "Total XP",
    value: "0",
    subtitle: "+0 this week",
    icon: Star,
    color: "violet",
  },
  {
    id: "level",
    title: "Level",
    value: "1",
    subtitle: "0 XP to next level",
    progress: 0,
    icon: Trophy,
    color: "emerald",
  },
  {
    id: "lessons",
    title: "Lessons",
    value: "0",
    subtitle: "Completed lessons",
    icon: BookOpen,
    color: "orange",
  },
  {
    id: "courses",
    title: "Courses",
    value: "0",
    subtitle: "0 started / 0 lessons done",
    icon: TrendingUp,
    color: "blue",
  },
] satisfies ProgressStat[];
