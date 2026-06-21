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

export const profileStats = [
  {
    title: "Level 24",
    subtitle: "Advanced Learner",
    value: "75%",
    icon: TrendingUp,
    progress: "w-[75%]",
    color: "bg-violet-500",
  },
  {
    title: "142h",
    subtitle: "Total Learning Time",
    value: "82%",
    icon: Clock3,
    progress: "w-[82%]",
    color: "bg-emerald-500",
  },
  {
    title: "18",
    subtitle: "Courses Completed",
    value: "64%",
    icon: BookOpen,
    progress: "w-[64%]",
    color: "bg-blue-500",
  },
  {
    title: "7",
    subtitle: "Day Streak",
    value: "72%",
    icon: Flame,
    progress: "w-[72%]",
    color: "bg-orange-500",
  },
] as const;


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
] as const;

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
];

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
];