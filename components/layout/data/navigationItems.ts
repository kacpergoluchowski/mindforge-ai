import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck,
  BookOpen,
  Bot,
  Code2,
  CreditCard,
  GraduationCap,
  LayoutDashboard,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  User,
} from "lucide-react";

export type NavigationItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export type NavigationSection = {
  title?: string;
  items: NavigationItem[];
};

export const navigationSections: NavigationSection[] = [
  {
    items: [
      {
        label: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    title: "Learn",
    items: [
      {
        label: "Learning Paths",
        href: "/learn/learning-paths",
        icon: GraduationCap,
      },
      {
        label: "Courses",
        href: "/learn/courses",
        icon: BookOpen,
      },
      {
        label: "Challenges",
        href: "/learn/challenges",
        icon: ShieldCheck,
      },
      {
        label: "Progress",
        href: "/learn/progress",
        icon: SlidersHorizontal,
      },
    ],
  },
  {
    title: "AI Mentor",
    items: [
      {
        label: "Chat with AI",
        href: "/ai-mentor",
        icon: Bot,
      },
      {
        label: "Study Assistant",
        href: "/study-assistant",
        icon: BadgeCheck,
      },
      {
        label: "Code Review",
        href: "/code-review",
        icon: Code2,
      },
    ],
  },
  {
    title: "Account",
    items: [
      {
        label: "Profile",
        href: "/account/profile",
        icon: User,
      },
      {
        label: "Settings",
        href: "/account/settings",
        icon: Settings,
      },
      {
        label: "Billing",
        href: "/account/billing",
        icon: CreditCard,
      },
    ],
  },
];