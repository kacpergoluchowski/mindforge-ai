import {
  BookOpen,
  Flame,
  Brain,
  Trophy,
} from "lucide-react";

import type { ProfileActivity } from "../types/profile.types";

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
