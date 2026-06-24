import type { RecentConversation } from "../types/ai-mentor.types";

export const suggestedPrompts = [
  "Explain React useEffect with an example",
  "How does JWT authentication work?",
  "Debug this TypeScript error",
  "Create a learning plan for Next.js",
  "Best practices for clean code",
] as const;

export const mentorSkills = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Python",
] as const;

export const recentConversations = [
  {
    id: 1,
    title: "JavaScript var vs let vs const",
    time: "10:24 AM",
  },
  {
    id: 2,
    title: "React useEffect cleanup",
    time: "Yesterday",
  },
  {
    id: 3,
    title: "Next.js 14 data fetching",
    time: "2 days ago",
  },
  {
    id: 4,
    title: "CSS Grid vs Flexbox",
    time: "3 days ago",
  },
] satisfies RecentConversation[];
