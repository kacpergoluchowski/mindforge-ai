import {
  BookOpen,
  Trophy,
  Flame,
  TrendingUp,
  Atom,
  Hexagon,
  Code2,
  CheckCircle,
  Star,
  Play,
  Layers3,
  Gauge,
  Bot,
} from "lucide-react";
import { ActivityItem, LearningCategory } from "../types/dashboard.types";
import { RecommendedCourse } from "../types/dashboard.types";

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


export const learningCategories: LearningCategory[] = [
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

export const recommendedCourses: RecommendedCourse[] = [
  {
    title: "Prompt Engineering for Developers",
    category: "AI",
    duration: "8h 30m",
    level: "Beginner",
    rating: 4.8,
    image: "/images/courses/prompt-engineering.jpg",
  },
  {
    title: "Next.js 14 Mastery",
    category: "Next.js",
    duration: "12h 45m",
    level: "Intermediate",
    rating: 4.9,
    image: "/images/courses/nextjs-mastery.jpg",
  },
  {
    title: "System Design Basics",
    category: "System Design",
    duration: "6h 15m",
    level: "Beginner",
    rating: 4.7,
    image: "/images/courses/system-design.jpg",
  },
];

export const activityItems: ActivityItem[] = [
  {
    title: 'Completed "React Hooks Deep Dive"',
    time: "2h ago",
    icon: CheckCircle,
    color: "emerald",
  },
  {
    title: "Earned 250 XP",
    description: "for daily challenge",
    time: "Yesterday",
    icon: Star,
    color: "yellow",
  },
  {
    title: 'Started "Next.js 14 Mastery"',
    time: "2 days ago",
    icon: Play,
    color: "blue",
  },
];