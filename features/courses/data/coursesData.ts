import { Atom, Brain, Cloud, Database, FileCode2, Hexagon, Palette, Server, Smartphone, Triangle, Workflow } from "lucide-react";

export const courseCategories = [
  "All Courses",
  "Frontend",
  "Backend",
  "Fullstack",
  "AI & ML",
  "DevOps",
  "Mobile",
  "Design",
  "Database",
] as const;

export const continueLearningCourses = [
  {
    id: 1,
    title: "React Fundamentals",
    instructor: "Maximilian Schwarzmüller",
    progress: 68,
    duration: "12h 45m",
    level: "Intermediate",
    status: "In Progress",
    icon: Atom,
    color: "blue",
  },
  {
    id: 2,
    title: "TypeScript Essentials",
    instructor: "Matt Pocock",
    progress: 42,
    duration: "8h 30m",
    level: "Beginner",
    status: "In Progress",
    icon: FileCode2,
    color: "blue",
  },
  {
    id: 3,
    title: "Node.js & Express",
    instructor: "Jonas Schmedtmann",
    progress: 75,
    duration: "14h 20m",
    level: "Intermediate",
    status: "In Progress",
    icon: Hexagon,
    color: "green",
  },
  {
    id: 4,
    title: "Next.js App Router",
    instructor: "Pedro Tech",
    progress: 60,
    duration: "10h 15m",
    level: "Intermediate",
    status: "In Progress",
    icon: Triangle,
    color: "violet",
  },
] as const;

export const popularCourses = [
  {
    id: 1,
    title: "Advanced React Patterns",
    description:
      "Master reusable components, compound patterns and scalable architecture.",
    rating: 4.9,
    students: "12.5k",
    lessons: 42,
    level: "Advanced",
    icon: Atom,
    color: "blue",
  },
  {
    id: 2,
    title: "AI Engineering Fundamentals",
    description:
      "Learn how to build modern AI applications using Python and LLMs.",
    rating: 4.8,
    students: "9.2k",
    lessons: 36,
    level: "Intermediate",
    icon: Brain,
    color: "violet",
  },
  {
    id: 3,
    title: "PostgreSQL Masterclass",
    description:
      "Database design, optimization and real-world SQL workflows.",
    rating: 4.7,
    students: "7.8k",
    lessons: 28,
    level: "Intermediate",
    icon: Database,
    color: "emerald",
  },
  {
    id: 4,
    title: "Backend Systems Design",
    description:
      "Learn how to build scalable backend architectures and APIs.",
    rating: 4.9,
    students: "6.4k",
    lessons: 31,
    level: "Advanced",
    icon: Server,
    color: "orange",
  },
] as const;


export const courseTopics = [
  {
    id: 1,
    title: "Frontend",
    courses: 42,
    icon: Atom,
    color: "blue",
  },
  {
    id: 2,
    title: "Backend",
    courses: 31,
    icon: Server,
    color: "green",
  },
  {
    id: 3,
    title: "AI & ML",
    courses: 28,
    icon: Brain,
    color: "violet",
  },
  {
    id: 4,
    title: "DevOps",
    courses: 18,
    icon: Workflow,
    color: "orange",
  },
  {
    id: 5,
    title: "Cloud",
    courses: 15,
    icon: Cloud,
    color: "sky",
  },
  {
    id: 6,
    title: "Mobile",
    courses: 24,
    icon: Smartphone,
    color: "pink",
  },
  {
    id: 7,
    title: "Design",
    courses: 21,
    icon: Palette,
    color: "yellow",
  },
  {
    id: 8,
    title: "Database",
    courses: 16,
    icon: Database,
    color: "emerald",
  },
] as const;