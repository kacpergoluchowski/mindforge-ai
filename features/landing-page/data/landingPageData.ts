import {
  BarChart3,
  BookOpen,
  Bot,
  Code2,
  Database,
  GraduationCap,
  GitBranch,
  Layers3,
  Layout,
  LayoutDashboard,
  LineChart,
  Trophy,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

// Dane landing page są trzymane poza komponentami.
// Dzięki temu komponenty odpowiadają za wygląd, a teksty/listy można edytować w jednym miejscu.
export type LandingIconItem = {
  description: string;
  icon: LucideIcon;
  title: string;
};

export type LandingCourse = LandingIconItem & {
  duration: string;
  level: string;
};

export type LandingPricingPlan = {
  cta: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  name: string;
  price: string;
};

// Nawigacja używa anchorów do sekcji landing page.
export const landingNavigationItems = [
  { label: "Features", href: "#features" },
  { label: "Courses", href: "#courses" },
  { label: "AI Mentor", href: "#mentor" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
];

export const heroSocialProofAvatars = ["KG", "AI", "JS", "TS"];

// Pozycje ikon są klasami Tailwinda, bo to element czysto wizualny hero.
export const heroFloatingIcons = [
  { className: "left-4 top-24", icon: Code2 },
  { className: "right-8 top-20", icon: GraduationCap },
  { className: "bottom-24 left-12", icon: Bot },
  { className: "bottom-20 right-14", icon: BarChart3 },
];

export const heroHighlights: LandingIconItem[] = [
  {
    title: "Structured Paths",
    description: "Follow personalized roadmaps built for your goals.",
    icon: Layers3,
  },
  {
    title: "AI Mentor",
    description: "Get help anytime from your personal AI coding mentor.",
    icon: Bot,
  },
  {
    title: "Real Projects",
    description: "Build practical projects and strengthen your portfolio.",
    icon: Code2,
  },
  {
    title: "Track Progress",
    description: "Stay motivated with analytics, XP and achievements.",
    icon: LineChart,
  },
];

export const platformFeatures = [
  "High-quality interactive courses",
  "AI code reviews and feedback",
  "Challenges and leaderboards",
  "Notes, bookmarks and progress tracking",
];

export const dashboardStats = [
  { label: "XP Earned", value: "12,560" },
  { label: "Courses Completed", value: "8" },
  { label: "Projects Built", value: "14" },
  { label: "Challenges Solved", value: "23" },
];

export const platformStats = [
  { label: "Active learners", value: "10,000+" },
  { label: "Courses & lessons", value: "500+" },
  { label: "Projects built", value: "50,000+" },
  { label: "From our community", value: "4.9/5" },
];

export const dashboardLinks: Array<{
  icon: LucideIcon;
  label: string;
}> = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Courses", icon: Code2 },
  { label: "Learning Paths", icon: GitBranch },
  { label: "AI Mentor", icon: Bot },
  { label: "Challenges", icon: Trophy },
];

export const courses: LandingCourse[] = [
  {
    title: "HTML & CSS Foundations",
    description:
      "Build solid frontend basics with semantic HTML, responsive CSS and real layouts.",
    level: "Beginner",
    duration: "25-35h",
    icon: Layout,
  },
  {
    title: "JavaScript Essentials",
    description:
      "Learn variables, functions, arrays, objects, DOM basics and modern ES features.",
    level: "Beginner",
    duration: "Coming soon",
    icon: Code2,
  },
  {
    title: "React Fundamentals",
    description:
      "Understand components, props, state, events and practical UI patterns.",
    level: "Beginner",
    duration: "Coming soon",
    icon: BookOpen,
  },
  {
    title: "Supabase Basics",
    description:
      "Work with auth, profiles, PostgreSQL data and protected app routes.",
    level: "Intermediate",
    duration: "Coming soon",
    icon: Database,
  },
];

// Demo AI korzysta z krótkich gotowych promptów, żeby landing nie zależał od API.
export const mentorPrompts = [
  "Explain CSS Grid in simple words",
  "Review my React component",
  "Help me plan frontend roadmap",
];

export const aiMentorDemoMessages = [
  {
    question: "How do closures work?",
    answer:
      "A closure is when a function remembers variables from the place where it was created, even after that outer function has finished running.",
  },
  {
    question: "Why is my React state not updating immediately?",
    answer:
      "React batches state updates. Treat state as a snapshot and use the updater function when the next value depends on the previous one.",
  },
  {
    question: "How should I start learning frontend?",
    answer:
      "Start with semantic HTML and CSS layouts, then learn JavaScript fundamentals before moving into React and real projects.",
  },
];

export const testimonials = [
  {
    name: "Sarah J.",
    role: "Frontend Developer",
    quote:
      "MindForge AI completely changed the way I learn. The AI mentor feels like having a senior dev by my side.",
  },
  {
    name: "Michael T.",
    role: "Junior Developer",
    quote:
      "The learning paths are clear and the projects helped me build confidence before applying for jobs.",
  },
  {
    name: "David K.",
    role: "Backend Developer",
    quote:
      "Clean UI, practical challenges and useful AI feedback. It feels focused on real progress.",
  },
];

export const pricingPlans: LandingPricingPlan[] = [
  {
    name: "Free",
    description: "Perfect for getting started",
    price: "Free",
    cta: "Get Started",
    features: [
      "Access to free courses",
      "Limited AI Mentor messages",
      "Basic roadmap",
      "Community access",
    ],
  },
  {
    name: "Pro",
    description: "For serious learners",
    price: "29.99 PLN",
    cta: "Start Pro Plan",
    highlighted: true,
    features: [
      "Everything in Free",
      "Unlimited AI Mentor",
      "All courses and paths",
      "Code reviews",
      "Priority support",
    ],
  },
  {
    name: "Master",
    description: "For advanced developers",
    price: "59.99 PLN",
    cta: "Start Master Plan",
    features: [
      "Everything in Pro",
      "Advanced AI models",
      "Project structure reviews",
      "Early access to new features",
      "Exclusive challenges",
    ],
  },
];

// Footer korzysta z jednej struktury danych, żeby łatwo dodać lub usunąć grupy linków.
export const footerGroups = [
  {
    title: "Platform",
    links: [
      { label: "Courses", href: "#courses" },
      { label: "Learning Paths", href: "/learn/learning-paths" },
      { label: "AI Mentor", href: "#mentor" },
      { label: "Challenges", href: "/learn/challenges" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Code Review", href: "/ai-mentor/code-review" },
      { label: "Study Assistant", href: "/ai-mentor/study-assistant" },
      { label: "Progress", href: "/learn/progress" },
      { label: "Dashboard", href: "/dashboard" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#about" },
      { label: "Pricing", href: "#pricing" },
      { label: "Login", href: "/login" },
      { label: "Start Free", href: "/register" },
    ],
  },
];
