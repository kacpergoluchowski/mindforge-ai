import {
  BookOpen,
  Trophy,
  Flame,
  TrendingUp,
  Atom,
  Hexagon,
  Code2,
} from "lucide-react";

export const statsData = [
  {
    title: "Total Learning Time",
    value: "128h 34m",
    change: "+12%",
    icon: BookOpen,
  },
  {
    title: "Courses Completed",
    value: "24",
    change: "+8%",
    icon: TrendingUp,
  },
  {
    title: "Current Streak",
    value: "7 days",
    change: "Keep it up!",
    icon: Flame,
  },
  {
    title: "XP Earned",
    value: "12,450",
    change: "+15%",
    icon: Trophy,
  },
];

export const learningCategories = [
  {
    label: "Development",
    time: "9h 20m",
    percentage: 49,
    color: "violet",
  },
  {
    label: "System Design",
    time: "4h 15m",
    percentage: 23,
    color: "emerald",
  },
  {
    label: "AI / ML",
    time: "3h 30m",
    percentage: 18,
    color: "orange",
  },
  {
    label: "Other",
    time: "1h 40m",
    percentage: 10,
    color: "blue",
  },
];

export const continueLearningCourses = [
  {
    title: "Advanced React Patterns",
    progress: 75,
    icon: Atom,
  },
  {
    title: "Node.js Performance",
    progress: 45,
    icon: Hexagon,
  },
  {
    title: "TypeScript Deep Dive",
    progress: 30,
    icon: Code2,
  },
];