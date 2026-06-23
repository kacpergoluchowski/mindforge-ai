import {
  Atom,
  Brain,
  Code2,
  Database,
  Hexagon,
  Layers3,
} from "lucide-react";
import { LearningPath, PopularLearningPath, RoadmapStep } from "../types/learningPaths.types";

export const learningPaths: LearningPath[] = [
  {
    id: 1,
    title: "Frontend Engineer",
    progress: 80,
    coursesCompleted: 12,
    totalCourses: 15,
    color: "violet",
    icon: Code2,
  },
  {
    id: 2,
    title: "Fullstack Engineer",
    progress: 45,
    coursesCompleted: 11,
    totalCourses: 24,
    color: "emerald",
    icon: Layers3,
  },
  {
    id: 3,
    title: "AI Engineer",
    progress: 18,
    coursesCompleted: 6,
    totalCourses: 31,
    color: "orange",
    icon: Brain,
  },
];

export const popularLearningPaths: PopularLearningPath[] = [
  {
    id: 1,
    title: "Frontend Development",
    icon: Atom,
    technologies: ["React", "TypeScript", "Next.js"],
    rating: "4.9",
    students: "1.2k",
    courses: 12,
    color: "blue",
  },
  {
    id: 2,
    title: "Fullstack Engineering",
    icon: Hexagon,
    technologies: ["Next.js", "NestJS", "PostgreSQL"],
    rating: "4.8",
    students: "980",
    courses: 24,
    color: "green",
  },
  {
    id: 3,
    title: "AI Engineering",
    icon: Brain,
    technologies: ["Python", "FastAPI", "LLMs"],
    rating: "5.0",
    students: "760",
    courses: 31,
    color: "violet",
  },
  {
    id: 4,
    title: "System Design",
    icon: Database,
    technologies: ["Architecture", "Scaling", "Databases"],
    rating: "4.7",
    students: "540",
    courses: 16,
    color: "yellow",
  },
];

export const roadmapSteps: RoadmapStep[] = [
  {
    id: 1,
    title: "HTML",
    description: "Structure web content",
    status: "completed",
  },
  {
    id: 2,
    title: "CSS",
    description: "Style and layout",
    status: "completed",
  },
  {
    id: 3,
    title: "JavaScript",
    description: "Add interactivity",
    status: "completed",
  },
  {
    id: 4,
    title: "React",
    description: "Build user interfaces",
    status: "completed",
  },
  {
    id: 5,
    title: "TypeScript",
    description: "Add type safety",
    status: "current",
  },
  {
    id: 6,
    title: "Next.js",
    description: "React framework",
    status: "locked",
  },
  {
    id: 7,
    title: "Testing",
    description: "Write and test code",
    status: "locked",
  },
  {
    id: 8,
    title: "CI/CD",
    description: "Deploy with confidence",
    status: "locked",
  },
  {
    id: 9,
    title: "System Design",
    description: "Design scalable applications",
    status: "locked",
  },
];