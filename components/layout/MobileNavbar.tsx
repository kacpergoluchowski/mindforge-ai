"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bot, BookOpen, LayoutDashboard, User } from "lucide-react";

import { cn } from "@/lib/utils";

const mobileNavItems = [
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
    href: "/ai-mentor",
    icon: Bot,
  },
  {
    label: "Account",
    href: "/account/profile",
    icon: User,
  },
];

export default function MobileNavbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-4 bottom-4 z-25 rounded-3xl border border-white/10 bg-[#0b1220]/95 px-4 py-3 backdrop-blur-xl lg:hidden">
      <ul className="flex items-center justify-between">
        {mobileNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-1 text-xs font-medium text-slate-400",
                  isActive && "text-violet-400"
                )}
              >
                <Icon className="size-5" />
                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}