import {
  BadgeCheck,
  BookOpen,
  Bot,
  Code2,
  CreditCard,
  Gauge,
  GraduationCap,
  LayoutDashboard,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  User,
} from "lucide-react";

import { NavigationSection } from "../types/layoutTypes.types";

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
        href: "/ai-mentor/chat",
        icon: Bot,
      },
      {
        label: "Study Assistant",
        href: "/ai-mentor/study-assistant",
        icon: BadgeCheck,
      },
      {
        label: "Code Review",
        href: "/ai-mentor/code-review",
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

export const mobileNavItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Learn",
    href: "/learn/learning-paths",
    icon: BookOpen,
  },
  {
    label: "AI Mentor",
    href: "/ai-mentor/chat",
    icon: Bot,
  },
  {
    label: "Account",
    href: "/account/profile",
    icon: User,
  },
];

export const navSections = [
  {
    title: "Learn",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { label: "Learning Paths", href: "/learn/learning-paths", icon: GraduationCap },
      { label: "Courses", href: "/learn/courses", icon: BookOpen },
      { label: "Challenges", href: "/learn/challenges", icon: ShieldCheck },
      { label: "Progress", href: "/learn/progress", icon: Gauge },
    ],
  },
  {
    title: "AI Mentor",
    items: [
      { label: "Chat with AI", href: "/ai-mentor/chat", icon: Bot },
      { label: "Study Assistant", href: "/ai-mentor/study-assistant", icon: Sparkles },
      { label: "Code Review", href: "/ai-mentor/code-review", icon: Code2 },
    ],
  },
  {
    title: "Account",
    items: [
      { label: "Profile", href: "/account/profile", icon: User },
      { label: "Settings", href: "/account/settings", icon: Settings },
      { label: "Billing", href: "/account/billing", icon: CreditCard },
    ],
  },
];