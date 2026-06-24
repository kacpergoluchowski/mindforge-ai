import {
  BookOpen,
  Flame,
  TrendingUp,
  Clock3,
  FileCode2,
  Code2,
  Layers3,
  Atom,
  Database,
  Wind,
  Globe,
  Layers2,
  Brain,
  Trophy,
  Rocket,
  Bot,
} from "lucide-react";

import type {
  ProfileAchievement,
  ProfileActivity,
  ProfileSkill,
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


export const skills = [
  {
    name: "JavaScript",
    icon: FileCode2,
  },
  {
    name: "TypeScript",
    icon: Code2,
  },
  {
    name: "React",
    icon: Atom,
  },
  {
    name: "Next.js",
    icon: Layers3,
  },
  {
    name: "Tailwind CSS",
    icon: Wind,
  },
  {
    name: "Node.js",
    icon: Database,
  },
  {
    name: "GitHub",
    icon: Layers2,
  },
  {
    name: "HTML",
    icon: Globe,
  },
] satisfies ProfileSkill[];

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

export const achievements = [
  {
    id: 1,
    title: "Consistent Learner",
    description: "Learn for 7 days in a row",
    date: "May 16, 2026",
    icon: Flame,
  },
  {
    id: 2,
    title: "Quick Starter",
    description: "Complete your first course",
    date: "Apr 10, 2026",
    icon: Rocket,
  },
  {
    id: 3,
    title: "Code Reviewer",
    description: "Complete 10 code reviews",
    date: "May 1, 2026",
    icon: Code2,
  },
  {
    id: 4,
    title: "AI Explorer",
    description: "Ask 50 questions to AI Mentor",
    date: "May 11, 2026",
    icon: Bot,
  },
] satisfies ProfileAchievement[];
