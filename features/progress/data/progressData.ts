import { Atom, BookOpen, Bot, Brain, Clock3, FileCode2, Flame, Hexagon, ShieldCheck, Star, Sun, TrendingUp, Trophy } from "lucide-react";

export const progressStats = [
  {
    id: 1,
    title: "Total XP",
    value: "12,540",
    subtitle: "+850 this week",
    icon: Star,
    color: "violet",
  },
  {
    id: 2,
    title: "Level",
    value: "24",
    subtitle: "3,460 XP to next level",
    progress: 72,
    icon: Trophy,
    color: "emerald",
  },
  {
    id: 3,
    title: "Streak",
    value: "15",
    subtitle: "Best: 28 days",
    icon: Flame,
    color: "orange",
  },
  {
    id: 4,
    title: "Rank",
    value: "Top 10%",
    subtitle: "Among all learners",
    icon: Trophy,
    color: "blue",
  },
];

export const xpOverviewData = [
  { day: "Mon", xp: 800 },
  { day: "Tue", xp: 1050 },
  { day: "Wed", xp: 1750 },
  { day: "Thu", xp: 1450 },
  { day: "Fri", xp: 2650 },
  { day: "Sat", xp: 2450 },
  { day: "Sun", xp: 3850 },
];

export const timeSpentData = [
  {
    id: 1,
    label: "Courses",
    value: 42,
    color: "violet",
  },
  {
    id: 2,
    label: "Challenges",
    value: 28,
    color: "emerald",
  },
  {
    id: 3,
    label: "AI Mentor",
    value: 18,
    color: "blue",
  },
  {
    id: 4,
    label: "Reading",
    value: 12,
    color: "orange",
  },
] as const;

export const topicProgressData = [
  {
    id: 1,
    title: "JavaScript",
    progress: 85,
    icon: FileCode2,
    color: "yellow",
  },
  {
    id: 2,
    title: "React",
    progress: 72,
    icon: Atom,
    color: "blue",
  },
  {
    id: 3,
    title: "TypeScript",
    progress: 60,
    icon: FileCode2,
    color: "sky",
  },
  {
    id: 4,
    title: "Node.js",
    progress: 40,
    icon: Hexagon,
    color: "green",
  },
  {
    id: 5,
    title: "Python",
    progress: 30,
    icon: ShieldCheck,
    color: "blue",
  },
] as const;

export const learningCalendarData = [
  { id: 1, day: "Mon", value: 3 },
  { id: 2, day: "Tue", value: 5 },
  { id: 3, day: "Wed", value: 2 },
  { id: 4, day: "Thu", value: 4 },
  { id: 5, day: "Fri", value: 6 },
  { id: 6, day: "Sat", value: 1 },
  { id: 7, day: "Sun", value: 0 },
  { id: 8, day: "Mon", value: 4 },
  { id: 9, day: "Tue", value: 2 },
  { id: 10, day: "Wed", value: 6 },
  { id: 11, day: "Thu", value: 5 },
  { id: 12, day: "Fri", value: 3 },
  { id: 13, day: "Sat", value: 2 },
  { id: 14, day: "Sun", value: 1 },
  { id: 15, day: "Mon", value: 6 },
  { id: 16, day: "Tue", value: 4 },
  { id: 17, day: "Wed", value: 3 },
  { id: 18, day: "Thu", value: 5 },
  { id: 19, day: "Fri", value: 2 },
  { id: 20, day: "Sat", value: 0 },
  { id: 21, day: "Sun", value: 4 },
  { id: 22, day: "Mon", value: 5 },
  { id: 23, day: "Tue", value: 6 },
  { id: 24, day: "Wed", value: 4 },
  { id: 25, day: "Thu", value: 2 },
  { id: 26, day: "Fri", value: 3 },
  { id: 27, day: "Sat", value: 1 },
  { id: 28, day: "Sun", value: 5 },
];

export const calendarSummary = [
  {
    id: 1,
    label: "Active Days",
    value: "24",
  },
  {
    id: 2,
    label: "Best Day",
    value: "Friday",
  },
  {
    id: 3,
    label: "Avg XP",
    value: "420",
  },
] as const;

export const recentActivityData = [
  {
    id: 1,
    title: 'Completed "React Hooks Deep Dive"',
    description: "Course • 2 hours ago",
    xp: "+150 XP",
    icon: BookOpen,
    color: "violet",
  },
  {
    id: 2,
    title: 'Solved "Two Sum" challenge',
    description: "Challenge • 5 hours ago",
    xp: "+75 XP",
    icon: ShieldCheck,
    color: "emerald",
  },
  {
    id: 3,
    title: "AI Code Review completed",
    description: "AI Mentor • 1 day ago",
    xp: "+50 XP",
    icon: Bot,
    color: "violet",
  },
  {
    id: 4,
    title: 'Completed "JavaScript Basics"',
    description: "Course • 2 days ago",
    xp: "+100 XP",
    icon: BookOpen,
    color: "yellow",
  },
] as const;

export const achievementsData = [
  {
    id: 1,
    title: "Consistent Learner",
    description: "Maintain a 7 day streak",
    date: "May 12, 2025",
    icon: ShieldCheck,
    color: "violet",
  },
  {
    id: 2,
    title: "Challenge Master",
    description: "Complete 50 challenges",
    date: "May 10, 2025",
    icon: Trophy,
    color: "emerald",
  },
  {
    id: 3,
    title: "Early Bird",
    description: "Study before 9 AM",
    date: "May 8, 2025",
    icon: Sun,
    color: "yellow",
  },
] as const;

export const weeklyGoalData = {
  current: 18,
  target: 25,
  progress: 72,
  remaining: "7h remaining",
  daysLeft: "3 days left",
};

export const learningInsightsData = [
  {
    id: 1,
    title: "Best learning time",
    description: "You learn 34% faster between 8 AM and 11 AM.",
    icon: Clock3,
    color: "blue",
  },
  {
    id: 2,
    title: "Strongest topic",
    description: "React is currently your strongest skill area.",
    icon: TrendingUp,
    color: "emerald",
  },
  {
    id: 3,
    title: "AI recommendation",
    description: "Focus on TypeScript generics to improve your roadmap score.",
    icon: Brain,
    color: "violet",
  },
] as const;