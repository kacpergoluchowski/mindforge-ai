import {
  BookOpen,
  Flame,
  TrendingUp,
  Clock3,
  Brain,
  Trophy,
} from "lucide-react";

import type {
  ProfileActivity,
  ProfileStat,
} from "../types/profile.types";

export const profileStats = [
  {
    title: "Level 24",
    subtitle: "Advanced Learner",
    icon: TrendingUp,
    progress: 75,
    color: "violet",
  },
  {
    title: "142h",
    subtitle: "Total Learning Time",
    icon: Clock3,
    progress: 82,
    color: "emerald",
  },
  {
    title: "18",
    subtitle: "Courses Completed",
    icon: BookOpen,
    progress: 64,
    color: "blue",
  },
  {
    title: "7",
    subtitle: "Day Streak",
    icon: Flame,
    progress: 72,
    color: "orange",
  },
] satisfies ProfileStat[];


export const recentActivities = [
  {
    id: 1,
    title: 'Completed lesson "useEffect Deep Dive"',
    subtitle: "React Course",
    time: "2h ago",
    icon: BookOpen,
  },
  {
    id: 2,
    title: "Asked AI Mentor about TypeScript generics",
    subtitle: "AI Mentor",
    time: "5h ago",
    icon: Brain,
  },
  {
    id: 3,
    title: "Earned 50 XP",
    subtitle: "Daily Learning",
    time: "Yesterday",
    icon: Flame,
  },
  {
    id: 4,
    title: 'Completed course "JavaScript Fundamentals"',
    subtitle: "JavaScript Path",
    time: "2 days ago",
    icon: Trophy,
  },
] satisfies ProfileActivity[];
